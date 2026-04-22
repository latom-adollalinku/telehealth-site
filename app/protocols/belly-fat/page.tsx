import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import ScrollFade from "../../components/ScrollFade";
import ProtocolPaywall from "../../components/ProtocolPaywall";

export const metadata: Metadata = {
  title: "Belly Fat Reduction Protocol | Fasting, Yohimbine & Zone 2 Stack",
  description:
    "Evidence-based visceral fat reduction for men and women 35+. 16:8 fasting, yohimbine pre-fasted cardio, berberine, and Zone 2 protocol. 4-6 inches off the waist in 8-12 weeks.",
};

const morningStack = [
  { name: "Yohimbine HCl", dose: "5 mg fasted, pre-walk", target: "Blocks alpha-2 receptors that prevent belly fat burn" },
  { name: "Caffeine", dose: "100-200 mg", target: "Stack with yohimbine — boosts fat oxidation 3x" },
  { name: "L-Carnitine Tartrate", dose: "2,000 mg", target: "Shuttles fatty acids into mitochondria" },
  { name: "Green Tea Extract (EGCG)", dose: "500 mg", target: "Thermogenic, specifically targets visceral fat" },
];

const afternoonStack = [
  { name: "Berberine HCL", dose: "500 mg with meals", target: "Natural metformin — belly fat via insulin sensitivity" },
  { name: "Glucomannan", dose: "5 g before meals", target: "Satiety + glucose blunting" },
  { name: "Ashwagandha (KSM-66)", dose: "600 mg", target: "Cortisol — the cortisol-belly-fat axis is real" },
];

const eveningStack = [
  { name: "Magnesium Glycinate", dose: "400 mg", target: "Sleep quality drives belly fat — sleep below 7hrs increases visceral fat 50%" },
  { name: "Inositol", dose: "2,000 mg", target: "Insulin sensitivity overnight" },
  { name: "Glycine", dose: "3,000 mg", target: "Sleep depth — cortisol recovery" },
];

const targets = [
  { marker: "Waist Circumference", current: "Baseline", goal: "-4 to -6 inches", realistic: "Consistent 12 weeks", timeline: "12 weeks" },
  { marker: "Visceral Fat (DEXA)", current: "Elevated", goal: "Normal range", realistic: "Fastest-mobilized fat", timeline: "8-12 weeks" },
  { marker: "Fasting Insulin", current: ">10 uIU/mL", goal: "<7 uIU/mL", realistic: "Drives belly fat loss", timeline: "6-8 weeks" },
  { marker: "HbA1c", current: ">5.6%", goal: "<5.5%", realistic: "Follows insulin", timeline: "8-12 weeks" },
];

