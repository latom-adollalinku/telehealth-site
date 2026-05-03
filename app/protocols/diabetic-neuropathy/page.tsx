import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import ScrollFade from "../../components/ScrollFade";
import ProtocolPaywall from "../../components/ProtocolPaywall";

export const metadata: Metadata = {
  title: "Diabetic Neuropathy Recovery Protocol | TTFD, Benfotiamine & ALA",
  description:
    "Evidence-based protocol for diabetic neuropathy. TTFD, benfotiamine, alpha-lipoic acid, and acetyl-L-carnitine — including the high-bioavailability B1 derivative TTFD developed in Japan.",
};

const morningStack = [
  { name: "Benfotiamine", dose: "300 mg", target: "Fat-soluble B1 — crosses into nerves, reduces AGEs" },
  { name: "TTFD (Allithiamine)", dose: "100-200 mg", target: "Crosses blood-brain barrier — developed in Japan 1950" },
  { name: "Alpha-Lipoic Acid", dose: "600 mg", target: "Neuropathic pain reduction (approved for this use in Germany)" },
  { name: "Acetyl-L-Carnitine", dose: "1,000 mg", target: "Nerve fiber regeneration" },
];

const middayStack = [
  { name: "Methylcobalamin (B12)", dose: "1,000 mcg sublingual", target: "Active B12 — rebuilds myelin sheath" },
  { name: "R-Lipoic Acid (optional)", dose: "300 mg", target: "The active isomer of ALA" },
  { name: "Magnesium Glycinate", dose: "400 mg", target: "Nerve signaling cofactor" },
];

const eveningStack = [
  { name: "Benfotiamine", dose: "300 mg", target: "Second dose — sustained nerve protection" },
  { name: "Alpha-Lipoic Acid", dose: "600 mg", target: "Second dose — antioxidant regeneration" },
  { name: "Vitamin D3", dose: "5,000 IU", target: "Diabetic neuropathy often comorbid with D deficiency" },
  { name: "Berberine", dose: "500 mg", target: "Addresses root cause — glucose control" },
];

const targets = [
  { marker: "Burning/Tingling", current: "Daily", goal: "Rare", realistic: "50-70% reduction", timeline: "8-12 weeks" },
  { marker: "Numbness", current: "Foot/hand", goal: "Improved sensation", realistic: "Slow but real", timeline: "3-6 months" },
  { marker: "Fasting Glucose", current: ">120 mg/dL", goal: "<110 mg/dL", realistic: "Root-cause fix", timeline: "8-12 weeks" },
  { marker: "Sleep Quality", current: "Pain-disrupted", goal: "Restorative", realistic: "ALA + Mg driven", timeline: "4-6 weeks" },
];

export default function DiabeticNeuropathyProtocolPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d1a] to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.05)_0%,_transparent_70%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/5 mb-8">
            <span className="text-[#c9a84c] text-xs tracking-widest uppercase font-medium">
              Neuropathy Recovery
            </span>
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-white mb-6">
            Diabetic Neuropathy
            <span className="block gold-gradient">Recovery Protocol</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Early-stage diabetic neuropathy is reversible with the right nerve-specific nutrients.
            TTFD and benfotiamine — Japanese innovations from the 1950s — are the foundation.
            Most doctors don&apos;t prescribe them because they&apos;re not drugs.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade>
            <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-xl p-8">
              <h2 className="font-serif text-2xl font-bold text-white mb-4">The History: Why We Have TTFD and Benfotiamine</h2>
              <p className="text-gray-400 text-sm mb-4">
                In the 1870s, Japan industrialized polished white rice. Thousands of sailors started dying
                of a mystery disease called <em>kakke</em> — weakness, heart failure, brain damage.
              </p>
              <p className="text-gray-400 text-sm mb-4">
                Japanese naval surgeon Kanehiro Takaki proved in 1884 that it was a nutritional deficiency —
                30 years before vitamins were even named. The missing nutrient was vitamin B1 (thiamine),
                stripped out during rice polishing.
              </p>
              <p className="text-gray-400 text-sm mb-4">
                Regular thiamine is water-soluble and doesn&apos;t cross the blood-brain barrier well. In 1950,
                Japanese scientists at Sankyo studying garlic extract created <strong className="text-[#c9a84c]">allithiamines</strong> —
                fat-soluble B1 analogs. TTFD and benfotiamine can enter nerves and the brain where regular
                B1 cannot.
              </p>
              <p className="text-gray-400 text-sm">
                These compounds are the reason diabetic neuropathy is reversible in its early stages.
                Germany has used them as first-line therapy for decades. US medicine largely ignored them
                because they weren&apos;t profitable drugs — they&apos;re supplements.
              </p>
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
        <ProtocolPaywall protocolId="diabetic-neuropathy" protocolName="Diabetic Neuropathy Recovery" price="$10">
          <section className="py-24 bg-[#0d0d1a]/60">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollFade>
                <div className="text-center mb-12">
                  <h2 className="font-serif text-4xl font-bold text-white mb-4">Daily Stack</h2>
                </div>
              </ScrollFade>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {[
                  { label: "Morning", time: "With breakfast", items: morningStack, color: "from-red-600 to-red-800" },
                  { label: "Midday", time: "With lunch", items: middayStack, color: "from-amber-600 to-amber-800" },
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
                  <h3 className="font-serif text-2xl font-bold text-white mb-4">Root Cause: Control Glucose First</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Nerve damage accumulates when HbA1c is above 6.5%. The supplements above accelerate healing,
                    but nothing works long-term if blood sugar stays high.
                  </p>
                  <ul className="space-y-3 text-gray-300 text-sm">
                    <li><strong className="text-[#c9a84c]">Tight glucose control:</strong> Target HbA1c under 6.5%, ideally 5.7-6.2%.</li>
                    <li><strong className="text-[#c9a84c]">Walk after meals:</strong> 10-15 min walks cut post-meal glucose spikes 30%.</li>
                    <li><strong className="text-[#c9a84c]">CGM tracking:</strong> Dexcom Stelo or Abbott Lingo — real-time feedback beats quarterly HbA1c.</li>
                    <li><strong className="text-[#c9a84c]">Protein first, carbs last:</strong> Meal sequencing blunts glucose response.</li>
                    <li><strong className="text-[#c9a84c]">Resistance training:</strong> 2-3x/week. Muscle is the primary glucose disposal site.</li>
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
                      { item: "Benfotiamine (600mg/day)", cost: "$25–40" },
                      { item: "TTFD (Allithiamine)", cost: "$30–50" },
                      { item: "Alpha-Lipoic Acid (1200mg)", cost: "$20–30" },
                      { item: "Acetyl-L-Carnitine", cost: "$20–30" },
                      { item: "Methylcobalamin B12", cost: "$10–15" },
                      { item: "Berberine", cost: "$15–25" },
                      { item: "Vitamin D + Magnesium", cost: "$15–20" },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center justify-between px-6 py-3">
                        <span className="text-gray-300 text-sm">{row.item}</span>
                        <span className="text-[#c9a84c] font-mono text-sm">{row.cost}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between px-6 py-4 bg-[#0a0a0a]">
                      <span className="text-white font-semibold">Total Monthly Cost</span>
                      <span className="font-serif text-2xl font-bold text-[#c9a84c]">$135–210</span>
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
                    <li><strong className="text-white">Berberine + diabetes meds:</strong> Additive glucose-lowering. Monitor for hypoglycemia. Often allows medication reduction — with physician guidance.</li>
                    <li><strong className="text-white">ALA + thyroid medication:</strong> Take 4+ hours apart. ALA can interfere with thyroid hormone.</li>
                    <li><strong className="text-white">TTFD odor:</strong> TTFD contains sulfur — some people get body odor. Benfotiamine alone is odorless if that&apos;s a concern.</li>
                    <li><strong className="text-white">Advanced neuropathy:</strong> Long-standing severe neuropathy won&apos;t fully reverse. Early-stage responds best.</li>
                    <li><strong className="text-white">Work with endocrinologist:</strong> This protocol complements medical care. Don&apos;t replace it.</li>
                  </ul>
                </div>
              </ScrollFade>
            </div>
          </section>

          <section className="py-16 bg-[#0d0d1a]/60">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-lg p-8 text-center">
                <h2 className="font-serif text-2xl font-bold text-white mb-4">Want a Custom Neuropathy Plan?</h2>
                <p className="text-gray-400 mb-6">Book a lab review. Bring your HbA1c, B12, and diabetes medications for a personalized protocol.</p>
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
