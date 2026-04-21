import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import ScrollFade from "../../components/ScrollFade";
import ProtocolPaywall from "../../components/ProtocolPaywall";

export const metadata: Metadata = {
  title: "Sleep & Recovery Protocol | DSIP, Melatonin & Deep Sleep Stack",
  description:
    "Evidence-based sleep optimization protocol. OTC stack (magnesium, glycine, apigenin, ashwagandha) plus physician-prescribed peptides (DSIP, Epithalamin).",
};

const preWindDownStack = [
  { name: "L-Theanine", dose: "200 mg", target: "Alpha-wave promotion, pre-sleep calm" },
  { name: "Ashwagandha (KSM-66)", dose: "300 mg", target: "Evening cortisol reduction" },
  { name: "Apigenin", dose: "50 mg", target: "GABA-A receptor modulation — 'chamomile active'" },
];

const preBedStack = [
  { name: "Magnesium Glycinate", dose: "400 mg", target: "Muscle relaxation, GABA support" },
  { name: "Magnesium L-Threonate", dose: "2,000 mg (144 mg elemental)", target: "Brain magnesium — sleep architecture" },
  { name: "Glycine", dose: "3,000 mg", target: "Core body temp drop — deeper sleep onset" },
  { name: "Melatonin (low dose)", dose: "0.3–1 mg", target: "Circadian signal — NOT a sedative" },
  { name: "Tart Cherry Extract", dose: "500 mg", target: "Natural melatonin + anti-inflammatory" },
];

const middleOfNightStack = [
  { name: "Magnesium Glycinate", dose: "200 mg", target: "For 3 AM wakeups (if needed)" },
  { name: "Glycine", dose: "3,000 mg", target: "Helps return to sleep faster" },
];

const peptides = [
  { name: "DSIP (Delta Sleep Inducing Peptide)", dose: "100–200 mcg SC before bed", target: "Increases slow-wave sleep, reduces nighttime cortisol", notes: "Nonapeptide with direct sleep-promoting action. Most researched sleep peptide. 5 nights/week max." },
  { name: "Epithalamin / Epitalon", dose: "5–10 mg cycle", target: "Melatonin restoration, circadian repair", notes: "Khavinson pineal peptide. Typically cycled 2-3x yearly (10-20 day courses)." },
  { name: "Pinealon", dose: "100–200 mcg/day", target: "Pineal gland support, sleep-wake rhythm", notes: "Short peptide — 10-day cycles, 2-3x yearly. Pairs with Epitalon." },
  { name: "Selank (low dose evening)", dose: "100–250 mcg intranasal", target: "Reduces rumination / racing mind at bedtime", notes: "Only use if anxiety blocks sleep onset. Non-sedating." },
];

const targets = [
  { marker: "Sleep Latency", current: ">20 min", goal: "<10 min", realistic: "Faster onset", timeline: "1-2 weeks" },
  { marker: "Deep Sleep %", current: "<15%", goal: "18–23%", realistic: "Measurable via Whoop/Oura/8Sleep", timeline: "4-6 weeks" },
  { marker: "Night Wakings", current: "2-3/night", goal: "0-1/night", realistic: "Fewer disruptions", timeline: "2-4 weeks" },
  { marker: "HRV", current: "Baseline", goal: "+10-20%", realistic: "Recovery improvement", timeline: "4-8 weeks" },
];

