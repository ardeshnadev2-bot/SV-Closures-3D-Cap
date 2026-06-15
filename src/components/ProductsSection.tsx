'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, MessageSquare, ShieldCheck, Package, Cpu, ArrowRight, Settings, CheckCircle2, Paintbrush } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  image: string;
  categories: string[];
  material: string;
  closureType: string;
  tamperEvidence: string;
  diameter: string;
  application: string;
  specifications: string[];
}

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'flip-top', name: 'Flip Top Caps' },
  { id: 'spout', name: 'Spout Closures' },
  { id: 'tamper-evident', name: 'Tamper Evident Caps' },
  { id: 'screw-cap', name: 'Screw Caps' },
  { id: 'food-grade', name: 'Food Grade Closures' },
  { id: 'pharma', name: 'Pharmaceutical Closures' },
  { id: 'oil-bottle', name: 'Oil Bottle Caps' },
  { id: 'jerry-can', name: 'Jerry Can Closures' },
  { id: 'custom', name: 'Custom Closures' },
];

const productsData: Product[] = [
  {
    id: 'sv32',
    name: 'SV32 (32mm Press-Fit Spout Cap)',
    image: '/images/product_sv32.png',
    categories: ['spout', 'food-grade', 'oil-bottle', 'tamper-evident'],
    material: 'HDPE / LLDPE Virgin Polymer',
    closureType: 'Press-Fit Retractable Spout',
    tamperEvidence: 'Tear-Off Pull Ring + Outer Cap Seal',
    diameter: '32 mm',
    application: 'Edible Oil Bottles, Packaging Containers',
    specifications: ['High flow control', 'Dual lip leak prevention', 'Retractable design'],
  },
  {
    id: 'sv32c',
    name: 'SV32C (32mm Crimp-On Spout Cap)',
    image: '/images/product_sv32c.png',
    categories: ['spout', 'oil-bottle', 'tamper-evident'],
    material: 'Metal Ring + Virgin Polypropylene / LLDPE',
    closureType: 'Crimp-On Retractable Spout',
    tamperEvidence: 'Metal Crimped Base + Tear Ring',
    diameter: '32 mm',
    application: 'Engine Oils, Lubricants, Tin Containers',
    specifications: ['Hermetic leak prevention', 'Anti-counterfeiting crimp fitment', 'Smooth pull-up flow control'],
  },
  {
    id: 'sv42',
    name: 'SV42 (42mm Press-Fit Spout Cap)',
    image: '/images/product_sv42.png',
    categories: ['spout', 'jerry-can', 'oil-bottle', 'tamper-evident'],
    material: 'HDPE / LLDPE Virgin Polymer',
    closureType: 'Press-Fit Retractable Spout',
    tamperEvidence: 'Tear-Off Pull Ring + Inner Locking Ridges',
    diameter: '42 mm',
    application: 'Automotive Oils, Lubricants, Solvents',
    specifications: ['Antiglug venting', 'Chemical resistant liner', 'Heavy wall thickness'],
  },
  {
    id: 'sv43',
    name: 'SV43 (43mm Press-Fit Spout Cap)',
    image: '/images/product_sv43.png',
    categories: ['spout', 'jerry-can', 'oil-bottle', 'tamper-evident'],
    material: 'HDPE / LLDPE Virgin Polymer',
    closureType: 'Press-Fit Retractable Spout',
    tamperEvidence: 'Tear-Off Pull Ring + Outer Cap Seal',
    diameter: '43 mm',
    application: 'Chemical Containers, Lubricants, Carboys',
    specifications: ['Enhanced flow control', 'Dual lip leak prevention', 'Optimized wall density'],
  },
  {
    id: 'sv57',
    name: 'SV57 (57mm Press-Fit Spout Cap)',
    image: '/images/product_sv57.png',
    categories: ['spout', 'jerry-can', 'tamper-evident'],
    material: 'HDPE / LLDPE Virgin Polymer',
    closureType: 'Press-Fit Retractable Spout',
    tamperEvidence: 'Double Pull Ring + Snap Ring Lock',
    diameter: '57 mm',
    application: 'Jerry Cans, Medium Industrial Carboys',
    specifications: ['Vented pouring channel', 'Corrosive resistance', 'Impact drop-tested'],
  },
  {
    id: 'sv-42-crimp',
    name: 'SV 42mm Crimp-On Spout Closure',
    image: '/images/product_spout_crimp_pullring.jpg',
    categories: ['spout', 'tamper-evident', 'oil-bottle'],
    material: 'Metal Ring + Virgin Polypropylene / LLDPE',
    closureType: 'Crimp-On Retractable Spout',
    tamperEvidence: 'Crimped Tin Base + Inner Pull Ring',
    diameter: '42 mm',
    application: 'Engine Oils, Lubricants, Metal Drums/Containers',
    specifications: ['Anti-counterfeiting crimp', 'Metal-plastic hybrid bond', 'High tear-strength pull ring'],
  },
  {
    id: 'sv-42-crimp-insert',
    name: 'SV 42mm Crimp-On Safety Valve Insert',
    image: '/images/product_spout_crimp_insert.jpg',
    categories: ['spout', 'tamper-evident', 'oil-bottle'],
    material: 'Metal Ring + LLDPE Polyethylene',
    closureType: 'Crimp-On Inner Safety Closure',
    tamperEvidence: 'Anti-Tamper Flaps + Press-Fit Seal',
    diameter: '42 mm',
    application: 'Industrial Lubricants, Automotive Fluid Cans',
    specifications: ['Anti-glug pouring channel', 'Enhanced safety venting', 'Double-lip hermetic gasket'],
  },
  {
    id: 'sv-pullup-spout',
    name: 'SV 42mm Pull-Up Spout Cap',
    image: '/images/product_spout_pullup.jpg',
    categories: ['spout', 'food-grade', 'oil-bottle', 'tamper-evident'],
    material: 'HDPE / LLDPE Virgin Resins',
    closureType: 'Retractable Pull-Up Spout',
    tamperEvidence: 'Tear-off Top Pull Tab + Outer Cap Seal',
    diameter: '42 mm',
    application: 'Edible Oils, Beverage Syrups, Industrial Containers',
    specifications: ['Directional flow guide', 'Smooth pull-up extension', 'Resealable dust cap cover'],
  },
  {
    id: 'sv-63-crimp',
    name: 'SV 63mm Crimp-On Closure',
    image: '/images/crimp_closure.png',
    categories: ['tamper-evident', 'oil-bottle', 'jerry-can'],
    material: 'Metal Ring + Virgin Polypropylene',
    closureType: 'Crimp-On Fitment',
    tamperEvidence: 'Metal Crimped Ring + Snap Lid',
    diameter: '63 mm',
    application: 'Industrial Oils, Grease Containers',
    specifications: ['Heavy-duty sealing force', 'Weatherproof design', 'Puncture protection'],
  },
  {
    id: 'sv-24-screw',
    name: 'SV 24mm Rigid Screw Cap',
    image: '/images/screw_cap.png',
    categories: ['screw-cap', 'pharma', 'custom'],
    material: 'Polypropylene (PP)',
    closureType: 'Continuous Thread Screw Cap',
    tamperEvidence: 'No (Lined/Unlined Available)',
    diameter: '24 mm',
    application: 'Cosmetics, Pharma Liquids, Solvents',
    specifications: ['High ribbed grip', 'Custom torque matching', 'Wad liner options'],
  },
  {
    id: 'sv-57-screw',
    name: 'SV 57mm Rigid Jerrycan Cap',
    image: '/images/screw_cap.png',
    categories: ['screw-cap', 'jerry-can', 'tamper-evident'],
    material: 'High-Density Polyethylene (HDPE)',
    closureType: 'Internal Thread Screw Cap',
    tamperEvidence: 'Outer Tear-Away Band',
    diameter: '57 mm',
    application: 'Chemical Jerrycans, Concentrates',
    specifications: ['Integrated EPDM gasket', 'Deflection venting system', 'Child-resistant compatible'],
  },
  {
    id: 'sv-25-flip',
    name: 'SV 25mm Dispensing Flip-Top Cap',
    image: '/images/flip_top_cap.png',
    categories: ['flip-top', 'food-grade', 'pharma', 'custom'],
    material: 'Polypropylene (PP)',
    closureType: 'Hinged Flip-Top',
    tamperEvidence: 'No (Pressure Induction Lined)',
    diameter: '25 mm',
    application: 'Sanitizers, Shampoos, Condiment Bottles',
    specifications: ['Snap-close hinge', 'Zero-clog orifice', 'Spill-free travel locking'],
  },
  {
    id: 'sv-28-flip-bw',
    name: 'SV 28mm Flip-Top Dispensing Cap',
    image: '/images/product_fliptop_bw.jpg',
    categories: ['flip-top', 'food-grade', 'pharma', 'custom'],
    material: 'Polypropylene (PP) Virgin Resins',
    closureType: 'Hinged Flip-Top Cap',
    tamperEvidence: 'No (Pressure Sensitive or Induction Liner available)',
    diameter: '28 mm',
    application: 'Cosmetics, Liquid Soap, Hair Care, Food Condiments',
    specifications: ['Snap-close secure lid', 'Spill-proof orifice design', 'High chemical compatibility'],
  },
  {
    id: 'sv-24-flip-wb',
    name: 'SV 24mm Flip-Top Cap (Smooth Finish)',
    image: '/images/product_fliptop_wb.jpg',
    categories: ['flip-top', 'food-grade', 'pharma'],
    material: 'Polypropylene (PP) Virgin Resins',
    closureType: 'Hinged Flip-Top Cap',
    tamperEvidence: 'No (Pressure Sensitive or Induction Liner available)',
    diameter: '24 mm',
    application: 'Personal Care, Essential Oils, Shampoos, Pharma Creams',
    specifications: ['Ergonomic thumb tab', 'Precise dispensing control', 'Aesthetic gloss finish'],
  },
  {
    id: 'sv-28-screw-rg',
    name: 'SV 28mm Ridged Screw Cap',
    image: '/images/product_screw_rg.jpg',
    categories: ['screw-cap', 'tamper-evident', 'pharma', 'food-grade'],
    material: 'High-Density Polyethylene (HDPE)',
    closureType: 'Continuous Thread Screw Cap',
    tamperEvidence: 'Tear-Away Tamper-Evident Ring',
    diameter: '28 mm',
    application: 'Beverage Bottles, Syrups, Pharmaceutical Liquids',
    specifications: ['Deep ridged sides for easy grip', 'Drop-down security ring', 'Airtight leakproof seal'],
  },
  {
    id: 'sv-handle-red',
    name: 'SV Ergonomic Plastic Carrying Handle',
    image: '/images/product_handle_red.jpg',
    categories: ['custom', 'jerry-can'],
    material: 'Heavy-Duty Polypropylene (PP)',
    closureType: 'Snap-On Carrying Handle',
    tamperEvidence: 'Not Applicable',
    diameter: 'Fits Standard Container Neck Sizes',
    application: 'Jerry Cans, 5L-10L Water Bottles, Oil Containers',
    specifications: ['Ergonomic weight distribution', 'High load-bearing capacity', 'Tear and stretch-resistant'],
  },
  {
    id: 'sv-custom',
    name: 'Bespoke Brand Closure Mold',
    image: '/images/logo.png',
    categories: ['custom'],
    material: 'HDPE / PP / Custom Polymers',
    closureType: 'Custom Spec Tooling',
    tamperEvidence: 'Tailored to Specifications',
    diameter: '18mm to 110mm',
    application: 'Unique Packaging, Brand Differentiated Caps',
    specifications: ['Custom embossed logos', 'Pantone color matching', 'Advanced hot runner tooling'],
  },
];

