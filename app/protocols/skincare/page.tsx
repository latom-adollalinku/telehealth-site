import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import ScrollFade from "../../components/ScrollFade";
import ProtocolPaywall from "../../components/ProtocolPaywall";

export const metadata: Metadata = {
  title: "Skincare Basics Protocol | Evidence-Based 4-Ingredient Stack",
  description:
    "The only 4 skincare ingredients with strong RCT evidence: Retinol, Niacinamide, Vitamin C, SPF. Physician-designed routine for men and women 30+.",
};

const morningRoutine = [
  { name: "Gentle Cleanser", dose: "—", target: "Non-foaming, pH balanced (CeraVe, Vanicream)" },
  { name: "Vitamin C Serum (L-Ascorbic Acid)", dose: "10-20%", target: "Antioxidant, brightens, prevents damage (SkinCeuticals CE Ferulic or Maelove)" },
  { name: "Niacinamide Serum", dose: "5-10%", target: "Reduces redness, pore size, oil production (The Ordinary)" },
  { name: "Moisturizer", dose: "—", target: "Ceramide-based (CeraVe AM)" },
  { name: "SPF 50 (mineral or chemical)", dose: "Full coverage", target: "Non-negotiable. Single most important step." },
];

const eveningRoutine = [
  { name: "Cleanser (double cleanse if sunscreen)", dose: "—", target: "Remove SPF and oil buildup" },
  { name: "Retinol or Tretinoin", dose: "0.3% → 0.5% → 1%", target: "Gold standard anti-aging. Prescription tret > OTC retinol" },
  { name: "Moisturizer", dose: "—", target: "Repair barrier. CeraVe PM or La Roche-Posay." },
  { name: "Optional: Peptide serum", dose: "—", target: "Matrixyl, copper peptides (controversial evidence)" },
];

const weeklyAdditions = [
  { name: "Chemical exfoliant (AHA/BHA)", dose: "1-2x/week", target: "Glycolic or salicylic acid. Don&apos;t combine with retinol same night." },
  { name: "Hydrating mask", dose: "1x/week", target: "Hyaluronic acid for barrier repair" },
];

const targets = [
  { marker: "Fine Lines", current: "Visible", goal: "Smoother", realistic: "Retinol-driven", timeline: "12-16 weeks" },
  { marker: "Skin Tone", current: "Uneven", goal: "Even", realistic: "Vitamin C + SPF", timeline: "8-12 weeks" },
  { marker: "Pore Size", current: "Enlarged", goal: "Reduced", realistic: "Niacinamide", timeline: "8-12 weeks" },
  { marker: "Damage Prevention", current: "Ongoing", goal: "Halted", realistic: "SPF-driven", timeline: "Immediate" },
];

