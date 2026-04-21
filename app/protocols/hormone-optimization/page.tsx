import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import ScrollFade from "../../components/ScrollFade";
import ProtocolPaywall from "../../components/ProtocolPaywall";

export const metadata: Metadata = {
  title: "Hormone Optimization Protocol | TRT, HRT & DHEA Support",
  description:
    "Evidence-based supplement protocol for testosterone, estrogen, thyroid, and adrenal optimization. Complements TRT/HRT or supports natural hormone production.",
};

const morningStack = [
  { name: "Ashwagandha (KSM-66)", dose: "600 mg", target: "Cortisol modulation, T support" },
  { name: "Vitamin D3 + K2", dose: "5,000 IU + 100 mcg", target: "Testosterone substrate" },
  { name: "Zinc Picolinate", dose: "30 mg", target: "T production, aromatase inhibition" },
  { name: "Boron", dose: "6 mg", target: "Free testosterone + hormone balance" },
];

const middayStack = [
  { name: "Tongkat Ali (Eurycoma)", dose: "400 mg", target: "Free T, libido, cortisol reduction" },
  { name: "Magnesium Glycinate", dose: "400 mg", target: "Sleep + free T conversion" },
  { name: "Omega-3 EPA/DHA", dose: "2,000 mg", target: "Hormone precursor + anti-inflammatory" },
];

const eveningStack = [
  { name: "DHEA (if DHEA-S low)", dose: "25–50 mg", target: "Adrenal support, testosterone/estrogen precursor" },
  { name: "Ashwagandha (KSM-66)", dose: "300 mg", target: "Second dose for cortisol rhythm" },
  { name: "Selenium", dose: "200 mcg", target: "Thyroid T4→T3 conversion" },
  { name: "Tyrosine", dose: "500 mg", target: "Thyroid hormone substrate" },
];

const targets = [
  { marker: "Total T", current: "<500 ng/dL", goal: "600-900 ng/dL", realistic: "50-150 increase", timeline: "8-12 weeks" },
  { marker: "Free T", current: "<70 pg/mL", goal: "90-180 pg/mL", realistic: "Meaningful increase", timeline: "8-12 weeks" },
  { marker: "DHEA-S", current: "<150 mcg/dL", goal: "200-400", realistic: "Restoration with DHEA supp", timeline: "8 weeks" },
  { marker: "Free T3", current: "<3.0 pg/mL", goal: "3.2-4.2", realistic: "T4→T3 conversion support", timeline: "6-8 weeks" },
];

