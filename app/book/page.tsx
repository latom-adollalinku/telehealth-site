import type { Metadata } from "next";
import Link from "next/link";
import ScrollFade from "../components/ScrollFade";

export const metadata: Metadata = {
 title: "Book a Consultation | LATOM Wellness",
 description:
 "Choose the type of consultation that fits what you need. Wellness education sessions available anywhere. Medical consultations available in licensed states.",
};

export default function BookPage() {
 return (
 <>
 {/* Hero */}
 <section className="relative pt-28 pb-14 overflow-hidden">
 <div className="absolute inset-0 bg-bg" />
 <div className="absolute inset-0 " />
 <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
 <ScrollFade>
 <h1 className="font-serif text-4xl sm:text-5xl font-bold text-ink mb-4">
 Book a Consultation
 </h1>
 <p className="text-muted text-lg max-w-xl mx-auto">
 Choose the type of session that fits what you need.
 </p>
 </ScrollFade>
 </div>
 </section>

 {/* Two-card selector */}
 <section className="relative py-12 overflow-hidden">
 <div className="absolute inset-0 bg-bg" />
 <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

 {/* Card 1: Wellness Consultation */}
 <ScrollFade>
 <div className="flex flex-col h-full bg-[#111118] border border-line rounded-xl p-8">
 {/* Badge */}
 <div className="mb-4">
 <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wide bg-green-700 text-ink rounded-full uppercase">
 Available Anywhere
 </span>
 </div>

 {/* Title + description */}
 <h2 className="font-serif text-2xl font-bold text-ink mb-3">
 Wellness Consultation
 </h2>
 <p className="text-muted text-sm leading-relaxed mb-6">
 General wellness education and health optimization guidance.
 Discussion of goals, lifestyle frameworks, lab category
 education, and supplement education. No prescriptions and no
 specific clinical recommendations. Available to clients in any
 state.
 </p>

 {/* What's included */}
 <div className="mb-5">
 <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">
 What&apos;s included
 </p>
 <ul className="space-y-1.5">
 {[
 "Health goals review and lifestyle framework discussion",
 "Lab category education (what panels mean, not clinical orders)",
 "Supplement and nutrition education",
 "Personalized resource list and follow-up guidance",
 ].map((item) => (
 <li key={item} className="flex items-start gap-2 text-sm text-muted">
 <span className="mt-0.5 text-green-500 flex-shrink-0">&#10003;</span>
 {item}
 </li>
 ))}
 </ul>
 </div>

 {/* What's NOT included */}
 <div className="mb-6">
 <p className="text-xs font-semibold text-faint uppercase tracking-wider mb-2">
 Not included
 </p>
 <ul className="space-y-1.5">
 {[
 "Prescriptions or medication orders",
 "Specific lab orders or diagnostic interpretation",
 "Diagnosis of any condition",
 "Treatment of medical conditions",
 ].map((item) => (
 <li key={item} className="flex items-start gap-2 text-sm text-faint">
 <span className="mt-0.5 flex-shrink-0">&times;</span>
 {item}
 </li>
 ))}
 </ul>
 </div>

 {/* Pricing */}
 <div className="mb-6 p-4 bg-bg border border-line rounded-lg">
 <p className="text-sm text-muted">
 Session fee set per consultation. Dr. Abdul will send an
 invoice via Helcim after booking.
 </p>
 </div>

 {/* CTA */}
 <div className="mt-auto">
 <Link
 href="/book/wellness"
 className="block w-full text-center py-3 bg-accent text-[color:var(--on-accent)] font-semibold rounded tracking-wide hover:bg-accent-hover transition-colors duration-200"
 >
 Book Wellness Consultation
 </Link>
 </div>
 </div>
 </ScrollFade>

 {/* Card 2: Medical Consultation */}
 <ScrollFade>
 <div className="flex flex-col h-full bg-[#111118] border border-line rounded-xl p-8">
 {/* Badge */}
 <div className="mb-4">
 <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wide bg-amber-700 text-ink rounded-full uppercase">
 Licensed States Only
 </span>
 </div>

 {/* Title + description */}
 <h2 className="font-serif text-2xl font-bold text-ink mb-3">
 Medical Consultation
 </h2>
 <p className="text-muted text-sm leading-relaxed mb-6">
 Clinical consultation with prescribing capability. Includes
 review of your specific labs, personalized recommendations,
 and prescriptions through US-licensed pharmacies as clinically
 appropriate.
 </p>

 {/* What's included */}
 <div className="mb-5">
 <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">
 What&apos;s included
 </p>
 <ul className="space-y-1.5">
 {[
 "Review of your specific lab results",
 "Personalized clinical recommendations",
 "Prescriptions through US-licensed pharmacies as appropriate",
 "Follow-up care plan",
 "Documentation in your EHR record",
 ].map((item) => (
 <li key={item} className="flex items-start gap-2 text-sm text-muted">
 <span className="mt-0.5 text-green-500 flex-shrink-0">&#10003;</span>
 {item}
 </li>
 ))}
 </ul>
 </div>

 {/* State restriction */}
 <div className="mb-6 p-3 bg-amber-900/20 border border-amber-600/30 rounded-lg">
 <p className="text-xs text-amber-300">
 Currently available in Virginia, Texas, Florida, and Tennessee.
 </p>
 </div>

 {/* Pricing */}
 <div className="mb-6 p-4 bg-bg border border-line rounded-lg">
 <p className="text-sm text-muted">
 Session fee set per consultation. Dr. Abdul will send an
 invoice after booking.
 </p>
 </div>

 {/* CTA */}
 <div className="mt-auto">
 <Link
 href="/book/medical"
 className="block w-full text-center py-3 bg-accent text-[color:var(--on-accent)] font-semibold rounded tracking-wide hover:bg-accent-hover transition-colors duration-200"
 >
 Book Medical Consultation
 </Link>
 </div>
 </div>
 </ScrollFade>

 </div>
 </div>
 </section>

 {/* Explanatory block */}
 <section className="relative py-10 overflow-hidden">
 <div className="absolute inset-0 bg-gradient-to-b " />
 <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
 <ScrollFade>
 <div className="text-center">
 <p className="text-muted text-sm leading-relaxed">
 Not sure which to choose? Wellness consultations cover general
 health education and lifestyle guidance and are not medical care.
 Medical consultations involve a clinical evaluation and may
 include prescriptions, and are subject to state licensure.
 </p>
 </div>
 </ScrollFade>
 </div>
 </section>

 {/* Footer note */}
 <section className="relative py-8 overflow-hidden">
 <div className="absolute inset-0 bg-surface" />
 <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
 <p className="text-xs text-faint">
 By proceeding, you acknowledge our{" "}
 <Link href="/agreement" className="text-accent hover:underline">
 Patient Service Agreement
 </Link>
 .
 </p>
 </div>
 </section>
 </>
 );
}
