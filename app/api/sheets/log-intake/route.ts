/**
 * POST /api/sheets/log-intake
 *
 * Appends a patient intake response to the telehealth intake Google Sheet,
 * and sends a formatted email to the practice admin (plus a confirmation
 * email to the patient) via Resend.
 *
 * Required env vars:
 *   GOOGLE_SERVICE_ACCOUNT_KEY    — full JSON key from Google Cloud Console, base64-encoded
 *   GOOGLE_SHEETS_INTAKE_LOG_ID   — Sheet ID for the intake log (falls back to PAYMENT_LOG_ID)
 *   RESEND_API_KEY                — Resend API key for sending email
 *   NOTIFICATION_EMAIL            — admin notification email (default: anesbrothers@gmail.com)
 *
 * Sheet columns (auto-created header on first write if sheet is empty):
 *   Date | Service | Patient Name | Email | Phone | Responses (JSON)
 */

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'edge';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface LogIntakeBody {
  service: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  formResponses: Record<string, unknown>;
}

interface ServiceAccountKey {
  client_email: string;
  private_key: string;
}

// ---------------------------------------------------------------------------
// JWT / token helpers (pure Web Crypto — edge-safe)
// ---------------------------------------------------------------------------

function b64url(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let str = '';
  for (const b of bytes) str += String.fromCharCode(b);
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function makeJwt(serviceAccount: ServiceAccountKey, scope: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const claim = {
    iss: serviceAccount.client_email,
    scope,
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  };

  const enc = new TextEncoder();
  const headerB64 = btoa(JSON.stringify(header)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const claimB64 = btoa(JSON.stringify(claim)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const signingInput = `${headerB64}.${claimB64}`;

  const pemBody = serviceAccount.private_key
    .replace(/-----BEGIN PRIVATE KEY-----/g, '')
    .replace(/-----END PRIVATE KEY-----/g, '')
    .replace(/\s+/g, '');
  const pemBytes = Uint8Array.from(atob(pemBody), c => c.charCodeAt(0));

  const privateKey = await crypto.subtle.importKey(
    'pkcs8',
    pemBytes.buffer,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign'],
  );

  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    privateKey,
    enc.encode(signingInput),
  );

  return `${signingInput}.${b64url(signature)}`;
}

async function getAccessToken(serviceAccount: ServiceAccountKey, scope: string): Promise<string> {
  const jwt = await makeJwt(serviceAccount, scope);

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Token exchange failed: ${err}`);
  }

  const data = await res.json() as { access_token: string };
  return data.access_token;
}

// ---------------------------------------------------------------------------
// Sheet helpers
// ---------------------------------------------------------------------------

const SHEET_HEADERS = ['Date', 'Service', 'Patient Name', 'Email', 'Phone', 'Responses (JSON)'];
const TAB_NAME = 'Patient Intake';

async function ensureTabWithHeaders(sheetId: string, token: string): Promise<void> {
  const range = encodeURIComponent(`${TAB_NAME}!A1`);
  const checkRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );

  if (checkRes.ok) {
    const data = await checkRes.json() as { values?: string[][] };
    if (data.values && data.values.length > 0) return;
  }

  if (!checkRes.ok && checkRes.status !== 400) {
    const err = await checkRes.text();
    throw new Error(`Sheets check failed: ${err}`);
  }

  const metaRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  const meta = await metaRes.json() as { sheets?: Array<{ properties: { title: string } }> };
  const exists = meta.sheets?.some(s => s.properties.title === TAB_NAME);

  if (!exists) {
    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}:batchUpdate`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requests: [{ addSheet: { properties: { title: TAB_NAME } } }],
      }),
    });
  }

  const writeRange = encodeURIComponent(`${TAB_NAME}!A1`);
  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${writeRange}?valueInputOption=RAW`,
    {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ values: [SHEET_HEADERS] }),
    },
  );
}

async function appendRow(sheetId: string, token: string, row: string[]): Promise<void> {
  const range = encodeURIComponent(`${TAB_NAME}!A:F`);
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ values: [row] }),
    },
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Sheets append failed: ${err}`);
  }
}

// ---------------------------------------------------------------------------
// Email helpers
// ---------------------------------------------------------------------------

const SERVICE_LABELS: Record<string, string> = {
  'weight-management': 'Weight Management',
  'peptide-therapy': 'Peptide Therapy',
  'hormone-optimization': 'Hormone Optimization',
  'surgical-preop': 'Surgical Preoperative Optimization',
  'general-wellness': 'General Wellness Consultation',
};

