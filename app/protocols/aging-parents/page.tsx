import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import ScrollFade from "../../components/ScrollFade";
import ProtocolPaywall from "../../components/ProtocolPaywall";

export const metadata: Metadata = {
  title: "Aging Parents Essentials Protocol | Drug-Nutrient Depletion Recovery",
  description:
    "If your parent takes 5+ medications they likely have undiagnosed nutrient deficiencies causing fatigue, brain fog, and weakness. Physician-designed essential stack.",
};

const morningStack = [
  { name: "B-Complex (Active Form)", dose: "1 capsule", target: "Replaces B1, B6, B9, B12 depleted by common drugs" },
  { name: "Benfotiamine", dose: "300 mg", target: "Fat-soluble B1 — crosses into nerves (metformin depletion)" },
  { name: "CoQ10 / Ubiquinol", dose: "200 mg", target: "Depleted by statins — muscle pain, fatigue" },
  { name: "Vitamin D3 + K2", dose: "2,000 IU + 100 mcg", target: "Bone health, fall prevention, immune" },
];

const middayStack = [
  { name: "Magnesium Glycinate", dose: "400 mg", target: "Depleted by PPIs and diuretics — heart rhythm, sleep" },
  { name: "Omega-3 EPA/DHA", dose: "2,000 mg", target: "Brain health, inflammation, triglycerides" },
  { name: "Vitamin B12 (Methylcobalamin)", dose: "1,000 mcg sublingual", target: "Metformin depletes absorption — prevents dementia-like symptoms" },
];

const eveningStack = [
  { name: "Magnesium Glycinate", dose: "200 mg", target: "Sleep quality, restless legs" },
  { name: "Potassium Citrate", dose: "99 mg", target: "Depleted by diuretics — leg cramps, weakness" },
  { name: "Probiotic (multi-strain)", dose: "20B+ CFU", target: "Gut health after years of antibiotics and acid blockers" },
];

const targets = [
  { marker: "Energy", current: "Always tired", goal: "Stable energy", realistic: "Nutrient repletion driven", timeline: "4-8 weeks" },
  { marker: "Brain Fog", current: "Daily", goal: "Clear thinking", realistic: "B12 + omega-3 driven", timeline: "6-12 weeks" },
  { marker: "Muscle Weakness", current: "Stairs are hard", goal: "Normal strength", realistic: "CoQ10 + Mg driven", timeline: "8-12 weeks" },
  { marker: "Sleep", current: "Fragmented", goal: "7+ hrs solid", realistic: "Mg + lifestyle", timeline: "2-4 weeks" },
];

