'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface BookingRow {
 id: number;
 tier: string;
 payment_status: string;
 amount_cents: number | null;
}

interface LeadRow {
 id: number;
}

export default function AdminHome() {
 const router = useRouter();
 const [token, setToken] = useState<string | null>(null);
 const [loading, setLoading] = useState(true);
 const [stats, setStats] = useState({
 bookings: 0,
 pendingPayments: 0,
 paidRevenueCents: 0,
 protocolPurchases: 0,
 leads: 0,
 });

 useEffect(() => {
 const stored = sessionStorage.getItem('latom_admin_token');
 if (!stored) {
 router.push('/admin/login');
 return;
 }
 setToken(stored);

 const headers = { 'x-admin-token': stored };
 Promise.allSettled([
 fetch('/api/admin/list-bookings?limit=500', { headers }).then(r => r.ok ? r.json() : null),
 fetch('/api/admin/leads?limit=1000', { headers }).then(r => r.ok ? r.json() : null),
 ]).then(([bookingsRes, leadsRes]) => {
 const bookings: BookingRow[] =
 bookingsRes.status === 'fulfilled' && bookingsRes.value ? bookingsRes.value.bookings ?? [] : [];
 const leads: LeadRow[] =
 leadsRes.status === 'fulfilled' && leadsRes.value ? leadsRes.value.leads ?? [] : [];

 setStats({
 bookings: bookings.length,
 pendingPayments: bookings.filter(b => b.payment_status === 'pending' || b.payment_status === 'invoice_sent').length,
 paidRevenueCents: bookings
 .filter(b => b.payment_status === 'paid')
 .reduce((sum, b) => sum + (b.amount_cents ?? 0), 0),
 protocolPurchases: bookings.filter(b => b.tier === 'protocol').length,
 leads: leads.length,
 });
 setLoading(false);
 });
 }, [router]);

 if (!token) return null;

 const cards = [
 {
 href: '/admin/bookings',
 title: 'Bookings',
 desc: 'Consults, services, and protocol purchases. Update payment status, send invoices.',
 stat: loading ? '...' : `${stats.bookings} total, ${stats.pendingPayments} awaiting payment`,
 },
 {
 href: '/admin/payments',
 title: 'Payments',
 desc: 'Payment reconciliation and Helcim transactions.',
 stat: loading ? '...' : `$${(stats.paidRevenueCents / 100).toFixed(2)} collected`,
 },
 {
 href: '/admin/protocols',
 title: 'Protocols',
 desc: 'All published protocols with purchase counts and revenue per protocol.',
 stat: loading ? '...' : `${stats.protocolPurchases} protocol purchases`,
 },
 {
 href: '/admin/leads',
 title: 'Leads',
 desc: 'Email capture signups from the lead magnet and landing pages.',
 stat: loading ? '...' : `${stats.leads} captured`,
 },
 ];

 return (
 <div className="min-h-screen bg-bg pt-28 pb-16 px-4">
 <div className="max-w-5xl mx-auto">
 <div className="flex items-center justify-between mb-8">
 <div>
 <h1 className="font-serif text-3xl font-bold text-ink">Admin Dashboard</h1>
 <p className="text-muted text-sm mt-1">LATOM Wellness practice management</p>
 </div>
 <button
 onClick={() => {
 sessionStorage.removeItem('latom_admin_token');
 router.push('/admin/login');
 }}
 className="text-muted text-sm border border-line rounded px-3 py-1.5 hover:text-ink hover:border-gray-500 transition-colors"
 >
 Sign out
 </button>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
 {cards.map(c => (
 <Link
 key={c.href}
 href={c.href}
 className="block p-6 bg-surface border border-line rounded-xl hover:border-accent/60 transition-colors"
 >
 <h2 className="text-accent font-semibold text-lg mb-1">{c.title}</h2>
 <p className="text-muted text-sm mb-3">{c.desc}</p>
 <p className="text-ink text-sm font-medium">{c.stat}</p>
 </Link>
 ))}
 </div>
 </div>
 </div>
 );
}
