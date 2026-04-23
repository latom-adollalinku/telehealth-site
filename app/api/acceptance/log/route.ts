import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'edge';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, timestamp, userAgent } = body;

    if (!type || !timestamp) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const acceptanceType = type === 'nda' ? 'NDA' : 'Consent Form (Peptide Therapy)';
    const practiceEmail = process.env.NOTIFICATION_EMAIL || 'anesbrothers@gmail.com';

    await resend.emails.send({
      from: 'LATOM Wellness <onboarding@resend.dev>',
      to: practiceEmail,
      subject: `${acceptanceType} Accepted - ${new Date(timestamp).toLocaleString()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #c9a84c;">Acceptance Logged</h2>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Acceptance Details:</h3>
            <p><strong>Document Type:</strong> ${acceptanceType}</p>
            <p><strong>Timestamp:</strong> ${new Date(timestamp).toLocaleString()}</p>
            <p><strong>ISO Timestamp:</strong> ${timestamp}</p>
            <p><strong>Device:</strong> ${userAgent || 'Not provided'}</p>
          </div>
          <p style="color: #999; font-size: 12px;">This is an automated notification from the LATOM Wellness compliance system.</p>
        </div>
      `,
    }).catch((err) => {
      console.error('Email notification error:', err);
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Acceptance logged successfully',
        type: acceptanceType,
        timestamp,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Acceptance logging error:', error);
    return NextResponse.json(
      { error: 'Failed to log acceptance' },
      { status: 500 }
    );
  }
}
