import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import ScrollFade from "../../components/ScrollFade";
import ProtocolPaywall from "../../components/ProtocolPaywall";

export const metadata: Metadata = {
  title: "Cognitive & Study Protocol | Nootropic Stack for Focus and Memory",
  description:
    "Evidence-based cognitive enhancement stack. OTC nootropics (L-theanine, Rhodiola, Bacopa, Lion's Mane) plus physician-prescribed peptides (Dihexa, Semax, Selank, Pinealon).",
};

const morningStack = [
  { name: "Alpha-GPC", dose: "300–600 mg", target: "Acetylcholine precursor — learning & memory" },
  { name: "Lion's Mane Extract", dose: "1,000 mg (30% beta-glucan)", target: "NGF / BDNF — neurogenesis" },
  { name: "Rhodiola Rosea", dose: "200–400 mg (3% rosavins)", target: "Stress adaptation, mental fatigue" },
  { name: "L-Tyrosine", dose: "500–1,000 mg", target: "Dopamine precursor — focus, motivation" },
  { name: "Creatine Monohydrate", dose: "5 g", target: "Cognitive performance, especially under stress" },
];

const studySessionStack = [
  { name: "L-Theanine + Caffeine", dose: "200 mg + 100 mg", target: "Focused calm — 2:1 ratio sweet spot" },
  { name: "Bacopa Monnieri", dose: "300 mg (55% bacosides)", target: "Memory consolidation (12-week ramp)" },
  { name: "Phosphatidylserine", dose: "100 mg", target: "Cortisol modulation under mental stress" },
];

const eveningStack = [
  { name: "Magnesium L-Threonate", dose: "2,000 mg (144 mg elemental Mg)", target: "Brain magnesium — synaptic density" },
  { name: "Choline (CDP-Choline)", dose: "250 mg", target: "Acetylcholine replenishment" },
  { name: "Ashwagandha (KSM-66)", dose: "300 mg", target: "Evening cortisol balance" },
];

const peptides = [
  { name: "Semax", dose: "250–600 mcg intranasal", target: "Focus, attention, BDNF upregulation", notes: "Russian nootropic peptide. Strong evidence for ADHD-like focus enhancement. 1-2x/day." },
  { name: "Selank", dose: "250–600 mcg intranasal", target: "Anxiolytic, reduces brain fog", notes: "Paired well with Semax. Non-sedating anxiety reduction. 1-2x/day." },
  { name: "Dihexa", dose: "8–45 mg oral", target: "Neural connectivity, HGF mimetic", notes: "Most potent known neurogenesis compound. Use in cycles (4-6 weeks on, 2 weeks off)." },
  { name: "Pinealon", dose: "100–200 mcg/day (oral or injection)", target: "Pineal regulation, circadian repair", notes: "Short peptide from Khavinson group. Supports sleep-wake cognition linkage." },
];

const targets = [
  { marker: "Focus Duration", current: "30-60 min", goal: "90-120 min", realistic: "Sustained deep work", timeline: "2-4 weeks" },
  { marker: "Memory Recall", current: "Baseline", goal: "Improved retention", realistic: "Measurable via testing", timeline: "8-12 weeks" },
  { marker: "Mental Fatigue", current: "Afternoon crash", goal: "Sustained energy", realistic: "Fewer crashes", timeline: "2-4 weeks" },
  { marker: "BDNF Levels", current: "Age-declining", goal: "Youthful levels", realistic: "Lab-confirmed rise", timeline: "12 weeks" },
];

