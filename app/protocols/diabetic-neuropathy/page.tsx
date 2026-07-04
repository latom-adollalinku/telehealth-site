import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import ScrollFade from "../../components/ScrollFade";
import FullscriptCTA from "../../components/FullscriptCTA";
import ProtocolPaywall from "../../components/ProtocolPaywall";

export const metadata: Metadata = {
 title: "Diabetic Neuropathy Recovery Protocol | TTFD, Benfotiamine & ALA",
 description:
 "Evidence-based protocol for diabetic neuropathy. TTFD, benfotiamine, alpha-lipoic acid, and acetyl-L-carnitine - including the high-bioavailability B1 derivative TTFD developed in Japan.",
};

const morningStack = [
 { name: "Benfotiamine", dose: "300 mg", target: "Fat-soluble B1 - crosses into nerves, reduces AGEs" },
 { name: "TTFD (Allithiamine)", dose: "100-200 mg", target: "Crosses blood-brain barrier - developed in Japan 1950" },
 { name: "Alpha-Lipoic Acid", dose: "600 mg", target: "Neuropathic pain reduction (approved for this use in Germany)" },
 { name: "Acetyl-L-Carnitine", dose: "1,000 mg", target: "Nerve fiber regeneration" },
];

const middayStack = [
 { name: "Methylcobalamin (B12)", dose: "1,000 mcg sublingual", target: "Active B12 - rebuilds myelin sheath" },
 { name: "R-Lipoic Acid (optional)", dose: "300 mg", target: "The active isomer of ALA" },
 { name: "Magnesium Glycinate", dose: "400 mg", target: "Nerve signaling cofactor" },
];

