import type { Metadata } from "next";
import Link from "next/link";
import ScrollFade from "../components/ScrollFade";

export const metadata: Metadata = {
  title: "Services — Weight Management, Peptides & Hormone Therapy",
  description:
    "Physician-supervised weight management with GLP-1s, peptide therapy with BPC-157 and NAD+, and hormone optimization with TRT and HRT. Starting at $199/month.",
};

const services = [
  {
    id: "weight-management",
    label: "Weight Management",
    badge: "Most Popular",
    badgeColor: "bg-green-600",
    tagline: "Lose weight. Keep it off. Finally.",
    description:
      "GLP-1 receptor agonists have transformed weight management. These are the same medications prescribed by top obesity medicine specialists — now available through a physician-supervised telehealth practice.",
    medications: ["Semaglutide (Ozempic/Wegovy)", "Tirzepatide (Mounjaro/Zepbound)"],
    benefits: [
      "Average 15-20% body weight loss in clinical studies",
      "Reduction in appetite and cravings",
      "Improved blood sugar regulation",
      "Reduced cardiovascular risk markers",
      "Weekly subcutaneous injection (self-administered)",
    ],
    whatToExpect:
      "Start with a free consultation. We review your health history and goals. If appropriate, a physician prescribes your medication. Prescriptions are sent to your pharmacy of choice. You check in monthly via video and your dose is adjusted as needed.",
    pricing: [
      { tier: "Starter", price: "$299/mo", detail: "GLP-1 medication + monthly check-in" },
      { tier: "Advanced", price: "$349/mo", detail: "GLP-1 medication + monthly check-in + labs" },
      { tier: "Elite", price: "$399/mo", detail: "Dual-agonist GLP-1 + monthly check-in + full labs" },
    ],
  },
  {
    id: "peptide-therapy",
    label: "Peptide Therapy",
    badge: "Physician-Designed",
    badgeColor: "bg-blue-600",
    tagline: "Repair, recover, and perform at a higher level.",
    description:
      "Peptides are short chains of amino acids that signal the body to perform specific functions — from tissue repair to cellular energy to immune modulation. Our protocols are individualized based on your health goals.",
    medications: ["BPC-157", "TB-500 (Thymosin Beta-4)", "NAD+", "Sermorelin", "CJC-1295 / Ipamorelin"],
    benefits: [
      "Accelerated tissue and joint repair",
      "Improved sleep quality and recovery",
      "Cellular energy and mitochondrial support (NAD+)",
      "Increased growth hormone output (peptide stacks)",
      "Anti-inflammatory and gut healing effects",
    ],
    whatToExpect:
      "After your consultation, the physician designs a custom peptide protocol based on your goals — whether that is injury recovery, sleep optimization, or longevity. Peptides are compounded and shipped directly. You receive a complete injection guide and dosing schedule.",
    pricing: [
      { tier: "Recovery", price: "$199/mo", detail: "BPC-157 or TB-500 solo protocol" },
      { tier: "Performance", price: "$279/mo", detail: "Stacked peptide protocol + NAD+" },
      { tier: "Longevity", price: "$349/mo", detail: "Full longevity stack + quarterly bloodwork" },
    ],
  },
  {
    id: "hormone-optimization",
    label: "Hormone Optimization",
    badge: "Full Lab Panel",
    badgeColor: "bg-purple-600",
    tagline: "Feel like yourself again.",
    description:
      "Hormonal imbalance affects millions — low testosterone, thyroid dysfunction, estrogen decline, adrenal fatigue. We run comprehensive labs and design replacement or optimization protocols that restore how you should feel.",
    medications: ["Testosterone Cypionate (TRT)", "Estradiol / Progesterone (HRT)", "DHEA", "Anastrozole (aromatase inhibitor)", "Thyroid support (T3/T4)"],
    benefits: [
      "Restored energy, libido, and motivation",
      "Improved muscle mass and body composition",
      "Better mood, focus, and cognitive clarity",
      "Reduced fat accumulation (especially visceral)",
      "Comprehensive labs before and after protocol",
    ],
    whatToExpect:
      "We start with a full hormone panel — testosterone total/free, estradiol, DHEA-S, thyroid, and metabolic markers. A physician reviews your results and designs a personalized protocol. Follow-up labs at 6 and 12 weeks to optimize levels. Monthly check-ins throughout.",
    pricing: [
      { tier: "TRT Basic", price: "$349/mo", detail: "Testosterone + lab panel + quarterly follow-up" },
      { tier: "HRT", price: "$349/mo", detail: "Estradiol/Progesterone + full hormone panel" },
      { tier: "Full Optimization", price: "$449/mo", detail: "Complete hormone protocol + monthly labs" },
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d1a] to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.05)_0%,_transparent_70%)]" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/5 mb-8">
            <span className="text-[#c9a84c] text-xs tracking-widest uppercase font-medium">
              Our Programs
            </span>
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-white mb-6">
            What We Treat
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            All protocols are physician-supervised, use FDA-approved medications,
            and are individually tailored to your health history and goals.
          </p>
        </div>
      </section>

      {/* Services */}
      {services.map((service, idx) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-24 ${idx % 2 === 1 ? 'bg-[#0d0d1a]/60' : ''}`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollFade>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                {/* Left: Info */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-3 py-1 ${service.badgeColor} text-white text-xs font-bold rounded-full`}>
                      {service.badge}
                    </span>
                  </div>
                  <h2 className="font-serif text-4xl font-bold text-white mb-2">
                    {service.label}
                  </h2>
                  <p className="text-[#c9a84c] text-lg font-medium mb-6">{service.tagline}</p>
                  <p className="text-gray-300 text-base leading-relaxed mb-8">
                    {service.description}
                  </p>

                  <div className="mb-8">
                    <h3 className="text-white font-semibold text-sm tracking-widest uppercase mb-4">
                      Medications Available
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {service.medications.map((med, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-[#1a1a2e] border border-[#2a2a4e] text-gray-300 text-sm rounded-full"
                        >
                          {med}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-white font-semibold text-sm tracking-widest uppercase mb-4">
                      Benefits
                    </h3>
                    <ul className="space-y-2">
                      {service.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                          <svg className="w-4 h-4 text-[#c9a84c] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-5 bg-[#1a1a2e]/60 border border-[#2a2a4e] rounded-lg">
                    <h3 className="text-white font-semibold text-sm tracking-widest uppercase mb-3">
                      What to Expect
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{service.whatToExpect}</p>
                  </div>
                </div>

                {/* Right: Pricing */}
                <div className="space-y-4">
                  <h3 className="text-white font-semibold text-sm tracking-widest uppercase mb-6">
                    Pricing
                  </h3>
                  {service.pricing.map((tier, i) => (
                    <div
                      key={i}
                      className={`p-6 rounded-xl border transition-all duration-200 ${
                        i === 0
                          ? 'bg-gradient-to-br from-[#1a1a2e] to-[#13132a] border-[#c9a84c]/40'
                          : 'bg-[#1a1a2e] border-[#2a2a4e] hover:border-[#c9a84c]/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-semibold">{tier.tier}</span>
                        <span className="font-serif text-2xl font-bold text-[#c9a84c]">{tier.price}</span>
                      </div>
                      <p className="text-gray-400 text-sm">{tier.detail}</p>
                    </div>
                  ))}
                  <div className="pt-4 space-y-2">
                    <Link
                      href="/book"
                      className="block w-full text-center px-6 py-4 bg-[#c9a84c] text-black font-semibold rounded tracking-wide hover:bg-[#e0c070] transition-colors"
                    >
                      Book Consultation
                    </Link>
                    <Link
                      href="/pay"
                      className="block w-full text-center px-6 py-3 border border-[#c9a84c] text-[#c9a84c] font-semibold rounded tracking-wide hover:bg-[#c9a84c]/10 transition-colors"
                    >
                      Pay for Service
                    </Link>
                    <p className="text-center text-gray-600 text-xs mt-3">
                      No commitment required.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollFade>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-20 border-t border-[#c9a84c]/10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <ScrollFade>
            <h2 className="font-serif text-3xl font-bold text-white mb-4">
              Not Sure Where to Start?
            </h2>
            <p className="text-gray-400 mb-8">
              Book a free consultation and a physician will help you determine which protocol is right for your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book"
                className="inline-block px-10 py-4 bg-[#c9a84c] text-black font-bold rounded tracking-wide hover:bg-[#e0c070] transition-colors"
              >
                Book Consultation
              </Link>
              <Link
                href="/pay"
                className="inline-block px-10 py-4 border border-[#c9a84c] text-[#c9a84c] font-bold rounded tracking-wide hover:bg-[#c9a84c]/10 transition-colors"
              >
                Pay Now
              </Link>
            </div>
          </ScrollFade>
        </div>
      </section>
    </>
  );
}
