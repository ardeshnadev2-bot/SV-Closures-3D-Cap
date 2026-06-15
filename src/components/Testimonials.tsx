'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  review: string;
}

const testimonialsData: Testimonial[] = [
  {
    review: "Closures are of superior quality and service provided by you is satisfactory",
    name: "****** *****"
  },
  {
    review: "Closure quality is superior and we will like to have long term business with Decap",
    name: "**** ******"
  },
  {
    review: "This is to certify that Decap has been supplying tint plugs for the last years to full satisfaction in terms of quality and service",
    name: "***** ********"
  }
];


export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-20 lg:py-24 bg-gradient-to-b from-blue-50/40 via-transparent to-transparent dark:from-slate-950 dark:via-slate-900/60 dark:to-transparent text-slate-900 dark:text-white relative overflow-hidden z-10"
    >
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-[#40A4D6]/10 rounded-full blur-[80px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-[#6EC482]/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-blue/10 text-primary-blue dark:text-accent-blue text-xs font-semibold uppercase tracking-wider">
            <Quote className="w-3.5 h-3.5" />
            Client Reviews
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Our Testimonials
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-light max-w-xl mx-auto">
            Read what our high-volume packaging partners and industrial distributors across the globe say about our product quality and dedicated service.
          </p>
        </div>

        {/* Testimonials 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonialsData.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -6 }}
              className="glass-card bg-white/85 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-8 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 relative"
            >
              {/* Review Content Box */}
              <div className="space-y-4 relative">
                {/* Opening Quote Icon */}
                <span className="text-orange-500 font-serif text-4xl leading-none block select-none">“</span>
                
                {/* Review Text */}
                <p className="text-slate-700 dark:text-slate-300 font-light text-[13px] leading-relaxed italic text-center px-4">
                  {item.review}
                </p>

                {/* Closing Quote Icon */}
                <span className="text-orange-500 font-serif text-4xl leading-none block select-none text-right mt-1">”</span>
              </div>

              {/* Client Info Block */}
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/80 text-center">
                <span className="block text-sm font-extrabold text-slate-900 dark:text-white">
                  {item.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
