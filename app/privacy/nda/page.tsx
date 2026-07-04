import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Confidentiality Agreement | LATOM Wellness',
  description:
    'Confidentiality and NDA terms are reviewed and signed privately in the patient portal after you book your consultation.',
};

export default function NDAPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="max-w-xl w-full text-center py-24">
        <p className="text-[#c9a84c] text-sm font-semibold tracking-widest uppercase mb-4">
          Patient Portal
        </p>
        <h1 className="text-4xl font-serif font-bold text-white mb-6">
          Confidentiality Agreement
        </h1>
        <p className="text-gray-400 leading-relaxed mb-10">
          To protect your privacy, our confidentiality and non-disclosure terms
          are reviewed and signed securely inside the patient portal after you
          book your consultation. You will receive portal access immediately
          upon booking.
        </p>
        <Link
          href="/book"
          className="inline-block px-10 py-4 bg-[#c9a84c] text-black font-semibold rounded tracking-wide hover:bg-[#e0c070] transition-colors"
        >
          Book Your Consultation
        </Link>
      </div>
    </div>
  );
}
