import React from 'react';

interface ElevatorIllustrationProps {
  type: 'passenger' | 'home' | 'capsule' | 'goods' | 'hospital' | 'escalator' | 'movingwalk' | 'dumbwaiter';
  className?: string;
}

export const ElevatorIllustration: React.FC<ElevatorIllustrationProps> = ({ type, className = '' }) => {
  return (
    <div className={`relative w-full h-full min-h-[240px] bg-[#122621] flex items-center justify-center overflow-hidden ${className}`}>
      {/* Background Subtle Architectural Blueprint Grid */}
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `radial-gradient(#B8923D 0.75px, transparent 0.75px)`,
          backgroundSize: '16px 16px'
        }}
      />

      {/* Dynamic SVG Visuals based on product type */}
      {type === 'capsule' && (
        <svg viewBox="0 0 400 300" fill="none" className="w-full h-full p-6 max-h-[280px]">
          {/* Shaft Cables & Pulley */}
          <line x1="200" y1="10" x2="200" y2="60" stroke="#B8923D" strokeWidth="1.5" />
          <circle cx="200" cy="50" r="16" stroke="#B8923D" strokeWidth="1.5" />
          <line x1="184" y1="50" x2="184" y2="85" stroke="#B8923D" strokeWidth="1.2" />
          <line x1="216" y1="50" x2="216" y2="85" stroke="#B8923D" strokeWidth="1.2" />

          {/* Capsule Roof Dome */}
          <path d="M 130 90 C 130 50, 270 50, 270 90 Z" fill="#1B3B33" stroke="#B8923D" strokeWidth="1.5" />
          {/* Curved Glass Front Body */}
          <path d="M 130 90 L 130 220 C 130 260, 270 260, 270 220 L 270 90 Z" fill="#1B3B33" fillOpacity="0.4" stroke="#B8923D" strokeWidth="1.5" />
          {/* Panoramic Curved Inner Glass Ribs */}
          <path d="M 145 95 C 145 130, 145 190, 145 220" stroke="#E6D2A8" strokeWidth="0.8" opacity="0.6" />
          <path d="M 255 95 C 255 130, 255 190, 255 220" stroke="#E6D2A8" strokeWidth="0.8" opacity="0.6" />
          <path d="M 200 90 L 200 230" stroke="#E6D2A8" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.5" />

          {/* Glass Specular Reflection Highlight */}
          <path d="M 160 100 L 175 210" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />

          {/* Interior Floor & Brass Handrail */}
          <ellipse cx="200" cy="220" rx="60" ry="14" fill="#B8923D" fillOpacity="0.3" stroke="#B8923D" strokeWidth="1.5" />
          <path d="M 150 160 Q 200 175 250 160" stroke="#B8923D" strokeWidth="2" strokeLinecap="round" />
          
          {/* Interior Warm Ceiling Halo */}
          <ellipse cx="200" cy="95" rx="50" ry="10" stroke="#E6D2A8" strokeWidth="1.5" fill="#E6D2A8" fillOpacity="0.25" />

          {/* Lower Aerodynamic Under-Cone */}
          <path d="M 140 225 L 200 280 L 260 225 Z" fill="#1B3B33" stroke="#B8923D" strokeWidth="1.5" />
          <circle cx="200" cy="280" r="3" fill="#B8923D" />
        </svg>
      )}

      {type === 'home' && (
        <svg viewBox="0 0 400 300" fill="none" className="w-full h-full p-6 max-h-[280px]">
          {/* Structural Villa Portal Frame */}
          <rect x="100" y="30" width="200" height="240" rx="4" stroke="#B8923D" strokeWidth="1.5" fill="#1B3B33" fillOpacity="0.5" />
          
          {/* Walnut / Champagne Panel Divisions */}
          <rect x="110" y="40" width="85" height="220" fill="#122621" stroke="#B8923D" strokeWidth="0.8" opacity="0.9" />
          <rect x="205" y="40" width="85" height="220" fill="#122621" stroke="#B8923D" strokeWidth="0.8" opacity="0.9" />

          {/* Warm Ambient Cove Lighting (Vertical) */}
          <line x1="114" y1="45" x2="114" y2="255" stroke="#E6D2A8" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          <line x1="286" y1="45" x2="286" y2="255" stroke="#E6D2A8" strokeWidth="2" strokeLinecap="round" opacity="0.7" />

          {/* Horizontal Fluted Slat Details */}
          {[60, 90, 120, 150, 180, 210, 240].map((y) => (
            <line key={y} x1="120" y1={y} x2="185" y2={y} stroke="#B8923D" strokeWidth="0.6" opacity="0.4" />
          ))}

          {/* Sleek Frameless Glass Door Line */}
          <line x1="200" y1="30" x2="200" y2="270" stroke="#B8923D" strokeWidth="1.5" />

          {/* Designer Vertical Brass Handle */}
          <rect x="194" y="110" width="3" height="60" rx="1.5" fill="#B8923D" />
          <circle cx="195.5" cy="115" r="1.5" fill="#111" />
          <circle cx="195.5" cy="165" r="1.5" fill="#111" />

          {/* Integrated Touch Operating Panel */}
          <rect x="260" y="115" width="16" height="50" rx="2" fill="#1B3B33" stroke="#B8923D" strokeWidth="1" />
          <circle cx="268" cy="125" r="2.5" fill="#E6D2A8" />
          <circle cx="268" cy="135" r="2" fill="#B8923D" opacity="0.7" />
          <circle cx="268" cy="145" r="2" fill="#B8923D" opacity="0.7" />
          <circle cx="268" cy="155" r="2" fill="#B8923D" opacity="0.7" />

          {/* Ceiling Diffuser */}
          <rect x="130" y="34" width="140" height="4" fill="#E6D2A8" opacity="0.8" />
        </svg>
      )}

      {type === 'passenger' && (
        <svg viewBox="0 0 400 300" fill="none" className="w-full h-full p-6 max-h-[280px]">
          {/* High-Rise Commercial Shaft & Portal */}
          <rect x="80" y="25" width="240" height="250" stroke="#B8923D" strokeWidth="1.5" fill="#1B3B33" fillOpacity="0.6" />
          
          {/* Mirrored Stainless Wall Sections */}
          <polygon points="80,25 130,55 130,245 80,275" fill="#162e28" stroke="#B8923D" strokeWidth="0.8" />
          <polygon points="320,25 270,55 270,245 320,275" fill="#162e28" stroke="#B8923D" strokeWidth="0.8" />
          <rect x="130" y="55" width="140" height="190" fill="#122621" stroke="#B8923D" strokeWidth="0.8" />

          {/* Starlight Architectural Illuminated Ceiling */}
          <polygon points="80,25 320,25 270,55 130,55" fill="#1B3B33" stroke="#B8923D" strokeWidth="1" />
          <line x1="140" y1="40" x2="260" y2="40" stroke="#E6D2A8" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
          <circle cx="160" cy="40" r="1.5" fill="#FFF" />
          <circle cx="200" cy="40" r="1.5" fill="#FFF" />
          <circle cx="240" cy="40" r="1.5" fill="#FFF" />

          {/* Backlit Full-Height Indicator Column */}
          <rect x="250" y="70" width="12" height="160" rx="1" fill="#1B3B33" stroke="#B8923D" strokeWidth="0.8" />
          <rect x="252" y="75" width="8" height="12" rx="0.5" fill="#B8923D" fillOpacity="0.4" />
          <text x="254" y="84" fill="#E6D2A8" fontSize="8" fontFamily="monospace" fontWeight="bold">24</text>
          
          {/* Brass Ergonomic Handrail */}
          <line x1="95" y1="170" x2="130" y2="160" stroke="#B8923D" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="130" y1="160" x2="270" y2="160" stroke="#B8923D" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="270" y1="160" x2="305" y2="170" stroke="#B8923D" strokeWidth="2.5" strokeLinecap="round" />

          {/* Floor Recessed Inlay Lines */}
          <polygon points="80,275 320,275 270,245 130,245" fill="#122621" stroke="#B8923D" strokeWidth="1" />
          <line x1="140" y1="260" x2="260" y2="260" stroke="#B8923D" strokeWidth="0.8" opacity="0.6" />
        </svg>
      )}

      {type === 'goods' && (
        <svg viewBox="0 0 400 300" fill="none" className="w-full h-full p-6 max-h-[280px]">
          {/* Heavy Steel Industrial Cage */}
          <rect x="80" y="30" width="240" height="240" stroke="#B8923D" strokeWidth="2" fill="#122621" />
          
          {/* Heavy Structural Steel Columns */}
          <line x1="100" y1="30" x2="100" y2="270" stroke="#B8923D" strokeWidth="2" />
          <line x1="300" y1="30" x2="300" y2="270" stroke="#B8923D" strokeWidth="2" />
          <line x1="80" y1="150" x2="320" y2="150" stroke="#B8923D" strokeWidth="1.5" opacity="0.6" />

          {/* Industrial Cross Bracing */}
          <line x1="100" y1="30" x2="300" y2="150" stroke="#B8923D" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.35" />
          <line x1="300" y1="30" x2="100" y2="150" stroke="#B8923D" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.35" />
          <line x1="100" y1="150" x2="300" y2="270" stroke="#B8923D" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.35" />
          <line x1="300" y1="150" x2="100" y2="270" stroke="#B8923D" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.35" />

          {/* Heavy Duty Rubber Shock Bumper Rails */}
          <rect x="90" y="210" width="220" height="14" rx="2" fill="#1B3B33" stroke="#B8923D" strokeWidth="1.5" />
          <line x1="100" y1="217" x2="300" y2="217" stroke="#E6D2A8" strokeWidth="1" strokeDasharray="6 3" />

          {/* Diamond Floor Plate Lines */}
          <line x1="80" y1="260" x2="320" y2="260" stroke="#B8923D" strokeWidth="2" />
          <text x="135" y="250" fill="#B8923D" fontSize="10" fontFamily="monospace" letterSpacing="2">CAPACITY: 5000 KG</text>
        </svg>
      )}

      {type === 'hospital' && (
        <svg viewBox="0 0 400 300" fill="none" className="w-full h-full p-6 max-h-[280px]">
          {/* Extended Stretcher Cabin Depth */}
          <rect x="70" y="35" width="260" height="230" rx="4" stroke="#B8923D" strokeWidth="1.5" fill="#162e28" />
          
          {/* Smooth Jerk-Free Center Opening Medical Doors */}
          <rect x="85" y="45" width="110" height="210" fill="#122621" stroke="#B8923D" strokeWidth="1" />
          <rect x="205" y="45" width="110" height="210" fill="#122621" stroke="#B8923D" strokeWidth="1" />

          {/* Priority Medical Cross Emblem */}
          <circle cx="200" cy="110" r="22" fill="#1B3B33" stroke="#B8923D" strokeWidth="1.5" />
          <rect x="196" y="96" width="8" height="28" fill="#B8923D" rx="1" />
          <rect x="186" y="106" width="28" height="8" fill="#B8923D" rx="1" />

          {/* Low-Level Bed Impact Buffer Rail */}
          <rect x="75" y="195" width="250" height="12" rx="2" fill="#1B3B33" stroke="#B8923D" strokeWidth="1.2" />

          {/* Optical Door Sensor Curtain Indicator Beams */}
          <line x1="195" y1="45" x2="195" y2="255" stroke="#E6D2A8" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
          <line x1="205" y1="45" x2="205" y2="255" stroke="#E6D2A8" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />

          {/* Shadowless Indirect Cleanroom Lighting */}
          <line x1="100" y1="42" x2="300" y2="42" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.75" />
        </svg>
      )}

      {type === 'escalator' && (
        <svg viewBox="0 0 400 300" fill="none" className="w-full h-full p-6 max-h-[280px]">
          {/* Truss Structural Diagonal Profile */}
          <path d="M 60 220 L 130 220 L 270 80 L 340 80 L 330 110 L 255 110 L 115 250 L 50 250 Z" fill="#162e28" stroke="#B8923D" strokeWidth="1.5" />
          
          {/* Sleek Balustrade Glass Panel */}
          <polygon points="120,205 265,65 295,65 150,205" fill="#1B3B33" fillOpacity="0.4" stroke="#B8923D" strokeWidth="1" />

          {/* Architectural Continuous Handrail */}
          <path d="M 75 195 L 125 195 L 265 55 L 320 55" stroke="#B8923D" strokeWidth="4" strokeLinecap="round" />
          {/* Illuminated Under-Handrail Glow Line */}
          <path d="M 85 200 L 125 200 L 265 60 L 310 60" stroke="#E6D2A8" strokeWidth="1.5" opacity="0.8" />

          {/* Cascading Step Teeth */}
          {[
            [130, 200], [150, 180], [170, 160], [190, 140], [210, 120], [230, 100], [250, 80]
          ].map(([x, y], i) => (
            <g key={i}>
              <rect x={x} y={y} width="18" height="6" fill="#122621" stroke="#B8923D" strokeWidth="0.8" />
              <line x1={x + 1} y1={y + 3} x2={x + 17} y2={y + 3} stroke="#E6D2A8" strokeWidth="0.6" opacity="0.7" />
            </g>
          ))}

          {/* Precision Comb Plate Details */}
          <rect x="110" y="215" width="22" height="6" fill="#B8923D" />
          <rect x="270" y="75" width="22" height="6" fill="#B8923D" />
        </svg>
      )}

      {type === 'movingwalk' && (
        <svg viewBox="0 0 400 300" fill="none" className="w-full h-full p-6 max-h-[280px]">
          {/* Horizontal Walkway Frame */}
          <rect x="50" y="140" width="300" height="70" rx="3" fill="#162e28" stroke="#B8923D" strokeWidth="1.5" />
          
          {/* Continuous Glass Balustrades */}
          <polygon points="70,140 330,140 320,80 80,80" fill="#1B3B33" fillOpacity="0.4" stroke="#B8923D" strokeWidth="1" />

          {/* Smooth Continuous Handrail */}
          <line x1="75" y1="75" x2="325" y2="75" stroke="#B8923D" strokeWidth="4" strokeLinecap="round" />
          <line x1="85" y1="80" x2="315" y2="80" stroke="#E6D2A8" strokeWidth="1.5" opacity="0.8" />

          {/* Grooved Pallet Tread Array */}
          {Array.from({ length: 14 }).map((_, i) => (
            <line
              key={i}
              x1={80 + i * 18}
              y1="145"
              x2={80 + i * 18}
              y2="175"
              stroke="#B8923D"
              strokeWidth="1.2"
              opacity="0.85"
            />
          ))}

          {/* Transit Flow Arrows */}
          <path d="M 170 160 L 195 160 M 187 154 L 195 160 L 187 166" stroke="#E6D2A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 215 160 L 240 160 M 232 154 L 240 160 L 232 166" stroke="#E6D2A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}

      {type === 'dumbwaiter' && (
        <svg viewBox="0 0 400 300" fill="none" className="w-full h-full p-6 max-h-[280px]">
          {/* Counter-Level Compact Stainless Frame */}
          <rect x="110" y="40" width="180" height="220" rx="4" stroke="#B8923D" strokeWidth="1.5" fill="#162e28" />
          
          {/* Bi-Parting Door Shutter */}
          <rect x="125" y="55" width="150" height="90" fill="#122621" stroke="#B8923D" strokeWidth="1" />
          <rect x="125" y="150" width="150" height="90" fill="#122621" stroke="#B8923D" strokeWidth="1" />

          {/* Stainless Steel Shelving Inside Cabin */}
          <line x1="130" y1="100" x2="270" y2="100" stroke="#E6D2A8" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.6" />
          <line x1="130" y1="195" x2="270" y2="195" stroke="#E6D2A8" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.6" />

          {/* Interlock Handles */}
          <rect x="185" y="140" width="30" height="4" rx="1" fill="#B8923D" />
          <rect x="185" y="152" width="30" height="4" rx="1" fill="#B8923D" />

          {/* Call Station / Floor Indicator */}
          <circle cx="282" cy="70" r="3" fill="#E6D2A8" />
          <circle cx="282" cy="80" r="2.5" fill="#B8923D" opacity="0.7" />
          <circle cx="282" cy="90" r="2.5" fill="#B8923D" opacity="0.7" />
          
          {/* Food-Grade Heated Cabin Indicator */}
          <path d="M 180 85 Q 185 75 190 85 Q 195 95 200 85" stroke="#B8923D" strokeWidth="1" fill="none" opacity="0.5" />
          <path d="M 195 85 Q 200 75 205 85 Q 210 95 215 85" stroke="#B8923D" strokeWidth="1" fill="none" opacity="0.5" />
        </svg>
      )}

      {/* Elegant Hairline Corner Accents */}
      <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[#B8923D]/60 pointer-events-none" />
      <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[#B8923D]/60 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#B8923D]/60 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[#B8923D]/60 pointer-events-none" />
    </div>
  );
};
