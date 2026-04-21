'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ScrollFade from '../components/ScrollFade';

type PaymentMethod = 'helcim' | 'zelle' | 'venmo' | 'paypal';
type ServiceTier = 'standard' | 'priority';

const protocolNames: Record<string, string> = {
  cardiovascular: 'Cardiovascular Optimization Protocol',
  metabolic: 'Metabolic Enhancement Protocol',
  'hormone-optimization': 'Hormone Optimization Protocol',
  longevity: 'Longevity Protocol',
  'surgical-preop': 'Surgical Preoperative Optimization Protocol',
  cognitive: 'Cognitive & Study Protocol',
  sleep: 'Sleep & Recovery Protocol',
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
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [confirmationName, setConfirmationName] = useState('');
  const [confirmationEmail, setConfirmationEmail] = useState('');
  const [confirmationPhone, setConfirmationPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
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
    setPaymentMethod(null);
  };

  const handleServiceChange = (service: typeof pricingTiers.standard[0]) => {
    setSelectedService(service);
  };

  const handlePaymentConfirmation = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/payment/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethod,
          serviceName: selectedService.name,
          amount: selectedService.price,
          patientName: confirmationName,
          patientEmail: confirmationEmail,
          patientPhone: confirmationPhone,
          protocolId: isProtocolPayment ? protocolId : null,
        }),
      });

      if (res.ok) {
        const successUrl = isProtocolPayment
          ? `/pay/success?protocol=${protocolId}`
          : '/pay/success';
        router.push(successUrl);
      }
    } catch (error) {
      console.error('Payment confirmation error:', error);
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

            {/* Payment Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Helcim */}
              <ScrollFade>
                <button
                  onClick={() => setPaymentMethod('helcim')}
                  className={`p-6 border-2 rounded-lg transition-all text-left ${
                    paymentMethod === 'helcim'
                      ? 'border-[#c9a84c] bg-[#c9a84c]/5'
                      : 'border-[#c9a84c]/20 bg-[#1a1a2e] hover:border-[#c9a84c]/50'
                  }`}
                >
                  <h3 className="text-xl font-bold text-white mb-2">💳 Card Payment</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Visa, Mastercard, Amex via Helcim
                  </p>
                  {paymentMethod === 'helcim' && (
                    <div className="mt-4 p-4 bg-[#0a0a0a] border border-[#c9a84c]/20 rounded text-gray-300 text-sm">
                      <p className="font-semibold text-[#c9a84c] mb-2">Processing Secure Payment...</p>
                      <p>Card payment form will be embedded here. Contact support to process payment manually at (678) 404-0730</p>
                    </div>
                  )}
                </button>
              </ScrollFade>

              {/* Zelle */}
              <ScrollFade>
                <button
                  onClick={() => setPaymentMethod('zelle')}
                  className={`p-6 border-2 rounded-lg transition-all text-left ${
                    paymentMethod === 'zelle'
                      ? 'border-[#c9a84c] bg-[#c9a84c]/5'
                      : 'border-[#c9a84c]/20 bg-[#1a1a2e] hover:border-[#c9a84c]/50'
                  }`}
                >
                  <h3 className="text-xl font-bold text-white mb-2">🏦 Zelle</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Bank-to-bank transfer. Zero processing fees.
                  </p>
                  {paymentMethod === 'zelle' && (
                    <form onSubmit={handlePaymentConfirmation} className="mt-4 p-4 bg-[#0a0a0a] border border-[#c9a84c]/20 rounded text-gray-300 text-sm space-y-3">
                      <p className="font-semibold text-[#c9a84c] mb-3">Send via Zelle to:</p>
                      <p className="mb-3">
                        <strong>Email:</strong> {process.env.NEXT_PUBLIC_ZELLE_EMAIL || 'pay@latomwellness.com'}
                      </p>
                      <p className="mb-3">
                        <strong>Amount:</strong> ${selectedService.price}
                      </p>
                      <p className="mb-3">
                        <strong>Memo:</strong> {selectedService.name} - Your Name
                      </p>
                      <div className="border-t border-[#c9a84c]/20 pt-3 mt-4">
                        <p className="text-xs text-gray-400 mb-3">Once you've sent the payment, confirm below:</p>
                        <input
                          type="text"
                          placeholder="Your name"
                          value={confirmationName}
                          onChange={(e) => setConfirmationName(e.target.value)}
                          required
                          className="w-full px-3 py-2 mb-2 bg-[#1a1a2e] border border-[#c9a84c]/30 rounded text-white text-xs focus:outline-none focus:border-[#c9a84c]"
                        />
                        <input
                          type="email"
                          placeholder="Email"
                          value={confirmationEmail}
                          onChange={(e) => setConfirmationEmail(e.target.value)}
                          required
                          className="w-full px-3 py-2 mb-2 bg-[#1a1a2e] border border-[#c9a84c]/30 rounded text-white text-xs focus:outline-none focus:border-[#c9a84c]"
                        />
                        <input
                          type="tel"
                          placeholder="Phone"
                          value={confirmationPhone}
                          onChange={(e) => setConfirmationPhone(e.target.value)}
                          required
                          className="w-full px-3 py-2 mb-3 bg-[#1a1a2e] border border-[#c9a84c]/30 rounded text-white text-xs focus:outline-none focus:border-[#c9a84c]"
                        />
                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-full py-2 bg-[#c9a84c] text-black font-semibold text-sm rounded hover:bg-[#e0c070] disabled:opacity-50 transition-colors"
                        >
                          {submitting ? 'Confirming...' : 'I\'ve Sent the Payment'}
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-4">
                        You'll receive a confirmation email within 24 hours of payment.
                      </p>
                    </form>
                  )}
                </button>
              </ScrollFade>

              {/* Venmo */}
              <ScrollFade>
                <button
                  onClick={() => setPaymentMethod('venmo')}
                  className={`p-6 border-2 rounded-lg transition-all text-left ${
                    paymentMethod === 'venmo'
                      ? 'border-[#c9a84c] bg-[#c9a84c]/5'
                      : 'border-[#c9a84c]/20 bg-[#1a1a2e] hover:border-[#c9a84c]/50'
                  }`}
                >
                  <h3 className="text-xl font-bold text-white mb-2">📱 Venmo</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Quick mobile payment from your phone.
                  </p>
                  {paymentMethod === 'venmo' && (
                    <form onSubmit={handlePaymentConfirmation} className="mt-4 p-4 bg-[#0a0a0a] border border-[#c9a84c]/20 rounded text-gray-300 text-sm space-y-3">
                      <p className="font-semibold text-[#c9a84c] mb-3">Pay via Venmo:</p>
                      <p className="mb-3">
                        <strong>Username:</strong> @{process.env.NEXT_PUBLIC_VENMO_USERNAME || 'latom-wellness'}
                      </p>
                      <p className="mb-3">
                        <strong>Amount:</strong> ${selectedService.price}
                      </p>
                      <p className="text-xs text-gray-400 mb-3">Include your name and service type in the note.</p>
                      <div className="border-t border-[#c9a84c]/20 pt-3 mt-4">
                        <p className="text-xs text-gray-400 mb-3">Once you've sent the payment, confirm below:</p>
                        <input
                          type="text"
                          placeholder="Your name"
                          value={confirmationName}
                          onChange={(e) => setConfirmationName(e.target.value)}
                          required
                          className="w-full px-3 py-2 mb-2 bg-[#1a1a2e] border border-[#c9a84c]/30 rounded text-white text-xs focus:outline-none focus:border-[#c9a84c]"
                        />
                        <input
                          type="email"
                          placeholder="Email"
                          value={confirmationEmail}
                          onChange={(e) => setConfirmationEmail(e.target.value)}
                          required
                          className="w-full px-3 py-2 mb-2 bg-[#1a1a2e] border border-[#c9a84c]/30 rounded text-white text-xs focus:outline-none focus:border-[#c9a84c]"
                        />
                        <input
                          type="tel"
                          placeholder="Phone"
                          value={confirmationPhone}
                          onChange={(e) => setConfirmationPhone(e.target.value)}
                          required
                          className="w-full px-3 py-2 mb-3 bg-[#1a1a2e] border border-[#c9a84c]/30 rounded text-white text-xs focus:outline-none focus:border-[#c9a84c]"
                        />
                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-full py-2 bg-[#c9a84c] text-black font-semibold text-sm rounded hover:bg-[#e0c070] disabled:opacity-50 transition-colors"
                        >
                          {submitting ? 'Confirming...' : 'I\'ve Sent the Payment'}
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-4">
                        Confirmation within 24 hours.
                      </p>
                    </form>
                  )}
                </button>
              </ScrollFade>

              {/* PayPal */}
              <ScrollFade>
                <button
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-6 border-2 rounded-lg transition-all text-left ${
                    paymentMethod === 'paypal'
                      ? 'border-[#c9a84c] bg-[#c9a84c]/5'
                      : 'border-[#c9a84c]/20 bg-[#1a1a2e] hover:border-[#c9a84c]/50'
                  }`}
                >
                  <h3 className="text-xl font-bold text-white mb-2">🔵 PayPal</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    PayPal balance, card, or bank account.
                  </p>
                  {paymentMethod === 'paypal' && (
                    <div className="mt-4 p-4 bg-[#0a0a0a] border border-[#c9a84c]/20 rounded text-gray-300 text-sm">
                      <p className="font-semibold text-[#c9a84c] mb-2">PayPal Checkout</p>
                      <p className="mb-4">
                        Click below to pay via PayPal (sandbox mode - contact support for live payments)
                      </p>
                      <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold transition-colors">
                        Pay ${selectedService.price} with PayPal
                      </button>
                    </div>
                  )}
                </button>
              </ScrollFade>
            </div>
          </div>

          {/* Compliance Footer */}
          <div className="border-t border-[#c9a84c]/20 pt-8">
            <p className="text-xs text-gray-500 text-center mb-4">
              💬 <strong>Medical Consultation Services</strong> – Prices are for physician consultation services only.
              <br />
              Medications are prescribed to and billed separately by licensed US compounding pharmacies.
            </p>
            <p className="text-xs text-gray-500 text-center mb-4">
              All payments are secure and encrypted. Questions? Call <strong>(678) 404-0730</strong>
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
