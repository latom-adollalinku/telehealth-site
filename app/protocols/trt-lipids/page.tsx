import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import ScrollFade from "../../components/ScrollFade";
import ProtocolPaywall from "../../components/ProtocolPaywall";

export const metadata: Metadata = {
  title: "TRT Lipid Recovery Protocol | ApoB & HDL Optimization on Testosterone",
  description:
    "Evidence-based protocol for men on TRT whose lipid panel worsened. Reduce ApoB, restore HDL, and protect cardiovascular health without stopping testosterone therapy.",
};

const morningStack = [
  { name: "Berberine HCL", dose: "500 mg", target: "Natural PCSK9 modulator — LDL reduction" },
  { name: "Omega-3 EPA/DHA", dose: "2,000 mg", target: "Triglyceride lowering, HDL support" },
  { name: "Vitamin C", dose: "1,000 mg", target: "Endothelial protection" },
  { name: "L-Carnitine", dose: "1,000 mg", target: "Improves HDL function, cardiac protection" },
];

const afternoonStack = [
  { name: "Berberine HCL", dose: "500 mg", target: "Sustained lipid control" },
  { name: "Citrus Bergamot", dose: "500 mg", target: "HDL raising + LDL lowering" },
  { name: "Aged Garlic Extract", dose: "600 mg", target: "LDL reduction 5-10% + BP support" },
];

const eveningStack = [
  { name: "Berberine HCL", dose: "500 mg", target: "Overnight metabolic control" },
  { name: "CoQ10 / Ubiquinol", dose: "200 mg", target: "Cardiac protection (especially if on statin)" },
  { name: "Niacin ER (titrated)", dose: "500–1,500 mg", target: "Raises HDL 15-30%, lowers Lp(a)" },
  { name: "Magnesium Glycinate", dose: "400 mg", target: "BP support + sleep" },
];

const targets = [
  { marker: "ApoB", current: ">100 mg/dL", goal: "<80 mg/dL", realistic: "15-25% reduction", timeline: "12 weeks" },
  { marker: "HDL", current: "Suppressed by TRT", goal: "+10-15 mg/dL", realistic: "Partial recovery", timeline: "8-12 weeks" },
  { marker: "Triglycerides", current: "Elevated", goal: "<100 mg/dL", realistic: "20-30% drop", timeline: "6-8 weeks" },
  { marker: "hs-CRP", current: ">2.0 mg/L", goal: "<1.0 mg/L", realistic: "Omega-3 driven", timeline: "8 weeks" },
];

