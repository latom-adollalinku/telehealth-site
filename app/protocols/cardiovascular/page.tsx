import type { Metadata } from "next";
import Link from "next/link";
import ScrollFade from "../../components/ScrollFade";

export const metadata: Metadata = {
  title: "Cardiovascular Optimization Protocol | Lp(a) & ApoB Management",
  description:
    "Evidence-based supplement protocol for elevated Lp(a) and ApoB. Physician-designed stack targeting genetic cardiovascular risk with nattokinase, niacin, berberine, and the Pauling protocol.",
};

const morningStack = [
  { name: "Nattokinase", dose: "2,000–4,000 FU", target: "Lp(a) reduction + fibrinolysis", evidence: "Moderate — 10-15% Lp(a) reduction" },
  { name: "Vitamin C", dose: "1,000 mg", target: "Pauling protocol — arterial wall integrity", evidence: "Theoretical + widely used in Lp(a) community" },
  { name: "L-Lysine", dose: "1,000 mg", target: "Blocks Lp(a) binding to arterial walls", evidence: "Pauling protocol — low risk, cheap" },
  { name: "Omega-3 (EPA/DHA)", dose: "2,000 mg", target: "Inflammation + triglycerides", evidence: "Strong — reduces CVD risk markers" },
  { name: "Berberine", dose: "500 mg", target: "ApoB / LDL particle reduction", evidence: "Strong — 15-25% LDL reduction" },
];

const afternoonStack = [
  { name: "Vitamin C", dose: "1,000 mg", target: "Divided dosing for better absorption", evidence: "Pauling protocol continuation" },
  { name: "L-Lysine", dose: "1,000 mg", target: "Sustained Lp(a) binding blockade", evidence: "Pauling protocol continuation" },
  { name: "Berberine", dose: "500 mg", target: "Sustained LDL / ApoB lowering", evidence: "Works like a mild natural statin" },
];

const eveningStack = [
  { name: "CoQ10", dose: "200–400 mg", target: "Cardiovascular protection", evidence: "Moderate — reduces oxidative damage" },
  { name: "L-Carnitine", dose: "1,000 mg", target: "Lp(a) reduction", evidence: "Moderate — 10-20% Lp(a) reduction" },
  { name: "Citrus Bergamot", dose: "500 mg", target: "ApoB / LDL lowering + HDL support", evidence: "Good — 15-20% LDL reduction" },
  { name: "Niacin (Extended Release)", dose: "500–1,500 mg (titrate up)", target: "Strongest natural Lp(a) reducer", evidence: "Strong — 20-30% Lp(a) reduction" },
];

const targets = [
  { marker: "Lp(a)", current: ">100 nmol/L", goal: "<75 nmol/L", realistic: "80–95 (15-30% reduction)", timeline: "3-6 months" },
  { marker: "ApoB", current: ">100 mg/dL", goal: "<80 mg/dL", realistic: "75–90 (15-25% reduction)", timeline: "3-6 months" },
  { marker: "hs-CRP", current: ">2.0 mg/L", goal: "<1.0 mg/L", realistic: "<1.0 with omega-3 + lifestyle", timeline: "6-8 weeks" },
  { marker: "LDL-C", current: ">100 mg/dL", goal: "<70–100 mg/dL", realistic: "Follows ApoB reduction", timeline: "3-6 months" },
];

const lpaSupplements = [
  { name: "Niacin (Vitamin B3)", dose: "1–3 g/day (extended release)", reduction: "20–30%", evidence: "Strong" },
  { name: "Nattokinase", dose: "2,000–4,000 FU/day", reduction: "10–15%", evidence: "Moderate" },
  { name: "L-Carnitine", dose: "2 g/day", reduction: "10–20%", evidence: "Moderate" },
  { name: "Flaxseed (ground)", dose: "30–40 g/day", reduction: "10–14%", evidence: "Some studies" },
  { name: "NAC", dose: "600–1,200 mg/day", reduction: "Reduces arterial binding", evidence: "Emerging" },
  { name: "Vitamin C + L-Lysine", dose: "2–3 g each/day", reduction: "Pauling protocol — blocks binding", evidence: "Theoretical, widely used" },
];