export default function HormoneProtocolPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d1a] to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.05)_0%,_transparent_70%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/5 mb-8">
            <span className="text-[#c9a84c] text-xs tracking-widest uppercase font-medium">
              Physician-Designed Protocol
            </span>
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-white mb-6">
            Hormone
            <span className="block gold-gradient">Optimization Protocol</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Evidence-based stack to support testosterone, DHEA, thyroid, and cortisol balance.
            Complements TRT/HRT or supports natural hormone production in sub-optimal ranges.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade>
            <div className="bg-[#1a1a2e] border border-purple-500/30 rounded-xl p-8">
              <h2 className="font-serif text-2xl font-bold text-white mb-4">Who This Protocol Is For</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <p className="text-purple-400 font-semibold text-sm mb-1">Low-Normal Testosterone</p>
                  <p className="text-gray-400 text-sm">Total T 300-500 ng/dL with symptoms. Not yet needing TRT but room to optimize.</p>
                </div>
                <div>
                  <p className="text-purple-400 font-semibold text-sm mb-1">Low DHEA-S</p>
                  <p className="text-gray-400 text-sm">Adrenal insufficiency, chronic stress, or HPA axis dysfunction.</p>
                </div>
                <div>
                  <p className="text-purple-400 font-semibold text-sm mb-1">Sub-Optimal Thyroid</p>
                  <p className="text-gray-400 text-sm">Normal TSH but low Free T3 — poor conversion.</p>
                </div>
              </div>
            </div>
          </ScrollFade>
        </div>
      </section>

      <section className="py-16 bg-[#0d0d1a]/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade>
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold text-white mb-4">Target Outcomes</h2>
            </div>
          </ScrollFade>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {targets.map((t, i) => (
              <ScrollFade key={i} delay={i * 75}>
                <div className="bg-[#1a1a2e] border border-[#2a2a4e] rounded-xl p-6 text-center">
                  <p className="text-[#c9a84c] font-bold text-lg mb-1">{t.marker}</p>
                  <p className="text-red-400 text-sm mb-1">{t.current}</p>
                  <p className="text-green-400 font-serif text-2xl font-bold mb-2">{t.goal}</p>
                  <p className="text-gray-500 text-xs">{t.realistic}</p>
                  <p className="text-gray-600 text-xs mt-1">{t.timeline}</p>
                </div>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <ProtocolPaywall protocolId="hormone-optimization" protocolName="Hormone Protocol" price="$49">
          <section className="py-24 bg-[#0d0d1a]/60">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollFade>
                <div className="text-center mb-12">
                  <h2 className="font-serif text-4xl font-bold text-white mb-4">Daily Protocol</h2>
                </div>
              </ScrollFade>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {[
                  { label: "Morning", time: "With breakfast", items: morningStack, color: "from-purple-600 to-purple-800" },
                  { label: "Midday", time: "With lunch", items: middayStack, color: "from-amber-600 to-amber-800" },
                  { label: "Evening", time: "With dinner", items: eveningStack, color: "from-indigo-600 to-indigo-800" },
                ].map((block, idx) => (
                  <ScrollFade key={idx} delay={idx * 100}>
                    <div className="h-full bg-[#1a1a2e] border border-[#2a2a4e] rounded-xl overflow-hidden">
                      <div className={`bg-gradient-to-r ${block.color} px-6 py-4`}>
                        <h3 className="text-white font-bold text-lg">{block.label}</h3>
                        <p className="text-white/70 text-xs">{block.time}</p>
                      </div>
                      <div className="p-6 space-y-4">
                        {block.items.map((item, i) => (
                          <div key={i} className="border-b border-[#2a2a4e] pb-4 last:border-0 last:pb-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-white font-semibold text-sm">{item.name}</span>
                              <span className="text-[#c9a84c] text-xs font-mono">{item.dose}</span>
                            </div>
                            <p className="text-gray-500 text-xs">{item.target}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ScrollFade>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollFade>
                <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-xl p-8">
                  <h3 className="font-serif text-2xl font-bold text-white mb-4">Lifestyle Multipliers</h3>
                  <ul className="space-y-3 text-gray-300 text-sm">
                    <li><strong className="text-[#c9a84c]">Sleep 7-9 hrs:</strong> 80% of testosterone production happens during sleep. Non-negotiable.</li>
                    <li><strong className="text-[#c9a84c]">Resistance training 3-4x/week:</strong> Compound lifts (squat, deadlift, press) spike T acutely.</li>
                    <li><strong className="text-[#c9a84c]">Lose visceral fat:</strong> Belly fat converts T → estrogen via aromatase. Body recomp moves hormones.</li>
                    <li><strong className="text-[#c9a84c]">Morning sunlight:</strong> 10-15 min within 1 hour of waking — restores cortisol rhythm.</li>
                    <li><strong className="text-[#c9a84c]">Limit alcohol:</strong> Alcohol acutely suppresses T for 24+ hours. Max 1-2 drinks/week for optimization.</li>
                  </ul>
                </div>
              </ScrollFade>
            </div>
          </section>

          <section className="py-16 bg-[#0d0d1a]/60">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollFade>
                <div className="bg-[#1a1a2e] border border-[#2a2a4e] rounded-xl overflow-hidden">
                  <div className="px-6 py-4 bg-[#0a0a0a] border-b border-[#2a2a4e]">
                    <h3 className="text-white font-semibold">Monthly Supplement Cost</h3>
                  </div>
                  <div className="divide-y divide-[#2a2a4e]">
                    {[
                      { item: "Ashwagandha KSM-66", cost: "$15–25" },
                      { item: "Tongkat Ali (standardized)", cost: "$20–35" },
                      { item: "Vitamin D3 + K2", cost: "$10–15" },
                      { item: "Zinc Picolinate", cost: "$8–12" },
                      { item: "DHEA (if needed)", cost: "$8–15" },
                      { item: "Boron", cost: "$8–12" },
                      { item: "Magnesium Glycinate", cost: "$10–15" },
                      { item: "Selenium + Tyrosine", cost: "$12–18" },
                      { item: "Omega-3 EPA/DHA", cost: "$15–25" },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center justify-between px-6 py-3">
                        <span className="text-gray-300 text-sm">{row.item}</span>
                        <span className="text-[#c9a84c] font-mono text-sm">{row.cost}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between px-6 py-4 bg-[#0a0a0a]">
                      <span className="text-white font-semibold">Total Monthly Cost</span>
                      <span className="font-serif text-2xl font-bold text-[#c9a84c]">$106–172</span>
                    </div>
                  </div>
                </div>
              </ScrollFade>
            </div>
          </section>

          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollFade>
                <div className="bg-[#1a1a2e] border border-amber-500/30 rounded-xl p-8">
                  <h3 className="text-amber-400 font-semibold mb-4">Safety Notes</h3>
                  <ul className="space-y-3 text-gray-400 text-sm">
                    <li><strong className="text-white">DHEA caution:</strong> Only supplement if DHEA-S is confirmed low. Can aromatize to estrogen — monitor E2.</li>
                    <li><strong className="text-white">Baseline labs first:</strong> Full hormone panel (Total/Free T, E2, DHEA-S, SHBG, Thyroid) before starting.</li>
                    <li><strong className="text-white">Not TRT:</strong> This protocol supports natural production. For Total T &lt;300 or severe symptoms, discuss TRT with physician.</li>
                    <li><strong className="text-white">Recheck labs:</strong> Full panel at 12 weeks to assess response.</li>
                  </ul>
                </div>
              </ScrollFade>
            </div>
          </section>

          <section className="py-16 bg-[#0d0d1a]/60">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-lg p-8 text-center">
                <h2 className="font-serif text-2xl font-bold text-white mb-4">Need TRT/HRT?</h2>
                <p className="text-gray-400 mb-6">If your levels are clinically low, physician-supervised TRT or HRT may be more appropriate than supplementation alone.</p>
                <Link href="/services#hormone-optimization" className="inline-block px-8 py-4 bg-[#c9a84c] text-black font-semibold rounded hover:bg-[#e0c070] transition-colors">
                  View TRT/HRT Programs
                </Link>
              </div>
            </div>
          </section>
        </ProtocolPaywall>
      </Suspense>
    </>
  );
}
