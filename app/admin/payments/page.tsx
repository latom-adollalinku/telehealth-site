'use client';

/**
 * /admin/payments — Telehealth Payment Tracker
 *
 * Lists pending payment confirmations from patients.
 * When admin checks "Mark as Paid", it calls POST /api/sheets/log-payment
 * which appends the row to the Google Sheet "Telehealth Payments".
 *
 * In production, this page would fetch bookings from a database.
 * For now, payments are seeded from localStorage so you can add test entries.
 *
 * Access: /admin/payments (protect with auth layer when you add one)
 */

import { useState, useEffect } from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PendingPayment {
  id: string;
  bookingId: string;
  patientName: string;
  patientEmail: string;
  service: string;
  amount: number;
  paymentMethod: 'zelle' | 'venmo';
  date: string;
  status: 'pending' | 'paid' | 'logging';
  loggedToSheets?: boolean;
}

// ---------------------------------------------------------------------------
// Seed data — replace with real DB fetch when available
// ---------------------------------------------------------------------------

const SEED_PAYMENTS: PendingPayment[] = [
  {
    id: '1',
    bookingId: 'BK-2026-001',
    patientName: 'Sarah Mitchell',
    patientEmail: 'sarah.mitchell@email.com',
    service: 'Initial Consultation',
    amount: 100,
    paymentMethod: 'zelle',
    date: new Date().toISOString().split('T')[0],
    status: 'pending',
  },
  {
    id: '2',
    bookingId: 'BK-2026-002',
    patientName: 'James Carter',
    patientEmail: 'jcarter@gmail.com',
    service: 'Priority Initial Consultation (60 min)',
    amount: 249,
    paymentMethod: 'venmo',
    date: new Date().toISOString().split('T')[0],
    status: 'pending',
  },
  {
    id: '3',
    bookingId: 'BK-2026-003',
    patientName: 'Elena Vasquez',
    patientEmail: 'evasquez@outlook.com',
    service: 'Optimization Membership',
    amount: 199,
    paymentMethod: 'zelle',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    status: 'pending',
  },
];

const STORAGE_KEY = 'telehealth_admin_payments';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function loadPayments(): PendingPayment[] {
  if (typeof window === 'undefined') return SEED_PAYMENTS;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as PendingPayment[]) : SEED_PAYMENTS;
  } catch {
    return SEED_PAYMENTS;
  }
}