function formatValue(value: unknown): string {
  if (value === null || value === undefined || value === '') return '(not answered)';
  if (Array.isArray(value)) return value.length > 0 ? value.join(', ') : '(none selected)';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  return String(value);
}

function humanizeKey(key: string): string {
  // Convert camelCase or snake_case to Title Case
  const spaced = key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ');
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function buildAdminEmail(
  serviceLabel: string,
  patientName: string,
  patientEmail: string,
  patientPhone: string,
  responses: Record<string, unknown>,
): { subject: string; html: string; text: string } {
  const rows = Object.entries(responses)
    .map(([key, value]) => {
      const label = humanizeKey(key);
      const formatted = formatValue(value);
      return `
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #2a2a3e; color: #c9a84c; font-weight: 600; vertical-align: top; width: 40%;">${label}</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #2a2a3e; color: #e5e5e5; vertical-align: top;">${formatted}</td>
        </tr>
      `;
    })
    .join('');

  const textRows = Object.entries(responses)
    .map(([key, value]) => `${humanizeKey(key)}: ${formatValue(value)}`)
    .join('\n');

  const subject = `New Patient Intake — ${serviceLabel} — ${patientName}`;

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>${subject}</title></head>
<body style="margin:0; padding: 24px; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
  <div style="max-width: 640px; margin: 0 auto; background-color: #1a1a2e; border: 1px solid rgba(201,168,76,0.2); border-radius: 8px; overflow: hidden;">
    <div style="padding: 24px 28px; background: linear-gradient(180deg, #1a1a2e 0%, #0d0d1a 100%); border-bottom: 1px solid rgba(201,168,76,0.2);">
      <h1 style="margin: 0 0 6px; color: #c9a84c; font-size: 22px;">New Patient Intake</h1>
      <p style="margin: 0; color: #e5e5e5; font-size: 14px;">${serviceLabel}</p>
    </div>

    <div style="padding: 24px 28px;">
      <h2 style="margin: 0 0 12px; color: #ffffff; font-size: 16px;">Patient</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 6px 0; color: #c9a84c; font-weight: 600; width: 30%;">Name</td>
          <td style="padding: 6px 0; color: #e5e5e5;">${patientName}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #c9a84c; font-weight: 600;">Email</td>
          <td style="padding: 6px 0; color: #e5e5e5;">${patientEmail}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #c9a84c; font-weight: 600;">Phone</td>
          <td style="padding: 6px 0; color: #e5e5e5;">${patientPhone || '(not provided)'}</td>
        </tr>
      </table>

      <h2 style="margin: 0 0 12px; color: #ffffff; font-size: 16px;">Responses</h2>
      <table style="width: 100%; border-collapse: collapse; background-color: #0a0a0a; border: 1px solid #2a2a3e; border-radius: 6px; overflow: hidden;">
        ${rows}
      </table>
    </div>

    <div style="padding: 16px 28px; background-color: #0d0d1a; border-top: 1px solid rgba(201,168,76,0.2); color: #888; font-size: 12px; text-align: center;">
      LATOM Wellness — Patient Intake Form
    </div>
  </div>
</body>
</html>`;

  const text = `New Patient Intake — ${serviceLabel}

Name:  ${patientName}
Email: ${patientEmail}
Phone: ${patientPhone || '(not provided)'}

Responses:
${textRows}
`;

  return { subject, html, text };
}

function buildPatientConfirmEmail(
  serviceLabel: string,
  patientName: string,
): { subject: string; html: string; text: string } {
  const subject = `We received your intake form — LATOM Wellness`;

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>${subject}</title></head>
<body style="margin:0; padding: 24px; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
  <div style="max-width: 560px; margin: 0 auto; background-color: #1a1a2e; border: 1px solid rgba(201,168,76,0.2); border-radius: 8px; overflow: hidden;">
    <div style="padding: 28px; background: linear-gradient(180deg, #1a1a2e 0%, #0d0d1a 100%); border-bottom: 1px solid rgba(201,168,76,0.2);">
      <h1 style="margin: 0; color: #c9a84c; font-size: 22px;">Thank you, ${patientName}</h1>
    </div>

    <div style="padding: 28px; color: #e5e5e5; line-height: 1.6;">
      <p style="margin: 0 0 14px;">We received your <strong style="color:#c9a84c;">${serviceLabel}</strong> intake form.</p>
      <p style="margin: 0 0 14px;">Dr. Abdulhakim will review your responses before your consultation so your time together is focused on what matters most to you.</p>
      <p style="margin: 0 0 14px;">If you haven't already booked a consultation, you can do so at <a href="https://latomwellness.com/book" style="color:#c9a84c;">latomwellness.com/book</a>.</p>
      <p style="margin: 18px 0 0; color: #aaaaaa; font-size: 13px;">Questions? Reply to this email and we'll get back to you within 24 hours.</p>
    </div>

    <div style="padding: 16px 28px; background-color: #0d0d1a; border-top: 1px solid rgba(201,168,76,0.2); color: #888; font-size: 12px; text-align: center;">
      LATOM Wellness &bull; Dr. Abdilatif Abdulhakim, MD
    </div>
  </div>
</body>
</html>`;

  const text = `Thank you, ${patientName}

We received your ${serviceLabel} intake form. Dr. Abdulhakim will review your responses before your consultation.

If you haven't already booked, visit https://latomwellness.com/book

Questions? Reply to this email.

— LATOM Wellness
`;

  return { subject, html, text };
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Partial<LogIntakeBody>;
    const { service, patientName, patientEmail, patientPhone, formResponses } = body;

    if (!service || !patientName || !patientEmail || !formResponses) {
      return NextResponse.json(
        { error: 'Missing required fields: service, patientName, patientEmail, formResponses' },
        { status: 400 },
      );
    }

    const serviceLabel = SERVICE_LABELS[service] ?? service;

    // --- Google Sheets (optional — log failure but don't block email) ---
    let sheetLogged = false;
    let sheetError: string | null = null;
    try {
      const serviceAccountRaw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
      const sheetId =
        process.env.GOOGLE_SHEETS_INTAKE_LOG_ID ||
        process.env.GOOGLE_SHEETS_PAYMENT_LOG_ID;

      if (serviceAccountRaw && sheetId) {
        const serviceAccount = JSON.parse(atob(serviceAccountRaw)) as ServiceAccountKey;
        const token = await getAccessToken(serviceAccount, 'https://www.googleapis.com/auth/spreadsheets');
        await ensureTabWithHeaders(sheetId, token);

        const row = [
          new Date().toISOString(),
          serviceLabel,
          patientName,
          patientEmail,
          patientPhone ?? '',
          JSON.stringify(formResponses),
        ];
        await appendRow(sheetId, token, row);
        sheetLogged = true;
      } else {
        sheetError = 'Sheets not configured (missing GOOGLE_SERVICE_ACCOUNT_KEY or GOOGLE_SHEETS_INTAKE_LOG_ID)';
      }
    } catch (err) {
      sheetError = err instanceof Error ? err.message : 'Unknown sheets error';
      console.error('[log-intake] Sheets error:', sheetError);
    }

    // --- Email (admin + patient) ---
    let emailSent = false;
    let emailError: string | null = null;
    try {
      if (!process.env.RESEND_API_KEY) {
        emailError = 'RESEND_API_KEY not configured';
      } else {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const adminEmail = process.env.NOTIFICATION_EMAIL || 'anesbrothers@gmail.com';

        const admin = buildAdminEmail(
          serviceLabel,
          patientName,
          patientEmail,
          patientPhone ?? '',
          formResponses as Record<string, unknown>,
        );

        const adminSend = await resend.emails.send({
          from: 'LATOM Wellness <onboarding@resend.dev>',
          to: adminEmail,
          replyTo: patientEmail,
          subject: admin.subject,
          html: admin.html,
          text: admin.text,
        });

        if (adminSend.error) {
          emailError = `Admin email failed: ${JSON.stringify(adminSend.error)}`;
          console.error('[log-intake]', emailError);
        } else {
          emailSent = true;
        }

        // Patient confirmation (fire-and-note; don't fail the whole request if this errors)
        const patient = buildPatientConfirmEmail(serviceLabel, patientName);
        const patientSend = await resend.emails.send({
          from: 'LATOM Wellness <onboarding@resend.dev>',
          to: patientEmail,
          subject: patient.subject,
          html: patient.html,
          text: patient.text,
        });
        if (patientSend.error) {
          console.error('[log-intake] Patient confirmation email failed:', patientSend.error);
        }
      }
    } catch (err) {
      emailError = err instanceof Error ? err.message : 'Unknown email error';
      console.error('[log-intake] Email error:', emailError);
    }

    if (!sheetLogged && !emailSent) {
      return NextResponse.json(
        {
          error: 'Failed to log intake — both Sheets and Email failed',
          sheetError,
          emailError,
        },
        { status: 502 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Intake received',
        sheetLogged,
        emailSent,
        ...(sheetError ? { sheetError } : {}),
        ...(emailError ? { emailError } : {}),
      },
      { status: 200 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[log-intake] Error:', message);
    return NextResponse.json({ error: `Failed to log intake: ${message}` }, { status: 500 });
  }
}
