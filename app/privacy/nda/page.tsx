'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NDAPage() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleAccept = async () => {
    if (!agreed) return;

    setSubmitting(true);
    try {
      const timestamp = new Date().toISOString();

      // Log to backend
      await fetch('/api/acceptance/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'nda',
          timestamp,
          userAgent: navigator.userAgent,
        }),
      }).catch(() => {}); // Fail silently if API unavailable

      // Store in localStorage
      localStorage.setItem('latom_nda_accepted', JSON.stringify({
        accepted: true,
        timestamp,
      }));

      router.push('/privacy/consent');
    } catch (error) {
      console.error('Error accepting NDA:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#0d0d1a] to-[#0a0a0a]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Non-Disclosure Agreement</h1>
          <p className="text-gray-400">LATOM Wellness Medical Services</p>
        </div>

        {/* Document */}
        <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-lg p-8 mb-8">
          <div className="prose prose-invert max-w-none text-gray-300 space-y-6">
            <section>
              <h2 className="text-xl font-bold text-white mb-4">1. CONFIDENTIALITY OF INFORMATION</h2>
              <p>
                The Client agrees that all information, advice, protocols, and medical recommendations provided by LATOM Wellness and Dr. Abdilatif Abdulhakim are confidential and proprietary. This includes but is not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Personalized health optimization protocols and treatment plans</li>
                <li>Clinical data, research findings, and therapeutic recommendations</li>
                <li>Proprietary diagnostic methodologies and health assessment frameworks</li>
                <li>Specific peptide formulations, dosing regimens, and therapeutic approaches</li>
                <li>All electronic health records, consultations, and clinical notes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">2. NON-DISCLOSURE OBLIGATIONS</h2>
              <p>
                The Client agrees not to disclose, share, publish, or reproduce any proprietary information received from LATOM Wellness with any third party, including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Social media, online forums, or public platforms</li>
                <li>Competitors, other healthcare providers, or commercial entities</li>
                <li>Friends, family members, or associates (except for immediate household members assisting with care)</li>
                <li>Any individual or organization without prior written consent from LATOM Wellness</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">3. PERMITTED DISCLOSURES</h2>
              <p>
                Disclosure is permitted only to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Licensed healthcare providers directly involved in the Client's care</li>
                <li>Licensed compounding pharmacies preparing prescribed medications</li>
                <li>Healthcare insurance companies (if applicable)</li>
                <li>Government agencies if legally required (with notice to LATOM Wellness when possible)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">4. DURATION</h2>
              <p>
                This non-disclosure obligation extends indefinitely and survives termination of the client relationship.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">5. ACKNOWLEDGMENT</h2>
              <p>
                The Client acknowledges that:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>All information is proprietary and confidential in nature</li>
                <li>Breach of this agreement may cause irreparable harm to LATOM Wellness</li>
                <li>The Client understands the importance of protecting clinical and proprietary information</li>
                <li>Violation of this agreement may result in legal action</li>
              </ul>
            </section>

            <section className="border-t border-[#c9a84c]/20 pt-6 mt-6">
              <p className="text-sm text-gray-500">
                <strong>Note:</strong> This NDA covers all services provided by LATOM Wellness, including consultations, protocols, peptide therapy recommendations, and health optimization strategies. This agreement does not prevent you from discussing your own health care with your personal physicians or healthcare providers.
              </p>
            </section>
          </div>
        </div>

        {/* Acceptance */}
        <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-lg p-8">
          <div className="flex items-start gap-4 mb-6">
            <input
              type="checkbox"
              id="agree-nda"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 w-5 h-5 cursor-pointer accent-[#c9a84c]"
            />
            <label htmlFor="agree-nda" className="text-gray-300 cursor-pointer">
              I have read and understand the Non-Disclosure Agreement above. I agree to maintain confidentiality of all proprietary information, protocols, and advice provided by LATOM Wellness. I understand that this obligation is binding and indefinite.
            </label>
          </div>

          <button
            onClick={handleAccept}
            disabled={!agreed || submitting}
            className={`w-full py-4 font-semibold rounded tracking-wide transition-colors ${
              agreed && !submitting
                ? 'bg-[#c9a84c] text-black hover:bg-[#e0c070] cursor-pointer'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            {submitting ? 'Accepting...' : 'Accept & Continue'}
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            Your acceptance is recorded with timestamp and device information for compliance purposes.
          </p>
        </div>
      </div>
    </div>
  );
}
