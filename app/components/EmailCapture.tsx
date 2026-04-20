'use client';

import { useState } from 'react';

interface EmailCaptureProps {
  placeholder?: string;
  buttonText?: string;
  interest?: string;
  successMessage?: string;
  variant?: 'inline' | 'full';
}

export default function EmailCapture({
  placeholder = 'Enter your email',
  buttonText = 'Get Access',
  interest = 'general',
  successMessage = "You're on the list. We'll be in touch soon.",
  variant = 'inline',
}: EmailCaptureProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    const lead = {
      name,
      email,
      phone,
      interest,
      timestamp: new Date().toISOString(),
      page: typeof window !== 'undefined' ? window.location.pathname : '',
    };

    // Store to localStorage
    const existing = JSON.parse(localStorage.getItem('latom_leads') || '[]');
    existing.push(lead);
    localStorage.setItem('latom_leads', JSON.stringify(existing));

    // Log for debugging/monitoring
    console.log('[LATOM Lead Captured]', lead);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  if (submitted) {
    return (
      <div className="flex items-center gap-3 p-4 bg-[#1a2e1a] border border-green-600/40 rounded-lg">
        <svg
          className="w-5 h-5 text-green-500 flex-shrink-0"
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
        <p className="text-green-400 text-sm">{successMessage}</p>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2 flex-wrap sm:flex-nowrap">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          required
          className="flex-1 min-w-0 px-4 py-3 bg-[#1a1a2e] border border-[#2a2a4e] text-white placeholder-gray-500 rounded text-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-[#c9a84c] text-black font-semibold text-sm rounded hover:bg-[#e0c070] transition-colors whitespace-nowrap disabled:opacity-60"
        >
          {loading ? 'Sending...' : buttonText}
        </button>
      </form>
    );
  }

  // Full variant with name, email, phone
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Dr. Jane Smith"
            className="w-full px-4 py-3 bg-[#1a1a2e] border border-[#2a2a4e] text-white placeholder-gray-500 rounded text-sm"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Email <span className="text-[#c9a84c]">*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full px-4 py-3 bg-[#1a1a2e] border border-[#2a2a4e] text-white placeholder-gray-500 rounded text-sm"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm text-gray-400 mb-1">
          Phone <span className="text-gray-600">(optional)</span>
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="(555) 000-0000"
          className="w-full px-4 py-3 bg-[#1a1a2e] border border-[#2a2a4e] text-white placeholder-gray-500 rounded text-sm"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-[#c9a84c] text-black font-semibold text-sm rounded hover:bg-[#e0c070] transition-colors disabled:opacity-60"
      >
        {loading ? 'Submitting...' : buttonText}
      </button>
    </form>
  );
}
