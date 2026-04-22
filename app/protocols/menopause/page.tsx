import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import ScrollFade from "../../components/ScrollFade";
import ProtocolPaywall from "../../components/ProtocolPaywall";

export const metadata: Metadata = {
  title: "Perimenopause & Menopause Protocol | HRT-Ready Supplement Stack",
  description:
    "Evidence-based supplement protocol for perimenopause and menopause. Supports HRT or stands alone. Addresses hot flashes, sleep, mood, bone density, and cognition.",
};

const morningStack = [
  { name: "Vitamin D3 + K2", dose: "5,000 IU + 100 mcg", target: "Bone density, mood, immune" },
  { name: "Calcium (if low dietary)", dose: "500 mg", target: "Paired with D3/K2 — bone health" },
  { name: "Omega-3 EPA/DHA", dose: "2,000 mg", target: "Brain, heart, joint health" },
  { name: "Magnesium Glycinate", dose: "400 mg", target: "Hot flash reduction, sleep support" },
];

const middayStack = [
  { name: "Black Cohosh", dose: "40-80 mg", target: "Hot flash reduction (well-studied)" },
  { name: "DIM (Diindolylmethane)", dose: "200 mg", target: "Estrogen metabolism support" },
  { name: "Maca Root", dose: "1,500 mg", target: "Libido, mood, energy" },
  { name: "B-Complex", dose: "1 capsule", target: "Mood support, methylation" },
];

const eveningStack = [
  { name: "Magnesium Glycinate", dose: "400 mg", target: "Second dose — sleep quality" },
  { name: "Ashwagandha (KSM-66)", dose: "600 mg", target: "Cortisol modulation, sleep" },
  { name: "Melatonin (low-dose)", dose: "0.3-1 mg", target: "Sleep onset, declines in menopause" },
  { name: "Collagen Peptides", dose: "10-20 g", target: "Skin, hair, joint health" },
];

const targets = [
  { marker: "Hot Flashes", current: "5-10/day", goal: "<2/day", realistic: "With black cohosh + lifestyle", timeline: "4-8 weeks" },
  { marker: "Sleep", current: "Fragmented", goal: "7+ hrs solid", realistic: "Magnesium + melatonin", timeline: "2-4 weeks" },
  { marker: "Mood", current: "Irritable/low", goal: "Stable", realistic: "B-complex + ashwagandha", timeline: "4-6 weeks" },
  { marker: "Bone Density", current: "Declining", goal: "Maintained", realistic: "D3 + K2 + calcium + training", timeline: "12+ months" },
];

