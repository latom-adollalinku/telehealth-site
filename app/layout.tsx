import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: {
    default: "LATOM Wellness | Physician-Led Telehealth Consultation",
    template: "%s | LATOM Wellness",
  },
  description:
    "Physician-led telehealth consultation, longevity guidance, and laboratory interpretation services. Membership-based digital wellness.",
  keywords: [
    "telehealth weight management",
    "weight loss physician",
    "physician telehealth consultation",
    "wellness consultation",
    "hormonal health consultation",
    "longevity medicine",
    "lab interpretation",
    "digital wellness membership",
  ],
  authors: [{ name: "Dr. Abdi Abdulhakim, MD" }],
  creator: "LATOM Wellness",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://latomwellness.com",
    siteName: "LATOM Wellness",
    title: "LATOM Wellness | Physician-Led Telehealth Consultation",
    description:
      "Physician-led telehealth consultation, longevity guidance, and laboratory interpretation services.",
  },
  twitter: {
    card: "summary_large_image",
    title: "LATOM Wellness",
    description:
      "Physician-supervised wellness consultation, longevity guidance, and lab interpretation services.",
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
    "Physician-led telehealth consultation practice offering wellness consultation, longevity guidance, and lab interpretation services. Led by Dr. Abdi Abdulhakim, MD.",
  url: "https://latomwellness.com",
  telephone: "+13072108604",
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
    "Weight Management Consultation",
    "Longevity Consultation",
    "Hormonal Health Consultation",
    "Lab Interpretation Services",
    "Digital Wellness Membership",
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
