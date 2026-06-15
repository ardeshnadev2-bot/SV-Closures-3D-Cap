'use client';

import { useState, useMemo, ComponentType } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Expand, Box, Settings, Compass, Ship, ShieldCheck } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: 'products' | 'machinery' | 'exports' | 'quality' | 'factory';
  categoryLabel: string;
  image: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  aspect: string; // Tailwind aspect classes for masonry variation
}

const galleryData: GalleryItem[] = [
  {
    id: 'gal-spout',
    title: 'High-Volume Press-Fit Spout Caps',
    category: 'products',
    categoryLabel: 'Products',
    image: '/images/spout_cap.png',
    description: 'Retractable spout closures optimized for automatic wadding lines.',
    icon: Box,
    aspect: 'aspect-[4/3] md:aspect-[3/4]',
  },
  {
    id: 'gal-molding',
    title: 'High-Speed Injection Press Unit',
    category: 'machinery',
    categoryLabel: 'Machinery',
    image: '/images/bg_caps.png',
    description: 'Fully automatic polymer injection moulding machines in Rajkot.',
    icon: Settings,
    aspect: 'aspect-square',
  },
  {
    id: 'gal-testing',
    title: 'Torque & Leakage Vacuum Testing',
    category: 'quality',
    categoryLabel: 'Quality Testing',
    image: '/images/screw_cap.png',
    description: 'Rigorous batch quality testing to confirm zero-spill performance.',
    icon: ShieldCheck,
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'gal-crimp',
    title: 'Engine Oil Crimp-On Closures',
    category: 'products',
    categoryLabel: 'Products',
    image: '/images/crimp_closure.png',
    description: 'Metal-plastic hybrid closures engineered for anti-counterfeiting.',
    icon: Box,
    aspect: 'aspect-square',
  },
  {
    id: 'gal-shipping',
    title: 'Palletized Container Shipments',
    category: 'exports',
    categoryLabel: 'Export Shipments',
    image: '/images/bg_caps.png',
    description: 'Pallet shrink wrapping and cargo security checks for European ports.',
    icon: Ship,
    aspect: 'aspect-[3/2] md:aspect-[4/3]',
  },
  {
    id: 'gal-tooling',
    title: 'Mold Development CNC Tool Shop',
    category: 'factory',
    categoryLabel: 'Factory Images',
    image: '/images/flip_top_cap.png',
    description: 'In-house CAD/CAM tooling and multi-cavity hot runner molds.',
    icon: Compass,
    aspect: 'aspect-square md:aspect-[3/4]',
  },
  {
    id: 'gal-paint-cans',
    title: 'Color-Coded Paint Packaging',
    category: 'products',
    categoryLabel: 'Products',
    image: '/images/gallery_paint_cans.jpg',
    description: 'Industrial paint containers fitted with leak-proof plastic closures.',
    icon: Box,
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'gal-sanitizer',
    title: 'Personal Care Dispensing Caps',
    category: 'products',
    categoryLabel: 'Products',
    image: '/images/gallery_sanitizer.jpg',
    description: 'Precision flip-top and screw caps designed for sanitizers and consumer care.',
    icon: Box,
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'gal-chemical',
    title: 'Industrial Chemical Packaging',
    category: 'products',
    categoryLabel: 'Products',
    image: '/images/gallery_chemical_containers.jpg',
    description: 'Heavy-duty drums and containers secured with specialized chemical-resistant caps.',
    icon: Box,
    aspect: 'aspect-[1.5/1]',
  },
  {
    id: 'gal-factory-assembly',
    title: 'Automated Assembly Conveyors',
    category: 'factory',
    categoryLabel: 'Factory Images',
    image: '/images/gallery_factory_assembly.png',
    description: 'High-speed automated conveyors running parts through the assembly line.',
    icon: Compass,
    aspect: 'aspect-[16/9] md:aspect-[21/9]',
  },
  {
    id: 'gal-refinery',
    title: 'Petrochemical Refining Facility',
    category: 'factory',
    categoryLabel: 'Factory Images',
    image: '/images/gallery_refinery.jpg',
    description: 'Industrial storage tanks and distillation columns processing chemical feeds.',
    icon: Compass,
    aspect: 'aspect-[3/2]',
  },
  {
    id: 'gal-oil-pouring',
    title: 'Engine Oil Dispensing Spout',
    category: 'products',
    categoryLabel: 'Products',
    image: '/images/gallery_oil_pouring.jpg',
    description: 'Precision-engineered pouring closures designed for smooth, splash-free oil delivery.',
    icon: Box,
    aspect: 'aspect-[1.5/1]',
  },
  {
    id: 'gal-injection-molding',
    title: 'Precision Polymer Injection Molding',
    category: 'machinery',
    categoryLabel: 'Machinery',
    image: '/images/gallery_injection_molding.jpg',
    description: 'High-tech injection molding units ensuring strict tolerance control.',
    icon: Settings,
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'gal-shipping-loading',
    title: 'Forklift Cargo Loading Lines',
    category: 'exports',
    categoryLabel: 'Export Shipments',
    image: '/images/gallery_shipping_loading.jpg',
    description: 'Forklift operator stacking containerized cargo boxes ready for export dispatch.',
    icon: Ship,
    aspect: 'aspect-[4/3] md:aspect-[3/4]',
  },
  {
    id: 'gal-crane-molding',
    title: 'Overhead Crane & Injection Press',
    category: 'machinery',
    categoryLabel: 'Machinery',
    image: '/images/gallery_crane_molding.jpg',
    description: 'Heavy-duty overhead crane system supporting modern injection molding machinery.',
    icon: Settings,
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'gal-factory-overhead',
    title: 'Factory Floor Overhead View',
    category: 'factory',
    categoryLabel: 'Factory Images',
    image: '/images/gallery_factory_overhead.jpg',
    description: 'Panoramic overhead layout of our high-volume automated molding facility.',
    icon: Compass,
    aspect: 'aspect-[1.6/1]',
  },
  {
    id: 'gal-packaging-conveyor',
    title: 'Automated Packaging & Filling Line',
    category: 'factory',
    categoryLabel: 'Factory Images',
    image: '/images/gallery_packaging_conveyor.jpg',
    description: 'Conveyor belt system for filling, sealing, and packaging finished products.',
    icon: Compass,
    aspect: 'aspect-[4/3]',
  },
];

