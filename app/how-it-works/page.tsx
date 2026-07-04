import type { Metadata } from "next";
import Link from "next/link";
import ScrollFade from "../components/ScrollFade";

export const metadata: Metadata = {
 title: "How It Works - Your Path to Better Health",
 description:
 "Start with a free consultation. Get your labs done. Receive a custom physician protocol. Medications shipped directly. Here is exactly how LATOM Wellness works.",
};

const steps = [
 {
 number: "01",
 title: "Free Consultation",
 description:
 "A 30-minute video call with a physician to discuss your goals, health history, and which treatment options may be right for you. No commitment, no pressure.",
 detail: "We review: your weight history, previous treatments, current medications, contraindications, and what you hope to achieve.",
 },
 {
 number: "02",
 title: "Lab Work & Assessment",
 description:
 "We order comprehensive bloodwork based on your program - metabolic panel, hormone levels, thyroid, CBC, and more. You can use a lab near you.",
 detail: "Results are reviewed by your physician within 48 hours. Lab panels are included in most programs, or we can work with recent labs you already have.",
 },
 {
 number: "03",
 title: "Custom Protocol",
 description:
 "Your physician designs a personalized treatment plan - specific medications, doses, titration schedule, and lifestyle recommendations.",
 detail: "No cookie-cutter protocols. Your plan is built around your labs, history, and goals. You receive a full written protocol with injection instructions.",
 },
 {
 number: "04",
 title: "Your Program Begins",
 description:
 "Your consultation program is delivered digitally. If your physician determines a prescription is appropriate, it routes through standard pharmacy channels.",
 detail: "All prescription decisions are made by your physician based on your specific health history and lab results. You receive complete written guidance and a dosing schedule.",
 },
];

const faqs = [
 {
 question: "Is this legal?",
 answer:
 "Yes. LATOM Wellness is a licensed physician-led telehealth practice. All clinical consultations are conducted by a licensed physician. Any prescriptions issued are FDA-approved medications dispensed through standard licensed US pharmacy channels.",
 },
 {
 question: "Do I need lab work?",
 answer:
 "Yes. We require baseline bloodwork before starting most programs - this is for your safety and to establish a baseline we can compare against over time. Follow-up labs are included in select plans. We can work with labs you've had in the past 90 days if they're comprehensive enough.",
 },
 {
 question: "How often do I see the doctor?",
 answer:
 "Monthly video check-ins are included in all programs. These are real physician appointments - not a nurse or PA. You'll review how you're feeling, adjust doses if needed, and discuss any questions. Between appointments, you can message the practice directly.",
 },
 {
 question: "What if I have side effects?",
 answer:
 "You'll have direct access to the practice for any concerns between appointments. Common side effects are managed with dose adjustments and physician guidance. If you experience a serious adverse event, go to your nearest emergency room or call 911.",
 },
 {
 question: "Is it covered by insurance?",
 answer:
 "Our telehealth programs are not covered by traditional health insurance. However, many patients use HSA (Health Savings Account) or FSA (Flexible Spending Account) funds, which are pre-tax dollars. We provide itemized receipts for HSA/FSA reimbursement.",
 },
 {
 question: "Can I cancel anytime?",
 answer:
 "Yes. There are no long-term contracts or cancellation fees. You can pause or cancel your program at any time by contacting the practice. Your prescriptions can be transferred to another provider upon request.",
 },
];

export default function HowItWorksPage() {
 return (
 <>
 {/* Hero */}
 <section className="relative pt-32 pb-20 overflow-hidden">
 <div className="absolute inset-0 bg-bg" />
 <div className="absolute inset-0 " />

 <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-line bg-accent-soft mb-8">
 <span className="text-accent text-xs tracking-widest uppercase font-medium">
 The Process
 </span>
 </div>
 <h1 className="font-serif text-5xl sm:text-6xl font-bold text-ink mb-6">
 How It Works
 </h1>
 <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
 Four steps from where you are now to a physician-supervised protocol designed around you.
 </p>
 </div>
 </section>

 {/* Steps */}
 <section className="py-20">
 <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="space-y-12">
 {steps.map((step, i) => (
 <ScrollFade key={i} delay={i * 80}>
 <div className="flex gap-8 items-start">
 {/* Number */}
 <div className="flex-shrink-0">
 <div className="w-16 h-16 rounded-full bg-surface border-2 border-accent/40 flex items-center justify-center">
 <span className="font-serif text-xl font-bold text-accent">{step.number}</span>
 </div>
 {i < steps.length - 1 && (
 <div className="w-px h-12 bg-accent-soft mx-auto mt-2" />
 )}
 </div>

 {/* Content */}
 <div className="flex-1 pb-4">
 <h2 className="font-serif text-2xl font-bold text-ink mb-3">{step.title}</h2>
 <p className="text-muted text-base leading-relaxed mb-3">{step.description}</p>
 <p className="text-faint text-sm leading-relaxed">{step.detail}</p>
 </div>
 </div>
 </ScrollFade>
 ))}
 </div>
 </div>
 </section>

 {/* CTA Banner */}
 <section className="py-16 bg-surface/60 border-y border-line">
 <div className="max-w-4xl mx-auto px-4 text-center">
 <ScrollFade>
 <h2 className="font-serif text-3xl font-bold text-ink mb-4">
 Ready to Get Started?
 </h2>
 <p className="text-muted mb-8">
 Your first consultation is free. No commitment, no pressure.
 </p>
 <Link
 href="/contact"
 className="inline-block px-10 py-4 bg-accent text-[color:var(--on-accent)] font-bold rounded tracking-wide hover:bg-accent-hover transition-colors"
 >
 Book Free Consultation
 </Link>
 </ScrollFade>
 </div>
 </section>

 {/* FAQ */}
 <section className="py-24">
 <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
 <ScrollFade>
 <div className="text-center mb-16">
 <p className="text-accent text-sm tracking-widest uppercase font-medium mb-3">
 FAQ
 </p>
 <h2 className="font-serif text-4xl font-bold text-ink">
 Common Questions
 </h2>
 </div>
 </ScrollFade>

 <div className="space-y-4">
 {faqs.map((faq, i) => (
 <ScrollFade key={i} delay={i * 60}>
 <div className="p-6 bg-surface border border-line rounded-xl hover:border-line transition-colors">
 <h3 className="text-ink font-semibold text-base mb-3">{faq.question}</h3>
 <p className="text-muted text-sm leading-relaxed">{faq.answer}</p>
 </div>
 </ScrollFade>
 ))}
 </div>
 </div>
 </section>
 </>
 );
}
