import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import ScrollFade from "../../components/ScrollFade";
import ProtocolPaywall from "../../components/ProtocolPaywall";

export const metadata: Metadata = {
  title: "Comprehensive Screening and Disease Prevention Protocol | LATOM Wellness",
  description:
    "Multi-cancer early detection, tumor markers, parasites, mycotoxins, heavy metals, Lyme, autoimmune, hormones, and hereditary risk. The screening labs standard care leaves out.",
};

const previewSummary = {
  tier1: [
    "Multi-cancer early detection (Galleri, separate from Fullscript)",
    "Tumor markers (PSA, CA-125, CEA, CA 19-9, AFP) per family history",
    "Cancer risk markers (fasting insulin, hsCRP, vitamin D, omega-3 index)",
  ],
  parasites: [
    "GI-MAP (Diagnostic Solutions) - PCR-based parasites + bacteria + yeast",
    "Doctor's Data Comprehensive Stool + Parasitology",
    "Standard stool O&P via Quest (less sensitive screen)",
  ],
  mold: [
    "RealTime Labs Mycotoxin Panel (urinary mycotoxin metabolites)",
    "MosaicDX Organic Acids Test (yeast + mold + mitochondrial)",
  ],
  heavyMetals: [
    "Doctor's Data Hair Elements (chronic 38-element burden)",
    "Doctor's Data Urine Toxic Metals (acute mobilizable)",
    "Doctor's Data Blood Heavy Metals (acute exposure)",
  ],
  lyme: [
    "IGeneX Tickborne Complete 2.0 Panel (Lyme + Bartonella + Babesia + others)",
    "IGeneX Western blot (more sensitive than standard)",
  ],
  autoimmune: [
    "ANA with reflex titer (lupus, connective tissue disease)",
    "RF and anti-CCP (rheumatoid arthritis)",
    "Anti-TPO and anti-thyroglobulin (autoimmune thyroid)",
    "TTG-IgA and total IgA (celiac)",
    "HLA-B27 (ankylosing spondylitis)",
  ],
};

export default function CancerScreeningProtocolPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d1a] to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.05)_0%,_transparent_70%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/5 mb-8">
            <span className="text-[#c9a84c] text-xs tracking-widest uppercase font-medium">
              Comprehensive Screening
            </span>
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-white mb-6">
            Disease Prevention
            <span className="block gold-gradient">and Early Detection</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            The screening labs standard care leaves out. Cancer risk, parasites, mold, heavy metals,
            Lyme, autoimmune, hormones, and hereditary risk in one structured workup.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-amber-900/20 border border-amber-600/40 rounded-xl p-6">
            <p className="text-amber-300 text-sm leading-relaxed">
              <span className="font-bold">Important: this protocol COMPLEMENTS standard age-appropriate cancer screening</span> (colonoscopy, mammogram, Pap, low-dose lung CT). It does NOT replace them. If you are due for any standard screening, get it through your primary care or a screening facility. The labs in this protocol are additional, not instead of.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFade>
            <div className="bg-[#1a1a2e] border border-rose-500/30 rounded-xl p-8">
              <h2 className="font-serif text-2xl font-bold text-white mb-6">What's Inside the Full Protocol</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                <div>
                  <h3 className="text-[#c9a84c] text-sm tracking-widest uppercase font-medium mb-3">Cancer Screening</h3>
                  <ul className="space-y-2">
                    {previewSummary.tier1.map((p, i) => (
                      <li key={i} className="text-gray-300 text-sm flex gap-2"><span className="text-[#c9a84c]">-</span><span>{p}</span></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-[#c9a84c] text-sm tracking-widest uppercase font-medium mb-3">Parasites</h3>
                  <ul className="space-y-2">
                    {previewSummary.parasites.map((p, i) => (
                      <li key={i} className="text-gray-300 text-sm flex gap-2"><span className="text-[#c9a84c]">-</span><span>{p}</span></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-[#c9a84c] text-sm tracking-widest uppercase font-medium mb-3">Mold and Mycotoxins</h3>
                  <ul className="space-y-2">
                    {previewSummary.mold.map((p, i) => (
                      <li key={i} className="text-gray-300 text-sm flex gap-2"><span className="text-[#c9a84c]">-</span><span>{p}</span></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-[#c9a84c] text-sm tracking-widest uppercase font-medium mb-3">Heavy Metals</h3>
                  <ul className="space-y-2">
                    {previewSummary.heavyMetals.map((p, i) => (
                      <li key={i} className="text-gray-300 text-sm flex gap-2"><span className="text-[#c9a84c]">-</span><span>{p}</span></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-[#c9a84c] text-sm tracking-widest uppercase font-medium mb-3">Lyme and Tick-Borne</h3>
                  <ul className="space-y-2">
                    {previewSummary.lyme.map((p, i) => (
                      <li key={i} className="text-gray-300 text-sm flex gap-2"><span className="text-[#c9a84c]">-</span><span>{p}</span></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-[#c9a84c] text-sm tracking-widest uppercase font-medium mb-3">Autoimmune Workup</h3>
                  <ul className="space-y-2">
                    {previewSummary.autoimmune.map((p, i) => (
                      <li key={i} className="text-gray-300 text-sm flex gap-2"><span className="text-[#c9a84c]">-</span><span>{p}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </ScrollFade>
        </div>
      </section>

      <Suspense fallback={null}>
        <ProtocolPaywall protocolId="cancer-screening-and-disease-prevention" protocolName="Comprehensive Screening Protocol" price="$10">
          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="p-12 bg-[#1a1a2e] border border-[#c9a84c]/30 rounded-xl">
                <h2 className="font-serif text-3xl font-bold text-white mb-4">Your Protocol is Unlocked</h2>
                <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                  The complete Cancer Screening and Disease Prevention protocol PDF is ready.
                  Includes all 7 tiers with specific lab options, cost ranges, escalation triggers,
                  lifestyle prevention summary, and the "Worried Well" workup tiers.
                </p>
                <a
                  href="/protocols/cancer-screening-and-disease-prevention-protocol.pdf"
                  download="LATOM-Cancer-Screening-and-Disease-Prevention-Protocol.pdf"
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
        </ProtocolPaywall>
      </Suspense>

      <section className="py-16 border-t border-[#c9a84c]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-serif text-2xl font-bold text-white mb-4">Want personalized guidance?</h3>
          <p className="text-gray-400 mb-6">Book a 30-minute consultation. We coordinate standard screenings, order specialty labs, and build a workup that fits your concerns.</p>
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
