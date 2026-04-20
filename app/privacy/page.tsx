import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "LATOM Medical & Wellness privacy policy.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-10">
        <Link
          href="/"
          className="text-[#c9a84c] text-sm hover:underline"
        >
          ← Back to Home
        </Link>
      </div>

      <h1 className="font-serif text-4xl font-bold text-white mb-2">
        Privacy Policy
      </h1>
      <p className="text-gray-500 text-sm mb-10">
        Last updated: April 2026
      </p>

      <div className="prose prose-invert max-w-none space-y-8">
        <section>
          <h2 className="font-serif text-xl font-bold text-white mb-3">
            Information We Collect
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            We collect information you voluntarily provide, including name,
            email address, phone number, and the nature of your inquiry when
            you submit contact or opt-in forms on this site. We also collect
            standard web analytics data (page views, referral sources) through
            non-identifying means.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-bold text-white mb-3">
            How We Use Your Information
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            We use your contact information to respond to inquiries, send
            requested resources (such as the free Tax Strategy Guide), and
            communicate about services you have expressed interest in. We do
            not sell, rent, or share your personal information with third
            parties for marketing purposes.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-bold text-white mb-3">
            Data Storage
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Form submissions on this site are temporarily stored in your
            browser&apos;s localStorage as the site builds toward a full CRM
            integration. No sensitive personal data is transmitted to
            third-party servers through this site at this time.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-bold text-white mb-3">
            Medical Disclaimer
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            This site is for educational purposes only. Nothing on this site
            constitutes medical advice. Telehealth services, when available,
            will be provided under a formal patient-physician relationship with
            proper consent and HIPAA-compliant infrastructure.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-bold text-white mb-3">
            Contact
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            For privacy-related questions, contact us at{" "}
            <a
              href="mailto:anesbrothers@gmail.com"
              className="text-[#c9a84c] hover:underline"
            >
              anesbrothers@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
