'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

const protocolNames: Record<string, string> = {
 cardiovascular: 'Cardiovascular Optimization Protocol',
 metabolic: 'Metabolic Enhancement Protocol',
 'hormone-optimization': 'Hormone Health Education',
 longevity: 'Longevity Protocol',
 'surgical-preop': 'Surgical Preoperative Optimization Protocol',
 cognitive: 'Cognitive & Study Protocol',
 sleep: 'Sleep & Recovery Protocol',
 'trt-lipids': 'Cardiovascular and Lipid Health Education',
 'glp1-optimization': 'Weight Management Optimization',
 'belly-fat': 'Belly Fat Reduction Protocol',
 'aging-parents': 'Aging Parents Essentials Protocol',
 'diabetic-neuropathy': 'Diabetic Neuropathy Recovery Protocol',
 pots: 'POTS Recovery Protocol',
 hangover: 'Hangover Prevention Protocol',
 'jet-lag': 'Jet Lag Recovery Protocol',
 menopause: 'Perimenopause & Menopause Protocol',
 skincare: 'Skincare Basics Protocol',
};

function SuccessContent() {
 const searchParams = useSearchParams();
 const protocolId = searchParams.get('protocol');
 const bookingId = searchParams.get('booking');
 const [unlockedMessage, setUnlockedMessage] = useState(false);
 const [verifyPending, setVerifyPending] = useState(false);
 const [verifyFailed, setVerifyFailed] = useState(false);

 useEffect(() => {
 if (!protocolId || !protocolNames[protocolId]) return;

 // Helcim flow: booking id present - verify server-side before trusting
 if (bookingId) {
 setVerifyPending(true);
 // Pull email from localStorage if we already have it, else rely on D1 lookup by bookingId.
 // We query the verify endpoint with bookingId to let the server resolve email+protocolId.
 fetch('/api/paywall/verify', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ bookingId, protocolId }),
 })
 .then((res) => res.json())
 .then((data: { unlocked?: boolean; email?: string }) => {
 if (data.unlocked === true) {
 if (data.email) {
 localStorage.setItem('latom_paid_email', data.email);
 }
 setUnlockedMessage(true);
 } else {
 setVerifyFailed(true);
 }
 })
 .catch(() => setVerifyFailed(true))
 .finally(() => setVerifyPending(false));
 return;
 }

 // Legacy flow (no booking param): verify using email already in localStorage
 const email = localStorage.getItem('latom_paid_email');
 if (email) {
 setVerifyPending(true);
 fetch('/api/paywall/verify', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ email, protocolId }),
 })
 .then((res) => res.json())
 .then((data: { unlocked?: boolean }) => {
 if (data.unlocked === true) {
 setUnlockedMessage(true);
 } else {
 setVerifyFailed(true);
 }
 })
 .catch(() => setVerifyFailed(true))
 .finally(() => setVerifyPending(false));
 }
 }, [protocolId, bookingId]);
 return (
 <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-16">
 <div className="absolute inset-0 bg-bg" />
 <div className="absolute inset-0 " />

 <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
 {/* Success Icon */}
 <div className="mb-8 flex justify-center">
 <div className="w-24 h-24 bg-green-500/20 border border-green-500/50 rounded-full flex items-center justify-center">
 <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
 </svg>
 </div>
 </div>

 <h1 className="font-serif text-5xl sm:text-6xl font-bold text-ink mb-6">
 {unlockedMessage
 ? <><span>Protocol</span> <span className="text-green-400">Unlocked</span></>
 : verifyFailed
 ? <><span>Verification</span> <span className="text-yellow-400">Pending</span></>
 : verifyPending
 ? <><span>Verifying</span> <span className="text-accent">Payment</span></>
 : <><span>Payment</span> <span className="text-green-400">Received</span></>
 }
 </h1>

 <p className="text-muted text-lg sm:text-xl max-w-xl mx-auto mb-8">
 {unlockedMessage
 ? `Your access to ${protocolNames[protocolId!]} is now active!`
 : verifyFailed
 ? 'Payment verification pending. Refresh in a few seconds, or call (307) 210-8604.'
 : verifyPending
 ? 'Confirming your payment with our server...'
 : 'Thank you! Your payment has been processed successfully.'}
 </p>

 {/* Next Steps */}
 <div className="bg-surface border border-line rounded-lg p-8 mb-8">
 <h2 className="text-2xl font-bold text-ink mb-6">What Happens Next</h2>

 <div className="space-y-6">
 <div className="flex gap-4">
 <div className="w-8 h-8 rounded-full bg-accent text-[color:var(--on-accent)] font-bold flex items-center justify-center flex-shrink-0">
 1
 </div>
 <div className="text-left">
 <h3 className="text-ink font-semibold mb-2">Payment Verification</h3>
 <p className="text-muted text-sm">
 We'll verify your payment within 24 hours and send you a booking confirmation email.
 </p>
 </div>
 </div>

 <div className="flex gap-4">
 <div className="w-8 h-8 rounded-full bg-accent text-[color:var(--on-accent)] font-bold flex items-center justify-center flex-shrink-0">
 2
 </div>
 <div className="text-left">
 <h3 className="text-ink font-semibold mb-2">Schedule Your Consultation</h3>
 <p className="text-muted text-sm">
 Click the appointment link to select your preferred date and time for your video call with Dr. Abdul.
 </p>
 </div>
 </div>

 <div className="flex gap-4">
 <div className="w-8 h-8 rounded-full bg-accent text-[color:var(--on-accent)] font-bold flex items-center justify-center flex-shrink-0">
 3
 </div>
 <div className="text-left">
 <h3 className="text-ink font-semibold mb-2">Pre-Consultation Checklist</h3>
 <p className="text-muted text-sm">
 We'll send you a health intake form to complete before your consultation. Please fill it out fully.
 </p>
 </div>
 </div>

 <div className="flex gap-4">
 <div className="w-8 h-8 rounded-full bg-accent text-[color:var(--on-accent)] font-bold flex items-center justify-center flex-shrink-0">
 4
 </div>
 <div className="text-left">
 <h3 className="text-ink font-semibold mb-2">Attend Your Consultation</h3>
 <p className="text-muted text-sm">
 Join your video call at the scheduled time. Dr. Abdul will review your health history, listen to your goals, and create a personalized plan.
 </p>
 </div>
 </div>
 </div>
 </div>

 {/* Contact Info */}
 <div className="bg-bg border border-line rounded-lg p-6 mb-8">
 <p className="text-muted mb-4">
 Have questions? We're here to help.
 </p>
 <p className="text-ink font-semibold text-lg mb-2">
 (307) 210-8604
 </p>
 <p className="text-muted text-sm">
 Available Monday-Friday, 9 AM - 5 PM ET
 </p>
 </div>

 {/* Action Buttons */}
 <div className="flex flex-col sm:flex-row gap-4 justify-center">
 {unlockedMessage ? (
 <>
 <Link
 href={`/protocols/${protocolId}`}
 className="px-8 py-4 bg-accent text-[color:var(--on-accent)] font-semibold rounded tracking-wide hover:bg-accent-hover transition-all duration-200"
 >
 View Your Protocol
 </Link>
 <Link
 href="/protocols"
 className="px-8 py-4 border border-accent text-accent font-semibold rounded tracking-wide hover:bg-accent hover:text-[color:var(--on-accent)] transition-all duration-200"
 >
 Browse Other Protocols
 </Link>
 </>
 ) : (
 <>
 <Link
 href="/"
 className="px-8 py-4 bg-accent text-[color:var(--on-accent)] font-semibold rounded tracking-wide hover:bg-accent-hover transition-all duration-200"
 >
 Return Home
 </Link>
 <Link
 href="/services"
 className="px-8 py-4 border border-accent text-accent font-semibold rounded tracking-wide hover:bg-accent hover:text-[color:var(--on-accent)] transition-all duration-200"
 >
 Learn More Services
 </Link>
 </>
 )}
 </div>

 {/* Compliance */}
 <p className="text-xs text-faint mt-12">
 💬 Your payment receipt and appointment confirmation have been sent to your email.
 <br />
 Check your spam folder if you don't see them within 30 minutes.
 </p>
 </div>
 </section>
 );
}

export default function SuccessPage() {
 return (
 <Suspense fallback={<div className="min-h-screen bg-bg" />}>
 <SuccessContent />
 </Suspense>
 );
}
