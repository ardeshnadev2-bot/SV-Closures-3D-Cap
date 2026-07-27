'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Download, 
  MessageSquare, 
  Check
} from 'lucide-react';

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

const productsData: Product[] = [
  {
    id: 'sv-32-spout',
    name: 'SV32 (32mm Press-Fit Spout Cap)',
    image: '/images/product_32mm_slide1.png',
    categories: ['spout', 'food-grade', 'oil-bottle', 'tamper-evident'],
    material: 'HDPE / LLDPE Virgin Resins',
    closureType: 'Press-Fit Retractable Spout',
    tamperEvidence: 'Tear-Off Pull Ring + Outer Cap Seal',
    diameter: '32 mm',
    application: 'Edible Oil Bottles, Packaging Containers',
    specifications: ['High flow control', 'Dual lip leak prevention', 'Retractable design'],
  },
  {
    id: 'sv-40-crimp',
    name: 'SV40 (40mm Jerrycan & Tin Closures)',
    image: '/images/product_40mm_slide1.png',
    categories: ['spout', 'tamper-evident', 'oil-bottle'],
    material: 'High-Density HDPE / Virgin PP',
    closureType: 'Threaded Pull-Up & Retractable Spout',
    tamperEvidence: 'Inner Pull Tab Rings / Tear-Away Glands',
    diameter: '40 mm',
    application: 'Chemical Containers, Motor Oil Tin Cans',
    specifications: ['Directional flow control', 'Integrated gasket seals', 'Anti-counterfeiting crimp base'],
  },
  {
    id: 'sv-42-tin',
    name: 'SV42 (42mm Press-Fit Spout Cap)',
    image: '/images/product_42mm_slide1.png',
    categories: ['spout', 'tamper-evident', 'food-grade'],
    material: 'HDPE / LLDPE Virgin Polymer',
    closureType: 'Press-Fit Retractable Spout',
    tamperEvidence: 'Tear-Off Pull Ring + Inner Locking Ridges',
    diameter: '42 mm',
    application: 'Automotive Oils, Lubricants, Solvents',
    specifications: ['Antiglug venting', 'Chemical resistant liner', 'Heavy wall thickness'],
  },
  {
    id: 'sv-43-spout',
    name: 'SV43 (43mm Retractable Spout Closures)',
    image: '/images/product_43mm_slide1.png',
    categories: ['spout', 'food-grade', 'tamper-evident'],
    material: 'LLDPE Virgin Resins / HDPE',
    closureType: 'Threaded Press-in Spout Closures',
    tamperEvidence: 'Tear-Off Pull Ring + Gland Dust Shield',
    diameter: '43 mm',
    application: 'Edible Oil Tin Cans, Chemical Jerrycans',
    specifications: ['Ultra-retractable flexible neck', 'Dual grip pull ring', 'High-sealing barrier properties'],
  },
  {
    id: 'sv-57-screw',
    name: 'SV57 (57mm Press-in Pull-Ring Spout Cap)',
    image: '/images/product_57mm_slide1.png',
    categories: ['spout', 'jerry-can', 'tamper-evident'],
    material: 'LDPE / High-Density Polyethylene (HDPE)',
    closureType: 'Press-in Retractable Spout Closures',
    tamperEvidence: 'Tear-Off Pull Ring + Seal Membrane',
    diameter: '57 mm',
    application: 'Chemical Jerrycans, Drum Containers, Industrial Liquids',
    specifications: ['Press-in drip-free neck', 'Retractable easy-pour spout', 'Leakage-proof seal membrane'],
  },
  {
    id: 'sv-63-crimp',
    name: 'SV63 (63mm Jerrycan Spout Caps)',
    image: '/images/product_63mm_slide1.png',
    categories: ['spout', 'jerry-can', 'tamper-evident'],
    material: 'High-Density HDPE + EPDM Gasket',
    closureType: 'Threaded & Crimp-On Spout',
    tamperEvidence: 'Tear-Out Spout Ring + Dust Cap Gland',
    diameter: '63 mm',
    application: 'Industrial Jerrycans, 20L-30L Drums',
    specifications: ['High-flow 63mm spout orifice', 'Dual integrated gasket seal', 'Impact & drop-tested grade'],
  },
  {
    id: 'sv-5l-bottle',
    name: 'SV5L (5-Litre Bottle Closures Series)',
    image: '/images/product_5l_slide1.png',
    categories: ['spout', 'screw-cap', 'jerry-can'],
    material: 'High-Density Polyethylene (HDPE) / PP',
    closureType: 'Threaded & Pull-Up Spout Closures',
    tamperEvidence: 'Tear-Off Spout Ring / Break-Away Ring',
    diameter: '42 mm / 45 mm',
    application: '5L Water Bottles, Motor Oils, Chemicals',
    specifications: ['Anti-glug pouring channel', 'EPDM gasket seal', 'Anti-counterfeit security locks'],
  }
];

