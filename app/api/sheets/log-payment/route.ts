/**
 * POST /api/sheets/log-payment
 *
 * Appends a payment record to the telehealth payment log Google Sheet.
 * Uses a Google Service Account for server-to-server auth (edge-compatible).
 *
 * Required env vars:
 *   GOOGLE_SERVICE_ACCOUNT_KEY  — full JSON key from Google Cloud Console, base64-encoded
 *   GOOGLE_SHEETS_PAYMENT_LOG_ID — Sheet ID from the URL (the long string between /d/ and /edit)
 *
 * Sheet columns (auto-created header on first write if sheet is empty):
 *   Date | Patient Name | Email | Service | Amount | Payment Method | Booking ID | Status
 */

import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface LogPaymentBody {
  bookingId: string;
  patientName: string;
  patientEmail: string;
  amount: number | string;
  paymentMethod: 'zelle' | 'venmo';
  service?: string;
  date?: string; // ISO date string; defaults to today
  status?: string; // defaults to "Received"
}

interface ServiceAccountKey {
  client_email: string;
  private_key: string;
}

// ---------------------------------------------------------------------------
// JWT / token helpers (pure Web Crypto — edge-safe)
// ---------------------------------------------------------------------------

/** Base64url-encode a Uint8Array */
function b64url(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let str = '';
  for (const b of bytes) str += String.fromCharCode(b);
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/** Build a signed JWT for Google OAuth2 using RS256 */
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

  // Import the RSA private key (PKCS#8 PEM → CryptoKey)
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

/** Exchange a signed JWT for a Google OAuth2 access token */
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

const SHEET_HEADERS = ['Date', 'Patient Name', 'Email', 'Service', 'Amount', 'Payment Method', 'Booking ID', 'Status'];
const TAB_NAME = 'Telehealth Payments';

/** Fetch the current number of rows in the sheet tab */
async function getRowCount(sheetId: string, token: string): Promise<number> {
  const range = encodeURIComponent(`${TAB_NAME}!A:A`);
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );

  if (res.status === 404) return 0; // tab doesn't exist yet
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Sheets read failed: ${err}`);
  }

  const data = await res.json() as { values?: string[][] };
  return data.values?.length ?? 0;
}

/** Ensure the tab exists; create it and write headers if it's brand new */
async function ensureTabWithHeaders(sheetId: string, token: string): Promise<void> {
  // Check if the tab exists by trying to read it
  const range = encodeURIComponent(`${TAB_NAME}!A1`);
  const checkRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );

  if (checkRes.ok) {
    const data = await checkRes.json() as { values?: string[][] };
    // Tab exists and has data — nothing to do
    if (data.values && data.values.length > 0) return;
  }

  if (!checkRes.ok && checkRes.status !== 400) {
    // 400 = range not found (tab missing) — fall through to create it
    const err = await checkRes.text();
    throw new Error(`Sheets check failed: ${err}`);
  }

  // Need to create the tab
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

  // Write header row
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

/** Append a single row to the sheet tab */
async function appendRow(sheetId: string, token: string, row: string[]): Promise<void> {
  const range = encodeURIComponent(`${TAB_NAME}!A:H`);
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
// Route handler
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  try {
    // --- Parse and validate body ---
    const body = await req.json() as Partial<LogPaymentBody>;
    const { bookingId, patientName, patientEmail, amount, paymentMethod, service, date, status } = body;

    if (!bookingId || !patientName || !patientEmail || amount === undefined || !paymentMethod) {
      return NextResponse.json(
        { error: 'Missing required fields: bookingId, patientName, patientEmail, amount, paymentMethod' },
        { status: 400 },
      );
    }

    if (!['zelle', 'venmo'].includes(paymentMethod)) {
      return NextResponse.json({ error: 'paymentMethod must be "zelle" or "venmo"' }, { status: 400 });
    }

    // --- Resolve env vars ---
    const serviceAccountRaw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    const sheetId = process.env.GOOGLE_SHEETS_PAYMENT_LOG_ID;

    if (!serviceAccountRaw || !sheetId) {
      console.error('[log-payment] Missing env vars: GOOGLE_SERVICE_ACCOUNT_KEY and/or GOOGLE_SHEETS_PAYMENT_LOG_ID');
      return NextResponse.json(
        { error: 'Sheets not configured — set GOOGLE_SERVICE_ACCOUNT_KEY and GOOGLE_SHEETS_PAYMENT_LOG_ID' },
        { status: 503 },
      );
    }

    // Decode base64 service account key
    let serviceAccount: ServiceAccountKey;
    try {
      serviceAccount = JSON.parse(atob(serviceAccountRaw)) as ServiceAccountKey;
    } catch {
      return NextResponse.json({ error: 'Invalid GOOGLE_SERVICE_ACCOUNT_KEY (must be base64-encoded JSON)' }, { status: 500 });
    }

    // --- Auth ---
    const token = await getAccessToken(serviceAccount, 'https://www.googleapis.com/auth/spreadsheets');

    // --- Ensure tab + headers exist ---
    await ensureTabWithHeaders(sheetId, token);

    // --- Build row ---
    const paymentDate = date ?? new Date().toISOString().split('T')[0];
    const paymentStatus = status ?? 'Received';
    const row = [
      paymentDate,
      patientName,
      patientEmail,
      service ?? '',
      String(amount),
      paymentMethod === 'zelle' ? 'Zelle' : 'Venmo',
      bookingId,
      paymentStatus,
    ];

    // --- Append ---
    await appendRow(sheetId, token, row);

    return NextResponse.json(
      { success: true, message: 'Payment logged to Google Sheets', row },
      { status: 200 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[log-payment] Error:', message);
    return NextResponse.json({ error: `Failed to log payment: ${message}` }, { status: 500 });
  }
}
