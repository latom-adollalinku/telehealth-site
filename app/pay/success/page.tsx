'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

const protocolNames: Record<string, string> = {
  cardiovascular: 'Cardiovascular Optimization Protocol',
  metabolic: 'Metabolic Enhancement Protocol',
  'hormone-optimization': 'Hormone Optimization Protocol',
  longevity: 'Longevity Protocol',
  'surgical-preop': 'Surgical Preoperative Optimization Protocol',
  cognitive: 'Cognitive & Study Protocol',
  sleep: 'Sleep & Recovery Protocol',
  'trt-lipids': 'TRT Lipid Recovery Protocol',
  'glp1-optimization': 'GLP-1 Optimization Protocol',
  'belly-fat': 'Belly Fat Reduction Protocol',
};

function SuccessContent() {
  const searchParams = useSearchParams();
  const protocolId = searchParams.get('protocol');
  const [unlockedMessage, setUnlockedMessage] = useState(false);

  useEffect(() => {
    if (protocolId && protocolNames[protocolId]) {
      // Set localStorage to unlock protocol
      localStorage.setItem(`latom_protocol_${protocolId}`, 'unlocked');
      setUnlockedMessage(true);
    }
  }, [protocolId]);
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-16">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d1a] to-[#0a0a0a]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.05)_0%,_transparent_70%)]" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Success Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-green-500/20 border border-green-500/50 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h1 className="font-serif text-5xl sm:text-6xl font-bold text-white mb-6">
          {unlockedMessage ? 'Protocol' : 'Payment'} <span className="text-green-400">{unlockedMessage ? 'Unlocked' : 'Received'}</span>
        </h1>

        <p className="text-gray-300 text-lg sm:text-xl max-w-xl mx-auto mb-8">
          {unlockedMessage
            ? `✨ Your access to ${protocolNames[protocolId!]} is now active!`
            : 'Thank you! Your payment has been processed successfully.'}
        </p>

        {/* Next Steps */}
        <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">What Happens Next</h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#c9a84c] text-black font-bold flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div className="text-left">
                <h3 className="text-white font-semibold mb-2">Payment Verification</h3>
                <p className="text-gray-400 text-sm">
                  We'll verify your payment within 24 hours and send you a booking confirmation email.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#c9a84c] text-black font-bold flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div className="text-left">
                <h3 className="text-white font-semibold mb-2">Schedule Your Consultation</h3>
                <p className="text-gray-400 text-sm">
                  Click the appointment link to select your preferred date and time for your video call with Dr. Abdulhakim.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#c9a84c] text-black font-bold flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div className="text-left">
                <h3 className="text-white font-semibold mb-2">Pre-Consultation Checklist</h3>
                <p className="text-gray-400 text-sm">
                  We'll send you a health intake form to complete before your consultation. Please fill it out fully.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#c9a84c] text-black font-bold flex items-center justify-center flex-shrink-0">
                4
              </div>
              <div className="text-left">
                <h3 className="text-white font-semibold mb-2">Attend Your Consultation</h3>
                <p className="text-gray-400 text-sm">
                  Join your video call at the scheduled time. Dr. Abdulhakim will review your health history, listen to your goals, and create a personalized plan.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-[#0a0a0a] border border-[#c9a84c]/20 rounded-lg p-6 mb-8">
          <p className="text-gray-400 mb-4">
            Have questions? We're here to help.
          </p>
          <p className="text-white font-semibold text-lg mb-2">
            (678) 404-0730
          </p>
          <p className="text-gray-400 text-sm">
            Available Monday-Friday, 9 AM - 5 PM ET
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {unlockedMessage ? (
            <>
              <Link
                href={`/protocols/${protocolId}`}
                className="px-8 py-4 bg-[#c9a84c] text-black font-semibold rounded tracking-wide hover:bg-[#e0c070] transition-all duration-200"
              >
                View Your Protocol
              </Link>
              <Link
                href="/protocols"
                className="px-8 py-4 border border-[#c9a84c] text-[#c9a84c] font-semibold rounded tracking-wide hover:bg-[#c9a84c] hover:text-black transition-all duration-200"
              >
                Browse Other Protocols
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/"
                className="px-8 py-4 bg-[#c9a84c] text-black font-semibold rounded tracking-wide hover:bg-[#e0c070] transition-all duration-200"
              >
                Return Home
              </Link>
              <Link
                href="/services"
                className="px-8 py-4 border border-[#c9a84c] text-[#c9a84c] font-semibold rounded tracking-wide hover:bg-[#c9a84c] hover:text-black transition-all duration-200"
              >
                Learn More Services
              </Link>
            </>
          )}
        </div>

        {/* Compliance */}
        <p className="text-xs text-gray-500 mt-12">
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
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]" />}>
      <SuccessContent />
    </Suspense>
  );
}
