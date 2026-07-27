import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, ShieldCheck, Settings, CheckCircle2, Globe, Leaf, Building2 } from 'lucide-react';

// Dynamic stat counter utility
function AnimatedCounter({ value, duration = 1.5, startVal = 0 }: { value: string; duration?: number; startVal?: number }) {
  const [count, setCount] = useState(startVal);
  const numericValue = parseInt(value);
  const suffix = value.replace(numericValue.toString(), '');

  useEffect(() => {
    let start = startVal;
    const end = numericValue;
    if (isNaN(end)) return;
    
    const stepTime = Math.abs(Math.floor((duration * 1000) / (end - startVal)));
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, Math.max(stepTime, 20));

    return () => clearInterval(timer);
  }, [numericValue, duration, startVal]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

const advantages = [
  {
    icon: Cpu,
    title: 'Advanced Manufacturing',
    description: 'Equipped with fully automated high-precision injection molding machines for high-volume flawless production.',
    color: 'from-blue-500/20 to-sky-500/20',
    iconColor: 'text-primary-blue',
  },
  {
    icon: ShieldCheck,
    title: 'Leak-Proof Designs',
    description: 'Precision-engineered seal profiles and tamper-evident bands preventing spills and product degradation.',
    color: 'from-emerald-500/20 to-teal-500/20',
    iconColor: 'text-primary-green',
  },
  {
    icon: Settings,
    title: 'Custom Mold Development',
    description: 'In-house state-of-the-art mold design facility catering to bespoke container profiles and corporate branding.',
    color: 'from-blue-500/20 to-sky-500/20',
    iconColor: 'text-primary-blue',
  },
  {
    icon: CheckCircle2,
    title: 'Quality Assurance',
    description: 'Stringent testing standards covering torque stability, pressure holding, and drop-shatter resistance.',
    color: 'from-emerald-500/20 to-teal-500/20',
    iconColor: 'text-primary-green',
  },
  {
    icon: Globe,
    title: 'Export Ready Products',
    description: 'Packaging solutions engineered to comply with strict international regulatory and logistics compliance.',
    color: 'from-blue-500/20 to-sky-500/20',
    iconColor: 'text-primary-blue',
  },
  {
    icon: Leaf,
    title: 'Sustainable Production',
    description: 'Deploying recyclable polymers, optimized energy use, and zero-waste regrind recycling systems.',
    color: 'from-emerald-500/20 to-teal-500/20',
    iconColor: 'text-primary-green',
  },
];

export default function AboutSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
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
    <section
      id="about"
      className="py-20 lg:py-28 relative overflow-hidden bg-gradient-to-b from-blue-50/20 via-transparent to-transparent dark:from-slate-950/40 dark:via-slate-900/20 dark:to-transparent z-10"
    >
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-[#40A4D6]/10 rounded-full blur-[80px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-[#6EC482]/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Decorative cap pattern background overlay (subtle visual details) */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white to-transparent dark:from-slate-900 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Company Legacy Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-primary-blue dark:text-primary-green font-semibold text-sm tracking-wider uppercase">
              <Building2 className="w-5 h-5" />
              Established 1998
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-dark dark:text-white">
              About Our Legacy
            </h2>
            
            <div className="space-y-4 text-text-light dark:text-slate-300 font-light leading-relaxed">
              <p>
                <strong>SV Closures Private Limited</strong> is a leading manufacturer of plastic caps, closures, dispensing systems, and customized packaging solutions. Since 1998, we have been delivering innovative and reliable closure solutions for edible oil, food, pharmaceutical, chemical, lubricant, automotive, and industrial sectors worldwide.
              </p>
              <p>
                Headquartered in Rajkot, Gujarat, India, our state-of-the-art facility integrates raw polymer processing, high-speed automated tooling, and optical quality-inspection technologies. Over two decades, we have scaled our delivery network to meet high-volume international specifications, ensuring that our products stand up to demanding transcontinental logistics.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative"
          >
            {/* Visual Glass Box card */}
            <div className="relative glass-card rounded-3xl p-8 lg:p-10 border border-primary-blue/15 dark:border-primary-green/15 shadow-xl flex flex-col justify-center overflow-hidden bg-gradient-to-b from-white/80 to-white/40 dark:from-slate-900/80 dark:to-slate-900/40 p-[1px] bg-gradient-to-b from-primary-blue/10 to-primary-green/10">
              <div className="bg-white/90 dark:bg-slate-900/90 rounded-[23px] p-8 h-full flex flex-col justify-center relative">
                {/* Grid backdrop */}
                <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.1))] -z-10 opacity-30 dark:opacity-10" />
                
                <div className="space-y-8 relative">
                  <div>
                    <h3 className="text-4xl font-extrabold text-primary-blue dark:text-primary-green">
                      <AnimatedCounter value="1998" startVal={1980} />
                    </h3>
                    <p className="text-sm font-semibold tracking-wider uppercase text-text-dark dark:text-white mt-1">Foundation Year</p>
                    <p className="text-xs text-text-light dark:text-slate-400 mt-1">Started as a precision molding vendor in Rajkot</p>
                  </div>
                  <div className="w-full h-px bg-slate-200/60 dark:bg-slate-800" />
                  <div>
                    <h3 className="text-4xl font-extrabold text-primary-blue dark:text-primary-green">
                      <AnimatedCounter value="100%" />
                    </h3>
                    <p className="text-sm font-semibold tracking-wider uppercase text-text-dark dark:text-white mt-1">Leak-Proof Integrity</p>
                    <p className="text-xs text-text-light dark:text-slate-400 mt-1">100% of our mold geometries undergo computational stress-testing</p>
                  </div>
                  <div className="w-full h-px bg-slate-200/60 dark:bg-slate-800" />
                  <div>
                    <h3 className="text-4xl font-extrabold text-primary-blue dark:text-primary-green">ISO 9001</h3>
                    <p className="text-sm font-semibold tracking-wider uppercase text-text-dark dark:text-white mt-1">Quality Certified</p>
                    <p className="text-xs text-text-light dark:text-slate-400 mt-1">Compliant with food-grade raw materials and international norms</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Advantages Breakdown */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-text-dark dark:text-white">
              Why Industry Leaders Trust Us
            </h2>
            <p className="text-text-light dark:text-slate-400 font-light">
              Our manufacturing capabilities combine advanced machinery, engineered security seals, and global export compliance.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {advantages.map((adv) => (
              <motion.div
                key={adv.title}
                variants={cardVariants}
                className="group glass-card rounded-2xl p-6 flex flex-col justify-between hover:shadow-lg hover:shadow-primary-blue/5 dark:hover:shadow-primary-green/5 dark:hover:border-primary-green/20 hover:border-primary-blue/20"
              >
                <div className="space-y-4">
                  {/* Icon wrap */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${adv.color} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                    <adv.icon className={`w-6 h-6 ${adv.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-bold text-text-dark dark:text-white group-hover:text-primary-blue dark:group-hover:text-primary-green transition-colors duration-200">
                    {adv.title}
                  </h3>
                  <p className="text-sm text-text-light dark:text-slate-400 font-light leading-relaxed">
                    {adv.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
