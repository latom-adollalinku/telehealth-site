import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "LATOM Medical & Wellness terms of service.",
};

export default function TermsPage() {
  return (
    <div className="pt-28 pb-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-10">
        <Link href="/" className="text-[#c9a84c] text-sm hover:underline">
          ← Back to Home
        </Link>
      </div>

      <h1 className="font-serif text-4xl font-bold text-white mb-2">
        Terms of Service
      </h1>
      <p className="text-gray-500 text-sm mb-10">Last updated: April 2026</p>

      <div className="space-y-8">
        <section>
          <h2 className="font-serif text-xl font-bold text-white mb-3">
            Agreement to Terms
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            By accessing this website, you agree to be bound by these Terms of
            Service and our Privacy Policy. If you do not agree, please do not
            use this site.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-bold text-white mb-3">
            Educational Content Only
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            All content on this site — including articles, guides, compound
            profiles, and tax strategy information — is provided for educational
            purposes only. It does not constitute medical, legal, financial, or
            tax advice. Results described are individual examples and not
            guaranteed.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-bold text-white mb-3">
            No Patient-Physician Relationship
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Accessing or submitting information on this site does not create a
            patient-physician relationship with Dr. Abdilatif Abdulhakim or any
            affiliated provider. A formal patient-physician relationship is only
            established through explicit written consent after proper intake
            procedures.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-bold text-white mb-3">
            Consulting Services
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Tax and business consulting services are provided by Adolla Link
            Management LLC. These are consulting services, not legal or
            accounting services. Always consult a licensed CPA and attorney for
            final tax and legal decisions.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-bold text-white mb-3">
            Limitation of Liability
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            LATOM Medical & Wellness, Adolla Link Management LLC, and Dr.
            Abdilatif Abdulhakim are not liable for any direct, indirect,
            incidental, or consequential damages resulting from use of
            information on this site or decisions made based on content herein.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-bold text-white mb-3">
            Contact
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Questions about these terms:{" "}
            <a
              href="mailto:anesbrothers@gmail.com"
              className="text-[#c9a84c] hover:underline"
            >
              anesbrothers@gmail.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
