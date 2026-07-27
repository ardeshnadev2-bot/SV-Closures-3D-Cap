'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Paintbrush, 
  Layers, 
  Sun, 
  Upload, 
  Download, 
  Play, 
  Pause, 
  Check, 
  Sparkles,
  Info,
  X
} from 'lucide-react';

interface CapConfig {
  color: string;
  materialType: string;
  logoUrl: string | null;
  isAnimated: boolean;
}

// 1. LIGHTING PRESETS RIG
function ConfiguratorLights({ preset }: { preset: string }) {
  if (preset === 'luxury') {
    return (
      <>
        <ambientLight intensity={0.18} />
        <directionalLight position={[3, 8, 3]} intensity={0.8} />
        {/* Cinematic rich contrast point lights */}
        <pointLight position={[3, -2, -3]} color="#4EC5F1" intensity={3.5} />
        <pointLight position={[-3, 4, -2]} color="#D4AF37" intensity={3.0} />
        <spotLight position={[0, 6, 2]} angle={0.5} penumbra={1} intensity={2.5} color="#ffffff" castShadow />
      </>
    );
  }
  
  if (preset === 'sunlight') {
    return (
      <>
        <ambientLight intensity={0.55} color="#fffcf5" />
        <directionalLight position={[12, 10, 5]} intensity={3.0} color="#fff3db" castShadow />
        <directionalLight position={[-8, 2, -6]} intensity={0.7} color="#d4e8ff" />
      </>
    );
  }

  // 'studio' preset (standard bright clean daylight)
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 10, 5]} intensity={2.2} castShadow />
      <directionalLight position={[-5, 2, 2]} intensity={0.8} />
      <directionalLight position={[0, -5, -2]} intensity={0.5} />
      <pointLight position={[3, 3, 3]} intensity={0.6} />
    </>
  );
}

