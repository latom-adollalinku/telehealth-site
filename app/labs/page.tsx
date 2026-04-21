import type { Metadata } from "next";
import Link from "next/link";
import ScrollFade from "../components/ScrollFade";

export const metadata: Metadata = {
  title: "Lab Services | Affordable Blood Work & Testing",
  description:
    "Comprehensive lab panels starting at $79/month. Quest, Labcorp, and at-home testing options. Physician interpretation included with all LATOM Wellness memberships.",
};

const labPartners = [
  {
    name: "Rythm Health",
    badge: "Recommended",
    badgeColor: "bg-green-600",
    description:
      "Comprehensive monthly blood panels with at-home finger-prick collection. FDA-cleared device with 95-99% accuracy compared to traditional blood draws. Results in days, not weeks.",
    price: "$79/month",
    priceNote: "Included in Optimization & Premium memberships",
    features: [
      "Hormone panel (testosterone, estradiol, DHEA-S, cortisol)",
      "Metabolic markers (HbA1c, fasting glucose, insulin)",
      "Heart health (lipid panel, hs-CRP, homocysteine)",
      "Thyroid function (TSH, T3, T4)",
      "At-home collection — no lab visit needed",
      "Cycle-specific reference ranges for women",
    ],
    cta: "Order Through Rythm",
    ctaLink: "https://rythmhealth.com/home",
    ideal: "Monthly monitoring for membership patients",
  },
  {
    name: "GoodLabs",
    badge: "Most Affordable",
    badgeColor: "bg-blue-600",
    description:
      "Cash-pay lab testing at deeply discounted prices through Quest and Labcorp. Free labs for blood donors. No insurance needed, no hidden fees.",
    price: "From $0–$99",
    priceNote: "20% off with our referral link",
    features: [
      "Uses Quest Diagnostics and Labcorp (same labs your doctor uses)",
      "CLIA-certified, CAP-accredited results",
      "Free comprehensive panel with blood donation",
      "Cash-pay pricing — no insurance required",
      "Walk into any Quest or Labcorp location",
      "Results available online within days",
    ],
    cta: "Get 20% Off with Our Code",
    ctaLink: "https://app.goodlabs.com/login?referralCode=PQ5PUU&mode=signup&utm_source=referral&utm_medium=referral&utm_campaign=referrals&utm_content=generic",
    ideal: "Baseline labs and one-time panels",
  },
  {
    name: "Quest Diagnostics",
    badge: "Gold Standard",
    badgeColor: "bg-amber-600",
    description:
      "The largest clinical lab network in the US. 2,000+ patient service centers nationwide. Your physician orders labs through our EHR — you walk in, get drawn, results flow back to us.",
    price: "Varies by panel",
    priceNote: "Ordered through your consultation",
    features: [
      "2,000+ locations nationwide",
      "Physician-ordered through LATOM Wellness EHR",
      "Insurance or cash-pay accepted",
      "Comprehensive test menu (5,000+ tests)",
      "Results integrated into your medical record",
      "Same-day or next-day appointments available",
    ],
    cta: "Find a Quest Location",
    ctaLink: "https://www.questdiagnostics.com/locations",
    ideal: "Physician-ordered panels during treatment",
  },
];

