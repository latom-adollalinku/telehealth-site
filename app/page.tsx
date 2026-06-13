import type { Metadata } from "next";
import Link from "next/link";
import ScrollFade from "./components/ScrollFade";
import { HeroReveal, StaggerGroup, StaggerItem, HoverCard } from "./components/Motion";
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
          <HeroReveal delay={0}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/5 mb-8">
              <div className="w-2 h-2 rounded-full bg-[#c9a84c] animate-pulse" />
              <span className="text-[#c9a84c] text-xs tracking-widest uppercase font-medium">
                Now Accepting Patients
              </span>
            </div>
          </HeroReveal>

          <HeroReveal delay={0.1}>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Get the labs your
              <span className="block gold-gradient mt-1">annual physical doesn't order.</span>
            </h1>
          </HeroReveal>

          <HeroReveal delay={0.2}>
            <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Personalized lab review and longevity consultation. Comprehensive panels at up to 60% off retail.
              Evidence-based supplement protocols. Cash-pay, no insurance hassle.
            </p>
          </HeroReveal>

          <HeroReveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <Link
                href="/book"
                className="px-8 py-4 bg-[#c9a84c] text-black font-semibold rounded tracking-wide hover:bg-[#e0c070] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#c9a84c]/20 transition-all duration-200 text-sm sm:text-base"
              >
                Book a Consultation
              </Link>
              <Link
                href="#lead-magnet"
                className="px-8 py-4 border border-[#c9a84c]/40 text-[#c9a84c] font-semibold rounded tracking-wide hover:border-[#c9a84c] hover:bg-[#c9a84c]/5 hover:-translate-y-0.5 transition-all duration-200 text-sm sm:text-base"
              >
                Free Guide: 5 Labs to Track
              </Link>
            </div>
          </HeroReveal>

          <HeroReveal delay={0.4}>
            <p className="text-gray-500 text-xs tracking-wide">
              Cash pay. HIPAA secure. Direct physician access.
            </p>
          </HeroReveal>
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

      {/* How It Works */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollFade>
          <div className="text-center mb-16">
            <p className="text-[#c9a84c] text-sm tracking-widest uppercase font-medium mb-3">
              How It Works
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white">
              Three steps to a personalized longevity plan
            </h2>
          </div>
        </ScrollFade>

        <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {howItWorks.map((item, i) => (
            <StaggerItem key={i} className="h-full">
              <HoverCard className="h-full">
                <div className="h-full p-8 bg-[#1a1a2e] border border-[#2a2a4e] rounded-xl hover:border-[#c9a84c]/40 transition-colors duration-300">
                  <div className="w-12 h-12 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/40 flex items-center justify-center mb-5">
                    <span className="text-[#c9a84c] font-serif font-bold text-xl">{item.step}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </HoverCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* Lab Categories */}
      <section className="py-24 bg-[#0d0d1a]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade>
            <div className="text-center mb-16">
              <p className="text-[#c9a84c] text-sm tracking-widest uppercase font-medium mb-3">
                What We Test For
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white">
                The labs that show what standard care misses
              </h2>
              <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                We order the panels most physicians do not. Each consultation includes lab recommendations
                tailored to your goals and history.
              </p>
            </div>
          </ScrollFade>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {labCategories.map((cat, i) => (
              <StaggerItem key={i} className="h-full">
                <HoverCard className="h-full">
                  <div className="h-full p-7 bg-[#1a1a2e] border border-[#2a2a4e] rounded-xl hover:border-[#c9a84c]/40 transition-colors duration-300">
                    <h3 className="font-serif text-xl font-bold text-white mb-3">
                      {cat.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Why LATOM */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollFade>
          <div className="text-center mb-16">
            <p className="text-[#c9a84c] text-sm tracking-widest uppercase font-medium mb-3">
              Why Patients Choose LATOM
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white">
              Medicine first. Always.
            </h2>
          </div>
        </ScrollFade>

        <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {whyDifferent.map((item, i) => (
            <StaggerItem key={i} className="h-full">
              <HoverCard className="h-full">
                <div className="h-full p-8 bg-[#1a1a2e] border border-[#2a2a4e] rounded-xl hover:border-[#c9a84c]/30 transition-colors duration-300">
                  <div className="w-2 h-2 rounded-full bg-[#c9a84c] mb-5" />
                  <h3 className="font-serif text-2xl font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </HoverCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
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
                  Direct physician care.
                  <span className="block text-[#c9a84c]">No middlemen.</span>
                </h2>
                <p className="text-gray-300 text-base leading-relaxed mb-6">
                  Dr. Abdul, MD, built LATOM Wellness to bring evidence-based longevity medicine
                  directly to patients. Every protocol is physician-designed, evidence-based,
                  and individually supervised.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-[#c9a84c]/40 text-[#c9a84c] font-semibold rounded hover:border-[#c9a84c] hover:bg-[#c9a84c]/5 transition-all duration-200 text-sm"
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

      {/* Lead Magnet Capture */}
      <section id="lead-magnet" className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollFade>
            <div className="p-12 bg-gradient-to-br from-[#1a1a2e] to-[#13132a] border border-[#c9a84c]/20 rounded-2xl">
              <p className="text-[#c9a84c] text-sm tracking-widest uppercase font-medium mb-4">
                Free Download
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
                The 5 Labs Every High-Performing Adult Should Track
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
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
              <p className="mt-4 text-gray-600 text-xs">
                We respect your inbox. Unsubscribe any time.
              </p>
            </div>
          </ScrollFade>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#0d0d1a]/60 border-t border-[#c9a84c]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollFade>
            <div className="p-12">
              <p className="text-[#c9a84c] text-sm tracking-widest uppercase font-medium mb-4">
                Get Started
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
                Ready for a real conversation about your health?
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
                Book a 30-minute video consultation. Cash pay. No insurance. No insurance hoops.
              </p>
              <Link
                href="/book"
                className="inline-block px-10 py-4 bg-[#c9a84c] text-black font-bold rounded tracking-wide hover:bg-[#e0c070] transition-colors"
              >
                Book a Consultation
              </Link>
              <p className="mt-4 text-gray-600 text-xs">
                Currently accepting Virginia patients. Multi-state expansion in progress.
              </p>
            </div>
          </ScrollFade>
        </div>
      </section>
    </>
  );
}