function savePayments(payments: PendingPayment[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payments));
  } catch {
    // ignore
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<PendingPayment[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'paid'>('all');

  // Load from localStorage on mount
  useEffect(() => {
    setPayments(loadPayments());
  }, []);

  // Persist whenever payments change
  useEffect(() => {
    if (payments.length > 0) savePayments(payments);
  }, [payments]);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  // -------------------------------------------------------------------------
  // Mark as Paid handler
  // -------------------------------------------------------------------------

  async function handleMarkAsPaid(payment: PendingPayment) {
    // Optimistic: set to logging state
    setPayments(prev =>
      prev.map(p => (p.id === payment.id ? { ...p, status: 'logging' as const } : p)),
    );

    try {
      const res = await fetch('/api/sheets/log-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: payment.bookingId,
          patientName: payment.patientName,
          patientEmail: payment.patientEmail,
          amount: payment.amount,
          paymentMethod: payment.paymentMethod,
          service: payment.service,
          date: payment.date,
          status: 'Received',
        }),
      });

      if (!res.ok) {
        const err = (await res.json()) as { error: string };
        throw new Error(err.error || 'Unknown error');
      }

      setPayments(prev =>
        prev.map(p =>
          p.id === payment.id
            ? { ...p, status: 'paid' as const, loggedToSheets: true }
            : p,
        ),
      );
      setToast({ message: `Payment logged to Google Sheets for ${payment.patientName}`, type: 'success' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to log payment';
      // Revert to pending on failure
      setPayments(prev =>
        prev.map(p => (p.id === payment.id ? { ...p, status: 'pending' as const } : p)),
      );
      setToast({ message: `Error: ${message}`, type: 'error' });
    }
  }

  // -------------------------------------------------------------------------
  // Reset (dev helper)
  // -------------------------------------------------------------------------

  function handleReset() {
    setPayments(SEED_PAYMENTS);
    localStorage.removeItem(STORAGE_KEY);
    setToast({ message: 'Reset to seed data', type: 'success' });
  }

  // -------------------------------------------------------------------------
  // Derived
  // -------------------------------------------------------------------------

  const filtered = payments.filter(p => {
    if (filterStatus === 'all') return true;
    return p.status === filterStatus;
  });

  const pendingCount = payments.filter(p => p.status === 'pending').length;
  const paidCount = payments.filter(p => p.status === 'paid').length;
  const totalRevenue = payments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="border-b border-[#c9a84c]/20 bg-[#0d0d1a]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Payment Tracker</h1>
            <p className="text-gray-400 text-sm mt-1">LATOM Wellness — Admin Dashboard</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 bg-[#1a1a2e] px-3 py-1 rounded-full border border-[#c9a84c]/20">
              Logs to Google Sheets
            </span>
            <button
              onClick={handleReset}
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              Reset demo data
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-lg p-5">
            <p className="text-gray-400 text-xs mb-1 uppercase tracking-wider">Pending</p>
            <p className="text-3xl font-bold text-yellow-400">{pendingCount}</p>
          </div>
          <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-lg p-5">
            <p className="text-gray-400 text-xs mb-1 uppercase tracking-wider">Confirmed</p>
            <p className="text-3xl font-bold text-green-400">{paidCount}</p>
          </div>
          <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-lg p-5">
            <p className="text-gray-400 text-xs mb-1 uppercase tracking-wider">Revenue logged</p>
            <p className="text-3xl font-bold text-[#c9a84c]">${totalRevenue.toLocaleString()}</p>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6">
          {(['all', 'pending', 'paid'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilterStatus(f)}
              className={`px-4 py-1.5 text-sm rounded-full border transition-all capitalize ${
                filterStatus === f
                  ? 'border-[#c9a84c] bg-[#c9a84c]/10 text-[#c9a84c]'
                  : 'border-[#c9a84c]/20 text-gray-400 hover:border-[#c9a84c]/40'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Payment table */}
        <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-lg overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[1fr_1fr_1fr_120px_100px_140px] gap-4 px-6 py-3 bg-[#0d0d1a] border-b border-[#c9a84c]/10 text-xs text-gray-400 uppercase tracking-wider">
            <span>Patient</span>
            <span>Service</span>
            <span>Booking ID</span>
            <span>Amount</span>
            <span>Method</span>
            <span className="text-center">Mark as Paid</span>
          </div>

          {filtered.length === 0 ? (
            <div className="px-6 py-12 text-center text-gray-500">
              No payments in this filter.
            </div>
          ) : (
            filtered.map(payment => (
              <div
                key={payment.id}
                className={`grid grid-cols-[1fr_1fr_1fr_120px_100px_140px] gap-4 px-6 py-4 border-b border-[#c9a84c]/5 items-center transition-colors ${
                  payment.status === 'paid'
                    ? 'bg-green-900/10'
                    : payment.status === 'logging'
                    ? 'bg-yellow-900/10 animate-pulse'
                    : 'hover:bg-[#0d0d1a]/50'
                }`}
              >
                {/* Patient */}
                <div>
                  <p className="text-white font-medium text-sm">{payment.patientName}</p>
                  <p className="text-gray-500 text-xs">{payment.patientEmail}</p>
                  <p className="text-gray-600 text-xs mt-0.5">{payment.date}</p>
                </div>

                {/* Service */}
                <p className="text-gray-300 text-sm">{payment.service}</p>

                {/* Booking ID */}
                <p className="text-gray-400 text-xs font-mono">{payment.bookingId}</p>

                {/* Amount */}
                <p className="text-[#c9a84c] font-bold">${payment.amount}</p>

                {/* Method */}
                <span
                  className={`inline-block px-2 py-0.5 text-xs rounded-full font-medium w-fit ${
                    payment.paymentMethod === 'zelle'
                      ? 'bg-purple-500/20 text-purple-300'
                      : 'bg-blue-500/20 text-blue-300'
                  }`}
                >
                  {payment.paymentMethod === 'zelle' ? 'Zelle' : 'Venmo'}
                </span>

                {/* Mark as Paid */}
                <div className="flex items-center justify-center gap-2">
                  {payment.status === 'paid' ? (
                    <div className="flex items-center gap-1.5 text-green-400 text-sm">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs">Logged</span>
                    </div>
                  ) : payment.status === 'logging' ? (
                    <div className="flex items-center gap-1.5 text-yellow-400 text-xs">
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Logging...
                    </div>
                  ) : (
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-[#c9a84c] cursor-pointer"
                        checked={false}
                        onChange={() => handleMarkAsPaid(payment)}
                      />
                      <span className="text-xs text-gray-400 group-hover:text-gray-200 transition-colors">
                        Received
                      </span>
                    </label>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer note */}
        <p className="text-xs text-gray-600 mt-4 text-center">
          Checking "Received" immediately appends the row to the{' '}
          <span className="text-[#c9a84c]/70">Telehealth Payments</span> tab in your Google Sheet.
        </p>
      </div>

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 px-5 py-3 rounded-lg shadow-lg text-sm font-medium transition-all z-50 ${
            toast.type === 'success'
              ? 'bg-green-800 border border-green-600 text-green-100'
              : 'bg-red-900 border border-red-600 text-red-100'
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
