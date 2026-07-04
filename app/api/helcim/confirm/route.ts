import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '../../../lib/rateLimit';
import { getDB, updateBookingStatus } from '../../../lib/db';

export const runtime = 'edge';

/**
 * POST /api/helcim/confirm
 *
 * Called by the client immediately after Helcim Pay.js reports SUCCESS.
 * Body: { bookingId: number, transactionId: string }
 *
 * The client is never trusted: we fetch the transaction from the Helcim
 * Card Transaction API server-side and only mark the booking paid when
 * the transaction is APPROVED and its amount matches the staged booking.
 * The Helcim webhook remains the redundant back-stop path.
 */

interface HelcimCardTransaction {
  transactionId?: number | string;
  status?: string;
  type?: string;
  amount?: number | string;
  invoiceNumber?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const rl = rateLimit(request, { max: 20, windowMs: 60_000, bucket: 'helcim-confirm' });
  if (!rl.ok) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const apiKey = (process.env.HELCIM_API_KEY ?? '').trim();
  if (!apiKey) {
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 503 });
  }

  let body: { bookingId?: number | string; transactionId?: number | string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const bookingId = Number(body.bookingId);
  const transactionId = String(body.transactionId ?? '').trim();
  if (!Number.isInteger(bookingId) || bookingId <= 0 || !transactionId || !/^[\w-]+$/.test(transactionId)) {
    return NextResponse.json({ error: 'Missing or invalid bookingId/transactionId' }, { status: 400 });
  }

  try {
    // 1. Load the staged booking
    const db = getDB();
    const booking = await db
      .prepare('SELECT id, amount_cents, payment_status FROM bookings WHERE id = ? LIMIT 1')
      .bind(bookingId)
      .first<{ id: number; amount_cents: number; payment_status: string }>();

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }
    if (booking.payment_status === 'paid') {
      return NextResponse.json({ ok: true, paid: true, already: true });
    }

    // 2. Verify the transaction against Helcim
    const txRes = await fetch(
      `https://api.helcim.com/v2/card-transactions/${encodeURIComponent(transactionId)}`,
      { headers: { 'api-token': apiKey, accept: 'application/json' } },
    );
    if (!txRes.ok) {
      console.error('helcim/confirm: transaction lookup failed', txRes.status);
      return NextResponse.json({ error: 'Transaction verification failed' }, { status: 502 });
    }
    const tx = (await txRes.json()) as HelcimCardTransaction;

    const approved = String(tx.status ?? '').toUpperCase() === 'APPROVED';
    const txCents = Math.round(Number(tx.amount ?? 0) * 100);
    const amountMatches = txCents === booking.amount_cents;

    if (!approved || !amountMatches) {
      console.error('helcim/confirm: mismatch', {
        bookingId,
        transactionId,
        approved,
        txCents,
        expected: booking.amount_cents,
      });
      return NextResponse.json({ ok: false, paid: false }, { status: 409 });
    }

    // 3. Mark paid
    await updateBookingStatus(bookingId, {
      payment_status: 'paid',
      helcim_transaction_id: transactionId,
    });

    return NextResponse.json({ ok: true, paid: true });
  } catch (err) {
    console.error('helcim/confirm failed:', err);
    return NextResponse.json({ error: 'Confirmation failed' }, { status: 500 });
  }
}
