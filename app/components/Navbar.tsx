'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
 { href: '/services', label: 'Services' },
 { href: '/labs', label: 'Labs' },
 { href: '/how-it-works', label: 'How It Works' },
 { href: '/about', label: 'About' },
 { href: '/contact', label: 'Contact' },
];

function ThemeToggle() {
 const [theme, setTheme] = useState<'light' | 'dark'>('light');

 useEffect(() => {
 const t = (document.documentElement.getAttribute('data-theme') as 'light' | 'dark') || 'light';
 setTheme(t);
 }, []);

 const toggle = () => {
 const next = theme === 'dark' ? 'light' : 'dark';
 setTheme(next);
 document.documentElement.setAttribute('data-theme', next);
 try { localStorage.setItem('latom-theme', next); } catch {}
 };

 return (
 <button
 onClick={toggle}
 aria-label="Toggle light or dark theme"
 className="p-2 text-muted hover:text-accent transition-colors"
 >
 {theme === 'dark' ? (
 // sun
 <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
 <circle cx="12" cy="12" r="4" />
 <path strokeLinecap="round" d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
 </svg>
 ) : (
 // moon
 <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
 </svg>
 )}
 </button>
 );
}

export default function Navbar() {
 const [isOpen, setIsOpen] = useState(false);
 const [scrolled, setScrolled] = useState(false);
 const pathname = usePathname();

 useEffect(() => {
 const handleScroll = () => setScrolled(window.scrollY > 20);
 window.addEventListener('scroll', handleScroll);
 return () => window.removeEventListener('scroll', handleScroll);
 }, []);

 useEffect(() => { setIsOpen(false); }, [pathname]);

 return (
 <nav
 className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 border-b ${
 scrolled ? 'bg-bg border-line' : 'bg-bg/80 border-transparent'
 }`}
 >
 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="flex items-center justify-between h-16">
 {/* Logo */}
 <Link href="/" className="flex items-center gap-3">
 <span className="font-serif text-2xl text-ink tracking-tight">LATOM</span>
 <span className="hidden sm:block text-[11px] text-muted tracking-[0.18em] uppercase border-l border-line pl-3">
 Medical Wellness
 </span>
 </Link>

 {/* Desktop Nav */}
 <div className="hidden md:flex items-center gap-8">
 {navLinks.map((link) => (
 <Link
 key={link.href}
 href={link.href}
 className={`text-sm transition-colors duration-200 ${
 pathname === link.href ? 'text-accent' : 'text-muted hover:text-ink'
 }`}
 >
 {link.label}
 </Link>
 ))}
 <div className="ml-2 flex items-center gap-2">
 <ThemeToggle />
 <Link href="/book" className="px-5 py-2 bg-accent text-[color:var(--on-accent)] text-sm font-medium rounded-sm hover:bg-accent-hover transition-colors">
 Book
 </Link>
 <Link href="/pay" className="px-5 py-2 border border-line text-ink text-sm font-medium rounded-sm hover:border-accent transition-colors">
 Pay
 </Link>
 </div>
 </div>

 {/* Mobile controls */}
 <div className="md:hidden flex items-center gap-1">
 <ThemeToggle />
 <button
 className="text-muted hover:text-ink p-2"
 onClick={() => setIsOpen(!isOpen)}
 aria-label="Toggle menu"
 >
 <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
 {isOpen
 ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
 : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
 </svg>
 </button>
 </div>
 </div>

 {/* Mobile Menu */}
 {isOpen && (
 <div className="md:hidden bg-surface border-t border-line py-4 -mx-4 px-4 sm:-mx-6 sm:px-6">
 {navLinks.map((link) => (
 <Link
 key={link.href}
 href={link.href}
 className={`block px-1 py-3 text-sm transition-colors ${
 pathname === link.href ? 'text-accent' : 'text-muted hover:text-ink'
 }`}
 >
 {link.label}
 </Link>
 ))}
 <div className="pt-3 flex gap-2">
 <Link href="/book" className="flex-1 text-center px-5 py-2 bg-accent text-[color:var(--on-accent)] text-sm font-medium rounded-sm">
 Book
 </Link>
 <Link href="/pay" className="flex-1 text-center px-5 py-2 border border-line text-ink text-sm font-medium rounded-sm">
 Pay
 </Link>
 </div>
 </div>
 )}
 </div>
 </nav>
 );
}
