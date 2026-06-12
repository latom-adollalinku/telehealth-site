'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ScrollFade from '../../components/ScrollFade';

export default function AdminLoginPage() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem('latom_admin_token');
    if (stored) {
      router.push('/admin/bookings');
    }
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/list-bookings?limit=1', {
        headers: { 'x-admin-token': token },
      });

      if (res.ok) {
        sessionStorage.setItem('latom_admin_token', token);
        router.push('/admin/bookings');
      } else if (res.status === 401) {
        setError('Invalid token. Try again.');
      } else {
        setError('Error validating token. Try again or call (307) 210-8604.');
      }
    } catch {
      setError('Error validating token. Try again or call (307) 210-8604.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#0d0d1a] to-[#0a0a0a] flex items-center justify-center px-4">
      <ScrollFade>
        <div className="w-full max-w-md border border-[#c9a84c]/20 rounded-xl p-8 bg-[#0a0a0a]/80">
          <h1 className="font-serif text-2xl text-[#c9a84c] mb-2 text-center tracking-wide">
            LATOM Wellness Admin
          </h1>
          <p className="text-gray-400 text-sm text-center mb-8">
            Enter your admin token to continue.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="token" className="block text-gray-300 text-sm mb-2">
                Admin Token
              </label>
              <input
                id="token"
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Paste token here"
                required
                className="w-full bg-[#111] border border-[#c9a84c]/20 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-600 focus:outline-none focus:border-[#c9a84c]/60 transition-colors"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || !token}
              className="w-full bg-[#c9a84c] text-[#0a0a0a] font-semibold py-3 rounded-lg hover:bg-[#b8963f] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Signing in...' : 'Sign in to admin'}
            </button>
          </form>

          <p className="mt-8 text-gray-600 text-xs leading-relaxed">
            Admin token was provided during initial setup. Lost it? Generate a new one with{' '}
            <code className="text-gray-400 bg-[#111] px-1 py-0.5 rounded">
              openssl rand -hex 32
            </code>{' '}
            and set as <code className="text-gray-400 bg-[#111] px-1 py-0.5 rounded">ADMIN_SECRET_TOKEN</code>{' '}
            in Cloudflare Pages env vars, then rotate.
          </p>
        </div>
      </ScrollFade>
    </div>
  );
}