export default function SkincareProtocolPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d1a] to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.05)_0%,_transparent_70%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/5 mb-8">
            <span className="text-[#c9a84c] text-xs tracking-widest uppercase font-medium">
              Skincare Basics
            </span>
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-white mb-6">
            4-Ingredient
            <span className="block gold-gradient">Skincare Protocol</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Skincare industry is $100B of mostly noise. Only 4 ingredients have strong RCT
            evidence. This is the evidence-only routine — no marketing, no $400 serums.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade>
            <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-xl p-8">
              <h2 className="font-serif text-2xl font-bold text-white mb-4">The 4 Ingredients That Actually Work</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "Retinol / Tretinoin", evidence: "Hundreds of RCTs. Gold standard for anti-aging. Increases collagen, reduces fine lines." },
                  { name: "Vitamin C (L-Ascorbic Acid)", evidence: "Antioxidant, brightening, UV damage protection. Best paired with SPF." },
                  { name: "Niacinamide", evidence: "Reduces redness, pore size, oil. Well-tolerated by sensitive skin." },
                  { name: "Sunscreen (SPF 30+)", evidence: "Single most important anti-aging intervention. Daily UV damage is the primary aging driver." },
                ].map((i, idx) => (
                  <div key={idx} className="bg-[#0a0a0a] border border-[#2a2a4e] rounded p-4">
                    <p className="text-[#c9a84c] font-semibold mb-1">{i.name}</p>
                    <p className="text-gray-400 text-sm">{i.evidence}</p>
                  </div>
                ))}
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
        <ProtocolPaywall protocolId="skincare" protocolName="Skincare Basics" price="$10">
          <section className="py-24 bg-[#0d0d1a]/60">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollFade>
                <div className="text-center mb-12">
                  <h2 className="font-serif text-4xl font-bold text-white mb-4">Daily Routine</h2>
                </div>
              </ScrollFade>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {[
                  { label: "Morning (AM)", time: "3-4 steps, ~3 min", items: morningRoutine, color: "from-amber-600 to-amber-800" },
                  { label: "Evening (PM)", time: "3 steps, ~2 min", items: eveningRoutine, color: "from-indigo-600 to-indigo-800" },
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
                              {item.dose && <span className="text-[#c9a84c] text-xs font-mono">{item.dose}</span>}
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
                  <h3 className="font-serif text-2xl font-bold text-white mb-4">Weekly Additions (Optional)</h3>
                  <div className="space-y-3">
                    {weeklyAdditions.map((item, i) => (
                      <div key={i} className="flex items-start justify-between gap-3 p-3 bg-[#0a0a0a] border border-[#2a2a4e] rounded">
                        <div>
                          <p className="text-white font-semibold text-sm">{item.name}</p>
                          <p className="text-gray-500 text-xs">{item.target}</p>
                        </div>
                        <span className="text-[#c9a84c] font-mono text-xs flex-shrink-0">{item.dose}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollFade>
            </div>
          </section>

          <section className="py-16 bg-[#0d0d1a]/60">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollFade>
                <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-xl p-8">
                  <h3 className="font-serif text-2xl font-bold text-white mb-4">Retinol Ramp-Up Schedule</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Retinol irritation is the #1 reason people quit. Ramp slowly.
                  </p>
                  <ul className="space-y-3 text-gray-300 text-sm">
                    <li><strong className="text-[#c9a84c]">Weeks 1-2:</strong> Retinol 0.3% — 2x/week, pea-sized amount, on moisturized skin</li>
                    <li><strong className="text-[#c9a84c]">Weeks 3-4:</strong> Increase to 3x/week</li>
                    <li><strong className="text-[#c9a84c]">Weeks 5-8:</strong> Every other night</li>
                    <li><strong className="text-[#c9a84c]">Weeks 9+:</strong> Nightly if tolerating. Can increase to 0.5% or 1%.</li>
                    <li><strong className="text-[#c9a84c]">Prescription upgrade:</strong> Tretinoin 0.025%-0.1% — stronger and better studied. Requires physician.</li>
                  </ul>
                </div>
              </ScrollFade>
            </div>
          </section>

          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollFade>
                <div className="bg-[#1a1a2e] border border-[#2a2a4e] rounded-xl overflow-hidden">
                  <div className="px-6 py-4 bg-[#0a0a0a] border-b border-[#2a2a4e]">
                    <h3 className="text-white font-semibold">Total Cost (Entire Routine)</h3>
                  </div>
                  <div className="divide-y divide-[#2a2a4e]">
                    {[
                      { item: "Cleanser (3 months)", cost: "$12" },
                      { item: "Vitamin C Serum (Maelove)", cost: "$28" },
                      { item: "Niacinamide (The Ordinary)", cost: "$7" },
                      { item: "Retinol 0.3-1% (The Ordinary)", cost: "$10" },
                      { item: "Moisturizer AM + PM (CeraVe)", cost: "$25" },
                      { item: "SPF 50 (3 months)", cost: "$20" },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center justify-between px-6 py-3">
                        <span className="text-gray-300 text-sm">{row.item}</span>
                        <span className="text-[#c9a84c] font-mono text-sm">{row.cost}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between px-6 py-4 bg-[#0a0a0a]">
                      <span className="text-white font-semibold">Total — Entire 3-Month Routine</span>
                      <span className="font-serif text-2xl font-bold text-[#c9a84c]">~$102</span>
                    </div>
                  </div>
                </div>
              </ScrollFade>
            </div>
          </section>

          <section className="py-16 bg-[#0d0d1a]/60">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollFade>
                <div className="bg-[#1a1a2e] border border-amber-500/30 rounded-xl p-8">
                  <h3 className="text-amber-400 font-semibold mb-4">Safety Notes</h3>
                  <ul className="space-y-3 text-gray-400 text-sm">
                    <li><strong className="text-white">Don&apos;t combine same night:</strong> Vitamin C + Retinol. Or Retinol + AHA/BHA. Alternate nights.</li>
                    <li><strong className="text-white">Retinol + sun:</strong> Retinol thins the outer skin layer — always wear SPF the next day.</li>
                    <li><strong className="text-white">Pregnancy/nursing:</strong> No retinol or tretinoin. Stick to Vitamin C and SPF.</li>
                    <li><strong className="text-white">Sensitive skin:</strong> Start with retinol 0.1% or skip retinol and use peptides instead.</li>
                    <li><strong className="text-white">Everything else is optional:</strong> You can get 80% of benefits from these 4 ingredients. Don&apos;t fall for $400 serums.</li>
                  </ul>
                </div>
              </ScrollFade>
            </div>
          </section>
        </ProtocolPaywall>
      </Suspense>
    </>
  );
}
