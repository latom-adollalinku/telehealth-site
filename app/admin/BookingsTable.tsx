'use client';

/**
 * BookingsTable — client component
 *
 * Renders the admin bookings table with three interactive actions per row:
 *   - Mark Paid            → POST /api/sheets/log-payment
 *   - Generate Invoice     → POST /api/admin/generate-invoice (downloads PDF)
 *   - Send Follow-up Email → POST /api/email/post-consult (attaches invoice)
 *
 * State is local; we use the booking `uid` as the key.
 * The parent page supplies the initial bookings fetched from Cal.com.
 */

import { useState } from 'react';
import type { AdminBooking } from '../api/admin/bookings/route';

type RowStatus = 'idle' | 'logging' | 'paid' | 'invoicing' | 'emailing' | 'error';

interface RowState {
  paymentStatus: 'paid' | 'pending';
  actionStatus: RowStatus;
  invoiceBase64?: string;
  invoiceFilename?: string;
  message?: string;
}

interface Props {
  initialBookings: AdminBooking[];
  fetchError?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatDateTime(iso: string): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

async function blobToBase64(blob: Blob): Promise<string> {
  const buf = await blob.arrayBuffer();
  let binary = '';
  const bytes = new Uint8Array(buf);
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function BookingsTable({ initialBookings, fetchError }: Props) {
  const [rows, setRows] = useState<Record<string, RowState>>(() => {
    const initial: Record<string, RowState> = {};
    for (const b of initialBookings) {
      initial[b.uid] = {
        paymentStatus: b.paymentStatus,
        actionStatus: 'idle',
      };
    }
    return initial;
  });

  const [toast, setToast] = useState<{ msg: string; kind: 'success' | 'error' } | null>(null);

  function showToast(msg: string, kind: 'success' | 'error' = 'success') {
    setToast({ msg, kind });
    setTimeout(() => setToast(null), 4000);
  }

  function update(uid: string, patch: Partial<RowState>) {
    setRows(prev => ({ ...prev, [uid]: { ...prev[uid], ...patch } }));
  }

  // -------------------------------------------------------------------------
  // Handlers
  // -------------------------------------------------------------------------

  async function handleMarkPaid(b: AdminBooking) {
    update(b.uid, { actionStatus: 'logging' });
    try {
      const res = await fetch('/api/sheets/log-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: b.bookingId,
          patientName: b.attendeeName,
          patientEmail: b.attendeeEmail,
          amount: 200,
          paymentMethod: 'zelle',
          service: b.service,
          date: b.date,
          status: 'Received',
        }),
      });
      if (!res.ok) {
        const err = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(err.error ?? `HTTP ${res.status}`);
      }
      update(b.uid, { paymentStatus: 'paid', actionStatus: 'paid' });
      showToast(`Payment logged for ${b.attendeeName}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to log payment';
      update(b.uid, { actionStatus: 'error', message: msg });
      showToast(msg, 'error');
    }
  }

  async function handleGenerateInvoice(b: AdminBooking): Promise<string | null> {
    update(b.uid, { actionStatus: 'invoicing' });
    try {
      const res = await fetch('/api/admin/generate-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: b.bookingId,
          patientName: b.attendeeName,
          patientEmail: b.attendeeEmail,
          patientPhone: b.attendeePhone,
          consultationDate: b.startTime || b.date,
          amount: 200,
          paymentMethod: 'zelle',
          paymentStatus: rows[b.uid]?.paymentStatus ?? b.paymentStatus,
        }),
      });
      if (!res.ok) {
        const err = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(err.error ?? `HTTP ${res.status}`);
      }
      const blob = await res.blob();
      const filename = res.headers.get('X-Invoice-Filename') ?? `invoice-${b.bookingId}.pdf`;
      const base64 = await blobToBase64(blob);

      // Trigger download in browser
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);

      update(b.uid, {
        actionStatus: rows[b.uid]?.paymentStatus === 'paid' ? 'paid' : 'idle',
        invoiceBase64: base64,
        invoiceFilename: filename,
      });
      showToast(`Invoice downloaded: ${filename}`);
      return base64;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to generate invoice';
      update(b.uid, { actionStatus: 'error', message: msg });
      showToast(msg, 'error');
      return null;
    }
  }

  async function handleSendFollowUp(b: AdminBooking) {
    update(b.uid, { actionStatus: 'emailing' });
    try {
      // Ensure we have an invoice PDF to attach.
      let invoiceBase64 = rows[b.uid]?.invoiceBase64;
      let invoiceFilename = rows[b.uid]?.invoiceFilename;
      if (!invoiceBase64) {
        const maybe = await handleGenerateInvoice(b);
        if (!maybe) throw new Error('Invoice generation failed — cannot send email');
        invoiceBase64 = maybe;
        invoiceFilename = `invoice-${b.bookingId}.pdf`;
      }

      const res = await fetch('/api/email/post-consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientName: b.attendeeName,
          patientEmail: b.attendeeEmail,
          serviceName: b.service,
          consultationDate: b.startTime || b.date,
          invoicePdfBase64: invoiceBase64,
          invoiceFilename: invoiceFilename ?? `invoice-${b.bookingId}.pdf`,
        }),
      });
      if (!res.ok) {
        const err = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(err.error ?? `HTTP ${res.status}`);
      }
      update(b.uid, { actionStatus: rows[b.uid]?.paymentStatus === 'paid' ? 'paid' : 'idle' });
      showToast(`Follow-up email sent to ${b.attendeeEmail}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to send follow-up';
      update(b.uid, { actionStatus: 'error', message: msg });
      showToast(msg, 'error');
    }
  }

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  if (fetchError) {
    return (
      <div className="bg-[#1a1a2e] border border-red-500/30 rounded-lg p-6 text-center">
        <p className="text-red-300 text-sm font-medium mb-1">Could not load bookings</p>
        <p className="text-gray-400 text-xs">{fetchError}</p>
      </div>
    );
  }

