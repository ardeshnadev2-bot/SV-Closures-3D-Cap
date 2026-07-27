'use client';

import Image from 'next/image';
import { Mail, MapPin, Phone, ArrowRight } from 'lucide-react';

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About Us', href: '#about' },
  { name: 'Products', href: '#products' },
  { name: 'Industries We Serve', href: '#industries' },
];

const secondaryLinks = [
  { name: 'Infrastructure', href: '#infrastructure' },
  { name: 'Sustainability', href: '#sustainability' },
  { name: 'Global Presence', href: '#global-reach' },
  { name: 'Media Gallery', href: '#gallery' },
];

export function Footer() {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');

    // Dispatch scroll event to notify components and lock scrollspy
    window.dispatchEvent(new CustomEvent('scroll-to-section', { detail: { targetId } }));

    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Update URL hash without polluting browser history back stack
      window.history.replaceState(null, '', href);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-8 overflow-hidden z-10">
      {/* Background radial highlight */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-blue/5 dark:bg-primary-green/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Brief */}
          <div className="space-y-6">
            <div className="inline-block transition-transform duration-300 hover:scale-105">
              <Image
                src="/images/logo.png"
                alt="SV Closures Logo"
                width={120}
                height={45}
                className="object-contain dark:drop-shadow-[0_0_2px_rgba(255,255,255,0.85)]"
              />
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Innovative closure systems. Since 1998, SV Closures Private Limited has delivered high-quality, leak-proof plastic caps, closures, and custom dispensing solutions to global industries.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-3.5">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 hover:bg-primary-blue hover:text-white flex items-center justify-center transition-all duration-300 text-slate-500"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 hover:bg-primary-blue hover:text-white flex items-center justify-center transition-all duration-300 text-slate-500"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 hover:bg-primary-green hover:text-white flex items-center justify-center transition-all duration-300 text-slate-500"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 hover:bg-red-600 hover:text-white flex items-center justify-center transition-all duration-300 text-slate-500"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.107C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.388.511a3.002 3.002 0 0 0-2.11 2.107C0 8.053 0 12 0 12s0 3.947.502 5.837a3.003 3.003 0 0 0 2.11 2.107C4.495 20.455 12 20.455 12 20.455s7.505 0 9.388-.511a3.003 3.003 0 0 0 2.11-2.107C24 15.947 24 12 24 12s0-3.947-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Navigation 1 */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-6 border-l-2 border-primary-blue pl-3">
              Solutions
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-slate-400 hover:text-primary-blue hover:translate-x-1.5 flex items-center gap-1.5 transition-all duration-200 text-sm group"
                  >
                    <ArrowRight className="w-3 h-3 text-primary-blue/60 group-hover:text-primary-blue transition-colors" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Navigation 2 */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-6 border-l-2 border-primary-green pl-3">
              Explore More
            </h3>
            <ul className="space-y-4">
              {secondaryLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-slate-400 hover:text-primary-green hover:translate-x-1.5 flex items-center gap-1.5 transition-all duration-200 text-sm group"
                  >
                    <ArrowRight className="w-3 h-3 text-primary-green/60 group-hover:text-primary-green transition-colors" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-6 border-l-2 border-primary-blue pl-3">
              Contact Info
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-blue shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Plot No. 30/A, Tilara Gate,<br />
                  Rajkot - 360024, Gujarat, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-green shrink-0" />
                <div className="flex flex-col gap-0.5">
                  <a href="tel:+919909216358" className="hover:text-white transition-colors">
                    +91 99092 16358
                  </a>
                  <a href="tel:+919978616358" className="hover:text-white transition-colors">
                    +91 99786 16358
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-blue shrink-0" />
                <a href="mailto:info@svclosures.com" className="hover:text-white transition-colors">
                  info@svclosures.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 mt-12 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {currentYear} SV Closures Private Limited. All Rights Reserved.</p>
          <div className="flex space-x-6">
            <a href="#about" onClick={(e) => handleLinkClick(e, '#about')} className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')} className="hover:text-slate-400 transition-colors">
              Terms of Service
            </a>
            <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')} className="hover:text-slate-400 transition-colors">
              Inquire Now
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
