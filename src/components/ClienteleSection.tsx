'use client';

import { motion } from 'framer-motion';

const clients = [
  {
    name: 'Apex Edibles',
    industry: 'Edible Oil & Foods',
    logo: (
      <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 7.523 2 12s4.477 10 10 10z" />
        <path d="M12 6c-3.313 0-6 2.687-6 6 0 2.21 1.2 4.14 3 5.196" />
        <path d="M12 18c3.313 0 6-2.687 6-6 0-1.105-.447-2.105-1.172-2.828" />
        <path d="M12 10a2 2 0 100 4 2 2 0 000-4z" />
      </svg>
    ),
    badgeColor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300',
  },
  {
    name: 'UltraLube Corp',
    industry: 'Lubricants & Auto Oil',
    logo: (
      <svg className="w-8 h-8 text-orange-600 dark:text-orange-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
        <circle cx="12" cy="12" r="10" strokeDasharray="4 4" />
      </svg>
    ),
    badgeColor: 'bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300',
  },
  {
    name: 'Hindustan Organics',
    industry: 'Chemicals & Solvents',
    logo: (
      <svg className="w-8 h-8 text-blue-600 dark:text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4.5 16.5c-1.5 1.25-2.5 3-2.5 5h20c0-2-1-3.75-2.5-5M12 2l7.5 13h-15L12 2z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
    badgeColor: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300',
  },
  {
    name: 'BioPharma Labs',
    industry: 'Pharmaceuticals',
    logo: (
      <svg className="w-8 h-8 text-teal-600 dark:text-teal-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
        <path d="M12 11v6M9 14h6" />
      </svg>
    ),
    badgeColor: 'bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300',
  },
  {
    name: 'MeltFlow Polymers',
    industry: 'Industrial & Resin',
    logo: (
      <svg className="w-8 h-8 text-purple-600 dark:text-purple-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    badgeColor: 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300',
  },
  {
    name: 'PureDrops Bottling',
    industry: 'Beverages & Water',
    logo: (
      <svg className="w-8 h-8 text-sky-600 dark:text-sky-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22a7 7 0 007-7c0-4.3-7-13-7-13S5 10.7 5 15a7 7 0 007 7z" />
        <path d="M12 18a3 3 0 003-3" />
      </svg>
    ),
    badgeColor: 'bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300',
  },
];

export default function ClienteleSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-blue-50/20 via-transparent to-transparent dark:from-slate-950/40 dark:via-slate-900/20 dark:to-transparent z-10">
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-[#40A4D6]/10 rounded-full blur-[80px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-[#6EC482]/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-blue/10 dark:bg-primary-green/10 text-primary-blue dark:text-primary-green uppercase tracking-wider"
          >
            Global Partnerships
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-text-dark dark:text-white"
          >
            Our Clientele
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-text-light dark:text-slate-400 font-light max-w-2xl mx-auto"
          >
            Partnering with market leaders across global supply chains. We deliver leak-proof packaging solutions tailored to meet exact brand specifications.
          </motion.p>
        </div>

        {/* Ticker Carousel Frame */}
        <div className="relative w-full overflow-hidden py-6">
          {/* Fading Edge Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-[#050811] dark:via-[#050811]/80 dark:to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white via-white/80 to-transparent dark:from-[#050811] dark:via-[#050811]/80 dark:to-transparent z-20 pointer-events-none" />

          {/* Scrolling Track */}
          <div className="ticker-track gap-8 flex">
            {[...clients, ...clients, ...clients, ...clients].map((client, index) => (
              <div
                key={client.name + '-' + index}
                className="group w-72 md:w-80 shrink-0 glass-card rounded-2xl p-5 border border-slate-200/40 dark:border-slate-800/40 flex items-center gap-5 hover:shadow-xl hover:shadow-primary-blue/20 dark:hover:shadow-primary-green/20 hover:border-primary-blue/30 dark:hover:border-primary-green/30 transition-all duration-300"
              >
                {/* Brand Logo Wrapper with grayscale-to-color hover */}
                <div className="w-14 h-14 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-850 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:bg-white dark:group-hover:bg-slate-900 filter grayscale group-hover:grayscale-0">
                  {client.logo}
                </div>

                {/* Brand Info */}
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-text-dark dark:text-white transition-colors duration-200 group-hover:text-primary-blue dark:group-hover:text-primary-green">
                    {client.name}
                  </h3>
                  <span className={`inline-flex px-2 py-0.5 rounded text-[9px] font-semibold ${client.badgeColor}`}>
                    {client.industry}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <style dangerouslySetInnerHTML={{__html: `
            @keyframes scrollTicker {
              0% { transform: translateX(0); }
              100% { transform: translateX(-25%); }
            }
            .ticker-track {
              display: flex;
              width: max-content;
              animation: scrollTicker 35s linear infinite;
            }
            .ticker-track:hover {
              animation-play-state: paused;
            }
          `}} />
        </div>
      </div>
    </section>
  );
}
