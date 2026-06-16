import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import ScrollFade from "../../components/ScrollFade";
import ProtocolPaywall from "../../components/ProtocolPaywall";

export const metadata: Metadata = {
  title: "Insulin Resistance and Metabolic Reset Protocol | LATOM Wellness",
  description:
    "Catch insulin resistance 10-20 years before HbA1c rises. Fiber strategies, plant compounds, natural insulin-sensitivity strategies, lifestyle, plus prescription options discussed during consultation when appropriate.",
  robots: { index: false, follow: false }
};

const previewSummary = {
  labs: [
    { name: "Fasting insulin", what: "Catches insulin resistance 10-20 years before HbA1c rises", cost: "$15-30" },
    { name: "HOMA-IR (from glucose + insulin)", what: "Quantified insulin resistance score", cost: "n/a (calculated)" },
    { name: "Advanced lipid (ApoB + Lp(a))", what: "Cardiometabolic risk", cost: "$40-85" },
    { name: "hsCRP", what: "Metabolic inflammation", cost: "$10-25" },
    { name: "Liver enzymes + uric acid", what: "Fatty liver and fructose load", cost: "$30-60" },
    { name: "Optional CGM (2-week wear)", what: "Real-time glucose data for behavior change", cost: "$90-200" },
  ],
  fiberStack: [
    "Glucomannan 1-4g before meals (gel-forming, satiety, insulin signaling support)",
    "Psyllium husk 5-10g (glycemic and LDL effect)",
    "Resistant starch 10-30g daily from food (short-chain fatty acids)",
    "Beta-glucan from oats or barley 3-6g daily",
  ],
  plantCompounds: [
    "Berberine 500mg three times daily (AMPK activation, metformin-comparable in trials)",
    "Chlorogenic acid from green coffee bean or yerba mate (3-4 cups mate daily)",
    "Ceylon cinnamon 1-6g daily (not Cassia)",
    "Apple cider vinegar 1-2 tbsp before carb meals (blunts post-meal spike)",
  ],
  insulinSensitivityBoosters: [
    "Protein-rich meals (especially leucine-rich)",
    "Viscous fiber and resistant starch",
    "Bitter compounds (arugula, dandelion, bitter melon)",
    "Mulberry leaf extract (alpha-glucosidase inhibitor)",
    "Allulose (rare sugar with favorable insulin signaling profile)",
    "Hesperidin (citrus flavonoid)",
  ],
  rxOptions: [
    "Prescription weight management options discussed during consultation if clinically appropriate",
    "Metformin as bridge for severe insulin resistance",
  ],
};