const filterCategories = [
  { id: 'all', name: 'All Gallery' },
  { id: 'factory', name: 'Factory' },
  { id: 'products', name: 'Products' },
  { id: 'machinery', name: 'Machinery' },
  { id: 'exports', name: 'Shipments' },
  { id: 'quality', name: 'Quality' },
];

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') return galleryData;
    return galleryData.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <section
      id="gallery"
      className="py-20 lg:py-28 relative overflow-hidden bg-gradient-to-b from-blue-50/20 via-transparent to-transparent dark:from-slate-950/40 dark:via-slate-900/20 dark:to-transparent z-10"
    >
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-[#40A4D6]/10 rounded-full blur-[80px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-[#6EC482]/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-dark dark:text-white">
            Manufacturing & Product Gallery
          </h2>
          <p className="text-text-light dark:text-slate-400 font-light max-w-2xl mx-auto">
            A visual overview of our industrial operations, automated molding machinery, strict quality control tests, and international export loading.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 max-w-3xl mx-auto">
          {filterCategories.map((filter) => {
            const active = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide border transition-all duration-300 ${
                  active
                    ? 'bg-gradient-to-r from-primary-blue to-primary-green border-transparent text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-text-light dark:text-slate-400 hover:border-primary-blue dark:hover:border-primary-green hover:text-text-dark dark:hover:text-white'
                }`}
              >
                {filter.name}
              </button>
            );
          })}
        </div>

        {/* Masonry Columns Layout */}
        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className={`break-inside-avoid group relative glass-card rounded-2xl overflow-hidden cursor-pointer border border-primary-blue/5 hover:border-primary-blue/20 dark:hover:border-primary-green/20 ${item.aspect} w-full flex flex-col`}
              >
                {/* Image panel */}
                <div className="relative w-full h-full min-h-[220px] bg-slate-100 dark:bg-slate-950 flex items-center justify-center p-6 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity z-10" />
                  
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Icon wrap */}
                  <div className="absolute top-4 left-4 z-20 w-8 h-8 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-center text-slate-300">
                    <item.icon className="w-4 h-4 text-primary-green" />
                  </div>

                  {/* Expand badge */}
                  <div className="absolute top-4 right-4 z-20 w-8 h-8 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-center text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Expand className="w-4 h-4 hover:text-white" />
                  </div>

                  {/* Text details bottom overlay */}
                  <div className="absolute bottom-4 left-4 right-4 z-20 space-y-1 text-white">
                    <span className="inline-block text-[9px] uppercase font-bold tracking-wider text-primary-green bg-emerald-500/10 px-2 py-0.5 rounded">
                      {item.categoryLabel}
                    </span>
                    <h3 className="text-sm font-bold leading-tight group-hover:text-primary-blue dark:group-hover:text-primary-green transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="text-[10px] text-slate-300 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal Lightbox Popup overlay */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="max-w-3xl w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="h-[300px] sm:h-[450px] w-full relative bg-slate-950 flex items-center justify-center p-8 border-b border-slate-800">
                  <Image
                    src={selectedImage.image}
                    alt={selectedImage.title}
                    fill
                    className="object-contain p-8"
                  />
                </div>
                <div className="p-6 space-y-2.5">
                  <span className="inline-block text-[10px] uppercase font-bold tracking-wider text-primary-green bg-emerald-500/10 px-2 py-0.5 rounded">
                    {selectedImage.categoryLabel}
                  </span>
                  <h3 className="text-lg font-bold text-white leading-tight">
                    {selectedImage.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-light leading-relaxed">
                    {selectedImage.description}
                  </p>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-950/80 border border-slate-800 p-2 rounded-full"
                    aria-label="Close image popup"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
