import React from 'react';
import { motion } from 'motion/react';
import { Award, Shield, Headphones, Wrench, Sparkles } from 'lucide-react';
import { ArchitecturalImage } from './ArchitecturalImage';

interface WhyVelmoProps {
  onOpenQuote: () => void;
}

interface PillarItem {
  id: string;
  number: string;
  tag: string;
  title: string;
  points: string[];
  standardsChips?: string[];
  icon: React.ReactNode;
  image: string;
}

const PILLARS: PillarItem[] = [
  {
    id: 'quality',
    number: '01',
    tag: 'QUALITY',
    title: 'Quality',
    points: [
      'Unparalleled build quality',
      'IoT-enabled monitoring',
    ],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=85',
    icon: <Award className="w-5 h-5 stroke-[1.75] text-[#B8923D]" />,
  },
  {
    id: 'safety',
    number: '02',
    tag: 'SAFETY',
    title: 'Safety',
    points: [
      'Complies with the latest standards',
    ],
    standardsChips: ['IS 17900', 'EN 81-20'],
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=85',
    icon: <Shield className="w-5 h-5 stroke-[1.75] text-[#B8923D]" />,
  },
  {
    id: 'service',
    number: '03',
    tag: 'SERVICE',
    title: 'Service',
    points: [
      '24/7 service and support',
    ],
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=85',
    icon: <Headphones className="w-5 h-5 stroke-[1.75] text-[#B8923D]" />,
  },
  {
    id: 'installation',
    number: '04',
    tag: 'INSTALLATION',
    title: 'Seamless Installation',
    points: [
      'Highly trained technicians',
      'Every step quality-checked',
    ],
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1000&q=85',
    icon: <Wrench className="w-5 h-5 stroke-[1.75] text-[#B8923D]" />,
  },
];

