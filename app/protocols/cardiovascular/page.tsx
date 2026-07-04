import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import ScrollFade from "../../components/ScrollFade";
import FullscriptCTA from "../../components/FullscriptCTA";
import ProtocolPaywall from "../../components/ProtocolPaywall";

export const metadata: Metadata = {
 title: "Cardiovascular Optimization Protocol | Lp(a) & ApoB Management",
 description:
 "Evidence-based supplement protocol for elevated Lp(a) and ApoB. Physician-designed stack targeting genetic cardiovascular risk.",
};

const morningStack = [
 { name: "Nattokinase", dose: "2,000–4,000 FU", target: "Lp(a) reduction + fibrinolysis", evidence: "Moderate - 10-15% Lp(a) reduction" },
 { name: "Vitamin C", dose: "1,000 mg", target: "Pauling protocol - arterial wall integrity", evidence: "Theoretical + widely used in Lp(a) community" },
 { name: "L-Lysine", dose: "1,000 mg", target: "Blocks Lp(a) binding to arterial walls", evidence: "Pauling protocol - low risk, cheap" },
 { name: "Omega-3 (EPA/DHA)", dose: "2,000 mg", target: "Inflammation + triglycerides", evidence: "Strong - reduces CVD risk markers" },
 { name: "Berberine", dose: "500 mg", target: "ApoB / LDL particle reduction", evidence: "Strong - 15-25% LDL reduction" },
];

const afternoonStack = [
 { name: "Vitamin C", dose: "1,000 mg", target: "Divided dosing for better absorption" },
 { name: "L-Lysine", dose: "1,000 mg", target: "Sustained Lp(a) binding blockade" },
 { name: "Berberine", dose: "500 mg", target: "Sustained LDL / ApoB lowering" },
];

const eveningStack = [
 { name: "CoQ10", dose: "200–400 mg", target: "Cardiovascular protection" },
 { name: "L-Carnitine", dose: "1,000 mg", target: "Lp(a) reduction" },
 { name: "Citrus Bergamot", dose: "500 mg", target: "ApoB / LDL lowering + HDL support" },
 { name: "Niacin (ER)", dose: "500–1,500 mg", target: "Strongest natural Lp(a) reducer (20-30%)" },
];

const targets = [
 { marker: "Lp(a)", current: ">100 nmol/L", goal: "<75 nmol/L", realistic: "80–95 (15-30% reduction)", timeline: "3-6 months" },
 { marker: "ApoB", current: ">100 mg/dL", goal: "<80 mg/dL", realistic: "75–90 (15-25% reduction)", timeline: "3-6 months" },
 { marker: "hs-CRP", current: ">2.0 mg/L", goal: "<1.0 mg/L", realistic: "<1.0 with omega-3 + lifestyle", timeline: "6-8 weeks" },
 { marker: "LDL-C", current: ">100 mg/dL", goal: "<70–100 mg/dL", realistic: "Follows ApoB reduction", timeline: "3-6 months" },
];

