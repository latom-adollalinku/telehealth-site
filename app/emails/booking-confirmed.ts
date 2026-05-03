// Booking Confirmed email template
// Gold (#c9a84c) + dark theme, matches site branding
// Triggered after Cal.com booking is created

export interface BookingConfirmedData {
  patientName: string;
  serviceName: string;
  appointmentDate: string; // human-friendly, e.g. "Tuesday, May 12, 2026"
  appointmentTime: string; // human-friendly, e.g. "2:00 PM ET"
  meetingLink?: string; // optional; if empty we show a "will send 24h before" notice
  prepInstructions?: string; // optional service-specific prep text
}

export function renderBookingConfirmedEmail(data: BookingConfirmedData): {
  subject: string;
  html: string;
  text: string;
} {
  const {
    patientName,
    serviceName,
    appointmentDate,
    appointmentTime,
    meetingLink,
    prepInstructions,
  } = data;

  const meetingBlock = meetingLink
    ? `<p style="margin: 8px 0;"><strong style="color:#c9a84c;">Video Call Link:</strong> <a href="${meetingLink}" style="color:#c9a84c; text-decoration:underline;">${meetingLink}</a></p>`
    : `<p style="margin: 8px 0; color:#cccccc;"><em>Your secure video call link will be sent 24 hours before your appointment.</em></p>`;

  const prepBlock = prepInstructions
    ? `
      <h3 style="color:#c9a84c; margin-top: 24px; font-size: 16px;">How to Prepare</h3>
      <p style="color:#e5e5e5; line-height: 1.6;">${prepInstructions}</p>
    `
    : `
      <h3 style="color:#c9a84c; margin-top: 24px; font-size: 16px;">How to Prepare</h3>
      <ul style="color:#e5e5e5; line-height: 1.8; padding-left: 20px;">
        <li>Have a list of current medications and supplements ready</li>
        <li>Note any recent lab work or medical records you want to discuss</li>
        <li>Write down your top 2-3 health goals for the consultation</li>
        <li>Test your camera and microphone on a quiet, well-lit device</li>
        <li>Join the call 5 minutes early to ensure a smooth connection</li>
      </ul>
    `;

  const subject = `Your Consultation is Scheduled — ${appointmentDate}`;

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${subject}</title>
</head>
<body style="margin:0; padding:0; background:#0a0a0a; font-family: Georgia, 'Times New Roman', serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;">
    <tr>
      <td align="center" style="padding: 32px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; background:#141414; border:1px solid #2a2a2a; border-radius:8px;">
          <tr>
            <td style="padding: 32px; border-bottom: 2px solid #c9a84c;">
              <h1 style="margin:0; color:#c9a84c; font-size: 24px; letter-spacing: 1px;">LATOM Wellness</h1>
              <p style="margin: 4px 0 0 0; color:#999999; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">Dr. Abdi Abdulhakim, MD</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <h2 style="color:#ffffff; margin: 0 0 16px 0; font-size: 22px;">Your consultation is confirmed</h2>
              <p style="color:#e5e5e5; line-height: 1.6; margin: 0 0 20px 0;">Hi ${patientName},</p>
              <p style="color:#e5e5e5; line-height: 1.6; margin: 0 0 24px 0;">Thank you for booking with LATOM Wellness. Your consultation is scheduled, and Dr. Abdulhakim is looking forward to meeting with you.</p>

              <div style="background:#1c1c1c; border-left: 3px solid #c9a84c; padding: 20px; margin: 24px 0; border-radius: 4px;">
                <h3 style="margin: 0 0 12px 0; color:#c9a84c; font-size: 16px;">Appointment Details</h3>
                <p style="margin: 8px 0; color:#e5e5e5;"><strong style="color:#c9a84c;">Service:</strong> ${serviceName}</p>
                <p style="margin: 8px 0; color:#e5e5e5;"><strong style="color:#c9a84c;">Date:</strong> ${appointmentDate}</p>
                <p style="margin: 8px 0; color:#e5e5e5;"><strong style="color:#c9a84c;">Time:</strong> ${appointmentTime}</p>
                ${meetingBlock}
              </div>

              ${prepBlock}

              <h3 style="color:#c9a84c; margin-top: 24px; font-size: 16px;">Need to reschedule?</h3>
              <p style="color:#e5e5e5; line-height: 1.6;">Call <strong style="color:#c9a84c;">(678) 404-0730</strong> or reply to this email at least 24 hours before your appointment.</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 32px; border-top: 1px solid #2a2a2a; background:#0f0f0f; border-radius: 0 0 8px 8px;">
              <p style="margin: 0; color:#777777; font-size: 12px; line-height: 1.5;">LATOM Wellness &middot; (678) 404-0730 &middot; latomwellness.com</p>
              <p style="margin: 8px 0 0 0; color:#555555; font-size: 11px;">This is a transactional email sent because you booked a consultation at latomwellness.com.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    `LATOM Wellness — Dr. Abdi Abdulhakim, MD`,
    ``,
    `Hi ${patientName},`,
    ``,
    `Your consultation is confirmed.`,
    ``,
    `Service: ${serviceName}`,
    `Date: ${appointmentDate}`,
    `Time: ${appointmentTime}`,
    meetingLink
      ? `Video Call Link: ${meetingLink}`
      : `Video Call Link: Will be sent 24 hours before your appointment.`,
    ``,
    `How to prepare:`,
    prepInstructions
      ? prepInstructions
      : `- Have your medications and supplements list ready\n- Note any recent lab work to discuss\n- Write down your top 2-3 health goals\n- Test camera/microphone beforehand\n- Join 5 minutes early`,
    ``,
    `Need to reschedule? Call (678) 404-0730 at least 24 hours before.`,
    ``,
    `LATOM Wellness · latomwellness.com`,
  ].join('\n');

  return { subject, html, text };
}
