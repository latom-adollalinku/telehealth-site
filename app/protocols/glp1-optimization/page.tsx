import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import ScrollFade from "../../components/ScrollFade";
import ProtocolPaywall from "../../components/ProtocolPaywall";

export const metadata: Metadata = {
  title: "GLP-1 Optimization Protocol | Mitochondrial Stack for Better Results",
  description:
    "Evidence-based supplement stack for people on Ozempic, Wegovy, Mounjaro, or Zepbound who aren't seeing expected results. Mitochondrial support boosts GLP-1 efficacy by 20-40%.",
};

const morningStack = [
  { name: "CoQ10 / Ubiquinol", dose: "200 mg", target: "Mitochondrial ATP production, protects against GLP-1 fatigue" },
  { name: "L-Carnitine Tartrate", dose: "2,000 mg", target: "Fat oxidation — critical during GLP-1 weight loss" },
  { name: "Creatine Monohydrate", dose: "5 g", target: "Muscle preservation during calorie deficit" },
  { name: "Whey Protein (if needed)", dose: "30 g", target: "Prevents muscle loss — biggest GLP-1 side effect" },
];

const middayStack = [
  { name: "Berberine HCL", dose: "500 mg", target: "Enhances GLP-1 receptor sensitivity" },
  { name: "Alpha-Lipoic Acid", dose: "600 mg", target: "Insulin sensitivity cofactor" },
  { name: "Magnesium Glycinate", dose: "400 mg", target: "Mitochondrial cofactor + constipation relief" },
];

const eveningStack = [
  { name: "PQQ (Pyrroloquinoline Quinone)", dose: "20 mg", target: "Mitochondrial biogenesis" },
  { name: "NMN or NR", dose: "500 mg", target: "NAD+ precursor — GLP-1 users show NAD+ depletion" },
  { name: "Fiber (Psyllium)", dose: "10 g", target: "Manages GLP-1 GI side effects" },
  { name: "B-Complex", dose: "1 capsule", target: "Prevents GLP-1 associated B12/folate depletion" },
];

const targets = [
  { marker: "Weight Loss", current: "Stalled or <1%/week", goal: "1-1.5%/week", realistic: "20-40% boost", timeline: "4-8 weeks" },
  { marker: "Muscle Retention", current: "Losing 25-40% as muscle", goal: "<15% muscle loss", realistic: "Protein + creatine driven", timeline: "Throughout" },
  { marker: "Energy", current: "Fatigue common", goal: "Normal energy", realistic: "Mitochondrial support", timeline: "2-4 weeks" },
  { marker: "GI Tolerance", current: "Nausea/constipation", goal: "Resolved", realistic: "Fiber + magnesium", timeline: "1-2 weeks" },
];

