import type { Metadata } from "next";
import Link from "next/link";
import ScrollFade from "./components/ScrollFade";
import { HeroReveal, StaggerGroup, StaggerItem } from "./components/Motion";
import EmailCapture from "./components/EmailCapture";

export const metadata: Metadata = {
 title: "LATOM Wellness | The Labs Your Annual Physical Doesn't Order",
 description:
 "Personalized lab review and longevity consultation. Comprehensive panels at up to 60% off retail. Evidence-based supplement protocols. Cash-pay, no insurance hassle.",
};

const labCategories = [
 {
 title: "Metabolic Health",
 description:
 "Fasting insulin, HbA1c, advanced lipid panel with ApoB and Lp(a), high-sensitivity CRP. Catch insulin resistance and cardiovascular risk before they become disease.",
 },
 {
 title: "Gut Health",
 description:
 "Comprehensive stool analysis, celiac screen, calprotectin, food sensitivity panels. Pinpoint the root cause of bloating, brain fog, and fatigue.",
 },
 {
 title: "Hormone Health Education",
 description:
 "Full sex hormone panel including sensitive estradiol assay, DHEA-S, comprehensive thyroid (not just TSH), cortisol patterns. For men and women.",
 },
 {
 title: "Longevity and Cardiovascular Risk",
 description:
 "Lp(a), ApoB, NMR LipoProfile, homocysteine, Lp-PLA2. The risk markers that predict disease decades before symptoms.",
 },
 {
 title: "Energy and Fatigue",
 description:
 "B12, ferritin, methylmalonic acid, full thyroid, cortisol pattern, mitochondrial markers. Find what is actually draining your energy.",
 },
 {
 title: "Brain and Cognitive Function",
 description:
 "Homocysteine, B vitamins, omega-3 index, inflammatory markers. For sharper thinking now and brain protection long-term.",
 },
];

const howItWorks = [
 {
 step: "1",
 title: "Book your consultation",
 detail: "30-minute video visit. Cash pay through Helcim. Choose your slot at checkout.",
 },
 {
 step: "2",
 title: "Get your labs",
 detail:
 "We order the panels that actually matter. Up to 60% off retail through our partner laboratory network.",
 },
 {
 step: "3",
 title: "Build your plan",
 detail:
 "Personalized supplement protocol via Fullscript, lifestyle plan, and follow-up schedule. Ongoing access through your patient portal.",
 },
];

const stats = [
 { value: "30+", label: "evidence-based wellness protocols" },
 { value: "60%", label: "average savings on lab panels" },
 { value: "100%", label: "physician supervised" },
 { value: "24hr", label: "physician response time" },
];

const whyDifferent = [
 {
 title: "Physician-led, not algorithm-led",
 detail:
 "Every consultation is with Dr. Abdul, MD. Not a nurse practitioner reading from a script. Not an AI chatbot. Real physician judgment on your numbers.",
 },
 {
 title: "Cash pay, transparent pricing",
 detail:
 "No insurance hoops. No surprise bills. Consultations are clearly priced. Labs are wholesale. Supplements are direct-ship through our dispensary at practitioner-only pricing.",
 },
 {
 title: "Built for optimization, not just disease care",
 detail:
 "We are not here to wait until you are sick. We work with you on prevention, optimization, longevity. The kind of medicine your primary care doctor does not have 15 minutes to do.",
 },
];