export default function MenopauseProtocolPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d1a] to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.05)_0%,_transparent_70%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/5 mb-8">
            <span className="text-[#c9a84c] text-xs tracking-widest uppercase font-medium">
              Menopause Protocol
            </span>
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-white mb-6">
            Perimenopause &amp; Menopause
            <span className="block gold-gradient">Protocol</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Evidence-based stack for hot flashes, sleep, mood, and bone health. Works alongside HRT
            or as a first step for women not ready for hormone therapy.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade>
            <div className="bg-[#1a1a2e] border border-pink-500/30 rounded-xl p-8">
              <h2 className="font-serif text-2xl font-bold text-white mb-4">Who This Protocol Is For</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <p className="text-pink-400 font-semibold text-sm mb-1">Perimenopause (35-50)</p>
                  <p className="text-gray-400 text-sm">Irregular cycles, mood shifts, sleep changes. Often misdiagnosed as anxiety/depression.</p>
                </div>
                <div>
                  <p className="text-pink-400 font-semibold text-sm mb-1">Menopause (50+)</p>
                  <p className="text-gray-400 text-sm">12 months no period. Hot flashes, vaginal dryness, bone loss concerns.</p>
                </div>
                <div>
                  <p className="text-pink-400 font-semibold text-sm mb-1">Not Ready for HRT</p>
                  <p className="text-gray-400 text-sm">Want to try supplement-only approach first, or HRT contraindicated.</p>
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
        <ProtocolPaywall protocolId="menopause" protocolName="Menopause Protocol" price="$10">
          <section className="py-24 bg-[#0d0d1a]/60">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollFade>
                <div className="text-center mb-12">
                  <h2 className="font-serif text-4xl font-bold text-white mb-4">Daily Stack</h2>
                </div>
              </ScrollFade>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {[
                  { label: "Morning", time: "With breakfast", items: morningStack, color: "from-pink-600 to-pink-800" },
                  { label: "Midday", time: "With lunch", items: middayStack, color: "from-rose-600 to-rose-800" },
                  { label: "Evening", time: "With dinner", items: eveningStack, color: "from-purple-600 to-purple-800" },
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
                    <li><strong className="text-[#c9a84c]">Resistance training 3x/week:</strong> Preserves muscle and bone — the two things menopause destroys fastest.</li>
                    <li><strong className="text-[#c9a84c]">Cool bedroom:</strong> 65-68°F. Most effective hot flash intervention is temperature, not supplements.</li>
                    <li><strong className="text-[#c9a84c]">Protein 1g per lb body weight:</strong> Counters menopause-related muscle loss.</li>
                    <li><strong className="text-[#c9a84c]">Limit alcohol:</strong> Worsens hot flashes, bone loss, sleep. Single biggest modifiable factor.</li>
                    <li><strong className="text-[#c9a84c]">Seed cycling (optional):</strong> Flax + pumpkin (phase 1), sunflower + sesame (phase 2). Phytoestrogens, modest effect.</li>
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
                    <h3 className="text-white font-semibold">Monthly Cost</h3>
                  </div>
                  <div className="divide-y divide-[#2a2a4e]">
                    {[
                      { item: "Vitamin D3 + K2", cost: "$10–15" },
                      { item: "Omega-3 + Calcium", cost: "$20–30" },
                      { item: "Magnesium Glycinate", cost: "$15–20" },
                      { item: "Black Cohosh", cost: "$15–20" },
                      { item: "DIM", cost: "$15–25" },
                      { item: "Maca Root", cost: "$15–20" },
                      { item: "Ashwagandha + B-Complex", cost: "$25–35" },
                      { item: "Collagen Peptides + Melatonin", cost: "$20–30" },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center justify-between px-6 py-3">
                        <span className="text-gray-300 text-sm">{row.item}</span>
                        <span className="text-[#c9a84c] font-mono text-sm">{row.cost}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between px-6 py-4 bg-[#0a0a0a]">
                      <span className="text-white font-semibold">Total Monthly Cost</span>
                      <span className="font-serif text-2xl font-bold text-[#c9a84c]">$135–195</span>
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
                    <li><strong className="text-white">Black cohosh + liver:</strong> Rare liver injury reports. Avoid if liver disease. Do not use &gt;6 months without break.</li>
                    <li><strong className="text-white">DIM + hormone-sensitive cancer:</strong> Discuss with oncologist if history of breast/uterine cancer.</li>
                    <li><strong className="text-white">Maca + thyroid:</strong> Contains goitrogens. Cook first. Avoid if hypothyroid.</li>
                    <li><strong className="text-white">HRT consideration:</strong> If severe symptoms, HRT may be more effective. This protocol complements but doesn&apos;t replace hormone therapy when indicated.</li>
                    <li><strong className="text-white">Bone density scan:</strong> Get DEXA at menopause onset and every 2 years. Supplements help; can&apos;t replace monitoring.</li>
                  </ul>
                </div>
              </ScrollFade>
            </div>
          </section>

          <section className="py-16 bg-[#0d0d1a]/60">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-lg p-8 text-center">
                <h2 className="font-serif text-2xl font-bold text-white mb-4">Want HRT Evaluation?</h2>
                <p className="text-gray-400 mb-6">Book a consultation to discuss whether HRT is right for you alongside this supplement protocol.</p>
                <Link href="/book" className="inline-block px-8 py-4 bg-[#c9a84c] text-black font-semibold rounded hover:bg-[#e0c070] transition-colors">
                  Book Consultation
                </Link>
              </div>
            </div>
          </section>
        </ProtocolPaywall>
      </Suspense>
    </>
  );
}
