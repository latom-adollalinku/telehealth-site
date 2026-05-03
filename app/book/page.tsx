'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ScrollFade from '../components/ScrollFade';

export default function BookPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [acceptancesVerified, setAcceptancesVerified] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    state: '',
    service: '',
    preferredDate: '',
    preferredTime: '',
    goals: '',
  });

  // Verify both NDA and Consent acceptances before rendering
  useEffect(() => {
    const ndaAccepted = localStorage.getItem('latom_nda_accepted');
    const consentAccepted = localStorage.getItem('latom_consent_accepted');

    if (ndaAccepted && consentAccepted) {
      setAcceptancesVerified(true);
    } else {
      // Redirect to NDA if not both accepted
      router.push('/privacy/nda');
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/booking/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          state: '',
          service: '',
          preferredDate: '',
          preferredTime: '',
          goals: '',
        });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Booking error:', error);
    }
  };

  // Don't render until acceptances are verified
  if (!acceptancesVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#0d0d1a] to-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400">Verifying compliance documents...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d1a] to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.05)_0%,_transparent_70%)]" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-white mb-6">
            Book Your Consultation
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
            30-minute video call with Dr. Abdulhakim, MD — Anesthesiologist.
            <br />
            <span className="text-[#c9a84c]">No obligation. No pressure.</span>
          </p>
        </div>
      </section>

      {/* Cal.com Embed Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#0d0d1a]" />
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Schedule Online</h2>
            <p className="text-gray-400 mb-6">
              Use our online calendar to book your preferred time. Confirmation will be sent to your email within 24 hours.
            </p>

            {/* Cal.com Embed */}
            <div className="bg-[#0a0a0a] border border-[#c9a84c]/10 rounded overflow-hidden min-h-[800px]">
              <iframe
                src="https://cal.com/latom-wellness/consultation?embed=true"
                style={{
                  width: '100%',
                  height: '800px',
                  border: 'none',
                  borderRadius: '0.5rem',
                }}
                frameBorder="0"
                title="Book a consultation with LATOM Wellness"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Fallback Form */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d1a] to-[#0a0a0a]" />
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-2">Request a Consultation</h2>
            <p className="text-gray-400 mb-8">
              Or fill out this form and we'll contact you within 24 hours to confirm your appointment.
            </p>

            {submitted ? (
              <div className="bg-green-900/20 border border-green-600/30 rounded p-6 text-center">
                <p className="text-green-400 font-semibold mb-2">✓ Request Received</p>
                <p className="text-gray-300">
                  We'll contact you within 24 hours to confirm your consultation. Check your email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#c9a84c]/30 rounded text-white focus:outline-none focus:border-[#c9a84c] transition"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#c9a84c]/30 rounded text-white focus:outline-none focus:border-[#c9a84c] transition"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#c9a84c]/30 rounded text-white focus:outline-none focus:border-[#c9a84c] transition"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">State of Residence</label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#c9a84c]/30 rounded text-white focus:outline-none focus:border-[#c9a84c] transition"
                    >
                      <option value="">Select state...</option>
                      <option value="VA">Virginia</option>
                      <option value="NC">North Carolina</option>
                      <option value="SC">South Carolina</option>
                      <option value="GA">Georgia</option>
                      <option value="MD">Maryland</option>
                      <option value="PA">Pennsylvania</option>
                      <option value="CA">California</option>
                      <option value="NY">New York</option>
                      <option value="TX">Texas</option>
                      <option value="FL">Florida</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Service Interested In</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#c9a84c]/30 rounded text-white focus:outline-none focus:border-[#c9a84c] transition"
                  >
                    <option value="">Select service...</option>
                    <option value="weight-management">Weight Management</option>
                    <option value="peptide-therapy">Peptide Therapy</option>
                    <option value="hormone-optimization">Hormone Optimization</option>
                    <option value="general-wellness">General Wellness Consultation</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Date</label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#c9a84c]/30 rounded text-white focus:outline-none focus:border-[#c9a84c] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Time</label>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#c9a84c]/30 rounded text-white focus:outline-none focus:border-[#c9a84c] transition"
                    >
                      <option value="">Select time...</option>
                      <option value="morning">Morning (9 AM - 12 PM)</option>
                      <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                      <option value="evening">Evening (5 PM - 8 PM)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Health Goals (optional)</label>
                  <textarea
                    name="goals"
                    value={formData.goals}
                    onChange={handleChange}
                    maxLength={200}
                    rows={3}
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#c9a84c]/30 rounded text-white focus:outline-none focus:border-[#c9a84c] transition resize-none"
                    placeholder="What are your main health goals? (max 200 characters)"
                  />
                  <p className="text-xs text-gray-500 mt-2">{formData.goals.length}/200</p>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#c9a84c] text-black font-semibold rounded tracking-wide hover:bg-[#e0c070] transition-colors duration-200"
                >
                  Request Consultation
                </button>

                <p className="text-xs text-gray-500 text-center">
                  By requesting a consultation, you agree to our{' '}
                  <a href="/privacy" className="text-[#c9a84c] hover:underline">
                    privacy policy
                  </a>
                  .
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#0d0d1a]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade>
            <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Why Book With Us?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-[#c9a84c] font-semibold mb-2">Physician MD</h4>
                  <p className="text-gray-400 text-sm">
                    Physician consultations led by an anesthesiologist with 12+ years in healthcare.
                  </p>
                </div>
                <div>
                  <h4 className="text-[#c9a84c] font-semibold mb-2">No Insurance Hassle</h4>
                  <p className="text-gray-400 text-sm">
                    Direct-pay practice. No insurance claims, no referral requirements, no bureaucracy.
                  </p>
                </div>
                <div>
                  <h4 className="text-[#c9a84c] font-semibold mb-2">100% Confidential</h4>
                  <p className="text-gray-400 text-sm">
                    HIPAA-compliant. Your health information is secure and private.
                  </p>
                </div>
              </div>
            </div>
          </ScrollFade>
        </div>
      </section>
    </>
  );
}
