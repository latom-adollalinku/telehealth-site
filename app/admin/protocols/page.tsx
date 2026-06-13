'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { protocols } from '../../lib/protocolCatalog';

interface StatRow {
  protocol_id: string;
  total: number;
  paid: number;
  pending: number;
  revenue_cents: number;
  last_purchase_at: number | null;
}

export default function AdminProtocols() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [stats, setStats] = useState<Record<string, StatRow>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('latom_admin_token');
    if (!stored) {
      router.push('/admin/login');
      return;
    }
    setToken(stored);

    fetch('/api/admin/protocol-stats', { headers: { 'x-admin-token': stored } })
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: { stats: StatRow[] }) => {
        const map: Record<string, StatRow> = {};
        for (const s of data.stats) map[s.protocol_id] = s;
        setStats(map);
      })
      .catch(() => setError('Could not load purchase stats. Showing catalog only.'))
      .finally(() => setLoading(false));
  }, [router]);

  if (!token) return null;

  const totalRevenue = Object.values(stats).reduce((s, r) => s + (r.revenue_cents ?? 0), 0);
  const totalPurchases = Object.values(stats).reduce((s, r) => s + (r.total ?? 0), 0);

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-28 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h1 className="font-serif text-3xl font-bold text-white">Protocols</h1>
          <Link href="/admin" className="text-gray-400 text-sm hover:text-white">
            &larr; Dashboard
          </Link>
        </div>
        <p className="text-gray-400 text-sm mb-6">
          {protocols.length} published
          {!loading && totalPurchases > 0 && (
            <> &middot; {totalPurchases} purchases &middot; ${(totalRevenue / 100).toFixed(2)} revenue</>
          )}
        </p>

        {error && (
          <div className="mb-4 p-3 bg-amber-900/30 border border-amber-700/50 rounded text-amber-300 text-sm">
            {error}
          </div>
        )}

        <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#c9a84c]/20 text-left text-gray-400">
                <th className="px-4 py-3 font-medium">Protocol</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium text-right">Purchases</th>
                <th className="px-4 py-3 font-medium text-right">Paid</th>
                <th className="px-4 py-3 font-medium text-right">Revenue</th>
                <th className="px-4 py-3 font-medium text-right">Last Purchase</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {protocols.map(p => {
                const s = stats[p.id];
                return (
                  <tr key={p.id} className="border-b border-gray-800/60 hover:bg-white/[0.02]">
                    <td className="px-4 py-3">
                      <div className="text-white font-medium">{p.title}</div>
                      <div className="text-gray-500 text-xs">{p.subtitle}</div>
                    </td>
                    <td className="px-4 py-3 text-[#c9a84c] font-medium">{p.price}</td>
                    <td className="px-4 py-3 text-right text-white">
                      {loading ? '...' : s?.total ?? 0}
                    </td>
                    <td className="px-4 py-3 text-right text-green-400">
                      {loading ? '...' : s?.paid ?? 0}
                    </td>
                    <td className="px-4 py-3 text-right text-white">
                      {loading ? '...' : s ? `$${(s.revenue_cents / 100).toFixed(2)}` : '$0.00'}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-400 text-xs">
                      {loading
                        ? '...'
                        : s?.last_purchase_at
                          ? new Date(s.last_purchase_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })
                          : 'never'}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`${p.href}?preview=owner`}
                        target="_blank"
                        className="text-xs text-gray-400 border border-gray-700 rounded px-2 py-1 hover:text-white hover:border-gray-500"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-gray-500 text-xs">
          Purchases come from the bookings table (tier = protocol). Manual unlocks for Zelle or
          Venmo payments: use the unlock endpoint from the Bookings page.
        </p>
      </div>
    </div>
  );
}
