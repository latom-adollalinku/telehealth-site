import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'edge';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, state, service, preferredDate, preferredTime, goals } = body;

    if (!name || !email || !phone || !state || !service) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Send confirmation email to patient (test mode: send to practice email)
    const patientEmailPromise = resend.emails.send({
      from: 'LATOM Wellness <onboarding@resend.dev>',
      to: process.env.NOTIFICATION_EMAIL || 'info@latomwellness.com',
      subject: 'Your Consultation Request Received — LATOM Wellness',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #c9a84c;">Consultation Request Received</h2>
          <p>Hi ${name},</p>
          <p>Thank you for requesting a consultation with Dr. Abdulhakim, MD. We've received your request and will contact you within <strong>24 hours</strong> to confirm your appointment time and discuss payment options.</p>

          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Your Request Details:</h3>
            <p><strong>Service:</strong> ${service}</p>
            <p><strong>Preferred Date:</strong> ${preferredDate || 'Not specified'}</p>
            <p><strong>Preferred Time:</strong> ${preferredTime || 'Not specified'}</p>
            <p><strong>State:</strong> ${state}</p>
            ${goals ? `<p><strong>Health Goals:</strong> ${goals}</p>` : ''}
          </div>

          <h3 style="color: #333;">What Happens Next:</h3>
          <ol>
            <li>We'll review your request</li>
            <li>Call you at <strong>${phone}</strong> to schedule your appointment</li>
            <li>Send you a booking link and payment instructions</li>
            <li>You'll have your consultation via secure video call</li>
          </ol>

          <p style="color: #666; font-size: 14px;">If you have any questions before we contact you, call <strong>(678) 404-0730</strong></p>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #999; font-size: 12px;">This is a transactional email. You received this because you submitted a consultation request on latomwellness.com.</p>
        </div>
      `,
    });

    // Send notification email to practice
    const practiceEmailPromise = resend.emails.send({
      from: 'LATOM Wellness <onboarding@resend.dev>',
      to: process.env.NOTIFICATION_EMAIL || 'info@latomwellness.com',
      subject: `New Consultation Request — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #c9a84c;">New Consultation Request</h2>

          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>State:</strong> ${state}</p>
            <p><strong>Service:</strong> ${service}</p>
            <p><strong>Preferred Date:</strong> ${preferredDate || 'Not specified'}</p>
            <p><strong>Preferred Time:</strong> ${preferredTime || 'Not specified'}</p>
            ${goals ? `<p><strong>Health Goals:</strong> ${goals}</p>` : ''}
          </div>

          <p><strong>Action:</strong> Contact patient at <strong>${phone}</strong> or <strong>${email}</strong> to confirm appointment and send booking/payment link.</p>
        </div>
      `,
    });

    // Wait for both emails to send
    const [patientResult, practiceResult] = await Promise.all([
      patientEmailPromise,
      practiceEmailPromise,
    ]);

    if (patientResult.error || practiceResult.error) {
      console.error('Email send error:', { patientResult, practiceResult });
      return NextResponse.json(
        { error: 'Failed to send confirmation email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Consultation request received. Confirmation email sent. We will contact you within 24 hours.',
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
