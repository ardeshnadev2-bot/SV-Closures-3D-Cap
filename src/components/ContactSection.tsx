'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Building2, CheckCircle2 } from 'lucide-react';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [productRequirement, setProductRequirement] = useState('');
  const [message, setMessage] = useState('');
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Pre-fill "Product Requirement" field based on event listener
  useEffect(() => {
    const handleSelectProduct = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setProductRequirement(`Enquiry: ${customEvent.detail}`);
      }
    };

    window.addEventListener('select-product', handleSelectProduct);
    return () => window.removeEventListener('select-product', handleSelectProduct);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API form submission delay
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      
      // Reset form fields
      setName('');
      setCompany('');
      setEmail('');
      setPhone('');
      setProductRequirement('');
      setMessage('');
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="py-20 lg:py-28 relative overflow-hidden bg-gradient-to-b from-blue-50/20 via-transparent to-transparent dark:from-slate-950/40 dark:via-slate-900/20 dark:to-transparent z-10"
    >
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-[#40A4D6]/10 rounded-full blur-[80px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-[#6EC482]/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      {/* Background elements */}
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-primary-blue/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-dark dark:text-white">
            Get in Touch
          </h2>
          <p className="text-text-light dark:text-slate-400 font-light max-w-xl mx-auto">
            Discuss your packaging requirements with our technical sales team. Request customization blueprints, bulk logistics quotes, or prototype molds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Company Details (5 columns) */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="glass-card rounded-2xl p-8 border border-primary-blue/5 space-y-6">
              <h3 className="text-xl font-bold text-text-dark dark:text-white pb-4 border-b border-slate-100 dark:border-slate-800">
                Corporate Headquarters
              </h3>
              
              <ul className="space-y-6 text-sm">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-blue/10 dark:bg-primary-green/10 flex items-center justify-center text-primary-blue dark:text-primary-green shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Company Name</span>
                    <strong className="text-text-dark dark:text-white font-semibold">SV Closures Private Limited</strong>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-blue/10 dark:bg-primary-green/10 flex items-center justify-center text-primary-blue dark:text-primary-green shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Address Location</span>
                    <span className="text-text-light dark:text-slate-300 font-medium leading-relaxed">
                      Plot No. 30/A, Tilara Gate,<br />
                      Rajkot - 360024, Gujarat, India
                    </span>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-blue/10 dark:bg-primary-green/10 flex items-center justify-center text-primary-blue dark:text-primary-green shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Sales Hotlines</span>
                    <div className="flex flex-col gap-0.5 text-text-light dark:text-slate-300 font-medium">
                      <a href="tel:+919909216358" className="hover:text-primary-blue transition-colors">
                        +91 99092 16358
                      </a>
                      <a href="tel:+919978616358" className="hover:text-primary-blue transition-colors">
                        +91 99786 16358
                      </a>
                    </div>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-blue/10 dark:bg-primary-green/10 flex items-center justify-center text-primary-blue dark:text-primary-green shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Official Emails</span>
                    <div className="flex flex-col gap-0.5 text-text-light dark:text-slate-300 font-medium">
                      <a href="mailto:info@svclosures.com" className="hover:text-primary-blue transition-colors">
                        info@svclosures.com
                      </a>
                      <a href="mailto:info@svcaps.in" className="hover:text-primary-blue transition-colors">
                        info@svcaps.in
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

          </div>

          {/* Contact Inquiry Form (7 columns) */}
          <div className="lg:col-span-7">
            
            <div className="relative glass-card rounded-3xl p-[1px] bg-gradient-to-b from-primary-blue/15 to-primary-green/15 shadow-2xl">
              <div className="bg-white/95 dark:bg-slate-950/90 rounded-[23px] p-8 h-full">
                <h3 className="text-xl font-bold text-text-dark dark:text-white mb-6">
                  Request Specifications & Quote
                </h3>
                
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex flex-col items-center justify-center text-center py-12 space-y-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h4 className="text-lg font-bold text-text-dark dark:text-white">
                        Inquiry Submitted Successfully
                      </h4>
                      <p className="text-xs text-text-light dark:text-slate-400 max-w-xs leading-relaxed">
                        Thank you for contacting us. A technical packaging representative will review your requirement and reply within 12 business hours.
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="px-6 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors mt-4 text-text-dark dark:text-white"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-5"
                      id="contact-inquiry-form"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Name Input */}
                        <div className="relative">
                          <input
                            type="text"
                            id="contact-name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder=" "
                            className="peer w-full px-4 pt-6 pb-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-sm focus:outline-none focus:border-primary-blue dark:focus:border-primary-green focus:ring-2 focus:ring-primary-blue/20 dark:focus:ring-primary-green/20 text-text-dark dark:text-white transition-all duration-200"
                          />
                          <label 
                            className="absolute left-4 top-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-450 transition-all duration-300 pointer-events-none peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:text-primary-blue dark:peer-focus:text-primary-green select-none"
                            htmlFor="contact-name"
                          >
                            Full Name *
                          </label>
                        </div>
                        
                        {/* Company Input */}
                        <div className="relative">
                          <input
                            type="text"
                            id="contact-company"
                            required
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder=" "
                            className="peer w-full px-4 pt-6 pb-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-sm focus:outline-none focus:border-primary-blue dark:focus:border-primary-green focus:ring-2 focus:ring-primary-blue/20 dark:focus:ring-primary-green/20 text-text-dark dark:text-white transition-all duration-200"
                          />
                          <label 
                            className="absolute left-4 top-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-450 transition-all duration-300 pointer-events-none peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:text-primary-blue dark:peer-focus:text-primary-green select-none"
                            htmlFor="contact-company"
                          >
                            Company Name *
                          </label>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Email Input */}
                        <div className="relative">
                          <input
                            type="email"
                            id="contact-email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder=" "
                            className="peer w-full px-4 pt-6 pb-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-sm focus:outline-none focus:border-primary-blue dark:focus:border-primary-green focus:ring-2 focus:ring-primary-blue/20 dark:focus:ring-primary-green/20 text-text-dark dark:text-white transition-all duration-200"
                          />
                          <label 
                            className="absolute left-4 top-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-450 transition-all duration-300 pointer-events-none peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:text-primary-blue dark:peer-focus:text-primary-green select-none"
                            htmlFor="contact-email"
                          >
                            Email Address *
                          </label>
                        </div>

                        {/* Phone Input */}
                        <div className="relative">
                          <input
                            type="tel"
                            id="contact-phone"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder=" "
                            className="peer w-full px-4 pt-6 pb-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-sm focus:outline-none focus:border-primary-blue dark:focus:border-primary-green focus:ring-2 focus:ring-primary-blue/20 dark:focus:ring-primary-green/20 text-text-dark dark:text-white transition-all duration-200"
                          />
                          <label 
                            className="absolute left-4 top-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-450 transition-all duration-300 pointer-events-none peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:text-primary-blue dark:peer-focus:text-primary-green select-none"
                            htmlFor="contact-phone"
                          >
                            Phone / Mobile *
                          </label>
                        </div>
                      </div>

                      {/* Product Requirement */}
                      <div className="relative">
                        <input
                          type="text"
                          id="contact-product"
                          value={productRequirement}
                          onChange={(e) => setProductRequirement(e.target.value)}
                          placeholder=" "
                          className="peer w-full px-4 pt-6 pb-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-sm focus:outline-none focus:border-primary-blue dark:focus:border-primary-green focus:ring-2 focus:ring-primary-blue/20 dark:focus:ring-primary-green/20 text-text-dark dark:text-white transition-all duration-200"
                        />
                        <label 
                          className="absolute left-4 top-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-450 transition-all duration-300 pointer-events-none peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:text-primary-blue dark:peer-focus:text-primary-green select-none"
                          htmlFor="contact-product"
                        >
                          Product Requirement / Category
                        </label>
                      </div>

                      {/* Message Details */}
                      <div className="relative">
                        <textarea
                          id="contact-message"
                          required
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          rows={4}
                          placeholder=" "
                          className="peer w-full px-4 pt-6 pb-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-sm focus:outline-none focus:border-primary-blue dark:focus:border-primary-green focus:ring-2 focus:ring-primary-blue/20 dark:focus:ring-primary-green/20 text-text-dark dark:text-white transition-all duration-200"
                        />
                        <label 
                          className="absolute left-4 top-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-450 transition-all duration-300 pointer-events-none peer-placeholder-shown:text-xs peer-placeholder-shown:top-4 peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:text-primary-blue dark:peer-focus:text-primary-green select-none"
                          htmlFor="contact-message"
                        >
                          Message Details *
                        </label>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-primary-blue to-primary-green hover:shadow-lg hover:shadow-primary-blue/20 text-white font-semibold text-sm transition-all duration-300 disabled:opacity-50 btn-shine cursor-pointer"
                      >
                        {loading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Processing Enquiry...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Submit Industrial Enquiry
                          </>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>

        </div>

        {/* Google Map location frame */}
        <div className="mt-16 glass-card rounded-3xl p-2.5 overflow-hidden shadow-md">
          <iframe
            src="https://maps.google.com/maps?q=Plot%20No.30/A,%20Tilara%20Gate,%20Rajkot,%20Gujarat,%20India&t=&z=14&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-2xl"
            title="SV Closures Headquarters Location, Rajkot, Gujarat, India"
            id="google-maps-frame"
          />
        </div>

      </div>
    </section>
  );
}
