import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: {
    default: "LATOM Wellness | Physician-Supervised Peptides, GLP-1s, Hormone Therapy",
    template: "%s | LATOM Wellness",
  },
  description:
    "Medical-grade wellness delivered. Physician-supervised weight management, peptide therapy, hormone optimization, and longevity protocols. Evidence-based care from a physician MD.",
  keywords: [
    "telehealth weight management",
    "weight loss physician",
    "GLP-1 prescription online",
    "peptide therapy",
    "TRT online",
    "hormone optimization",
    "GLP-1 physician",
    "longevity medicine",
  ],
  authors: [{ name: "Dr. Abdi Abdulhakim, MD" }],
  creator: "LATOM Wellness",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://latomwellness.com",
    siteName: "LATOM Wellness",
    title: "LATOM Wellness | Physician-Supervised Peptides, GLP-1s, Hormone Therapy",
    description:
      "Medical-grade wellness delivered. Physician-supervised weight management, peptide therapy, and longevity medicine.",
  },
  twitter: {
    card: "summary_large_image",
    title: "LATOM Wellness",
    description:
      "Physician-supervised weight management, peptide therapy, and hormone optimization.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  name: "LATOM Wellness",
  description:
    "Physician-supervised telehealth practice offering weight management, peptide therapy, and hormone optimization. Led by Dr. Abdi Abdulhakim, MD.",
  url: "https://latomwellness.com",
  telephone: "+16787903900",
  email: "info@latomwellness.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Richmond",
    addressRegion: "VA",
    addressCountry: "US",
  },
  founder: {
    "@type": "Person",
    name: "Dr. Abdi Abdulhakim",
    jobTitle: "Anesthesiologist",
  },
  serviceType: [
    "Weight Management",
    "Peptide Therapy",
    "Hormone Optimization",
    "Longevity Medicine",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-[#0a0a0a] text-white antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