const eveningStack = [
 { name: "Benfotiamine", dose: "300 mg", target: "Second dose - sustained nerve protection" },
 { name: "Alpha-Lipoic Acid", dose: "600 mg", target: "Second dose - antioxidant regeneration" },
 { name: "Vitamin D3", dose: "5,000 IU", target: "Diabetic neuropathy often comorbid with D deficiency" },
 { name: "Berberine", dose: "500 mg", target: "Addresses root cause - glucose control" },
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
 <div className="absolute inset-0 bg-bg" />
 <div className="absolute inset-0 " />
 <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-line bg-accent-soft mb-8">
 <span className="text-accent text-xs tracking-widest uppercase font-medium">
 Neuropathy Recovery
 </span>
 </div>
 <h1 className="font-serif text-5xl sm:text-6xl font-bold text-ink mb-6">
 Diabetic Neuropathy
 <span className="block gold-gradient">Recovery Protocol</span>
 </h1>
 <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
 Early-stage diabetic neuropathy is reversible with the right nerve-specific nutrients.
 TTFD and benfotiamine - Japanese innovations from the 1950s - are the foundation.
 Most doctors don&apos;t prescribe them because they&apos;re not drugs.
 </p>
 </div>
 </section>

 <section className="py-16">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
 <ScrollFade>
 <div className="bg-surface border border-line rounded-xl p-8">
 <h2 className="font-serif text-2xl font-bold text-ink mb-4">The History: Why We Have TTFD and Benfotiamine</h2>
 <p className="text-muted text-sm mb-4">
 In the 1870s, Japan industrialized polished white rice. Thousands of sailors started dying
 of a mystery disease called <em>kakke</em> - weakness, heart failure, brain damage.
 </p>
 <p className="text-muted text-sm mb-4">
 Japanese naval surgeon Kanehiro Takaki proved in 1884 that it was a nutritional deficiency - 
 30 years before vitamins were even named. The missing nutrient was vitamin B1 (thiamine),
 stripped out during rice polishing.
 </p>
 <p className="text-muted text-sm mb-4">
 Regular thiamine is water-soluble and doesn&apos;t cross the blood-brain barrier well. In 1950,
 Japanese scientists at Sankyo studying garlic extract created <strong className="text-accent">allithiamines</strong> - 
 fat-soluble B1 analogs. TTFD and benfotiamine can enter nerves and the brain where regular
 B1 cannot.
 </p>
 <p className="text-muted text-sm">
 These compounds are the reason diabetic neuropathy is reversible in its early stages.
 Germany has used them as first-line therapy for decades. US medicine largely ignored them
 because they weren&apos;t profitable drugs - they&apos;re supplements.
 </p>
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
 <ProtocolPaywall protocolId="diabetic-neuropathy" protocolName="Diabetic Neuropathy Recovery" price="$10">
 <section className="py-24 bg-surface/60">
 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
 <ScrollFade>
 <div className="text-center mb-12">
 <h2 className="font-serif text-4xl font-bold text-ink mb-4">Daily Stack</h2>
 </div>
 </ScrollFade>
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
 {[
 { label: "Morning", time: "With breakfast", items: morningStack, color: "from-red-600 to-red-800" },
 { label: "Midday", time: "With lunch", items: middayStack, color: "from-amber-600 to-amber-800" },
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
 <h3 className="font-serif text-2xl font-bold text-ink mb-4">Root Cause: Control Glucose First</h3>
 <p className="text-muted text-sm mb-4">
 Nerve damage accumulates when HbA1c is above 6.5%. The supplements above accelerate healing,
 but nothing works long-term if blood sugar stays high.
 </p>
 <ul className="space-y-3 text-muted text-sm">
 <li><strong className="text-accent">Tight glucose control:</strong> Target HbA1c under 6.5%, ideally 5.7-6.2%.</li>
 <li><strong className="text-accent">Walk after meals:</strong> 10-15 min walks cut post-meal glucose spikes 30%.</li>
 <li><strong className="text-accent">CGM tracking:</strong> Dexcom Stelo or Abbott Lingo - real-time feedback beats quarterly HbA1c.</li>
 <li><strong className="text-accent">Protein first, carbs last:</strong> Meal sequencing blunts glucose response.</li>
 <li><strong className="text-accent">Resistance training:</strong> 2-3x/week. Muscle is the primary glucose disposal site.</li>
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
 { item: "Benfotiamine (600mg/day)", cost: "$25–40" },
 { item: "TTFD (Allithiamine)", cost: "$30–50" },
 { item: "Alpha-Lipoic Acid (1200mg)", cost: "$20–30" },
 { item: "Acetyl-L-Carnitine", cost: "$20–30" },
 { item: "Methylcobalamin B12", cost: "$10–15" },
 { item: "Berberine", cost: "$15–25" },
 { item: "Vitamin D + Magnesium", cost: "$15–20" },
 ].map((row, i) => (
 <div key={i} className="flex items-center justify-between px-6 py-3">
 <span className="text-muted text-sm">{row.item}</span>
 <span className="text-accent font-mono text-sm">{row.cost}</span>
 </div>
 ))}
 <div className="flex items-center justify-between px-6 py-4 bg-bg">
 <span className="text-ink font-semibold">Total Monthly Cost</span>
 <span className="font-serif text-2xl font-bold text-accent">$135–210</span>
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
 <li><strong className="text-ink">Berberine + diabetes meds:</strong> Additive glucose-lowering. Monitor for hypoglycemia. Often allows medication reduction - with physician guidance.</li>
 <li><strong className="text-ink">ALA + thyroid medication:</strong> Take 4+ hours apart. ALA can interfere with thyroid hormone.</li>
 <li><strong className="text-ink">TTFD odor:</strong> TTFD contains sulfur - some people get body odor. Benfotiamine alone is odorless if that&apos;s a concern.</li>
 <li><strong className="text-ink">Advanced neuropathy:</strong> Long-standing severe neuropathy won&apos;t fully reverse. Early-stage responds best.</li>
 <li><strong className="text-ink">Work with endocrinologist:</strong> This protocol complements medical care. Don&apos;t replace it.</li>
 </ul>
 </div>
 </ScrollFade>
 </div>
 </section>

 <FullscriptCTA
 highlights={[
 "Alpha-lipoic acid (R-form)",
 "Benfotiamine",
 "Methyl B12 (high-dose sublingual)",
 "Acetyl-L-carnitine",
 "Magnesium glycinate",
 "Methylfolate (5-MTHF)",
 ]}
 />

 <section className="py-16 bg-surface/60">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="bg-surface border border-line rounded-lg p-8 text-center">
 <h2 className="font-serif text-2xl font-bold text-ink mb-4">Want a Custom Neuropathy Plan?</h2>
 <p className="text-muted mb-6">Book a lab review. Bring your HbA1c, B12, and diabetes medications for a personalized protocol.</p>
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
