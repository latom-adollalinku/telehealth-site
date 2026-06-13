/**
 * Shared protocol catalog. Single source of truth for the public protocols
 * page and the admin protocols dashboard.
 */

export interface ProtocolEntry {
  id: string;
  href: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  badge?: string;
  badgeColor?: string;
  markers: string[];
  duration: string;
}

export const protocols: ProtocolEntry[] = [
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
    title: "Hormone Health Education",
    subtitle: "Reproductive Health • Thyroid • Adrenal",
    description:
      "Evidence-based stack to support hormonal health and natural hormonal balance. Covers key reproductive and stress markers, aromatase support, and thyroid conversion.",
    price: "$49",
    badge: "Hormonal Health",
    badgeColor: "bg-purple-600",
    markers: ["Total T", "Free T", "E2", "DHEA-S", "TSH"],
    duration: "12-week protocol",
  },
  {
    id: "longevity",
    href: "/protocols/longevity",
    title: "Longevity Stack",
    subtitle: "Mitochondrial • Cellular Health • Anti-Aging",
    description:
      "Comprehensive anti-aging stack covering mitochondrial energy precursors, cellular health support, senolytics, and longevity markers. Based on evidence-based longevity protocols.",
    price: "$49",
    badge: "Premium",
    badgeColor: "bg-amber-600",
    markers: ["IGF-1", "hs-CRP", "HOMA-IR", "ApoB"],
    duration: "Ongoing protocol",
  },
  {
    id: "belly-fat",
    href: "/protocols/belly-fat",
    title: "Belly Fat Reduction",
    subtitle: "Fasting • Yohimbine • Zone 2",
    description:
      "Physician-designed visceral fat protocol. 16:8 fasting, fasted yohimbine cardio, berberine, and sleep optimization. 4-6 inches off the waist in 12 weeks.",
    price: "$10",
    badge: "High Volume",
    badgeColor: "bg-orange-600",
    markers: ["Waist", "Visceral fat", "Fasting insulin", "HbA1c"],
    duration: "12-week protocol",
  },
  {
    id: "trt-lipids",
    href: "/protocols/trt-lipids",
    title: "Cardiovascular and Lipid Health Education",
    subtitle: "HDL • ApoB • CV Protection",
    description:
      "For men whose lipid markers have shifted. Restore HDL, lower ApoB, and protect cardiovascular health with evidence-based supplementation.",
    price: "$10",
    badge: "Cardiovascular Support",
    badgeColor: "bg-red-600",
    markers: ["HDL", "ApoB", "Triglycerides", "hs-CRP"],
    duration: "12-week protocol",
  },
  {
    id: "glp1-optimization",
    href: "/protocols/glp1-optimization",
    title: "Weight Management Optimization",
    subtitle: "Mitochondrial Stack • Muscle Preservation",
    description:
      "For patients in a physician-supervised weight management program not seeing expected results. Enhance metabolic efficacy while preventing muscle loss and fatigue.",
    price: "$10",
    badge: "Metabolic Boost",
    badgeColor: "bg-green-600",
    markers: ["Weight", "Muscle mass", "Energy", "GI tolerance"],
    duration: "8-12 week protocol",
  },
  {
    id: "cognitive",
    href: "/protocols/cognitive",
    title: "Cognitive & Study",
    subtitle: "Focus • Memory • Neuroplasticity",
    description:
      "Nootropic stack for focus, memory, and neuroplasticity. Evidence-based foundation plus physician-supervised options for sustained cognitive enhancement.",
    price: "$49",
    badge: "Study & Focus",
    badgeColor: "bg-blue-600",
    markers: ["Focus", "Memory", "BDNF", "Mental fatigue"],
    duration: "Cycled protocol",
  },
  {
    id: "sleep",
    href: "/protocols/sleep",
    title: "Sleep & Recovery",
    subtitle: "Deep Sleep • Circadian Reset • Recovery",
    description:
      "Sleep architecture optimization. Evidence-based OTC stack plus physician-supervised options for comprehensive circadian repair and deep sleep restoration.",
    price: "$49",
    badge: "Circadian Repair",
    badgeColor: "bg-indigo-600",
    markers: ["Sleep latency", "Deep sleep %", "HRV", "Night wakings"],
    duration: "2-8 week outcomes",
  },
  {
    id: "aging-parents",
    href: "/protocols/aging-parents",
    title: "Aging Parents Essentials",
    subtitle: "Drug-Nutrient Depletion Recovery",
    description:
      "If your parent takes 5+ medications, they likely have undiagnosed nutrient deficiencies. Physician-designed essential stack to restore energy and clarity.",
    price: "$10",
    badge: "For Your Parents",
    badgeColor: "bg-blue-600",
    markers: ["Energy", "Brain fog", "Muscle", "Sleep"],
    duration: "Ongoing protocol",
  },
  {
    id: "diabetic-neuropathy",
    href: "/protocols/diabetic-neuropathy",
    title: "Diabetic Neuropathy Recovery",
    subtitle: "TTFD • Benfotiamine • ALA",
    description:
      "Evidence-based nerve regeneration stack for early-stage diabetic neuropathy. Japanese 1950s innovations (TTFD/benfotiamine) that most US doctors don't prescribe.",
    price: "$10",
    badge: "Nerve Recovery",
    badgeColor: "bg-red-600",
    markers: ["Burning/tingling", "Numbness", "HbA1c", "Sleep"],
    duration: "3-6 month protocol",
  },
  {
    id: "pots",
    href: "/protocols/pots",
    title: "POTS Recovery",
    subtitle: "Electrolytes • Vagal • Mitochondrial",
    description:
      "Postural Orthostatic Tachycardia Syndrome management. Volume expansion, compression, vagal retraining, and mitochondrial support. For diagnosed POTS or post-COVID dysautonomia.",
    price: "$10",
    badge: "Underserved",
    badgeColor: "bg-blue-600",
    markers: ["Standing HR", "Fatigue", "Syncope", "Brain fog"],
    duration: "Ongoing management",
  },
  {
    id: "hangover",
    href: "/protocols/hangover",
    title: "Hangover Prevention",
    subtitle: "NAC • DHM • Electrolytes",
    description:
      "Evidence-based 4-phase protocol for before, during, and after drinking. Harm reduction framework, not a license to drink more.",
    price: "$10",
    badge: "High Volume",
    badgeColor: "bg-amber-600",
    markers: ["Next-day recovery", "Liver support", "Hydration"],
    duration: "Acute use",
  },
  {
    id: "jet-lag",
    href: "/protocols/jet-lag",
    title: "Jet Lag Recovery",
    subtitle: "Light • Melatonin • Meal Timing",
    description:
      "3-phase circadian protocol for long-haul travelers. Pre-trip shifting, in-flight survival, and arrival entrainment. Cut recovery time in half.",
    price: "$10",
    badge: "Travel",
    badgeColor: "bg-teal-600",
    markers: ["Sleep onset", "Alertness", "GI", "Full recovery"],
    duration: "3-5 day use",
  },
  {
    id: "menopause",
    href: "/protocols/menopause",
    title: "Perimenopause & Menopause",
    subtitle: "Bone • Mood • Hot Flashes • Sleep",
    description:
      "Evidence-based supplement stack for perimenopause and menopause. Works alongside a physician-supervised hormonal health program or as a supplement-only first step.",
    price: "$10",
    badge: "For Women 35+",
    badgeColor: "bg-pink-600",
    markers: ["Hot flashes", "Sleep", "Mood", "Bone density"],
    duration: "Ongoing protocol",
  },
  {
    id: "skincare",
    href: "/protocols/skincare",
    title: "Skincare Basics",
    subtitle: "Retinol • Niacinamide • Vit C • SPF",
    description:
      "Only 4 ingredients have strong RCT evidence. Total cost ~$100 for 3-month routine. Evidence-only, no marketing, no $400 serums.",
    price: "$10",
    badge: "Low Ticket Entry",
    badgeColor: "bg-amber-600",
    markers: ["Fine lines", "Tone", "Pores", "Prevention"],
    duration: "3-month minimum",
  },
  {
    id: "surgical-preop",
    href: "/surgical-preop",
    title: "Surgical Preoperative",
    subtitle: "8-Week Preop Optimization",
    description:
      "Comprehensive 8-week preop stack for metabolic, cardiovascular, respiratory, and wound healing optimization before surgery. Physician-designed.",
    price: "$49",
    badge: "Physician-Designed",
    badgeColor: "bg-teal-600",
    markers: ["HbA1c", "CBC", "Coag", "Lipids", "Vit D"],
    duration: "8-week protocol",
  },
  {
    id: "gi-health",
    href: "/protocols/gi-health",
    title: "GI Health and Gut Optimization",
    subtitle: "Bloating - Food Sensitivities - Brain Fog",
    description:
      "Find the root cause of bloating, brain fog, food sensitivities, and chronic gut symptoms. GI-MAP, celiac screen, calprotectin, SIBO breath test, plus supplement protocol with DGL, NAC, zinc carnosine, L-glutamine, berberine.",
    price: "$10",
    badge: "Most Requested",
    badgeColor: "bg-emerald-600",
    markers: ["GI-MAP", "TTG-IgA", "Calprotectin", "SIBO"],
    duration: "8-12 week protocol",
  },
  {
    id: "insulin-resistance",
    href: "/protocols/insulin-resistance",
    title: "Insulin Resistance and Metabolic Reset",
    subtitle: "Fasting Insulin - HbA1c - Weight Resistance",
    description:
      "Catch insulin resistance 10-20 years before HbA1c rises. Fiber strategies (glucomannan, psyllium), plant compounds (chlorogenic acid, yerba mate, berberine), natural metabolic secretagogues, and lifestyle. Physician consultation available when clinically appropriate.",
    price: "$10",
    badge: "Weight Management",
    badgeColor: "bg-blue-600",
    markers: ["Fasting Insulin", "HbA1c", "HOMA-IR", "ApoB"],
    duration: "12-week protocol",
  },
  {
    id: "cancer-screening-and-disease-prevention",
    href: "/protocols/cancer-screening-and-disease-prevention",
    title: "Comprehensive Screening and Disease Prevention",
    subtitle: "Cancer Risk - Parasites - Mold - Heavy Metals - Lyme",
    description:
      "The screening labs standard care leaves out. Multi-cancer early detection, tumor markers, parasite testing, mycotoxin panels, heavy metals, Lyme and co-infections, autoimmune workup, hormone mapping, and hereditary risk testing.",
    price: "$10",
    badge: "Worried Well",
    badgeColor: "bg-rose-600",
    markers: ["Galleri", "GI-MAP", "RealTime Mycotoxin", "IGeneX Lyme"],
    duration: "6-month workup",
  },
];
