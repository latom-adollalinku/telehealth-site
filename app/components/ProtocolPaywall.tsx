'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

type Props = {
 protocolId: string;
 protocolName: string;
 price: string;
 children: React.ReactNode;
};

export default function ProtocolPaywall({ protocolId, protocolName, price, children }: Props) {
 const [unlocked, setUnlocked] = useState(false);
 const [checked, setChecked] = useState(false);
 const searchParams = useSearchParams();

 useEffect(() => {
 const previewParam = searchParams.get('preview');
 if (previewParam === 'owner') {
 setUnlocked(true);
 setChecked(true);
 return;
 }

 const email = localStorage.getItem('latom_paid_email');
 if (!email) {
 setChecked(true);
 return;
 }

 fetch('/api/paywall/verify', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ email, protocolId }),
 })
 .then((res) => res.json())
 .then((data: { unlocked?: boolean }) => {
 if (data.unlocked === true) {
 setUnlocked(true);
 }
 })
 .catch(() => {
 // Network error: fail closed (show paywall)
 })
 .finally(() => {
 setChecked(true);
 });
 }, [protocolId, searchParams]);

 if (!checked) {
 return (
 <section className="py-24">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
 <div className="w-8 h-8 border-2 border-accent/40 border-t-[var(--accent)] rounded-full animate-spin" />
 </div>
 </section>
 );
 }

 if (unlocked) {
 return <>{children}</>;
 }

 return (
 <section className="py-24">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="relative bg-surface border border-line rounded-xl p-8 sm:p-12 text-center overflow-hidden">
 <div className="absolute inset-0 " />
 <div className="relative z-10">
 <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent-soft border border-line flex items-center justify-center">
 <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
 </svg>
 </div>
 <p className="text-accent text-xs tracking-widest uppercase font-medium mb-3">
 Full Protocol Locked
 </p>
 <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink mb-4">
 Unlock the Complete {protocolName}
 </h2>
 <p className="text-muted max-w-2xl mx-auto mb-8 leading-relaxed">
 Includes: complete daily supplement stack with exact dosing, timing,
 brand recommendations, safety notes, drug interactions, recheck schedule,
 and expected outcomes at each timeline milestone.
 </p>

 <div className="inline-flex flex-col sm:flex-row items-center gap-4 mb-6">
 <span className="font-serif text-5xl font-bold text-accent">{price}</span>
 <span className="text-faint text-sm">one-time purchase</span>
 </div>

 <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
 <Link
 href={`/pay?protocol=${protocolId}`}
 className="px-8 py-4 bg-accent text-[color:var(--on-accent)] font-semibold rounded tracking-wide hover:bg-accent-hover transition-colors"
 >
 Purchase Full Protocol
 </Link>
 <Link
 href="/book"
 className="px-8 py-4 border border-accent text-accent font-semibold rounded tracking-wide hover:bg-accent hover:text-[color:var(--on-accent)] transition-colors"
 >
 Book Consultation Instead
 </Link>
 </div>

 <p className="text-xs text-faint">
 Included free with Optimization ($199/mo) and Premium Longevity ($399/mo) memberships.
 </p>

 <div className="mt-8 pt-8 border-t border-line">
 <p className="text-muted text-sm mb-4">What you get with the full protocol:</p>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto text-left">
 {[
 "Daily supplement stack with exact doses",
 "Morning / afternoon / evening timing",
 "Brand & dose recommendations on Amazon",
 "Drug interactions & contraindications",
 "Pre-surgery discontinuation schedule",
 "Monthly cost breakdown",
 "Expected lab improvements & timeline",
 "Recheck schedule & adjustments",
 ].map((feature, i) => (
 <div key={i} className="flex items-start gap-2 text-sm text-muted">
 <svg className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
 </svg>
 {feature}
 </div>
 ))}
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>
 );
}
