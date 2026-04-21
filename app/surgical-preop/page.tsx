import Link from 'next/link';
import ScrollFade from '../components/ScrollFade';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Surgical Preoperative Optimization — Evidence-Based Supplement Protocols',
  description:
    'Prepare your body for surgery with physician-designed supplement protocols. RCT-backed supplements for metabolic, cardiovascular, respiratory, and wound-healing optimization. Start 4-8 weeks pre-op.',
};

const protocols = [
  {
    id: 'metabolic',
    label: 'Metabolic Optimization',
    badge: 'Pre-Diabetes & Glucose',
    badgeColor: 'bg-green-600',
    tagline: 'Control blood sugar, reduce surgical infection risk.',
    description:
      'If you have elevated glucose, insulin resistance, or pre-diabetes, metabolic control is critical for surgical outcomes. This protocol reduces perioperative hyperglycemia and wound complications.',
    supplements: [
      'Berberine 500 mg 3x daily',
      'Myo-inositol 2-4 g/day',
      'Ceylon cinnamon 1-2 g/day',
      'CoQ10 200 mg daily',
      'Omega-3 fish oil 2-3 g/day (pause week 6)',
      'L-Carnitine 1.5-3 g/day',
      'Glucomannan 5 g 2x daily (pause week 6)',
      'Curcumin 500-1000 mg 2-3x daily',
      'Magnesium 300 mg evening',
      'Melatonin 3-5 mg evening',
      'Probiotics 30-50 billion CFU',
      'Vitamin D3 2000-4000 IU daily',
      'Vitamin C 500-1000 mg daily',
      'Zinc 25-30 mg daily',
    ],
    outcomes: [
      'HbA1c reduction: 0.5-1.5%',
      'Weight loss: 5-15 lbs',
      'Improved glucose tolerance',
      'Reduced triglycerides, improved lipid profile',
      'Enhanced metabolic flexibility',
    ],
    cost: '$120-180/month',
    duration: '8 weeks pre-op',
  },
  {
    id: 'cardiovascular',
    label: 'Cardiovascular Optimization',
    badge: 'Heart Health',
    badgeColor: 'bg-blue-600',
    tagline: 'Reduce cardiac risk, improve perioperative outcomes.',
    description:
      'For patients with hypertension, high cholesterol, or cardiac risk factors. Cardiovascular optimization reduces perioperative myocardial ischemia and arrhythmias.',
    supplements: [
      'CoQ10 200-300 mg daily',
      'Berberine 500 mg 3x daily',
      'Omega-3 2-3 g/day (pause week 6)',
      'Aged garlic extract 600-1200 mg/day (pause week 6)',
      'Magnesium 300-400 mg evening',
      'Resveratrol 150-300 mg 1-2x daily',
      'Vitamin D3 3000-4000 IU daily',
      'Hawthorn 300-600 mg daily (if available)',
      'Probiotics 30-50 billion CFU',
      'Walking/aerobic exercise 30-45 min daily',
    ],
    outcomes: [
      'Blood pressure reduction: 3-8 mmHg',
      'Triglycerides: 20-30% reduction',
      'Improved endothelial function',
      'Enhanced cardiac efficiency',
      'Reduced perioperative myocardial ischemia',
    ],
    cost: '$100-150/month',
    duration: '8 weeks pre-op',
  },
  {
    id: 'respiratory',
    label: 'Smoking Cessation & Respiratory Optimization',
    badge: 'Lung Health',
    badgeColor: 'bg-purple-600',
    tagline: 'Quit smoking safely with NRT, reduce respiratory complications.',
    description:
      'Smoking is the single most important modifiable risk factor for surgical respiratory complications. This protocol supports cessation and restores lung function.',
    supplements: [
      'Nicotine replacement (patch 21 mg → 14 mg → 7 mg)',
      'NAC 600 mg 2x daily',
      'Bromelain 500 mg 2x daily',
      'Curcumin 500-1000 mg 2-3x daily',
      'Vitamin C 500 mg 2x daily',
      'Magnesium 300 mg evening',
      'Ashwagandha 300-500 mg 1-2x daily',
      'Light cardio and breathing exercises',
    ],
    outcomes: [
      'Smoking cessation achieved',
      'CO and carboxyhemoglobin normalized',
      'FEV1 improvement (lung function)',
      'Reduced cough, improved oxygenation',
      'Dramatically reduced perioperative respiratory complications',
    ],
    cost: '$80-120/month',
    duration: '8 weeks pre-op',
  },
  {
    id: 'wound-healing',
    label: 'Wound Healing & Tissue Repair Optimization',
    badge: 'Recovery',
    badgeColor: 'bg-orange-600',
    tagline: 'Accelerate healing, reduce infection, improve scar quality.',
    description:
      'For all surgical patients. This protocol continues pre-op and 4 weeks post-op to optimize tissue repair, reduce infection risk, and improve wound outcomes.',
    supplements: [
      'Zinc 25-30 mg daily (50 mg post-op temp)',
      'Vitamin C 500-1000 mg daily (2x post-op)',
      'Collagen peptides 10-20 g daily',
      'Vitamin D3 3000-4000 IU daily',
      'Probiotics 30-50 billion CFU',
      'Curcumin 500-1000 mg 2-3x daily',
      'Magnesium 300 mg evening',
      'Bromelain 500 mg between meals',
      'NAC 600 mg daily post-op',
    ],
    outcomes: [
      'Faster wound epithelialization',
      'Reduced post-op pain and swelling',
      'Lower infection risk',
      'Improved scar quality',
      'Enhanced tissue strength',
    ],
    cost: '$100-160/month (pre and post-op)',
    duration: '8-10 weeks pre-op + 4 weeks post-op',
  },
];

