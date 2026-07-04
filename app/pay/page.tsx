'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ScrollFade from '../components/ScrollFade';

declare global {
  interface Window {
    appendHelcimPayIframe?: (token: string, allowExit?: boolean) => void;
  }
}

function loadHelcimScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if ((window as any).appendHelcimPayIframe) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://secure.helcim.app/helcim-pay/services/start.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Helcim Pay.js'));
    document.body.appendChild(script);
  });
}

type ServiceTier = 'standard' | 'priority';

const protocolNames: Record<string, string> = {
  cardiovascular: 'Cardiovascular Optimization Protocol',
  metabolic: 'Metabolic Enhancement Protocol',
  'hormone-optimization': 'Hormone Health Education',
  longevity: 'Longevity Protocol',
  'surgical-preop': 'Surgical Preoperative Optimization Protocol',
  cognitive: 'Cognitive & Study Protocol',
  sleep: 'Sleep & Recovery Protocol',
  'trt-lipids': 'Cardiovascular and Lipid Health Education',
  'glp1-optimization': 'Weight Management Optimization',
  'belly-fat': 'Belly Fat Reduction Protocol',
  'aging-parents': 'Aging Parents Essentials Protocol',
  'diabetic-neuropathy': 'Diabetic Neuropathy Recovery Protocol',
  pots: 'POTS Recovery Protocol',
  hangover: 'Hangover Prevention Protocol',
  'jet-lag': 'Jet Lag Recovery Protocol',
  menopause: 'Perimenopause & Menopause Protocol',
  skincare: 'Skincare Basics Protocol',
};

const pricingTiers = {
  standard: [
    { name: 'Initial Consultation', price: 100, type: 'one-time' },
    { name: 'Follow-up Consultation', price: 100, type: 'one-time' },
    { name: 'Standard Membership', price: 100, type: 'subscription' },
    { name: 'Lab Coordination', price: 100, type: 'one-time' },
  ],
  priority: [
    { name: 'Priority Initial Consultation (60 min)', price: 249, type: 'one-time' },
    { name: 'Priority Follow-up', price: 125, type: 'one-time' },
    { name: 'Optimization Membership', price: 199, type: 'subscription' },
    { name: 'Premium Longevity Program', price: 399, type: 'subscription' },
  ],
};

function PayPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const protocolId = searchParams.get('protocol');

  const [serviceTier, setServiceTier] = useState<ServiceTier>('standard');
  const [selectedService, setSelectedService] = useState(pricingTiers.standard[0]);
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isProtocolPayment, setIsProtocolPayment] = useState(false);

  useEffect(() => {
    if (protocolId && protocolNames[protocolId]) {
      setIsProtocolPayment(true);
      // Create a protocol service object
      const protocolService = {
        name: `Unlock ${protocolNames[protocolId]}`,
        price: 49,
        type: 'one-time' as const,
      };
      setSelectedService(protocolService);
    }
  }, [protocolId]);

  const handleTierChange = (tier: ServiceTier) => {
    setServiceTier(tier);
    setSelectedService(pricingTiers[tier][0]);
  };

  const handleServiceChange = (service: typeof pricingTiers.standard[0]) => {
    setSelectedService(service);
  };

  const formValid =
    patientName.trim().length > 1 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(patientEmail) &&
    patientPhone.trim().length >= 7;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValid || submitting) return;
    setSubmitError(null);
    setSubmitting(true);

    // Attempt Helcim embedded checkout first.
    try {
      const helcimRes = await fetch('/api/helcim/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier: serviceTier,
          patientName,
          patientEmail,
          patientPhone,
          serviceName: selectedService.name,
          amount: selectedService.price,
          protocolId: isProtocolPayment ? protocolId : null,
        }),
      });

      // 503 means HELCIM_API_KEY not configured: fall through to legacy flow.
      if (helcimRes.status !== 503) {
        if (!helcimRes.ok) {
          let errMsg = `Request failed (HTTP ${helcimRes.status}).`;
          try {
            const j = await helcimRes.json();
            if (j?.error) errMsg = j.error;
          } catch {}
          setSubmitError(errMsg + ' Please try again or call (307) 210-8604.');
          setSubmitting(false);
          return;
        }

        const { checkoutToken, bookingId } = await helcimRes.json();

        await loadHelcimScript();

        // Listen for Helcim modal events before opening the iframe.
        const messageHandler = (event: MessageEvent) => {
          if (event.data?.eventName !== 'helcim-pay-js-' + checkoutToken) return;
          window.removeEventListener('message', messageHandler);

          if (event.data.eventStatus === 'SUCCESS') {
            const successUrl = isProtocolPayment
              ? `/pay/success?protocol=${protocolId}&booking=${bookingId}`
              : `/pay/success?booking=${bookingId}`;

            // Extract the Helcim transaction id from the success payload and
            // let the server verify + mark the booking paid before redirecting.
            // Server re-checks everything against the Helcim API, so a bad or
            // missing id here just falls back to the webhook path.
            let transactionId: string | undefined;
            try {
              const raw = event.data.eventMessage;
              const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
              const tx = parsed?.data?.data ?? parsed?.data ?? parsed;
              transactionId = tx?.transactionId ?? tx?.cardTransactionId ?? tx?.id;
            } catch {}

            const finish = () => router.push(successUrl);
            if (transactionId) {
              fetch('/api/helcim/confirm', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ bookingId, transactionId: String(transactionId) }),
              })
                .catch(() => {})
                .finally(finish);
            } else {
              finish();
            }
          } else if (event.data.eventStatus === 'ABORTED') {
            setSubmitError('Payment was declined. Try a different card or call (307) 210-8604.');
            setSubmitting(false);
          } else if (event.data.eventStatus === 'HIDE') {
            // User closed the modal without completing payment.
            setSubmitting(false);
          }
        };

        window.addEventListener('message', messageHandler);
        window.appendHelcimPayIframe!(checkoutToken, true);
        // Do not setSubmitting(false) here - the message handler resolves the state.
        return;
      }
    } catch {
      // Network error calling /api/helcim/checkout: fall through to legacy flow.
    }

    // Legacy fallback: /api/payment/confirm
    try {
      const res = await fetch('/api/payment/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethod: 'card',
          serviceName: selectedService.name,
          amount: selectedService.price,
          patientName,
          patientEmail,
          patientPhone,
          protocolId: isProtocolPayment ? protocolId : null,
        }),
      });
      if (res.ok) {
        const successUrl = isProtocolPayment
          ? `/pay/success?protocol=${protocolId}`
          : '/pay/success';
        router.push(successUrl);
      } else {
        let errMsg = `Request failed (HTTP ${res.status}).`;
        try {
          const j = await res.json();
          if (j?.error) errMsg = j.error;
        } catch {}
        setSubmitError(errMsg + ' Please try again or call (307) 210-8604.');
      }
    } catch (error) {
      setSubmitError('Network error. Please try again or call (307) 210-8604.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d1a] to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.05)_0%,_transparent_70%)]" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-white mb-6">
            {isProtocolPayment ? 'Unlock Protocol' : 'Physician Consultations'}
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto mb-4">
            {isProtocolPayment
              ? `Get instant access to ${protocolNames[protocolId!]}`
              : 'Select your service and payment method below.'}
          </p>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            💳 Medical Consultation Services Only. Medications are prescribed to and billed separately by licensed US compounding pharmacies.
          </p>
        </div>
      </section>

      {/* Tier Selection - Hide for Protocol Payments */}
      {!isProtocolPayment && (
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#0d0d1a]" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Choose Your Service Tier</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Standard Tier */}
              <div
                onClick={() => handleTierChange('standard')}
                className={`p-8 border-2 rounded-lg cursor-pointer transition-all ${
                  serviceTier === 'standard'
                    ? 'border-[#c9a84c] bg-[#c9a84c]/5'
                    : 'border-[#c9a84c]/30 bg-[#1a1a2e] hover:border-[#c9a84c]/50'
                }`}
              >
                <h3 className="text-xl font-bold text-white mb-4">Standard Tier</h3>
                <p className="text-[#c9a84c] font-semibold text-lg mb-4">Most Affordable</p>
                <ul className="text-gray-300 text-sm space-y-2 mb-6">
                  <li>✓ Initial Consultation: $100</li>
                  <li>✓ Follow-up Consultation: $100</li>
                  <li>✓ Standard Membership: $100/mo</li>
                  <li>✓ Lab Coordination: $100</li>
                </ul>
              </div>

              {/* Priority Tier */}
              <div
                onClick={() => handleTierChange('priority')}
                className={`p-8 border-2 rounded-lg cursor-pointer transition-all relative ${
                  serviceTier === 'priority'
                    ? 'border-[#c9a84c] bg-[#c9a84c]/5'
                    : 'border-[#c9a84c]/30 bg-[#1a1a2e] hover:border-[#c9a84c]/50'
                }`}
              >
                <div className="absolute -top-3 left-6">
                  <span className="px-3 py-1 bg-[#c9a84c] text-black text-xs font-bold rounded-full">
                    VIP EXPERIENCE
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4 mt-4">Priority Tier</h3>
                <p className="text-[#c9a84c] font-semibold text-lg mb-4">Extended & Premium</p>
                <ul className="text-gray-300 text-sm space-y-2 mb-6">
                  <li>✓ Priority Initial Consult (60 min): $249</li>
                  <li>✓ Priority Follow-up: $125</li>
                  <li>✓ Optimization Membership: $199/mo</li>
                  <li>✓ Premium Longevity Program: $399/mo</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Service Selection */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Select Service</h2>
            <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-lg p-6">
              <div className="space-y-3">
                {pricingTiers[serviceTier].map((service, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleServiceChange(service)}
                    className={`w-full flex justify-between items-center p-4 border rounded transition-all ${
                      selectedService.name === service.name
                        ? 'border-[#c9a84c] bg-[#c9a84c]/10'
                        : 'border-[#c9a84c]/20 bg-[#0a0a0a] hover:border-[#c9a84c]/40'
                    }`}
                  >
                    <div className="text-left">
                      <p className="text-white font-semibold">{service.name}</p>
                      <p className="text-xs text-gray-500">{service.type === 'subscription' ? 'Monthly Subscription' : 'One-Time Payment'}</p>
                    </div>
                    <p className="text-[#c9a84c] font-bold text-lg">
                      ${service.price}
                      {service.type === 'subscription' && <span className="text-xs">/mo</span>}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Payment Methods */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#0d0d1a]" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Choose Payment Method</h2>

            {/* Payment Summary */}
            <div className="bg-[#c9a84c]/10 border border-[#c9a84c]/30 rounded-lg p-6 mb-8">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Selected Service</p>
                  <p className="text-white font-semibold text-lg">{selectedService.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-sm mb-2">Amount</p>
                  <p className="text-[#c9a84c] font-bold text-2xl">
                    ${selectedService.price}
                    {selectedService.type === 'subscription' && <span className="text-sm">/month</span>}
                  </p>
                </div>
              </div>
            </div>

            {/* Card Checkout */}
            <ScrollFade>
              <form onSubmit={handleCheckout} className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-lg p-6 sm:p-8 space-y-4">
                <div className="mb-2">
                  <h3 className="font-serif text-xl font-bold text-white mb-1">Checkout</h3>
                  <p className="text-gray-400 text-sm">Enter your details to continue to secure card payment.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full name"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    required
                    autoComplete="name"
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#c9a84c]/30 rounded text-white text-sm focus:outline-none focus:border-[#c9a84c]"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    required
                    autoComplete="tel"
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#c9a84c]/30 rounded text-white text-sm focus:outline-none focus:border-[#c9a84c]"
                  />
                </div>

                <input
                  type="email"
                  placeholder="Email"
                  value={patientEmail}
                  onChange={(e) => setPatientEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#c9a84c]/30 rounded text-white text-sm focus:outline-none focus:border-[#c9a84c]"
                />

                {submitError && (
                  <div className="p-3 bg-red-900/20 border border-red-500/40 rounded text-red-300 text-sm">
                    {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!formValid || submitting}
                  className={`w-full py-4 font-semibold rounded tracking-wide transition-colors ${
                    formValid && !submitting
                      ? 'bg-[#c9a84c] text-black hover:bg-[#e0c070] cursor-pointer'
                      : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {submitting ? 'Processing...' : `Pay $${selectedService.price} by Card`}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Secure card payment. Visa, Mastercard, Amex, Discover accepted.
                </p>
              </form>
            </ScrollFade>
          </div>

          {/* Compliance Footer */}
          <div className="border-t border-[#c9a84c]/20 pt-8">
            <p className="text-xs text-gray-500 text-center mb-4">
              💬 <strong>Medical Consultation Services</strong> – Prices are for physician consultation services only.
              <br />
              Medications are prescribed to and billed separately by licensed US compounding pharmacies.
            </p>
            <p className="text-xs text-gray-500 text-center mb-4">
              All payments are secure and encrypted. Questions? Call <strong>(307) 210-8604</strong>
            </p>
            <p className="text-xs text-gray-500 text-center">
              <a href="/privacy" className="text-[#c9a84c] hover:underline">
                Privacy Policy
              </a>{' '}
              |{' '}
              <a href="/terms" className="text-[#c9a84c] hover:underline">
                Terms of Service
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default function PayPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]" />}>
      <PayPageContent />
    </Suspense>
  );
}