export const WhyVelmo: React.FC<WhyVelmoProps> = ({ onOpenQuote }) => {
  return (
    <section
      id="why-velmo"
      className="py-24 sm:py-32 lg:py-40 bg-[#F7F5EF] text-[#1B3B33] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 relative z-10">
        {/* 
          ======================================================================
          TOP EDITORIAL KICKER / EDITION MARKER (HIGH CONTRAST & STANDOUT)
          ======================================================================
        */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-[#1B3B33]/25 pb-6 mb-16 sm:mb-20 gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#1B3B33] text-[#F7F5EF] shadow-md border border-[#B8923D]/60">
              <Sparkles className="w-3 h-3 text-[#B8923D]" />
              <span className="font-sans text-xs tracking-[0.2em] font-semibold uppercase">
                ARCHITECTURAL SPECIFICATION
              </span>
              <span className="w-3 h-[1px] bg-[#B8923D]" />
              <span className="text-[#B8923D] font-sans text-xs tracking-[0.2em] font-bold">
                EDITION 2026
              </span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#1B3B33]/5 border border-[#1B3B33]/25 text-xs font-sans tracking-[0.15em] uppercase font-bold text-[#1B3B33]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1B3B33]" />
              SWISS ENGINEERING STANDARD · REF. EN 81
            </span>
          </div>
        </div>

        {/* 
          ======================================================================
          TYPOGRAPHY SCALE:
          - Main heading 'Precision Engineering' in Deep Forest Green (#1B3B33)
          - Secondary heading 'Uncompromising Quiet.' in Gold (#B8923D) italic serif
          - Shortened neutral intro line: "Built right. Installed right. Supported always."
          ======================================================================
        */}
        <div className="max-w-4xl mb-16 sm:mb-24">
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light tracking-[-0.035em] text-[#1B3B33] leading-[0.95]">
            Precision Engineering
            <span className="block italic font-normal text-[#B8923D] text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-3 sm:mt-4">
              Uncompromising Quiet.
            </span>
          </h2>

          <p className="mt-8 text-base sm:text-lg text-[#1B3B33]/90 font-sans font-normal max-w-2xl leading-relaxed">
            Built right. Installed right. Supported always.
          </p>
        </div>

        {/* 
          ======================================================================
          4-COLUMN EDITORIAL SHOWCASE:
          - Responsive: 4 columns on desktop, 2 on tablet, 1 on mobile
          - Equal height cards with identical styling, borders, and hover effects
          - Clean points list with small gold bullet markers
          ======================================================================
        */}
        <div className="relative border-2 border-[#1B3B33]/25 bg-white/70 rounded-2xl overflow-hidden shadow-lg backdrop-blur-xs">
          {/* Subtle corner crosshairs */}
          <span className="absolute top-2.5 left-2.5 text-xs font-mono text-[#B8923D] select-none z-20">+</span>
          <span className="absolute top-2.5 right-2.5 text-xs font-mono text-[#B8923D] select-none z-20">+</span>
          <span className="absolute bottom-2.5 left-2.5 text-xs font-mono text-[#B8923D] select-none z-20">+</span>
          <span className="absolute bottom-2.5 right-2.5 text-xs font-mono text-[#B8923D] select-none z-20">+</span>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative items-stretch">
            {PILLARS.map((pillar, index) => (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`group relative flex flex-col justify-between h-full transition-all duration-300 hover:bg-white cursor-pointer ${
                  index % 2 === 0 ? 'md:border-r border-[#1B3B33]/20 lg:border-r-0' : ''
                } ${
                  index < 2 ? 'border-b md:border-b-0 border-[#1B3B33]/20' : ''
                } ${
                  index === 2 ? 'border-b md:border-b-0 border-[#1B3B33]/20' : ''
                }`}
                onClick={onOpenQuote}
              >
                {/* 
                  Vertical Hairline Divider:
                  Draws in from top-to-bottom with warm metallic gold/forest green clarity
                */}
                {index < 3 && (
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{
                      duration: 0.9,
                      delay: 0.1 + index * 0.12,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="absolute right-0 top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-[#B8923D]/60 via-[#1B3B33]/25 to-[#B8923D]/60 origin-top hidden lg:block z-20"
                  />
                )}

                {/* 
                  ==============================================================
                  PILLAR IMAGE BANNER
                  Kept intact, clean without old captions, displaying the card's tag
                  ==============================================================
                */}
                <div className="relative h-48 sm:h-52 overflow-hidden border-b border-[#1B3B33]/15 bg-[#122621]">
                  <ArchitecturalImage
                    src={pillar.image}
                    alt={pillar.title}
                    placeholderLabel={`Quality Pillar: ${pillar.title}`}
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-108 filter brightness-[1.02] contrast-[1.02]"
                    loading="lazy"
                  />
                  {/* Subtle architectural gradient for high photo clarity without any text overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#112921]/70 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />
                </div>

                {/* Content Container: Equal Height, Clean Minimalist Points */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Floating Icon + Title */}
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#1B3B33]/5 border border-[#B8923D]/40 flex items-center justify-center shrink-0 group-hover:bg-[#1B3B33] group-hover:border-[#B8923D] transition-colors duration-300">
                        {pillar.icon}
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-serif font-normal tracking-tight text-[#1B3B33] leading-snug">
                          {pillar.title}
                        </h3>
                      </div>
                    </div>

                    {/* Minimal Points List with Small Gold Bullet Markers */}
                    <ul className="space-y-2 pt-1">
                      {pillar.points.map((point, pIndex) => (
                        <li key={pIndex} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#B8923D] mt-2 shrink-0" />
                          <span className="text-[15px] text-[#1B3B33] font-sans font-medium leading-relaxed">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Standard Chips / Badges for Safety Card (IS 17900 & EN 81-20) */}
                    {pillar.standardsChips && pillar.standardsChips.length > 0 && (
                      <div className="pt-1 pl-4 flex flex-wrap items-center gap-2">
                        {pillar.standardsChips.map((chip, cIndex) => (
                          <span
                            key={cIndex}
                            className="inline-flex items-center px-2.5 py-1 rounded bg-[#1B3B33]/8 border border-[#B8923D]/50 text-[#1B3B33] font-mono text-xs font-semibold tracking-wider uppercase shadow-2xs"
                          >
                            {chip}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Growing Gold Line at the bottom of the card on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#B8923D] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