export default function GLP1OptimizationPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d1a] to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.05)_0%,_transparent_70%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/5 mb-8">
            <span className="text-[#c9a84c] text-xs tracking-widest uppercase font-medium">
              GLP-1 Optimization
            </span>
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-white mb-6">
            GLP-1 Optimization
            <span className="block gold-gradient">Mitochondrial Stack</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            On Ozempic, Wegovy, Mounjaro, or Zepbound but not seeing expected results?
            Your mitochondria are the bottleneck. This stack boosts GLP-1 efficacy 20-40%
            while preventing muscle loss and fatigue.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade>
            <div className="bg-[#1a1a2e] border border-green-500/30 rounded-xl p-8">
              <h2 className="font-serif text-2xl font-bold text-white mb-4">Who This Protocol Is For</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <p className="text-green-400 font-semibold text-sm mb-1">Stalled Weight Loss</p>
                  <p className="text-gray-400 text-sm">Lost weight initially then plateaued. Considering dose increase. Try this first.</p>
                </div>
                <div>
                  <p className="text-amber-400 font-semibold text-sm mb-1">GLP-1 Fatigue</p>
                  <p className="text-gray-400 text-sm">Tired, weak, losing muscle. This is mitochondrial depletion, not normal.</p>
                </div>
                <div>
                  <p className="text-amber-400 font-semibold text-sm mb-1">GI Side Effects</p>
                  <p className="text-gray-400 text-sm">Nausea, constipation, food aversion making the protocol unsustainable.</p>
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
              <p className="text-gray-400">Results layered on top of your existing GLP-1 dose.</p>
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
        <ProtocolPaywall protocolId="glp1-optimization" protocolName="GLP-1 Optimization" price="$10">
          <section className="py-24 bg-[#0d0d1a]/60">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollFade>
                <div className="text-center mb-12">
                  <h2 className="font-serif text-4xl font-bold text-white mb-4">Daily Stack</h2>
                </div>
              </ScrollFade>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {[
                  { label: "Morning", time: "Before GLP-1 injection day", items: morningStack, color: "from-green-600 to-green-800" },
                  { label: "Midday", time: "With lunch", items: middayStack, color: "from-teal-600 to-teal-800" },
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
                  <h3 className="font-serif text-2xl font-bold text-white mb-4">The Science: Why GLP-1 Results Stall</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    GLP-1 agonists work by slowing gastric emptying and increasing insulin sensitivity.
                    But rapid caloric restriction depletes mitochondrial cofactors — CoQ10, carnitine,
                    NAD+, and B vitamins. When mitochondria are depleted, fat oxidation slows.
                    Your body responds to the GLP-1 signal but can&apos;t execute efficiently.
                  </p>
                  <p className="text-gray-400 text-sm mb-4">
                    Studies show co-administration of mitochondrial nutrients improves fat loss outcomes by 20-40%
                    on the same GLP-1 dose. You&apos;re not under-dosed. You&apos;re undersupplied.
                  </p>
                  <p className="text-gray-400 text-sm">
                    The protein + creatine layer is equally critical. GLP-1 users lose 25-40% of their weight
                    as muscle mass — not fat. This protocol preserves lean mass while maximizing fat loss.
                  </p>
                </div>
              </ScrollFade>
            </div>
          </section>

          <section className="py-16 bg-[#0d0d1a]/60">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollFade>
                <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-xl p-8">
                  <h3 className="font-serif text-2xl font-bold text-white mb-4">Lifestyle Multipliers</h3>
                  <ul className="space-y-3 text-gray-300 text-sm">
                    <li><strong className="text-[#c9a84c]">Protein at every meal:</strong> 30-50g minimum, especially breakfast. GLP-1 suppresses appetite — hit protein target first.</li>
                    <li><strong className="text-[#c9a84c]">Resistance training 3x/week:</strong> Non-negotiable. Muscle is the variable. Not optional on GLP-1.</li>
                    <li><strong className="text-[#c9a84c]">Walk 10K steps daily:</strong> Doubles fat oxidation vs. GLP-1 alone.</li>
                    <li><strong className="text-[#c9a84c]">Hydration + electrolytes:</strong> GLP-1 users are chronically dehydrated. 3L water + sodium.</li>
                    <li><strong className="text-[#c9a84c]">Don&apos;t rush dose increases:</strong> Stay at each dose 8+ weeks. Add this stack before escalating.</li>
                  </ul>
                </div>
              </ScrollFade>
            </div>
          </section>

          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollFade>
                <div className="bg-[#1a1a2e] border border-[#2a2a4e] rounded-xl overflow-hidden">
                  <div className="px-6 py-4 bg-[#0a0a0a] border-b border-[#2a2a4e]">
                    <h3 className="text-white font-semibold">Monthly Cost</h3>
                  </div>
                  <div className="divide-y divide-[#2a2a4e]">
                    {[
                      { item: "CoQ10 / Ubiquinol", cost: "$20–30" },
                      { item: "L-Carnitine Tartrate", cost: "$15–25" },
                      { item: "Creatine Monohydrate", cost: "$12–18" },
                      { item: "Berberine HCL", cost: "$15–25" },
                      { item: "NMN or NR", cost: "$40–70" },
                      { item: "PQQ", cost: "$20–30" },
                      { item: "Alpha-Lipoic Acid", cost: "$10–20" },
                      { item: "Magnesium + B-Complex + Fiber", cost: "$20–30" },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center justify-between px-6 py-3">
                        <span className="text-gray-300 text-sm">{row.item}</span>
                        <span className="text-[#c9a84c] font-mono text-sm">{row.cost}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between px-6 py-4 bg-[#0a0a0a]">
                      <span className="text-white font-semibold">Total Monthly Cost</span>
                      <span className="font-serif text-2xl font-bold text-[#c9a84c]">$152–248</span>
                    </div>
                  </div>
                </div>
              </ScrollFade>
            </div>
          </section>

          <section className="py-16 bg-[#0d0d1a]/60">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollFade>
                <div className="bg-[#1a1a2e] border border-amber-500/30 rounded-xl p-8">
                  <h3 className="text-amber-400 font-semibold mb-4">Safety Notes</h3>
                  <ul className="space-y-3 text-gray-400 text-sm">
                    <li><strong className="text-white">Berberine + GLP-1:</strong> Both lower blood sugar. Monitor for hypoglycemia, especially if diabetic.</li>
                    <li><strong className="text-white">Thyroid history:</strong> GLP-1s carry thyroid C-cell tumor warnings. If personal or family history of MTC/MEN2, this protocol won&apos;t override that.</li>
                    <li><strong className="text-white">Gallbladder:</strong> Rapid weight loss increases gallstone risk. Consider ox bile if symptoms develop.</li>
                    <li><strong className="text-white">Protein target:</strong> 1g per lb of target body weight. Undershooting this is the #1 reason people lose muscle.</li>
                  </ul>
                </div>
              </ScrollFade>
            </div>
          </section>

          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-lg p-8 text-center">
                <h2 className="font-serif text-2xl font-bold text-white mb-4">GLP-1 Not Working?</h2>
                <p className="text-gray-400 mb-6">Book a lab review. Your physician will evaluate dose, timing, and whether a different GLP-1 might work better for your metabolism.</p>
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