export default function BellyFatProtocolPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d1a] to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.05)_0%,_transparent_70%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/5 mb-8">
            <span className="text-[#c9a84c] text-xs tracking-widest uppercase font-medium">
              Fat Loss Protocol
            </span>
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-white mb-6">
            Belly Fat
            <span className="block gold-gradient">Reduction Protocol</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Visceral fat is metabolically active and drives every age-related disease.
            This is the physician-designed stack — fasting, yohimbine, Zone 2, and insulin
            control — for losing 4-6 inches off the waist in 12 weeks.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade>
            <div className="bg-[#1a1a2e] border border-orange-500/30 rounded-xl p-8">
              <h2 className="font-serif text-2xl font-bold text-white mb-4">Who This Protocol Is For</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <p className="text-orange-400 font-semibold text-sm mb-1">Stubborn Belly Fat</p>
                  <p className="text-gray-400 text-sm">Lean everywhere else but visceral fat won&apos;t budge. Classic insulin resistance pattern.</p>
                </div>
                <div>
                  <p className="text-orange-400 font-semibold text-sm mb-1">35+ and Metabolic Shift</p>
                  <p className="text-gray-400 text-sm">Diet and cardio that worked in your 20s stopped working. Hormonal + mitochondrial.</p>
                </div>
                <div>
                  <p className="text-orange-400 font-semibold text-sm mb-1">Not a GLP-1 Candidate</p>
                  <p className="text-gray-400 text-sm">Don&apos;t want prescription medication. Want an Amazon-accessible evidence-based protocol.</p>
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
        <ProtocolPaywall protocolId="belly-fat" protocolName="Belly Fat Reduction" price="$10">
          <section className="py-24 bg-[#0d0d1a]/60">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollFade>
                <div className="text-center mb-12">
                  <h2 className="font-serif text-4xl font-bold text-white mb-4">Daily Stack</h2>
                </div>
              </ScrollFade>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {[
                  { label: "Morning (Fasted)", time: "Before 30-min walk", items: morningStack, color: "from-orange-600 to-orange-800" },
                  { label: "Afternoon", time: "With meals", items: afternoonStack, color: "from-amber-600 to-amber-800" },
                  { label: "Evening", time: "Pre-sleep", items: eveningStack, color: "from-indigo-600 to-indigo-800" },
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
                  <h3 className="font-serif text-2xl font-bold text-white mb-4">The Protocol — Daily Schedule</h3>
                  <ul className="space-y-4 text-gray-300 text-sm">
                    <li>
                      <strong className="text-[#c9a84c] block mb-1">06:00 — Fasted Cardio</strong>
                      Yohimbine 5mg + caffeine + L-carnitine. Wait 20 min. 30-45 min Zone 2 walk (can hold conversation). This is the belly-fat-specific window — alpha-2 receptors are blocked, fatty acids flow.
                    </li>
                    <li>
                      <strong className="text-[#c9a84c] block mb-1">12:00 — First Meal (16:8)</strong>
                      Protein-led meal. 40-50g protein. Fiber-rich vegetables. Moderate carbs. Berberine with the meal.
                    </li>
                    <li>
                      <strong className="text-[#c9a84c] block mb-1">16:00 — Optional Strength Training</strong>
                      3x/week. Compound lifts. Muscle mass is the primary glucose disposal organ.
                    </li>
                    <li>
                      <strong className="text-[#c9a84c] block mb-1">19:00 — Last Meal</strong>
                      Close eating window by 20:00. Ashwagandha + glucomannan. Protein + fats, lighter carbs.
                    </li>
                    <li>
                      <strong className="text-[#c9a84c] block mb-1">22:00 — Sleep Stack</strong>
                      Magnesium + glycine + inositol. 7-9 hours. Non-negotiable.
                    </li>
                  </ul>
                </div>
              </ScrollFade>
            </div>
          </section>

          <section className="py-16 bg-[#0d0d1a]/60">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollFade>
                <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-xl p-8">
                  <h3 className="font-serif text-2xl font-bold text-white mb-4">Why This Works When Cardio + Dieting Doesn&apos;t</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    After 35, insulin resistance and cortisol drive belly fat. Calories matter, but the
                    <em> composition</em> and <em>timing</em> of calories matter more. The yohimbine-fasted-cardio
                    window is specifically designed to unlock visceral fat via alpha-2 receptor blockade —
                    something you cannot achieve with cardio alone.
                  </p>
                  <p className="text-gray-400 text-sm">
                    Sleep below 7 hours increases visceral fat storage by ~50%. Cortisol dysregulation from
                    chronic stress does the same. The evening stack addresses both. This is why calorie-only
                    approaches fail for people over 35 — you&apos;re fighting hormones, not thermodynamics.
                  </p>
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
                      { item: "Yohimbine HCl", cost: "$15–25" },
                      { item: "Caffeine + L-Carnitine", cost: "$15–20" },
                      { item: "Green Tea Extract (EGCG)", cost: "$15–25" },
                      { item: "Berberine HCL", cost: "$15–25" },
                      { item: "Glucomannan", cost: "$10–15" },
                      { item: "Ashwagandha KSM-66", cost: "$15–25" },
                      { item: "Inositol + Magnesium + Glycine", cost: "$25–40" },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center justify-between px-6 py-3">
                        <span className="text-gray-300 text-sm">{row.item}</span>
                        <span className="text-[#c9a84c] font-mono text-sm">{row.cost}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between px-6 py-4 bg-[#0a0a0a]">
                      <span className="text-white font-semibold">Total Monthly Cost</span>
                      <span className="font-serif text-2xl font-bold text-[#c9a84c]">$110–175</span>
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
                    <li><strong className="text-white">Yohimbine warning:</strong> Do NOT use if you have anxiety disorder, high blood pressure, heart disease, or take SSRIs/MAOIs. Start 2.5mg to test tolerance.</li>
                    <li><strong className="text-white">Caffeine sensitivity:</strong> If caffeine makes you anxious, drop it — yohimbine works without it, just with less thermogenesis.</li>
                    <li><strong className="text-white">Berberine + diabetes meds:</strong> Hypoglycemia risk if on metformin/insulin. Monitor BG.</li>
                    <li><strong className="text-white">Glucomannan:</strong> Take with 8oz+ water. Stop 3-5 days pre-surgery (ileus risk).</li>
                    <li><strong className="text-white">Fasting caution:</strong> Not appropriate if history of eating disorder, pregnancy, or under 18.</li>
                  </ul>
                </div>
              </ScrollFade>
            </div>
          </section>

          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-lg p-8 text-center">
                <h2 className="font-serif text-2xl font-bold text-white mb-4">Want Personalized Dosing?</h2>
                <p className="text-gray-400 mb-6">Book a lab review. We&apos;ll evaluate your metabolic markers and customize the stack around your specific insulin and cortisol profile.</p>
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
