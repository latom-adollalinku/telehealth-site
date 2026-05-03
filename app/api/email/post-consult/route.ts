import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { renderPostConsultEmail } from '../../../emails/post-consult';

export const runtime = 'edge';

const resend = new Resend(process.env.RESEND_API_KEY);

interface PostConsultPayload {
  patientName: string;
  patientEmail: string;
  serviceName: string;
  consultationDate: string;
  summary?: string;
  nextSteps?: string;
  // Base64-encoded PDF attachment produced by the invoice generator.
  // Attachment wiring is in place but the invoice generation lives elsewhere.
  invoicePdfBase64?: string;
  invoiceFilename?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<PostConsultPayload>;
    const {
      patientName,
      patientEmail,
      serviceName,
      consultationDate,
      summary,
      nextSteps,
      invoicePdfBase64,
      invoiceFilename,
    } = body;

    if (!patientName || !patientEmail || !serviceName || !consultationDate) {
      return NextResponse.json(
        {
          error:
            'Missing required fields: patientName, patientEmail, serviceName, consultationDate',
        },
        { status: 400 }
      );
    }

    const practiceEmail =
      process.env.NOTIFICATION_EMAIL || 'info@latomwellness.com';

    const hasInvoice = Boolean(invoicePdfBase64);

    const { subject, html, text } = renderPostConsultEmail({
      patientName,
      serviceName,
      consultationDate,
      summary,
      nextSteps,
      invoiceAttached: hasInvoice,
    });

    const attachments = hasInvoice
      ? [
          {
            filename: invoiceFilename || 'invoice.pdf',
            content: invoicePdfBase64 as string,
          },
        ]
      : undefined;

    const result = await resend.emails.send({
      from: 'LATOM Wellness <onboarding@resend.dev>',
      to: patientEmail,
      bcc: practiceEmail,
      subject,
      html,
      text,
      attachments,
    });

    if (result.error) {
      console.error('Post-consult email error:', result.error);
      return NextResponse.json(
        { error: 'Failed to send post-consultation email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Post-consultation email sent.',
        id: result.data?.id,
        invoiceAttached: hasInvoice,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Post-consult route error:', error);
    return NextResponse.json(
      { error: 'Failed to process post-consultation email' },
      { status: 500 }
    );
  }
}
