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

    const stored = localStorage.getItem(`latom_protocol_${protocolId}`);
    if (stored === 'unlocked') {
      setUnlocked(true);
    }
    setChecked(true);
  }, [protocolId, searchParams]);

  if (!checked) return null;

  if (unlocked) {
    return <>{children}</>;
  }

  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-[#1a1a2e] border border-[#c9a84c]/30 rounded-xl p-8 sm:p-12 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.08)_0%,_transparent_70%)]" />
          <div className="relative z-10">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-center justify-center">
              <svg className="w-8 h-8 text-[#c9a84c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <p className="text-[#c9a84c] text-xs tracking-widest uppercase font-medium mb-3">
              Full Protocol Locked
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
              Unlock the Complete {protocolName}
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              Includes: complete daily supplement stack with exact dosing, timing,
              brand recommendations, safety notes, drug interactions, recheck schedule,
              and expected outcomes at each timeline milestone.
            </p>

            <div className="inline-flex flex-col sm:flex-row items-center gap-4 mb-6">
              <span className="font-serif text-5xl font-bold text-[#c9a84c]">{price}</span>
              <span className="text-gray-500 text-sm">one-time purchase</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href={`/pay?protocol=${protocolId}`}
                className="px-8 py-4 bg-[#c9a84c] text-black font-semibold rounded tracking-wide hover:bg-[#e0c070] transition-colors"
              >
                Purchase Full Protocol
              </Link>
              <Link
                href="/book"
                className="px-8 py-4 border border-[#c9a84c] text-[#c9a84c] font-semibold rounded tracking-wide hover:bg-[#c9a84c] hover:text-black transition-colors"
              >
                Book Consultation Instead
              </Link>
            </div>

            <p className="text-xs text-gray-500">
              Included free with Optimization ($199/mo) and Premium Longevity ($399/mo) memberships.
            </p>

            <div className="mt-8 pt-8 border-t border-[#2a2a4e]">
              <p className="text-gray-400 text-sm mb-4">What you get with the full protocol:</p>
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
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <svg className="w-4 h-4 text-[#c9a84c] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
