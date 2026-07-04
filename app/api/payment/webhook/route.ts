export const runtime = 'edge';

import { getDB, updateBookingStatus } from '../../../lib/db';

export async function POST(request: Request): Promise<Response> {
  // --- Read raw body first (needed for signature verification) ---
  const rawBody = await request.text();

  // --- Read required headers ---
  const webhookId = request.headers.get('webhook-id');
  const webhookTimestamp = request.headers.get('webhook-timestamp');
  const webhookSignature = request.headers.get('webhook-signature');

  // --- Validate env secret ---
  const secretB64 = (process.env.HELCIM_WEBHOOK_SECRET ?? '').trim();
  if (!secretB64) {
    console.error('Helcim webhook: HELCIM_WEBHOOK_SECRET is not configured');
    return Response.json({ error: 'Webhook secret not configured' }, { status: 503 });
  }

  // --- Validate header presence ---
  if (!webhookId || !webhookTimestamp || !webhookSignature) {
    return Response.json({ error: 'Missing webhook signature headers' }, { status: 400 });
  }

  // --- Decode the secret (Helcim stores it base64-encoded) ---
  let decodedSecret: Uint8Array;
  try {
    const binaryStr = atob(secretB64);
    decodedSecret = new Uint8Array(binaryStr.length);
    for (let i = 0; i < binaryStr.length; i++) {
      decodedSecret[i] = binaryStr.charCodeAt(i);
    }
  } catch {
    console.error('Helcim webhook: Failed to decode HELCIM_WEBHOOK_SECRET as base64');
    return Response.json({ error: 'Webhook secret misconfigured' }, { status: 503 });
  }

  // --- Compute HMAC-SHA256 of signing content ---
  const signingContent = `${webhookId}.${webhookTimestamp}.${rawBody}`;
  const encoder = new TextEncoder();
  let computed: string;
  try {
    const key = await crypto.subtle.importKey(
      'raw',
      decodedSecret.buffer.slice(decodedSecret.byteOffset, decodedSecret.byteOffset + decodedSecret.byteLength) as ArrayBuffer,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign'],
    );
    const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(signingContent));
    computed = btoa(String.fromCharCode(...new Uint8Array(sig)));
  } catch {
    console.error('Helcim webhook: HMAC computation failed');
    return Response.json({ error: 'Signature computation failed' }, { status: 500 });
  }

  // --- Compare signatures (constant-time via string comparison is acceptable here
  //     since edge runtime lacks timingSafeEqual; HMAC collision resistance is the
  //     primary guard) ---
  if (computed !== webhookSignature) {
    return Response.json({ error: 'Invalid signature' }, { status: 401 });
  }

  // --- Parse body ---
  let payload: { id?: string; type?: string };
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { id, type } = payload;

  // --- Only handle cardTransaction events ---
  if (type !== 'cardTransaction') {
    return Response.json({ received: true, action: 'ignored', type }, { status: 200 });
  }

  if (!id) {
    return Response.json({ error: 'Missing transaction id in payload' }, { status: 400 });
  }

  try {
    // --- Look up booking by helcim_transaction_id or notes ---
    const db = getDB();
    const row = await db
      .prepare('SELECT id FROM bookings WHERE helcim_transaction_id = ? OR notes LIKE ? LIMIT 1')
      .bind(id, `%${id}%`)
      .first<{ id: number }>();

    let bookingId = row?.id ?? null;

    // --- Fallback: resolve via Helcim Card Transaction API. The webhook
    //     payload only carries the transaction id; the transaction record
    //     carries the invoiceNumber we stamped at checkout (= booking id). ---
    if (bookingId === null) {
      const apiKey = (process.env.HELCIM_API_KEY ?? '').trim();
      if (apiKey) {
        const txRes = await fetch(
          `https://api.helcim.com/v2/card-transactions/${encodeURIComponent(id)}`,
          { headers: { 'api-token': apiKey, accept: 'application/json' } },
        );
        if (txRes.ok) {
          const tx = (await txRes.json()) as { invoiceNumber?: string; status?: string };
          const invoiceId = Number(tx.invoiceNumber);
          const approved = String(tx.status ?? '').toUpperCase() === 'APPROVED';
          if (approved && Number.isInteger(invoiceId) && invoiceId > 0) {
            const byInvoice = await db
              .prepare('SELECT id FROM bookings WHERE id = ? LIMIT 1')
              .bind(invoiceId)
              .first<{ id: number }>();
            bookingId = byInvoice?.id ?? null;
          }
        }
      }
    }

    if (bookingId === null) {
      console.error('Helcim webhook for unknown transaction:', id);
      return Response.json({ received: true, action: 'not_found' }, { status: 200 });
    }

    await updateBookingStatus(bookingId, { payment_status: 'paid', helcim_transaction_id: id });

    return Response.json({ success: true, bookingId }, { status: 200 });
  } catch (err) {
    // 500 so Helcim retries the delivery rather than dropping the event.
    console.error('Helcim webhook processing failed:', err);
    return Response.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
