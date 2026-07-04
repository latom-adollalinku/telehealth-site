import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
 title: 'Informed Consent | LATOM Wellness',
 description:
 'Detailed informed consent for your treatment plan is provided during your consultation. Book to begin.',
};

export default function ConsentPage() {
 return (
 <div className="min-h-screen bg-bg flex items-center justify-center px-4">
 <div className="max-w-xl w-full text-center py-24">
 <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-4">
 Patient Portal
 </p>
 <h1 className="text-4xl font-serif font-bold text-ink mb-6">
 Informed Consent
 </h1>
 <p className="text-muted leading-relaxed mb-10">
 Detailed informed consent documents specific to your treatment plan
 are provided during your consultation and signed privately in the
 patient portal. Your physician will walk through all relevant
 information with you before any care begins.
 </p>
 <Link
 href="/book"
 className="inline-block px-10 py-4 bg-accent text-[color:var(--on-accent)] font-semibold rounded tracking-wide hover:bg-accent-hover transition-colors"
 >
 Book Your Consultation
 </Link>
 </div>
 </div>
 );
}
