import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
 title: "Free Consultation - Start Your Wellness Journey",
 description:
 "Request a free consultation with Dr. Abdul. Physician-supervised weight management, recovery and performance support, and hormone health education.",
};

export default function ContactPage() {
 return <ContactClient />;
}