  if (initialBookings.length === 0) {
    return (
      <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-lg p-12 text-center">
        <p className="text-gray-400 text-sm">No bookings yet.</p>
        <p className="text-gray-600 text-xs mt-2">
          New Cal.com bookings for{' '}
          <span className="text-[#c9a84c]/70 font-mono">latom-wellness/consultation</span> will
          appear here.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-lg overflow-hidden">
        <div className="grid grid-cols-[1.3fr_1.2fr_1.3fr_110px_1fr_110px_1.2fr] gap-3 px-5 py-3 bg-[#0d0d1a] border-b border-[#c9a84c]/10 text-xs text-gray-400 uppercase tracking-wider">
          <span>Date &amp; Time</span>
          <span>Patient</span>
          <span>Email</span>
          <span>Phone</span>
          <span>Service</span>
          <span>Payment</span>
          <span className="text-center">Actions</span>
        </div>

        {initialBookings.map(b => {
          const row = rows[b.uid];
          const status = row?.actionStatus ?? 'idle';
          const isPaid = (row?.paymentStatus ?? b.paymentStatus) === 'paid';
          return (
            <div
              key={b.uid}
              className={`grid grid-cols-[1.3fr_1.2fr_1.3fr_110px_1fr_110px_1.2fr] gap-3 px-5 py-4 border-b border-[#c9a84c]/5 items-center text-sm ${
                isPaid ? 'bg-green-900/5' : 'hover:bg-[#0d0d1a]/40'
              }`}
            >
              <span className="text-gray-200 text-xs">{formatDateTime(b.startTime)}</span>
              <span className="text-white font-medium text-sm truncate">{b.attendeeName}</span>
              <span className="text-gray-400 text-xs truncate">{b.attendeeEmail}</span>
              <span className="text-gray-400 text-xs">{b.attendeePhone || '—'}</span>
              <span className="text-gray-300 text-xs truncate">{b.service}</span>
              <span>
                {isPaid ? (
                  <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-300 font-medium">
                    Paid
                  </span>
                ) : (
                  <label className="inline-flex items-center gap-1.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-3.5 h-3.5 accent-[#c9a84c] cursor-pointer"
                      checked={false}
                      disabled={status === 'logging'}
                      onChange={() => handleMarkPaid(b)}
                    />
                    <span className="text-xs text-yellow-400/80 group-hover:text-yellow-300">
                      {status === 'logging' ? 'Logging…' : 'Pending'}
                    </span>
                  </label>
                )}
              </span>
              <div className="flex items-center justify-center gap-1.5">
                <button
                  onClick={() => handleGenerateInvoice(b)}
                  disabled={status === 'invoicing'}
                  className="px-2 py-1 text-[10px] uppercase tracking-wider rounded border border-[#c9a84c]/30 text-[#c9a84c] hover:bg-[#c9a84c]/10 disabled:opacity-50 transition-colors"
                  title="Generate Invoice"
                >
                  {status === 'invoicing' ? '…' : 'Invoice'}
                </button>
                <button
                  onClick={() => handleSendFollowUp(b)}
                  disabled={status === 'emailing' || status === 'invoicing'}
                  className="px-2 py-1 text-[10px] uppercase tracking-wider rounded border border-gray-600 text-gray-300 hover:bg-gray-700/50 disabled:opacity-50 transition-colors"
                  title="Send Follow-up Email"
                >
                  {status === 'emailing' ? '…' : 'Email'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {initialBookings.map(b => {
          const row = rows[b.uid];
          const status = row?.actionStatus ?? 'idle';
          const isPaid = (row?.paymentStatus ?? b.paymentStatus) === 'paid';
          return (
            <div
              key={b.uid}
              className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-white font-medium text-sm">{b.attendeeName}</p>
                  <p className="text-gray-500 text-xs">{b.attendeeEmail}</p>
                  {b.attendeePhone && (
                    <p className="text-gray-500 text-xs">{b.attendeePhone}</p>
                  )}
                </div>
                {isPaid ? (
                  <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-300 font-medium">
                    Paid
                  </span>
                ) : (
                  <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-yellow-500/20 text-yellow-300 font-medium">
                    Pending
                  </span>
                )}
              </div>
              <p className="text-gray-400 text-xs mb-1">{formatDateTime(b.startTime)}</p>
              <p className="text-gray-300 text-xs mb-3">{b.service}</p>
              <div className="flex flex-wrap gap-2">
                {!isPaid && (
                  <button
                    onClick={() => handleMarkPaid(b)}
                    disabled={status === 'logging'}
                    className="flex-1 px-2 py-1.5 text-xs rounded border border-yellow-500/40 text-yellow-300 hover:bg-yellow-500/10 disabled:opacity-50"
                  >
                    {status === 'logging' ? 'Logging…' : 'Mark Paid'}
                  </button>
                )}
                <button
                  onClick={() => handleGenerateInvoice(b)}
                  disabled={status === 'invoicing'}
                  className="flex-1 px-2 py-1.5 text-xs rounded border border-[#c9a84c]/40 text-[#c9a84c] hover:bg-[#c9a84c]/10 disabled:opacity-50"
                >
                  {status === 'invoicing' ? '…' : 'Invoice'}
                </button>
                <button
                  onClick={() => handleSendFollowUp(b)}
                  disabled={status === 'emailing' || status === 'invoicing'}
                  className="flex-1 px-2 py-1.5 text-xs rounded border border-gray-600 text-gray-300 hover:bg-gray-700/50 disabled:opacity-50"
                >
                  {status === 'emailing' ? '…' : 'Follow-up'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {toast && (
        <div
          className={`fixed bottom-6 right-6 px-4 py-3 rounded-lg shadow-lg text-sm z-50 ${
            toast.kind === 'success'
              ? 'bg-green-800 border border-green-600 text-green-100'
              : 'bg-red-900 border border-red-600 text-red-100'
          }`}
        >
          {toast.msg}
        </div>
      )}
    </>
  );
}
