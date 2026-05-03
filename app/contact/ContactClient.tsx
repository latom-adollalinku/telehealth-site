'use client';

import { useState } from "react";
import Link from "next/link";
import ScrollFade from "../components/ScrollFade";

const interestOptions = [
  "Select your interest...",
  "Weight Loss (GLP-1s)",
  "Peptide Therapy",
  "Hormone Optimization (TRT/HRT)",
  "Longevity / NAD+",
  "Not sure — need guidance",
  "Other",
];

export default function ContactClient() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.name) return;
    setLoading(true);

    const lead = {
      ...form,
      timestamp: new Date().toISOString(),
      source: "contact-page-telehealth",
    };

    const existing = JSON.parse(
      localStorage.getItem("latom_leads") || "[]"
    );
    existing.push(lead);
    localStorage.setItem("latom_leads", JSON.stringify(existing));

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d1a] to-[#0a0a0a]" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/5 mb-6">
            <span className="text-[#c9a84c] text-xs tracking-widest uppercase font-medium">
              Free Consultation
            </span>
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-white mb-4">
            Request a Consultation
          </h1>
          <p className="text-gray-400 text-lg">
            Tell us your goals. A physician will review your case and reach out within 24 hours.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-2">
            <ScrollFade>
              <div className="space-y-6">
                <div className="p-6 bg-[#1a1a2e] border border-[#2a2a4e] rounded-xl">
                  <h3 className="font-semibold text-white mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex gap-3 items-start">
                      <svg
                        className="w-5 h-5 text-[#c9a84c] mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <div>
                        <div className="text-gray-500 text-xs mb-1">Email</div>
                        <a
                          href="mailto:info@latomwellness.com"
                          className="text-gray-300 text-sm hover:text-[#c9a84c] transition-colors"
                        >
                          info@latomwellness.com
                        </a>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <svg
                        className="w-5 h-5 text-[#c9a84c] mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <div>
                        <div className="text-gray-500 text-xs mb-1">Location</div>
                        <div className="text-gray-300 text-sm">
                          Richmond, Virginia (telehealth)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-xl">
                  <h3 className="font-semibold text-white mb-2">
                    What Happens Next?
                  </h3>
                  <ol className="space-y-3 mt-4">
                    {[
                      "We review your inquiry within 24 hours",
                      "A team member reaches out to schedule your free video consultation",
                      "You meet with Dr. Abdulhakim to discuss your goals",
                      "If appropriate, we design a protocol and get you started",
                    ].map((step, i) => (
                      <li key={i} className="flex gap-3 text-sm text-gray-400">
                        <span className="font-bold text-[#c9a84c] flex-shrink-0">{i + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="p-6 bg-[#1a1a2e] border border-[#2a2a4e] rounded-xl">
                  <h3 className="font-semibold text-white mb-3">Our Programs</h3>
                  <div className="space-y-2">
                    {[
                      { href: "/services#weight-management", label: "Weight Management — from $299/mo" },
                      { href: "/services#peptide-therapy", label: "Peptide Therapy — from $199/mo" },
                      { href: "/services#hormone-optimization", label: "Hormone Optimization — from $349/mo" },
                    ].map((item, i) => (
                      <Link
                        key={i}
                        href={item.href}
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#c9a84c] transition-colors"
                      >
                        <span className="text-[#c9a84c]">→</span>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollFade>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <ScrollFade delay={100}>
              {submitted ? (
                <div className="p-10 bg-[#1a2e1a] border border-green-600/30 rounded-2xl text-center">
                  <div className="w-16 h-16 rounded-full bg-green-900/40 border border-green-600/40 flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-8 h-8 text-green-500"
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
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white mb-3">
                    Request Received
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Dr. Abdulhakim&apos;s team will reach out within 24 hours to schedule your free consultation.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: "",
                        email: "",
                        phone: "",
                        interest: "",
                        message: "",
                      });
                    }}
                    className="text-[#c9a84c] text-sm hover:underline"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <div className="p-8 bg-[#1a1a2e] border border-[#2a2a4e] rounded-2xl">
                  <h2 className="font-serif text-2xl font-bold text-white mb-2">
                    Request Free Consultation
                  </h2>
                  <p className="text-gray-400 text-sm mb-8">
                    No commitment required. This is an inquiry form — not medical advice.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">
                          Name <span className="text-[#c9a84c]">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="Your full name"
                          className="w-full px-4 py-3 bg-[#13132a] border border-[#2a2a4e] text-white placeholder-gray-600 rounded text-sm focus:border-[#c9a84c] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">
                          Email <span className="text-[#c9a84c]">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="you@example.com"
                          className="w-full px-4 py-3 bg-[#13132a] border border-[#2a2a4e] text-white placeholder-gray-600 rounded text-sm focus:border-[#c9a84c] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">
                          Phone{" "}
                          <span className="text-gray-600">(optional)</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="(555) 000-0000"
                          className="w-full px-4 py-3 bg-[#13132a] border border-[#2a2a4e] text-white placeholder-gray-600 rounded text-sm focus:border-[#c9a84c] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">
                          I am interested in
                        </label>
                        <select
                          name="interest"
                          value={form.interest}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-[#13132a] border border-[#2a2a4e] text-white rounded text-sm appearance-none cursor-pointer focus:border-[#c9a84c] focus:outline-none"
                        >
                          {interestOptions.map((opt, i) => (
                            <option
                              key={i}
                              value={i === 0 ? "" : opt}
                              disabled={i === 0}
                            >
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-1">
                        What brought you here?
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Share your health goals, what you've tried before, or any questions you have..."
                        className="w-full px-4 py-3 bg-[#13132a] border border-[#2a2a4e] text-white placeholder-gray-600 rounded text-sm resize-none focus:border-[#c9a84c] focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-[#c9a84c] text-black font-bold rounded tracking-wide hover:bg-[#e0c070] transition-colors disabled:opacity-60 text-sm"
                    >
                      {loading ? "Submitting..." : "Request Free Consultation"}
                    </button>

                    <p className="text-gray-600 text-xs text-center leading-relaxed">
                      Not medical advice. This is an inquiry form only. By submitting, you agree to our{" "}
                      <Link href="/privacy" className="hover:text-[#c9a84c]">
                        Privacy Policy
                      </Link>
                      . We do not sell your information.
                    </p>
                  </form>
                </div>
              )}
            </ScrollFade>
          </div>
        </div>
      </section>
    </>
  );
}
