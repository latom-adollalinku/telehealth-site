import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import ScrollFade from "../../components/ScrollFade";
import FullscriptCTA from "../../components/FullscriptCTA";
import ProtocolPaywall from "../../components/ProtocolPaywall";

export const metadata: Metadata = {
 title: "Hangover Prevention & Recovery Protocol | NAC, DHM, Electrolytes",
 description:
 "Evidence-based hangover prevention and recovery. NAC, dihydromyricetin, B-complex, electrolytes. What to take before, during, and after drinking.",
};

const preDrinkStack = [
 { name: "NAC (N-Acetylcysteine)", dose: "600 mg", target: "Replenishes glutathione - supports alcohol metabolism" },
 { name: "Dihydromyricetin (DHM)", dose: "300 mg", target: "GABA receptor support - reduces next-day anxiety" },
 { name: "B-Complex", dose: "1 capsule", target: "Alcohol depletes B1, B6, B12 rapidly" },
 { name: "Electrolytes + 16oz water", dose: "1 packet", target: "Prevents dehydration head start" },
];

const duringDrinkStack = [
 { name: "Alternate with water", dose: "1:1 ratio", target: "Single best intervention" },
 { name: "Electrolyte water", dose: "every 2 drinks", target: "Maintains sodium and potassium" },
 { name: "Eat before and during", dose: "Protein + fat", target: "Slows alcohol absorption" },
];

const beforeBedStack = [
 { name: "NAC", dose: "600 mg", target: "Second dose - continues detox overnight" },
 { name: "Vitamin C", dose: "1,000 mg", target: "Antioxidant + acetaldehyde detox" },
 { name: "Magnesium Glycinate", dose: "400 mg", target: "Alcohol depletes - prevents morning headache" },
 { name: "Electrolytes + 20oz water", dose: "Large glass", target: "Overnight rehydration" },
];

const morningAfterStack = [
 { name: "Electrolytes + water", dose: "Repeat packet", target: "Rehydrate continues" },
 { name: "B-Complex", dose: "1 capsule", target: "Replace depleted B vitamins" },
 { name: "Milk Thistle (Silymarin)", dose: "300 mg", target: "Liver support" },
 { name: "Ginger (capsule or tea)", dose: "500 mg", target: "Nausea relief" },
 { name: "Glutathione (liposomal)", dose: "500 mg", target: "Direct antioxidant replacement" },
];

export default function HangoverProtocolPage() {
 return (
 <>
 <section className="relative pt-32 pb-20 overflow-hidden">
 <div className="absolute inset-0 bg-bg" />
 <div className="absolute inset-0 " />
 <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-line bg-accent-soft mb-8">
 <span className="text-accent text-xs tracking-widest uppercase font-medium">
 Hangover Protocol
 </span>
 </div>
 <h1 className="font-serif text-5xl sm:text-6xl font-bold text-ink mb-6">
 Hangover Prevention
 <span className="block gold-gradient">&amp; Recovery Protocol</span>
 </h1>
 <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
 Physician-designed stack for the before, during, and after. Not a license to drink more - 
 a harm reduction protocol when you&apos;re going to drink anyway.
 </p>
 </div>
 </section>

 <section className="py-16">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
 <ScrollFade>
 <div className="bg-surface border border-line rounded-xl p-8">
 <h2 className="font-serif text-2xl font-bold text-ink mb-4">The Science: What Actually Causes a Hangover</h2>
 <p className="text-muted text-sm mb-4">
 Alcohol is metabolized to acetaldehyde - a toxic intermediate that causes most hangover
 symptoms. Your body uses glutathione to clear it. Heavy drinking depletes glutathione faster
 than you can make it. That&apos;s why NAC (a glutathione precursor) is the single most useful
 supplement in this protocol.
 </p>
 <p className="text-muted text-sm mb-4">
 Alcohol is also a diuretic (you pee out 4 oz for every 8 oz of alcohol) and depletes
 B vitamins, magnesium, and electrolytes. By morning you&apos;re dehydrated and nutrient-depleted.
 </p>
 <p className="text-muted text-sm">
 The protocol addresses both: upregulate detoxification before and during drinking, replace
 what was lost afterward.
 </p>
 </div>
 </ScrollFade>
 </div>
 </section>

 <Suspense fallback={null}>
 <ProtocolPaywall protocolId="hangover" protocolName="Hangover Protocol" price="$10">
 <section className="py-24 bg-surface/60">
 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
 <ScrollFade>
 <div className="text-center mb-12">
 <h2 className="font-serif text-4xl font-bold text-ink mb-4">The 4-Phase Protocol</h2>
 </div>
 </ScrollFade>
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
 {[
 { label: "1 Hour Before", time: "Pre-drink prep", items: preDrinkStack, color: "from-green-600 to-green-800" },
 { label: "During Drinking", time: "Harm reduction", items: duringDrinkStack, color: "from-amber-600 to-amber-800" },
 { label: "Before Bed", time: "Before sleep", items: beforeBedStack, color: "from-indigo-600 to-indigo-800" },
 { label: "Morning After", time: "If you still feel rough", items: morningAfterStack, color: "from-purple-600 to-purple-800" },
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
 <h3 className="font-serif text-2xl font-bold text-ink mb-4">Best Practices</h3>
 <ul className="space-y-3 text-muted text-sm">
 <li><strong className="text-accent">Clear over dark liquor:</strong> Vodka, gin, white wine have fewer congeners than bourbon, red wine, or tequila. Congeners drive worse hangovers.</li>
 <li><strong className="text-accent">Eat protein + fat first:</strong> Slows alcohol absorption, blunts peak BAC.</li>
 <li><strong className="text-accent">Water between every drink:</strong> Literally the single best intervention. Do this first, add supplements later.</li>
 <li><strong className="text-accent">Don&apos;t take acetaminophen (Tylenol):</strong> With alcohol, it damages the liver. Ibuprofen or aspirin only.</li>
 <li><strong className="text-accent">Sleep matters more than supplements:</strong> A hangover with 8 hours sleep is half as bad as with 4 hours.</li>
 </ul>
 </div>
 </ScrollFade>
 </div>
 </section>

 <section className="py-16 bg-surface/60">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
 <ScrollFade>
 <div className="bg-surface border border-amber-500/30 rounded-xl p-8">
 <h3 className="text-amber-400 font-semibold mb-4">Safety Notes</h3>
 <ul className="space-y-3 text-muted text-sm">
 <li><strong className="text-ink">Not a license:</strong> This protocol reduces hangover severity. It does NOT make heavy drinking safe.</li>
 <li><strong className="text-ink">NAC + alcohol limits:</strong> NAC protects the liver from alcohol damage but doesn&apos;t prevent it. If you drink heavily often, see a physician.</li>
 <li><strong className="text-ink">Never mix with Tylenol:</strong> Alcohol + acetaminophen = liver toxicity. Even therapeutic doses.</li>
 <li><strong className="text-ink">Pregnancy / liver disease:</strong> Do not use this to drink more. Abstinence is the answer.</li>
 </ul>
 </div>
 </ScrollFade>
 </div>
 </section>
 <FullscriptCTA
 highlights={[
 "NAC (N-acetyl cysteine)",
 "Milk thistle (silymarin standardized)",
 "Electrolyte powder",
 "B-complex (high B1/B6/B12)",
 "Glutathione (liposomal)",
 "Vitamin C (buffered)",
 ]}
 />

 </ProtocolPaywall>
 </Suspense>
 </>
 );
}
