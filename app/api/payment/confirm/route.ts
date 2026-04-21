import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'edge';

const resend = new Resend(process.env.RESEND_API_KEY);

const validProtocols = ['cardiovascular', 'metabolic', 'hormone-optimization', 'longevity', 'surgical-preop'];
const protocolNames: Record<string, string> = {
  cardiovascular: 'Cardiovascular Optimization Protocol',
  metabolic: 'Metabolic Enhancement Protocol',
  'hormone-optimization': 'Hormone Optimization Protocol',
  longevity: 'Longevity Protocol',
  'surgical-preop': 'Surgical Preoperative Optimization Protocol',
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { paymentMethod, serviceName, amount, patientName, patientEmail, patientPhone, protocolId } = body;

    if (!paymentMethod || !serviceName || !amount || !patientName || !patientEmail || !patientPhone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate protocol if provided
    const isProtocolPayment = protocolId && validProtocols.includes(protocolId);
    if (protocolId && !validProtocols.includes(protocolId)) {
      return NextResponse.json({ error: 'Invalid protocol ID' }, { status: 400 });
    }

    // Send payment confirmation email to practice
    const practiceEmail = process.env.NOTIFICATION_EMAIL || 'anesbrothers@gmail.com';

    const paymentMethodLabel = paymentMethod === 'zelle' ? 'Zelle' : 'Venmo';
    const accountInfo = paymentMethod === 'zelle'
      ? `${process.env.NEXT_PUBLIC_ZELLE_EMAIL || 'pay@latomwellness.com'}`
      : `@${process.env.NEXT_PUBLIC_VENMO_USERNAME || 'latom-wellness'}`;

    const protocolSection = isProtocolPayment
      ? `
          <div style="background: #ffe8cc; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #c9a84c;">
            <h3 style="margin-top: 0; color: #333;">Protocol Unlock Required:</h3>
            <p><strong>Protocol:</strong> ${protocolNames[protocolId]}</p>
            <p style="color: #c9a84c; font-weight: bold;">Action Item: Use /api/admin/unlock endpoint to generate unlock link, then send to customer</p>
          </div>
        `
      : '';

    const nextStepsHtml = isProtocolPayment
      ? `
          <h3 style="color: #333;">Next Steps:</h3>
          <ol>
            <li>Verify payment received in your ${paymentMethodLabel} account (${accountInfo})</li>
            <li>POST to <code>/api/admin/unlock</code> with { secret, protocolId: "${protocolId}", email: "${patientEmail}", unlockToken } to generate unlock link</li>
            <li>Send unlock link to customer via email</li>
            <li>Customer accesses protocol at their unlock link</li>
          </ol>
        `
      : `
          <h3 style="color: #333;">Next Steps:</h3>
          <ol>
            <li>Verify payment received in your ${paymentMethodLabel} account (${accountInfo})</li>
            <li>Confirm receipt of payment to patient via email</li>
            <li>Send booking confirmation and next appointment steps</li>
            <li>Patient will schedule via Cal.com: <strong>latom-wellness/consultation</strong></li>
          </ol>
        `;

    const confirmationEmail = await resend.emails.send({
      from: 'LATOM Wellness <onboarding@resend.dev>',
      to: practiceEmail,
      subject: `Payment Confirmation — ${patientName} ($${amount})${isProtocolPayment ? ` - ${protocolNames[protocolId]}` : ''}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #c9a84c;">Payment Confirmation Received</h2>

          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Patient Information:</h3>
            <p><strong>Name:</strong> ${patientName}</p>
            <p><strong>Email:</strong> ${patientEmail}</p>
            <p><strong>Phone:</strong> ${patientPhone}</p>
          </div>

          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Payment Details:</h3>
            <p><strong>Service:</strong> ${serviceName}</p>
            <p><strong>Amount:</strong> $${amount}</p>
            <p><strong>Payment Method:</strong> ${paymentMethodLabel}</p>
            <p><strong>Account:</strong> ${accountInfo}</p>
            <p><strong>Status:</strong> Pending verification</p>
          </div>

          ${protocolSection}

          ${nextStepsHtml}

          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #999; font-size: 12px;">This is an automated payment confirmation from the LATOM Wellness booking system.</p>
        </div>
      `,
    });

    if (confirmationEmail.error) {
      console.error('Email send error:', confirmationEmail.error);
      return NextResponse.json(
        { error: 'Failed to send confirmation email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Payment confirmation received. We will verify your payment and send you a booking confirmation within 24 hours.',
        protocolId: isProtocolPayment ? protocolId : undefined,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Payment confirmation error:', error);
    return NextResponse.json(
      { error: 'Failed to process payment confirmation' },
      { status: 500 }
    );
  }
}
