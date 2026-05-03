import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#060610] border-t border-[#c9a84c]/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <span className="font-serif text-3xl font-bold text-[#c9a84c] tracking-wider">
              LATOM
            </span>
            <p className="mt-3 text-gray-400 text-sm leading-relaxed max-w-sm">
              LATOM Wellness is a physician-led telehealth consultation practice delivering
              evidence-based wellness guidance, longevity consultation, and
              lab interpretation services directly to patients.
            </p>
            <div className="mt-6 flex flex-col gap-1 text-sm text-gray-400">
              <a
                href="mailto:info@latomwellness.com"
                className="hover:text-[#c9a84c] transition-colors"
              >
                info@latomwellness.com
              </a>
              <a
                href="tel:3072108604"
                className="hover:text-[#c9a84c] transition-colors"
              >
                (307) 210-8604
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-4">
              Services
            </h4>
            <ul className="space-y-2">
              {[
                { href: '/services', label: 'Weight Management' },
                { href: '/services#longevity-consultation', label: 'Longevity Consultation' },
                { href: '/services#hormone-consultation', label: 'Hormonal Health Consultation' },
                { href: '/how-it-works', label: 'How It Works' },
                { href: '/calculator', label: 'Dosing Guide' },
                { href: '/about', label: 'About Dr. Abdulhakim' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-[#c9a84c] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              {[
                { href: '/privacy', label: 'Privacy Policy' },
                { href: '/terms', label: 'Terms of Service' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-[#c9a84c] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 pt-8 border-t border-[#c9a84c]/10">
          <p className="text-gray-500 text-xs leading-relaxed max-w-3xl">
            <strong className="text-gray-400">Medical Disclaimer:</strong> LATOM Wellness is a
            physician-led telehealth consultation practice. All clinical programs are physician-supervised.
            When prescriptions are clinically appropriate, they are dispensed by licensed US pharmacies.
            This service is available only to patients in states where
            Dr. Abdulhakim is licensed. Not a substitute for in-person emergency care.
            Results described are individual and not guaranteed. This site does not provide
            emergency medical services — if you are experiencing a medical emergency, call 911.
          </p>
          <p className="mt-4 text-gray-600 text-xs">
            &copy; {new Date().getFullYear()} LATOM Wellness / Telehealth PLLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
