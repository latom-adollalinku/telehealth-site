import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import ScrollFade from "../../components/ScrollFade";
import FullscriptCTA from "../../components/FullscriptCTA";
import ProtocolPaywall from "../../components/ProtocolPaywall";

export const metadata: Metadata = {
 title: "POTS Recovery Protocol | Electrolytes, Salt & Vagal Tone",
 description:
 "Postural Orthostatic Tachycardia Syndrome management protocol. Electrolytes, compression, vagal exercises, and the supplement stack for cardiovascular autonomic recovery.",
};

const morningStack = [
 { name: "Sodium (with water)", dose: "500-1,000 mg", target: "Expands blood volume - core POTS intervention" },
 { name: "Electrolyte Mix (LMNT or similar)", dose: "1 packet", target: "Sodium + potassium + magnesium" },
 { name: "Vitamin C", dose: "1,000 mg", target: "Collagen synthesis for vascular tone" },
 { name: "B-Complex", dose: "1 capsule", target: "B1/B6/B12 often deficient in POTS" },
];

const middayStack = [
 { name: "Magnesium Glycinate", dose: "400 mg", target: "Nervous system stability (avoid citrate - worsens diarrhea in POTS)" },
 { name: "CoQ10", dose: "200 mg", target: "Mitochondrial support - POTS has mitochondrial component" },
 { name: "L-Carnitine", dose: "1,000 mg", target: "Energy + cardiac function" },
];

const eveningStack = [
 { name: "Second electrolyte dose", dose: "500 mg sodium", target: "Overnight volume support" },
 { name: "Iron (if low ferritin)", dose: "Per labs", target: "POTS often has low ferritin - check first" },
 { name: "Melatonin (low-dose)", dose: "0.3-1 mg", target: "Sleep quality - POTS + insomnia common" },
];

const targets = [
 { marker: "Heart Rate on Standing", current: "+30 BPM", goal: "<20 BPM", realistic: "Volume + tone", timeline: "6-12 weeks" },
 { marker: "Fatigue", current: "Daily", goal: "Functional days", realistic: "Gradual", timeline: "8-16 weeks" },
 { marker: "Brain Fog", current: "Pervasive", goal: "Improved", realistic: "Cerebral perfusion", timeline: "4-8 weeks" },
 { marker: "Syncope/Pre-syncope", current: "Frequent", goal: "Rare", realistic: "Volume-driven", timeline: "4-6 weeks" },
];

