'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ScrollFade from '../../components/ScrollFade';

interface FormData {
 name: string;
 email: string;
 phone: string;
 goals: string;
 preferredDate: string;
 preferredTime: string;
}

const INITIAL_FORM: FormData = {
 name: '',
 email: '',
 phone: '',
 goals: '',
 preferredDate: '',
 preferredTime: '',
};

export default function WellnessBookPage() {
 const router = useRouter();
 const [acknowledged, setAcknowledged] = useState(false);
 const [submitted, setSubmitted] = useState(false);
 const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
 const [submitting, setSubmitting] = useState(false);
 const [submitError, setSubmitError] = useState<string | null>(null);

 const requiredFilled =
 formData.name.trim() !== '' &&
 formData.email.trim() !== '' &&
 formData.phone.trim() !== '' &&
 formData.goals.trim() !== '';

 const canSubmit = acknowledged && requiredFilled;

 const handleChange = (
 e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
 ) => {
 setFormData({ ...formData, [e.target.name]: e.target.value });
 };

 const handleAcknowledge = async (checked: boolean) => {
 setAcknowledged(checked);
 if (checked) {
 try {
 await fetch('/api/acceptance/log', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ type: 'wellness_engagement' }),
 });
 } catch {
 // Non-blocking: log failure silently
 }
 }
 };

 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 if (!canSubmit || submitting) return;
 setSubmitError(null);
 setSubmitting(true);
 try {
 const res = await fetch('/api/booking/request', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({
 tier: 'wellness',
 name: formData.name,
 email: formData.email,
 phone: formData.phone,
 service: 'wellness-consultation',
 goals: formData.goals,
 preferredDate: formData.preferredDate,
 preferredTime: formData.preferredTime,
 }),
 });
 if (res.ok) {
 setSubmitted(true);
 setFormData(INITIAL_FORM);
 } else {
 let errMsg = `Submission failed (HTTP ${res.status}).`;
 try {
 const j = await res.json();
 if (j?.error) errMsg = j.error;
 } catch {}
 setSubmitError(errMsg + ' Please try again or call (307) 210-8604.');
 }
 } catch {
 setSubmitError('Network error. Please try again or call (307) 210-8604.');
 // Submission failed silently; user can retry
 } finally {
 setSubmitting(false);
 }
 };

 return (
 <>
 {/* Section 1 - Hero */}
 <section className="relative pt-32 pb-20 overflow-hidden">
 <div className="absolute inset-0 bg-bg" />
 <div className="absolute inset-0 " />
 <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
 <ScrollFade>
 <h1 className="font-serif text-5xl sm:text-6xl font-bold text-ink mb-6">
 Wellness Consultation
 </h1>
 <p className="text-muted text-lg sm:text-xl max-w-2xl mx-auto">
 General health education and optimization guidance. Book a session below.
 </p>
 </ScrollFade>
 </div>
 </section>

 {/* Section 2 - Wellness Engagement Acknowledgment */}
 <section className="relative py-16 overflow-hidden">
 <div className="absolute inset-0 bg-gradient-to-b " />
 <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
 <ScrollFade delay={100}>
 <div className="bg-surface border border-line rounded-lg p-8">
 <h2 className="font-serif text-2xl font-bold text-ink mb-6">
 Wellness Engagement Acknowledgment
 </h2>
 <p className="text-muted text-sm mb-6">
 Please read the following carefully before booking your session.
 </p>

 <ol className="space-y-4 text-sm text-muted mb-8">
 <li className="flex gap-3">
 <span className="text-accent font-bold flex-shrink-0">1.</span>
 <span>
 This is a <strong className="text-ink">wellness consulting session</strong>,
 not medical care. It is not a clinical encounter.
 </span>
 </li>
 <li className="flex gap-3">
 <span className="text-accent font-bold flex-shrink-0">2.</span>
 <span>
 No physician-patient relationship is created by this consultation.
 </span>
 </li>
 <li className="flex gap-3">
 <span className="text-accent font-bold flex-shrink-0">3.</span>
 <span>
 Dr. Abdul is offering general health education, lifestyle guidance, and
 discussion of general lab and supplement categories.
 </span>
 </li>
 <li className="flex gap-3">
 <span className="text-accent font-bold flex-shrink-0">4.</span>
 <span>
 Dr. Abdul will <strong className="text-ink">not</strong> order specific labs,
 write prescriptions, diagnose conditions, or interpret your specific lab
 values clinically in this session.
 </span>
 </li>
 <li className="flex gap-3">
 <span className="text-accent font-bold flex-shrink-0">5.</span>
 <span>
 For any medical concerns, you should consult your{' '}
 <strong className="text-ink">primary care physician</strong>.
 </span>
 </li>
 <li className="flex gap-3">
 <span className="text-accent font-bold flex-shrink-0">6.</span>
 <span>
 If you need clinical evaluation or prescriptions, please book a{' '}
 <strong className="text-ink">Medical Consultation</strong> instead.
 </span>
 </li>
 <li className="flex gap-3">
 <span className="text-accent font-bold flex-shrink-0">7.</span>
 <span>
 Session fee will be set per consultation based on length and scope. Dr.
 Abdul will send an invoice via Helcim after booking confirmation. Your
 consultation is confirmed once payment is received.
 </span>
 </li>
 <li className="flex gap-3">
 <span className="text-accent font-bold flex-shrink-0">8.</span>
 <span>
 <strong className="text-ink">Cancellation policy:</strong> 24 hours notice
 required for a full refund.
 </span>
 </li>
 </ol>

 <label className="flex gap-3 items-start cursor-pointer p-4 bg-bg border border-line rounded-lg hover:border-accent/60 transition-colors">
 <input
 type="checkbox"
 checked={acknowledged}
 onChange={(e) => handleAcknowledge(e.target.checked)}
 className="mt-0.5 w-4 h-4 accent-[color:var(--accent)] flex-shrink-0"
 />
 <span className="text-sm text-muted">
 I understand this is a wellness consulting session and not medical care. I will
 consult my primary care physician for medical concerns.
 </span>
 </label>
 </div>
 </ScrollFade>
 </div>
 </section>

 {/* Section 3 - Booking Form / Section 4 - Confirmation */}
 <section className="relative py-16 overflow-hidden">
 <div className="absolute inset-0 bg-gradient-to-b " />
 <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
 <ScrollFade delay={200}>
 {submitted ? (
 /* Section 4 - Confirmation */
 <div className="bg-surface border border-line rounded-lg p-8 text-center">
 <div className="w-12 h-12 bg-accent-soft border border-line rounded-full flex items-center justify-center mx-auto mb-6">
 <svg
 className="w-6 h-6 text-accent"
 fill="none"
 viewBox="0 0 24 24"
 stroke="currentColor"
 strokeWidth={2}
 >
 <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
 </svg>
 </div>
 <h2 className="font-serif text-3xl font-bold text-ink mb-4">
 Booking Request Received
 </h2>
 <p className="text-muted mb-4">
 Dr. Abdul will contact you within 24 hours to confirm your time and will send a
 Helcim invoice for the session fee. Once payment is received, your consultation
 is confirmed.
 </p>
 <p className="text-muted text-sm mb-8">
 Until then, check your email for our follow-up. Questions? Reply to the
 confirmation email.
 </p>
 <button
 onClick={() => router.push('/')}
 className="px-8 py-3 bg-accent text-[color:var(--on-accent)] font-semibold rounded tracking-wide hover:bg-accent-hover transition-colors duration-200"
 >
 Return Home
 </button>
 </div>
 ) : (
 /* Section 3 - Booking Form */
 <div
 className={`bg-surface border rounded-lg p-8 transition-colors duration-300 ${
 acknowledged
 ? 'border-line'
 : 'border-line opacity-60'
 }`}
 >
 <h2 className="font-serif text-2xl font-bold text-ink mb-2">
 Request Your Session
 </h2>
 <p className="text-muted text-sm mb-8">
 {acknowledged
 ? 'Fill in your details and Dr. Abdul will follow up within 24 hours.'
 : 'Please accept the acknowledgment above to unlock the booking form.'}
 </p>

 <form onSubmit={handleSubmit} className="space-y-6">
 <fieldset disabled={!acknowledged} className="space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
 <div>
 <label className="block text-sm font-medium text-muted mb-2">
 Full Name <span className="text-accent">*</span>
 </label>
 <input
 type="text"
 name="name"
 value={formData.name}
 onChange={handleChange}
 required
 className="w-full px-4 py-3 bg-bg border border-line rounded text-ink placeholder-gray-600 focus:outline-none focus:border-accent transition disabled:opacity-40"
 placeholder="Jane Smith"
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-muted mb-2">
 Email <span className="text-accent">*</span>
 </label>
 <input
 type="email"
 name="email"
 value={formData.email}
 onChange={handleChange}
 required
 className="w-full px-4 py-3 bg-bg border border-line rounded text-ink placeholder-gray-600 focus:outline-none focus:border-accent transition disabled:opacity-40"
 placeholder="you@example.com"
 />
 </div>
 </div>

 <div>
 <label className="block text-sm font-medium text-muted mb-2">
 Phone <span className="text-accent">*</span>
 </label>
 <input
 type="tel"
 name="phone"
 value={formData.phone}
 onChange={handleChange}
 required
 className="w-full px-4 py-3 bg-bg border border-line rounded text-ink placeholder-gray-600 focus:outline-none focus:border-accent transition disabled:opacity-40"
 placeholder="(555) 123-4567"
 />
 </div>

 <div>
 <label className="block text-sm font-medium text-muted mb-2">
 What would you like to focus on? <span className="text-accent">*</span>
 </label>
 <textarea
 name="goals"
 value={formData.goals}
 onChange={handleChange}
 required
 rows={4}
 className="w-full px-4 py-3 bg-bg border border-line rounded text-ink placeholder-gray-600 focus:outline-none focus:border-accent transition resize-none disabled:opacity-40"
 placeholder='e.g., longevity, sleep optimization, general supplement education'
 />
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
 <div>
 <label className="block text-sm font-medium text-muted mb-2">
 Preferred Date{' '}
 <span className="text-faint font-normal">(optional)</span>
 </label>
 <input
 type="date"
 name="preferredDate"
 value={formData.preferredDate}
 onChange={handleChange}
 className="w-full px-4 py-3 bg-bg border border-line rounded text-ink focus:outline-none focus:border-accent transition disabled:opacity-40"
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-muted mb-2">
 Preferred Time{' '}
 <span className="text-faint font-normal">(optional)</span>
 </label>
 <select
 name="preferredTime"
 value={formData.preferredTime}
 onChange={handleChange}
 className="w-full px-4 py-3 bg-bg border border-line rounded text-ink focus:outline-none focus:border-accent transition disabled:opacity-40"
 >
 <option value="">Select time...</option>
 <option value="morning">Morning (9 AM - 12 PM)</option>
 <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
 <option value="evening">Evening (5 PM - 8 PM)</option>
 </select>
 </div>
 </div>
 </fieldset>

 {submitError && (
 <div className="p-3 bg-red-900/20 border border-red-500/40 rounded text-red-300 text-sm">
 {submitError}
 </div>
 )}

 <button
 type="submit"
 disabled={!canSubmit || submitting}
 className="w-full py-4 bg-accent text-[color:var(--on-accent)] font-semibold rounded tracking-wide hover:bg-accent-hover transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
 >
 {submitting ? 'Submitting...' : 'Submit Booking Request'}
 </button>

 <p className="text-xs text-faint text-center">
 By submitting this form you confirm you have read and accepted the Wellness
 Engagement Acknowledgment above.
 </p>
 </form>
 </div>
 )}
 </ScrollFade>
 </div>
 </section>
 </>
 );
}