export default function CognitiveProtocolPage() {
  return (
    <>
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
            Cognitive & Study
            <span className="block gold-gradient">Optimization Protocol</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Evidence-based nootropic stack for focus, memory, and neuroplasticity.
            OTC supplements plus physician-prescribed peptides (Dihexa, Semax, Selank, Pinealon).
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade>
            <div className="bg-[#1a1a2e] border border-blue-500/30 rounded-xl p-8">
              <h2 className="font-serif text-2xl font-bold text-white mb-4">Who This Protocol Is For</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <p className="text-blue-400 font-semibold text-sm mb-1">Students & Exam Prep</p>
                  <p className="text-gray-400 text-sm">Board exams, EA exam, bar exam, MCAT — anyone needing sustained cognitive load over months.</p>
                </div>
                <div>
                  <p className="text-blue-400 font-semibold text-sm mb-1">High-Performance Professionals</p>
                  <p className="text-gray-400 text-sm">Physicians, executives, engineers — complex decisions, deep work, context switching.</p>
                </div>
                <div>
                  <p className="text-blue-400 font-semibold text-sm mb-1">Age-Related Decline</p>
                  <p className="text-gray-400 text-sm">Early cognitive changes (35+), brain fog, memory lapses, reduced processing speed.</p>
                </div>
              </div>
            </div>
          </ScrollFade>
        </div>
      </section>

      <section className="py-16 bg-[#0d0d1a]/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade>
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold text-white mb-4">Target Outcomes</h2>
            </div>
          </ScrollFade>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {targets.map((t, i) => (
              <ScrollFade key={i} delay={i * 75}>
                <div className="bg-[#1a1a2e] border border-[#2a2a4e] rounded-xl p-6 text-center">
                  <p className="text-[#c9a84c] font-bold text-lg mb-1">{t.marker}</p>
                  <p className="text-red-400 text-sm mb-1">{t.current}</p>
                  <p className="text-green-400 font-serif text-2xl font-bold mb-2">{t.goal}</p>
                  <p className="text-gray-500 text-xs">{t.realistic}</p>
                  <p className="text-gray-600 text-xs mt-1">{t.timeline}</p>
                </div>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <ProtocolPaywall protocolId="cognitive" protocolName="Cognitive Protocol" price="$49">
          <section className="py-24 bg-[#0d0d1a]/60">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollFade>
                <div className="text-center mb-12">
                  <h2 className="font-serif text-4xl font-bold text-white mb-4">Daily Nootropic Stack</h2>
                  <p className="text-gray-400 max-w-xl mx-auto">All Amazon-accessible. Foundation layer for the full protocol.</p>
                </div>
              </ScrollFade>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {[
                  { label: "Morning", time: "With breakfast", items: morningStack, color: "from-blue-600 to-blue-800" },
                  { label: "Study Session", time: "Pre-deep-work", items: studySessionStack, color: "from-teal-600 to-teal-800" },
                  { label: "Evening", time: "Wind-down", items: eveningStack, color: "from-indigo-600 to-indigo-800" },
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

          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollFade>
                <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-xl p-8">
                  <h3 className="font-serif text-2xl font-bold text-white mb-2">
                    Peptide Layer (Physician-Prescribed)
                  </h3>
                  <p className="text-[#c9a84c] text-sm mb-6">
                    Requires consultation and prescription. Dispensed by licensed US compounding pharmacies.
                  </p>
                  <div className="space-y-4">
                    {peptides.map((p, i) => (
                      <div key={i} className="bg-[#0a0a0a] border border-[#2a2a4e] rounded-lg p-5">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-white font-semibold">{p.name}</p>
                            <p className="text-gray-500 text-xs">{p.target}</p>
                          </div>
                          <span className="text-[#c9a84c] font-mono text-sm flex-shrink-0 ml-4">{p.dose}</span>
                        </div>
                        <p className="text-gray-400 text-sm">{p.notes}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-amber-900/10 border border-amber-500/20 rounded-lg">
                    <p className="text-amber-400 text-sm">
                      <strong>Semax + Selank stacking:</strong> Typically used together for focus (Semax) + anxiolysis (Selank).
                      Alternate nostrils, 1-2x daily. Do not use near bedtime.
                    </p>
                  </div>
                </div>
              </ScrollFade>
            </div>
          </section>

          <section className="py-16 bg-[#0d0d1a]/60">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollFade>
                <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-xl p-8">
                  <h3 className="font-serif text-2xl font-bold text-white mb-4">Protocol Cycling Strategy</h3>
                  <ul className="space-y-3 text-gray-300 text-sm">
                    <li><strong className="text-[#c9a84c]">OTC Foundation (daily, indefinitely):</strong> Alpha-GPC, Magnesium L-Threonate, Omega-3, Creatine.</li>
                    <li><strong className="text-[#c9a84c]">Adaptogen Rotation (8 weeks on, 2 weeks off):</strong> Rhodiola, Ashwagandha, Bacopa — prevents tolerance.</li>
                    <li><strong className="text-[#c9a84c]">Peptide Cycling:</strong> Semax/Selank — 4 weeks on, 1-2 weeks off. Dihexa — 4-6 weeks on, 2 weeks off.</li>
                    <li><strong className="text-[#c9a84c]">Stimulant Discipline:</strong> Caffeine ≤200 mg, L-theanine mandatory. No stimulants after 2 PM.</li>
                    <li><strong className="text-[#c9a84c]">Bacopa ramp:</strong> Effects require 8-12 weeks of consistent use — do not stop early.</li>
                  </ul>
                </div>
              </ScrollFade>
            </div>
          </section>

          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollFade>
                <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-xl p-8">
                  <h3 className="font-serif text-2xl font-bold text-white mb-4">Behavioral Multipliers</h3>
                  <p className="text-gray-400 text-sm mb-6">
                    Supplements are the floor, not the ceiling. The behaviors below multiply protocol effectiveness:
                  </p>
                  <ul className="space-y-3 text-gray-300 text-sm">
                    <li><strong className="text-[#c9a84c]">Deep work blocks:</strong> 90-minute focus sessions, then 15-min recovery. Never violate.</li>
                    <li><strong className="text-[#c9a84c]">Sleep 7-9 hrs:</strong> Memory consolidation is 100% sleep-dependent. No exceptions.</li>
                    <li><strong className="text-[#c9a84c]">Cardio 3x/week:</strong> BDNF spikes 2-3x after Zone 2 cardio. Stack with nootropics pre-workout.</li>
                    <li><strong className="text-[#c9a84c]">Spaced repetition:</strong> Anki or similar — active recall beats re-reading 10:1.</li>
                    <li><strong className="text-[#c9a84c]">Block social media during study:</strong> Cold Turkey, Opal, or Freedom. Dopamine hijacking kills focus.</li>
                  </ul>
                </div>
              </ScrollFade>
            </div>
          </section>

          <section className="py-16 bg-[#0d0d1a]/60">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollFade>
                <div className="bg-[#1a1a2e] border border-[#2a2a4e] rounded-xl overflow-hidden">
                  <div className="px-6 py-4 bg-[#0a0a0a] border-b border-[#2a2a4e]">
                    <h3 className="text-white font-semibold">Monthly Cost</h3>
                  </div>
                  <div className="divide-y divide-[#2a2a4e]">
                    {[
                      { item: "Alpha-GPC + CDP-Choline", cost: "$25–40" },
                      { item: "Lion's Mane Extract", cost: "$20–35" },
                      { item: "Rhodiola + Ashwagandha", cost: "$20–30" },
                      { item: "Bacopa Monnieri", cost: "$15–25" },
                      { item: "L-Theanine + L-Tyrosine", cost: "$15–25" },
                      { item: "Magnesium L-Threonate", cost: "$30–50" },
                      { item: "Creatine + Phosphatidylserine", cost: "$20–30" },
                      { item: "Peptides (Rx through LATOM)", cost: "$150–400" },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center justify-between px-6 py-3">
                        <span className="text-gray-300 text-sm">{row.item}</span>
                        <span className="text-[#c9a84c] font-mono text-sm">{row.cost}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between px-6 py-4 bg-[#0a0a0a]">
                      <span className="text-white font-semibold">OTC Stack Total</span>
                      <span className="font-serif text-2xl font-bold text-[#c9a84c]">$145–235</span>
                    </div>
                    <div className="flex items-center justify-between px-6 py-4 bg-[#0a0a0a]">
                      <span className="text-white font-semibold">With Peptides</span>
                      <span className="font-serif text-2xl font-bold text-[#c9a84c]">$295–635</span>
                    </div>
                  </div>
                </div>
              </ScrollFade>
            </div>
          </section>

          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollFade>
                <div className="bg-[#1a1a2e] border border-amber-500/30 rounded-xl p-8">
                  <h3 className="text-amber-400 font-semibold mb-4">Safety Notes</h3>
                  <ul className="space-y-3 text-gray-400 text-sm">
                    <li><strong className="text-white">Peptide prescriptions:</strong> All peptides require a physician consultation. These are not over-the-counter.</li>
                    <li><strong className="text-white">Drug interactions:</strong> Rhodiola + SSRIs = serotonin syndrome risk. Ashwagandha + thyroid meds = dose adjustment needed.</li>
                    <li><strong className="text-white">Stimulant stacking:</strong> Do not combine L-Tyrosine with ADHD stimulants (Adderall, Vyvanse) without physician approval.</li>
                    <li><strong className="text-white">Alpha-GPC in young healthy adults:</strong> Emerging cardiovascular signal in heart failure patients — discuss if CV history.</li>
                    <li><strong className="text-white">Bacopa side effects:</strong> GI upset common — take with food.</li>
                  </ul>
                </div>
              </ScrollFade>
            </div>
          </section>

          <section className="py-16 bg-[#0d0d1a]/60">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-lg p-8 text-center">
                <h2 className="font-serif text-2xl font-bold text-white mb-4">Want Peptide Prescriptions?</h2>
                <p className="text-gray-400 mb-6">Semax, Selank, Dihexa, and Pinealon require a physician consultation. Book one to access the full stack.</p>
                <Link href="/book" className="inline-block px-8 py-4 bg-[#c9a84c] text-black font-semibold rounded hover:bg-[#e0c070] transition-colors">
                  Book Consultation
                </Link>
              </div>
            </div>
          </section>
        </ProtocolPaywall>
      </Suspense>
    </>
  );
}