// 2. BOTTLE CAP ASSEMBLY WITH MATERIAL BINDINGS & LOGO MAPPING
function AnimatedBottleCap({ config }: { config: CapConfig }) {
  const capRef = useRef<THREE.Group>(null);
  const [logoTexture, setLogoTexture] = useState<THREE.Texture | null>(null);

  // Dynamic texture loading for brand logo
  useEffect(() => {
    if (config.logoUrl) {
      const loader = new THREE.TextureLoader();
      loader.load(
        config.logoUrl,
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          // Center and adjust mapping properties to fit flat top face
          tex.center.set(0.5, 0.5);
          tex.wrapS = THREE.ClampToEdgeWrapping;
          tex.wrapT = THREE.ClampToEdgeWrapping;
          setLogoTexture(tex);
        },
        undefined,
        (err) => {
          console.error('Failed to load logo texture', err);
          setLogoTexture(null);
        }
      );
    } else {
      setLogoTexture(null);
    }
  }, [config.logoUrl]);

  // Helix curve for static bottle neck threads
  const helixCurve = useMemo(() => {
    class CustomHelixCurve extends THREE.Curve<THREE.Vector3> {
      constructor() {
        super();
      }
      getPoint(t: number, optionalTarget = new THREE.Vector3()) {
        const turns = 1.8;
        const height = 0.25;
        const radius = 0.88;
        const angle = t * Math.PI * 2 * turns;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = (t - 0.5) * height - 0.15;
        return optionalTarget.set(x, y, z);
      }
    }
    return new CustomHelixCurve();
  }, []);

  // Rib geometry calculation (60 outer grip ribs for fine realism)
  const ribs = useMemo(() => {
    const ribList = [];
    const count = 60;
    const radius = 0.985;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      ribList.push({ x, z, angle });
    }
    return ribList;
  }, []);

  // Map configuration state to physical material properties
  const capMaterialProps = useMemo(() => {
    const color = config.color;
    switch (config.materialType) {
      case 'matte-eco': // Eco Recycled Matte
        return {
          color,
          roughness: 0.75,
          metalness: 0.0,
          clearcoat: 0.0,
          clearcoatRoughness: 0.0,
        };
      case 'metal': // Brushed Metal/Aluminum
        return {
          color,
          roughness: 0.38,
          metalness: 0.85,
          clearcoat: 0.15,
          clearcoatRoughness: 0.1,
        };
      case 'gold-silver': // Premium Chrome / Highly Reflective Metallic
        return {
          color,
          roughness: 0.12,
          metalness: 0.95,
          clearcoat: 0.8,
          clearcoatRoughness: 0.08,
        };
      case 'glossy': // Standard High-Gloss Plastic
      default:
        return {
          color,
          roughness: 0.14,
          metalness: 0.05,
          clearcoat: 0.9,
          clearcoatRoughness: 0.15,
        };
    }
  }, [config.color, config.materialType]);

  useFrame((state) => {
    if (!config.isAnimated) {
      if (capRef.current) {
        // Inspection mode: Floating open
        capRef.current.position.y = THREE.MathUtils.lerp(capRef.current.position.y, 0.45, 0.08);
        capRef.current.rotation.y = THREE.MathUtils.lerp(capRef.current.rotation.y, -Math.PI * 1.5, 0.08);
        capRef.current.rotation.x = THREE.MathUtils.lerp(capRef.current.rotation.x, 0.05, 0.08);
        capRef.current.rotation.z = THREE.MathUtils.lerp(capRef.current.rotation.z, 0.0, 0.08);
      }
      return;
    }

    const elapsed = state.clock.getElapsedTime();
    const cycleTime = elapsed % 8; 
    
    // SEALED POSITION FIX: Lower base Y position so cap fully covers bottle threads
    const SEALED_Y = -0.28; 
    const LIFT_HEIGHT = 0.95;

    let targetY = SEALED_Y; 
    let targetRotation = 0;
    
    if (cycleTime < 1.5) {
      // Phase 0: Fully Sealed & Closed
      targetY = SEALED_Y;
      targetRotation = 0;
    } else if (cycleTime < 3.5) {
      // Phase 1: Unscrewing/Lifting
      const t = (cycleTime - 1.5) / 2.0; 
      const ease = t * t * (3 - 2 * t); 
      targetY = SEALED_Y + ease * LIFT_HEIGHT; 
      targetRotation = -ease * Math.PI * 3.5; 
    } else if (cycleTime < 5.5) {
      // Phase 2: Open / Hovering
      const hoverT = cycleTime - 3.5;
      targetY = (SEALED_Y + LIFT_HEIGHT) + Math.sin(hoverT * Math.PI) * 0.05; 
      targetRotation = -Math.PI * 3.5 - hoverT * 0.15; 
    } else if (cycleTime < 7.5) {
      // Phase 3: Screwing Back Down to Close
      const t = (cycleTime - 5.5) / 2.0; 
      const ease = t * t * (3 - 2 * t);
      targetY = (SEALED_Y + LIFT_HEIGHT) - ease * LIFT_HEIGHT; 
      targetRotation = -Math.PI * 3.5 - 2.0 * 0.15 + ease * (Math.PI * 3.5 + 2.0 * 0.15); 
    } else {
      // Phase 4: Sealed
      targetY = SEALED_Y;
      targetRotation = 0;
    }
    
    if (capRef.current) {
      capRef.current.position.y = targetY;
      capRef.current.rotation.y = targetRotation;
      
      // Tilt physics while unscrewed
      if (cycleTime >= 1.5 && cycleTime < 7.5) {
        let tiltProgress = cycleTime < 3.5 ? (cycleTime - 1.5) / 2.0 : cycleTime < 5.5 ? 1.0 : 1.0 - (cycleTime - 5.5) / 2.0;
        capRef.current.rotation.x = Math.sin(elapsed * 1.5) * 0.08 * tiltProgress;
        capRef.current.rotation.z = Math.cos(elapsed * 1.5) * 0.05 * tiltProgress;
      } else {
        capRef.current.rotation.x = 0;
        capRef.current.rotation.z = 0;
      }
    }
  });

  return (
    <group position={[0, -0.2, 0]}>
      {/* 1. BOTTLE NECK ASSEMBLY (Static) */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.87, 0.87, 1.0, 32, 1, true]} />
        <meshPhysicalMaterial
          color="#e0f4fd"
          transmission={0.9}
          opacity={0.8}
          transparent
          roughness={0.1}
          thickness={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh position={[0, -1.15, 0]}>
        <cylinderGeometry args={[0.87, 1.35, 0.3, 32, 1, true]} />
        <meshPhysicalMaterial
          color="#e0f4fd"
          transmission={0.9}
          opacity={0.8}
          transparent
          roughness={0.1}
          thickness={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh position={[0, -0.4, 0]}>
        <tubeGeometry args={[helixCurve, 64, 0.035, 8, false]} />
        <meshPhysicalMaterial
          color="#e0f4fd"
          transmission={0.9}
          opacity={0.8}
          transparent
          roughness={0.1}
          thickness={0.8}
        />
      </mesh>

      <mesh position={[0, -0.65, 0]}>
        <torusGeometry args={[0.92, 0.025, 8, 32]} />
        <meshPhysicalMaterial
          color="#e0f4fd"
          transmission={0.95}
          opacity={0.8}
          transparent
          roughness={0.1}
        />
      </mesh>

      {/* 2. TAMPER-EVIDENT COLLAR RING (Adapts to material/color selections) */}
      <mesh position={[0, -0.12, 0]}>
        <cylinderGeometry args={[0.985, 0.985, 0.08, 48, 1, true]} />
        <meshPhysicalMaterial {...capMaterialProps} side={THREE.DoubleSide} />
      </mesh>

      {/* Broken Bridge Bits (Connecting collar ring) */}
      {Array.from({ length: 8 }).map((_, idx) => {
        const angle = (idx / 8) * Math.PI * 2;
        const x = Math.cos(angle) * 0.97;
        const z = Math.sin(angle) * 0.97;
        return (
          <mesh key={idx} position={[x, -0.07, z]} rotation={[0, -angle, 0]}>
            <boxGeometry args={[0.012, 0.02, 0.015]} />
            <meshPhysicalMaterial {...capMaterialProps} />
          </mesh>
        );
      })}

      {/* 3. BOTTLE CAP (Spins, lifts, maps logo and changes finishes) */}
      <group ref={capRef} position={[0, 0, 0]}>
        {/* Cap Top Face */}
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[1.0, 1.0, 0.05, 48]} />
          <meshPhysicalMaterial {...capMaterialProps} />
        </mesh>

        {/* Cap Main Skirt - Height increased to 0.55 to cover threads */}
        <mesh position={[0, -0.05, 0]}>
          <cylinderGeometry args={[0.98, 0.98, 0.55, 48, 1, true]} />
          <meshPhysicalMaterial {...capMaterialProps} side={THREE.DoubleSide} />
        </mesh>

        {/* Inner ceiling to block line of sight inside */}
        <mesh position={[0, 0.21, 0]}>
          <cylinderGeometry args={[0.97, 0.97, 0.02, 32]} />
          <meshStandardMaterial color="#334155" roughness={0.5} />
        </mesh>

        {/* Outer Vertical Grip Ribs */}
        {ribs.map((rib, i) => (
          <mesh key={i} position={[rib.x, -0.05, rib.z]} rotation={[0, -rib.angle, 0]}>
            <boxGeometry args={[0.015, 0.55, 0.022]} />
            <meshPhysicalMaterial {...capMaterialProps} />
          </mesh>
        ))}

        {/* Broken Bridge Bits on the Cap base */}
        {Array.from({ length: 8 }).map((_, idx) => {
          const angle = (idx / 8) * Math.PI * 2 + 0.1;
          const x = Math.cos(angle) * 0.96;
          const z = Math.sin(angle) * 0.96;
          return (
            <mesh key={idx} position={[x, -0.185, z]} rotation={[0, -angle, 0]}>
              <boxGeometry args={[0.012, 0.015, 0.015]} />
              <meshPhysicalMaterial {...capMaterialProps} />
            </mesh>
          );
        })}

        {/* BRAND LOGO OVERLAY DECAL */}
        {logoTexture && (
          <mesh position={[0, 0.276, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.62, 32]} />
            <meshBasicMaterial
              map={logoTexture}
              transparent
              depthWrite={false}
              polygonOffset
              polygonOffsetFactor={-4}
            />
          </mesh>
        )}
      </group>
    </group>
  );
}

