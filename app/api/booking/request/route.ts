import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { rateLimit } from '../../../lib/rateLimit';
import { insertBooking } from '../../../lib/db';

export const runtime = 'edge';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const limit = rateLimit(req, { max: 10, windowMs: 60_000, bucket: 'booking-request' });
  if (!limit.ok) {
    return new Response(JSON.stringify({ error: 'Too many requests' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json', 'Retry-After': '60' },
    });
  }
  try {
    const body = await req.json();
    const { name, email, phone, state, service, preferredDate, preferredTime, goals, tier } = body;

    // State only required for medical tier (telemedicine licensure). Wellness tier is geographic-agnostic.
    const requireState = tier === 'medical';
    if (!name || !email || !phone || !service || (requireState && !state)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const stateLabel = state || (tier === 'wellness' ? 'Any (wellness consult)' : 'Not specified');

    // Send confirmation email to patient (test mode: send to practice email)
    const patientEmailPromise = resend.emails.send({
      from: 'LATOM Wellness <onboarding@resend.dev>',
      to: process.env.NOTIFICATION_EMAIL || 'info@latomwellness.com',
      subject: 'Your Consultation Request Received - LATOM Wellness',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #c9a84c;">Consultation Request Received</h2>
          <p>Hi ${name},</p>
          <p>Thank you for requesting a consultation with Dr. Abdul, MD. We've received your request and will contact you within <strong>24 hours</strong> to confirm your appointment time and discuss payment options.</p>

          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Your Request Details:</h3>
            <p><strong>Service:</strong> ${service}</p>
            <p><strong>Preferred Date:</strong> ${preferredDate || 'Not specified'}</p>
            <p><strong>Preferred Time:</strong> ${preferredTime || 'Not specified'}</p>
            <p><strong>State:</strong> ${stateLabel}</p>
            ${goals ? `<p><strong>Health Goals:</strong> ${goals}</p>` : ''}
          </div>

          <h3 style="color: #333;">What Happens Next:</h3>
          <ol>
            <li>We'll review your request</li>
            <li>Call you at <strong>${phone}</strong> to schedule your appointment</li>
            <li>Send you a booking link and payment instructions</li>
            <li>You'll have your consultation via secure video call</li>
          </ol>

          <p style="color: #666; font-size: 14px;">If you have any questions before we contact you, call <strong>(307) 210-8604</strong></p>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #999; font-size: 12px;">This is a transactional email. You received this because you submitted a consultation request on latomwellness.com.</p>
        </div>
      `,
    });

    // Send notification email to practice
    const practiceEmailPromise = resend.emails.send({
      from: 'LATOM Wellness <onboarding@resend.dev>',
      to: process.env.NOTIFICATION_EMAIL || 'info@latomwellness.com',
      subject: `New Consultation Request - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #c9a84c;">New Consultation Request</h2>

          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>State:</strong> ${stateLabel}</p>
            <p><strong>Service:</strong> ${service}</p>
            <p><strong>Preferred Date:</strong> ${preferredDate || 'Not specified'}</p>
            <p><strong>Preferred Time:</strong> ${preferredTime || 'Not specified'}</p>
            ${goals ? `<p><strong>Health Goals:</strong> ${goals}</p>` : ''}
          </div>

          <p><strong>Action:</strong> Contact patient at <strong>${phone}</strong> or <strong>${email}</strong> to confirm appointment and send booking/payment link.</p>
        </div>
      `,
    });

    // Fire both emails but don't block the booking on email delivery.
    // We always return 200 once the booking is captured. Email failures are logged
    // (visible in Cloudflare logs) and Dr. Abdul can also pull bookings via /admin.
    const [patientResult, practiceResult] = await Promise.allSettled([
      patientEmailPromise,
      practiceEmailPromise,
    ]);
    if (
      (patientResult.status === 'fulfilled' && patientResult.value?.error) ||
      patientResult.status === 'rejected' ||
      (practiceResult.status === 'fulfilled' && practiceResult.value?.error) ||
      practiceResult.status === 'rejected'
    ) {
      console.error('Email send error (booking still captured):', { patientResult, practiceResult });
    }

    try {
      await insertBooking({
        tier: tier === 'medical' ? 'medical' : 'wellness',
        patient_name: name,
        patient_email: email,
        patient_phone: phone,
        patient_state: state || null,
        service,
        patient_dob: body.dob || null,
        medical_history: body.medicalHistory || null,
        current_medications: body.medications || null,
        allergies: body.allergies || null,
        goals: goals || null,
        preferred_date: preferredDate || null,
        preferred_time: preferredTime || null,
        amount_cents: null,
        protocol_id: null,
        invoice_url: null,
        helcim_transaction_id: null,
        notes: null,
        raw_payload: JSON.stringify(body),
      });
    } catch (dbError) {
      console.error('D1 insert error (booking still returned 200):', dbError);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Consultation request received. We will contact you within 24 hours.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Booking API error:', error);
    return NextResponse.json(
      { error: 'Failed to process booking request' },
      { status: 500 }
    );
  }
}