export default function POTSProtocolPage() {
 return (
 <>
 <section className="relative pt-32 pb-20 overflow-hidden">
 <div className="absolute inset-0 bg-bg" />
 <div className="absolute inset-0 " />
 <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-line bg-accent-soft mb-8">
 <span className="text-accent text-xs tracking-widest uppercase font-medium">
 POTS Recovery
 </span>
 </div>
 <h1 className="font-serif text-5xl sm:text-6xl font-bold text-ink mb-6">
 POTS Recovery
 <span className="block gold-gradient">Protocol</span>
 </h1>
 <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
 Postural Orthostatic Tachycardia Syndrome. Most PCPs don&apos;t know what to do.
 This is the evidence-based foundation: volume expansion, vagal retraining, mitochondrial support.
 Not a cure - a management framework that makes life functional again.
 </p>
 </div>
 </section>

 <section className="py-16">
 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
 <ScrollFade>
 <div className="bg-surface border border-blue-500/30 rounded-xl p-8">
 <h2 className="font-serif text-2xl font-bold text-ink mb-4">Who This Protocol Is For</h2>
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
 <div>
 <p className="text-blue-400 font-semibold text-sm mb-1">Diagnosed POTS</p>
 <p className="text-muted text-sm">Tilt table or active stand test confirmed &gt;30 BPM increase on standing.</p>
 </div>
 <div>
 <p className="text-blue-400 font-semibold text-sm mb-1">Post-COVID Dysautonomia</p>
 <p className="text-muted text-sm">Long COVID symptoms with orthostatic intolerance. Same protocol applies.</p>
 </div>
 <div>
 <p className="text-blue-400 font-semibold text-sm mb-1">Unexplained Fatigue + HR</p>
 <p className="text-muted text-sm">Undiagnosed but high suspicion. Do tilt test first, then start protocol.</p>
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
 <ProtocolPaywall protocolId="pots" protocolName="POTS Recovery" price="$10">
 <section className="py-24 bg-surface/60">
 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
 <ScrollFade>
 <div className="text-center mb-12">
 <h2 className="font-serif text-4xl font-bold text-ink mb-4">Daily Stack</h2>
 </div>
 </ScrollFade>
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
 {[
 { label: "Morning", time: "Before getting out of bed", items: morningStack, color: "from-blue-600 to-blue-800" },
 { label: "Midday", time: "With meal", items: middayStack, color: "from-teal-600 to-teal-800" },
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
 <h3 className="font-serif text-2xl font-bold text-ink mb-4">Non-Supplement Interventions (Equally Important)</h3>
 <ul className="space-y-3 text-muted text-sm">
 <li><strong className="text-accent">Fluid target:</strong> 3 liters daily. Add salt. Dilute water worsens POTS - oral rehydration is the point.</li>
 <li><strong className="text-accent">Compression:</strong> 20-30 mmHg thigh-high stockings. Abdominal binders for severe cases.</li>
 <li><strong className="text-accent">Recumbent exercise first:</strong> Rowing, recumbent bike, swimming. Graded upright exercise comes later. Pushing upright cardio too early worsens POTS.</li>
 <li><strong className="text-accent">Vagal exercises:</strong> Slow breathing (4-in, 6-out), cold face immersion, humming. 10 min daily.</li>
 <li><strong className="text-accent">Head-of-bed elevation:</strong> 4-6 inches. Triggers nocturnal sodium retention.</li>
 <li><strong className="text-accent">Smaller, frequent meals:</strong> Large meals divert blood to gut, worsen symptoms.</li>
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
 { item: "Electrolyte packets (LMNT/similar)", cost: "$40–60" },
 { item: "Magnesium Glycinate", cost: "$15–20" },
 { item: "CoQ10 / L-Carnitine", cost: "$30–50" },
 { item: "B-Complex + Vitamin C", cost: "$20–30" },
 { item: "Iron (if needed)", cost: "$10–15" },
 { item: "Compression stockings (2 pairs)", cost: "$40–80 one-time" },
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
 <li><strong className="text-ink">Not a cure:</strong> POTS is a chronic condition. This protocol is management, not resolution.</li>
 <li><strong className="text-ink">Prescription options:</strong> Midodrine, fludrocortisone, ivabradine, beta-blockers - discuss with cardiologist. Supplements complement, don&apos;t replace.</li>
 <li><strong className="text-ink">Kidney/heart disease:</strong> High-sodium protocols require physician clearance.</li>
 <li><strong className="text-ink">Check ferritin:</strong> POTS often coexists with low iron. Get labs before supplementing.</li>
 <li><strong className="text-ink">MCAS overlap:</strong> Mast Cell Activation Syndrome coexists in ~40% of POTS cases. Different protocol if present.</li>
 </ul>
 </div>
 </ScrollFade>
 </div>
 </section>

 <FullscriptCTA
 highlights={[
 "Magnesium glycinate",
 "Sodium tablets (high-dose, salt sticks)",
 "B-complex (with B12)",
 "CoQ10 / Ubiquinol",
 "Adaptogen blend",
 "Electrolyte powder (high-sodium)",
 ]}
 />

 <section className="py-16 bg-surface/60">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="bg-surface border border-line rounded-lg p-8 text-center">
 <h2 className="font-serif text-2xl font-bold text-ink mb-4">Need Help Managing POTS?</h2>
 <p className="text-muted mb-6">Book a consultation. We&apos;ll review your labs, symptoms, and create a personalized management plan.</p>
 <Link href="/book" className="inline-block px-8 py-4 bg-accent text-[color:var(--on-accent)] font-semibold rounded hover:bg-accent-hover transition-colors">
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
