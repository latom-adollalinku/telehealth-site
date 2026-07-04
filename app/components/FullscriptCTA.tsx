import ScrollFade from "./ScrollFade";

interface FullscriptCTAProps {
 /** Headline override. Default: "Supplements That Pair With This Protocol" */
 heading?: string;
 /** Description override. Default mentions practitioner-grade brands. */
 description?: string;
 /** Optional list of specific supplement categories relevant to this protocol */
 highlights?: string[];
}

const FULLSCRIPT_INTAKE =
 "https://us.fullscript.com/welcome/aabdulhakim/intake?requestedPractitionerId=UHJhY3RpdGlvbmVyLTQ3MTU1OQ==";

export default function FullscriptCTA({
 heading = "Supplements That Pair With This Protocol",
 description = "Pharmaceutical-grade supplements from Thorne, Pure Encapsulations, Designs for Health, and other practitioner-trusted brands. Curated by Dr. Abdul, priced at practitioner rates, shipped to your door.",
 highlights,
}: FullscriptCTAProps) {
 return (
 <section className="py-16 bg-surface/60">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
 <ScrollFade>
 <div className="bg-surface border border-line rounded-xl p-8 sm:p-10">
 <div className="flex items-center gap-2 mb-3">
 <span className="text-accent text-xs tracking-widest uppercase font-medium">
 LATOM Wellness Dispensary
 </span>
 <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider bg-accent-soft text-accent rounded border border-line">
 Practitioner-Grade
 </span>
 </div>
 <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink mb-3">
 {heading}
 </h2>
 <p className="text-muted text-base leading-relaxed mb-6">
 {description}
 </p>

 {highlights && highlights.length > 0 && (
 <div className="mb-6">
 <p className="text-accent text-xs tracking-widest uppercase font-medium mb-3">
 Common Stack for This Protocol
 </p>
 <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
 {highlights.map((item, i) => (
 <li
 key={i}
 className="flex items-start gap-2 text-sm text-muted"
 >
 <svg
 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0"
 fill="none"
 stroke="currentColor"
 viewBox="0 0 24 24"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth={2}
 d="M5 13l4 4L19 7"
 />
 </svg>
 {item}
 </li>
 ))}
 </ul>
 </div>
 )}

 <div className="flex flex-col sm:flex-row gap-3">
 <a
 href={FULLSCRIPT_INTAKE}
 target="_blank"
 rel="noopener noreferrer"
 className="inline-block px-7 py-3 bg-accent text-[color:var(--on-accent)] font-semibold rounded tracking-wide hover:bg-accent-hover transition-colors text-center"
 >
 Open My Dispensary
 </a>
 <a
 href="/labs"
 className="inline-block px-7 py-3 border border-accent text-accent font-semibold rounded tracking-wide hover:bg-accent hover:text-[color:var(--on-accent)] transition-colors text-center"
 >
 See Full Catalog
 </a>
 </div>
 <p className="text-faint text-xs mt-4">
 Signup links you to Dr. Abdul as your prescribing physician. You get practitioner pricing on every supplement.
 </p>
 </div>
 </ScrollFade>
 </div>
 </section>
 );
}
