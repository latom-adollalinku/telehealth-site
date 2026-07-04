import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import ScrollFade from "../../components/ScrollFade";
import FullscriptCTA from "../../components/FullscriptCTA";
import ProtocolPaywall from "../../components/ProtocolPaywall";

export const metadata: Metadata = {
 title: "Metabolic Optimization Protocol | HbA1c & Insulin Resistance",
 description:
 "Evidence-based supplement protocol for pre-diabetes, elevated HbA1c, insulin resistance, and weight management. Physician-designed stack with berberine, inositol, and lifestyle integration.",
 robots: { index: false, follow: false }
};

const morningStack = [
 { name: "Berberine HCL", dose: "500 mg", target: "HbA1c reduction, glucose control" },
 { name: "Myo-Inositol", dose: "2,000 mg", target: "Insulin sensitivity (HOMA-IR)" },
 { name: "Alpha-Lipoic Acid", dose: "300 mg", target: "Insulin sensitivity + neuropathy prevention" },
 { name: "Chromium Picolinate", dose: "200 mcg", target: "Glucose metabolism cofactor" },
];

const middayStack = [
 { name: "Berberine HCL", dose: "500 mg", target: "Sustained glucose control" },
 { name: "Ceylon Cinnamon", dose: "1,000 mg", target: "Postprandial glucose reduction" },
 { name: "Glucomannan", dose: "3–5 g (before meals)", target: "Satiety + glucose blunting" },
];

const eveningStack = [
 { name: "Berberine HCL", dose: "500 mg", target: "Overnight glucose control" },
 { name: "Magnesium Glycinate", dose: "400 mg", target: "Insulin sensitivity + sleep quality" },
 { name: "L-Carnitine Tartrate", dose: "1,000 mg", target: "Fat oxidation + mitochondrial support" },
 { name: "D-Chiro-Inositol", dose: "100 mg", target: "40:1 ratio with Myo-Inositol for PCOS/IR" },
];

const targets = [
 { marker: "HbA1c", current: "5.7–6.4%", goal: "<5.7%", realistic: "0.5-1.5% reduction", timeline: "8-12 weeks" },
 { marker: "Fasting Glucose", current: ">100 mg/dL", goal: "<95 mg/dL", realistic: "7-15 mg/dL reduction", timeline: "4-8 weeks" },
 { marker: "HOMA-IR", current: ">1.5", goal: "<1.0", realistic: "Meaningful improvement", timeline: "8-12 weeks" },
 { marker: "Weight", current: "Baseline", goal: "5-10% loss", realistic: "With diet + exercise", timeline: "12-16 weeks" },
];

