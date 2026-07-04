'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ScrollFade from '../components/ScrollFade';

export default function AgreementPage() {
 const router = useRouter();
 const [agreed, setAgreed] = useState(false);
 const [submitting, setSubmitting] = useState(false);

 const handleAccept = async () => {
 if (!agreed || submitting) return;
 setSubmitting(true);
 try {
 const timestamp = new Date().toISOString();
 await fetch('/api/acceptance/log', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({
 type: 'service_agreement',
 timestamp,
 userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
 }),
 }).catch(() => {});

 localStorage.setItem(
 'latom_agreement_accepted',
 JSON.stringify({ accepted: true, timestamp }),
 );
 router.push('/book');
 } catch (err) {
 console.error('Error accepting agreement:', err);
 } finally {
 setSubmitting(false);
 }
 };

 return (
 <>
 <section className="relative pt-32 pb-12 overflow-hidden">
 <div className="absolute inset-0 bg-bg" />
 <div className="absolute inset-0 " />

 <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-line bg-accent-soft mb-8">
 <span className="text-accent text-xs tracking-widest uppercase font-medium">
 Before You Book
 </span>
 </div>
 <h1 className="font-serif text-4xl sm:text-5xl font-bold text-ink mb-4">
 Patient Service Agreement
 </h1>
 <p className="text-muted text-base max-w-2xl mx-auto">
 A brief overview of what to expect when engaging with LATOM Wellness. Review and acknowledge before scheduling your consultation.
 </p>
 </div>
 </section>

 <section className="py-8">
 <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
 <ScrollFade>
 <div className="bg-surface border border-line rounded-xl p-8 sm:p-10 space-y-8 text-muted leading-relaxed">

 <section>
 <h2 className="font-serif text-xl font-bold text-accent mb-3">1. Who We Are</h2>
 <p>
 LATOM Wellness, PLLC is a physician-led, direct-pay telehealth practice focused on integrative wellness, health optimization, and personalized care. Services are provided by a licensed physician under the laws of the Commonwealth of Virginia and other states where the physician holds an active license.
 </p>
 </section>

 <section>
 <h2 className="font-serif text-xl font-bold text-accent mb-3">2. Scope of Services</h2>
 <p>What we provide:</p>
 <ul className="list-disc list-inside space-y-1 ml-2 mt-2 text-muted">
 <li>Educational consultations and health assessments</li>
 <li>Personalized health optimization recommendations</li>
 <li>Laboratory testing coordination and interpretation</li>
 <li>Ongoing monitoring and follow-up care for established patients</li>
 </ul>
 </section>

 <section>
 <h2 className="font-serif text-xl font-bold text-accent mb-3">3. What We Are Not</h2>
 <ul className="list-disc list-inside space-y-1 ml-2 text-muted">
 <li>Not a substitute for primary care or your existing physician relationship</li>
 <li>Not an emergency or urgent care provider</li>
 <li>Not covered by health insurance or government health programs</li>
 <li>Not a guarantee of any specific clinical outcome</li>
 </ul>
 </section>

 <section>
 <h2 className="font-serif text-xl font-bold text-accent mb-3">4. Telehealth Limitations</h2>
 <p>
 Telehealth services are subject to state licensure rules. Care may be limited or unavailable in states where the physician is not licensed. Technology issues, connectivity problems, or clinical complexity may require an in-person visit with a local provider. You understand and accept these limitations.
 </p>
 </section>

 <section>
 <h2 className="font-serif text-xl font-bold text-accent mb-3">5. Patient Responsibilities</h2>
 <p>By engaging with LATOM Wellness, you agree to:</p>
 <ul className="list-disc list-inside space-y-1 ml-2 mt-2 text-muted">
 <li>Provide accurate and complete medical history, including all medications and supplements</li>
 <li>Disclose any changes in your health status or new medical conditions</li>
 <li>Follow recommendations and dosing instructions as discussed with your physician</li>
 <li>Report any side effects, adverse reactions, or concerns promptly</li>
 <li>Attend follow-up consultations as recommended</li>
 <li>Communicate honestly about your goals, expectations, and ability to follow protocols</li>
 </ul>
 </section>

 <section>
 <h2 className="font-serif text-xl font-bold text-accent mb-3">6. Financial Terms</h2>
 <p>
 LATOM Wellness is a direct-pay practice. Consultations, lab fees, and any recommended therapies are paid out of pocket. Insurance is not billed, and you are responsible for all costs. Payment is by credit or debit card via our secure checkout. Refund policies are reviewed at the time of booking.
 </p>
 </section>

 <section>
 <h2 className="font-serif text-xl font-bold text-accent mb-3">7. No Guarantees</h2>
 <p>
 Individual responses to health optimization protocols vary widely. Results depend on multiple factors including overall health, genetics, lifestyle, compliance, and clinical context. The physician makes no warranty of cure or specific outcome.
 </p>
 </section>

 <section>
 <h2 className="font-serif text-xl font-bold text-accent mb-3">8. Separate Informed Consent for Specific Therapies</h2>
 <p>
 If a specific therapy is recommended during your consultation, that therapy will require its own detailed informed consent, reviewed and signed with your physician at that time. This Service Agreement does not substitute for therapy-specific informed consent.
 </p>
 </section>

 <section>
 <h2 className="font-serif text-xl font-bold text-accent mb-3">9. Emergency Care</h2>
 <p>
 LATOM Wellness does not provide emergency care. In the event of a medical emergency, call 911 or go to the nearest emergency department. Inform emergency providers of all therapies and medications. The physician is not available for urgent or emergency triage outside of scheduled consultations.
 </p>
 </section>

 <section>
 <h2 className="font-serif text-xl font-bold text-accent mb-3">10. Dispute Resolution</h2>
 <p>
 Any dispute arising out of or relating to services provided by LATOM Wellness will be resolved exclusively by binding arbitration administered by the American Arbitration Association under the AAA Healthcare Payor Provider Rules. Arbitration will be conducted in Henrico County, Virginia. You and LATOM Wellness waive any right to a jury trial and to participate in any class action. This clause does not limit your right to file complaints with state medical boards or other regulatory bodies.
 </p>
 </section>

 <section>
 <h2 className="font-serif text-xl font-bold text-accent mb-3">11. Governing Law</h2>
 <p>
 This Agreement is governed by the laws of the Commonwealth of Virginia, without regard to conflict of law principles. Exclusive jurisdiction for any matter not subject to arbitration rests in the state or federal courts located in Henrico County, Virginia.
 </p>
 </section>

 <section className="border-t border-line pt-6">
 <p className="text-sm text-faint">
 Your acceptance is recorded with timestamp and device information for compliance purposes. A copy of this Agreement is preserved in the practice records.
 </p>
 </section>

 </div>
 </ScrollFade>
 </div>
 </section>

 <section className="py-12">
 <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="bg-surface border border-line rounded-xl p-8">
 <label htmlFor="agree" className="flex items-start gap-4 cursor-pointer mb-6">
 <input
 type="checkbox"
 id="agree"
 checked={agreed}
 onChange={(e) => setAgreed(e.target.checked)}
 className="mt-1 w-5 h-5 cursor-pointer accent-[color:var(--accent)] flex-shrink-0"
 />
 <span className="text-muted">
 I have read and understand the Patient Service Agreement above, including the binding arbitration clause, and wish to schedule a consultation with LATOM Wellness.
 </span>
 </label>

 <button
 onClick={handleAccept}
 disabled={!agreed || submitting}
 className={`w-full py-4 font-semibold rounded tracking-wide transition-colors ${
 agreed && !submitting
 ? 'bg-accent text-[color:var(--on-accent)] hover:bg-accent-hover cursor-pointer'
 : 'bg-gray-700 text-faint cursor-not-allowed'
 }`}
 >
 {submitting ? 'Recording acknowledgment...' : 'Acknowledge and Continue to Booking'}
 </button>

 <p className="text-xs text-faint text-center mt-4">
 You will be redirected to the booking page after acknowledgment.
 </p>
 </div>
 </div>
 </section>
 </>
 );
}
