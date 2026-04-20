import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Free Consultation — Start Your Wellness Journey",
  description:
    "Request a free consultation with Dr. Abdilatif Abdulhakim. Physician-supervised weight management, peptide therapy, and hormone optimization.",
};

export default function ContactPage() {
  return <ContactClient />;
}
