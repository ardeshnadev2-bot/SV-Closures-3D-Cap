'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ClienteleSection from '@/components/ClienteleSection';
import ProductRanges from '@/components/ProductRanges';
import AboutSection from '@/components/AboutSection';
import IndustriesSection from '@/components/IndustriesSection';
import ProductsSection from '@/components/ProductsSection';
import InfrastructureSection from '@/components/InfrastructureSection';
import SustainabilitySection from '@/components/SustainabilitySection';
import GlobalReachMap from '@/components/GlobalReachMap';
import Certifications from '@/components/Certifications';
import GallerySection from '@/components/GallerySection';
import ContactSection from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';

type ActiveViewType = 'all' | 'home' | 'about' | 'products' | 'industries' | 'infrastructure' | 'sustainability' | 'global-reach' | 'gallery' | 'contact';

export default function Home() {
  const [activeView, setActiveView] = useState<ActiveViewType>('home');

  useEffect(() => {
    const validSections = ['home', 'about', 'products', 'packaging', 'industries', 'infrastructure', 'sustainability', 'global-reach', 'gallery', 'contact'];

    // 1. Initial URL hash check (safe for client side execution)
    const checkHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (validSections.includes(hash)) {
        const targetView = hash === 'packaging' ? 'products' : hash;
        setActiveView(targetView as ActiveViewType);
      } else {
        setActiveView('home');
      }
    };

    checkHash();

    // 2. Listen to URL hash change
    window.addEventListener('hashchange', checkHash);

    // 3. Listen to navigation events from Navbar/Hero
    const handleScrollToSection = (e: Event) => {
      const customEvent = e as CustomEvent<{ targetId: string }>;
      const targetId = customEvent.detail.targetId;
      
      if (validSections.includes(targetId)) {
        const view = targetId === 'packaging' ? 'products' : targetId;
        setActiveView(view as ActiveViewType);
        
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 150);
      } else {
        setActiveView('home');
      }
    };

    window.addEventListener('scroll-to-section', handleScrollToSection);

    // 4. Restore sections when selecting/enquiring a product (which scrolls to contact)
    const handleSelectProduct = () => {
      setActiveView('contact');
      setTimeout(() => {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    };

    window.addEventListener('select-product', handleSelectProduct);

    return () => {
      window.removeEventListener('hashchange', checkHash);
      window.removeEventListener('scroll-to-section', handleScrollToSection);
      window.removeEventListener('select-product', handleSelectProduct);
    };
  }, []);

  return (
    <>
      {/* Global Navigation Bar */}
      <Navbar />

      {/* Main Single Page Layout Sections */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {activeView === 'all' && (
            <motion.div
              key="all-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-0"
            >
              <HeroSection />
              <ClienteleSection />
              <ProductRanges />
              <GlobalReachMap />
              <ProductsSection />
              <AboutSection />
              <IndustriesSection />
              <InfrastructureSection />
              <SustainabilitySection />
              <Certifications />
              <GallerySection />
              <ContactSection />
            </motion.div>
          )}

          {activeView === 'home' && (
            <motion.div
              key="home-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <HeroSection />
              <ClienteleSection />
              <ProductRanges />
              <Certifications />
            </motion.div>
          )}

          {activeView === 'about' && (
            <motion.div
              key="about-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <AboutSection />
              <Certifications />
            </motion.div>
          )}

          {activeView === 'products' && (
            <motion.div
              key="products-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <ProductsSection />
            </motion.div>
          )}

          {activeView === 'industries' && (
            <motion.div
              key="industries-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <IndustriesSection />
            </motion.div>
          )}

          {activeView === 'infrastructure' && (
            <motion.div
              key="infrastructure-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <InfrastructureSection />
            </motion.div>
          )}

          {activeView === 'sustainability' && (
            <motion.div
              key="sustainability-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <SustainabilitySection />
            </motion.div>
          )}

          {activeView === 'global-reach' && (
            <motion.div
              key="global-reach-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <GlobalReachMap />
            </motion.div>
          )}

          {activeView === 'gallery' && (
            <motion.div
              key="gallery-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <GallerySection />
            </motion.div>
          )}

          {activeView === 'contact' && (
            <motion.div
              key="contact-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <ContactSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Block */}
      <Footer />

      {/* WhatsApp Chat Floating Tool */}
      <WhatsAppButton />
    </>
  );
}
