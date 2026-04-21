import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import ScrollFade from "../../components/ScrollFade";
import ProtocolPaywall from "../../components/ProtocolPaywall";

export const metadata: Metadata = {
  title: "Longevity Stack | NAD+, Mitochondrial & Anti-Aging Protocol",
  description:
    "Comprehensive longevity supplement stack. NAD+ precursors, mitochondrial support, senolytics, and cellular health. Physician-designed anti-aging protocol.",
};

const morningStack = [
  { name: "NMN (Nicotinamide Mononucleotide)", dose: "500–1,000 mg", target: "NAD+ precursor, cellular energy" },
  { name: "Resveratrol (trans)", dose: "500 mg", target: "SIRT1 activation, take with fat" },
  { name: "TMG (Trimethylglycine)", dose: "500 mg", target: "Methyl donor — pairs with NMN" },
  { name: "CoQ10 / Ubiquinol", dose: "200 mg", target: "Mitochondrial electron transport" },
  { name: "Omega-3 EPA/DHA", dose: "2,000 mg", target: "Cellular membrane integrity" },
];

const middayStack = [
  { name: "Spermidine", dose: "1–3 mg", target: "Autophagy induction" },
  { name: "Quercetin", dose: "500 mg", target: "Senolytic (weekly cycling)" },
  { name: "Alpha-Ketoglutarate (Ca-AKG)", dose: "1,000 mg", target: "Longevity pathway activation" },
];

const eveningStack = [
  { name: "Magnesium L-Threonate", dose: "2,000 mg", target: "Brain magnesium, cognitive longevity" },
  { name: "Glycine", dose: "3,000 mg", target: "Sleep quality, collagen synthesis" },
  { name: "Apigenin", dose: "50 mg", target: "CD38 inhibition, preserves NAD+" },
  { name: "Melatonin (low dose)", dose: "0.3–1 mg", target: "Sleep + antioxidant" },
];

const weeklyProtocol = [
  { name: "Fisetin (senolytic)", dose: "500 mg × 2 days", frequency: "Weekly cycle", target: "Clears senescent cells" },
  { name: "Rapamycin (Rx only)", dose: "Per physician", frequency: "Weekly", target: "mTOR inhibition — requires MD" },
  { name: "Extended fast", dose: "18-24 hours", frequency: "1-2x/week", target: "Autophagy, insulin sensitivity" },
];

const targets = [
  { marker: "NAD+", current: "Declining with age", goal: "Youthful levels", realistic: "50-100% increase", timeline: "4-8 weeks" },
  { marker: "IGF-1", current: "Variable", goal: "Optimal range", realistic: "Based on goals", timeline: "Ongoing" },
  { marker: "hs-CRP", current: ">1.0 mg/L", goal: "<0.5 mg/L", realistic: "Meaningful reduction", timeline: "8-12 weeks" },
  { marker: "Biological Age", current: "Chronological", goal: "Younger than chrono", realistic: "2-5 years reversal", timeline: "12 months" },
];