export default function CardiovascularProtocolPage() {
 return (
 <>
 {/* Hero - FREE */}
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
 Cardiovascular
 <span className="block gold-gradient">Optimization Protocol</span>
 </h1>
 <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
 Evidence-based supplement stack for elevated Lp(a), ApoB, and hs-CRP.
 Physician-designed for patients with genetic cardiovascular risk.
 </p>
 </div>
 </section>

 {/* Who This Is For - FREE */}
 <section className="py-16">
 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
 <ScrollFade>
 <div className="bg-surface border border-red-500/30 rounded-xl p-8">
 <h2 className="font-serif text-2xl font-bold text-ink mb-4">Who This Protocol Is For</h2>
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
 <div>
 <p className="text-red-400 font-semibold text-sm mb-1">Elevated Lp(a)</p>
 <p className="text-muted text-sm">&gt;75 nmol/L - genetic, independent cardiovascular risk factor. Diet and exercise alone won&apos;t fix it.</p>
 </div>
 <div>
 <p className="text-amber-400 font-semibold text-sm mb-1">High ApoB</p>
 <p className="text-muted text-sm">&gt;100 mg/dL - elevated atherogenic particle count. More accurate than LDL alone.</p>
 </div>
 <div>
 <p className="text-amber-400 font-semibold text-sm mb-1">Elevated hs-CRP</p>
 <p className="text-muted text-sm">&gt;2.0 mg/L - systemic inflammation that compounds Lp(a) risk.</p>
 </div>
 </div>
 </div>
 </ScrollFade>
 </div>
 </section>

 {/* Targets - FREE */}
 <section className="py-16 bg-surface/60">
 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
 <ScrollFade>
 <div className="text-center mb-12">
 <h2 className="font-serif text-4xl font-bold text-ink mb-4">Target Outcomes</h2>
 <p className="text-muted">Expected results after 3-6 months on full protocol.</p>
 </div>
 </ScrollFade>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
 {targets.map((t, i) => (
 <ScrollFade key={i} delay={i * 75}>
 <div className="bg-surface border border-line rounded-xl p-6 text-center hover:border-accent/40 transition-all">
 <p className="text-accent font-bold text-lg mb-1">{t.marker}</p>
 <p className="text-red-400 text-sm line-through mb-1">{t.current}</p>
 <p className="text-green-400 font-serif text-2xl font-bold mb-2">{t.goal}</p>
 <p className="text-faint text-xs">{t.realistic}</p>
 <p className="text-faint text-xs mt-1">{t.timeline}</p>
 </div>
 </ScrollFade>
 ))}
 </div>
 </div>
 </section>

 {/* PAYWALL - everything below requires purchase */}
 <Suspense fallback={null}>
 <ProtocolPaywall protocolId="cardiovascular" protocolName="Cardiovascular Protocol" price="$49">
 {/* Daily Protocol - LOCKED */}
 <section className="py-24 bg-surface/60">
 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
 <ScrollFade>
 <div className="text-center mb-12">
 <h2 className="font-serif text-4xl font-bold text-ink mb-4">Daily Protocol</h2>
 <p className="text-muted max-w-xl mx-auto">Split across three time blocks for optimal absorption and sustained effect.</p>
 </div>
 </ScrollFade>
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
 {[
 { label: "Morning", time: "With breakfast", items: morningStack, color: "from-amber-600 to-amber-800" },
 { label: "Afternoon", time: "With lunch", items: afternoonStack, color: "from-teal-600 to-teal-800" },
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

 {/* Pauling Protocol - LOCKED */}
 <section className="py-16">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
 <ScrollFade>
 <div className="bg-surface border border-line rounded-xl p-8">
 <h3 className="font-serif text-2xl font-bold text-ink mb-4">The Pauling Protocol</h3>
 <p className="text-muted text-sm mb-6">
 Nobel laureate Linus Pauling proposed that Lp(a) is the body&apos;s repair mechanism for
 vitamin C-deficient arteries. His protocol strengthens arterial walls so the body doesn&apos;t
 need to deploy Lp(a) as a patch.
 </p>
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
 {[
 { supp: "Vitamin C", dose: "3–6 g/day", role: "Strengthens arterial walls" },
 { supp: "L-Lysine", dose: "3–6 g/day", role: "Blocks Lp(a) from binding" },
 { supp: "L-Proline", dose: "500–2,000 mg/day", role: "Supports collagen matrix" },
 ].map((p, i) => (
 <div key={i} className="bg-bg border border-line rounded-lg p-4 text-center">
 <p className="text-accent font-semibold mb-1">{p.supp}</p>
 <p className="text-ink font-mono text-sm mb-1">{p.dose}</p>
 <p className="text-faint text-xs">{p.role}</p>
 </div>
 ))}
 </div>
 </div>
 </ScrollFade>
 </div>
 </section>

 {/* Monthly Cost - LOCKED */}
 <section className="py-16 bg-surface/60">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
 <ScrollFade>
 <div className="bg-surface border border-line rounded-xl overflow-hidden">
 <div className="px-6 py-4 bg-bg border-b border-line">
 <h3 className="text-ink font-semibold">Monthly Supplement Cost</h3>
 </div>
 <div className="divide-y divide-[var(--line)]">
 {[
 { item: "Nattokinase (2000+ FU)", cost: "$15–25" },
 { item: "CoQ10 (200–400mg)", cost: "$20–30" },
 { item: "Omega-3 EPA/DHA (2g)", cost: "$15–25" },
 { item: "Vitamin C (2g)", cost: "$5–10" },
 { item: "L-Lysine (2g)", cost: "$8–12" },
 { item: "L-Carnitine (1g)", cost: "$12–18" },
 { item: "Berberine (1g)", cost: "$15–20" },
 { item: "Citrus Bergamot (500mg)", cost: "$15–25" },
 { item: "Niacin ER (500–1500mg)", cost: "$10–15" },
 ].map((row, i) => (
 <div key={i} className="flex items-center justify-between px-6 py-3">
 <span className="text-muted text-sm">{row.item}</span>
 <span className="text-accent font-mono text-sm">{row.cost}</span>
 </div>
 ))}
 <div className="flex items-center justify-between px-6 py-4 bg-bg">
 <span className="text-ink font-semibold">Total Monthly Cost</span>
 <span className="font-serif text-2xl font-bold text-accent">$115–180</span>
 </div>
 </div>
 </div>
 </ScrollFade>
 </div>
 </section>

 {/* Safety Notes - LOCKED */}
 <section className="py-16">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
 <ScrollFade>
 <div className="bg-surface border border-amber-500/30 rounded-xl p-8">
 <h3 className="text-amber-400 font-semibold mb-4">Safety Notes</h3>
 <ul className="space-y-3 text-muted text-sm">
 <li><strong className="text-ink">Niacin titration:</strong> Start at 500mg, increase 500mg every 2 weeks. Take with food at night. Monitor liver enzymes after 6-8 weeks.</li>
 <li><strong className="text-ink">Nattokinase:</strong> Stop 2 weeks before any surgery. Do not combine with blood thinners without physician approval.</li>
 <li><strong className="text-ink">Berberine:</strong> May lower blood sugar - monitor if diabetic. Interacts with CYP-metabolized medications.</li>
 <li><strong className="text-ink">Recheck labs:</strong> Full panel (Lp(a), ApoB, hs-CRP, lipids, liver) after 3-6 months.</li>
 </ul>
 </div>
 </ScrollFade>
 </div>
 </section>

 <FullscriptCTA
 highlights={[
 "Omega-3 EPA/DHA (high-EPA formula)",
 "CoQ10 / Ubiquinol",
 "Bergamot extract",
 "Vitamin K2 MK-7",
 "Niacin (no-flush)",
 "Magnesium taurate",
 ]}
 />

 {/* CTA - visible when unlocked */}
 <section className="py-16 bg-surface/60">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="bg-surface border border-line rounded-lg p-8 text-center">
 <h2 className="font-serif text-2xl font-bold text-ink mb-4">Want Personalized Dosing?</h2>
 <p className="text-muted mb-6">Book a consultation for labs review + customized protocol.</p>
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