const panels = [
  {
    name: "Baseline Wellness Panel",
    tests: "CBC, CMP, Lipid Panel, HbA1c, TSH, Vitamin D, B12",
    when: "Before starting any protocol",
    cost: "$79–$150",
  },
  {
    name: "Hormone Panel",
    tests: "Total/Free Testosterone, Estradiol, DHEA-S, SHBG, Cortisol, Prolactin, LH/FSH",
    when: "Before TRT/HRT and every 6–12 weeks on protocol",
    cost: "$99–$200",
  },
  {
    name: "Metabolic & Weight Loss Panel",
    tests: "HbA1c, Fasting Insulin, Glucose, Lipid Panel, CRP, Liver Panel, Thyroid",
    when: "Before GLP-1 therapy and every 8 weeks",
    cost: "$79–$150",
  },
  {
    name: "Surgical Preop Panel",
    tests: "CBC, CMP, Coagulation (PT/INR), Type & Screen, HbA1c, Lipid Panel, Vitamin D",
    when: "8 weeks before surgery and 2 weeks before",
    cost: "$99–$175",
  },
  {
    name: "Longevity & Optimization Panel",
    tests: "All baseline + IGF-1, DHEA-S, hs-CRP, Homocysteine, Insulin, ApoB, Lp(a)",
    when: "Quarterly for longevity membership patients",
    cost: "$150–$250",
  },
];

