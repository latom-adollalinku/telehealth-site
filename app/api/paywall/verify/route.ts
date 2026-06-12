import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '../../../lib/rateLimit';
import { findPaidProtocolUnlock, getBookingById } from '../../../lib/db';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const limit = rateLimit(req, { max: 30, windowMs: 60_000, bucket: 'paywall-verify' });
  if (!limit.ok) {
    return new Response(JSON.stringify({ error: 'Too many requests' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json', 'Retry-After': '60' },
    });
  }

  try {
    const body = await req.json();
    const { email, protocolId, bookingId } = body as {
      email?: string;
      protocolId?: string;
      bookingId?: string;
    };

    // Helcim flow: resolve email + protocolId from a booking record
    if (bookingId) {
      const id = parseInt(bookingId, 10);
      if (isNaN(id)) {
        return NextResponse.json({ error: 'Invalid bookingId' }, { status: 400 });
      }
      const booking = await getBookingById(id);
      if (!booking || booking.payment_status !== 'paid' || !booking.protocol_id) {
        return NextResponse.json({ unlocked: false });
      }
      if (protocolId && booking.protocol_id !== protocolId) {
        return NextResponse.json({ unlocked: false });
      }
      return NextResponse.json({ unlocked: true, email: booking.patient_email });
    }

    // Standard flow: email + protocolId provided directly
    if (!email || !protocolId) {
      return NextResponse.json({ error: 'Missing email or protocolId' }, { status: 400 });
    }

    const unlocked = await findPaidProtocolUnlock(email, protocolId);
    return NextResponse.json({ unlocked });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