const rxOptions = [
  { drug: "PCSK9 inhibitors (Repatha, Praluent)", reduction: "25–30%", notes: "Currently best Rx option, also crushes ApoB" },
  { drug: "Pelacarsen (antisense therapy)", reduction: "80%+", notes: "Phase 3 trials — specifically targets Lp(a). Possibly approved 2027-2028" },
  { drug: "Olpasiran (siRNA)", reduction: "95%+", notes: "Quarterly injection, in trials. Game-changer when approved" },
  { drug: "Niacin Rx (Niaspan)", reduction: "20–30%", notes: "Prescription extended-release, better tolerated than OTC" },
];

export default function CardiovascularProtocolPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d1a] to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.05)_0%,_transparent_70%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/5 mb-8">
            <span className="text-[#c9a84c] text-xs tracking-widest uppercase font-medium">
              Physician-Designed Protocol
            </span>
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-white mb-6">
            Cardiovascular
            <span className="block gold-gradient">Optimization Protocol</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Evidence-based supplement stack for elevated Lp(a), ApoB, and hs-CRP.
            Designed by a board-certified anesthesiologist for patients with genetic cardiovascular risk.
          </p>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade>
            <div className="bg-[#1a1a2e] border border-red-500/30 rounded-xl p-8">
              <h2 className="font-serif text-2xl font-bold text-white mb-4">Who This Protocol Is For</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <p className="text-red-400 font-semibold text-sm mb-1">Elevated Lp(a)</p>
                  <p className="text-gray-400 text-sm">&gt;75 nmol/L — genetic, independent cardiovascular risk factor. Diet and exercise alone won&apos;t fix it.</p>
                </div>
                <div>
                  <p className="text-amber-400 font-semibold text-sm mb-1">High ApoB</p>
                  <p className="text-gray-400 text-sm">&gt;100 mg/dL — elevated atherogenic particle count. More accurate than LDL alone.</p>
                </div>
                <div>
                  <p className="text-amber-400 font-semibold text-sm mb-1">Elevated hs-CRP</p>
                  <p className="text-gray-400 text-sm">&gt;2.0 mg/L — systemic inflammation that compounds Lp(a) risk.</p>
                </div>
              </div>
            </div>
          </ScrollFade>
        </div>
      </section>

      {/* Daily Protocol */}
      <section className="py-24 bg-[#0d0d1a]/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade>
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold text-white mb-4">Daily Protocol</h2>
              <p className="text-gray-400 max-w-xl mx-auto">Split across three time blocks for optimal absorption and sustained effect.</p>
            </div>
          </ScrollFade>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              { label: "Morning", time: "With breakfast", items: morningStack, color: "from-amber-600 to-amber-800" },
              { label: "Afternoon", time: "With lunch", items: afternoonStack, color: "from-teal-600 to-teal-800" },
              { label: "Evening", time: "With dinner", items: eveningStack, color: "from-purple-600 to-purple-800" },
            ].map((block, idx) => (
              <ScrollFade key={idx} delay={idx * 100}>
                <div className="h-full bg-[#1a1a2e] border border-[#2a2a4e] rounded-xl overflow-hidden">
                  <div className={`bg-gradient-to-r ${block.color} px-6 py-4`}>
                    <h3 className="text-white font-bold text-lg">{block.label}</h3>
                    <p className="text-white/70 text-xs">{block.time}</p>
                  </div>
                  <div className="p-6 space-y-4">
                    {block.items.map((item, i) => (
                      <div key={i} className="border-b border-[#2a2a4e] pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white font-semibold text-sm">{item.name}</span>
                          <span className="text-[#c9a84c] text-xs font-mono">{item.dose}</span>
                        </div>
                        <p className="text-gray-500 text-xs">{item.target}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* Targets */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade>
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold text-white mb-4">Target Outcomes</h2>
              <p className="text-gray-400">Expected results after 3-6 months on full protocol.</p>
            </div>
          </ScrollFade>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {targets.map((t, i) => (
              <ScrollFade key={i} delay={i * 75}>
                <div className="bg-[#1a1a2e] border border-[#2a2a4e] rounded-xl p-6 text-center hover:border-[#c9a84c]/40 transition-all">
                  <p className="text-[#c9a84c] font-bold text-lg mb-1">{t.marker}</p>
                  <p className="text-red-400 text-sm line-through mb-1">{t.current}</p>
                  <p className="text-green-400 font-serif text-2xl font-bold mb-2">{t.goal}</p>
                  <p className="text-gray-500 text-xs">Realistic: {t.realistic}</p>
                  <p className="text-gray-600 text-xs mt-1">{t.timeline}</p>
                </div>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* Lp(a) Deep Dive */}
      <section className="py-24 bg-[#0d0d1a]/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade>
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold text-white mb-4">Lp(a) — What Moves It</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Lp(a) is 80-90% genetically determined. You can&apos;t diet or exercise it away.
                But you can reduce it modestly and reduce the damage it does.
              </p>
            </div>
          </ScrollFade>

          <div className="mb-16">
            <ScrollFade>
              <h3 className="text-white font-semibold text-sm tracking-widest uppercase mb-6">
                Supplements That Lower Lp(a) Directly
              </h3>
            </ScrollFade>
            <div className="space-y-3">
              {lpaSupplements.map((s, i) => (
                <ScrollFade key={i} delay={i * 50}>
                  <div className="bg-[#1a1a2e] border border-[#2a2a4e] rounded-lg p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-[#c9a84c]/30 transition-all">
                    <div className="flex-1">
                      <p className="text-white font-semibold">{s.name}</p>
                      <p className="text-gray-500 text-xs">{s.evidence}</p>
                    </div>
                    <div className="text-right sm:text-center sm:w-40">
                      <p className="text-[#c9a84c] font-mono text-sm">{s.dose}</p>
                    </div>
                    <div className="text-right sm:w-40">
                      <span className="px-3 py-1 bg-green-900/30 border border-green-600/30 text-green-400 text-xs rounded-full">
                        {s.reduction}
                      </span>
                    </div>
                  </div>
                </ScrollFade>
              ))}
            </div>
          </div>

          {/* Pauling Protocol */}
          <ScrollFade>
            <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-xl p-8 mb-16">
              <h3 className="font-serif text-2xl font-bold text-white mb-4">The Pauling Protocol</h3>
              <p className="text-gray-400 text-sm mb-6">
                Nobel laureate Linus Pauling proposed that Lp(a) is the body&apos;s repair mechanism for
                vitamin C-deficient arteries. His protocol strengthens arterial walls so the body doesn&apos;t
                need to deploy Lp(a) as a patch.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { supp: "Vitamin C", dose: "3–6 g/day", role: "Strengthens arterial walls" },
                  { supp: "L-Lysine", dose: "3–6 g/day", role: "Blocks Lp(a) from binding" },
                  { supp: "L-Proline", dose: "500–2,000 mg/day", role: "Supports collagen matrix" },
                ].map((p, i) => (
                  <div key={i} className="bg-[#0a0a0a] border border-[#2a2a4e] rounded-lg p-4 text-center">
                    <p className="text-[#c9a84c] font-semibold mb-1">{p.supp}</p>
                    <p className="text-white font-mono text-sm mb-1">{p.dose}</p>
                    <p className="text-gray-500 text-xs">{p.role}</p>
                  </div>
                ))}
              </div>
              <p className="text-gray-500 text-xs mt-4">
                Not FDA-approved or conclusively proven, but widely used in the Lp(a) community with anecdotal success. Low risk, low cost.
              </p>
            </div>
          </ScrollFade>

          {/* Rx Pipeline */}
          <ScrollFade>
            <h3 className="text-white font-semibold text-sm tracking-widest uppercase mb-6">
              Prescription & Pipeline Options
            </h3>
            <div className="space-y-3">
              {rxOptions.map((rx, i) => (
                <div key={i} className="bg-[#1a1a2e] border border-[#2a2a4e] rounded-lg p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <p className="text-white font-semibold">{rx.drug}</p>
                    <p className="text-gray-500 text-xs">{rx.notes}</p>
                  </div>
                  <div className="text-right sm:w-40">
                    <span className="px-3 py-1 bg-blue-900/30 border border-blue-600/30 text-blue-400 text-xs rounded-full">
                      {rx.reduction} Lp(a)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollFade>
        </div>
      </section>

      {/* Monthly Cost */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade>
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold text-white mb-4">Monthly Cost</h2>
              <p className="text-gray-400">All supplements available on Amazon. No prescriptions required for the base protocol.</p>
            </div>
          </ScrollFade>

          <ScrollFade>
            <div className="bg-[#1a1a2e] border border-[#2a2a4e] rounded-xl overflow-hidden">
              <div className="divide-y divide-[#2a2a4e]">
                {[
                  { item: "Omega-3 EPA/DHA (2g)", cost: "$15–25" },
                  { item: "Vitamin C (2g)", cost: "$5–10" },
                  { item: "L-Lysine (2g)", cost: "$8–12" },
                  { item: "L-Carnitine (1g)", cost: "$12–18" },
                  { item: "Berberine (1g)", cost: "$15–20" },
                  { item: "Citrus Bergamot (500mg)", cost: "$15–25" },
                  { item: "Niacin ER (500–1500mg)", cost: "$10–15" },
                  { item: "Nattokinase (2000+ FU)", cost: "$15–25" },
                  { item: "CoQ10 (200–400mg)", cost: "$20–30" },
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between px-6 py-3">
                    <span className="text-gray-300 text-sm">{row.item}</span>
                    <span className="text-[#c9a84c] font-mono text-sm">{row.cost}</span>
                  </div>
                ))}
              </div>
              <div className="bg-[#0a0a0a] px-6 py-4 flex items-center justify-between">
                <span className="text-white font-semibold">Total Monthly Cost</span>
                <span className="font-serif text-2xl font-bold text-[#c9a84c]">$115–180</span>
              </div>
            </div>
          </ScrollFade>
        </div>
      </section>

      {/* Important Notes */}
      <section className="py-16 bg-[#0d0d1a]/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade>
            <div className="bg-[#1a1a2e] border border-amber-500/30 rounded-xl p-8">
              <h3 className="text-amber-400 font-semibold mb-4">Important Notes</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex gap-3">
                  <span className="text-amber-400 flex-shrink-0">1.</span>
                  <span><strong className="text-white">Niacin titration:</strong> Start at 500mg and increase by 500mg every 2 weeks. Take with food at night. Extended-release form reduces flushing. Monitor liver enzymes after 6-8 weeks.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-400 flex-shrink-0">2.</span>
                  <span><strong className="text-white">Nattokinase caution:</strong> Stop 2 weeks before any surgery or dental procedure. Do not combine with blood thinners (warfarin, Eliquis) without physician approval.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-400 flex-shrink-0">3.</span>
                  <span><strong className="text-white">Berberine interactions:</strong> May lower blood sugar — monitor if diabetic. Can interact with some medications metabolized by CYP enzymes.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-400 flex-shrink-0">4.</span>
                  <span><strong className="text-white">Recheck labs:</strong> Full panel (Lp(a), ApoB, hs-CRP, lipids, liver enzymes) after 3-6 months on protocol to assess response.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-400 flex-shrink-0">5.</span>
                  <span><strong className="text-white">This is not medical advice.</strong> This protocol is educational. Consult with your physician before starting any supplement regimen, especially if you have existing cardiovascular disease or take prescription medications.</span>
                </li>
              </ul>
            </div>
          </ScrollFade>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade>
            <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-lg p-8 sm:p-12 text-center">
              <p className="text-[#c9a84c] text-xs tracking-widest uppercase font-medium mb-4">
                Need Personalized Guidance?
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
                Get Your Protocol Customized
              </h2>
              <p className="text-gray-300 text-base max-w-2xl mx-auto mb-8">
                Every patient&apos;s cardiovascular risk profile is different. Book a consultation to get
                your labs reviewed and a personalized protocol designed around your specific markers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/book"
                  className="px-8 py-4 bg-[#c9a84c] text-black font-semibold rounded tracking-wide hover:bg-[#e0c070] transition-colors"
                >
                  Book Consultation
                </Link>
                <Link
                  href="/labs"
                  className="px-8 py-4 border border-[#c9a84c] text-[#c9a84c] font-semibold rounded tracking-wide hover:bg-[#c9a84c] hover:text-black transition-colors"
                >
                  Order Labs First
                </Link>
              </div>
              <p className="text-xs text-gray-500 mt-6">
                Lab review + protocol customization included with all consultations.
              </p>
            </div>
          </ScrollFade>
        </div>
      </section>
    </>
  );
}
