import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import ScrollFade from "../../components/ScrollFade";
import ProtocolPaywall from "../../components/ProtocolPaywall";

export const metadata: Metadata = {
 title: "GI Health and Gut Optimization Protocol | LATOM Wellness",
 description:
 "Find the root cause of bloating, brain fog, food sensitivities, and chronic gut symptoms. GI-MAP, celiac screen, calprotectin, plus a supplement protocol with DGL, NAC, zinc carnosine, L-glutamine, berberine.",
};

const previewSummary = {
 labs: [
 { name: "GI-MAP (Diagnostic Solutions)", what: "Comprehensive PCR stool panel: parasites, bacteria, yeast, inflammation markers", cost: "$300-400" },
 { name: "TTG-IgA + total IgA", what: "Celiac disease screen (must be eating gluten 6+ weeks)", cost: "$40-80" },
 { name: "Calprotectin", what: "Distinguishes inflammatory bowel disease from IBS", cost: "$80-120" },
 { name: "SIBO breath test", what: "Small intestinal bacterial overgrowth (hydrogen and methane)", cost: "$150-250" },
 ],
 patterns: [
 "Heartburn and reflux (DGL, zinc carnosine, NAC, PPI bridge if needed)",
 "Bloating and SIBO (berberine, peppermint oil, saccharomyces boulardii, L-glutamine)",
 "Diarrhea-predominant (saccharomyces, PHGG, rule out bile acid malabsorption)",
 "Constipation-predominant (magnesium citrate, vitamin C, soluble fiber)",
 "Mucosal healing baseline (L-glutamine, zinc carnosine, vitamin D, omega-3, colostrum)",
 ],
 rxOptions: [
 "PPI 8-12 week course (omeprazole) as bridge for GERD",
 "Rifaximin for hydrogen-positive SIBO, plus neomycin or metronidazole for methane-positive",
 "Linaclotide, lubiprostone, prucalopride for refractory constipation",
 ],
};

export default function GIHealthProtocolPage() {
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
 GI Health
 <span className="block gold-gradient">and Gut Optimization</span>
 </h1>
 <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
 Find the root cause of bloating, brain fog, food sensitivities, and chronic gut symptoms.
 Lab-driven, supplement-supported, prescription bridge when warranted.
 </p>
 </div>
 </section>

 <section className="py-16">
 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
 <ScrollFade>
 <div className="bg-surface border border-emerald-500/30 rounded-xl p-8">
 <h2 className="font-serif text-2xl font-bold text-ink mb-6">What's Inside the Full Protocol</h2>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 <div>
 <h3 className="text-accent text-sm tracking-widest uppercase font-medium mb-3">Lab Panel</h3>
 <ul className="space-y-3">
 {previewSummary.labs.map((lab, i) => (
 <li key={i} className="text-sm">
 <div className="text-ink font-semibold">{lab.name}</div>
 <div className="text-muted">{lab.what}</div>
 <div className="text-accent text-xs mt-1">{lab.cost}</div>
 </li>
 ))}
 </ul>
 </div>
 <div>
 <h3 className="text-accent text-sm tracking-widest uppercase font-medium mb-3">Supplement Protocols by Pattern</h3>
 <ul className="space-y-2">
 {previewSummary.patterns.map((p, i) => (
 <li key={i} className="text-muted text-sm flex gap-2">
 <span className="text-accent">-</span>
 <span>{p}</span>
 </li>
 ))}
 </ul>
 <h3 className="text-accent text-sm tracking-widest uppercase font-medium mt-6 mb-3">Prescription Options</h3>
 <ul className="space-y-2">
 {previewSummary.rxOptions.map((r, i) => (
 <li key={i} className="text-muted text-sm flex gap-2">
 <span className="text-accent">-</span>
 <span>{r}</span>
 </li>
 ))}
 </ul>
 </div>
 </div>
 </div>
 </ScrollFade>
 </div>
 </section>

 <Suspense fallback={null}>
 <ProtocolPaywall protocolId="gi-health" protocolName="GI Health Protocol" price="$10">
 <section className="py-16">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
 <div className="p-12 bg-surface border border-line rounded-xl">
 <h2 className="font-serif text-3xl font-bold text-ink mb-4">Your Protocol is Unlocked</h2>
 <p className="text-muted mb-8 max-w-xl mx-auto">
 The complete GI Health protocol PDF is ready. Includes full lab panel rationale,
 pattern-by-pattern supplement protocols with exact dosing, prescription bridge options,
 lifestyle and motility guidance, escalation triggers, and cost expectations.
 </p>
 <a
 href="/protocols/gi-health-protocol.pdf"
 download="LATOM-GI-Health-Protocol.pdf"
 className="inline-block px-10 py-4 bg-accent text-[color:var(--on-accent)] font-bold rounded tracking-wide hover:bg-accent-hover transition-colors"
 >
 Download Full Protocol PDF
 </a>
 <p className="mt-6 text-faint text-xs">
 Save the PDF to your device. You can also revisit this page any time.
 </p>
 </div>
 </div>
 </section>
 </ProtocolPaywall>
 </Suspense>

 <section className="py-16 border-t border-line">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
 <h3 className="font-serif text-2xl font-bold text-ink mb-4">Want personalized guidance?</h3>
 <p className="text-muted mb-6">Book a 30-minute consultation. We order the labs, interpret the results, and build the protocol with you.</p>
 <Link
 href="/book"
 className="inline-block px-8 py-3 border border-accent text-accent font-semibold rounded hover:bg-accent hover:text-[color:var(--on-accent)] transition-colors"
 >
 Book a Consultation
 </Link>
 </div>
 </section>
 </>
 );
}