export default function ProductsSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    const handleExploreRange = (e: Event) => {
      const customEvent = e as CustomEvent<{ category: string }>;
      setActiveCategory(customEvent.detail.category);
    };

    window.addEventListener('explore-range', handleExploreRange);
    return () => {
      window.removeEventListener('explore-range', handleExploreRange);
    };
  }, []);

  // Filter products by selected category
  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return productsData;
    return productsData.filter((product) => product.categories.includes(activeCategory));
  }, [activeCategory]);

  const handleEnquire = (productName: string) => {
    // Send customized event to ContactForm
    const event = new CustomEvent('select-product', { detail: productName });
    window.dispatchEvent(event);

    // Scroll to contact form
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Update URL hash without polluting browser history back stack
      window.history.replaceState(null, '', '#contact');
    }
  };

  const handleDownloadPDF = (product: Product) => {
    setDownloadingId(product.id);
    
    // Simulate high-fidelity client-side PDF generate & print
    setTimeout(() => {
      setDownloadingId(null);
      
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>SV Closures - Specification Sheet: ${product.name}</title>
              <style>
                body { font-family: 'Inter', sans-serif; padding: 40px; color: #1E2D3B; line-height: 1.5; }
                .header { border-bottom: 2px solid #40A4D6; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center; }
                .title { font-size: 24px; font-weight: bold; color: #1E2D3B; margin-top: 0; }
                .brand { font-size: 18px; color: #40A4D6; font-weight: bold; }
                .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 40px; }
                .spec-group { border: 1px solid #E2E8F0; border-radius: 8px; padding: 15px; }
                .spec-label { font-size: 12px; color: #5A6A7A; text-transform: uppercase; font-weight: bold; }
                .spec-value { font-size: 15px; font-weight: 600; margin-top: 4px; }
                .features { margin-bottom: 30px; }
                .features h3 { font-size: 16px; border-bottom: 1px solid #E2E8F0; padding-bottom: 8px; }
                .features ul { padding-left: 20px; }
                .footer { border-top: 1px solid #E2E8F0; padding-top: 20px; margin-top: 50px; font-size: 11px; color: #5A6A7A; text-align: center; }
              </style>
            </head>
            <body>
              <div class="header">
                <div>
                  <div class="brand">SV Closures Private Limited</div>
                  <div>Rajkot, Gujarat, India</div>
                </div>
                <div class="title">Product Data Sheet</div>
              </div>
              
              <h2>${product.name}</h2>
              
              <div class="grid">
                <div class="spec-group">
                  <div class="spec-label">Material composition</div>
                  <div class="spec-value">${product.material}</div>
                </div>
                <div class="spec-group">
                  <div class="spec-label">Closure mechanism</div>
                  <div class="spec-value">${product.closureType}</div>
                </div>
                <div class="spec-group">
                  <div class="spec-label">Tamper Evidence</div>
                  <div class="spec-value">${product.tamperEvidence}</div>
                </div>
                <div class="spec-group">
                  <div class="spec-label">Nominal diameter</div>
                  <div class="spec-value">${product.diameter}</div>
                </div>
                <div class="spec-group">
                  <div class="spec-label">Target industry application</div>
                  <div class="spec-value">${product.application}</div>
                </div>
              </div>
              
              <div class="features">
                <h3>Key Mechanical Performance Properties</h3>
                <ul>
                  ${product.specifications.map(s => `<li>${s}</li>`).join('')}
                </ul>
              </div>
              
              <p>For custom mold scaling, exact dimensional blueprints, or bulk container sizing assessments, contact <strong>info@svclosures.com</strong>.</p>
              
              <div class="footer">
                SV Closures Private Limited © ${new Date().getFullYear()} • ISO 9001:2015 Quality Assured • www.svclosures.com
              </div>
              <script>window.print();</script>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    }, 1200);
  };

  return (
    <section
      id="products"
      className="py-20 lg:py-28 relative overflow-hidden bg-gradient-to-b from-blue-50/40 via-transparent to-transparent dark:from-slate-950 dark:via-slate-900/60 dark:to-transparent z-10"
    >
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-[#40A4D6]/10 rounded-full blur-[80px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-[#6EC482]/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-dark dark:text-white">
            Product Catalog
          </h2>
          <p className="text-text-light dark:text-slate-400 font-light max-w-2xl mx-auto text-sm sm:text-base">
            Browse through our full category list. Filter and download exact specifications or enquire directly.
          </p>
        </div>

        {/* Anchor point for scrolling */}
        <div id="catalog-anchor" className="h-4" />

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 max-w-5xl mx-auto">
          {categories.map((cat) => {
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide border transition-all duration-300 ${
                  active
                    ? 'bg-gradient-to-r from-primary-blue to-primary-green border-transparent text-white shadow-md shadow-primary-blue/15'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-text-light dark:text-slate-400 hover:border-primary-blue dark:hover:border-primary-green hover:text-text-dark dark:hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Products Grid Layout */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((prod) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -8, transition: { duration: 0.25, ease: 'easeOut' } }}
                transition={{ duration: 0.3 }}
                key={prod.id}
                className="group glass-card rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-2xl hover:shadow-primary-blue/20 dark:hover:shadow-primary-green/20 border border-slate-200/50 dark:border-slate-800/50 hover:border-primary-blue/30 dark:hover:border-primary-green/30"
              >
                {/* Product Image Area */}
                <div className="h-60 relative w-full bg-slate-100/50 dark:bg-slate-950/20 flex items-center justify-center p-6 overflow-hidden border-b border-slate-100 dark:border-slate-800/80">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary-blue/5 to-primary-green/5 pointer-events-none" />
                  
                  {prod.image && (
                    <div className="relative w-44 h-44 transition-transform duration-500 group-hover:scale-115">
                      <Image
                        src={prod.image}
                        alt={prod.name}
                        fill
                        className={`object-contain ${prod.image === '/images/logo.png' ? 'dark:drop-shadow-[0_0_2px_rgba(255,255,255,0.85)]' : ''}`}
                      />
                    </div>
                  )}
                </div>

                {/* Info and Specifications Area */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-text-dark dark:text-white group-hover:text-primary-blue dark:group-hover:text-primary-green transition-colors duration-200 leading-snug">
                      {prod.name}
                    </h3>

                    {/* Spec List */}
                    <div className="space-y-2.5 text-xs text-text-light dark:text-slate-400">
                      <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800/40">
                        <span className="font-semibold text-slate-400">Material</span>
                        <span className="font-medium text-right max-w-[180px] text-text-dark dark:text-slate-200">{prod.material}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800/40">
                        <span className="font-semibold text-slate-400">Closure Type</span>
                        <span className="font-medium text-right max-w-[180px] text-text-dark dark:text-slate-200">{prod.closureType}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800/40">
                        <span className="font-semibold text-slate-400">Tamper Evidence</span>
                        <span className="font-medium text-right max-w-[180px] text-text-dark dark:text-slate-200">{prod.tamperEvidence}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800/40">
                        <span className="font-semibold text-slate-400">Diameter</span>
                        <span className="font-medium text-right text-text-dark dark:text-slate-200">{prod.diameter}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800/40">
                        <span className="font-semibold text-slate-400">Application</span>
                        <span className="font-medium text-right max-w-[180px] text-text-dark dark:text-slate-200">{prod.application}</span>
                      </div>
                    </div>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2">
                    {prod.specifications.map((spec, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs text-text-light dark:text-slate-300">
                        <ShieldCheck className="w-4 h-4 text-primary-green shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/60">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleDownloadPDF(prod)}
                      disabled={downloadingId === prod.id}
                      className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-text-dark dark:text-slate-300 hover:border-primary-blue hover:text-primary-blue dark:hover:text-primary-green dark:hover:border-primary-green transition-all duration-200 disabled:opacity-50 btn-shine cursor-pointer"
                    >
                      {downloadingId === prod.id ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-primary-blue border-t-transparent rounded-full animate-spin" />
                          Printing...
                        </>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5" />
                          Specs PDF
                        </>
                      )}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleEnquire(prod.name)}
                      className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-primary-blue to-primary-green text-white text-xs font-semibold shadow-md shadow-primary-blue/10 hover:shadow-lg transition-all duration-200 btn-shine cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      Enquire Now
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Decorative Divider */}
        <div className="my-20 h-px w-full bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />

        {/* Our Packaging Subsection */}
        <div id="packaging" className="space-y-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-primary-blue to-primary-green bg-clip-text text-transparent">
              Complete Container Systems
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-text-dark dark:text-white">
              Custom Packaging Solutions
            </h3>
            <p className="text-text-light dark:text-slate-400 font-light max-w-2xl mx-auto text-sm sm:text-base">
              Beyond world-class closures, we design and manufacture high-performance plastic container systems. Achieve 100% leak-proof pairing by sourcing your custom bottles, jars, and jerry cans directly from our production lines.
            </p>
          </div>

          {/* Interactive Feature Showcase */}
          <div className="max-w-4xl mx-auto">
            {/* Content Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Core Features list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary-blue dark:text-primary-green">
                    <Package className="w-5 h-5" />
                    <h4 className="font-bold text-sm text-text-dark dark:text-white">Custom Bottle & Jar Molding</h4>
                  </div>
                  <p className="text-xs text-text-light dark:text-slate-400 font-light leading-relaxed">
                    Custom shapes, sizes, and neck finishes ranging from 100ml to 50L. Developed using state-of-the-art Extrusion and Injection Blow Molding.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary-blue dark:text-primary-green">
                    <Cpu className="w-5 h-5" />
                    <h4 className="font-bold text-sm text-text-dark dark:text-white">CAD & Prototype Testing</h4>
                  </div>
                  <p className="text-xs text-text-light dark:text-slate-400 font-light leading-relaxed">
                    Full computational stress analysis and rapid 3D prototyping. We verify seal integrity, vertical load resistance, and environmental stress cracking.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary-blue dark:text-primary-green">
                    <Settings className="w-5 h-5" />
                    <h4 className="font-bold text-sm text-text-dark dark:text-white">Turnkey System Matching</h4>
                  </div>
                  <p className="text-xs text-text-light dark:text-slate-400 font-light leading-relaxed">
                    Eliminate compatibility risks. We engineer both the container and closure as a single integrated packaging unit to guarantee zero-leak logistics.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary-blue dark:text-primary-green">
                    <Paintbrush className="w-5 h-5" />
                    <h4 className="font-bold text-sm text-text-dark dark:text-white">Custom Color & Branding</h4>
                  </div>
                  <p className="text-xs text-text-light dark:text-slate-400 font-light leading-relaxed">
                    In-mold logo embossing, customized color masterbatches with Pantone matching, and screen printing to make your brand stand out on the shelves.
                  </p>
                </div>
              </div>

              {/* Technical Specifications Table */}
              <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800/80 overflow-hidden text-xs">
                <div className="bg-slate-50 dark:bg-slate-900/50 px-4 py-3 border-b border-slate-200 dark:border-slate-800 font-bold text-text-dark dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary-green" />
                  Packaging Specifications
                </div>
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-text-light dark:text-slate-300">
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800/40">
                    <span className="font-medium text-slate-400">Volume Range</span>
                    <span className="font-semibold text-text-dark dark:text-slate-200">100 ml to 50 Litres</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800/40">
                    <span className="font-medium text-slate-400">Processes</span>
                    <span className="font-semibold text-text-dark dark:text-slate-200">IBM, EBM, ISBM</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800/40">
                    <span className="font-medium text-slate-400">Compliance</span>
                    <span className="font-semibold text-text-dark dark:text-slate-200">UN Certified, FDA Approved</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800/40">
                    <span className="font-medium text-slate-400">Materials</span>
                    <span className="font-semibold text-text-dark dark:text-slate-200">HDPE, PP, PET, LDPE</span>
                  </div>
                </div>
              </div>

              {/* Call to Action Button */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => handleEnquire('Custom Packaging Systems')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-blue to-primary-green text-white text-sm font-semibold shadow-lg shadow-primary-blue/15 hover:shadow-xl transition-all duration-300 group"
                >
                  Enquire About Packaging
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Horizontal Packaging Images */}
          <div className="mt-16 pt-16 border-t border-slate-100 dark:border-slate-800/60 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h4 className="text-2xl font-bold uppercase tracking-wider text-text-dark dark:text-white">
                OUR <span className="bg-gradient-to-r from-primary-blue to-primary-green bg-clip-text text-transparent">PACKAGING</span>
              </h4>
              <p className="text-xs text-text-light dark:text-slate-400 font-light">
                Heavy-duty palletized carton packaging and container logistics optimized for transcontinental shipping.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  src: '/images/packaging_container.png',
                  alt: 'Palletized cartons loaded in a shipping container',
                  caption: 'Containerized Export Logistics'
                },
                {
                  src: '/images/packaging_pallet.png',
                  alt: 'Shrink-wrapped pallet of cartons',
                  caption: 'Palletized & Shrink-Wrapped Protection'
                },
                {
                  src: '/images/packaging_warehouse.png',
                  alt: 'Multiple stacks of cartons in warehouse',
                  caption: 'High-Volume Ready Inventory'
                }
              ].map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  className="group relative flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden p-3 shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-950/20">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="mt-3 text-center">
                    <p className="text-xs font-semibold text-text-dark dark:text-slate-200">
                      {img.caption}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
