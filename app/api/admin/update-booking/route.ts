/**
 * PATCH /api/admin/update-booking
 *
 * Auth-gated endpoint that updates a D1 booking record.
 *
 * Body:
 *   {
 *     id: number                    (required)
 *     payment_status?: string       (pending|invoice_sent|paid|cancelled|refunded)
 *     invoice_url?: string
 *     helcim_transaction_id?: string
 *     notes?: string
 *     amount_cents?: number
 *   }
 *
 * Response: { success: true, booking: BookingRow }
 *
 * Rate limit: 30 req/min per IP (bucket: admin-update-booking)
 *
 * Env:
 *   ADMIN_SECRET_TOKEN - required
 */

import { NextRequest, NextResponse } from 'next/server';
import { updateBookingStatus, getBookingById, BookingRow } from '../../../lib/db';
import { rateLimit } from '../../../lib/rateLimit';

export const runtime = 'edge';

const VALID_PAYMENT_STATUSES: BookingRow['payment_status'][] = [
  'pending',
  'invoice_sent',
  'paid',
  'cancelled',
  'refunded',
];

function requireAdmin(req: NextRequest): NextResponse | null {
  const expected = process.env.ADMIN_SECRET_TOKEN;
  if (!expected) {
    return NextResponse.json(
      { error: 'Server misconfiguration: ADMIN_SECRET_TOKEN not set' },
      { status: 503 },
    );
  }
  const provided =
    req.headers.get('x-admin-token') ||
    req.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (provided !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

export async function PATCH(req: NextRequest): Promise<NextResponse> {
  const authError = requireAdmin(req);
  if (authError) return authError;

  const rl = rateLimit(req, { max: 30, windowMs: 60_000, bucket: 'admin-update-booking' });
  if (!rl.ok) {
    return NextResponse.json(
      { error: 'Too many requests' },
      {
        status: 429,
        headers: { 'Retry-After': String(Math.ceil((rl.resetAt - Date.now()) / 1000)) },
      },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { id, payment_status, invoice_url, helcim_transaction_id, notes, amount_cents } = body;

  // Validate id
  if (id === undefined || id === null || typeof id !== 'number' || !Number.isInteger(id)) {
    return NextResponse.json({ error: '"id" is required and must be an integer' }, { status: 400 });
  }

  // Validate payment_status if provided
  if (
    payment_status !== undefined &&
    !VALID_PAYMENT_STATUSES.includes(payment_status as BookingRow['payment_status'])
  ) {
    return NextResponse.json(
      { error: `"payment_status" must be one of: ${VALID_PAYMENT_STATUSES.join(', ')}` },
      { status: 400 },
    );
  }

  // Build patch with only allowed fields
  const patch: Partial<Pick<BookingRow, 'payment_status' | 'invoice_url' | 'helcim_transaction_id' | 'notes' | 'amount_cents'>> = {};
  if (payment_status !== undefined) patch.payment_status = payment_status as BookingRow['payment_status'];
  if (invoice_url !== undefined) patch.invoice_url = invoice_url as string | null;
  if (helcim_transaction_id !== undefined) patch.helcim_transaction_id = helcim_transaction_id as string | null;
  if (notes !== undefined) patch.notes = notes as string | null;
  if (amount_cents !== undefined) patch.amount_cents = amount_cents as number | null;

  try {
    await updateBookingStatus(id as number, patch);
    const booking = await getBookingById(id as number);
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, booking }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