const safetyChecklist = [
  {
    category: 'DISCONTINUE 5-7 days pre-op',
    items: ['Omega-3 / Fish Oil (antiplatelet effect)', 'Garlic extract (antiplatelet)'],
  },
  {
    category: 'DISCONTINUE 3-5 days pre-op',
    items: ['Glucomannan (bowel obstruction risk)', 'NAC high-dose (bowel prep timing)'],
  },
  {
    category: 'DISCONTINUE 1 day pre-op',
    items: ['Magnesium high-dose (mild laxative)'],
  },
  {
    category: 'SAFE TO CONTINUE through surgery',
    items: [
      'Berberine',
      'Zinc',
      'Vitamin C',
      'Vitamin D3',
      'Curcumin',
      'CoQ10',
      'L-Carnitine',
      'Collagen',
      'Probiotics',
    ],
  },
];

export default function SurgicalPreopPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d1a] to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.05)_0%,_transparent_70%)]" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/5 mb-8">
            <div className="w-2 h-2 rounded-full bg-[#c9a84c] animate-pulse" />
            <span className="text-[#c9a84c] text-xs tracking-widest uppercase font-medium">
              Evidence-Based • RCT-Backed • Physician-Designed
            </span>
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Surgical Preoperative
            <span className="block gold-gradient mt-1">Optimization.</span>
          </h1>

          <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Prepare your body for surgery with physician-designed supplement protocols backed by clinical research.
            Reduce complications, improve recovery, optimize outcomes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/book"
              className="px-8 py-4 bg-[#c9a84c] text-black font-semibold rounded tracking-wide hover:bg-[#e0c070] transition-all duration-200 text-sm sm:text-base"
            >
              Schedule Consultation
            </Link>
            <Link
              href="#protocols"
              className="px-8 py-4 border border-[#c9a84c] text-[#c9a84c] font-semibold rounded tracking-wide hover:bg-[#c9a84c] hover:text-black transition-all duration-200 text-sm sm:text-base"
            >
              Explore Protocols
            </Link>
          </div>
        </div>
      </section>

      {/* Why Surgical Optimization Matters */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#0d0d1a]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade>
            <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-lg p-8 sm:p-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">Why Optimize Before Surgery?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-[#c9a84c] font-semibold mb-3 text-lg">Reduce Complications</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Perioperative hyperglycemia, infection, wound complications, and ICU length of stay are significantly reduced with proper metabolic and immune optimization.
                  </p>
                </div>
                <div>
                  <h3 className="text-[#c9a84c] font-semibold mb-3 text-lg">Accelerate Recovery</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Better wound healing, reduced pain/swelling, improved immune function, and faster tissue repair mean you return to normal activity sooner.
                  </p>
                </div>
                <div>
                  <h3 className="text-[#c9a84c] font-semibold mb-3 text-lg">Optimize Anesthesia Safety</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Improved cardiovascular function, better respiratory health, controlled blood glucose, and proper immune status reduce anesthetic risk and complications.
                  </p>
                </div>
                <div>
                  <h3 className="text-[#c9a84c] font-semibold mb-3 text-lg">Evidence-Based Approach</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Every supplement in these protocols is backed by randomized controlled trials. Not guesswork—proven science integrated into surgical prep.
                  </p>
                </div>
              </div>
            </div>
          </ScrollFade>
        </div>
      </section>

      {/* Protocols */}
      <section id="protocols" className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d1a] to-[#0a0a0a]" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Four Targeted Protocols</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Customized 8-week supplement programs designed for different surgical patient types. Choose based on your health profile.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {protocols.map((protocol) => (
              <ScrollFade key={protocol.id}>
                <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-lg p-8 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{protocol.label}</h3>
                      <span className={`inline-block px-3 py-1 rounded text-sm font-semibold text-white ${protocol.badgeColor}`}>
                        {protocol.badge}
                      </span>
                    </div>
                  </div>

                  <p className="text-[#c9a84c] font-semibold text-lg mb-3">{protocol.tagline}</p>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">{protocol.description}</p>

                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3">Key Supplements:</h4>
                    <ul className="text-gray-300 text-sm space-y-2">
                      {protocol.supplements.slice(0, 5).map((supp, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#c9a84c] mr-2">•</span>
                          <span>{supp}</span>
                        </li>
                      ))}
                      {protocol.supplements.length > 5 && (
                        <li className="text-gray-500 italic">+ {protocol.supplements.length - 5} more</li>
                      )}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3">Expected Outcomes:</h4>
                    <ul className="text-gray-300 text-sm space-y-2">
                      {protocol.outcomes.map((outcome, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-green-400 mr-2">✓</span>
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-[#c9a84c]/20 pt-4 mt-auto">
                    <p className="text-gray-400 text-sm mb-2">
                      <span className="font-semibold text-white">Cost:</span> {protocol.cost}
                    </p>
                    <p className="text-gray-400 text-sm">
                      <span className="font-semibold text-white">Duration:</span> {protocol.duration}
                    </p>
                  </div>
                </div>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#0d0d1a]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade>
            <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-lg p-8 sm:p-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">The Process</h2>

              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-[#c9a84c] text-black font-bold flex items-center justify-center flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2 text-lg">Initial Consultation</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      30-minute video consult. We review your health history, current medications, labs, and surgical timeline. Assess your risk factors.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-[#c9a84c] text-black font-bold flex items-center justify-center flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2 text-lg">Protocol Selection</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Based on your profile, we recommend a targeted protocol (metabolic, cardiovascular, respiratory, or wound healing) with specific supplements and dosing.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-[#c9a84c] text-black font-bold flex items-center justify-center flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2 text-lg">Amazon Shopping List</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      You receive a custom checklist with Amazon links for every supplement. All products are verified, affordable, and ready to order. Typical cost: $100-180/month.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-[#c9a84c] text-black font-bold flex items-center justify-center flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2 text-lg">Weekly Check-ins</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Brief check-ins at weeks 2, 4, 6, and 8. We verify adherence, answer questions, adjust protocol if needed, and recheck baseline labs at week 6-7.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-[#c9a84c] text-black font-bold flex items-center justify-center flex-shrink-0">
                    5
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2 text-lg">Pre-Op & Post-Op Support</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Final pre-op call to review what to discontinue. Post-surgery, we adjust protocol for enhanced wound healing and recovery (weeks 1-4 post-op).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollFade>
        </div>
      </section>

      {/* Safety Checklist */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d1a] to-[#0a0a0a]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade>
            <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-lg p-8 sm:p-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">Safety & Surgical Guidelines</h2>

              <div className="space-y-8">
                {safetyChecklist.map((section, idx) => (
                  <div key={idx}>
                    <h3 className="text-[#c9a84c] font-semibold text-lg mb-4 uppercase tracking-wide">{section.category}</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {section.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2 text-gray-300 text-sm">
                          <span className={`${section.category.includes('DISCONTINUE') ? 'text-red-400' : 'text-green-400'} font-bold mr-2`}>
                            {section.category.includes('DISCONTINUE') ? '⚠' : '✓'}
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#c9a84c]/20 pt-8 mt-8">
                <p className="text-gray-400 text-sm">
                  <span className="text-[#c9a84c] font-semibold">Important:</span> All protocols are designed to work safely with standard anesthetics. We communicate directly with your surgeon and anesthesia team about what you're taking.
                </p>
              </div>
            </div>
          </ScrollFade>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#0d0d1a]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollFade>
            <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-lg p-8 sm:p-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Optimize?</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
                Schedule a consultation to assess your surgical risk factors and design your personalized preoperative protocol. We'll guide you through every step.
              </p>

              <Link
                href="/book"
                className="inline-block px-10 py-4 bg-[#c9a84c] text-black font-semibold rounded tracking-wide hover:bg-[#e0c070] transition-all duration-200"
              >
                Schedule Your Consultation
              </Link>

              <p className="text-xs text-gray-500 mt-8">
                Consultations: 30-minute video call • $250 <br />
                Protocols include 8-week supplement plan, weekly check-ins, lab rechecks, and pre/post-op support
              </p>
            </div>
          </ScrollFade>
        </div>
      </section>
    </>
  );
}