export default function HomePage() {
 return (
 <>
 {/* Hero */}
 <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
 <div className="absolute inset-0 bg-bg" />
 <div className="absolute inset-0 " />

 <div
 className="absolute inset-0 opacity-[0.025]"
 style={{
 backgroundImage:
 "linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)",
 backgroundSize: "80px 80px",
 }}
 />

 <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16">
 <HeroReveal delay={0}>
 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-line bg-accent-soft mb-8">
 <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
 <span className="text-accent text-xs tracking-widest uppercase font-medium">
 Now Accepting Patients
 </span>
 </div>
 </HeroReveal>

 <HeroReveal delay={0.1}>
 <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-ink leading-tight mb-6">
 Get the labs your
 <span className="block gold-gradient mt-1">annual physical doesn't order.</span>
 </h1>
 </HeroReveal>

 <HeroReveal delay={0.2}>
 <p className="text-muted text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
 Personalized lab review and longevity consultation. Comprehensive panels at up to 60% off retail.
 Evidence-based supplement protocols. Cash-pay, no insurance hassle.
 </p>
 </HeroReveal>

 <HeroReveal delay={0.3}>
 <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
 <Link
 href="/book"
 className="px-8 py-4 bg-accent text-[color:var(--on-accent)] font-semibold rounded tracking-wide hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[var(--accent)]/20 transition-all duration-200 text-sm sm:text-base"
 >
 Book a Consultation
 </Link>
 <Link
 href="#lead-magnet"
 className="px-8 py-4 border border-accent/40 text-accent font-semibold rounded tracking-wide hover:border-accent hover:bg-accent-soft hover:-translate-y-0.5 transition-all duration-200 text-sm sm:text-base"
 >
 Free Guide: 5 Labs to Track
 </Link>
 </div>
 </HeroReveal>

 <HeroReveal delay={0.4}>
 <p className="text-faint text-xs tracking-wide">
 Cash pay. HIPAA secure. Direct physician access.
 </p>
 </HeroReveal>
 </div>

 <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
 <div className="w-px h-8 bg-line" />
 </div>
 </section>

 {/* Stats */}
 <section className="py-16 border-y border-line bg-surface/50">
 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
 {stats.map((stat, i) => (
 <div key={i} className="text-center">
 <div className="font-serif text-4xl font-bold text-accent mb-1">
 {stat.value}
 </div>
 <div className="text-muted text-sm tracking-wide">
 {stat.label}
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* How It Works - connected process, left-aligned, ghost numerals */}
 <section className="py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <ScrollFade>
 <div className="mb-20 max-w-2xl">
 <p className="text-accent text-sm tracking-widest uppercase font-medium mb-3">
 How It Works
 </p>
 <h2 className="font-serif text-4xl sm:text-5xl font-bold text-ink leading-tight">
 Three steps to a personalized longevity plan
 </h2>
 </div>
 </ScrollFade>

 <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-14">
 {howItWorks.map((item, i) => (
 <StaggerItem key={i}>
 <div className="relative">
 {i < howItWorks.length - 1 && (
 <div className="hidden md:block absolute top-9 left-20 right-[-2.5rem] h-px bg-gradient-to-r /30 to-transparent" />
 )}
 <div className="font-serif text-7xl font-bold text-accent/20 leading-none mb-5 tabular-nums">
 0{item.step}
 </div>
 <h3 className="font-serif text-2xl font-bold text-ink mb-3">
 {item.title}
 </h3>
 <p className="text-muted text-sm leading-relaxed max-w-xs">
 {item.detail}
 </p>
 </div>
 </StaggerItem>
 ))}
 </StaggerGroup>
 </section>

 {/* Lab Categories - editorial index, numbered rows, hairline rules */}
 <section className="py-28 bg-surface/60 border-y border-white/[0.04]">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <ScrollFade>
 <div className="mb-16 max-w-2xl">
 <p className="text-accent text-sm tracking-widest uppercase font-medium mb-3">
 What We Test For
 </p>
 <h2 className="font-serif text-4xl sm:text-5xl font-bold text-ink leading-tight">
 The labs that show what standard care misses
 </h2>
 <p className="text-muted mt-4">
 We order the panels most physicians do not. Each consultation includes lab recommendations
 tailored to your goals and history.
 </p>
 </div>
 </ScrollFade>

 <StaggerGroup className="border-t border-white/10">
 {labCategories.map((cat, i) => (
 <StaggerItem key={i}>
 <div className="group grid grid-cols-[2.5rem_1fr] md:grid-cols-[4rem_1fr] gap-x-4 md:gap-x-8 py-7 border-b border-white/10 hover:bg-white/[0.015] transition-colors">
 <div className="font-serif text-2xl md:text-3xl text-accent/50 group-hover:text-accent transition-colors tabular-nums pt-1">
 {String(i + 1).padStart(2, "0")}
 </div>
 <div className="md:flex md:items-baseline md:gap-12">
 <h3 className="font-serif text-xl md:text-2xl font-bold text-ink mb-2 md:mb-0 md:w-72 md:flex-shrink-0">
 {cat.title}
 </h3>
 <p className="text-muted text-sm leading-relaxed md:flex-1">
 {cat.description}
 </p>
 </div>
 </div>
 </StaggerItem>
 ))}
 </StaggerGroup>
 </div>
 </section>

 {/* Why LATOM - big editorial statements, two-column rows */}
 <section className="py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <ScrollFade>
 <div className="mb-16 max-w-2xl">
 <p className="text-accent text-sm tracking-widest uppercase font-medium mb-3">
 Why Patients Choose LATOM
 </p>
 <h2 className="font-serif text-4xl sm:text-5xl font-bold text-ink leading-tight">
 Medicine first. Always.
 </h2>
 </div>
 </ScrollFade>

 <StaggerGroup>
 {whyDifferent.map((item, i) => (
 <StaggerItem key={i}>
 <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-3 md:gap-16 py-10 border-t border-white/10 last:border-b">
 <h3 className="font-serif text-2xl md:text-3xl font-bold text-ink leading-snug">
 {item.title}
 </h3>
 <p className="text-muted text-base leading-relaxed md:pt-2">
 {item.detail}
 </p>
 </div>
 </StaggerItem>
 ))}
 </StaggerGroup>
 </section>

 {/* About teaser */}
 <section className="py-24 bg-surface/60">
 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
 <ScrollFade>
 <div>
 <p className="text-accent text-sm tracking-widest uppercase font-medium mb-4">
 About Your Physician
 </p>
 <h2 className="font-serif text-4xl sm:text-5xl font-bold text-ink mb-6 leading-tight">
 Direct physician care.
 <span className="block text-accent">No middlemen.</span>
 </h2>
 <p className="text-muted text-base leading-relaxed mb-6">
 Dr. Abdul, MD, built LATOM Wellness to bring evidence-based longevity medicine
 directly to patients. Every protocol is physician-designed, evidence-based,
 and individually supervised.
 </p>
 <Link
 href="/about"
 className="inline-flex items-center gap-2 px-6 py-3 border border-accent/40 text-accent font-semibold rounded hover:border-accent hover:bg-accent-soft transition-all duration-200 text-sm"
 >
 Meet Dr. Abdul
 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
 </svg>
 </Link>
 </div>
 </ScrollFade>

 <ScrollFade delay={200}>
 <div className="space-y-4">
 {[
 {
 title: "Direct physician-led care",
 detail: "Every consultation is with Dr. Abdul, MD. No PA mid-levels.",
 },
 {
 title: "Evidence-based protocols only",
 detail: "Every treatment backed by clinical research and peer-reviewed literature.",
 },
 {
 title: "Physician-supervised programs",
 detail: "Every program is supervised by Dr. Abdul, MD. Clinical decisions are made individually, not algorithmically.",
 },
 {
 title: "Ongoing physician supervision",
 detail: "Monthly check-ins, lab reviews, and 24-hour response time for questions.",
 },
 ].map((item, i) => (
 <div
 key={i}
 className="flex gap-4 p-4 bg-surface border border-line rounded-lg"
 >
 <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
 <div>
 <div className="text-ink font-semibold text-sm mb-1">
 {item.title}
 </div>
 <div className="text-muted text-sm">{item.detail}</div>
 </div>
 </div>
 ))}
 </div>
 </ScrollFade>
 </div>
 </div>
 </section>

 {/* Lead Magnet Capture */}
 <section id="lead-magnet" className="py-24">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
 <ScrollFade>
 <div className="p-12 bg-gradient-to-br to-[#13132a] border border-line rounded-2xl">
 <p className="text-accent text-sm tracking-widest uppercase font-medium mb-4">
 Free Download
 </p>
 <h2 className="font-serif text-4xl sm:text-5xl font-bold text-ink mb-4">
 The 5 Labs Every High-Performing Adult Should Track
 </h2>
 <p className="text-muted text-lg mb-8 max-w-2xl mx-auto">
 Most doctors order four labs at your annual physical. There are at least five you
 should know about. Download the free guide and learn what to ask for, why each one
 matters, and how to get them at a fraction of retail cost.
 </p>
 <div className="max-w-md mx-auto">
 <EmailCapture
 placeholder="Your email"
 buttonText="Send me the guide"
 interest="lead-magnet-5-labs"
 successMessage="Your download is starting. Check your downloads folder."
 downloadUrl="/protocols/5-labs-every-high-performing-adult-should-track.pdf"
 downloadFilename="LATOM-5-Labs-Every-High-Performing-Adult-Should-Track.pdf"
 />
 </div>
 <p className="mt-4 text-faint text-xs">
 We respect your inbox. Unsubscribe any time.
 </p>
 </div>
 </ScrollFade>
 </div>
 </section>

 {/* CTA */}
 <section className="py-24 bg-surface/60 border-t border-line">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
 <ScrollFade>
 <div className="p-12">
 <p className="text-accent text-sm tracking-widest uppercase font-medium mb-4">
 Get Started
 </p>
 <h2 className="font-serif text-4xl sm:text-5xl font-bold text-ink mb-4">
 Ready for a real conversation about your health?
 </h2>
 <p className="text-muted text-lg mb-8 max-w-xl mx-auto">
 Book a 30-minute video consultation. Cash pay. No insurance. No insurance hoops.
 </p>
 <Link
 href="/book"
 className="inline-block px-10 py-4 bg-accent text-[color:var(--on-accent)] font-bold rounded tracking-wide hover:bg-accent-hover transition-colors"
 >
 Book a Consultation
 </Link>
 <p className="mt-4 text-faint text-xs">
 Currently accepting Virginia patients. Multi-state expansion in progress.
 </p>
 </div>
 </ScrollFade>
 </div>
 </section>
 </>
 );
}
