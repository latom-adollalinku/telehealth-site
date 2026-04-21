import type { Metadata } from "next";
import Link from "next/link";
import ScrollFade from "../components/ScrollFade";

export const metadata: Metadata = {
  title: "How It Works — Your Path to Better Health",
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
      "We order comprehensive bloodwork based on your program — metabolic panel, hormone levels, thyroid, CBC, and more. You can use a lab near you.",
    detail: "Results are reviewed by your physician within 48 hours. Lab panels are included in most programs, or we can work with recent labs you already have.",
  },
  {
    number: "03",
    title: "Custom Protocol",
    description:
      "Your physician designs a personalized treatment plan — specific medications, doses, titration schedule, and lifestyle recommendations.",
    detail: "No cookie-cutter protocols. Your plan is built around your labs, history, and goals. You receive a full written protocol with injection instructions.",
  },
  {
    number: "04",
    title: "Delivered to You",
    description:
      "Your prescription is sent to your pharmacy of choice. FDA-approved medications are available at retail and specialty pharmacies nationwide.",
    detail: "For peptide protocols, medications are dispensed by licensed US compounding pharmacies and shipped directly. GLP-1 prescriptions go to your preferred pharmacy.",
  },
];

const faqs = [
  {
    question: "Is this legal?",
    answer:
      "Yes. LATOM Wellness prescribes FDA-approved medications through a licensed physician. GLP-1 medications (Ozempic, Wegovy, Mounjaro, Zepbound) are brand-name FDA-approved drugs. Peptide protocols use compounds dispensed by licensed US pharmacies.",
  },
  {
    question: "Do I need lab work?",
    answer:
      "Yes. We require baseline bloodwork before starting most programs — this is for your safety and to establish a baseline we can compare against over time. Follow-up labs are included in select plans. We can work with labs you've had in the past 90 days if they're comprehensive enough.",
  },
  {
    question: "How often do I see the doctor?",
    answer:
      "Monthly video check-ins are included in all programs. These are real physician appointments — not a nurse or PA. You'll review how you're feeling, adjust doses if needed, and discuss any questions. Between appointments, you can message the practice directly.",
  },
  {
    question: "What if I have side effects?",
    answer:
      "You'll have direct access to the practice for any concerns between appointments. Common side effects (nausea with GLP-1s, injection site reactions) are managed with dose adjustments and guidance. If you experience a serious adverse event, go to your nearest emergency room or call 911.",
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d1a] to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.05)_0%,_transparent_70%)]" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/5 mb-8">
            <span className="text-[#c9a84c] text-xs tracking-widest uppercase font-medium">
              The Process
            </span>
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-white mb-6">
            How It Works
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
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
                    <div className="w-16 h-16 rounded-full bg-[#1a1a2e] border-2 border-[#c9a84c]/40 flex items-center justify-center">
                      <span className="font-serif text-xl font-bold text-[#c9a84c]">{step.number}</span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className="w-px h-12 bg-[#c9a84c]/20 mx-auto mt-2" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-4">
                    <h2 className="font-serif text-2xl font-bold text-white mb-3">{step.title}</h2>
                    <p className="text-gray-300 text-base leading-relaxed mb-3">{step.description}</p>
                    <p className="text-gray-500 text-sm leading-relaxed">{step.detail}</p>
                  </div>
                </div>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-[#0d0d1a]/60 border-y border-[#c9a84c]/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <ScrollFade>
            <h2 className="font-serif text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-400 mb-8">
              Your first consultation is free. No commitment, no pressure.
            </p>
            <Link
              href="/contact"
              className="inline-block px-10 py-4 bg-[#c9a84c] text-black font-bold rounded tracking-wide hover:bg-[#e0c070] transition-colors"
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
              <p className="text-[#c9a84c] text-sm tracking-widest uppercase font-medium mb-3">
                FAQ
              </p>
              <h2 className="font-serif text-4xl font-bold text-white">
                Common Questions
              </h2>
            </div>
          </ScrollFade>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <ScrollFade key={i} delay={i * 60}>
                <div className="p-6 bg-[#1a1a2e] border border-[#2a2a4e] rounded-xl hover:border-[#c9a84c]/30 transition-colors">
                  <h3 className="text-white font-semibold text-base mb-3">{faq.question}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