// 3. MAIN COMPONENT WITH OVERLAY UI AND DYNAMIC CONTROLS
export default function Hero3DCanvas() {
  const [capColor, setCapColor] = useState('#1097D5');
  const [materialType, setMaterialType] = useState('glossy');
  const [lightingPreset, setLightingPreset] = useState('studio');
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [isAnimated, setIsAnimated] = useState(true);
  const [customColor, setCustomColor] = useState('#1097D5');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [uploadedLogoName, setUploadedLogoName] = useState<string | null>(null);
  const [isConfiguratorOpen, setIsConfiguratorOpen] = useState(false);

  // Predefined color swatches
  const swatches = [
    { name: 'Primary Blue', value: '#1097D5' },
    { name: 'Emerald Green', value: '#10B981' },
    { name: 'Metallic Gold', value: '#D4AF37' },
    { name: 'Matte Black', value: '#111827' },
    { name: 'Slate Gray', value: '#475569' },
    { name: 'Neutral White', value: '#F8FAFC' },
  ];

  // Handle custom file upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogoUrl(url);
      setUploadedLogoName(file.name);
    }
  };

  // Toggle sample brand logo
  const handleToggleSampleLogo = () => {
    if (logoUrl === '/images/logo_transparent.png') {
      setLogoUrl(null);
      setUploadedLogoName(null);
    } else {
      setLogoUrl('/images/logo_transparent.png');
      setUploadedLogoName('SV Brand Logo');
    }
  };

  // Trigger browser text file spec downloader
  const handleDownloadSpec = () => {
    const specText = `SV CLOSURES - PRODUCT SPECIFICATION REPORT
===================================================
Generated on: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
Product Series: Custom Closure Configurator V1.0

SPECIFICATION DETAILS:
---------------------
Base Cap Color: ${capColor}
Material Selection: ${
      materialType === 'glossy' ? 'High-Gloss Recyclable Plastic' :
      materialType === 'matte-eco' ? 'Eco-Recycled Matte Finish' :
      materialType === 'metal' ? 'Anodized / Brushed Aluminum' :
      'Metallic Gold/Silver Finish'
    }
Physical Properties:
  * Roughness Factor: ${
      materialType === 'matte-eco' ? '0.75' :
      materialType === 'metal' ? '0.38' :
      materialType === 'gold-silver' ? '0.12' : '0.14'
    }
  * Metalness Ratio: ${
      materialType === 'matte-eco' ? '0.00' :
      materialType === 'metal' ? '0.85' :
      materialType === 'gold-silver' ? '0.95' : '0.05'
    }
  * Clearcoat Seal: ${
      materialType === 'matte-eco' ? '0.00' :
      materialType === 'metal' ? '0.15' :
      materialType === 'gold-silver' ? '0.80' : '0.90'
    }

BRANDING DESIGN OVERLAY:
-----------------------
Printed Logo: ${logoUrl ? `Enabled (${uploadedLogoName || 'SV Brand Logo'})` : 'Disabled (Plain Cap)'}

VIRTUAL RENDERING ENVIRONMENT:
------------------------------
Lighting Rig Preset: ${
      lightingPreset === 'studio' ? 'Daylight Studio (Neutral White)' :
      lightingPreset === 'luxury' ? 'Dark Luxury Studio (Cinematic High-Contrast)' :
      'Natural Sunlight (Warm Sky Fill)'
    }

MANUFACTURING GUIDELINES:
-------------------------
- Compatible with Standard Thread Profiles (28mm, 33mm, 38mm, 45mm, 57mm).
- Raw polymers conform to FDA requirements (Title 21 CFR) for contact safety.
- Excellent chemical resistance (suitable for lubricants, agrochemicals, liquids).
- Incorporates tamper-evident break-away bridges.

===================================================
SV Closures Global Engineering Operations
Contact sales@svclosures.com for commercial runs.`;

    const blob = new Blob([specText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SV_Closure_Config_${capColor.replace('#', '')}_${materialType}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const currentConfig: CapConfig = useMemo(() => ({
    color: capColor,
    materialType,
    logoUrl,
    isAnimated,
  }), [capColor, materialType, logoUrl, isAnimated]);

  return (
    <div className="w-full h-full min-h-[450px] lg:min-h-[580px] relative rounded-3xl bg-slate-900/5 dark:bg-slate-950/20 border border-slate-200/50 dark:border-slate-800/60 shadow-lg flex flex-col">
      
      {/* 3D WebGL Web Canvas */}
      <div className="flex-grow w-full relative rounded-3xl overflow-hidden">
        <Canvas
          camera={{ position: [0, 0, 3.8], fov: 41 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent', width: '100%', height: '100%' }}
        >
          <ConfiguratorLights preset={lightingPreset} />
          
          <AnimatedBottleCap config={currentConfig} />
          
          <OrbitControls 
            enableZoom={true} 
            enablePan={false} 
            minDistance={2.5} 
            maxDistance={6.0} 
            maxPolarAngle={Math.PI / 1.7} 
          />
        </Canvas>

        {/* Small Ambient Glow Accent / Trigger Button */}
        {!isConfiguratorOpen && (
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
            <motion.button 
              onClick={() => setIsConfiguratorOpen(true)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 px-4 py-2 bg-primary-blue hover:bg-primary-blue/90 text-white rounded-full font-bold text-xs shadow-md shadow-primary-blue/20 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-wide">3D Customizer</span>
            </motion.button>
          </div>
        )}
      </div>

      {/* FLOATING GLASSMORPHISM MODAL SIDEBAR PANEL (Positioned to the left of the container to keep cap visible) */}
      <AnimatePresence>
        {isConfiguratorOpen && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: 'spring', stiffness: 280, damping: 25 }}
            className="absolute z-20 bg-white/95 dark:bg-slate-950/90 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/80 p-6 rounded-2xl shadow-2xl flex flex-col justify-between overflow-y-auto inset-x-4 bottom-4 max-h-[75vh] lg:inset-y-0 lg:-left-[400px] lg:w-[380px] lg:max-h-none lg:right-auto lg:top-0 lg:bottom-0"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 dark:border-slate-800/60">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-primary-blue animate-pulse" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide">3D Configurator</span>
              </div>
              <motion.button
                onClick={() => setIsConfiguratorOpen(false)}
                whileHover={{ rotate: 90, scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Close Customizer"
              >
                <X className="w-4.5 h-4.5" />
              </motion.button>
            </div>

            {/* Modal Body / Config Options */}
            <div className="flex-grow py-4 space-y-6 overflow-y-auto pr-1">
              
              {/* Simulation Mode Selector */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/40">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Animation Status</span>
                <motion.button
                  onClick={() => setIsAnimated(!isAnimated)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                    isAnimated
                      ? 'bg-primary-blue/10 text-primary-blue hover:bg-primary-blue/20'
                      : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 animate-pulse'
                  }`}
                >
                  {isAnimated ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  {isAnimated ? 'ACTIVE SPIN' : 'PAUSED (INSPECT)'}
                </motion.button>
              </div>

              {/* COLOR SWATCH SECTION */}
              <div className="space-y-3">
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  <Paintbrush className="w-3.5 h-3.5 text-primary-blue" />
                  Cap Color
                </label>
                <div className="flex flex-wrap gap-2.5 items-center">
                  {swatches.map((swatch) => (
                    <motion.button
                      key={swatch.value}
                      onClick={() => {
                        setCapColor(swatch.value);
                        setCustomColor(swatch.value);
                      }}
                      whileHover={{ scale: 1.2, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-7 h-7 rounded-full border-2 transition-all relative cursor-pointer ${
                        capColor === swatch.value 
                          ? 'border-primary-blue dark:border-primary-green scale-105 shadow-md shadow-primary-blue/30' 
                          : 'border-transparent hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                      style={{ backgroundColor: swatch.value }}
                      title={swatch.name}
                    >
                      {capColor === swatch.value && (
                        <Check className={`w-3.5 h-3.5 absolute inset-0 m-auto ${
                          swatch.value === '#F8FAFC' ? 'text-slate-900' : 'text-white'
                        }`} />
                      )}
                    </motion.button>
                  ))}
                  
                  {/* HTML COLOR PICKER / CUSTOM HEX */}
                  <div className="relative">
                    <motion.button
                      onClick={() => setShowColorPicker(!showColorPicker)}
                      whileHover={{ scale: 1.2, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-7 h-7 rounded-full border-2 cursor-pointer flex items-center justify-center bg-gradient-to-tr from-rose-400 via-amber-400 to-sky-400 ${
                        showColorPicker ? 'border-primary-blue' : 'border-transparent'
                      }`}
                      title="Custom Hex Picker"
                    >
                      <span className="text-[8px] text-white font-bold font-sans">HEX</span>
                    </motion.button>
                    
                    {showColorPicker && (
                      <div className="absolute bottom-8 left-0 z-40 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2.5 rounded-xl shadow-xl space-y-1.5 flex flex-col">
                        <input
                          type="color"
                          value={customColor}
                          onChange={(e) => {
                            setCustomColor(e.target.value);
                            setCapColor(e.target.value);
                          }}
                          className="w-full h-8 cursor-pointer rounded border border-slate-200 dark:border-slate-800"
                        />
                        <input
                          type="text"
                          value={customColor}
                          onChange={(e) => {
                            setCustomColor(e.target.value);
                            if (e.target.value.match(/^#[0-9A-F]{6}$/i)) {
                              setCapColor(e.target.value);
                            }
                          }}
                          placeholder="#1097D5"
                          className="w-20 px-1.5 py-0.5 text-center text-xs font-semibold rounded bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 uppercase text-slate-800 dark:text-slate-200"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* MATERIAL FINISH SECTION */}
              <div className="space-y-3">
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  <Layers className="w-3.5 h-3.5 text-primary-blue" />
                  Material Finish
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'glossy', name: 'High-Gloss' },
                    { id: 'matte-eco', name: 'Recycled Matte' },
                    { id: 'metal', name: 'Alum / Metal' },
                    { id: 'gold-silver', name: 'Gold/Silver' },
                  ].map((mat) => (
                    <motion.button
                      key={mat.id}
                      onClick={() => setMaterialType(mat.id)}
                      whileHover={{ scale: 1.04, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className={`px-3 py-2 rounded-xl text-[10px] font-bold text-center border transition-all cursor-pointer truncate ${
                        materialType === mat.id
                          ? 'bg-primary-blue/10 text-primary-blue border-primary-blue dark:bg-primary-green/10 dark:text-primary-green dark:border-primary-green shadow-sm'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200/85 dark:bg-slate-900/50 dark:hover:bg-slate-800 dark:text-slate-400 dark:border-slate-800'
                      }`}
                    >
                      {mat.name}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* BRANDING LOGO INTERACTION */}
              <div className="space-y-3">
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  <Upload className="w-3.5 h-3.5 text-primary-blue" />
                  Branding & Logo
                </label>
                <div className="flex gap-2">
                  <motion.button
                    onClick={handleToggleSampleLogo}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`flex-grow px-3 py-2 rounded-xl text-[9px] font-bold border transition-all cursor-pointer flex items-center justify-center gap-1 ${
                      logoUrl === '/images/logo_transparent.png'
                        ? 'bg-primary-blue/10 text-primary-blue border-primary-blue dark:bg-primary-green/10 dark:text-primary-green dark:border-primary-green'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200/85 dark:bg-slate-900/50 dark:hover:bg-slate-800 dark:text-slate-400 dark:border-slate-800'
                    }`}
                  >
                    {logoUrl === '/images/logo_transparent.png' ? 'Remove Logo' : 'SV Brand Logo'}
                  </motion.button>
                  
                  <motion.label 
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center w-9 h-8.5 rounded-xl border border-dashed border-slate-300 hover:border-primary-blue dark:border-slate-700 dark:hover:border-primary-green bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer relative" 
                    title="Upload Custom PNG/JPG Logo"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <Upload className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                  </motion.label>
                </div>
                {uploadedLogoName && logoUrl !== '/images/logo_transparent.png' && (
                  <p className="text-[9px] text-slate-500 truncate" title={uploadedLogoName}>
                    Logo: {uploadedLogoName}
                  </p>
                )}
              </div>

              {/* LIGHTING & EXPORT PRESET */}
              <div className="space-y-3">
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  <Sun className="w-3.5 h-3.5 text-primary-blue" />
                  Studio Lighting
                </label>
                <div className="flex gap-1.5">
                  {[
                    { id: 'studio', label: 'Studio' },
                    { id: 'luxury', label: 'Luxury' },
                    { id: 'sunlight', label: 'Sunny' },
                  ].map((preset) => (
                    <motion.button
                      key={preset.id}
                      onClick={() => setLightingPreset(preset.id)}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className={`flex-grow py-2 rounded-xl text-[9px] font-bold border text-center transition-all cursor-pointer ${
                        lightingPreset === preset.id
                          ? 'bg-primary-blue/10 text-primary-blue border-primary-blue dark:bg-primary-green/10 dark:text-primary-green dark:border-primary-green'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200/85 dark:bg-slate-900/50 dark:hover:bg-slate-800 dark:text-slate-400 dark:border-slate-800'
                      }`}
                    >
                      {preset.label}
                    </motion.button>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/60 flex flex-col gap-2.5">
              <motion.button
                onClick={handleDownloadSpec}
                whileHover={{ scale: 1.03, y: -1, boxShadow: '0 4px 12px rgba(16,151,213,0.15)' }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-1.5 py-3 bg-gradient-to-r from-primary-blue to-primary-green text-white font-bold text-[11px] rounded-full shadow cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Download Spec Sheet
              </motion.button>
              <div className="flex items-center gap-1 justify-center text-[9px] text-slate-400">
                <Info className="w-3 h-3 text-primary-blue" />
                Drag to rotate • Scroll to zoom
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
