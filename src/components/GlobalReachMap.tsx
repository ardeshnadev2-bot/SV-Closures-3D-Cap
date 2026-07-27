'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe2, Navigation, Ship, Anchor } from 'lucide-react';

interface ExportCountry {
  name: string;
  coords: { x: number; y: number }; // SVG canvas relative coordinates
  shippingDays: string;
  keyProduct: string;
  transport: string;
}

const exportDestinations: ExportCountry[] = [
  {
    name: 'India',
    coords: { x: 561, y: 184 },
    shippingDays: 'Domestic Hub',
    keyProduct: 'All Products',
    transport: 'Road & Rail Freight',
  },
  {
    name: 'UAE',
    coords: { x: 448, y: 184 },
    shippingDays: '4-6 Days',
    keyProduct: 'Press-Fit Spouts',
    transport: 'Sea Container (Jebel Ali)',
  },
  {
    name: 'Saudi Arabia',
    coords: { x: 422, y: 188 },
    shippingDays: '6-8 Days',
    keyProduct: 'Rigid Screw Caps',
    transport: 'Sea Container (Jeddah)',
  },
  {
    name: 'Italy',
    coords: { x: 400, y: 105 },
    shippingDays: '16-18 Days',
    keyProduct: 'Spout Caps & Handles',
    transport: 'Sea Container (Genoa)',
  },
  {
    name: 'Germany',
    coords: { x: 400, y: 83 },
    shippingDays: '18-20 Days',
    keyProduct: 'Custom Closures',
    transport: 'Sea Container (Hamburg)',
  },
  {
    name: 'United Kingdom',
    coords: { x: 365, y: 75 },
    shippingDays: '16-19 Days',
    keyProduct: 'Flip-Top Closures',
    transport: 'Sea Container (Felixstowe)',
  },
  {
    name: 'Sri Lanka',
    coords: { x: 579, y: 241 },
    shippingDays: '3-4 Days',
    keyProduct: 'Food Grade Caps',
    transport: 'Sea Container (Colombo)',
  },
  {
    name: 'Canada',
    coords: { x: 186, y: 75 },
    shippingDays: '22-25 Days',
    keyProduct: 'Tamper Evident Closures',
    transport: 'Sea Container (Vancouver)',
  },
  {
    name: 'USA',
    coords: { x: 186, y: 118 },
    shippingDays: '20-24 Days',
    keyProduct: 'Spout & Flip-Top Caps',
    transport: 'Sea Container (New York / LA)',
  },
];

const exportPhotos = [
  {
    src: '/images/export_shipping_1.png',
    alt: 'Vessel carrying containers across the ocean',
    caption: 'Ocean Transit',
  },
  {
    src: '/images/export_shipping_2.png',
    alt: 'High-volume export container stacks',
    caption: 'Bulk Storage',
  },
  {
    src: '/images/export_shipping_3.png',
    alt: 'Precision harbor crane container loading',
    caption: 'Port Loading',
  },
  {
    src: '/images/export_shipping_4.png',
    alt: 'Express logistics container truck',
    caption: 'Land Freight',
  },
  {
    src: '/images/export_shipping_5.png',
    alt: 'Busy shipping terminal at sunset',
    caption: 'Global Hubs',
  },
  {
    src: '/images/export_shipping_6.png',
    alt: 'Heavy container handler at logistics terminal',
    caption: 'Terminal Logistics',
  },
];

