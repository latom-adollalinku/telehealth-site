'use client';

import { useState } from 'react';

interface FAQItem {
 question: string;
 answer: string;
}

interface FAQProps {
 items: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
 const [openIndex, setOpenIndex] = useState<number | null>(null);

 return (
 <div className="space-y-3">
 {items.map((item, i) => (
 <div
 key={i}
 className="border border-line rounded-lg overflow-hidden"
 >
 <button
 onClick={() => setOpenIndex(openIndex === i ? null : i)}
 className="w-full flex items-center justify-between px-6 py-4 text-left bg-surface hover:bg-[#1e1e38] transition-colors"
 >
 <span className="text-ink font-medium pr-4">{item.question}</span>
 <svg
 className={`w-5 h-5 text-accent flex-shrink-0 transition-transform duration-300 ${
 openIndex === i ? 'rotate-180' : ''
 }`}
 fill="none"
 stroke="currentColor"
 viewBox="0 0 24 24"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth={2}
 d="M19 9l-7 7-7-7"
 />
 </svg>
 </button>
 {openIndex === i && (
 <div className="px-6 py-4 bg-[#13132a] text-muted text-sm leading-relaxed">
 {item.answer}
 </div>
 )}
 </div>
 ))}
 </div>
 );
}
