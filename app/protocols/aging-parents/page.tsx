import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import ScrollFade from "../../components/ScrollFade";
import FullscriptCTA from "../../components/FullscriptCTA";
import ProtocolPaywall from "../../components/ProtocolPaywall";

export const metadata: Metadata = {
 title: "Aging Parents Essentials Protocol | Drug-Nutrient Depletion Recovery",
 description:
 "If your parent takes 5+ medications they likely have undiagnosed nutrient deficiencies causing fatigue, brain fog, and weakness. Physician-designed essential stack.",
};

const morningStack = [
 { name: "B-Complex (Active Form)", dose: "1 capsule", target: "Replaces B1, B6, B9, B12 depleted by common drugs" },
 { name: "Benfotiamine", dose: "300 mg", target: "Fat-soluble B1 - crosses into nerves (metformin depletion)" },
 { name: "CoQ10 / Ubiquinol", dose: "200 mg", target: "Depleted by statins - muscle pain, fatigue" },
 { name: "Vitamin D3 + K2", dose: "2,000 IU + 100 mcg", target: "Bone health, fall prevention, immune" },
];

const middayStack = [
 { name: "Magnesium Glycinate", dose: "400 mg", target: "Depleted by PPIs and diuretics - heart rhythm, sleep" },
 { name: "Omega-3 EPA/DHA", dose: "2,000 mg", target: "Brain health, inflammation, triglycerides" },
 { name: "Vitamin B12 (Methylcobalamin)", dose: "1,000 mcg sublingual", target: "Metformin depletes absorption - prevents dementia-like symptoms" },
];

const eveningStack = [
 { name: "Magnesium Glycinate", dose: "200 mg", target: "Sleep quality, restless legs" },
 { name: "Potassium Citrate", dose: "99 mg", target: "Depleted by diuretics - leg cramps, weakness" },
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
 <div className="absolute inset-0 bg-bg" />
 <div className="absolute inset-0 " />
 <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-line bg-accent-soft mb-8">
 <span className="text-accent text-xs tracking-widest uppercase font-medium">
 For Your Parents
 </span>
 </div>
 <h1 className="font-serif text-5xl sm:text-6xl font-bold text-ink mb-6">
 Aging Parents
 <span className="block gold-gradient">Essentials Protocol</span>
 </h1>
 <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
 The average 70-year-old takes 5 prescriptions. Most cause nutrient deficiencies
 no doctor screens for. Fatigue, brain fog, muscle weakness get blamed on &ldquo;aging.&rdquo;
 This stack addresses the root cause.
 </p>
 </div>
 </section>

 <section className="py-16">
 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
 <ScrollFade>
 <div className="bg-surface border border-blue-500/30 rounded-xl p-8">
 <h2 className="font-serif text-2xl font-bold text-ink mb-4">Drug-Induced Nutrient Depletions (What Your Doctor Won&apos;t Tell You)</h2>
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
 <div key={i} className="bg-bg border border-line rounded p-3">
 <p className="text-ink font-semibold">{d.drug}</p>
 <p className="text-accent text-xs">Depletes: {d.depletes}</p>
 </div>
 ))}
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
 <ProtocolPaywall protocolId="aging-parents" protocolName="Aging Parents Essentials" price="$10">
 <section className="py-24 bg-surface/60">
 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
 <ScrollFade>
 <div className="text-center mb-12">
 <h2 className="font-serif text-4xl font-bold text-ink mb-4">Daily Stack</h2>
 <p className="text-muted max-w-xl mx-auto">Simple. One pill organizer. Share with whoever shops for them.</p>
 </div>
 </ScrollFade>
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
 {[
 { label: "Morning", time: "With breakfast", items: morningStack, color: "from-blue-600 to-blue-800" },
 { label: "Midday", time: "With lunch", items: middayStack, color: "from-teal-600 to-teal-800" },
 { label: "Evening", time: "With dinner", items: eveningStack, color: "from-indigo-600 to-indigo-800" },
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
 <h3 className="font-serif text-2xl font-bold text-ink mb-4">Quality-of-Life Multipliers</h3>
 <ul className="space-y-3 text-muted text-sm">
 <li><strong className="text-accent">10-min walks after meals:</strong> Single best intervention for glucose, mood, and sleep. Even in a wheelchair - movement matters.</li>
 <li><strong className="text-accent">Protein at every meal:</strong> 30g minimum. Elderly need more protein, not less. Sarcopenia is prevented, not reversed.</li>
 <li><strong className="text-accent">Morning sunlight:</strong> 10 min outside before 10 AM. Helps regulate fragmented sleep.</li>
 <li><strong className="text-accent">Hydration:</strong> Elderly have reduced thirst signals. 8 cups minimum. Dehydration mimics dementia.</li>
 <li><strong className="text-accent">Medication review yearly:</strong> Bring the full list to every doctor visit. Ask: &ldquo;What can we deprescribe?&rdquo;</li>
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
 <h3 className="text-ink font-semibold">Monthly Cost</h3>
 </div>
 <div className="divide-y divide-[var(--line)]">
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
 <span className="text-muted text-sm">{row.item}</span>
 <span className="text-accent font-mono text-sm">{row.cost}</span>
 </div>
 ))}
 <div className="flex items-center justify-between px-6 py-4 bg-bg">
 <span className="text-ink font-semibold">Total Monthly Cost</span>
 <span className="font-serif text-2xl font-bold text-accent">$115–175</span>
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
 <li><strong className="text-ink">On Coumadin/Warfarin:</strong> Do NOT add Vitamin K or omega-3 without physician approval. Affects INR.</li>
 <li><strong className="text-ink">Kidney disease:</strong> Potassium and magnesium must be physician-supervised. Do not add if CKD stage 3+.</li>
 <li><strong className="text-ink">Pill burden:</strong> If they already take 10+ pills, pick the top 3 (B-complex, CoQ10, Vitamin D). Don&apos;t add all 10.</li>
 <li><strong className="text-ink">Swallowing issues:</strong> Liquid B-complex and chewable D3 exist. Use those.</li>
 </ul>
 </div>
 </ScrollFade>
 </div>
 </section>

 <FullscriptCTA
 highlights={[
 "Multivitamin (50+)",
 "Omega-3 EPA/DHA",
 "Vitamin D + K2 MK-7",
 "CoQ10 / Ubiquinol",
 "Curcumin (high-bioavailability)",
 "Methyl B12 (sublingual)",
 ]}
 />

 <section className="py-16 bg-surface/60">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="bg-surface border border-line rounded-lg p-8 text-center">
 <h2 className="font-serif text-2xl font-bold text-ink mb-4">Want a Custom Plan for Your Parent?</h2>
 <p className="text-muted mb-6">Upload their medication list. Physician review of drug-nutrient interactions and customized stack.</p>
 <Link href="/book" className="inline-block px-8 py-4 bg-accent text-[color:var(--on-accent)] font-semibold rounded hover:bg-accent-hover transition-colors">
 Book Lab Review - $49.99
 </Link>
 </div>
 </div>
 </section>
 </ProtocolPaywall>
 </Suspense>
 </>
 );
}
