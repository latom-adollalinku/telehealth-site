import type { Metadata } from "next";
import Link from "next/link";
import ScrollFade from "./components/ScrollFade";
import EmailCapture from "./components/EmailCapture";

export const metadata: Metadata = {
  title: "LATOM Wellness | Medical-Grade Wellness, Delivered",
  description:
    "Physician-supervised weight management, peptide therapy, and longevity medicine. Evidence-based protocols from a board-certified MD.",
};

const services = [
  {
    href: "/services#weight-management",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    label: "Weight Management",
    description:
      "GLP-1 medications (Semaglutide, Tirzepatide, Retatrutide) with physician monitoring. Lose weight safely and keep it off.",
    price: "Starting at $299/month",
    badge: "Most Popular",
  },
  {
    href: "/services#peptide-therapy",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    label: "Peptide Therapy",
    description:
      "BPC-157, TB-500, NAD+, and longevity peptides with custom protocols designed for your goals.",
    price: "Starting at $199/month",
    badge: "Physician-Designed",
  },
  {
    href: "/services#hormone-optimization",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    label: "Hormone Optimization",
    description:
      "TRT, HRT, and metabolic optimization with comprehensive bloodwork and ongoing physician supervision.",
    price: "Starting at $349/month",
    badge: "Full Lab Panel",
  },
  {
    href: "/surgical-preop",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    label: "Surgical Preop Optimization",
    description:
      "8-week evidence-based protocol to optimize metabolic, cardiovascular, and respiratory health before surgery.",
    price: "Starting at $249",
    badge: "Anesthesiologist-Designed",
  },
];

