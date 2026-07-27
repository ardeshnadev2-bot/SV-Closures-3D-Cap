'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Activity, Users, Globe2, Award } from 'lucide-react';
import { useEffect, useState } from 'react';

// Dynamically import the 3D Canvas with SSR disabled to prevent WebGL compilation errors on server
const Hero3DCanvas = dynamic(() => import('./Hero3DCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center relative">
      <div className="w-20 h-20 rounded-full border-4 border-primary-blue/30 border-t-primary-blue animate-spin" />
    </div>
  ),
});

// Dynamic stat counter utility
function AnimatedCounter({ value, duration = 2 }: { value: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value);
  const suffix = value.replace(numericValue.toString(), '');

  useEffect(() => {
    let start = 0;
    const end = numericValue;
    if (isNaN(end)) return;
    
    const stepTime = Math.abs(Math.floor((duration * 1000) / end));
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, Math.max(stepTime, 15));

    return () => clearInterval(timer);
  }, [numericValue, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    setMousePosition({ x: clientX - left, y: clientY - top });
  };

  const handleScrollTo = (id: string) => {
    window.dispatchEvent(new CustomEvent('scroll-to-section', { detail: { targetId: id } }));

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, '', '#' + id);
    }
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center pt-24 pb-12 lg:pt-32 lg:pb-20 overflow-hidden bg-gradient-to-b from-blue-50/20 via-transparent to-transparent dark:from-slate-950/40 dark:via-slate-900/20 dark:to-transparent z-10"
    >
      {/* Cap Pattern Overlay background */}
      <div className="absolute inset-0 cap-pattern-overlay opacity-30 pointer-events-none -z-20" />

      {/* Mouse following glow spotlight */}
      <div
        className="absolute pointer-events-none -z-10 w-[450px] h-[450px] bg-primary-blue/15 dark:bg-primary-green/10 rounded-full blur-[120px] transition-all duration-300 ease-out"
        style={{
          left: `${mousePosition.x - 225}px`,
          top: `${mousePosition.y - 225}px`,
        }}
      />

      {/* Floating static decorative Cap SVGs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div
          animate={{
            y: [-15, 15, -15],
            rotate: [0, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[20%] right-[10%] opacity-20 dark:opacity-30 text-primary-blue"
        >
          <svg width="45" height="45" viewBox="0 0 100 100" fill="currentColor">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="6,4" />
            <circle cx="50" cy="50" r="30" />
          </svg>
        </motion.div>
        
        <motion.div
          animate={{
            y: [20, -20, 20],
            rotate: [360, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-[25%] left-[8%] opacity-15 dark:opacity-20 text-primary-green"
        >
          <svg width="55" height="55" viewBox="0 0 100 100" fill="currentColor">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="10" strokeDasharray="8,6" />
            <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="6" />
          </svg>
        </motion.div>
      </div>

      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-primary-blue/10 rounded-full blur-[80px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-primary-green/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content Block */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-blue/10 dark:bg-primary-blue/20 text-primary-blue dark:text-accent-blue text-xs font-semibold uppercase tracking-wider"
            >
              <ShieldCheck className="w-4 h-4 text-primary-green" />
              Trusted Global Export Partner
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-dark dark:text-white leading-[1.1]"
            >
              Innovative{' '}
              <span className="bg-gradient-to-r from-primary-blue via-accent-blue to-primary-green bg-clip-text text-transparent">
                Closure Solutions
              </span>{' '}
              for Every Industry
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-text-light dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light"
            >
              Manufacturing high-quality plastic caps, closures, spouts, and dispensing systems trusted by leading brands worldwide. Precision-engineered for leakage protection and structural integrity.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                href="#products"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo('products');
                }}
                className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-primary-blue to-primary-green hover:shadow-lg hover:shadow-primary-blue/20 text-white font-semibold transition-all duration-300 btn-shine group w-full sm:w-auto justify-center cursor-pointer"
              >
                Explore Products
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo('contact');
                }}
                className="flex items-center gap-1 px-8 py-3.5 rounded-full glass-card hover:bg-slate-100 dark:hover:bg-slate-800 text-text-dark dark:text-white font-semibold transition-all duration-300 w-full sm:w-auto justify-center cursor-pointer"
              >
                Contact Us
              </motion.a>
            </motion.div>

            {/* Mini Statistics Grid */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-slate-100 dark:border-slate-800/80"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 justify-center lg:justify-start text-primary-blue font-bold text-2xl">
                  <Award className="w-5 h-5 text-primary-green shrink-0" />
                  <AnimatedCounter value="25+" />
                </div>
                <p className="text-xs text-text-light dark:text-slate-400 font-medium">Years Legacy</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 justify-center lg:justify-start text-primary-blue font-bold text-2xl">
                  <Activity className="w-5 h-5 text-primary-green shrink-0" />
                  <AnimatedCounter value="50+" />
                </div>
                <p className="text-xs text-text-light dark:text-slate-400 font-medium">Product Lines</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 justify-center lg:justify-start text-primary-blue font-bold text-2xl">
                  <Globe2 className="w-5 h-5 text-primary-green shrink-0" />
                  <AnimatedCounter value="20+" />
                </div>
                <p className="text-xs text-text-light dark:text-slate-400 font-medium">Export Countries</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 justify-center lg:justify-start text-primary-blue font-bold text-2xl">
                  <Users className="w-5 h-5 text-primary-green shrink-0" />
                  <AnimatedCounter value="100+" />
                </div>
                <p className="text-xs text-text-light dark:text-slate-400 font-medium">Global Clients</p>
              </div>
            </motion.div>
          </div>

          {/* 3D Model Floating Canvas Block */}
          <div className="lg:col-span-5 w-full h-[400px] lg:h-full flex items-center justify-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full h-full relative"
            >
              <Hero3DCanvas />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
