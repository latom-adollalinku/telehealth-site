import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export const runtime = 'edge';

// Hex to rgb (0-1 scale)
function hex(r: number, g: number, b: number) {
  return rgb(r / 255, g / 255, b / 255);
}

const GOLD = hex(201, 168, 76);    // #c9a84c — brand gold
const DARK = hex(26, 26, 26);      // near-black
const MID  = hex(80, 80, 80);      // secondary text
const LIGHT = hex(245, 245, 245);  // row bg
const WHITE = rgb(1, 1, 1);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      bookingId,
      patientName,
      patientEmail,
      patientPhone,
      consultationDate,
      amount = 200,
      paymentMethod,
      paymentStatus,
    } = body;

    // Validate required fields
    if (!bookingId || !patientName || !patientEmail || !consultationDate || !paymentMethod || !paymentStatus) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!['zelle', 'venmo'].includes(paymentMethod)) {
      return NextResponse.json({ error: 'paymentMethod must be zelle or venmo' }, { status: 400 });
    }

    if (!['paid', 'pending'].includes(paymentStatus)) {
      return NextResponse.json({ error: 'paymentStatus must be paid or pending' }, { status: 400 });
    }

    // Build PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([612, 792]); // US Letter
    const { width, height } = page.getSize();

    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold    = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // ── Gold header bar ──────────────────────────────────────────────────────
    page.drawRectangle({
      x: 0,
      y: height - 90,
      width,
      height: 90,
      color: GOLD,
    });

    // Practice name
    page.drawText('LATOM Wellness', {
      x: 36,
      y: height - 42,
      size: 26,
      font: fontBold,
      color: WHITE,
    });

    // Tagline
    page.drawText('Integrative & Functional Telehealth', {
      x: 36,
      y: height - 62,
      size: 10,
      font: fontRegular,
      color: WHITE,
    });

    // INVOICE label (right side of header)
    page.drawText('INVOICE', {
      x: width - 120,
      y: height - 48,
      size: 22,
      font: fontBold,
      color: WHITE,
    });

    // ── Invoice meta block ───────────────────────────────────────────────────
    const metaTop = height - 120;

    page.drawText(`Invoice #:`, { x: 36, y: metaTop, size: 9, font: fontBold, color: MID });
    page.drawText(bookingId, { x: 120, y: metaTop, size: 9, font: fontRegular, color: DARK });

    page.drawText(`Date:`, { x: 36, y: metaTop - 16, size: 9, font: fontBold, color: MID });
    const dateFormatted = new Date(consultationDate).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
    page.drawText(dateFormatted, { x: 120, y: metaTop - 16, size: 9, font: fontRegular, color: DARK });

    page.drawText(`Status:`, { x: 36, y: metaTop - 32, size: 9, font: fontBold, color: MID });
    const statusLabel = paymentStatus === 'paid' ? 'PAID' : 'PENDING';
    const statusColor = paymentStatus === 'paid' ? hex(34, 139, 34) : hex(180, 100, 0);
    page.drawText(statusLabel, { x: 120, y: metaTop - 32, size: 9, font: fontBold, color: statusColor });

    // ── Divider line ─────────────────────────────────────────────────────────
    const dividerY = metaTop - 55;
    page.drawLine({
      start: { x: 36, y: dividerY },
      end: { x: width - 36, y: dividerY },
      thickness: 0.75,
      color: GOLD,
    });

    // ── Bill To section ──────────────────────────────────────────────────────
    const billTop = dividerY - 20;
    page.drawText('BILL TO', { x: 36, y: billTop, size: 8, font: fontBold, color: GOLD });

    page.drawText(patientName, { x: 36, y: billTop - 16, size: 11, font: fontBold, color: DARK });
    page.drawText(patientEmail, { x: 36, y: billTop - 31, size: 9, font: fontRegular, color: MID });
    if (patientPhone) {
      page.drawText(patientPhone, { x: 36, y: billTop - 46, size: 9, font: fontRegular, color: MID });
    }

    // ── From section (right column) ──────────────────────────────────────────
    page.drawText('FROM', { x: width / 2, y: billTop, size: 8, font: fontBold, color: GOLD });
    page.drawText('LATOM Wellness', { x: width / 2, y: billTop - 16, size: 11, font: fontBold, color: DARK });
    page.drawText('Dr. Abdi Abdulhakim, MD', { x: width / 2, y: billTop - 31, size: 9, font: fontRegular, color: MID });
    page.drawText('Anesthesiologist', { x: width / 2, y: billTop - 46, size: 9, font: fontRegular, color: MID });

    // ── Service table ─────────────────────────────────────────────────────────
    const tableTop = billTop - 85;

    // Table header row
    page.drawRectangle({ x: 36, y: tableTop - 2, width: width - 72, height: 20, color: DARK });
    page.drawText('DESCRIPTION', { x: 44, y: tableTop + 4, size: 8, font: fontBold, color: WHITE });
    page.drawText('DURATION', { x: 320, y: tableTop + 4, size: 8, font: fontBold, color: WHITE });
    page.drawText('AMOUNT', { x: width - 100, y: tableTop + 4, size: 8, font: fontBold, color: WHITE });

    // Service row
    const rowY = tableTop - 28;
    page.drawRectangle({ x: 36, y: rowY - 6, width: width - 72, height: 22, color: LIGHT });

    page.drawText('Consultation with Dr. Abdulhakim, MD', {
      x: 44, y: rowY + 3, size: 9, font: fontRegular, color: DARK,
    });
    page.drawText('30 minutes', {
      x: 320, y: rowY + 3, size: 9, font: fontRegular, color: DARK,
    });
    page.drawText(`$${Number(amount).toFixed(2)}`, {
      x: width - 100, y: rowY + 3, size: 9, font: fontBold, color: DARK,
    });

    // Total row
    const totalY = rowY - 30;
    page.drawLine({
      start: { x: 36, y: totalY + 14 },
      end: { x: width - 36, y: totalY + 14 },
      thickness: 0.5,
      color: hex(200, 200, 200),
    });

    page.drawText('TOTAL', {
      x: 320, y: totalY, size: 10, font: fontBold, color: DARK,
    });
    page.drawText(`$${Number(amount).toFixed(2)}`, {
      x: width - 100, y: totalY, size: 12, font: fontBold, color: GOLD,
    });

    // ── Payment details ───────────────────────────────────────────────────────
    const payTop = totalY - 50;
    page.drawText('PAYMENT DETAILS', { x: 36, y: payTop, size: 8, font: fontBold, color: GOLD });

    const payMethodLabel = paymentMethod === 'zelle' ? 'Zelle' : 'Venmo';
    page.drawText(`Method: ${payMethodLabel}`, {
      x: 36, y: payTop - 16, size: 9, font: fontRegular, color: DARK,
    });
    const payAccount = paymentMethod === 'zelle'
      ? (process.env.NEXT_PUBLIC_ZELLE_EMAIL || 'pay@latomwellness.com')
      : `@${process.env.NEXT_PUBLIC_VENMO_USERNAME || 'latom-wellness'}`;
    page.drawText(`Account: ${payAccount}`, {
      x: 36, y: payTop - 32, size: 9, font: fontRegular, color: DARK,
    });
    page.drawText(`Status: ${statusLabel}`, {
      x: 36, y: payTop - 48, size: 9, font: fontBold, color: statusColor,
    });

    // ── Footer ────────────────────────────────────────────────────────────────
    page.drawRectangle({ x: 0, y: 0, width, height: 44, color: DARK });
    const footerText = 'HIPAA Compliant  •  Thank you for choosing LATOM Wellness';
    const footerWidth = fontRegular.widthOfTextAtSize(footerText, 9);
    page.drawText(footerText, {
      x: (width - footerWidth) / 2,
      y: 16,
      size: 9,
      font: fontRegular,
      color: WHITE,
    });

    // ── Serialize PDF ─────────────────────────────────────────────────────────
    const pdfBytes = await pdfDoc.save();
    const filename = `invoice-${bookingId}.pdf`;
    const filePath = `/invoices/${filename}`;

    // Convert Uint8Array → ArrayBuffer for edge runtime compatibility
    const pdfBuffer = pdfBytes.buffer.slice(
      pdfBytes.byteOffset,
      pdfBytes.byteOffset + pdfBytes.byteLength
    );

    return new NextResponse(pdfBuffer as ArrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'X-Invoice-Path': filePath,
        'X-Invoice-Filename': filename,
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('Invoice generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate invoice' },
      { status: 500 }
    );
  }
}