export default function SleepProtocolPage() {
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
            Sleep & Recovery
            <span className="block gold-gradient">Optimization Protocol</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Evidence-based stack for deep sleep, faster sleep onset, and recovery. OTC supplements
            plus physician-prescribed peptides (DSIP, Epitalon, Pinealon) for circadian repair.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade>
            <div className="bg-[#1a1a2e] border border-indigo-500/30 rounded-xl p-8">
              <h2 className="font-serif text-2xl font-bold text-white mb-4">Who This Protocol Is For</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <p className="text-indigo-400 font-semibold text-sm mb-1">Can&apos;t Fall Asleep</p>
                  <p className="text-gray-400 text-sm">Racing mind, &gt;20 min to sleep onset, bedtime anxiety, rumination.</p>
                </div>
                <div>
                  <p className="text-indigo-400 font-semibold text-sm mb-1">Wake Through the Night</p>
                  <p className="text-gray-400 text-sm">3 AM wakeups, frequent disruptions, unable to return to sleep.</p>
                </div>
                <div>
                  <p className="text-indigo-400 font-semibold text-sm mb-1">Not Recovering</p>
                  <p className="text-gray-400 text-sm">Low HRV, low deep sleep %, waking unrefreshed despite 8 hrs in bed.</p>
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
        <ProtocolPaywall protocolId="sleep" protocolName="Sleep Protocol" price="$49">
          <section className="py-24 bg-[#0d0d1a]/60">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollFade>
                <div className="text-center mb-12">
                  <h2 className="font-serif text-4xl font-bold text-white mb-4">Sleep Stack Timing</h2>
                  <p className="text-gray-400 max-w-xl mx-auto">Timing matters more than total dose. Each phase is designed for a specific sleep architecture window.</p>
                </div>
              </ScrollFade>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {[
                  { label: "Wind-Down", time: "90 min before bed", items: preWindDownStack, color: "from-amber-600 to-amber-800" },
                  { label: "Pre-Bed", time: "30 min before bed", items: preBedStack, color: "from-indigo-600 to-indigo-800" },
                  { label: "3 AM Wakeup (if needed)", time: "Keep at bedside", items: middleOfNightStack, color: "from-purple-600 to-purple-800" },
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
                  <h3 className="font-serif text-2xl font-bold text-white mb-2">
                    Sleep Peptides (Physician-Prescribed)
                  </h3>
                  <p className="text-[#c9a84c] text-sm mb-6">
                    Requires consultation and prescription. Dispensed by licensed US compounding pharmacies.
                  </p>
                  <div className="space-y-4">
                    {peptides.map((p, i) => (
                      <div key={i} className="bg-[#0a0a0a] border border-[#2a2a4e] rounded-lg p-5">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-white font-semibold">{p.name}</p>
                            <p className="text-gray-500 text-xs">{p.target}</p>
                          </div>
                          <span className="text-[#c9a84c] font-mono text-sm flex-shrink-0 ml-4">{p.dose}</span>
                        </div>
                        <p className="text-gray-400 text-sm">{p.notes}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-amber-900/10 border border-amber-500/20 rounded-lg">
                    <p className="text-amber-400 text-sm">
                      <strong>DSIP timing:</strong> Inject 30-60 min before bed. Most effective 5 nights/week,
                      with 2 nights off to prevent tolerance. Pair with good sleep hygiene for maximum effect.
                    </p>
                  </div>
                </div>
              </ScrollFade>
            </div>
          </section>

          <section className="py-16 bg-[#0d0d1a]/60">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollFade>
                <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-xl p-8">
                  <h3 className="font-serif text-2xl font-bold text-white mb-4">Sleep Hygiene (Non-Negotiable)</h3>
                  <p className="text-gray-400 text-sm mb-6">
                    Supplements amplify good habits. Fix these first, or supplements will waste money:
                  </p>
                  <ul className="space-y-3 text-gray-300 text-sm">
                    <li><strong className="text-[#c9a84c]">Consistent wake time:</strong> Same time every day, including weekends. Anchors your circadian rhythm.</li>
                    <li><strong className="text-[#c9a84c]">Morning sunlight:</strong> 10-15 min within 30 min of waking. Sets melatonin clock for 16 hours later.</li>
                    <li><strong className="text-[#c9a84c]">Last caffeine by noon:</strong> 6-hour half-life — 3 PM coffee is still active at 9 PM.</li>
                    <li><strong className="text-[#c9a84c]">Cool bedroom:</strong> 65-68°F ideal. Core body temp must drop to initiate deep sleep.</li>
                    <li><strong className="text-[#c9a84c]">Blackout curtains + no screens 60 min pre-bed:</strong> Even dim light suppresses melatonin 50%.</li>
                    <li><strong className="text-[#c9a84c]">No alcohol within 3 hours of bed:</strong> Destroys REM sleep. Single biggest modifiable factor.</li>
                    <li><strong className="text-[#c9a84c]">Eating window closes 3 hrs pre-bed:</strong> Digestion blocks sleep-related cooling and hormone cycles.</li>
                  </ul>
                </div>
              </ScrollFade>
            </div>
          </section>

          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollFade>
                <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-xl p-8">
                  <h3 className="font-serif text-2xl font-bold text-white mb-4">Tracking: Measure What You&apos;re Fixing</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    You cannot optimize what you don&apos;t measure. Pick one:
                  </p>
                  <ul className="space-y-3 text-gray-300 text-sm">
                    <li><strong className="text-[#c9a84c]">Whoop ($30/mo):</strong> Best for HRV, sleep stages, recovery scoring. Worn 24/7.</li>
                    <li><strong className="text-[#c9a84c]">Oura Ring ($299 + $6/mo):</strong> Best for sleep architecture + readiness. Comfortable to wear.</li>
                    <li><strong className="text-[#c9a84c]">8Sleep Pod ($2-4k):</strong> Thermal regulation + tracking in one. Actively cools/warms.</li>
                    <li><strong className="text-[#c9a84c]">Apple Watch:</strong> Good enough if you already have one. Focus on &ldquo;Time in Deep Sleep.&rdquo;</li>
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
                      { item: "Magnesium Glycinate + L-Threonate", cost: "$35–50" },
                      { item: "Glycine (bulk powder)", cost: "$10–15" },
                      { item: "L-Theanine", cost: "$10–15" },
                      { item: "Ashwagandha KSM-66", cost: "$15–25" },
                      { item: "Apigenin", cost: "$15–20" },
                      { item: "Melatonin (low-dose)", cost: "$5–10" },
                      { item: "Tart Cherry Extract", cost: "$10–20" },
                      { item: "Sleep peptides (Rx, cycled)", cost: "$100–300" },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center justify-between px-6 py-3">
                        <span className="text-gray-300 text-sm">{row.item}</span>
                        <span className="text-[#c9a84c] font-mono text-sm">{row.cost}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between px-6 py-4 bg-[#0a0a0a]">
                      <span className="text-white font-semibold">OTC Stack Total</span>
                      <span className="font-serif text-2xl font-bold text-[#c9a84c]">$100–155</span>
                    </div>
                    <div className="flex items-center justify-between px-6 py-4 bg-[#0a0a0a]">
                      <span className="text-white font-semibold">With Peptides</span>
                      <span className="font-serif text-2xl font-bold text-[#c9a84c]">$200–455</span>
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
                    <li><strong className="text-white">Melatonin dosing:</strong> Low dose (0.3-1 mg) — NOT the 3-10 mg OTC pills. Higher doses desensitize receptors and cause morning grogginess.</li>
                    <li><strong className="text-white">Ashwagandha + thyroid:</strong> Can affect thyroid hormone levels — monitor TSH if hypothyroid.</li>
                    <li><strong className="text-white">DSIP prescription:</strong> Requires physician consultation. Not for use in pregnancy, bleeding disorders, or acute illness.</li>
                    <li><strong className="text-white">Sleep apnea screen first:</strong> If symptoms (loud snoring, witnessed pauses, daytime sleepiness), get a home sleep test. Supplements will not fix apnea.</li>
                    <li><strong className="text-white">Rebound insomnia:</strong> Do not stop melatonin abruptly after &gt;2 weeks. Taper down by 50% over 1 week.</li>
                  </ul>
                </div>
              </ScrollFade>
            </div>
          </section>

          <section className="py-16 bg-[#0d0d1a]/60">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-lg p-8 text-center">
                <h2 className="font-serif text-2xl font-bold text-white mb-4">Want DSIP or Pineal Peptides?</h2>
                <p className="text-gray-400 mb-6">DSIP, Epitalon, and Pinealon require a physician consultation. Book one to discuss whether they&apos;re right for your sleep issues.</p>
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
