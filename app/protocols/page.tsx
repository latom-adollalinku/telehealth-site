import type { Metadata } from "next";
import Link from "next/link";
import ScrollFade from "../components/ScrollFade";

export const metadata: Metadata = {
 title: "Physician-Designed Protocols | Evidence-Based Supplement Stacks",
 description:
 "Evidence-based supplement protocols designed by a physician. Cardiovascular, metabolic, hormone, longevity, and surgical preop optimization.",
 robots: { index: false, follow: false },
};

import { protocols } from "../lib/protocolCatalog";

export default function ProtocolsPage() {
 return (
 <>
 {/* Hero */}
 <section className="relative pt-32 pb-20 overflow-hidden">
 <div className="absolute inset-0 bg-bg" />
 <div className="absolute inset-0 " />
 <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-line bg-accent-soft mb-8">
 <span className="text-accent text-xs tracking-widest uppercase font-medium">
 Physician-Designed Protocols
 </span>
 </div>
 <h1 className="font-serif text-5xl sm:text-6xl font-bold text-ink mb-6">
 Evidence-Based
 <span className="block gold-gradient">Supplement Protocols</span>
 </h1>
 <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
 Complete daily supplement stacks designed by a physician.
 Exact dosing, timing, brand recommendations, safety notes, and expected outcomes.
 </p>
 </div>
 </section>

 {/* How It Works */}
 <section className="py-16">
 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
 <ScrollFade>
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
 {[
 { step: "01", title: "Get Your Labs", detail: "Order through Fullscript, Rythm, or Quest. Or use labs from the past 90 days." },
 { step: "02", title: "Purchase the Protocol", detail: "Instant access to the complete daily stack - dosing, timing, brands, safety." },
 { step: "03", title: "Optional: Book Review", detail: "Add a 1:1 consultation to review your specific labs and customize the protocol." },
 ].map((item, i) => (
 <div key={i} className="text-center">
 <div className="w-12 h-12 mx-auto rounded-full bg-accent-soft border border-line flex items-center justify-center mb-4">
 <span className="text-accent font-bold text-sm">{item.step}</span>
 </div>
 <h3 className="text-ink font-semibold text-lg mb-2">{item.title}</h3>
 <p className="text-muted text-sm">{item.detail}</p>
 </div>
 ))}
 </div>
 </ScrollFade>
 </div>
 </section>

 {/* Protocol Cards */}
 <section className="py-16 bg-surface/60">
 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
 <ScrollFade>
 <div className="text-center mb-12">
 <h2 className="font-serif text-4xl font-bold text-ink mb-4">Available Protocols</h2>
 <p className="text-muted max-w-xl mx-auto">
 Each protocol is a complete, evidence-based supplement stack with exact dosing and timing.
 </p>
 </div>
 </ScrollFade>

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 {protocols.map((p, i) => (
 <ScrollFade key={p.id} delay={i * 75}>
 <div className="group h-full bg-surface border border-line rounded-xl p-8 hover:border-accent/40 hover:shadow-[0_0_30px_rgba(201,168,76,0.08)] transition-all duration-300 flex flex-col">
 <div className="flex items-center justify-between mb-4">
 <span className={`px-3 py-1 ${p.badgeColor} text-ink text-xs font-bold rounded-full`}>
 {p.badge}
 </span>
 <span className="font-serif text-3xl font-bold text-accent">{p.price}</span>
 </div>

 <h3 className="font-serif text-2xl font-bold text-ink mb-1">{p.title}</h3>
 <p className="text-accent text-sm mb-4">{p.subtitle}</p>
 <p className="text-muted text-sm leading-relaxed mb-6 flex-1">{p.description}</p>

 <div className="mb-4">
 <p className="text-faint text-xs uppercase tracking-wider mb-2">Targets markers</p>
 <div className="flex flex-wrap gap-2">
 {p.markers.map((m, j) => (
 <span key={j} className="px-2 py-1 bg-bg border border-line text-muted text-xs rounded">
 {m}
 </span>
 ))}
 </div>
 </div>

 <p className="text-faint text-xs mb-4">{p.duration}</p>

 <Link
 href={p.href}
 className="block w-full text-center px-6 py-3 bg-accent text-[color:var(--on-accent)] font-semibold rounded tracking-wide hover:bg-accent-hover transition-colors"
 >
 View Protocol
 </Link>
 </div>
 </ScrollFade>
 ))}
 </div>
 </div>
 </section>

 {/* Membership Inclusion */}
 <section className="py-24">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
 <ScrollFade>
 <div className="bg-surface border border-line rounded-lg p-8 sm:p-12 text-center">
 <p className="text-accent text-xs tracking-widest uppercase font-medium mb-4">
 Save With Membership
 </p>
 <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink mb-4">
 All Protocols Included
 </h2>
 <p className="text-muted max-w-2xl mx-auto mb-8">
 Optimization ($199/mo) and Premium Longevity ($399/mo) memberships include
 access to all protocols plus physician customization, lab coordination, and ongoing support.
 </p>
 <div className="flex flex-col sm:flex-row gap-4 justify-center">
 <Link href="/services" className="px-8 py-4 bg-accent text-[color:var(--on-accent)] font-semibold rounded hover:bg-accent-hover transition-colors">
 View Memberships
 </Link>
 <Link href="/book" className="px-8 py-4 border border-accent text-accent font-semibold rounded hover:bg-accent hover:text-[color:var(--on-accent)] transition-colors">
 Book Consultation
 </Link>
 </div>
 </div>
 </ScrollFade>
 </div>
 </section>
 </>
 );
}