export default function LongevityProtocolPage() {
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
            Longevity
            <span className="block gold-gradient">Stack Protocol</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Comprehensive anti-aging stack targeting NAD+ decline, mitochondrial dysfunction,
            cellular senescence, and age-related inflammation. Based on Sinclair/Attia-style protocols.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade>
            <div className="bg-[#1a1a2e] border border-amber-500/30 rounded-xl p-8">
              <h2 className="font-serif text-2xl font-bold text-white mb-4">Who This Protocol Is For</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <p className="text-amber-400 font-semibold text-sm mb-1">Age 35+</p>
                  <p className="text-gray-400 text-sm">NAD+ begins significant decline in mid-30s. Early intervention window.</p>
                </div>
                <div>
                  <p className="text-amber-400 font-semibold text-sm mb-1">Metabolically Healthy</p>
                  <p className="text-gray-400 text-sm">Baseline labs clean — ready to optimize rather than correct dysfunction.</p>
                </div>
                <div>
                  <p className="text-amber-400 font-semibold text-sm mb-1">Long-Term Focused</p>
                  <p className="text-gray-400 text-sm">Goal is healthspan extension — cognitive and physical longevity over decades.</p>
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
        <ProtocolPaywall protocolId="longevity" protocolName="Longevity Protocol" price="$49">
          <section className="py-24 bg-[#0d0d1a]/60">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollFade>
                <div className="text-center mb-12">
                  <h2 className="font-serif text-4xl font-bold text-white mb-4">Daily Protocol</h2>
                </div>
              </ScrollFade>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {[
                  { label: "Morning", time: "Fasted state ideal", items: morningStack, color: "from-amber-600 to-amber-800" },
                  { label: "Midday", time: "With lunch", items: middayStack, color: "from-teal-600 to-teal-800" },
                  { label: "Evening", time: "Before bed", items: eveningStack, color: "from-indigo-600 to-indigo-800" },
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
                  <h3 className="font-serif text-2xl font-bold text-white mb-6">Weekly / Cyclical Protocol</h3>
                  <div className="space-y-4">
                    {weeklyProtocol.map((item, i) => (
                      <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-[#0a0a0a] border border-[#2a2a4e] rounded-lg">
                        <div className="flex-1">
                          <p className="text-white font-semibold">{item.name}</p>
                          <p className="text-gray-500 text-xs">{item.target}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[#c9a84c] font-mono text-sm">{item.dose}</p>
                          <p className="text-gray-500 text-xs">{item.frequency}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollFade>
            </div>
          </section>

          <section className="py-16 bg-[#0d0d1a]/60">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollFade>
                <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-xl p-8">
                  <h3 className="font-serif text-2xl font-bold text-white mb-4">Lifestyle Multipliers (The Real Levers)</h3>
                  <p className="text-gray-400 text-sm mb-6">
                    Supplements are 20% of longevity. These behaviors are the other 80%:
                  </p>
                  <ul className="space-y-3 text-gray-300 text-sm">
                    <li><strong className="text-[#c9a84c]">Zone 2 cardio 3-4 hrs/week:</strong> Mitochondrial biogenesis — the #1 longevity lever.</li>
                    <li><strong className="text-[#c9a84c]">Resistance training 3x/week:</strong> Muscle mass is the strongest predictor of all-cause mortality after age 50.</li>
                    <li><strong className="text-[#c9a84c]">Sleep 7-9 hrs with tracking:</strong> Whoop/Oura/8Sleep for HRV, RHR, deep sleep optimization.</li>
                    <li><strong className="text-[#c9a84c]">Time-restricted eating:</strong> 14-16 hour daily fast for autophagy.</li>
                    <li><strong className="text-[#c9a84c]">Sauna 4x/week 20 min:</strong> 40% reduction in all-cause mortality in Finnish studies.</li>
                    <li><strong className="text-[#c9a84c]">Cold exposure 2-3x/week:</strong> Mitochondrial biogenesis + mental resilience.</li>
                    <li><strong className="text-[#c9a84c]">Social connection:</strong> Strongest behavioral predictor of centenarians.</li>
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
                    <h3 className="text-white font-semibold">Monthly Supplement Cost</h3>
                  </div>
                  <div className="divide-y divide-[#2a2a4e]">
                    {[
                      { item: "NMN (500-1000mg)", cost: "$40–80" },
                      { item: "Resveratrol (500mg)", cost: "$15–25" },
                      { item: "TMG", cost: "$10–15" },
                      { item: "Ca-AKG", cost: "$25–40" },
                      { item: "Spermidine", cost: "$30–50" },
                      { item: "Quercetin + Fisetin", cost: "$20–35" },
                      { item: "CoQ10 / Ubiquinol", cost: "$20–30" },
                      { item: "Omega-3 + Mag L-Threonate", cost: "$35–50" },
                      { item: "Glycine + Apigenin + Melatonin", cost: "$20–30" },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center justify-between px-6 py-3">
                        <span className="text-gray-300 text-sm">{row.item}</span>
                        <span className="text-[#c9a84c] font-mono text-sm">{row.cost}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between px-6 py-4 bg-[#0a0a0a]">
                      <span className="text-white font-semibold">Total Monthly Cost</span>
                      <span className="font-serif text-2xl font-bold text-[#c9a84c]">$215–355</span>
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
                    <li><strong className="text-white">Rapamycin:</strong> Prescription only. Dosing highly individualized. Requires physician supervision.</li>
                    <li><strong className="text-white">NMN + Methylation:</strong> NMN depletes methyl groups — TMG is mandatory, not optional.</li>
                    <li><strong className="text-white">Senolytic cycling:</strong> Fisetin/quercetin in 2-day pulses weekly, not daily.</li>
                    <li><strong className="text-white">Fasting cautions:</strong> Not appropriate if you have history of eating disorders, are pregnant, or under 18.</li>
                    <li><strong className="text-white">Biomarker tracking:</strong> Baseline biological age test (TruDiagnostic, Horvath) to measure real progress.</li>
                  </ul>
                </div>
              </ScrollFade>
            </div>
          </section>

          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-lg p-8 text-center">
                <h2 className="font-serif text-2xl font-bold text-white mb-4">Serious About Longevity?</h2>
                <p className="text-gray-400 mb-6">The Premium Longevity Program ($399/mo) includes quarterly labs, biological age testing, all protocols, and direct physician access.</p>
                <Link href="/services" className="inline-block px-8 py-4 bg-[#c9a84c] text-black font-semibold rounded hover:bg-[#e0c070] transition-colors">
                  View Premium Program
                </Link>
              </div>
            </div>
          </section>
        </ProtocolPaywall>
      </Suspense>
    </>
  );
}
