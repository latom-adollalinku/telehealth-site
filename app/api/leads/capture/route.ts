/**
 * POST /api/leads/capture
 *
 * Persists a lead-magnet signup (homepage email capture and friends) to the
 * Leads tab of the Google Sheet and notifies the practice admin via Resend.
 * Previously these leads only lived in the visitor's own localStorage, which
 * meant the practice never saw them.
 *
 * Required env vars (same as the other sheets routes):
 *   GOOGLE_SERVICE_ACCOUNT_KEY   - service account JSON, base64-encoded
 *   GOOGLE_SHEETS_LEADS_LOG_ID   - Sheet ID for leads (falls back to
 *                                  GOOGLE_SHEETS_INTAKE_LOG_ID, then
 *                                  GOOGLE_SHEETS_PAYMENT_LOG_ID)
 *   RESEND_API_KEY               - Resend API key
 *   NOTIFICATION_EMAIL           - admin email (default info@latomwellness.com)
 *
 * Sheet columns: Date | Name | Email | Phone | Interest | Page | Source
 */

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { rateLimit } from '../../../lib/rateLimit';
import { getDB } from '../../../lib/db';

export const runtime = 'edge';

interface LeadBody {
  name?: string;
  email: string;
  phone?: string;
  interest?: string;
  page?: string;
  source?: string;
}

interface ServiceAccountKey {
  client_email: string;
  private_key: string;
}

// ---------------------------------------------------------------------------
// JWT / token helpers (pure Web Crypto - edge-safe)
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

const SHEET_HEADERS = ['Date', 'Name', 'Email', 'Phone', 'Interest', 'Page', 'Source'];
const TAB_NAME = 'Leads';

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
  const range = encodeURIComponent(`${TAB_NAME}!A:G`);
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
// Handler
// ---------------------------------------------------------------------------

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const rl = rateLimit(req, { max: 10, windowMs: 60_000, bucket: 'leads' });
  if (!rl.ok) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again shortly.' },
      { status: 429 },
    );
  }

  let body: LeadBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const email = (body.email || '').trim().slice(0, 200);
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
  }

  const name = (body.name || '').trim().slice(0, 120);
  const phone = (body.phone || '').trim().slice(0, 40);
  const interest = (body.interest || '').trim().slice(0, 200);
  const page = (body.page || '').trim().slice(0, 200);
  const source = (body.source || 'email-capture').trim().slice(0, 80);
  const date = new Date().toISOString();

  const results = { d1: false, sheet: false, email: false };

  // 0. Persist to D1 (visible in /admin/leads, no external service needed)
  try {
    const db = getDB();
    await db
      .prepare(
        `CREATE TABLE IF NOT EXISTS leads (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           created_at TEXT NOT NULL,
           name TEXT,
           email TEXT NOT NULL,
           phone TEXT,
           interest TEXT,
           page TEXT,
           source TEXT
         )`,
      )
      .run();
    await db
      .prepare(
        'INSERT INTO leads (created_at, name, email, phone, interest, page, source) VALUES (?, ?, ?, ?, ?, ?, ?)',
      )
      .bind(date, name, email, phone, interest, page, source)
      .run();
    results.d1 = true;
  } catch (err) {
    console.error('[leads/capture] D1 insert failed:', err);
  }

  // 1. Append to the Leads sheet
  try {
    const keyB64 = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    const sheetId =
      process.env.GOOGLE_SHEETS_LEADS_LOG_ID ||
      process.env.GOOGLE_SHEETS_INTAKE_LOG_ID ||
      process.env.GOOGLE_SHEETS_PAYMENT_LOG_ID;

    if (keyB64 && sheetId) {
      const serviceAccount = JSON.parse(atob(keyB64)) as ServiceAccountKey;
      const token = await getAccessToken(serviceAccount, 'https://www.googleapis.com/auth/spreadsheets');
      await ensureTabWithHeaders(sheetId, token);
      await appendRow(sheetId, token, [date, name, email, phone, interest, page, source]);
      results.sheet = true;
    }
  } catch (err) {
    console.error('[leads/capture] sheet append failed:', err);
  }

  // 2. Notify the practice admin
  try {
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const resend = new Resend(resendKey);
      const admin = process.env.NOTIFICATION_EMAIL || 'info@latomwellness.com';
      await resend.emails.send({
        from: 'LATOM Wellness <notifications@latomwellness.com>',
        to: admin,
        subject: `New Lead${name ? ` - ${name}` : ''} (${source})`,
        text: [
          'New lead captured on latomwellness.com',
          '',
          `Name: ${name || '(not provided)'}`,
          `Email: ${email}`,
          `Phone: ${phone || '(not provided)'}`,
          `Interest: ${interest || '(not specified)'}`,
          `Page: ${page || '(unknown)'}`,
          `Source: ${source}`,
          `Date: ${date}`,
        ].join('\n'),
      });
      results.email = true;
    }
  } catch (err) {
    console.error('[leads/capture] notification email failed:', err);
  }

  // The visitor experience should never fail because of backend plumbing.
  return NextResponse.json({ ok: true, persisted: results });
}
