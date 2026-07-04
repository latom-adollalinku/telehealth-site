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
 router.push('/admin');
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
 router.push('/admin');
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
 <div className="min-h-screen bg-bg flex items-center justify-center px-4">
 <ScrollFade>
 <div className="w-full max-w-md border border-line rounded-xl p-8 bg-bg">
 <h1 className="font-serif text-2xl text-accent mb-2 text-center tracking-wide">
 LATOM Wellness Admin
 </h1>
 <p className="text-muted text-sm text-center mb-8">
 Enter your admin token to continue.
 </p>

 <form onSubmit={handleSubmit} className="space-y-5">
 <div>
 <label htmlFor="token" className="block text-muted text-sm mb-2">
 Admin Token
 </label>
 <input
 id="token"
 type="password"
 value={token}
 onChange={(e) => setToken(e.target.value)}
 placeholder="Paste token here"
 required
 className="w-full bg-[#111] border border-line rounded-lg px-4 py-3 text-gray-100 placeholder-gray-600 focus:outline-none focus:border-accent/60 transition-colors"
 />
 </div>

 {error && (
 <p className="text-red-400 text-sm">{error}</p>
 )}

 <button
 type="submit"
 disabled={loading || !token}
 className="w-full bg-accent text-[color:var(--on-accent)] font-semibold py-3 rounded-lg hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
 >
 {loading ? 'Signing in...' : 'Sign in to admin'}
 </button>
 </form>

 <p className="mt-8 text-faint text-xs leading-relaxed">
 Admin token was provided during initial setup. Lost it? Generate a new one with{' '}
 <code className="text-muted bg-[#111] px-1 py-0.5 rounded">
 openssl rand -hex 32
 </code>{' '}
 and set as <code className="text-muted bg-[#111] px-1 py-0.5 rounded">ADMIN_SECRET_TOKEN</code>{' '}
 in Cloudflare Pages env vars, then rotate.
 </p>
 </div>
 </ScrollFade>
 </div>
 );
}