export default function TRTLipidsProtocolPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d1a] to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.05)_0%,_transparent_70%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/5 mb-8">
            <span className="text-[#c9a84c] text-xs tracking-widest uppercase font-medium">
              TRT Recovery Protocol
            </span>
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-white mb-6">
            TRT Lipid
            <span className="block gold-gradient">Recovery Protocol</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Testosterone replacement improves energy, libido, and body composition. But it can
            suppress HDL and elevate ApoB. This stack restores your lipid panel without stopping TRT.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade>
            <div className="bg-[#1a1a2e] border border-red-500/30 rounded-xl p-8">
              <h2 className="font-serif text-2xl font-bold text-white mb-4">Who This Protocol Is For</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <p className="text-red-400 font-semibold text-sm mb-1">HDL Crashed on TRT</p>
                  <p className="text-gray-400 text-sm">HDL dropped 10-20 points after starting TRT. Most clinics don&apos;t address this.</p>
                </div>
                <div>
                  <p className="text-red-400 font-semibold text-sm mb-1">ApoB &gt;100</p>
                  <p className="text-gray-400 text-sm">Atherogenic particle count elevated post-TRT. Bigger risk than LDL alone.</p>
                </div>
                <div>
                  <p className="text-amber-400 font-semibold text-sm mb-1">Clinic Won&apos;t Track</p>
                  <p className="text-gray-400 text-sm">Your TRT clinic only checks total T and E2. You need the full panel.</p>
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
              <p className="text-gray-400">Expected lipid recovery in 8-12 weeks without stopping TRT.</p>
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
        <ProtocolPaywall protocolId="trt-lipids" protocolName="TRT Lipid Recovery" price="$10">
          <section className="py-24 bg-[#0d0d1a]/60">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollFade>
                <div className="text-center mb-12">
                  <h2 className="font-serif text-4xl font-bold text-white mb-4">Daily Stack</h2>
                  <p className="text-gray-400">All Amazon-accessible. No prescription needed for the supplement layer.</p>
                </div>
              </ScrollFade>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {[
                  { label: "Morning", time: "With breakfast", items: morningStack, color: "from-red-600 to-red-800" },
                  { label: "Afternoon", time: "With lunch", items: afternoonStack, color: "from-amber-600 to-amber-800" },
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
                  <h3 className="font-serif text-2xl font-bold text-white mb-4">Why Your Lipids Got Worse on TRT</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Exogenous testosterone suppresses the liver&apos;s production of HDL particles. It also
                    increases hematocrit, which can raise blood viscosity and cardiovascular risk.
                    Most TRT clinics track Total T and E2 — they do NOT track ApoB, Lp(a), or hs-CRP.
                  </p>
                  <p className="text-gray-400 text-sm">
                    This protocol addresses the three specific lipid shifts that occur on TRT:
                    HDL suppression, ApoB elevation, and increased inflammatory signaling.
                    You don&apos;t need to stop TRT — you need to compensate for its downstream effects.
                  </p>
                </div>
              </ScrollFade>
            </div>
          </section>

          <section className="py-16 bg-[#0d0d1a]/60">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollFade>
                <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-xl p-8">
                  <h3 className="font-serif text-2xl font-bold text-white mb-4">Lifestyle Requirements</h3>
                  <ul className="space-y-3 text-gray-300 text-sm">
                    <li><strong className="text-[#c9a84c]">Blood donation quarterly:</strong> Manages hematocrit if TRT pushes it above 52%. Non-negotiable for CV protection.</li>
                    <li><strong className="text-[#c9a84c]">Zone 2 cardio 3x/week:</strong> Single highest HDL-raising intervention. 45-60 min sessions.</li>
                    <li><strong className="text-[#c9a84c]">Limit saturated fat:</strong> Under 10% of calories. Trade butter/cheese for olive oil and nuts.</li>
                    <li><strong className="text-[#c9a84c]">Track HRV:</strong> Whoop or Oura. TRT can affect sympathetic tone — early warning signal.</li>
                    <li><strong className="text-[#c9a84c]">Keep TRT dose moderate:</strong> Supra-physiologic doses worsen lipids. Stay in upper-physiologic range (700-1000 ng/dL total T).</li>
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
                      { item: "Berberine HCL (1.5g)", cost: "$15–25" },
                      { item: "Omega-3 EPA/DHA (2g)", cost: "$15–25" },
                      { item: "Citrus Bergamot (500mg)", cost: "$15–25" },
                      { item: "Aged Garlic Extract", cost: "$12–18" },
                      { item: "L-Carnitine Tartrate", cost: "$12–18" },
                      { item: "CoQ10 / Ubiquinol", cost: "$20–30" },
                      { item: "Niacin ER (500–1500mg)", cost: "$10–15" },
                      { item: "Vitamin C + Magnesium", cost: "$15–20" },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center justify-between px-6 py-3">
                        <span className="text-gray-300 text-sm">{row.item}</span>
                        <span className="text-[#c9a84c] font-mono text-sm">{row.cost}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between px-6 py-4 bg-[#0a0a0a]">
                      <span className="text-white font-semibold">Total Monthly Cost</span>
                      <span className="font-serif text-2xl font-bold text-[#c9a84c]">$114–176</span>
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
                    <li><strong className="text-white">Niacin titration:</strong> Start 500mg, increase every 2 weeks. Flushing common first week. Take with food. Monitor liver enzymes after 6-8 weeks.</li>
                    <li><strong className="text-white">Don&apos;t stop TRT abruptly:</strong> Exogenous testosterone suppresses natural production. Stopping without physician guidance causes HPTA crash.</li>
                    <li><strong className="text-white">If already on a statin:</strong> CoQ10 is mandatory, not optional. Statins deplete CoQ10 and cause muscle symptoms.</li>
                    <li><strong className="text-white">Recheck labs:</strong> Full lipid panel + ApoB + hs-CRP at 12 weeks.</li>
                  </ul>
                </div>
              </ScrollFade>
            </div>
          </section>

          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-lg p-8 text-center">
                <h2 className="font-serif text-2xl font-bold text-white mb-4">Want Your Labs Reviewed?</h2>
                <p className="text-gray-400 mb-6">Upload your TRT panel + lipid panel for a physician review and personalized adjustments.</p>
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
