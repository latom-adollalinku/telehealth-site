'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import ScrollFade from '../../components/ScrollFade';

type Stage = 'state' | 'consent' | 'intake' | 'submitted';

const VALID_STATES = [
  { value: 'VA', label: 'Virginia' },
  { value: 'TX', label: 'Texas' },
  { value: 'FL', label: 'Florida' },
  { value: 'TN', label: 'Tennessee' },
];

const TIME_OPTIONS = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
  '4:00 PM', '5:00 PM', '6:00 PM',
];

export default function MedicalBookingPage() {
  const [stage, setStage] = useState<Stage>('state');
  const [selectedState, setSelectedState] = useState('');
  const [isOtherState, setIsOtherState] = useState(false);
  const [consents, setConsents] = useState({ telemedicine: false, scope: false, hipaa: false });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const [form, setForm] = useState({
    name: '',
    dob: '',
    email: '',
    phone: '',
    medicalHistory: '',
    medications: '',
    allergies: '',
    goals: '',
    preferredDate: '',
    preferredTime: '',
  });

  const handleStateChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedState(val);
    setIsOtherState(val === 'OTHER');
    if (val !== 'OTHER' && val !== '') {
      setStage('consent');
    } else {
      setStage('state');
    }
  }, []);

  const allConsentsChecked = consents.telemedicine && consents.scope && consents.hipaa;

  const requiredFieldsFilled =
    form.name.trim() !== '' &&
    form.dob !== '' &&
    form.email.trim() !== '' &&
    form.phone.trim() !== '' &&
    form.medicalHistory.trim() !== '' &&
    form.medications.trim() !== '' &&
    form.allergies.trim() !== '' &&
    form.goals.trim() !== '';

  const canSubmit =
    selectedState !== '' &&
    selectedState !== 'OTHER' &&
    allConsentsChecked &&
    requiredFieldsFilled &&
    !submitting;

  const logConsent = async (type: string) => {
    try {
      await fetch('/api/acceptance/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, timestamp: new Date().toISOString(), userAgent: navigator.userAgent }),
      });
    } catch {
      // non-blocking
    }
  };

  const handleConsentChange = useCallback(
    async (key: keyof typeof consents, checked: boolean) => {
      setConsents((prev) => ({ ...prev, [key]: checked }));
      if (checked) {
        const typeMap: Record<keyof typeof consents, string> = {
          telemedicine: 'medical_telemedicine_consent',
          scope: 'medical_scope_consent',
          hipaa: 'medical_hipaa_financial_consent',
        };
        await logConsent(typeMap[key]);
      }
    },
    []
  );

  const handleFormChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    setSubmitError('');

    const stateLabelMap: Record<string, string> = {
      VA: 'Virginia', TX: 'Texas', FL: 'Florida', TN: 'Tennessee',
    };

    try {
      const res = await fetch('/api/booking/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier: 'medical',
          name: form.name,
          dob: form.dob,
          email: form.email,
          phone: form.phone,
          state: stateLabelMap[selectedState] || selectedState,
          medicalHistory: form.medicalHistory,
          medications: form.medications,
          allergies: form.allergies,
          goals: form.goals,
          preferredDate: form.preferredDate || undefined,
          preferredTime: form.preferredTime || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Submission failed. Please try again.');
      }

      setStage('submitted');
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (stage === 'submitted') {
    return (
      <section className="relative min-h-screen pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d1a] to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.05)_0%,_transparent_70%)]" />
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollFade>
            <div className="bg-[#111118] border border-[#c9a84c]/30 rounded-xl p-10">
              <div className="w-14 h-14 mx-auto mb-6 flex items-center justify-center rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30">
                <svg className="w-7 h-7 text-[#c9a84c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="font-serif text-3xl font-bold text-white mb-4">
                Booking Request Received
              </h1>
              <p className="text-gray-300 leading-relaxed mb-6">
                Dr. Abdul will contact you within 24-48 hours to confirm your consultation time.
                You will receive a link to complete any remaining intake forms in our patient portal
                and to upload any recent labs. A Helcim invoice for the session fee will be sent
                separately. Once payment is confirmed and intake is complete, your consultation
                will be scheduled.
              </p>
              <Link
                href="/"
                className="inline-block px-8 py-3 bg-[#c9a84c] text-black font-semibold rounded tracking-wide hover:bg-[#e0c070] transition-colors duration-200"
              >
                Return to Home
              </Link>
            </div>
          </ScrollFade>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Section 1: Hero */}
      <section className="relative pt-28 pb-14 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d1a] to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.05)_0%,_transparent_70%)]" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollFade>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
              Medical Consultation
            </h1>
            <p className="text-gray-300 text-lg max-w-xl mx-auto">
              Clinical consultation with prescribing capability. Available to patients in licensed states only.
            </p>
          </ScrollFade>
        </div>
      </section>

      {/* Section 2: State Eligibility Gate */}
      <section className="relative py-10 overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a0a]" />
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade>
            <div className="bg-[#111118] border border-[#c9a84c]/20 rounded-xl p-8">
              <h2 className="font-serif text-2xl font-bold text-white mb-2">
                Step 1: Confirm Your State
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Telemedicine consultations are subject to state licensure. Please select the state
                where you will be located during the consultation.
              </p>

              <label htmlFor="state-select" className="block text-xs font-semibold text-[#c9a84c] uppercase tracking-wider mb-2">
                Your State
              </label>
              <select
                id="state-select"
                value={selectedState}
                onChange={handleStateChange}
                className="w-full px-4 py-3 rounded bg-[#0a0a0a] border border-[#c9a84c]/20 text-white focus:outline-none focus:border-[#c9a84c]/60 appearance-none cursor-pointer"
              >
                <option value="">-- Select State --</option>
                {VALID_STATES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
                <option value="OTHER">Other -- Not Currently Available</option>
              </select>

              {isOtherState && (
                <div className="mt-5 p-4 bg-amber-900/20 border border-amber-600/30 rounded-lg">
                  <p className="text-amber-300 text-sm leading-relaxed">
                    Dr. Abdul is not currently licensed to provide medical consultations in your state.
                    The Wellness Consultation tier is available to clients in any state and may be a good fit.
                  </p>
                  <Link
                    href="/book/wellness"
                    className="inline-block mt-3 px-5 py-2 bg-[#c9a84c] text-black text-sm font-semibold rounded hover:bg-[#e0c070] transition-colors duration-200"
                  >
                    View Wellness Consultation
                  </Link>
                </div>
              )}
            </div>
          </ScrollFade>
        </div>
      </section>

      {/* Section 3: Medical Informed Consent */}
      {(stage === 'consent' || stage === 'intake') && (
        <section className="relative py-10 overflow-hidden">
          <div className="absolute inset-0 bg-[#0a0a0a]" />
          <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollFade>
              <div className="bg-[#111118] border border-[#c9a84c]/20 rounded-xl p-8">
                <h2 className="font-serif text-2xl font-bold text-white mb-2">
                  Step 2: Informed Consent
                </h2>
                <p className="text-gray-400 text-sm mb-6">
                  Please read each section carefully before checking the boxes below.
                </p>

                <div className="space-y-5 text-sm text-gray-300 leading-relaxed mb-8">
                  <div>
                    <p className="text-xs font-semibold text-[#c9a84c] uppercase tracking-wider mb-1">
                      1. Telemedicine Consent
                    </p>
                    <p>
                      I understand this consultation will be conducted via telemedicine (video). I understand
                      telemedicine has limitations including potential technology issues, inability to perform
                      a physical exam, and that an in-person visit may sometimes be required.
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-[#c9a84c] uppercase tracking-wider mb-1">
                      2. Scope of Practice
                    </p>
                    <p>
                      I understand Dr. Abdul provides wellness, longevity, and integrative medicine consultations
                      through LATOM Wellness, PLLC, and does NOT provide primary care, emergency care, or management
                      of acute conditions. For emergencies I will call 911. For primary care concerns I will see
                      my primary care physician.
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-[#c9a84c] uppercase tracking-wider mb-1">
                      3. Prescribing Acknowledgment
                    </p>
                    <p>
                      I understand that any prescriptions written by Dr. Abdul require a clinical evaluation,
                      will be documented in my medical record, and will be dispensed by US-licensed pharmacies
                      (including compounding pharmacies as appropriate). I understand the limitations on controlled
                      substances and that this practice does not prescribe scheduled medications.
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-[#c9a84c] uppercase tracking-wider mb-1">
                      4. Specific Therapies and Informed Consent
                    </p>
                    <p>
                      I understand that some prescribed therapies may require separate informed consent, and that I
                      will review and sign that consent with my physician before any specific therapy is prescribed.
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-[#c9a84c] uppercase tracking-wider mb-1">
                      5. HIPAA Notice
                    </p>
                    <p>
                      I acknowledge receipt of the{' '}
                      <Link href="/legal" className="text-[#c9a84c] hover:underline">
                        Notice of Privacy Practices
                      </Link>
                      . My protected health information (PHI) will be protected per HIPAA and stored in a
                      HIPAA-compliant EHR system.
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-[#c9a84c] uppercase tracking-wider mb-1">
                      6. Financial Terms
                    </p>
                    <p>
                      I understand this is a direct-pay practice. Session fees will be set per consultation.
                      Dr. Abdul will send an invoice via Helcim after booking. Insurance is not billed.
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-[#c9a84c] uppercase tracking-wider mb-1">
                      7. Cancellation Policy
                    </p>
                    <p>
                      24-hour notice is required for a full refund.
                    </p>
                  </div>
                </div>

                {/* Consent checkboxes */}
                <div className="space-y-4 pt-4 border-t border-[#c9a84c]/10">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={consents.telemedicine}
                      onChange={(e) => handleConsentChange('telemedicine', e.target.checked)}
                      className="mt-1 w-4 h-4 accent-[#c9a84c] cursor-pointer flex-shrink-0"
                    />
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                      I have read and consent to the telemedicine consultation.
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={consents.scope}
                      onChange={(e) => handleConsentChange('scope', e.target.checked)}
                      className="mt-1 w-4 h-4 accent-[#c9a84c] cursor-pointer flex-shrink-0"
                    />
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                      I understand the scope of practice and prescribing terms.
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={consents.hipaa}
                      onChange={(e) => handleConsentChange('hipaa', e.target.checked)}
                      className="mt-1 w-4 h-4 accent-[#c9a84c] cursor-pointer flex-shrink-0"
                    />
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                      I acknowledge the HIPAA Notice of Privacy Practices and financial terms.
                    </span>
                  </label>
                </div>

                {allConsentsChecked && stage === 'consent' && (
                  <button
                    onClick={() => setStage('intake')}
                    className="mt-6 w-full py-3 bg-[#c9a84c] text-black font-semibold rounded tracking-wide hover:bg-[#e0c070] transition-colors duration-200"
                  >
                    Continue to Patient Intake
                  </button>
                )}
              </div>
            </ScrollFade>
          </div>
        </section>
      )}

      {/* Section 4: Patient Intake Form */}
      {stage === 'intake' && (
        <section className="relative py-10 overflow-hidden">
          <div className="absolute inset-0 bg-[#0a0a0a]" />
          <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollFade>
              <form onSubmit={handleSubmit} noValidate>
                <div className="bg-[#111118] border border-[#c9a84c]/20 rounded-xl p-8">
                  <h2 className="font-serif text-2xl font-bold text-white mb-2">
                    Step 3: Patient Intake
                  </h2>
                  <p className="text-gray-400 text-sm mb-6">
                    All fields marked with an asterisk (*) are required.
                  </p>

                  <div className="space-y-5">
                    {/* Full legal name */}
                    <div>
                      <label className="block text-xs font-semibold text-[#c9a84c] uppercase tracking-wider mb-1.5">
                        Full Legal Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleFormChange}
                        required
                        placeholder="As it appears on your ID"
                        className="w-full px-4 py-3 rounded bg-[#0a0a0a] border border-[#c9a84c]/20 text-white placeholder-gray-600 focus:outline-none focus:border-[#c9a84c]/60"
                      />
                    </div>

                    {/* Date of birth */}
                    <div>
                      <label className="block text-xs font-semibold text-[#c9a84c] uppercase tracking-wider mb-1.5">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        name="dob"
                        value={form.dob}
                        onChange={handleFormChange}
                        required
                        className="w-full px-4 py-3 rounded bg-[#0a0a0a] border border-[#c9a84c]/20 text-white focus:outline-none focus:border-[#c9a84c]/60"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-[#c9a84c] uppercase tracking-wider mb-1.5">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleFormChange}
                        required
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded bg-[#0a0a0a] border border-[#c9a84c]/20 text-white placeholder-gray-600 focus:outline-none focus:border-[#c9a84c]/60"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-semibold text-[#c9a84c] uppercase tracking-wider mb-1.5">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleFormChange}
                        required
                        placeholder="(555) 000-0000"
                        className="w-full px-4 py-3 rounded bg-[#0a0a0a] border border-[#c9a84c]/20 text-white placeholder-gray-600 focus:outline-none focus:border-[#c9a84c]/60"
                      />
                    </div>

                    {/* State (read-only) */}
                    <div>
                      <label className="block text-xs font-semibold text-[#c9a84c] uppercase tracking-wider mb-1.5">
                        State
                      </label>
                      <input
                        type="text"
                        value={VALID_STATES.find((s) => s.value === selectedState)?.label ?? selectedState}
                        readOnly
                        className="w-full px-4 py-3 rounded bg-[#0a0a0a] border border-[#c9a84c]/10 text-gray-400 cursor-not-allowed"
                      />
                    </div>

                    {/* Medical history */}
                    <div>
                      <label className="block text-xs font-semibold text-[#c9a84c] uppercase tracking-wider mb-1.5">
                        Brief Medical History *
                      </label>
                      <textarea
                        name="medicalHistory"
                        value={form.medicalHistory}
                        onChange={handleFormChange}
                        required
                        rows={4}
                        placeholder="List any chronic conditions, surgeries, or significant medical issues."
                        className="w-full px-4 py-3 rounded bg-[#0a0a0a] border border-[#c9a84c]/20 text-white placeholder-gray-600 focus:outline-none focus:border-[#c9a84c]/60 resize-vertical"
                      />
                    </div>

                    {/* Current medications */}
                    <div>
                      <label className="block text-xs font-semibold text-[#c9a84c] uppercase tracking-wider mb-1.5">
                        Current Medications and Supplements *
                      </label>
                      <textarea
                        name="medications"
                        value={form.medications}
                        onChange={handleFormChange}
                        required
                        rows={3}
                        placeholder="List all prescription medications, over-the-counter drugs, and supplements. Type 'None' if none."
                        className="w-full px-4 py-3 rounded bg-[#0a0a0a] border border-[#c9a84c]/20 text-white placeholder-gray-600 focus:outline-none focus:border-[#c9a84c]/60 resize-vertical"
                      />
                    </div>

                    {/* Known allergies */}
                    <div>
                      <label className="block text-xs font-semibold text-[#c9a84c] uppercase tracking-wider mb-1.5">
                        Known Allergies *
                      </label>
                      <textarea
                        name="allergies"
                        value={form.allergies}
                        onChange={handleFormChange}
                        required
                        rows={2}
                        placeholder="Medications, food, environmental. Type 'None' if none."
                        className="w-full px-4 py-3 rounded bg-[#0a0a0a] border border-[#c9a84c]/20 text-white placeholder-gray-600 focus:outline-none focus:border-[#c9a84c]/60 resize-vertical"
                      />
                    </div>

                    {/* Current concerns or goals */}
                    <div>
                      <label className="block text-xs font-semibold text-[#c9a84c] uppercase tracking-wider mb-1.5">
                        Current Concerns or Goals *
                      </label>
                      <textarea
                        name="goals"
                        value={form.goals}
                        onChange={handleFormChange}
                        required
                        rows={3}
                        placeholder="What you want to address."
                        className="w-full px-4 py-3 rounded bg-[#0a0a0a] border border-[#c9a84c]/20 text-white placeholder-gray-600 focus:outline-none focus:border-[#c9a84c]/60 resize-vertical"
                      />
                    </div>

                    {/* Preferred date (optional) */}
                    <div>
                      <label className="block text-xs font-semibold text-[#c9a84c] uppercase tracking-wider mb-1.5">
                        Preferred Consultation Date{' '}
                        <span className="normal-case text-gray-500 font-normal">(optional)</span>
                      </label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={form.preferredDate}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 rounded bg-[#0a0a0a] border border-[#c9a84c]/20 text-white focus:outline-none focus:border-[#c9a84c]/60"
                      />
                    </div>

                    {/* Preferred time (optional) */}
                    <div>
                      <label className="block text-xs font-semibold text-[#c9a84c] uppercase tracking-wider mb-1.5">
                        Preferred Consultation Time{' '}
                        <span className="normal-case text-gray-500 font-normal">(optional)</span>
                      </label>
                      <select
                        name="preferredTime"
                        value={form.preferredTime}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 rounded bg-[#0a0a0a] border border-[#c9a84c]/20 text-white focus:outline-none focus:border-[#c9a84c]/60 appearance-none cursor-pointer"
                      >
                        <option value="">-- No preference --</option>
                        {TIME_OPTIONS.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Submit error */}
                  {submitError && (
                    <div className="mt-5 p-3 bg-red-900/20 border border-red-600/30 rounded-lg">
                      <p className="text-red-300 text-sm">{submitError}</p>
                    </div>
                  )}

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className={`mt-7 w-full py-3.5 font-semibold rounded tracking-wide transition-colors duration-200 ${
                      canSubmit
                        ? 'bg-[#c9a84c] text-black hover:bg-[#e0c070] cursor-pointer'
                        : 'bg-[#c9a84c]/30 text-black/40 cursor-not-allowed'
                    }`}
                  >
                    {submitting ? 'Submitting...' : 'Submit Booking Request'}
                  </button>

                  <p className="mt-4 text-xs text-gray-600 text-center">
                    By submitting, you confirm that all information provided is accurate and that you have
                    read and agreed to the consents above.
                  </p>
                </div>
              </form>
            </ScrollFade>
          </div>
        </section>
      )}

      {/* Footer spacing */}
      <section className="py-12 bg-[#0a0a0a]" />
    </>
  );
}
