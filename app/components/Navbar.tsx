'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/surgical-preop', label: 'Surgical Preop' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#c9a84c]/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif text-2xl font-bold text-[#c9a84c] tracking-wider">
              LATOM
            </span>
            <span className="hidden sm:block text-xs text-gray-400 tracking-widest uppercase border-l border-gray-600 pl-2 ml-1">
              Medical Wellness
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-wide transition-colors duration-200 ${
                  pathname === link.href
                    ? 'text-[#c9a84c]'
                    : 'text-gray-300 hover:text-[#c9a84c]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="ml-4 flex gap-2">
              <Link
                href="/book"
                className="px-5 py-2 bg-[#c9a84c] text-black text-sm font-semibold rounded tracking-wide hover:bg-[#e0c070] transition-colors duration-200"
              >
                Book Now
              </Link>
              <Link
                href="/pay"
                className="px-5 py-2 border border-[#c9a84c] text-[#c9a84c] text-sm font-semibold rounded tracking-wide hover:bg-[#c9a84c] hover:text-black transition-colors duration-200"
              >
                Pay
              </Link>
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-gray-300 hover:text-[#c9a84c] p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-[#0d0d1a] border-t border-[#c9a84c]/20 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 text-sm tracking-wide transition-colors ${
                  pathname === link.href
                    ? 'text-[#c9a84c]'
                    : 'text-gray-300 hover:text-[#c9a84c]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4 pt-3 flex gap-2">
              <Link
                href="/book"
                className="flex-1 block text-center px-5 py-2 bg-[#c9a84c] text-black text-sm font-semibold rounded tracking-wide hover:bg-[#e0c070] transition-colors"
              >
                Book
              </Link>
              <Link
                href="/pay"
                className="flex-1 block text-center px-5 py-2 border border-[#c9a84c] text-[#c9a84c] text-sm font-semibold rounded tracking-wide hover:bg-[#c9a84c] hover:text-black transition-colors"
              >
                Pay
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
