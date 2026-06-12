import type { Metadata } from "next";
import Link from "next/link";
import ScrollFade from "../components/ScrollFade";

export const metadata: Metadata = {
  title: "About Dr. Abdul, MD - LATOM Wellness",
  description:
    "Dr. Abdul founded LATOM Wellness to deliver evidence-based longevity medicine directly to patients.",
};

const approach = [
  {
    title: "Physician-First",
    detail:
      "Every patient is seen by Dr. Abdul directly. No PA mid-levels making clinical decisions without oversight.",
  },
  {
    title: "Evidence-Based",
    detail:
      "Every protocol is grounded in peer-reviewed clinical literature. We do not chase trends, we follow data.",
  },
  {
    title: "Individualized",
    detail:
      "No two protocols are the same. Labs, history, and goals determine every recommendation.",
  },
  {
    title: "Transparent",
    detail:
      "Clear pricing, no hidden fees, and honest expectations. If a treatment is not right for you, we will tell you.",
  },
];

const concerns = [
  {
    title: "Worried about cancer",
    detail:
      "Family history of cancer. A symptom you cannot shake. The annual physical that does not include the labs you actually want. We coordinate standard screening (colonoscopy, mammogram, PSA), order tumor markers and risk markers, and connect you with multi-cancer early detection options when appropriate.",
  },
  {
    title: "Persistent gut symptoms",
    detail:
      "Bloating, brain fog, fatigue, food sensitivities that nobody has explained. We run comprehensive stool panels (GI-MAP, parasitology), celiac and inflammatory markers, and SIBO testing. Then we build a protocol around what we actually find.",
  },
  {
    title: "Suspected mold exposure",
    detail:
      "Lived or worked in a water-damaged building. Symptoms that mainstream medicine cannot place. We order urinary mycotoxin panels and organic acids testing through our partner labs and walk you through environmental remediation when indicated.",
  },
  {
    title: "Heavy metal concerns",
    detail:
      "Years of fish consumption, amalgam fillings, occupational exposure, or old plumbing. We order hair mineral analysis, blood metals, and provoked urine testing when warranted and refer for chelation protocols when indicated.",
  },
  {
    title: "Possible Lyme or tick-borne illness",
    detail:
      "A tick bite years ago that was never tested. Chronic joint pain and fatigue that nobody can explain. Standard Lyme testing is often inadequate. We order IGeneX testing for Lyme and co-infections (Bartonella, Babesia, others) when clinical suspicion is real.",
  },
  {
    title: "Hormones and energy",
    detail:
      "Tired all the time. Brain fog. Weight gain despite the same diet. Low libido. Mood changes. We run comprehensive hormone panels (DUTCH, sensitive sex hormones, full thyroid) and build a protocol with lifestyle, supplements, and prescription support when needed.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d1a] to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.05)_0%,_transparent_70%)]" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/5 mb-8">
            <span className="text-[#c9a84c] text-xs tracking-widest uppercase font-medium">
              About
            </span>
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-white mb-6">
            Dr. Abdul, MD
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Founder of LATOM Wellness. Built to make physician-supervised longevity medicine accessible to everyone who deserves it.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <ScrollFade>
              <div>
                <p className="text-[#c9a84c] text-sm tracking-widest uppercase font-medium mb-4">
                  Why He Built This
                </p>
                <h2 className="font-serif text-4xl font-bold text-white mb-6">
                  Medicine Should Work for Patients
                </h2>
                <div className="space-y-4 text-gray-300 text-base leading-relaxed">
                  <p>
                    Dr. Abdul saw a consistent pattern in clinical practice:
                    patients struggling with weight, hormonal imbalance, and declining energy who were
                    offered nothing beyond generic advice and referrals.
                  </p>
                  <p>
                    The evidence-based health optimization protocols existed.
                    The evidence was clear. But access was fragmented, expensive, and often gated
                    behind insurance gatekeeping that prioritized cost over outcomes.
                  </p>
                  <p>
                    LATOM Wellness was built to close that gap. Direct physician access. Evidence-based
                    protocols. FDA-approved medications prescribed and managed by a real physician.
                    No middlemen, no wait lists, no gatekeeping.
                  </p>
                  <p className="text-white font-medium">
                    Every patient deserves the same level of care that physicians have access to themselves.
                  </p>
                </div>
              </div>
            </ScrollFade>

            <ScrollFade delay={150}>
              <div>
                <div className="p-6 bg-[#1a1a2e] border border-[#2a2a4e] rounded-xl">
                  <h3 className="text-white font-semibold mb-4">Contact</h3>
                  <ul className="space-y-3">
                    <li>
                      <a
                        href="mailto:info@latomwellness.com"
                        className="flex gap-3 text-sm text-gray-300 hover:text-[#c9a84c] transition-colors"
                      >
                        <span className="text-[#c9a84c] font-medium">Email</span>
                        info@latomwellness.com
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </ScrollFade>
          </div>
        </div>
      </section>

      {/* Concerns We Hear */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade>
            <div className="text-center mb-16">
              <p className="text-[#c9a84c] text-sm tracking-widest uppercase font-medium mb-3">
                Why People Come to Us
              </p>
              <h2 className="font-serif text-4xl font-bold text-white">
                The concerns standard care often dismisses
              </h2>
              <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                Most patients arrive with a specific worry, not a diagnosis. We take those concerns seriously and order the labs that actually answer them.
              </p>
            </div>
          </ScrollFade>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {concerns.map((item, i) => (
              <ScrollFade key={i} delay={i * 70}>
                <div className="p-7 bg-[#1a1a2e] border border-[#2a2a4e] rounded-xl h-full">
                  <div className="w-2 h-2 rounded-full bg-[#c9a84c] mb-4" />
                  <h3 className="font-serif text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.detail}</p>
                </div>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-24 bg-[#0d0d1a]/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade>
            <div className="text-center mb-16">
              <p className="text-[#c9a84c] text-sm tracking-widest uppercase font-medium mb-3">
                Philosophy
              </p>
              <h2 className="font-serif text-4xl font-bold text-white">
                Our Approach
              </h2>
            </div>
          </ScrollFade>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {approach.map((item, i) => (
              <ScrollFade key={i} delay={i * 80}>
                <div className="p-7 bg-[#1a1a2e] border border-[#2a2a4e] rounded-xl h-full">
                  <div className="w-8 h-8 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-center justify-center mb-4">
                    <div className="w-2 h-2 rounded-full bg-[#c9a84c]" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.detail}</p>
                </div>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-[#c9a84c]/10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <ScrollFade>
            <h2 className="font-serif text-3xl font-bold text-white mb-4">
              Ready to Work with Dr. Abdul?
            </h2>
            <p className="text-gray-400 mb-8">
              Book a free 30-minute consultation. No commitment, no pressure.
            </p>
            <Link
              href="/contact"
              className="inline-block px-10 py-4 bg-[#c9a84c] text-black font-bold rounded tracking-wide hover:bg-[#e0c070] transition-colors"
            >
              Start Free Consultation
            </Link>
          </ScrollFade>
        </div>
      </section>
    </>
  );
}
