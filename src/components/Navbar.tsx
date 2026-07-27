'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { motion } from 'framer-motion';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Products', href: '#products' },
  { name: 'Industries', href: '#industries' },
  { name: 'Infrastructure', href: '#infrastructure' },
  { name: 'Sustainability', href: '#sustainability' },
  { name: 'Global Reach', href: '#global-reach' },
  { name: 'Gallery', href: '#gallery' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  const isScrollingToRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // 1. Lightweight Scroll Listener for Navbar styling and progress tracking
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled((prev) => {
        if (prev !== isScrolled) return isScrolled;
        return prev;
      });

      // Calculate scroll progress percentage
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolledPercent = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(scrolledPercent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    // 2. Synchronize navigation active state and lock scrollspy during manual scrolling
    const handleScrollToSectionEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ targetId: string }>;
      const targetId = customEvent.detail.targetId;
      setActiveSection(targetId);

      // Lock scrollspy to prevent middle section updates
      isScrollingToRef.current = true;
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingToRef.current = false;
      }, 1000);
    };

    window.addEventListener('scroll-to-section', handleScrollToSectionEvent);

    // 3. High-Performance IntersectionObserver for Scroll Spy
    const sections = ['home', 'about', 'products', 'industries', 'infrastructure', 'sustainability', 'global-reach', 'gallery', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -55% 0px', // Adjusted to account for sticky header height
      threshold: [0, 0.1, 0.2],
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Skip updates if a scroll animation is currently active
      if (isScrollingToRef.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // 4. Smooth scroll to hash on page load with scrollspy lock
    const initialHash = window.location.hash;
    if (initialHash) {
      const targetId = initialHash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        setActiveSection(targetId);
        isScrollingToRef.current = true;
        
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
          scrollTimeoutRef.current = setTimeout(() => {
            isScrollingToRef.current = false;
          }, 1000);
        }, 300);
      }
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll-to-section', handleScrollToSectionEvent);
      observer.disconnect();
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    
    // Always close mobile menu if it is open
    const wasMobileOpen = mobileMenuOpen;
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }

    // Dispatch scroll event to notify components and lock scrollspy
    window.dispatchEvent(new CustomEvent('scroll-to-section', { detail: { targetId } }));

    const element = document.getElementById(targetId);
    if (element) {
      if (wasMobileOpen) {
        // Wait for mobile menu closing transition to finish (avoiding multi-animation jank)
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    
    window.history.replaceState(null, '', href);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-nav py-3 shadow-sm' : 'bg-transparent py-5'
      }`}
      id="navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 relative group">
            {/* Soft background glow */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-primary-blue to-primary-green rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500" />
            <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="relative flex items-center">
              <div className="relative h-12 w-32 transition-transform duration-300 hover:scale-105">
                <Image
                  src="/images/logo.png"
                  alt="SV Closures Logo"
                  fill
                  className="object-contain dark:drop-shadow-[0_0_2px_rgba(255,255,255,0.85)]"
                  priority
                />
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const active = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`px-3 py-2 text-sm font-semibold transition-all duration-200 relative group ${
                    active
                      ? 'text-primary-blue dark:text-primary-green'
                      : 'text-text-dark dark:text-slate-300 hover:text-primary-blue dark:hover:text-primary-green'
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  {active && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-3 right-3 h-[2.5px] bg-gradient-to-r from-primary-blue to-primary-green rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {!active && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-primary-blue/30 dark:bg-primary-green/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Theme Toggle & Contact Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary-blue to-primary-green hover:from-primary-green hover:to-primary-blue text-white text-sm font-semibold tracking-wide shadow-md shadow-primary-blue/20 dark:shadow-primary-green/10 hover:shadow-lg transition-all duration-300 btn-shine group"
              id="nav-contact-btn"
            >
              Contact Us
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.a>
          </div>

          {/* Mobile menu and toggle */}
          <div className="flex lg:hidden items-center space-x-3">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-text-dark dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-transform duration-300 ease-in-out transform ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Backdrop overlay */}
        <div
          className="absolute inset-0 bg-slate-900/30 dark:bg-slate-950/50 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
        
        {/* Drawer contents */}
        <div className="absolute right-0 top-0 bottom-0 w-72 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between border-l border-slate-100 dark:border-slate-800/80 shadow-2xl">
          <div className="flex flex-col space-y-6 mt-16">
            {navLinks.map((link) => {
              const active = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`text-lg font-medium py-1 transition-colors ${
                    active
                      ? 'text-primary-blue dark:text-primary-green border-l-2 border-primary-green pl-2'
                      : 'text-text-dark dark:text-slate-300'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="flex items-center justify-center gap-1.5 w-full py-3 rounded-xl bg-gradient-to-r from-primary-blue to-primary-green text-white font-semibold shadow-md"
            >
              Contact Us
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Progress Indicator Bar */}
      <div 
        className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-primary-blue to-primary-green transition-all duration-100 ease-out origin-left pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
      />
    </nav>
  );
}
