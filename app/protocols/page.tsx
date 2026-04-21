import type { Metadata } from "next";
import Link from "next/link";
import ScrollFade from "../components/ScrollFade";

export const metadata: Metadata = {
  title: "Physician-Designed Protocols | Evidence-Based Supplement Stacks",
  description:
    "Evidence-based supplement protocols designed by a board-certified physician. Cardiovascular, metabolic, hormone, longevity, and surgical preop optimization.",
};

const protocols = [
  {
    id: "cardiovascular",
    href: "/protocols/cardiovascular",
    title: "Cardiovascular Optimization",
    subtitle: "Lp(a) • ApoB • hs-CRP",
    description:
      "Evidence-based stack for elevated lipoprotein(a), apolipoprotein B, and inflammatory markers. Includes Pauling protocol and Rx pipeline options.",
    price: "$49",
    badge: "Most Requested",
    badgeColor: "bg-red-600",
    markers: ["Lp(a)", "ApoB", "hs-CRP", "LDL-C"],
    duration: "3-6 month protocol",
  },
  {
    id: "metabolic",
    href: "/protocols/metabolic",
    title: "Metabolic Optimization",
    subtitle: "HbA1c • Insulin Resistance • Weight",
    description:
      "Evidence-based stack for pre-diabetes, elevated HbA1c, insulin resistance, and stubborn weight. Includes berberine, inositol, and lifestyle layering.",
    price: "$49",
    badge: "Weight Loss",
    badgeColor: "bg-green-600",
    markers: ["HbA1c", "Fasting Glucose", "HOMA-IR", "Triglycerides"],
    duration: "8-12 week protocol",
  },
  {
    id: "hormone-optimization",
    href: "/protocols/hormone-optimization",
    title: "Hormone Optimization",
    subtitle: "Testosterone • Estrogen • Thyroid",
    description:
      "Evidence-based stack to support TRT/HRT protocols and natural hormone optimization. Covers DHEA, aromatase support, and thyroid conversion.",
    price: "$49",
    badge: "TRT/HRT Support",
    badgeColor: "bg-purple-600",
    markers: ["Total T", "Free T", "E2", "DHEA-S", "TSH"],
    duration: "12-week protocol",
  },
  {
    id: "longevity",
    href: "/protocols/longevity",
    title: "Longevity Stack",
    subtitle: "NAD+ • Mitochondrial • Anti-Aging",
    description:
      "Comprehensive anti-aging stack covering NAD+ precursors, mitochondrial support, senolytics, and cellular health. Based on Sinclair/Attia-style protocols.",
    price: "$49",
    badge: "Premium",
    badgeColor: "bg-amber-600",
    markers: ["NAD+", "IGF-1", "hs-CRP", "HOMA-IR", "ApoB"],
    duration: "Ongoing protocol",
  },
  {
    id: "surgical-preop",
    href: "/surgical-preop",
    title: "Surgical Preoperative",
    subtitle: "8-Week Preop Optimization",
    description:
      "Comprehensive 8-week preop stack for metabolic, cardiovascular, respiratory, and wound healing optimization before surgery. Anesthesiologist-designed.",
    price: "$49",
    badge: "Anesthesiologist-Designed",
    badgeColor: "bg-blue-600",
    markers: ["HbA1c", "CBC", "Coag", "Lipids", "Vit D"],
    duration: "8-week protocol",
  },
];

export default function ProtocolsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d1a] to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.05)_0%,_transparent_70%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/5 mb-8">
            <span className="text-[#c9a84c] text-xs tracking-widest uppercase font-medium">
              Physician-Designed Protocols
            </span>
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-white mb-6">
            Evidence-Based
            <span className="block gold-gradient">Supplement Protocols</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Complete daily supplement stacks designed by a board-certified physician.
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
                { step: "01", title: "Get Your Labs", detail: "Order through GoodLabs, Rythm, or Quest. Or use labs from the past 90 days." },
                { step: "02", title: "Purchase the Protocol", detail: "Instant access to the complete daily stack — dosing, timing, brands, safety." },
                { step: "03", title: "Optional: Book Review", detail: "Add a 1:1 consultation to review your specific labs and customize the protocol." },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-center justify-center mb-4">
                    <span className="text-[#c9a84c] font-bold text-sm">{item.step}</span>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.detail}</p>
                </div>
              ))}
            </div>
          </ScrollFade>
        </div>
      </section>

      {/* Protocol Cards */}
      <section className="py-16 bg-[#0d0d1a]/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade>
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold text-white mb-4">Available Protocols</h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Each protocol is a complete, evidence-based supplement stack with exact dosing and timing.
              </p>
            </div>
          </ScrollFade>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {protocols.map((p, i) => (
              <ScrollFade key={p.id} delay={i * 75}>
                <div className="group h-full bg-[#1a1a2e] border border-[#2a2a4e] rounded-xl p-8 hover:border-[#c9a84c]/40 hover:shadow-[0_0_30px_rgba(201,168,76,0.08)] transition-all duration-300 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 ${p.badgeColor} text-white text-xs font-bold rounded-full`}>
                      {p.badge}
                    </span>
                    <span className="font-serif text-3xl font-bold text-[#c9a84c]">{p.price}</span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-white mb-1">{p.title}</h3>
                  <p className="text-[#c9a84c] text-sm mb-4">{p.subtitle}</p>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">{p.description}</p>

                  <div className="mb-4">
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">Targets markers</p>
                    <div className="flex flex-wrap gap-2">
                      {p.markers.map((m, j) => (
                        <span key={j} className="px-2 py-1 bg-[#0a0a0a] border border-[#2a2a4e] text-gray-300 text-xs rounded">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-500 text-xs mb-4">{p.duration}</p>

                  <Link
                    href={p.href}
                    className="block w-full text-center px-6 py-3 bg-[#c9a84c] text-black font-semibold rounded tracking-wide hover:bg-[#e0c070] transition-colors"
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
            <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-lg p-8 sm:p-12 text-center">
              <p className="text-[#c9a84c] text-xs tracking-widest uppercase font-medium mb-4">
                Save With Membership
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
                All Protocols Included
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                Optimization ($199/mo) and Premium Longevity ($399/mo) memberships include
                access to all protocols plus physician customization, lab coordination, and ongoing support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/services" className="px-8 py-4 bg-[#c9a84c] text-black font-semibold rounded hover:bg-[#e0c070] transition-colors">
                  View Memberships
                </Link>
                <Link href="/book" className="px-8 py-4 border border-[#c9a84c] text-[#c9a84c] font-semibold rounded hover:bg-[#c9a84c] hover:text-black transition-colors">
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
