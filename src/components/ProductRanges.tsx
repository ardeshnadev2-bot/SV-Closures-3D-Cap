'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Package, Inbox } from 'lucide-react';

export default function ProductRanges() {
  const handleExplore = (category: string) => {
    // 1. Switch active view to products
    window.dispatchEvent(new CustomEvent('scroll-to-section', { detail: { targetId: 'products' } }));
    
    // 2. Set active category in ProductsSection
    window.dispatchEvent(new CustomEvent('explore-range', { detail: { category } }));
    
    // 3. Update hash
    window.history.replaceState(null, '', '#products');
  };

  return (
    <section className="py-16 md:py-20 relative overflow-hidden bg-gradient-to-b from-blue-50/20 via-transparent to-transparent dark:from-slate-950/40 dark:via-slate-900/20 dark:to-transparent z-10">
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-[#40A4D6]/10 rounded-full blur-[80px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-[#6EC482]/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-\[1360px\] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-dark dark:text-white">
            Our Range of Products
          </h2>
          <p className="text-text-light dark:text-slate-400 font-light max-w-2xl mx-auto text-sm sm:text-base">
            Explore our industrial polymer closures. Sourced with virgin food-grade resins, each model has been drop-tested, seal-rated, and customized to global shipping specifications.
          </p>
        </div>

        {/* Side-by-Side Main Product Ranges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Jerry Cans, Spouts & Dispensing (Always White Background Theme) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200 text-text-dark shadow-xl flex flex-col justify-between"
          >
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary-green">Range A</span>
                <h3 className="text-2xl font-extrabold tracking-tight text-text-dark group-hover:text-primary-green transition-colors duration-200">
                  Industrial Containers & Spouts
                </h3>
                <p className="text-xs text-text-light font-light leading-relaxed">
                  Heavy-duty jerrycans, retractable spout inserts, flexible pouring tubes, and oil packaging systems engineered for chemical, lubricant, and food-grade containment.
                </p>
              </div>
              
              {/* Product highlights */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-text-light">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-green" />
                  <span>Retractable Spouts</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-green" />
                  <span>Jerry Can Plug Caps</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-green" />
                  <span>Flexible Pouring Pipes</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-green" />
                  <span>Integrated Air Vents</span>
                </div>
              </div>
            </div>

            {/* Technical Graphic Placeholder */}
            <div className="h-64 relative w-full overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 flex flex-col items-center justify-center p-6 border-t border-slate-200 dark:border-slate-800/80">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:20px_20px] opacity-75" />
              <div className="absolute w-20 h-20 rounded-full bg-primary-green/5 blur-xl group-hover:bg-primary-green/10 transition-all duration-300" />
              <div className="relative z-10 flex flex-col items-center text-center space-y-2">
                <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 shadow-md group-hover:border-primary-green/30 transition-all duration-300 group-hover:scale-105">
                  <Inbox className="w-8 h-8 text-primary-green" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block font-mono">
                  Jerry Can Spouts Range
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-slate-900 via-transparent to-transparent opacity-80" />
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100">
              <button
                onClick={() => handleExplore('spout')}
                className="w-full py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-primary-green text-xs font-semibold text-text-dark tracking-wide transition-all duration-300 cursor-pointer"
              >
                Explore Spout & Container Range
              </button>
            </div>
          </motion.div>

          {/* Right: Caps & Closures (Always White Background Theme) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200 text-text-dark shadow-xl flex flex-col justify-between"
          >
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary-blue">Range B</span>
                <h3 className="text-2xl font-extrabold tracking-tight text-text-dark group-hover:text-primary-blue transition-colors duration-200">
                  Precision Caps & Closures
                </h3>
                <p className="text-xs text-text-light font-light leading-relaxed">
                  An extensive collection of colorful continuous thread screw caps, child-resistant lids, flip-tops, custom handles, and specialty lining wads catering to global markets.
                </p>
              </div>
              
              {/* Product highlights */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-text-light">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-blue" />
                  <span>Flip-Top Dispensers</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-blue" />
                  <span>Tamper-Evident Rings</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-blue" />
                  <span>Plastic Carrying Handles</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-blue" />
                  <span>Pharma-Grade Lids</span>
                </div>
              </div>
            </div>

            {/* Technical Graphic Placeholder */}
            <div className="h-64 relative w-full overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 flex flex-col items-center justify-center p-6 border-t border-slate-200 dark:border-slate-800/80">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:20px_20px] opacity-75" />
              <div className="absolute w-20 h-20 rounded-full bg-primary-blue/5 blur-xl group-hover:bg-primary-blue/10 transition-all duration-300" />
              <div className="relative z-10 flex flex-col items-center text-center space-y-2">
                <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 shadow-md group-hover:border-primary-blue/30 transition-all duration-300 group-hover:scale-105">
                  <Package className="w-8 h-8 text-primary-blue" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block font-mono">
                  Caps & Closures Range
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-slate-900 via-transparent to-transparent opacity-80" />
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100">
              <button
                onClick={() => handleExplore('screw-cap')}
                className="w-full py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-primary-blue text-xs font-semibold text-text-dark tracking-wide transition-all duration-300 cursor-pointer"
              >
                Explore Cap & Closure Range
              </button>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
