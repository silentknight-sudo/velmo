import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sliders, CheckCircle2, Download, Layers, Sparkles } from 'lucide-react';

interface ConfiguratorProps {
  onOpenQuoteWithConfig: (configSummary: string) => void;
}

export const Configurator: React.FC<ConfiguratorProps> = ({ onOpenQuoteWithConfig }) => {
  const [buildingType, setBuildingType] = useState<'villa' | 'commercial' | 'residential' | 'hotel' | 'medical'>('villa');
  const [floors, setFloors] = useState<number>(4);
  const [capacity, setCapacity] = useState<number>(6);
  const [finish, setFinish] = useState<'champagne' | 'brass' | 'glass' | 'oak'>('brass');

  // Calculated engineering specifications
  const getSpecs = () => {
    switch (buildingType) {
      case 'villa':
        return {
          model: 'VELMO Villa Reserve (Home MRL)',
          drive: 'Compact Gearless PMSM / 230V Single Phase',
          shaftWidth: 1450 + (capacity - 4) * 80,
          shaftDepth: 1400 + (capacity - 4) * 70,
          pitDepth: 200,
          overhead: 2700,
          power: '2.2 kW (Residential Domestic)',
          cabinDims: `${900 + (capacity - 4) * 50} × ${1050 + (capacity - 4) * 50} mm`
        };
      case 'commercial':
        return {
          model: 'VELMO Ascend Commercial Prime',
          drive: 'Regenerative High-Torque Gearless PMSM',
          shaftWidth: 1950 + (capacity - 6) * 60,
          shaftDepth: 2100 + (capacity - 6) * 60,
          pitDepth: 1400,
          overhead: 4200,
          power: '11.0 kW (Regenerative Grid Feedback)',
          cabinDims: `${1350 + (capacity - 6) * 40} × ${1600 + (capacity - 6) * 40} mm`
        };
      case 'hotel':
        return {
          model: 'VELMO Lumina Glass Atrium Edition',
          drive: 'Ultra-Smooth Synchronous Gearless MRL',
          shaftWidth: 2100 + (capacity - 6) * 70,
          shaftDepth: 2200 + (capacity - 6) * 70,
          pitDepth: 1500,
          overhead: 4400,
          power: '9.5 kW',
          cabinDims: `${1400 + (capacity - 6) * 50} × ${1650 + (capacity - 6) * 50} mm`
        };
      case 'medical':
        return {
          model: 'VELMO Cura Stretcher Bed Elevator',
          drive: 'S-Curve Jerk-Free Medical Grade Traction',
          shaftWidth: 2300,
          shaftDepth: 2900,
          pitDepth: 1500,
          overhead: 4300,
          power: '13.0 kW',
          cabinDims: '1500 × 2400 mm (Bed & Stretcher rated)'
        };
      case 'residential':
      default:
        return {
          model: 'VELMO Metro Residential Elite',
          drive: 'Gearless Compact Machine-Room-Less',
          shaftWidth: 1750 + (capacity - 6) * 50,
          shaftDepth: 1850 + (capacity - 6) * 50,
          pitDepth: 1200,
          overhead: 3800,
          power: '5.5 kW',
          cabinDims: `${1100 + (capacity - 6) * 40} × ${1400 + (capacity - 6) * 40} mm`
        };
    }
  };

  const specs = getSpecs();

  const handleConsultation = () => {
    const summary = `Configured: ${specs.model} | Floors: ${floors} | Capacity: ${capacity} Persons | Finish: ${finish.toUpperCase()} | Estimated Shaft: ${specs.shaftWidth} x ${specs.shaftDepth}mm`;
    onOpenQuoteWithConfig(summary);
  };

  return (
    <section id="configurator" className="py-24 sm:py-32 bg-[#122621] text-[#F7F5EF] relative z-20 overflow-hidden shadow-2xl">
      {/* Background Architectural Canvas */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #B8923D 1px, transparent 1px), linear-gradient(to bottom, #B8923D 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-[#B8923D]">
            <span className="w-1.5 h-1.5 bg-[#B8923D] rounded-full" />
            <span>Interactive Engineering Tool</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#F7F5EF] font-light leading-tight">
            Shaft Dimension & <br />
            <span className="italic font-normal text-[#E6D2A8]">Spec Estimator.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#F7F5EF]/75 font-sans leading-relaxed">
            Configure your project parameters below to compute preliminary shaft footprints, pit depths, and drive propulsion requirements in real time.
          </p>
        </div>

        {/* Two-Column Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Controls */}
          <div className="lg:col-span-7 bg-[#1B3B33]/80 border border-[#B8923D]/30 p-6 sm:p-8 space-y-7 shadow-xl">
            {/* Control 1: Building Archetype */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase tracking-wider text-[#E6D2A8] block">
                01. Building Archetype
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'villa', label: 'Private Villa / Bungalow' },
                  { id: 'commercial', label: 'Commercial Office Tower' },
                  { id: 'residential', label: 'Multi-Family Residential' },
                  { id: 'hotel', label: '5-Star Hotel / Atrium' },
                  { id: 'medical', label: 'Hospital / Healthcare' },
                ].map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setBuildingType(b.id as any)}
                    className={`p-3 text-xs text-left border transition-all cursor-pointer ${
                      buildingType === b.id
                        ? 'border-[#B8923D] bg-[#122621] text-white font-medium shadow-xs'
                        : 'border-neutral-700 bg-[#122621]/40 text-neutral-300 hover:border-neutral-500'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 2: Number of Stops / Floors */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <label className="font-mono uppercase tracking-wider text-[#E6D2A8]">
                  02. Vertical Stops / Floors
                </label>
                <span className="font-mono text-base font-bold text-[#B8923D] tabular-nums">
                  {floors} Floors (G + {floors - 1})
                </span>
              </div>
              <input
                id="floors-slider"
                type="range"
                min={2}
                max={32}
                value={floors}
                aria-label="Number of vertical floors"
                aria-valuemin={2}
                aria-valuemax={32}
                aria-valuenow={floors}
                aria-valuetext={`${floors} Floors (Ground plus ${floors - 1})`}
                onChange={(e) => setFloors(parseInt(e.target.value, 10))}
                className="w-full accent-[#B8923D] cursor-pointer"
              />
              <div className="flex justify-between text-xs font-mono text-neutral-300">
                <span>2 Stops (Low-Rise)</span>
                <span>16 Stops</span>
                <span>32 Stops (High-Rise)</span>
              </div>
            </div>

            {/* Control 3: Passenger Capacity */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <label className="font-mono uppercase tracking-wider text-[#E6D2A8]">
                  03. Passenger Capacity
                </label>
                <span className="font-mono text-base font-bold text-[#B8923D] tabular-nums">
                  {capacity} Persons ({capacity * 68} kg)
                </span>
              </div>
              <div 
                className="flex items-center gap-2" 
                role="radiogroup" 
                aria-label="Passenger Capacity options"
              >
                {[4, 6, 8, 10, 13, 16, 21].map((num) => (
                  <button
                    key={num}
                    role="radio"
                    aria-checked={capacity === num}
                    aria-label={`${num} Persons (${num * 68} kilograms)`}
                    onClick={() => setCapacity(num)}
                    className={`flex-1 py-2 text-xs font-mono border transition-all cursor-pointer ${
                      capacity === num
                        ? 'border-[#B8923D] bg-[#B8923D] text-[#111111] font-bold shadow-sm'
                        : 'border-neutral-700 bg-[#122621]/40 text-neutral-300 hover:border-neutral-400 hover:text-white'
                    }`}
                  >
                    {num}P
                  </button>
                ))}
              </div>
            </div>

            {/* Control 4: Architectural Finish */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase tracking-wider text-[#E6D2A8] block">
                04. Interior Architectural Finish
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { id: 'brass', name: 'Brushed Brass PVD' },
                  { id: 'champagne', name: 'Champagne Titanium' },
                  { id: 'glass', name: 'Panoramic Low-Iron Glass' },
                  { id: 'oak', name: 'Smoked Oak & Mirror' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFinish(f.id as any)}
                    className={`p-2.5 text-center border transition-all cursor-pointer ${
                      finish === f.id
                        ? 'border-[#B8923D] bg-[#122621] text-[#E6D2A8] font-semibold'
                        : 'border-neutral-700 bg-[#122621]/40 text-neutral-400 hover:border-neutral-500'
                    }`}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Computed Engineering Output */}
          <div className="lg:col-span-5 bg-[#0D1C18] border border-[#B8923D]/50 p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="border-b border-[#B8923D]/30 pb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#B8923D] font-bold">
                Computed Engineering Output
              </span>
              <h3 className="text-2xl font-serif text-[#F7F5EF] mt-1">
                {specs.model}
              </h3>
              <p className="text-xs text-neutral-400 mt-1 font-mono">
                {specs.drive}
              </p>
            </div>

            {/* Spatial Matrix */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-neutral-800">
                <span className="text-neutral-400">Clear Shaft Dimensions (W × D):</span>
                <span className="font-mono text-[#F7F5EF] font-semibold">
                  {specs.shaftWidth} mm × {specs.shaftDepth} mm
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-neutral-800">
                <span className="text-neutral-400">Cabin Floor Size:</span>
                <span className="font-mono text-[#F7F5EF]">{specs.cabinDims}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-neutral-800">
                <span className="text-neutral-400">Minimum Pit Depth:</span>
                <span className="font-mono text-[#E6D2A8] font-bold">{specs.pitDepth} mm</span>
              </div>
              <div className="flex justify-between py-2 border-b border-neutral-800">
                <span className="text-neutral-400">Overhead Clear Headroom:</span>
                <span className="font-mono text-[#F7F5EF]">{specs.overhead} mm</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-neutral-400">Power Rating:</span>
                <span className="font-mono text-[#F7F5EF]">{specs.power}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 space-y-3">
              <button
                onClick={handleConsultation}
                className="w-full py-3.5 bg-[#B8923D] text-[#111111] text-xs uppercase tracking-widest font-semibold hover:bg-[#c9a34d] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Request Custom 3D CAD Blueprint</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <p className="text-xs text-center text-neutral-400 leading-snug">
                Includes complimentary site survey and structural shaft load calculations for your structural engineer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
