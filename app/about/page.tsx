import type { Metadata } from "next";
import Link from "next/link";
import ScrollFade from "../components/ScrollFade";

export const metadata: Metadata = {
  title: "About Dr. Abdilatif Abdulhakim, MD — LATOM Wellness",
  description:
    "Dr. Abdilatif Abdulhakim is a board-certified anesthesiologist who founded LATOM Wellness to deliver evidence-based longevity medicine directly to patients.",
};

const credentials = [
  "MD — Medical Doctor",
  "Board-Certified Anesthesiologist",
  "15+ Years Clinical Experience",
  "Advanced Training in Pain Medicine & Pharmacology",
  "Licensed in Virginia",
];

const approach = [
  {
    title: "Physician-First",
    detail:
      "Every patient is seen by Dr. Abdulhakim directly. No PA mid-levels making clinical decisions without oversight.",
  },
  {
    title: "Evidence-Based",
    detail:
      "Every protocol is grounded in peer-reviewed clinical literature. We do not chase trends — we follow data.",
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
            Dr. Abdilatif Abdulhakim, MD
          </h1>
          <p className="text-[#c9a84c] text-lg font-medium mb-4">
            Board-Certified Anesthesiologist &bull; Richmond, Virginia
          </p>
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
                    After 15 years practicing anesthesiology, Dr. Abdulhakim saw a consistent pattern:
                    patients struggling with weight, hormonal imbalance, and declining energy who were
                    offered nothing beyond generic advice and referrals.
                  </p>
                  <p>
                    The medications that work — GLP-1s, peptides, hormone optimization — existed.
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
                <p className="text-[#c9a84c] text-sm tracking-widest uppercase font-medium mb-4">
                  Credentials
                </p>
                <div className="p-6 bg-[#1a1a2e] border border-[#2a2a4e] rounded-xl mb-6">
                  <ul className="space-y-3">
                    {credentials.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                        <svg className="w-4 h-4 text-[#c9a84c] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 bg-[#1a1a2e] border border-[#2a2a4e] rounded-xl">
                  <h3 className="text-white font-semibold mb-4">Contact</h3>
                  <ul className="space-y-3">
                    <li>
                      <a
                        href="mailto:anesbrothers@gmail.com"
                        className="flex gap-3 text-sm text-gray-300 hover:text-[#c9a84c] transition-colors"
                      >
                        <span className="text-[#c9a84c] font-medium">Email</span>
                        anesbrothers@gmail.com
                      </a>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-300">
                      <span className="text-[#c9a84c] font-medium">Location</span>
                      Richmond, Virginia
                    </li>
                    <li className="flex gap-3 text-sm text-gray-300">
                      <span className="text-[#c9a84c] font-medium">Serving</span>
                      Patients in licensed states (VA + others)
                    </li>
                  </ul>
                </div>
              </div>
            </ScrollFade>
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
              Ready to Work with Dr. Abdulhakim?
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
