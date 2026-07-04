'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface LeadRow {
 id: number;
 created_at: string;
 name: string | null;
 email: string;
 phone: string | null;
 interest: string | null;
 page: string | null;
 source: string | null;
}

export default function AdminLeads() {
 const router = useRouter();
 const [token, setToken] = useState<string | null>(null);
 const [leads, setLeads] = useState<LeadRow[]>([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);

 useEffect(() => {
 const stored = sessionStorage.getItem('latom_admin_token');
 if (!stored) {
 router.push('/admin/login');
 return;
 }
 setToken(stored);

 fetch('/api/admin/leads?limit=500', { headers: { 'x-admin-token': stored } })
 .then(r => {
 if (!r.ok) throw new Error(`HTTP ${r.status}`);
 return r.json();
 })
 .then((data: { leads: LeadRow[] }) => setLeads(data.leads ?? []))
 .catch(() => setError('Could not load leads.'))
 .finally(() => setLoading(false));
 }, [router]);

 if (!token) return null;

 const exportCsv = () => {
 const header = 'Date,Name,Email,Phone,Interest,Page,Source';
 const rows = leads.map(l =>
 [l.created_at, l.name, l.email, l.phone, l.interest, l.page, l.source]
 .map(v => `"${String(v ?? '').replace(/"/g, '""')}"`)
 .join(','),
 );
 const blob = new Blob([[header, ...rows].join('\n')], { type: 'text/csv' });
 const url = URL.createObjectURL(blob);
 const a = document.createElement('a');
 a.href = url;
 a.download = `latom-leads-${new Date().toISOString().slice(0, 10)}.csv`;
 a.click();
 URL.revokeObjectURL(url);
 };

 return (
 <div className="min-h-screen bg-bg pt-28 pb-16 px-4">
 <div className="max-w-5xl mx-auto">
 <div className="flex items-center justify-between mb-2">
 <h1 className="font-serif text-3xl font-bold text-ink">Leads</h1>
 <div className="flex items-center gap-3">
 {leads.length > 0 && (
 <button
 onClick={exportCsv}
 className="text-xs text-muted border border-line rounded px-3 py-1.5 hover:text-ink hover:border-gray-500"
 >
 Export CSV
 </button>
 )}
 <Link href="/admin" className="text-muted text-sm hover:text-ink">
 &larr; Dashboard
 </Link>
 </div>
 </div>
 <p className="text-muted text-sm mb-6">
 Email capture signups from the lead magnet and landing pages. Each new lead also
 triggers an email notification.
 </p>

 {error && (
 <div className="mb-4 p-3 bg-amber-900/30 border border-amber-700/50 rounded text-amber-300 text-sm">
 {error}
 </div>
 )}

 {loading ? (
 <p className="text-muted">Loading...</p>
 ) : leads.length === 0 ? (
 <div className="p-8 bg-surface border border-line rounded-xl text-center">
 <p className="text-muted">No leads captured yet.</p>
 <p className="text-faint text-sm mt-1">
 Leads from the homepage email capture will appear here.
 </p>
 </div>
 ) : (
 <div className="bg-surface border border-line rounded-xl overflow-x-auto">
 <table className="w-full text-sm">
 <thead>
 <tr className="border-b border-line text-left text-muted">
 <th className="px-4 py-3 font-medium">Date</th>
 <th className="px-4 py-3 font-medium">Name</th>
 <th className="px-4 py-3 font-medium">Email</th>
 <th className="px-4 py-3 font-medium">Phone</th>
 <th className="px-4 py-3 font-medium">Interest</th>
 <th className="px-4 py-3 font-medium">Source</th>
 </tr>
 </thead>
 <tbody>
 {leads.map(l => (
 <tr key={l.id} className="border-b border-line/60 hover:bg-white/[0.02]">
 <td className="px-4 py-3 text-muted text-xs whitespace-nowrap">
 {new Date(l.created_at).toLocaleString('en-US', {
 month: 'short',
 day: 'numeric',
 hour: 'numeric',
 minute: '2-digit',
 })}
 </td>
 <td className="px-4 py-3 text-ink">{l.name || '-'}</td>
 <td className="px-4 py-3">
 <a href={`mailto:${l.email}`} className="text-accent hover:underline">
 {l.email}
 </a>
 </td>
 <td className="px-4 py-3 text-muted">{l.phone || '-'}</td>
 <td className="px-4 py-3 text-muted">{l.interest || '-'}</td>
 <td className="px-4 py-3 text-faint text-xs">{l.source || '-'}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 )}
 </div>
 </div>
 );
}