export default function LabsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d1a] to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.05)_0%,_transparent_70%)]" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/5 mb-8">
            <span className="text-[#c9a84c] text-xs tracking-widest uppercase font-medium">
              Lab Services
            </span>
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-white mb-6">
            Affordable Lab Testing
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Every LATOM Wellness protocol starts with labs. We partner with trusted lab providers
            to give you comprehensive testing at a fraction of typical costs — no insurance required.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-20">
              {[
                {
                  step: "01",
                  title: "Order Your Labs",
                  detail: "Choose a panel below or your physician orders specific tests during your consultation.",
                },
                {
                  step: "02",
                  title: "Get Tested",
                  detail: "Walk into any Quest/Labcorp location or use an at-home collection kit. No appointment needed for most panels.",
                },
                {
                  step: "03",
                  title: "Physician Review",
                  detail: "Your physician reviews results, explains what they mean, and adjusts your protocol accordingly.",
                },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-center justify-center mb-4">
                    <span className="text-[#c9a84c] font-bold text-sm">{item.step}</span>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.detail}</p>
                </div>
              ))}
            </div>
          </ScrollFade>
        </div>
      </section>

      {/* Lab Partners */}
      <section className="py-16 bg-[#0d0d1a]/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade>
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold text-white mb-4">
                Our Lab Partners
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Choose the option that fits your needs. All results are reviewed by your LATOM Wellness physician.
              </p>
            </div>
          </ScrollFade>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {labPartners.map((partner, i) => (
              <ScrollFade key={i} delay={i * 100}>
                <div className="h-full flex flex-col bg-[#1a1a2e] border border-[#2a2a4e] rounded-xl p-8 hover:border-[#c9a84c]/40 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 ${partner.badgeColor} text-white text-xs font-bold rounded-full`}>
                      {partner.badge}
                    </span>
                    <span className="font-serif text-2xl font-bold text-[#c9a84c]">{partner.price}</span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-white mb-1">{partner.name}</h3>
                  <p className="text-[#c9a84c] text-xs mb-4">{partner.priceNote}</p>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">{partner.description}</p>

                  <ul className="space-y-2 mb-6 flex-1">
                    {partner.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-300">
                        <svg className="w-4 h-4 text-[#c9a84c] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <p className="text-xs text-gray-500 mb-4">Best for: {partner.ideal}</p>

                  <a
                    href={partner.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block w-full text-center px-6 py-3 font-semibold rounded tracking-wide transition-colors ${
                      i === 0
                        ? 'bg-[#c9a84c] text-black hover:bg-[#e0c070]'
                        : 'border border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c] hover:text-black'
                    }`}
                  >
                    {partner.cta}
                  </a>
                </div>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Panels */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade>
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold text-white mb-4">
                Recommended Panels
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Not sure what to order? Here are the panels we recommend based on your protocol.
              </p>
            </div>
          </ScrollFade>

          <div className="space-y-4">
            {panels.map((panel, i) => (
              <ScrollFade key={i} delay={i * 50}>
                <div className="bg-[#1a1a2e] border border-[#2a2a4e] rounded-xl p-6 hover:border-[#c9a84c]/30 transition-all duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-lg mb-1">{panel.name}</h3>
                      <p className="text-gray-400 text-sm mb-2">{panel.tests}</p>
                      <p className="text-gray-500 text-xs">When: {panel.when}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="font-serif text-xl font-bold text-[#c9a84c]">{panel.cost}</span>
                      <p className="text-gray-500 text-xs">estimated cost</p>
                    </div>
                  </div>
                </div>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* Lab Coordination Service */}
      <section className="py-16 bg-[#0d0d1a]/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade>
            <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-lg p-8 sm:p-12 text-center">
              <p className="text-[#c9a84c] text-xs tracking-widest uppercase font-medium mb-4">
                Need Help With Labs?
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
                Lab Coordination Service
              </h2>
              <p className="text-gray-300 text-base max-w-2xl mx-auto mb-4">
                Not sure which labs to order? Our physician will review your health goals,
                order the right panels, and provide a detailed interpretation of your results
                with actionable next steps.
              </p>
              <p className="font-serif text-3xl font-bold text-[#c9a84c] mb-6">$49.99</p>
              <p className="text-gray-400 text-sm mb-8">
                Includes: lab selection, ordering, result interpretation, and protocol recommendations.
                Lab draw fees are separate and paid directly to the lab provider.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/book"
                  className="px-8 py-4 bg-[#c9a84c] text-black font-semibold rounded tracking-wide hover:bg-[#e0c070] transition-colors"
                >
                  Book Lab Coordination
                </Link>
                <Link
                  href="/pay"
                  className="px-8 py-4 border border-[#c9a84c] text-[#c9a84c] font-semibold rounded tracking-wide hover:bg-[#c9a84c] hover:text-black transition-colors"
                >
                  Pay for Lab Review
                </Link>
              </div>
              <p className="text-xs text-gray-500 mt-6">
                Lab coordination is included at no extra cost with Optimization and Premium memberships.
              </p>
              <div className="mt-8 pt-6 border-t border-[#2a2a4e]">
                <p className="text-gray-400 text-sm mb-3">Have elevated Lp(a), ApoB, or hs-CRP?</p>
                <Link
                  href="/protocols/cardiovascular"
                  className="inline-flex items-center gap-2 text-[#c9a84c] font-semibold text-sm hover:gap-3 transition-all"
                >
                  View Cardiovascular Optimization Protocol
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </ScrollFade>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade>
            <h2 className="font-serif text-3xl font-bold text-white mb-8 text-center">
              Lab FAQ
            </h2>
          </ScrollFade>
          <div className="space-y-4">
            {[
              {
                q: "Do I need insurance for lab work?",
                a: "No. All our lab partners offer cash-pay pricing. Many panels cost less out-of-pocket than your insurance copay.",
              },
              {
                q: "Can I use my own lab results?",
                a: "Yes. If you have comprehensive labs from the past 90 days, upload them during your consultation. Your physician will review them at no extra charge.",
              },
              {
                q: "How often do I need labs?",
                a: "Baseline labs before starting any protocol. Follow-up labs at 6-12 weeks depending on your program. Ongoing monitoring quarterly for memberships.",
              },
              {
                q: "What if my results are abnormal?",
                a: "Your physician reviews every result personally. If anything is out of range, we'll discuss it during your consultation and adjust your protocol or refer you to a specialist if needed.",
              },
              {
                q: "Are at-home labs as accurate as in-person draws?",
                a: "Rythm Health's FDA-cleared collection device shows 95-99% concordance with traditional venipuncture. For most panels, at-home collection is clinically equivalent.",
              },
            ].map((item, i) => (
              <ScrollFade key={i} delay={i * 50}>
                <div className="bg-[#1a1a2e] border border-[#2a2a4e] rounded-lg p-6">
                  <h3 className="text-white font-semibold mb-2">{item.q}</h3>
                  <p className="text-gray-400 text-sm">{item.a}</p>
                </div>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
