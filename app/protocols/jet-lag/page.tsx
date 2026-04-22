import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import ScrollFade from "../../components/ScrollFade";
import ProtocolPaywall from "../../components/ProtocolPaywall";

export const metadata: Metadata = {
  title: "Jet Lag Protocol | Light, Melatonin & Meal Timing for Fast Recovery",
  description:
    "Evidence-based jet lag protocol. Pre-trip circadian shifting, melatonin timing, light exposure, and meal timing. Recover 50% faster from long-haul travel.",
};

const preFlightStack = [
  { name: "Melatonin (low dose)", dose: "0.3-1 mg 3 days pre-trip", target: "Start shifting circadian clock" },
  { name: "Magnesium Glycinate", dose: "400 mg evening", target: "Sleep quality during shift" },
  { name: "B-Complex", dose: "Daily", target: "Stress of travel depletes B vitamins" },
];

const inflightStack = [
  { name: "Electrolyte packets", dose: "1 per 4 hrs flight", target: "Cabin air is 15% humidity — chronic dehydration" },
  { name: "L-Theanine", dose: "200 mg", target: "Sleep without sedation at 35,000 ft" },
  { name: "Magnesium + glycine", dose: "before sleep", target: "Mid-flight sleep onset" },
  { name: "Avoid alcohol", dose: "—", target: "Single biggest jet lag amplifier" },
];

const onArrivalStack = [
  { name: "Morning sunlight (destination)", dose: "15-20 min outside", target: "Most powerful circadian resetter — free" },
  { name: "Caffeine (destination morning only)", dose: "Normal dose", target: "Boost alertness + anchor wake time" },
  { name: "Melatonin (destination bedtime)", dose: "0.3-1 mg", target: "3-5 nights to re-entrain" },
  { name: "Meal timing to destination", dose: "No snacking between", target: "Food timing is a circadian zeitgeber" },
];

const targets = [
  { marker: "Sleep Onset (new TZ)", current: "2-3 hrs delay", goal: "Within 30 min", realistic: "Melatonin + light", timeline: "2-3 nights" },
  { marker: "Daytime Alertness", current: "Brain fog", goal: "Normal function", realistic: "Light + caffeine", timeline: "1-2 days" },
  { marker: "GI Regularity", current: "Disrupted", goal: "Normal", realistic: "Meal timing", timeline: "2-3 days" },
  { marker: "Full Recovery", current: "1 day per hour shift", goal: "Half that", realistic: "With protocol", timeline: "3-5 days" },
];

export default function JetLagProtocolPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d1a] to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.05)_0%,_transparent_70%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/5 mb-8">
            <span className="text-[#c9a84c] text-xs tracking-widest uppercase font-medium">
              Jet Lag Protocol
            </span>
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-white mb-6">
            Jet Lag
            <span className="block gold-gradient">Recovery Protocol</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            The circadian system responds to three signals: light, food, and melatonin.
            Time all three correctly and you cut jet lag recovery in half.
          </p>
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
        <ProtocolPaywall protocolId="jet-lag" protocolName="Jet Lag Protocol" price="$10">
          <section className="py-24 bg-[#0d0d1a]/60">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollFade>
                <div className="text-center mb-12">
                  <h2 className="font-serif text-4xl font-bold text-white mb-4">3-Phase Protocol</h2>
                </div>
              </ScrollFade>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {[
                  { label: "3 Days Before Trip", time: "Pre-shift circadian", items: preFlightStack, color: "from-blue-600 to-blue-800" },
                  { label: "In-Flight", time: "Long-haul survival", items: inflightStack, color: "from-teal-600 to-teal-800" },
                  { label: "On Arrival", time: "Entrain fast", items: onArrivalStack, color: "from-amber-600 to-amber-800" },
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
                  <h3 className="font-serif text-2xl font-bold text-white mb-4">Direction Rules</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Eastbound travel is harder than westbound because your circadian rhythm naturally runs
                    slightly longer than 24 hours. &ldquo;Chasing the sun west&rdquo; is easier than &ldquo;fighting the sun east.&rdquo;
                  </p>
                  <ul className="space-y-3 text-gray-300 text-sm">
                    <li><strong className="text-[#c9a84c]">Eastbound (US → Europe):</strong> Start shifting bedtime 1 hour earlier for 3 nights pre-trip. Take melatonin at new bedtime. Morning light on arrival.</li>
                    <li><strong className="text-[#c9a84c]">Westbound (US → Asia):</strong> Stay up later 3 nights pre-trip. Afternoon/evening light on arrival. Delay melatonin.</li>
                    <li><strong className="text-[#c9a84c]">Short trips (&lt;3 days):</strong> Don&apos;t shift. Stay on home time. Not worth the effort.</li>
                    <li><strong className="text-[#c9a84c]">Fasting hack:</strong> 16-hour fast ending with breakfast in destination timezone. Food timing entrains circadian strongly.</li>
                  </ul>
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
                    <li><strong className="text-white">Melatonin dose matters:</strong> 0.3-1 mg is circadian signaling. 3-10 mg is sedation. You want the signal, not the knockout.</li>
                    <li><strong className="text-white">Don&apos;t drink on the flight:</strong> Alcohol dehydrates + fragments sleep. Worst jet lag amplifier.</li>
                    <li><strong className="text-white">Skip sleeping pills:</strong> Zolpidem or benzos at altitude can cause confusional states. Use natural sleep aids only.</li>
                    <li><strong className="text-white">Caffeine timing:</strong> Only use caffeine in destination morning. Never after 2 PM destination time.</li>
                  </ul>
                </div>
              </ScrollFade>
            </div>
          </section>
        </ProtocolPaywall>
      </Suspense>
    </>
  );
}
