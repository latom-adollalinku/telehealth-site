// Post-Consultation email template
// Gold (#c9a84c) + dark theme, matches site branding
// Sent manually from admin dashboard after consultation complete
// Invoice PDF is attached separately at the API route level

export interface PostConsultData {
  patientName: string;
  serviceName: string;
  consultationDate: string; // human-friendly, e.g. "Tuesday, May 12, 2026"
  summary?: string; // optional free-text summary of the consultation
  nextSteps?: string; // optional service-specific next steps
  invoiceAttached?: boolean; // whether an invoice PDF is attached
}

export function renderPostConsultEmail(data: PostConsultData): {
  subject: string;
  html: string;
  text: string;
} {
  const {
    patientName,
    serviceName,
    consultationDate,
    summary,
    nextSteps,
    invoiceAttached,
  } = data;

  const summaryBlock = summary
    ? `
      <h3 style="color:#c9a84c; margin-top: 24px; font-size: 16px;">Consultation Summary</h3>
      <p style="color:#e5e5e5; line-height: 1.6;">${summary}</p>
    `
    : '';

  const nextStepsBlock = nextSteps
    ? `
      <h3 style="color:#c9a84c; margin-top: 24px; font-size: 16px;">Next Steps</h3>
      <p style="color:#e5e5e5; line-height: 1.6;">${nextSteps}</p>
    `
    : `
      <h3 style="color:#c9a84c; margin-top: 24px; font-size: 16px;">Next Steps</h3>
      <p style="color:#e5e5e5; line-height: 1.6;">Dr. Abdulhakim will follow up with any prescribed protocols, pharmacy orders, or lab work separately. If you have questions, reply to this email or call (678) 404-0730.</p>
    `;

  const invoiceBlock = invoiceAttached
    ? `
      <div style="background:#1c1c1c; border-left: 3px solid #c9a84c; padding: 16px 20px; margin: 24px 0; border-radius: 4px;">
        <p style="margin: 0; color:#e5e5e5; line-height: 1.5;"><strong style="color:#c9a84c;">Invoice attached.</strong> Please find your consultation invoice as a PDF attachment to this email.</p>
      </div>
    `
    : '';

  const subject = `Thank You — Your LATOM Wellness Consultation`;

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
              <h2 style="color:#ffffff; margin: 0 0 16px 0; font-size: 22px;">Thank you for your consultation</h2>
              <p style="color:#e5e5e5; line-height: 1.6; margin: 0 0 20px 0;">Hi ${patientName},</p>
              <p style="color:#e5e5e5; line-height: 1.6; margin: 0 0 24px 0;">Thank you for trusting LATOM Wellness with your care. It was a pleasure meeting with you.</p>

              <div style="background:#1c1c1c; border-left: 3px solid #c9a84c; padding: 20px; margin: 24px 0; border-radius: 4px;">
                <h3 style="margin: 0 0 12px 0; color:#c9a84c; font-size: 16px;">Consultation Record</h3>
                <p style="margin: 8px 0; color:#e5e5e5;"><strong style="color:#c9a84c;">Service:</strong> ${serviceName}</p>
                <p style="margin: 8px 0; color:#e5e5e5;"><strong style="color:#c9a84c;">Date:</strong> ${consultationDate}</p>
              </div>

              ${invoiceBlock}

              ${summaryBlock}

              ${nextStepsBlock}

              <h3 style="color:#c9a84c; margin-top: 24px; font-size: 16px;">Questions?</h3>
              <p style="color:#e5e5e5; line-height: 1.6;">Reply to this email or call <strong style="color:#c9a84c;">(678) 404-0730</strong>.</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 32px; border-top: 1px solid #2a2a2a; background:#0f0f0f; border-radius: 0 0 8px 8px;">
              <p style="margin: 0; color:#777777; font-size: 12px; line-height: 1.5;">LATOM Wellness &middot; (678) 404-0730 &middot; latomwellness.com</p>
              <p style="margin: 8px 0 0 0; color:#555555; font-size: 11px;">This is a transactional email sent after your consultation at latomwellness.com.</p>
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
    `Thank you for your consultation.`,
    ``,
    `Service: ${serviceName}`,
    `Date: ${consultationDate}`,
    ``,
    invoiceAttached ? `Invoice: Attached as PDF to this email.` : '',
    summary ? `Summary:\n${summary}\n` : '',
    `Next Steps:`,
    nextSteps
      ? nextSteps
      : `Dr. Abdulhakim will follow up with any prescribed protocols, pharmacy orders, or lab work separately.`,
    ``,
    `Questions? Reply to this email or call (678) 404-0730.`,
    ``,
    `LATOM Wellness · latomwellness.com`,
  ]
    .filter(Boolean)
    .join('\n');

  return { subject, html, text };
}
