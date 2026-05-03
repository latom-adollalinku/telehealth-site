import type { Metadata } from "next";
import Link from "next/link";
import ScrollFade from "../components/ScrollFade";

export const metadata: Metadata = {
  title: "Services — Weight Management, Longevity & Hormonal Health Consultation",
  description:
    "Physician-supervised wellness consultation programs: weight management, longevity consultation, and hormonal health consultation. Starting at $199/month.",
};

const services = [
  {
    id: "labs-membership",
    label: "LATOM Labs Membership",
    badge: "Best Value",
    badgeColor: "bg-[#c9a84c]",
    tagline: "Physician-curated guidance — no prescription required.",
    description:
      "The scalable entry point. Get every LATOM protocol (longevity, hormonal health, cognitive, sleep, metabolic, cardiovascular, and more), monthly new drops, physician-curated lab interpretation templates, and access to a private community. No monthly commitment — cancel anytime.",
    medications: ["Lab panel guides", "Supplement stacks", "Protocol library (17+)", "Lab interpretation templates"],
    benefits: [
      "Every current protocol ($49 value each) included",
      "New protocol drop every month",
      "Lab interpretation templates (GoodLabs, Quest, Labcorp)",
      "Private community access",
      "Direct Q&A with Dr. Abdulhakim weekly",
      "Cancel anytime — no commitment",
    ],
    whatToExpect:
      "Sign up for $29/month. Instantly unlock the full protocol library. New content drops every month. Use the lab interpretation templates to understand your own bloodwork. If you ever want to escalate to a physician-supervised clinical program, your membership price applies as credit toward your first month.",
    pricing: [
      { tier: "Monthly", price: "$29/mo", detail: "Full protocol library + monthly drops + community" },
      { tier: "Annual", price: "$290/yr", detail: "Same benefits, 2 months free ($24/mo effective)" },
    ],
  },
  {
    id: "weight-management",
    label: "Weight Management",
    badge: "Most Popular",
    badgeColor: "bg-green-600",
    tagline: "Lose weight. Keep it off. Finally.",
    description:
      "Evidence-based weight management consultation with physician oversight. These are the same programs used by top obesity medicine specialists — now available through a physician-supervised telehealth practice.",
    medications: ["Metabolic health assessment", "Body composition review", "Appetite regulation consultation", "Lifestyle and nutrition planning"],
    benefits: [
      "Significant body weight reduction in clinical programs",
      "Reduction in appetite and cravings",
      "Improved blood sugar regulation",
      "Reduced cardiovascular risk markers",
      "Ongoing physician monitoring and dose management",
    ],
    whatToExpect:
      "Start with a free consultation. We review your health history and goals. A physician evaluates your candidacy and designs a personalized program. If a prescription is appropriate, it routes through standard pharmacy channels. Monthly check-ins to review progress and adjust the plan.",
    pricing: [
      { tier: "Starter", price: "$299/mo", detail: "Weight management consultation + monthly check-in" },
      { tier: "Advanced", price: "$349/mo", detail: "Weight management consultation + monthly check-in + labs" },
      { tier: "Elite", price: "$399/mo", detail: "Comprehensive metabolic program + monthly check-in + full labs" },
    ],
  },
  {
    id: "longevity-consultation",
    label: "Longevity Consultation",
    badge: "Physician-Designed",
    badgeColor: "bg-blue-600",
    tagline: "Repair, recover, and perform at a higher level.",
    description:
      "Evidence-based longevity consultation designed around your health goals. Our physician-supervised wellness programs are individualized based on your lab results and clinical history.",
    medications: ["Tissue recovery programs", "Sleep and recovery optimization", "Cellular energy support", "Growth factor consultation", "Anti-inflammatory wellness protocols"],
    benefits: [
      "Accelerated tissue and joint recovery",
      "Improved sleep quality and recovery",
      "Cellular energy and mitochondrial support",
      "Evidence-based longevity wellness programs",
      "Anti-inflammatory and gut health support",
    ],
    whatToExpect:
      "After your consultation, the physician designs a custom wellness protocol based on your goals — whether that is injury recovery, sleep optimization, or longevity. If a prescription is clinically appropriate, it is fulfilled via standard pharmacy channels. You receive a complete written protocol and guidance.",
    pricing: [
      { tier: "Recovery", price: "$199/mo", detail: "Targeted recovery consultation + physician protocol" },
      { tier: "Performance", price: "$279/mo", detail: "Comprehensive wellness protocol + cellular support" },
      { tier: "Longevity", price: "$349/mo", detail: "Full longevity consultation + quarterly bloodwork" },
    ],
  },
  {
    id: "hormone-consultation",
    label: "Hormonal Health Consultation",
    badge: "Full Lab Panel",
    badgeColor: "bg-purple-600",
    tagline: "Feel like yourself again.",
    description:
      "Hormonal imbalance affects millions — reduced energy, thyroid dysfunction, estrogen decline, adrenal fatigue. We run comprehensive labs and design evidence-based wellness programs that restore how you should feel.",
    medications: ["Full hormone panel review", "Reproductive health markers", "Adrenal and stress markers", "Thyroid function assessment", "Metabolic marker analysis"],
    benefits: [
      "Restored energy, libido, and motivation",
      "Improved muscle mass and body composition",
      "Better mood, focus, and cognitive clarity",
      "Reduced fat accumulation (especially visceral)",
      "Comprehensive labs before and after program",
    ],
    whatToExpect:
      "We start with a full hormone panel including key reproductive and stress markers. A physician reviews your results and designs a personalized consultation program. Follow-up labs at 6 and 12 weeks to assess progress. Monthly check-ins throughout. If medications are clinically appropriate, they route through standard pharmacy channels.",
    pricing: [
      { tier: "Consultation", price: "$349/mo", detail: "Hormonal health consultation + lab panel + quarterly follow-up" },
      { tier: "Women's Health", price: "$349/mo", detail: "Women's hormonal health consultation + full panel" },
      { tier: "Full Program", price: "$449/mo", detail: "Comprehensive hormonal wellness program + monthly labs" },
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
            All programs are physician-supervised, evidence-based,
            and individually tailored to your health history and goals.
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
                      What We Address
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
