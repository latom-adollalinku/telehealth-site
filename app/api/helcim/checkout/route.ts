import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '../../../lib/rateLimit';
import { insertBooking, updateBookingStatus } from '../../../lib/db';

export const runtime = 'edge';

interface CheckoutRequestBody {
  tier: 'protocol' | 'service';
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  serviceName: string;
  amount: number;
  protocolId?: string | null;
}

interface HelcimInitResponse {
  secretToken: string;
  checkoutToken: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  // Rate limit: 20 req/min/IP
  const rl = rateLimit(request, { max: 20, windowMs: 60_000, bucket: 'helcim-checkout' });
  if (!rl.ok) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait and try again.' },
      { status: 429 },
    );
  }

  const apiKey = (process.env.HELCIM_API_KEY ?? '').trim();
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Server misconfiguration: HELCIM_API_KEY not set' },
      { status: 503 },
    );
  }

  let body: CheckoutRequestBody;
  try {
    body = (await request.json()) as CheckoutRequestBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { tier, patientName, patientEmail, patientPhone, serviceName, amount, protocolId } = body;

  if (!tier || !patientName || !patientEmail || !patientPhone || !serviceName || amount == null) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const amountCents = Math.round(amount * 100);

  // 1. Stage booking in D1 with payment_status='pending'
  let bookingId: number;
  try {
    bookingId = await insertBooking({
      tier,
      patient_name: patientName,
      patient_email: patientEmail,
      patient_phone: patientPhone,
      patient_dob: null,
      patient_state: null,
      service: serviceName,
      amount_cents: amountCents,
      goals: null,
      medical_history: null,
      current_medications: null,
      allergies: null,
      protocol_id: protocolId ?? null,
      preferred_date: null,
      preferred_time: null,
      payment_status: 'pending',
      invoice_url: null,
      helcim_transaction_id: null,
      notes: null,
      raw_payload: JSON.stringify(body),
    });
  } catch (err) {
    console.error('D1 insertBooking failed:', err);
    return NextResponse.json({ error: 'Failed to stage booking' }, { status: 500 });
  }

  // 2. Initialize Helcim Pay.js session
  let helcimData: HelcimInitResponse;
  try {
    const helcimRes = await fetch('https://api.helcim.com/v2/helcim-pay/initialize', {
      method: 'POST',
      headers: {
        'api-token': apiKey,
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        paymentType: 'purchase',
        amount,
        currency: 'USD',
      }),
    });

    if (!helcimRes.ok) {
      const text = await helcimRes.text();
      console.error('Helcim API error:', helcimRes.status, text);
      return NextResponse.json({ error: 'Payment initialization failed' }, { status: 500 });
    }

    helcimData = (await helcimRes.json()) as HelcimInitResponse;
  } catch (err) {
    console.error('Helcim fetch failed:', err);
    return NextResponse.json({ error: 'Payment initialization failed' }, { status: 500 });
  }

  // 3. Store secretToken on the booking row (never exposed to client)
  try {
    await updateBookingStatus(bookingId, {
      notes: `helcim_secret:${helcimData.secretToken}`,
    });
  } catch (err) {
    console.error('D1 updateBookingStatus failed:', err);
    // Non-fatal: booking is staged; secret will be missing but checkout can still proceed
  }

  // 4. Return only checkoutToken + bookingId to client
  return NextResponse.json({
    checkoutToken: helcimData.checkoutToken,
    bookingId,
  });
}