function ProductShowcaseCard({ 
  product, 
  downloadingId, 
  handleDownloadPDF, 
  handleEnquire 
}: {
  product: Product;
  downloadingId: string | null;
  handleDownloadPDF: (p: Product) => void;
  handleEnquire: (name: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group glass-card rounded-3xl overflow-hidden flex flex-col border border-slate-200/50 dark:border-slate-800/50 hover:border-primary-blue/30 dark:hover:border-primary-green/30 hover:shadow-2xl hover:shadow-primary-blue/15 transition-all duration-300 h-full"
    >
      {/* Top: Image Header Box */}
      <div className="relative aspect-[4/3] w-full bg-slate-100/50 dark:bg-slate-950/20 overflow-hidden border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-blue/5 to-primary-green/5 pointer-events-none z-10" />
        
        {/* Static Image */}
        <div className="relative w-full h-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
      </div>

      {/* Bottom: Info and Specs Content Area */}
      <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between">
        <div className="space-y-5 flex-1">
          {/* Product Title */}
          <h3 className="text-lg font-bold text-text-dark dark:text-white leading-tight min-h-[48px] flex items-center">
            {product.name}
          </h3>

          {/* Specifications Table (Exact Screenshot Styling) */}
          <div className="space-y-2.5 text-xs text-text-light dark:text-slate-400">
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800/40">
              <span className="text-slate-400 font-medium">Material</span>
              <span className="font-semibold text-text-dark dark:text-slate-200 text-right">{product.material}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800/40">
              <span className="text-slate-400 font-medium">Closure Type</span>
              <span className="font-semibold text-text-dark dark:text-slate-200 text-right">{product.closureType}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800/40">
              <span className="text-slate-400 font-medium">Tamper Evidence</span>
              <span className="font-semibold text-text-dark dark:text-slate-200 text-right">{product.tamperEvidence}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800/40">
              <span className="text-slate-400 font-medium">Diameter</span>
              <span className="font-semibold text-text-dark dark:text-slate-200 text-right">{product.diameter}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800/40">
              <span className="text-slate-400 font-medium">Application</span>
              <span className="font-semibold text-text-dark dark:text-slate-200 text-right max-w-[180px] break-words">{product.application}</span>
            </div>
          </div>

          {/* Specifications Bullet Checklist (Screenshot style with green check icon) */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800/40 space-y-2">
            {product.specifications.map((spec, index) => (
              <div key={index} className="flex items-start gap-2.5 text-xs text-text-light dark:text-slate-400">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="font-medium text-slate-600 dark:text-slate-300">{spec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-5 border-t border-slate-100 dark:border-slate-800/40 mt-6">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleDownloadPDF(product)}
            disabled={downloadingId === product.id}
            className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-text-dark dark:text-slate-300 hover:border-primary-blue hover:text-primary-blue dark:hover:text-primary-green dark:hover:border-primary-green transition-all duration-200 disabled:opacity-50 cursor-pointer"
          >
            {downloadingId === product.id ? (
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
            onClick={() => handleEnquire(product.name)}
            className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-primary-blue to-primary-green text-white text-xs font-semibold shadow-md shadow-primary-blue/10 hover:shadow-lg transition-all duration-200 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Enquire Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductsSection() {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleEnquire = (productName: string) => {
    const event = new CustomEvent('select-product', { detail: productName });
    window.dispatchEvent(event);

    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, '', '#contact');
    }
  };

  const handleDownloadPDF = (product: Product) => {
    setDownloadingId(product.id);
    
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
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-[#40A4D6]/10 rounded-full blur-[80px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-[#6EC482]/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-primary-blue to-primary-green bg-clip-text text-transparent">
            Flagship B2B Closures
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-dark dark:text-white">
            Product Showcase
          </h2>
          <p className="text-text-light dark:text-slate-400 font-light max-w-2xl mx-auto text-sm sm:text-base">
            Explore our precision-engineered industrial closure series, optimized for heavy-duty containers and Jerrycans.
          </p>
        </div>

        {/* Grid Layout (Exact Screenshot style: responsive 3-column grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {productsData.map((prod) => (
            <ProductShowcaseCard
              key={prod.id}
              product={prod}
              downloadingId={downloadingId}
              handleDownloadPDF={handleDownloadPDF}
              handleEnquire={handleEnquire}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
