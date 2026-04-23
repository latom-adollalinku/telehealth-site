'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ConsentPage() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [ndaVerified, setNdaVerified] = useState(false);

  useEffect(() => {
    // Verify NDA was signed first
    const ndaAccepted = localStorage.getItem('latom_nda_accepted');
    if (ndaAccepted) {
      setNdaVerified(true);
    }
  }, []);

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
          type: 'consent_peptide',
          timestamp,
          userAgent: navigator.userAgent,
        }),
      }).catch(() => {}); // Fail silently if API unavailable

      // Store in localStorage
      localStorage.setItem('latom_consent_accepted', JSON.stringify({
        accepted: true,
        timestamp,
      }));

      // Redirect to booking
      router.push('/book');
    } catch (error) {
      console.error('Error accepting consent:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!ndaVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#0d0d1a] to-[#0a0a0a] flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-white mb-6">Please Accept NDA First</h1>
          <p className="text-gray-400 mb-8">
            You must accept the Non-Disclosure Agreement before proceeding to the consent form.
          </p>
          <button
            onClick={() => router.push('/privacy/nda')}
            className="px-8 py-4 bg-[#c9a84c] text-black font-semibold rounded hover:bg-[#e0c070] transition-colors"
          >
            Go to NDA
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#0d0d1a] to-[#0a0a0a]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Medical Consent & Risk Acknowledgment</h1>
          <p className="text-gray-400">Peptide Therapy & Health Optimization Services</p>
        </div>

        {/* Document */}
        <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-lg p-8 mb-8">
          <div className="prose prose-invert max-w-none text-gray-300 space-y-6">
            <section>
              <h2 className="text-xl font-bold text-white mb-4">1. NATURE OF SERVICES</h2>
              <p>
                This consent form covers medical services provided by LATOM Wellness, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Physician consultations and health assessments</li>
                <li>Proprietary health optimization protocols</li>
                <li>Peptide therapy recommendations and prescriptions</li>
                <li>Monitoring and follow-up care related to prescribed therapies</li>
                <li>Laboratory testing coordination and interpretation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">2. PHYSICIAN QUALIFICATIONS</h2>
              <p>
                Services are provided by Dr. Abdilatif Abdulhakim, MD, a board-certified anesthesiologist with extensive experience in perioperative medicine, critical care, and health optimization. Dr. Abdulhakim is licensed to practice medicine in accordance with applicable state regulations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">3. PEPTIDE THERAPY: RISKS & KNOWN SIDE EFFECTS</h2>
              <p>
                Peptide therapy involves therapeutic peptides prescribed by Dr. Abdulhakim and dispensed by licensed compounding pharmacies. The Client acknowledges understanding of the following potential risks and side effects:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Injection Site Reactions:</strong> Redness, swelling, bruising, pain, or infection at injection sites</li>
                <li><strong>Systemic Effects:</strong> Headache, flushing, dizziness, nausea, or fatigue</li>
                <li><strong>Hormonal Changes:</strong> Peptides may affect hormonal pathways, including growth hormone, insulin, or immune function</li>
                <li><strong>Allergic Reactions:</strong> Rare but possible allergic or anaphylactic reactions to peptides or excipients</li>
                <li><strong>Unknown Long-Term Effects:</strong> Many peptide therapies are newer; long-term effects in humans may not be fully known</li>
                <li><strong>Drug Interactions:</strong> Peptides may interact with medications the Client is taking</li>
                <li><strong>Contraindications:</strong> Peptide therapy may be contraindicated in certain medical conditions</li>
                <li><strong>Regulatory Status:</strong> Some peptide therapies may not be FDA-approved for specific indications and are prescribed off-label</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">4. PEPTIDE THERAPY: POTENTIAL BENEFITS</h2>
              <p>
                The Client acknowledges understanding that peptide therapy may provide therapeutic benefits, which may include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Enhanced tissue repair and recovery</li>
                <li>Improved metabolic function and energy levels</li>
                <li>Optimized hormonal balance</li>
                <li>Potential anti-inflammatory effects</li>
                <li>Support for longevity and healthy aging</li>
                <li>Improved athletic performance and recovery</li>
              </ul>
              <p className="text-sm text-gray-500 mt-4">
                <strong>Important:</strong> Benefits are not guaranteed and vary by individual, peptide, and clinical context. Results depend on compliance, overall health, lifestyle factors, and individual biology.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">5. FINANCIAL & REGULATORY DISCLAIMERS</h2>
              <p>
                The Client acknowledges and agrees that:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>LATOM Wellness is a direct-pay practice; services are not covered by insurance</li>
                <li>The Client is responsible for all costs associated with consultations, protocols, and prescribed therapies</li>
                <li>Compounding pharmacies dispense peptides under state pharmacy regulations and FDA guidance</li>
                <li>Some peptide therapies may not be FDA-approved for specific indications and are prescribed off-label at the Client's request</li>
                <li>The Client assumes full responsibility and risk for using prescribed therapies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">6. MONITORING & COMMUNICATION</h2>
              <p>
                The Client agrees to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Report all side effects, adverse reactions, or concerns to Dr. Abdulhakim immediately</li>
                <li>Follow all dosing instructions and protocols as prescribed</li>
                <li>Attend follow-up consultations as recommended</li>
                <li>Disclose all medications, supplements, and medical conditions to ensure safe prescribing</li>
                <li>Inform Dr. Abdulhakim of any changes in health status or new medical conditions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">7. ASSUMPTION OF RISK & LIABILITY WAIVER</h2>
              <p>
                <strong>The Client assumes all risks associated with peptide therapy and health optimization services.</strong> The Client acknowledges that:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>The Client has been fully informed of potential risks, benefits, and alternatives</li>
                <li>The Client has had opportunity to ask questions and discuss concerns with Dr. Abdulhakim</li>
                <li>The Client voluntarily and willingly assumes all risks of peptide therapy</li>
                <li>The Client releases and holds harmless LATOM Wellness, Dr. Abdilatif Abdulhakim, and all associated entities from liability for any adverse effects, side effects, or complications arising from peptide therapy or health optimization services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">8. NO GUARANTEES</h2>
              <p>
                The Client acknowledges that:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>No results or outcomes are guaranteed</li>
                <li>Individual responses to peptide therapy vary widely</li>
                <li>Results depend on numerous factors including compliance, genetics, lifestyle, and overall health</li>
                <li>Dr. Abdulhakim makes no warranty of cure or specific health outcomes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">9. EMERGENCY CARE</h2>
              <p>
                In the event of a serious adverse reaction or medical emergency, the Client should seek immediate emergency medical care by calling 911 or visiting the nearest emergency department. The Client agrees to inform emergency care providers of all peptides and medications prescribed by LATOM Wellness.
              </p>
            </section>

            <section className="border-t border-[#c9a84c]/20 pt-6 mt-6">
              <p className="text-sm text-gray-500">
                <strong>Note:</strong> This consent covers peptide therapy and all health optimization services provided by LATOM Wellness. By accepting this consent, you confirm you have read, understood, and agree to all terms and conditions outlined above.
              </p>
            </section>
          </div>
        </div>

        {/* Acceptance */}
        <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-lg p-8">
          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-4">
              <input
                type="checkbox"
                id="understand-risks"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 w-5 h-5 cursor-pointer accent-[#c9a84c]"
              />
              <label htmlFor="understand-risks" className="text-gray-300 cursor-pointer">
                I have carefully read and understand all risks, benefits, and potential side effects of peptide therapy and health optimization services. I have had the opportunity to ask questions and discuss concerns with Dr. Abdulhakim.
              </label>
            </div>

            <div className="flex items-start gap-4">
              <input
                type="checkbox"
                id="assume-risk"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 w-5 h-5 cursor-pointer accent-[#c9a84c]"
              />
              <label htmlFor="assume-risk" className="text-gray-300 cursor-pointer">
                I voluntarily assume all risks associated with peptide therapy and health optimization services provided by LATOM Wellness. I release LATOM Wellness and Dr. Abdilatif Abdulhakim from liability for any adverse effects or complications.
              </label>
            </div>

            <div className="flex items-start gap-4">
              <input
                type="checkbox"
                id="consent-treatment"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 w-5 h-5 cursor-pointer accent-[#c9a84c]"
              />
              <label htmlFor="consent-treatment" className="text-gray-300 cursor-pointer">
                I consent to receive peptide therapy and health optimization services as recommended by Dr. Abdulhakim, and I understand that no results are guaranteed.
              </label>
            </div>
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
            {submitting ? 'Accepting...' : 'I Understand & Accept'}
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            Your acceptance is recorded with timestamp and device information for medical compliance purposes.
          </p>
        </div>
      </div>
    </div>
  );
}