export default function AgingParentsProtocolPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d1a] to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.05)_0%,_transparent_70%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/5 mb-8">
            <span className="text-[#c9a84c] text-xs tracking-widest uppercase font-medium">
              For Your Parents
            </span>
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-white mb-6">
            Aging Parents
            <span className="block gold-gradient">Essentials Protocol</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            The average 70-year-old takes 5 prescriptions. Most cause nutrient deficiencies
            no doctor screens for. Fatigue, brain fog, muscle weakness get blamed on &ldquo;aging.&rdquo;
            This stack addresses the root cause.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade>
            <div className="bg-[#1a1a2e] border border-blue-500/30 rounded-xl p-8">
              <h2 className="font-serif text-2xl font-bold text-white mb-4">Drug-Induced Nutrient Depletions (What Your Doctor Won&apos;t Tell You)</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {[
                  { drug: "Metformin", depletes: "B12, B1 (thiamine), CoQ10" },
                  { drug: "Statins", depletes: "CoQ10, Vitamin D, selenium" },
                  { drug: "PPIs (omeprazole)", depletes: "B12, magnesium, calcium, iron" },
                  { drug: "Diuretics (HCTZ, Lasix)", depletes: "Potassium, magnesium, B1, zinc" },
                  { drug: "ACE inhibitors", depletes: "Zinc" },
                  { drug: "Beta-blockers", depletes: "CoQ10, melatonin" },
                  { drug: "Antibiotics (long-term)", depletes: "B vitamins, K, gut flora" },
                  { drug: "SSRIs", depletes: "Folate, B12, sodium" },
                ].map((d, i) => (
                  <div key={i} className="bg-[#0a0a0a] border border-[#2a2a4e] rounded p-3">
                    <p className="text-white font-semibold">{d.drug}</p>
                    <p className="text-[#c9a84c] text-xs">Depletes: {d.depletes}</p>
                  </div>
                ))}
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
        <ProtocolPaywall protocolId="aging-parents" protocolName="Aging Parents Essentials" price="$10">
          <section className="py-24 bg-[#0d0d1a]/60">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollFade>
                <div className="text-center mb-12">
                  <h2 className="font-serif text-4xl font-bold text-white mb-4">Daily Stack</h2>
                  <p className="text-gray-400 max-w-xl mx-auto">Simple. One pill organizer. Share with whoever shops for them.</p>
                </div>
              </ScrollFade>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {[
                  { label: "Morning", time: "With breakfast", items: morningStack, color: "from-blue-600 to-blue-800" },
                  { label: "Midday", time: "With lunch", items: middayStack, color: "from-teal-600 to-teal-800" },
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
                  <h3 className="font-serif text-2xl font-bold text-white mb-4">Quality-of-Life Multipliers</h3>
                  <ul className="space-y-3 text-gray-300 text-sm">
                    <li><strong className="text-[#c9a84c]">10-min walks after meals:</strong> Single best intervention for glucose, mood, and sleep. Even in a wheelchair — movement matters.</li>
                    <li><strong className="text-[#c9a84c]">Protein at every meal:</strong> 30g minimum. Elderly need more protein, not less. Sarcopenia is prevented, not reversed.</li>
                    <li><strong className="text-[#c9a84c]">Morning sunlight:</strong> 10 min outside before 10 AM. Reverses fragmented sleep.</li>
                    <li><strong className="text-[#c9a84c]">Hydration:</strong> Elderly have reduced thirst signals. 8 cups minimum. Dehydration mimics dementia.</li>
                    <li><strong className="text-[#c9a84c]">Medication review yearly:</strong> Bring the full list to every doctor visit. Ask: &ldquo;What can we deprescribe?&rdquo;</li>
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
                      { item: "B-Complex + B12 Sublingual", cost: "$20–30" },
                      { item: "Benfotiamine", cost: "$15–25" },
                      { item: "CoQ10 / Ubiquinol", cost: "$20–30" },
                      { item: "Vitamin D3 + K2", cost: "$10–15" },
                      { item: "Magnesium Glycinate", cost: "$15–20" },
                      { item: "Omega-3 EPA/DHA", cost: "$15–25" },
                      { item: "Potassium + Probiotic", cost: "$20–30" },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center justify-between px-6 py-3">
                        <span className="text-gray-300 text-sm">{row.item}</span>
                        <span className="text-[#c9a84c] font-mono text-sm">{row.cost}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between px-6 py-4 bg-[#0a0a0a]">
                      <span className="text-white font-semibold">Total Monthly Cost</span>
                      <span className="font-serif text-2xl font-bold text-[#c9a84c]">$115–175</span>
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
                    <li><strong className="text-white">On Coumadin/Warfarin:</strong> Do NOT add Vitamin K or omega-3 without physician approval. Affects INR.</li>
                    <li><strong className="text-white">Kidney disease:</strong> Potassium and magnesium must be physician-supervised. Do not add if CKD stage 3+.</li>
                    <li><strong className="text-white">Pill burden:</strong> If they already take 10+ pills, pick the top 3 (B-complex, CoQ10, Vitamin D). Don&apos;t add all 10.</li>
                    <li><strong className="text-white">Swallowing issues:</strong> Liquid B-complex and chewable D3 exist. Use those.</li>
                  </ul>
                </div>
              </ScrollFade>
            </div>
          </section>

          <section className="py-16 bg-[#0d0d1a]/60">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-lg p-8 text-center">
                <h2 className="font-serif text-2xl font-bold text-white mb-4">Want a Custom Plan for Your Parent?</h2>
                <p className="text-gray-400 mb-6">Upload their medication list. Physician review of drug-nutrient interactions and customized stack.</p>
                <Link href="/book" className="inline-block px-8 py-4 bg-[#c9a84c] text-black font-semibold rounded hover:bg-[#e0c070] transition-colors">
                  Book Lab Review — $49.99
                </Link>
              </div>
            </div>
          </section>
        </ProtocolPaywall>
      </Suspense>
    </>
  );
}