export default function GlobalReachMap() {
  const [hoveredCountry, setHoveredCountry] = useState<ExportCountry | null>(null);

  const origin = exportDestinations[0].coords; // India

  return (
    <section
      id="global-reach"
      className="py-20 lg:py-28 bg-gradient-to-b from-blue-50/20 via-transparent to-transparent dark:from-slate-950/40 dark:via-slate-900/20 dark:to-transparent text-slate-900 dark:text-white relative overflow-hidden z-10"
    >
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-[#40A4D6]/10 rounded-full blur-[80px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-[#6EC482]/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      
      {/* Radar rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-slate-200/50 dark:border-slate-800/40 rounded-full pointer-events-none -z-10 animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-slate-200/30 dark:border-slate-800/20 rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-blue/10 text-primary-blue dark:text-accent-blue text-xs font-semibold uppercase tracking-wider">
            <Globe2 className="w-4 h-4 text-primary-green" />
            Our Exports & Logistics
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Connecting India to Global Markets
          </h2>
          
          <div className="space-y-4 max-w-3xl mx-auto">
            <p className="text-slate-700 dark:text-slate-300 font-light text-base leading-relaxed">
              We specialize in the high-volume export of our premium-grade plastic closures, caps, and jerrycan spouts to key markets worldwide. Our state-of-the-art products are engineered to withstand extreme climates during long-distance transit, featuring airtight sealing and durable structures.
            </p>
            <p className="text-slate-600 dark:text-slate-400 font-light text-sm leading-relaxed max-w-2xl mx-auto">
              To ensure flawless delivery, we utilize heavy-duty, moisture-controlled shipping containers and partner with tier-1 international freight networks. Every export consignment is packaged using export-grade pallets with moisture-barrier wrapping, guaranteeing food-safety and industrial integrity from our factory floor directly to your warehouse.
            </p>
          </div>

          {/* Shipping and Export Containers Photo Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-6 max-w-5xl mx-auto">
            {exportPhotos.map((photo, index) => (
              <motion.div
                key={index}
                className="relative group aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800/80 shadow-xl bg-white dark:bg-slate-950"
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-3 text-center">
                  <span className="text-[10px] font-bold text-white tracking-wider uppercase">{photo.caption}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Map Container */}
        <div className="glass-card bg-white/50 dark:bg-slate-950/70 border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl relative overflow-x-auto min-w-[700px] md:min-w-0">
          
          {/* Legend indicator */}
          <div className="absolute top-6 left-6 z-20 flex items-center gap-6 text-xs text-slate-600 dark:text-slate-400 bg-white/95 dark:bg-slate-900/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary-green animate-ping shrink-0" />
              <span>India Origin</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary-blue shrink-0" />
              <span>Export Markets</span>
            </div>
          </div>

          {/* SVG Map Canvas */}
          <svg
            viewBox="0 0 800 450"
            className="w-full h-auto text-slate-300 dark:text-slate-800"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* World Map Background silhouette */}
            <image
              href="/images/world_map.svg"
              x="-15"
              y="-65"
              width="830"
              height="542"
              className="opacity-[0.06] dark:opacity-[0.04] dark:invert"
              pointerEvents="none"
            />

            {/* Export Shipping Arc Paths */}
            {exportDestinations.map((country, idx) => {
              if (idx === 0) return null; // Skip India to India path
              
              // Calculate curved path coordinates for nice arching curves
              const dx = country.coords.x - origin.x;
              const dy = country.coords.y - origin.y;
              const dr = Math.sqrt(dx * dx + dy * dy) * 1.25; // curvature control
              
              return (
                <g key={`path-${country.name}`}>
                  {/* Glowing background static path */}
                  <path
                    d={`M${origin.x},${origin.y} A${dr},${dr} 0 0,1 ${country.coords.x},${country.coords.y}`}
                    fill="none"
                    stroke="#1097D5"
                    strokeWidth="1.5"
                    strokeOpacity="0.12"
                  />
                  {/* Flow Animation dash path running along the curve */}
                  <motion.path
                    d={`M${origin.x},${origin.y} A${dr},${dr} 0 0,1 ${country.coords.x},${country.coords.y}`}
                    fill="none"
                    stroke="url(#arc-gradient)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray="15, 120"
                    animate={{ strokeDashoffset: [0, -135] }}
                    transition={{
                      repeat: Infinity,
                      duration: 3 + (idx % 3) * 0.8,
                      ease: 'linear',
                    }}
                  />
                </g>
              );
            })}

            {/* Country node markers */}
            {exportDestinations.map((country, idx) => {
              const isOrigin = idx === 0;
              const isHovered = hoveredCountry?.name === country.name;
              const nodeColor = isOrigin ? '#82B91A' : '#1097D5';
              
              return (
                <g
                  key={`node-${country.name}`}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredCountry(country)}
                  onMouseLeave={() => setHoveredCountry(null)}
                >
                  {/* Sonar Radar concentric pulses */}
                  {(isOrigin || isHovered) && (
                    <>
                      <circle
                        cx={country.coords.x}
                        cy={country.coords.y}
                        r={isOrigin ? 18 : 12}
                        fill={nodeColor}
                        fillOpacity="0.2"
                        className="animate-ping"
                        style={{ animationDuration: '3s' }}
                      />
                      <circle
                        cx={country.coords.x}
                        cy={country.coords.y}
                        r={isOrigin ? 12 : 8}
                        fill={nodeColor}
                        fillOpacity="0.3"
                        className="animate-ping"
                        style={{ animationDuration: '1.5s' }}
                      />
                    </>
                  )}
                  {/* Static Hover Glow ring */}
                  <circle
                    cx={country.coords.x}
                    cy={country.coords.y}
                    r={isOrigin ? 9 : 6}
                    fill={nodeColor}
                    fillOpacity={isHovered ? '0.4' : '0.2'}
                    className="transition-all duration-300"
                  />
                  {/* Center Node Core */}
                  <circle
                    cx={country.coords.x}
                    cy={country.coords.y}
                    r={isOrigin ? 5 : 3.5}
                    fill={nodeColor}
                    className="transition-all duration-300"
                  />
                </g>
              );
            })}

            {/* Definitions for Gradients */}
            <defs>
              <linearGradient id="arc-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#82B91A" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#1097D5" stopOpacity="1" />
                <stop offset="100%" stopColor="#82B91A" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>

          {/* Interactive Tooltip Card overlay */}
          <div className="min-h-[100px] bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 mt-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            {hoveredCountry ? (
              <>
                <div className="md:col-span-1">
                  <span className="block text-slate-500 dark:text-slate-500 text-[10px] font-bold uppercase tracking-wider">Target Destination</span>
                  <span className="text-base font-extrabold text-slate-900 dark:text-white">{hoveredCountry.name}</span>
                </div>
                <div className="md:col-span-1 flex items-center gap-2">
                  <Ship className="w-5 h-5 text-primary-blue shrink-0" />
                  <div>
                    <span className="block text-slate-500 dark:text-slate-500 text-[10px] font-bold uppercase tracking-wider">Logistics Transmit</span>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">{hoveredCountry.shippingDays}</span>
                  </div>
                </div>
                <div className="md:col-span-1 flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-primary-green shrink-0" />
                  <div>
                    <span className="block text-slate-500 dark:text-slate-500 text-[10px] font-bold uppercase tracking-wider">Key Export Cap</span>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">{hoveredCountry.keyProduct}</span>
                  </div>
                </div>
                <div className="md:col-span-1 flex items-center gap-2">
                  <Anchor className="w-5 h-5 text-primary-blue shrink-0" />
                  <div>
                    <span className="block text-slate-500 dark:text-slate-500 text-[10px] font-bold uppercase tracking-wider">Shipping Method</span>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">{hoveredCountry.transport}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="md:col-span-4 text-center py-4 text-slate-600 dark:text-slate-500 text-xs font-medium tracking-wide">
                Hover over the map nodes to inspect export times, shipping methods, and product distributions.
              </div>
            )}
          </div>
          
        </div>

      </div>
    </section>
  );
}