export default function InsulinResistanceProtocolPage() {
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
            Insulin Resistance
            <span className="block gold-gradient">and Metabolic Reset</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Find the metabolic dysfunction your annual physical misses. Reverse it with fiber,
            plant compounds, lifestyle, and prescription support when needed.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade>
            <div className="bg-[#1a1a2e] border border-blue-500/30 rounded-xl p-8">
              <h2 className="font-serif text-2xl font-bold text-white mb-6">What's Inside the Full Protocol</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-[#c9a84c] text-sm tracking-widest uppercase font-medium mb-3">Lab Panel</h3>
                  <ul className="space-y-3">
                    {previewSummary.labs.map((lab, i) => (
                      <li key={i} className="text-sm">
                        <div className="text-white font-semibold">{lab.name}</div>
                        <div className="text-gray-400">{lab.what}</div>
                        <div className="text-[#c9a84c] text-xs mt-1">{lab.cost}</div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-[#c9a84c] text-sm tracking-widest uppercase font-medium mb-3">Fiber Stack</h3>
                  <ul className="space-y-2 mb-4">
                    {previewSummary.fiberStack.map((p, i) => (
                      <li key={i} className="text-gray-300 text-sm flex gap-2">
                        <span className="text-[#c9a84c]">-</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <h3 className="text-[#c9a84c] text-sm tracking-widest uppercase font-medium mb-3">Plant Compounds</h3>
                  <ul className="space-y-2 mb-4">
                    {previewSummary.plantCompounds.map((p, i) => (
                      <li key={i} className="text-gray-300 text-sm flex gap-2">
                        <span className="text-[#c9a84c]">-</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <h3 className="text-[#c9a84c] text-sm tracking-widest uppercase font-medium mb-3">Natural Insulin-Sensitivity Boosters</h3>
                  <ul className="space-y-2 mb-4">
                    {previewSummary.insulinSensitivityBoosters.map((p, i) => (
                      <li key={i} className="text-gray-300 text-sm flex gap-2">
                        <span className="text-[#c9a84c]">-</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <h3 className="text-[#c9a84c] text-sm tracking-widest uppercase font-medium mb-3">Prescription Options</h3>
                  <ul className="space-y-2">
                    {previewSummary.rxOptions.map((r, i) => (
                      <li key={i} className="text-gray-300 text-sm flex gap-2">
                        <span className="text-[#c9a84c]">-</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </ScrollFade>
        </div>
      </section>

      <Suspense fallback={null}>
        <ProtocolPaywall protocolId="insulin-resistance" protocolName="Insulin Resistance Protocol" price="$10">
          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="p-12 bg-[#1a1a2e] border border-[#c9a84c]/30 rounded-xl">
                <h2 className="font-serif text-3xl font-bold text-white mb-4">Your Protocol is Unlocked</h2>
                <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                  The complete Insulin Resistance and Metabolic Reset protocol PDF is ready.
                  Includes full lab panel rationale, fiber and plant compound dosing,
                  natural insulin-sensitivity strategies, lifestyle protocols (time-restricted eating, exercise sequencing, sleep), and prescription options discussed during consultation when appropriate.
                </p>
                <a
                  href="/protocols/insulin-resistance-protocol.pdf"
                  download="LATOM-Insulin-Resistance-Protocol.pdf"
                  className="inline-block px-10 py-4 bg-[#c9a84c] text-black font-bold rounded tracking-wide hover:bg-[#e0c070] transition-colors"
                >
                  Download Full Protocol PDF
                </a>
                <p className="mt-6 text-gray-500 text-xs">
                  Save the PDF to your device. You can also revisit this page any time.
                </p>
              </div>
            </div>
          </section>

          <section className="py-16 bg-[#0d0d1a]/60">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollFade>
                <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-xl p-8">
                  <h3 className="font-serif text-2xl font-bold text-white mb-4">Lifestyle Protocol Stack</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-[#c9a84c] text-sm tracking-widest uppercase font-medium mb-3">Time-Restricted Eating</p>
                      <ul className="space-y-2 text-gray-300 text-sm">
                        <li>16:8 fasting window (16h fast, 8h eating window)</li>
                        <li>First meal after noon for severe IR (HOMA-IR above 3)</li>
                        <li>No caloric intake before 10am minimum</li>
                        <li>Black coffee, plain tea, sparkling water allowed in fast window</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-[#c9a84c] text-sm tracking-widest uppercase font-medium mb-3">Exercise Sequencing</p>
                      <ul className="space-y-2 text-gray-300 text-sm">
                        <li>10-15 min walk within 30 min of every meal (glycemic blunting)</li>
                        <li>Resistance training 3x/week (muscle is primary glucose disposal tissue)</li>
                        <li>Morning fasted cardio 2-3x/week (enhances insulin sensitivity acutely)</li>
                        <li>CGM feedback loop: see your post-meal spikes and adjust</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-[#c9a84c] text-sm tracking-widest uppercase font-medium mb-3">Sleep Protocol</p>
                      <ul className="space-y-2 text-gray-300 text-sm">
                        <li>7-8 hours minimum - sleep deprivation mimics insulin resistance</li>
                        <li>No screens 60 min before bed (cortisol elevation impairs insulin signaling)</li>
                        <li>Magnesium glycinate 400mg before bed</li>
                        <li>Room temperature below 68F for optimal metabolic hormone secretion</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-[#c9a84c] text-sm tracking-widest uppercase font-medium mb-3">Meal Construction</p>
                      <ul className="space-y-2 text-gray-300 text-sm">
                        <li>Sequence: fiber first, then protein, then fat, then carbs</li>
                        <li>30g protein minimum per meal, especially breakfast</li>
                        <li>Vinegar (ACV) or bitter greens before carb meals</li>
                        <li>Avoid liquid carbohydrates (juice, soda, sweetened drinks)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </ScrollFade>
            </div>
          </section>

          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollFade>
                <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-xl p-8">
                  <h3 className="font-serif text-2xl font-bold text-white mb-2">Prescription Tier: GLP-1 Agonists</h3>
                  <p className="text-gray-400 text-sm mb-6">
                    When HOMA-IR exceeds 3.0 or fasting insulin exceeds 20 uIU/mL despite 12 weeks of
                    lifestyle and supplement intervention, GLP-1 receptor agonist therapy is the next
                    clinical step. Both semaglutide and tirzepatide directly improve insulin sensitivity
                    and are appropriate in non-diabetic IR with BMI above 27.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div className="bg-[#0d0d1a] rounded-lg p-5 border border-[#2a2a4e]">
                      <p className="text-[#c9a84c] font-semibold text-sm mb-3">Semaglutide (Ozempic / Wegovy)</p>
                      <ul className="space-y-1.5 text-gray-400 text-xs">
                        <li><span className="text-white">Start:</span> 0.25 mg SC weekly x4 weeks</li>
                        <li><span className="text-white">Titration:</span> 0.5 mg, 1 mg, 1.7 mg, 2.4 mg q4 weeks</li>
                        <li><span className="text-white">IR benefit:</span> HOMA-IR reduction 1.2-2.4 points at 6 months</li>
                        <li><span className="text-white">Monitoring:</span> Fasting insulin + HOMA-IR at 12 weeks</li>
                        <li><span className="text-white">Contraindications:</span> MTC/MEN2 personal or family history</li>
                      </ul>
                    </div>
                    <div className="bg-[#0d0d1a] rounded-lg p-5 border border-[#2a2a4e]">
                      <p className="text-[#c9a84c] font-semibold text-sm mb-3">Tirzepatide (Mounjaro / Zepbound)</p>
                      <ul className="space-y-1.5 text-gray-400 text-xs">
                        <li><span className="text-white">Start:</span> 2.5 mg SC weekly x4 weeks</li>
                        <li><span className="text-white">Titration:</span> 5 mg, 7.5 mg, 10 mg, 12.5 mg, 15 mg q4 weeks</li>
                        <li><span className="text-white">IR benefit:</span> Superior insulin sensitization vs. semaglutide (dual GIP/GLP-1)</li>
                        <li><span className="text-white">PCOS note:</span> Preferred agent for IR in PCOS - GIP component improves ovarian insulin signaling</li>
                        <li><span className="text-white">Monitoring:</span> Same as semaglutide + LH/FSH in PCOS</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-[#0d0d1a] rounded-lg p-5 border border-[#2a2a4e] mb-4">
                    <p className="text-[#c9a84c] font-semibold text-sm mb-3">Metformin as Bridge Therapy</p>
                    <ul className="space-y-1.5 text-gray-300 text-sm">
                      <li>Metformin 500mg BID with meals for 3-6 months as first-line Rx (before GLP-1 escalation)</li>
                      <li>HOMA-IR reduction 0.5-1.0 points; weight-neutral</li>
                      <li>Combination with berberine: additive AMPK activation - monitor for GI side effects</li>
                      <li>Transition to GLP-1 if HOMA-IR remains above 2.0 at 3-month recheck</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-amber-900/20 border border-amber-500/30 rounded-lg">
                    <p className="text-amber-400 text-xs font-semibold mb-1">Drug Interactions</p>
                    <p className="text-gray-400 text-xs">
                      Berberine + GLP-1 or berberine + metformin: both combinations have additive glucose-lowering
                      effects. Monitor for hypoglycemia. Reduce berberine to 250mg BID if starting GLP-1 or metformin.
                      Chlorogenic acid + metformin: may potentiate lactic acidosis risk in renal impairment - check eGFR.
                    </p>
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
                    <li><strong className="text-white">Berberine + GLP-1:</strong> Do not start both simultaneously at full dose. Begin berberine first for 4 weeks, then initiate GLP-1 at lowest dose with glucose monitoring.</li>
                    <li><strong className="text-white">CGM strongly recommended:</strong> Dexcom Stelo (OTC) or Abbott Lingo gives real-time feedback on intervention effectiveness. Non-negotiable in HOMA-IR above 3.</li>
                    <li><strong className="text-white">Gallbladder risk:</strong> GLP-1 agonists slow gallbladder motility. Rapid weight loss on GLP-1 increases cholesterol gallstone risk. Consider ursodiol 300mg BID prophylactically if rapid weight loss occurs.</li>
                    <li><strong className="text-white">Recheck schedule:</strong> Labs at 12 weeks (fasting insulin, HOMA-IR, HbA1c, ApoB, liver enzymes). Adjust protocol based on results.</li>
                  </ul>
                </div>
              </ScrollFade>
            </div>
          </section>
        </ProtocolPaywall>
      </Suspense>

      <section className="py-16 border-t border-[#c9a84c]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-serif text-2xl font-bold text-white mb-4">Want personalized guidance?</h3>
          <p className="text-gray-400 mb-6">Book a 30-minute consultation. We order the labs, interpret the results, and build the protocol with you.</p>
          <Link
            href="/book"
            className="inline-block px-8 py-3 border border-[#c9a84c] text-[#c9a84c] font-semibold rounded hover:bg-[#c9a84c] hover:text-black transition-colors"
          >
            Book a Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