export default function MetabolicProtocolPage() {
 return (
 <>
 <section className="relative pt-32 pb-20 overflow-hidden">
 <div className="absolute inset-0 bg-bg" />
 <div className="absolute inset-0 " />
 <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-line bg-accent-soft mb-8">
 <span className="text-accent text-xs tracking-widest uppercase font-medium">
 Physician-Designed Protocol
 </span>
 </div>
 <h1 className="font-serif text-5xl sm:text-6xl font-bold text-ink mb-6">
 Metabolic
 <span className="block gold-gradient">Optimization Protocol</span>
 </h1>
 <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
 Evidence-based supplement stack for pre-diabetes, elevated HbA1c, insulin resistance,
 and stubborn weight. Berberine-anchored protocol with 8-12 week outcomes.
 </p>
 </div>
 </section>

 <section className="py-16">
 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
 <ScrollFade>
 <div className="bg-surface border border-green-500/30 rounded-xl p-8">
 <h2 className="font-serif text-2xl font-bold text-ink mb-4">Who This Protocol Is For</h2>
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
 <div>
 <p className="text-green-400 font-semibold text-sm mb-1">Pre-Diabetes</p>
 <p className="text-muted text-sm">HbA1c 5.7–6.4% or fasting glucose 100–125 mg/dL. Critical intervention window.</p>
 </div>
 <div>
 <p className="text-amber-400 font-semibold text-sm mb-1">Insulin Resistance</p>
 <p className="text-muted text-sm">HOMA-IR &gt;1.5 or fasting insulin &gt;10. Often precedes Type 2 diabetes by years.</p>
 </div>
 <div>
 <p className="text-amber-400 font-semibold text-sm mb-1">Stubborn Weight</p>
 <p className="text-muted text-sm">Weight loss resistance despite diet/exercise. Often metabolic in origin.</p>
 </div>
 </div>
 </div>
 </ScrollFade>
 </div>
 </section>

 <section className="py-16 bg-surface/60">
 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
 <ScrollFade>
 <div className="text-center mb-12">
 <h2 className="font-serif text-4xl font-bold text-ink mb-4">Target Outcomes</h2>
 <p className="text-muted">Expected results after 8-12 weeks on full protocol.</p>
 </div>
 </ScrollFade>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
 {targets.map((t, i) => (
 <ScrollFade key={i} delay={i * 75}>
 <div className="bg-surface border border-line rounded-xl p-6 text-center">
 <p className="text-accent font-bold text-lg mb-1">{t.marker}</p>
 <p className="text-red-400 text-sm mb-1">{t.current}</p>
 <p className="text-green-400 font-serif text-2xl font-bold mb-2">{t.goal}</p>
 <p className="text-faint text-xs">{t.realistic}</p>
 <p className="text-faint text-xs mt-1">{t.timeline}</p>
 </div>
 </ScrollFade>
 ))}
 </div>
 </div>
 </section>

 <Suspense fallback={null}>
 <ProtocolPaywall protocolId="metabolic" protocolName="Metabolic Protocol" price="$49">
 <section className="py-24 bg-surface/60">
 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
 <ScrollFade>
 <div className="text-center mb-12">
 <h2 className="font-serif text-4xl font-bold text-ink mb-4">Daily Protocol</h2>
 </div>
 </ScrollFade>
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
 {[
 { label: "Morning", time: "With breakfast", items: morningStack, color: "from-green-600 to-green-800" },
 { label: "Midday", time: "With lunch", items: middayStack, color: "from-teal-600 to-teal-800" },
 { label: "Evening", time: "With dinner", items: eveningStack, color: "from-purple-600 to-purple-800" },
 ].map((block, idx) => (
 <ScrollFade key={idx} delay={idx * 100}>
 <div className="h-full bg-surface border border-line rounded-xl overflow-hidden">
 <div className={`bg-gradient-to-r ${block.color} px-6 py-4`}>
 <h3 className="text-ink font-bold text-lg">{block.label}</h3>
 <p className="text-ink/70 text-xs">{block.time}</p>
 </div>
 <div className="p-6 space-y-4">
 {block.items.map((item, i) => (
 <div key={i} className="border-b border-line pb-4 last:border-0 last:pb-0">
 <div className="flex items-center justify-between mb-1">
 <span className="text-ink font-semibold text-sm">{item.name}</span>
 <span className="text-accent text-xs font-mono">{item.dose}</span>
 </div>
 <p className="text-faint text-xs">{item.target}</p>
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
 <div className="bg-surface border border-line rounded-xl p-8">
 <h3 className="font-serif text-2xl font-bold text-ink mb-4">Lifestyle Pairing (Critical)</h3>
 <p className="text-muted text-sm mb-6">
 Supplements alone won&apos;t reverse metabolic dysfunction. The following lifestyle changes
 multiply protocol effectiveness:
 </p>
 <ul className="space-y-3 text-muted text-sm">
 <li><strong className="text-accent">Time-restricted eating:</strong> 14-16 hour fasts daily (8-10 hour eating window)</li>
 <li><strong className="text-accent">Post-meal walks:</strong> 10-15 min walks after each meal - blunts glucose spikes</li>
 <li><strong className="text-accent">Resistance training:</strong> 2-3x/week - muscle is the primary glucose disposal tissue</li>
 <li><strong className="text-accent">Carb sequencing:</strong> Fiber → protein → fat → carbs within each meal</li>
 <li><strong className="text-accent">Sleep 7-8 hrs:</strong> Sleep deprivation mimics insulin resistance</li>
 </ul>
 </div>
 </ScrollFade>
 </div>
 </section>

 <section className="py-16 bg-surface/60">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
 <ScrollFade>
 <div className="bg-surface border border-line rounded-xl overflow-hidden">
 <div className="px-6 py-4 bg-bg border-b border-line">
 <h3 className="text-ink font-semibold">Monthly Supplement Cost</h3>
 </div>
 <div className="divide-y divide-[var(--line)]">
 {[
 { item: "Berberine HCL (1.5g)", cost: "$15–25" },
 { item: "Myo-Inositol + D-Chiro", cost: "$12–20" },
 { item: "Ceylon Cinnamon", cost: "$8–15" },
 { item: "Alpha-Lipoic Acid", cost: "$10–20" },
 { item: "Chromium Picolinate", cost: "$5–10" },
 { item: "Glucomannan", cost: "$8–15" },
 { item: "Magnesium Glycinate", cost: "$10–15" },
 { item: "L-Carnitine Tartrate", cost: "$12–18" },
 ].map((row, i) => (
 <div key={i} className="flex items-center justify-between px-6 py-3">
 <span className="text-muted text-sm">{row.item}</span>
 <span className="text-accent font-mono text-sm">{row.cost}</span>
 </div>
 ))}
 <div className="flex items-center justify-between px-6 py-4 bg-bg">
 <span className="text-ink font-semibold">Total Monthly Cost</span>
 <span className="font-serif text-2xl font-bold text-accent">$80–138</span>
 </div>
 </div>
 </div>
 </ScrollFade>
 </div>
 </section>

 <section className="py-16">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
 <ScrollFade>
 <div className="bg-surface border border-amber-500/30 rounded-xl p-8">
 <h3 className="text-amber-400 font-semibold mb-4">Safety Notes</h3>
 <ul className="space-y-3 text-muted text-sm">
 <li><strong className="text-ink">Berberine + Metformin:</strong> Do not combine without physician oversight - additive glucose-lowering effect can cause hypoglycemia.</li>
 <li><strong className="text-ink">Blood glucose monitoring:</strong> Consider CGM (Dexcom Stelo, Abbott Lingo) for real-time feedback.</li>
 <li><strong className="text-ink">Glucomannan:</strong> Take with 8 oz water. Stop 3-5 days before surgery (ileus risk).</li>
 <li><strong className="text-ink">Recheck labs:</strong> HbA1c, fasting glucose, fasting insulin, HOMA-IR at 12 weeks.</li>
 </ul>
 </div>
 </ScrollFade>
 </div>
 </section>

 <section className="py-16">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
 <ScrollFade>
 <div className="bg-surface border border-line rounded-xl p-8">
 <h3 className="font-serif text-2xl font-bold text-ink mb-4">When to Add GLP-1 Therapy</h3>
 <p className="text-muted text-sm mb-6">
 This supplement protocol is first-line. If HbA1c remains above 6.0% after 12 weeks or
 weight loss is less than 5%, physician-prescribed GLP-1 agonists are the next tier.
 </p>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
 <div className="bg-surface rounded-lg p-5 border border-line">
 <p className="text-accent font-semibold text-sm mb-2">Semaglutide (Ozempic / Wegovy)</p>
 <ul className="space-y-1 text-muted text-xs">
 <li>Starting dose: 0.25 mg/week SC x4 weeks</li>
 <li>Titration: 0.5 mg, 1 mg, 1.7 mg, 2.4 mg q4 weeks</li>
 <li>Mechanism: GLP-1 receptor agonist (94% homology with native GLP-1)</li>
 <li>Weight loss: 15-17% on 2.4 mg (STEP 1 trial)</li>
 </ul>
 </div>
 <div className="bg-surface rounded-lg p-5 border border-line">
 <p className="text-accent font-semibold text-sm mb-2">Tirzepatide (Mounjaro / Zepbound)</p>
 <ul className="space-y-1 text-muted text-xs">
 <li>Starting dose: 2.5 mg/week SC x4 weeks</li>
 <li>Titration: 5 mg, 7.5 mg, 10 mg, 12.5 mg, 15 mg q4 weeks</li>
 <li>Mechanism: Dual GIP + GLP-1 receptor agonist</li>
 <li>Weight loss: 20-22% on 15 mg (SURMOUNT-1 trial)</li>
 </ul>
 </div>
 </div>
 <div className="mt-6 p-4 bg-amber-900/20 border border-amber-500/30 rounded-lg">
 <p className="text-amber-400 text-xs font-semibold mb-1">Prescriber Note</p>
 <p className="text-muted text-xs">
 This supplement stack applies on top of GLP-1 therapy. Berberine + GLP-1 combination
 requires monitoring for hypoglycemia. Mitochondrial support (CoQ10, L-carnitine, NAD+)
 is especially important to add at initiation to prevent the fatigue and muscle loss common
 at weeks 4-8 of GLP-1 treatment.
 </p>
 </div>
 </div>
 </ScrollFade>
 </div>
 </section>

 <FullscriptCTA
 highlights={[
 "Berberine HCl",
 "Alpha-lipoic acid",
 "Chromium picolinate",
 "Inositol (myo + d-chiro)",
 "Omega-3 EPA/DHA",
 "Magnesium glycinate",
 ]}
 />

 <section className="py-16 bg-surface/60">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="bg-surface border border-line rounded-lg p-8 text-center">
 <h2 className="font-serif text-2xl font-bold text-ink mb-4">Need GLP-1 Therapy?</h2>
 <p className="text-muted mb-6">For patients with higher HbA1c or significant weight loss goals, physician-prescribed GLP-1s (semaglutide, tirzepatide) may be appropriate.</p>
 <Link href="/services#weight-management" className="inline-block px-8 py-4 bg-accent text-[color:var(--on-accent)] font-semibold rounded hover:bg-accent-hover transition-colors">
 View Weight Management
 </Link>
 </div>
 </div>
 </section>
 </ProtocolPaywall>
 </Suspense>
 </>
 );
}
