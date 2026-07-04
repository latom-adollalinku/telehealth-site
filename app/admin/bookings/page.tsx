'use client';

import { Fragment, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface BookingRow {
 id: number;
 created_at: number;
 tier: 'wellness' | 'medical' | 'protocol' | 'service';
 patient_name: string;
 patient_email: string;
 patient_phone: string;
 patient_dob: string | null;
 patient_state: string | null;
 service: string;
 amount_cents: number | null;
 goals: string | null;
 medical_history: string | null;
 current_medications: string | null;
 allergies: string | null;
 protocol_id: string | null;
 preferred_date: string | null;
 preferred_time: string | null;
 payment_status: 'pending' | 'invoice_sent' | 'paid' | 'cancelled' | 'refunded';
 invoice_url: string | null;
 helcim_transaction_id: string | null;
 notes: string | null;
 raw_payload: string | null;
}

type FilterTab = 'all' | 'pending' | 'invoice_sent' | 'paid' | 'cancelled';

interface EditState {
 amount_dollars: string;
 payment_status: BookingRow['payment_status'];
 invoice_url: string;
 notes: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatDate(ts: number): string {
 const d = new Date(ts);
 return d.toLocaleString('en-US', {
 month: 'short',
 day: 'numeric',
 hour: 'numeric',
 minute: '2-digit',
 });
}

function fmtAmount(cents: number | null): string {
 if (cents === null || cents === undefined) return '-';
 return '$' + (cents / 100).toFixed(2);
}

// ---------------------------------------------------------------------------
// Badge components
// ---------------------------------------------------------------------------

function TierBadge({ tier }: { tier: BookingRow['tier'] }) {
 const map: Record<BookingRow['tier'], string> = {
 wellness: 'bg-green-900 text-green-300 border border-green-700',
 medical: 'bg-amber-900 text-amber-300 border border-amber-700',
 protocol: 'bg-blue-900 text-blue-300 border border-blue-700',
 service: 'bg-purple-900 text-purple-300 border border-purple-700',
 };
 return (
 <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${map[tier] ?? 'bg-surface-2 text-muted'}`}>
 {tier}
 </span>
 );
}

function StatusBadge({ status }: { status: BookingRow['payment_status'] }) {
 const map: Record<BookingRow['payment_status'], string> = {
 pending: 'bg-surface-2 text-muted border border-line',
 invoice_sent: 'bg-amber-900 text-amber-300 border border-amber-700',
 paid: 'bg-green-900 text-green-300 border border-green-700',
 cancelled: 'bg-red-900 text-red-300 border border-red-700',
 refunded: 'bg-purple-900 text-purple-300 border border-purple-700',
 };
 const label = status.replace('_', ' ');
 return (
 <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${map[status] ?? 'bg-surface-2 text-muted'}`}>
 {label}
 </span>
 );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function AdminBookingsPage() {
 const router = useRouter();
 const [token, setToken] = useState<string | null>(null);
 const [bookings, setBookings] = useState<BookingRow[]>([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);
 const [activeTab, setActiveTab] = useState<FilterTab>('all');
 const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());
 const [editingId, setEditingId] = useState<number | null>(null);
 const [editState, setEditState] = useState<EditState>({
 amount_dollars: '',
 payment_status: 'pending',
 invoice_url: '',
 notes: '',
 });
 const [saving, setSaving] = useState(false);
 const [saveError, setSaveError] = useState<string | null>(null);

 // Read token from sessionStorage on mount
 useEffect(() => {
 const t = typeof window !== 'undefined' ? sessionStorage.getItem('latom_admin_token') : null;
 if (!t) {
 router.replace('/admin/login');
 return;
 }
 setToken(t);
 }, [router]);

 const handleUnauthorized = useCallback(() => {
 if (typeof window !== 'undefined') {
 sessionStorage.clear();
 }
 router.replace('/admin/login');
 }, [router]);

 const fetchBookings = useCallback(
 async (tab: FilterTab, adminToken: string) => {
 setLoading(true);
 setError(null);
 try {
 const params = new URLSearchParams({ limit: '200' });
 if (tab !== 'all') params.set('status', tab);
 const res = await fetch(`/api/admin/list-bookings?${params.toString()}`, {
 headers: { 'x-admin-token': adminToken },
 });
 if (res.status === 401) {
 handleUnauthorized();
 return;
 }
 if (!res.ok) {
 const body = await res.json().catch(() => ({}));
 throw new Error((body as { error?: string }).error ?? `HTTP ${res.status}`);
 }
 const data = (await res.json()) as { bookings: BookingRow[]; count: number };
 setBookings(data.bookings ?? []);
 } catch (err) {
 setError(err instanceof Error ? err.message : 'Failed to load bookings');
 } finally {
 setLoading(false);
 }
 },
 [handleUnauthorized],
 );

 // Fetch when token or tab changes
 useEffect(() => {
 if (!token) return;
 fetchBookings(activeTab, token);
 }, [token, activeTab, fetchBookings]);

 // ---------------------------------------------------------------------------
 // Stats (computed from fetched list, ignoring current tab filter for totals)
 // ---------------------------------------------------------------------------
 const totalCount = bookings.length;
 const pendingCount = bookings.filter((b) => b.payment_status === 'pending').length;
 const paidCount = bookings.filter((b) => b.payment_status === 'paid').length;
 const paidRevenue = bookings
 .filter((b) => b.payment_status === 'paid' && b.amount_cents !== null)
 .reduce((sum, b) => sum + (b.amount_cents ?? 0), 0);

 // ---------------------------------------------------------------------------
 // Row actions
 // ---------------------------------------------------------------------------
 function toggleExpand(id: number) {
 setExpandedIds((prev) => {
 const next = new Set(prev);
 if (next.has(id)) next.delete(id);
 else next.add(id);
 return next;
 });
 }

 function openEdit(b: BookingRow) {
 setEditingId(b.id);
 setSaveError(null);
 setEditState({
 amount_dollars: b.amount_cents !== null ? (b.amount_cents / 100).toFixed(2) : '',
 payment_status: b.payment_status,
 invoice_url: b.invoice_url ?? '',
 notes: b.notes ?? '',
 });
 }

 function cancelEdit() {
 setEditingId(null);
 setSaveError(null);
 }

 async function saveEdit(id: number) {
 if (!token) return;
 setSaving(true);
 setSaveError(null);
 try {
 const dollars = parseFloat(editState.amount_dollars);
 const amount_cents = !isNaN(dollars) && editState.amount_dollars !== '' ? Math.round(dollars * 100) : null;
 const body: Record<string, unknown> = { id };
 body.payment_status = editState.payment_status;
 body.invoice_url = editState.invoice_url || null;
 body.notes = editState.notes || null;
 if (amount_cents !== null) body.amount_cents = amount_cents;

 const res = await fetch('/api/admin/update-booking', {
 method: 'PATCH',
 headers: {
 'Content-Type': 'application/json',
 'x-admin-token': token,
 },
 body: JSON.stringify(body),
 });

 if (res.status === 401) {
 handleUnauthorized();
 return;
 }
 if (!res.ok) {
 const errBody = await res.json().catch(() => ({}));
 throw new Error((errBody as { error?: string }).error ?? `HTTP ${res.status}`);
 }
 const data = (await res.json()) as { success: boolean; booking: BookingRow };
 setBookings((prev) => prev.map((b) => (b.id === id ? data.booking : b)));
 setEditingId(null);
 } catch (err) {
 setSaveError(err instanceof Error ? err.message : 'Save failed');
 } finally {
 setSaving(false);
 }
 }

 function signOut() {
 if (typeof window !== 'undefined') sessionStorage.clear();
 router.replace('/admin/login');
 }

 // ---------------------------------------------------------------------------
 // Tab labels
 // ---------------------------------------------------------------------------
 const tabs: { key: FilterTab; label: string }[] = [
 { key: 'all', label: 'All' },
 { key: 'pending', label: 'Pending' },
 { key: 'invoice_sent', label: 'Invoice Sent' },
 { key: 'paid', label: 'Paid' },
 { key: 'cancelled', label: 'Cancelled' },
 ];

 // ---------------------------------------------------------------------------
 // Render
 // ---------------------------------------------------------------------------
 if (!token) return null;

 return (
 <main style={{ backgroundColor: 'var(--bg)' }} className="min-h-screen text-muted">
 {/* Hero */}
 <section className="max-w-7xl mx-auto px-4 pt-16 pb-8">
 <div className="flex items-start justify-between">
 <div>
 <p className="text-xs tracking-[0.3em] text-faint uppercase mb-2">Admin</p>
 <h1
 className="text-4xl md:text-5xl font-bold mb-2"
 style={{ fontFamily: 'Georgia, serif', color: 'var(--accent)' }}
 >
 LATOM Wellness Admin
 </h1>
 <p className="text-muted text-lg">Bookings &amp; Payments</p>
 </div>
 <button
 onClick={signOut}
 className="mt-2 px-4 py-2 text-xs tracking-widest uppercase border border-line text-muted hover:text-ink hover:border-gray-400 transition-colors rounded"
 >
 Sign out
 </button>
 </div>
 </section>

 {/* Filter tabs */}
 <section className="max-w-7xl mx-auto px-4 pb-4">
 <div className="flex gap-1 flex-wrap">
 {tabs.map((t) => (
 <button
 key={t.key}
 onClick={() => setActiveTab(t.key)}
 className={`px-4 py-2 text-sm rounded transition-colors ${
 activeTab === t.key
 ? 'text-[color:var(--on-accent)] font-semibold'
 : 'text-muted hover:text-ink bg-surface hover:bg-surface-2'
 }`}
 style={activeTab === t.key ? { backgroundColor: 'var(--accent)' } : {}}
 >
 {t.label}
 </button>
 ))}
 </div>
 </section>

 {/* Stats row */}
 <section className="max-w-7xl mx-auto px-4 pb-6">
 <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
 {[
 { label: 'Total', value: String(totalCount) },
 { label: 'Pending', value: String(pendingCount) },
 { label: 'Paid', value: String(paidCount) },
 { label: 'Paid Revenue', value: fmtAmount(paidRevenue) },
 ].map((s) => (
 <div
 key={s.label}
 className="rounded border border-line p-4"
 style={{ backgroundColor: '#111' }}
 >
 <p className="text-xs tracking-widest uppercase text-faint mb-1">{s.label}</p>
 <p className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>
 {s.value}
 </p>
 </div>
 ))}
 </div>
 </section>

 {/* Content */}
 <section className="max-w-7xl mx-auto px-4 pb-16">
 {loading && (
 <div className="py-20 text-center text-faint text-sm tracking-widest uppercase">
 Loading bookings...
 </div>
 )}

 {!loading && error && (
 <div className="py-10 text-center text-red-400 text-sm">
 Error: {error}
 </div>
 )}

 {!loading && !error && bookings.length === 0 && (
 <div className="py-20 text-center text-faint text-sm tracking-widest uppercase">
 No bookings yet. Submissions will appear here.
 </div>
 )}

 {!loading && !error && bookings.length > 0 && (
 <>
 {/* Desktop table */}
 <div className="hidden md:block overflow-x-auto">
 <table className="w-full text-sm">
 <thead>
 <tr className="text-left text-xs tracking-widest uppercase text-faint border-b border-line">
 <th className="pb-3 pr-4">Created</th>
 <th className="pb-3 pr-4">Tier</th>
 <th className="pb-3 pr-4">Patient</th>
 <th className="pb-3 pr-4">Service</th>
 <th className="pb-3 pr-4">State</th>
 <th className="pb-3 pr-4">Amount</th>
 <th className="pb-3 pr-4">Status</th>
 <th className="pb-3">Actions</th>
 </tr>
 </thead>
 <tbody>
 {bookings.map((b) => (
 <Fragment key={b.id}>
 <tr
 className="border-b border-line hover:bg-surface-2 transition-colors"
 >
 <td className="py-3 pr-4 text-muted whitespace-nowrap">
 {formatDate(b.created_at)}
 </td>
 <td className="py-3 pr-4">
 <TierBadge tier={b.tier} />
 </td>
 <td className="py-3 pr-4">
 <p className="text-ink font-medium">{b.patient_name}</p>
 <p className="text-faint text-xs">{b.patient_email}</p>
 <p className="text-faint text-xs">{b.patient_phone}</p>
 </td>
 <td className="py-3 pr-4 text-muted max-w-[180px]">
 <p>{b.service}</p>
 {b.protocol_id && (
 <p className="text-faint text-xs mt-0.5">{b.protocol_id}</p>
 )}
 </td>
 <td className="py-3 pr-4 text-faint">{b.patient_state ?? '-'}</td>
 <td className="py-3 pr-4 text-muted">{fmtAmount(b.amount_cents)}</td>
 <td className="py-3 pr-4">
 <StatusBadge status={b.payment_status} />
 </td>
 <td className="py-3">
 <div className="flex gap-2">
 <button
 onClick={() => toggleExpand(b.id)}
 className="px-3 py-1 text-xs rounded border border-line text-muted hover:text-ink hover:border-gray-400 transition-colors"
 >
 {expandedIds.has(b.id) ? 'Close' : 'View'}
 </button>
 <button
 onClick={() =>
 editingId === b.id ? cancelEdit() : openEdit(b)
 }
 className={
 editingId === b.id
 ? 'px-3 py-1 text-xs rounded border transition-colors'
 : 'px-3 py-1 text-xs rounded border border-line text-muted hover:text-ink hover:border-gray-400 transition-colors'
 }
 style={
 editingId === b.id
 ? { borderColor: 'var(--accent)', color: 'var(--accent)' }
 : {}
 }
 >
 {editingId === b.id ? 'Cancel' : 'Edit'}
 </button>
 </div>
 </td>
 </tr>

 {/* Expanded row */}
 {expandedIds.has(b.id) && (
 <tr key={`${b.id}-expand`} className="bg-gray-950">
 <td colSpan={8} className="px-4 py-4">
 <ExpandedDetail booking={b} />
 </td>
 </tr>
 )}

 {/* Edit row */}
 {editingId === b.id && (
 <tr key={`${b.id}-edit`} className="bg-gray-950">
 <td colSpan={8} className="px-4 py-4">
 <InlineEditor
 editState={editState}
 saving={saving}
 saveError={saveError}
 onChange={setEditState}
 onSave={() => saveEdit(b.id)}
 onCancel={cancelEdit}
 />
 </td>
 </tr>
 )}
 </Fragment>
 ))}
 </tbody>
 </table>
 </div>

 {/* Mobile cards */}
 <div className="md:hidden space-y-4">
 {bookings.map((b) => (
 <div
 key={b.id}
 className="rounded border border-line p-4"
 style={{ backgroundColor: '#111' }}
 >
 <div className="flex justify-between items-start mb-2">
 <div>
 <p className="text-ink font-medium">{b.patient_name}</p>
 <p className="text-faint text-xs">{b.patient_email}</p>
 </div>
 <StatusBadge status={b.payment_status} />
 </div>
 <div className="flex gap-2 mb-3 flex-wrap">
 <TierBadge tier={b.tier} />
 <span className="text-xs text-faint">{formatDate(b.created_at)}</span>
 </div>
 <p className="text-muted text-sm mb-1">{b.service}</p>
 <div className="flex justify-between items-center text-sm">
 <span className="text-muted">{fmtAmount(b.amount_cents)}</span>
 {b.patient_state && (
 <span className="text-faint text-xs">{b.patient_state}</span>
 )}
 </div>
 <div className="flex gap-2 mt-3">
 <button
 onClick={() => toggleExpand(b.id)}
 className="flex-1 px-3 py-2 text-xs rounded border border-line text-muted hover:text-ink hover:border-gray-400 transition-colors"
 >
 {expandedIds.has(b.id) ? 'Close' : 'View'}
 </button>
 <button
 onClick={() => (editingId === b.id ? cancelEdit() : openEdit(b))}
 className="flex-1 px-3 py-2 text-xs rounded border border-line text-muted hover:text-ink hover:border-gray-400 transition-colors"
 >
 {editingId === b.id ? 'Cancel' : 'Edit'}
 </button>
 </div>
 {expandedIds.has(b.id) && (
 <div className="mt-3 pt-3 border-t border-line">
 <ExpandedDetail booking={b} />
 </div>
 )}
 {editingId === b.id && (
 <div className="mt-3 pt-3 border-t border-line">
 <InlineEditor
 editState={editState}
 saving={saving}
 saveError={saveError}
 onChange={setEditState}
 onSave={() => saveEdit(b.id)}
 onCancel={cancelEdit}
 />
 </div>
 )}
 </div>
 ))}
 </div>
 </>
 )}
 </section>
 </main>
 );
}

// ---------------------------------------------------------------------------
// Expanded detail sub-component
// ---------------------------------------------------------------------------

function ExpandedDetail({ booking: b }: { booking: BookingRow }) {
 const fields: { label: string; value: string | null | undefined }[] = [
 { label: 'Goals', value: b.goals },
 { label: 'Medical History', value: b.medical_history },
 { label: 'Current Medications', value: b.current_medications },
 { label: 'Allergies', value: b.allergies },
 { label: 'Preferred Date', value: b.preferred_date },
 { label: 'Preferred Time', value: b.preferred_time },
 { label: 'Invoice URL', value: b.invoice_url },
 { label: 'Helcim Transaction ID', value: b.helcim_transaction_id },
 { label: 'Notes', value: b.notes },
 ];
 return (
 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
 {fields.map(
 (f) =>
 f.value && (
 <div key={f.label}>
 <p className="text-xs tracking-widest uppercase text-faint mb-0.5">{f.label}</p>
 <p className="text-muted text-sm whitespace-pre-wrap break-words">{f.value}</p>
 </div>
 ),
 )}
 </div>
 );
}

// ---------------------------------------------------------------------------
// Inline editor sub-component
// ---------------------------------------------------------------------------

interface InlineEditorProps {
 editState: EditState;
 saving: boolean;
 saveError: string | null;
 onChange: (s: EditState) => void;
 onSave: () => void;
 onCancel: () => void;
}

function InlineEditor({ editState, saving, saveError, onChange, onSave, onCancel }: InlineEditorProps) {
 const inputClass =
 'w-full bg-surface border border-line rounded px-3 py-2 text-sm text-muted focus:outline-none focus:border-amber-600';

 const statusOptions: BookingRow['payment_status'][] = [
 'pending',
 'invoice_sent',
 'paid',
 'cancelled',
 'refunded',
 ];

 return (
 <div className="space-y-3 max-w-lg">
 <p
 className="text-xs tracking-widest uppercase mb-3"
 style={{ color: 'var(--accent)' }}
 >
 Edit Booking
 </p>

 <div>
 <label className="block text-xs text-faint mb-1 uppercase tracking-widest">
 Amount (USD)
 </label>
 <input
 type="number"
 step="0.01"
 min="0"
 placeholder="0.00"
 value={editState.amount_dollars}
 onChange={(e) => onChange({ ...editState, amount_dollars: e.target.value })}
 className={inputClass}
 />
 </div>

 <div>
 <label className="block text-xs text-faint mb-1 uppercase tracking-widest">
 Payment Status
 </label>
 <select
 value={editState.payment_status}
 onChange={(e) =>
 onChange({
 ...editState,
 payment_status: e.target.value as BookingRow['payment_status'],
 })
 }
 className={inputClass}
 >
 {statusOptions.map((s) => (
 <option key={s} value={s}>
 {s.replace('_', ' ')}
 </option>
 ))}
 </select>
 </div>

 <div>
 <label className="block text-xs text-faint mb-1 uppercase tracking-widest">
 Invoice URL
 </label>
 <input
 type="url"
 placeholder="https://..."
 value={editState.invoice_url}
 onChange={(e) => onChange({ ...editState, invoice_url: e.target.value })}
 className={inputClass}
 />
 </div>

 <div>
 <label className="block text-xs text-faint mb-1 uppercase tracking-widest">Notes</label>
 <textarea
 rows={3}
 value={editState.notes}
 onChange={(e) => onChange({ ...editState, notes: e.target.value })}
 className={inputClass}
 />
 </div>

 {saveError && <p className="text-red-400 text-xs">{saveError}</p>}

 <div className="flex gap-3">
 <button
 onClick={onSave}
 disabled={saving}
 className="px-5 py-2 text-sm font-semibold rounded transition-opacity disabled:opacity-50"
 style={{ backgroundColor: 'var(--accent)', color: 'var(--on-accent)' }}
 >
 {saving ? 'Saving...' : 'Save'}
 </button>
 <button
 onClick={onCancel}
 disabled={saving}
 className="px-5 py-2 text-sm rounded border border-line text-muted hover:text-ink transition-colors disabled:opacity-50"
 >
 Cancel
 </button>
 </div>
 </div>
 );
}