const stats = [
  { value: "20%", label: "average body weight lost with GLP-1" },
  { value: "FDA", label: "recognized medications" },
  { value: "100%", label: "physician supervised" },
  { value: "5", label: "day shipping" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0d0d1a] to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.07)_0%,_transparent_70%)]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/5 mb-8">
            <div className="w-2 h-2 rounded-full bg-[#c9a84c] animate-pulse" />
            <span className="text-[#c9a84c] text-xs tracking-widest uppercase font-medium">
              Board-Certified Physician &bull; Now Accepting Patients
            </span>
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Medical-Grade Wellness,
            <span className="block gold-gradient mt-1">Delivered.</span>
          </h1>

          <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Physician-supervised weight management, peptide therapy, and longevity medicine.
            Evidence-based protocols from a board-certified MD — shipped to your door.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/book"
              className="px-8 py-4 bg-[#c9a84c] text-black font-semibold rounded tracking-wide hover:bg-[#e0c070] transition-all duration-200 text-sm sm:text-base"
            >
              Start Free Consultation
            </Link>
            <Link
              href="/how-it-works"
              className="px-8 py-4 border border-[#c9a84c]/40 text-[#c9a84c] font-semibold rounded tracking-wide hover:border-[#c9a84c] hover:bg-[#c9a84c]/5 transition-all duration-200 text-sm sm:text-base"
            >
              How It Works
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-8 bg-gradient-to-b from-[#c9a84c]/50 to-transparent" />
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-[#c9a84c]/10 bg-[#0d0d1a]/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-serif text-4xl font-bold text-[#c9a84c] mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollFade>
          <div className="text-center mb-16">
            <p className="text-[#c9a84c] text-sm tracking-widest uppercase font-medium mb-3">
              Our Programs
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white">
              Treatments We Offer
            </h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto">
              Every protocol is physician-designed, pharmacy-compounded, and individually supervised.
            </p>
          </div>
        </ScrollFade>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ScrollFade key={i} delay={i * 100}>
              <div className="relative group h-full">
                <div className="absolute -top-3 left-6 z-10">
                  <span className="px-3 py-1 bg-[#c9a84c] text-black text-xs font-bold rounded-full tracking-wide">
                    {service.badge}
                  </span>
                </div>

                <div className="h-full p-8 bg-[#1a1a2e] border border-[#2a2a4e] rounded-xl hover:border-[#c9a84c]/40 hover:shadow-[0_0_30px_rgba(201,168,76,0.08)] transition-all duration-300 flex flex-col">
                  <div className="text-[#c9a84c] mb-5">{service.icon}</div>
                  <h3 className="font-serif text-2xl font-bold text-white mb-3">
                    {service.label}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-4">
                    {service.description}
                  </p>
                  <p className="text-[#c9a84c] font-semibold text-sm mb-6">
                    {service.price}
                  </p>
                  <div className="flex gap-4">
                    <Link
                      href={service.href}
                      className="inline-flex items-center gap-2 text-[#c9a84c] text-sm font-semibold hover:gap-3 transition-all duration-200"
                    >
                      Learn More
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <Link
                      href="/book"
                      className="inline-flex items-center gap-2 text-white text-sm font-semibold px-3 py-1 bg-[#c9a84c]/20 border border-[#c9a84c]/40 rounded hover:bg-[#c9a84c]/30 transition-all duration-200"
                    >
                      Book
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollFade>
          ))}
        </div>
      </section>

      {/* About teaser */}
      <section className="py-24 bg-[#0d0d1a]/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollFade>
              <div>
                <p className="text-[#c9a84c] text-sm tracking-widest uppercase font-medium mb-4">
                  About Your Physician
                </p>
                <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
                  Medicine First.
                  <span className="block text-[#c9a84c]">Always.</span>
                </h2>
                <p className="text-gray-300 text-base leading-relaxed mb-6">
                  Dr. Abdilatif Abdulhakim is a board-certified anesthesiologist who built LATOM Wellness
                  to bring evidence-based longevity medicine directly to patients. Every protocol is
                  physician-designed, pharmacy-compounded, and individually supervised.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-[#c9a84c]/40 text-[#c9a84c] font-semibold rounded hover:border-[#c9a84c] hover:bg-[#c9a84c]/5 transition-all duration-200 text-sm"
                >
                  Meet Dr. Abdulhakim
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
                    title: "MD, Board-Certified Anesthesiologist",
                    detail: "15+ years of clinical practice",
                  },
                  {
                    title: "Evidence-Based Protocols Only",
                    detail: "Every treatment backed by clinical research and peer-reviewed literature",
                  },
                  {
                    title: "Pharmacy-Compounded Medications",
                    detail: "USA-based licensed compounding pharmacies — pharmaceutical grade",
                  },
                  {
                    title: "Ongoing Physician Supervision",
                    detail: "Monthly check-ins, lab reviews, and 24/7 access for questions",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-4 bg-[#1a1a2e] border border-[#2a2a4e] rounded-lg"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#c9a84c] mt-2 flex-shrink-0" />
                    <div>
                      <div className="text-white font-semibold text-sm mb-1">
                        {item.title}
                      </div>
                      <div className="text-gray-400 text-sm">{item.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollFade>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollFade>
            <div className="p-12 bg-gradient-to-br from-[#1a1a2e] to-[#13132a] border border-[#c9a84c]/20 rounded-2xl">
              <p className="text-[#c9a84c] text-sm tracking-widest uppercase font-medium mb-4">
                Get Started
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
                Start Your Free Consultation
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
                Tell us your goals. A physician will review your case and reach out within 24 hours.
              </p>
              <div className="max-w-md mx-auto">
                <EmailCapture
                  placeholder="Enter your email to get started"
                  buttonText="Start Free Consultation"
                  interest="homepage-cta"
                  successMessage="Got it. Dr. Abdulhakim's team will reach out within 24 hours."
                />
              </div>
              <p className="mt-4 text-gray-600 text-xs">
                No obligation. HSA/FSA eligible. Not available in all states.
              </p>
            </div>
          </ScrollFade>
        </div>
      </section>
    </>
  );
}
