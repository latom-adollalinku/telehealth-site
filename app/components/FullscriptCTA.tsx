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
    <section className="py-16 bg-[#0d0d1a]/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollFade>
          <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-xl p-8 sm:p-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#c9a84c] text-xs tracking-widest uppercase font-medium">
                LATOM Wellness Dispensary
              </span>
              <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider bg-[#c9a84c]/10 text-[#c9a84c] rounded border border-[#c9a84c]/30">
                Practitioner-Grade
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3">
              {heading}
            </h2>
            <p className="text-gray-300 text-base leading-relaxed mb-6">
              {description}
            </p>

            {highlights && highlights.length > 0 && (
              <div className="mb-6">
                <p className="text-[#c9a84c] text-xs tracking-widest uppercase font-medium mb-3">
                  Common Stack for This Protocol
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {highlights.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-gray-300"
                    >
                      <svg
                        className="w-4 h-4 text-[#c9a84c] mt-0.5 flex-shrink-0"
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
                className="inline-block px-7 py-3 bg-[#c9a84c] text-black font-semibold rounded tracking-wide hover:bg-[#e0c070] transition-colors text-center"
              >
                Open My Dispensary
              </a>
              <a
                href="/labs"
                className="inline-block px-7 py-3 border border-[#c9a84c] text-[#c9a84c] font-semibold rounded tracking-wide hover:bg-[#c9a84c] hover:text-black transition-colors text-center"
              >
                See Full Catalog
              </a>
            </div>
            <p className="text-gray-500 text-xs mt-4">
              Signup links you to Dr. Abdul as your prescribing physician. You get practitioner pricing on every supplement.
            </p>
          </div>
        </ScrollFade>
      </div>
    </section>
  );
}
