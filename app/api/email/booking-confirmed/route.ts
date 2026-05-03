import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { renderBookingConfirmedEmail } from '../../../emails/booking-confirmed';

export const runtime = 'edge';

const resend = new Resend(process.env.RESEND_API_KEY);

interface BookingConfirmedPayload {
  patientName: string;
  patientEmail: string;
  serviceName: string;
  appointmentDate: string;
  appointmentTime: string;
  meetingLink?: string;
  prepInstructions?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<BookingConfirmedPayload>;
    const {
      patientName,
      patientEmail,
      serviceName,
      appointmentDate,
      appointmentTime,
      meetingLink,
      prepInstructions,
    } = body;

    if (
      !patientName ||
      !patientEmail ||
      !serviceName ||
      !appointmentDate ||
      !appointmentTime
    ) {
      return NextResponse.json(
        {
          error:
            'Missing required fields: patientName, patientEmail, serviceName, appointmentDate, appointmentTime',
        },
        { status: 400 }
      );
    }

    const practiceEmail =
      process.env.NOTIFICATION_EMAIL || 'info@latomwellness.com';

    const { subject, html, text } = renderBookingConfirmedEmail({
      patientName,
      serviceName,
      appointmentDate,
      appointmentTime,
      meetingLink,
      prepInstructions,
    });

    const result = await resend.emails.send({
      from: 'LATOM Wellness <onboarding@resend.dev>',
      to: patientEmail,
      bcc: practiceEmail,
      subject,
      html,
      text,
    });

    if (result.error) {
      console.error('Booking confirmed email error:', result.error);
      return NextResponse.json(
        { error: 'Failed to send booking confirmation email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Booking confirmation email sent.',
        id: result.data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Booking confirmed route error:', error);
    return NextResponse.json(
      { error: 'Failed to process booking confirmation email' },
      { status: 500 }
    );
  }
}
