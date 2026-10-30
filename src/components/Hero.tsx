import React, { useState, useEffect, useRef } from 'react';
import { ELEVATOR_PRODUCTS } from '../data/elevators';
import { ElevatorProduct } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ArchitecturalImage } from './ArchitecturalImage';

export interface TypologyItem {
  id: string;
  index: string;
  title: string;
  tagline: string;
  bullets: string[];
  image: string;
  productId: string;
}

export const HERO_TYPOLOGIES: TypologyItem[] = [
  {
    id: 'residential',
    index: '01',
    title: 'Residential',
    tagline: 'Whisper-quiet home lifts',
    bullets: ['3–6 persons', '200 mm shallow pit'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    productId: 'home-elevator',
  },
  {
    id: 'commercial',
    index: '02',
    title: 'Commercial',
    tagline: 'High-throughput passenger towers',
    bullets: ['10–33 persons', 'Gearless PMSM traction'],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
    productId: 'passenger-lift',
  },
  {
    id: 'healthcare',
    index: '03',
    title: 'Healthcare',
    tagline: 'Medical-grade hospital lifts',
    bullets: ['Stretcher bed rated', 'Millimeter bed leveling'],
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=85',
    productId: 'hospital-lift',
  },
  {
    id: 'hospitality',
    index: '04',
    title: 'Hospitality',
    tagline: 'Ultra-quiet hotel transit',
    bullets: ['8–21 persons', 'Sub-32 dB whisper'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=85',
    productId: 'capsule-lift',
  },
  {
    id: 'industrial',
    index: '05',
    title: 'Industrial',
    tagline: 'Heavy-duty cargo hoistways',
    bullets: ['Up to 10,000 kg', 'Forklift class C'],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=85',
    productId: 'goods-lift',
  },
  {
    id: 'retail',
    index: '06',
    title: 'Retail',
    tagline: 'Panoramic glass lifts',
    bullets: ['13–26 persons', 'Trolley compliant'],
    image: 'https://images.unsplash.com/photo-1567449303078-57ad995bd301?auto=format&fit=crop&w=1600&q=85',
    productId: 'escalator',
  },
  {
    id: 'corporate-offices',
    index: '07',
    title: 'Corporate Offices',
    tagline: 'Intelligent destination dispatch',
    bullets: ['15–26 persons', 'Regenerative PMSM drive'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
    productId: 'passenger-lift',
  },
  {
    id: 'educational-institutions',
    index: '08',
    title: 'Educational Institutions',
    tagline: 'High-durability campus circulation',
    bullets: ['High student capacity', 'Vandal-resistant steel'],
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=85',
    productId: 'moving-walk',
  },
];

interface HeroProps {
  onSelectProduct?: (product: ElevatorProduct) => void;
  onRequestQuote?: (productTitle?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectProduct, onRequestQuote }) => {
  // On page load, auto-expand the FIRST panel (Residential) by default
  const [activePanelIndex, setActivePanelIndex] = useState<number>(0);
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleMotionChange);
    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  // Automatically advance to the next typology slide every 5 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActivePanelIndex((prev) => {
        const nextIndex = (prev + 1) % HERO_TYPOLOGIES.length;

        // Synchronize mobile carousel scroll
        if (carouselRef.current) {
          const clientWidth = carouselRef.current.clientWidth;
          if (clientWidth > 0) {
            carouselRef.current.scrollTo({
              left: nextIndex * clientWidth,
              behavior: 'smooth',
            });
            setCarouselIndex(nextIndex);
          }
        }

        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Update carousel active index on scroll
  const handleCarouselScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, clientWidth } = carouselRef.current;
    if (clientWidth > 0) {
      const newIndex = Math.round(scrollLeft / clientWidth);
      if (newIndex >= 0 && newIndex < HERO_TYPOLOGIES.length) {
        setCarouselIndex(newIndex);
        setActivePanelIndex(newIndex);
      }
    }
  };

  const scrollToCarouselItem = (index: number) => {
    if (!carouselRef.current) return;
    const targetLeft = index * carouselRef.current.clientWidth;
    carouselRef.current.scrollTo({
      left: targetLeft,
      behavior: 'smooth',
    });
    setCarouselIndex(index);
    setActivePanelIndex(index);
  };

  const handleSelectSector = (sector: TypologyItem) => {
    if (onSelectProduct) {
      const matched = ELEVATOR_PRODUCTS.find((p) => p.id === sector.productId) || ELEVATOR_PRODUCTS[0];
      onSelectProduct(matched);
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full bg-[#F7F5EF] text-[#111111] flex flex-col justify-between overflow-hidden select-none pb-4"
    >
      {/* Anchor aliases for navigation compatibility */}
      <div id="typologies" className="absolute top-0" />
      <div id="products" className="absolute top-0" />

      {/* 
        Typology Section Header Bar
      */}
      <div className="flex-none pt-8 sm:pt-10 pb-5 px-6 sm:px-10 lg:px-16 z-20 w-full max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#B8923D] font-bold">
                PORTFOLIO TYPOLOGIES
              </span>
              <span className="w-8 h-[1px] bg-[#B8923D]/50" />
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#1B3B33] font-light tracking-tight">
              Architectural Lift Typologies
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs text-[#B8923D] font-mono pb-1">
            {/* Interactive 8-Slide Progression Indicators */}
            <div className="flex items-center gap-1.5" title="Click slide or let it auto-advance every 5 seconds">
              {HERO_TYPOLOGIES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActivePanelIndex(i);
                    scrollToCarouselItem(i);
                  }}
                  aria-label={`Go to typology slide ${i + 1}`}
                  className={`h-1.5 transition-all duration-500 rounded-full cursor-pointer ${
                    activePanelIndex === i
                      ? 'w-6 bg-[#B8923D]'
                      : 'w-1.5 bg-[#B8923D]/30 hover:bg-[#B8923D]/70'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8923D] animate-pulse" />
              <span className="text-xs tracking-widest uppercase font-semibold">
                0{activePanelIndex + 1} / 0{HERO_TYPOLOGIES.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 
        DESKTOP VIEW (lg+): 8 Horizontal Edge-to-Edge Panels (Auto-advances every 5s)
      */}
      <div 
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="hidden lg:flex w-full h-[540px] xl:h-[580px] bg-[#122621] flex-row overflow-hidden relative border-y border-[#B8923D]/30"
      >
        {HERO_TYPOLOGIES.map((sector, index) => {
          const isExpanded = activePanelIndex === index;

          return (
            <div
              key={sector.id}
              onMouseEnter={() => setActivePanelIndex(index)}
              onClick={() => handleSelectSector(sector)}
              style={{
                flex: prefersReducedMotion
                  ? isExpanded
                    ? '4 1 0%'
                    : '0.65 1 0%'
                  : isExpanded
                  ? '4.5 1 0%'
                  : '0.65 1 0%',
                transition: prefersReducedMotion
                  ? 'none'
                  : 'flex 560ms cubic-bezier(0.25, 1, 0.35, 1)',
              }}
              className="relative h-full overflow-hidden cursor-pointer group border-r border-[#B8923D]/25 last:border-r-0"
            >
              {/* Authentic Building Type Photograph with Architectural Placeholder */}
              <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#122621]">
                <ArchitecturalImage
                  src={sector.image}
                  alt={`${sector.title} Building Architecture`}
                  placeholderLabel={sector.title}
                  loading={index < 2 ? 'eager' : 'lazy'}
                  className={`w-full h-full object-cover object-center transition-transform duration-1000 ease-out filter brightness-[1.02] contrast-[1.02] ${
                    isExpanded ? 'scale-105' : 'scale-100 group-hover:scale-105'
                  }`}
                />
              </div>

              {/* Refined, low-density architectural green overlay (ensures photos remain crystal-clear) */}
              <div
                className="absolute inset-0 pointer-events-none transition-all duration-500"
                style={{
                  background: isExpanded
                    ? 'linear-gradient(90deg, rgba(14, 30, 26, 0.78) 0%, rgba(18, 38, 33, 0.42) 36%, rgba(18, 38, 33, 0.10) 70%, transparent 100%)'
                    : 'linear-gradient(180deg, rgba(18, 38, 33, 0.12) 0%, rgba(18, 38, 33, 0.52) 100%)',
                }}
              />

              {/* Top Accent Gold Border when Expanded */}
              <div
                className={`absolute top-0 left-0 right-0 h-[3px] bg-[#B8923D] transition-transform duration-500 origin-left ${
                  isExpanded ? 'scale-x-100' : 'scale-x-0'
                }`}
              />

              {/* 
                COLLAPSED PANELS:
                Show ONLY the category name rotated 90° (bottom-to-top) in white
              */}
              <div
                className={`absolute bottom-10 right-3 xl:right-4 z-20 pointer-events-none transition-opacity duration-300 flex flex-col items-center ${
                  isExpanded ? 'opacity-0' : 'opacity-90 group-hover:opacity-100'
                }`}
              >
                <span
                  className="block font-sans text-xs font-semibold tracking-[0.24em] uppercase text-white whitespace-nowrap drop-shadow-xs py-2"
                  style={{
                    writingMode: 'vertical-rl',
                    transform: 'rotate(180deg)',
                  }}
                >
                  {sector.title}
                </span>
              </div>

              {/* 
                EXPANDED PANEL CONTENT:
                Strictly minimal & airy:
                1. Small label: "01 — Typology"
                2. Title (serif, same as now)
                3. ONE tagline, max 6 words
                4. 2 short bullet points, max 4 words each, small font (13–14px), muted cream color, no sentences
                NO paragraph, NO propulsion line, NO button.
              */}
              {isExpanded && (
                <div className="absolute inset-0 p-8 xl:p-12 z-20 flex flex-col justify-end pb-12 xl:pb-14 pointer-events-auto">
                  <div className="max-w-md space-y-3 animate-fadeIn">
                    {/* Small label: "01 — Typology" */}
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs xl:text-sm tracking-widest text-[#B8923D] font-bold">
                        {sector.index} — Typology
                      </span>
                    </div>

                    {/* Title (serif) */}
                    <h2 className="font-serif text-3xl sm:text-4xl xl:text-5xl text-[#F7F5EF] font-light leading-tight">
                      {sector.title}
                    </h2>

                    {/* ONE tagline, max 6 words */}
                    <p className="font-serif italic text-base sm:text-lg text-[#B8923D] font-normal leading-snug">
                      "{sector.tagline}"
                    </p>

                    {/* 2 short bullet points, 14–15px standardized scale */}
                    <ul className="space-y-1.5 pt-1.5 text-sm sm:text-[15px] text-[#F7F5EF]/90 font-sans">
                      {sector.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-center gap-2 whitespace-nowrap">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#B8923D] flex-shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 
        TABLET & MOBILE VIEW (<lg):
        Swipeable horizontal carousel (Auto-advances every 5s)
      */}
      <div 
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        className="lg:hidden w-full h-[440px] sm:h-[480px] relative flex flex-col border-y border-[#B8923D]/30"
      >
        <div
          ref={carouselRef}
          onScroll={handleCarouselScroll}
          className="flex-1 w-full flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
        >
          {HERO_TYPOLOGIES.map((sector) => (
            <div
              key={sector.id}
              onClick={() => handleSelectSector(sector)}
              className="w-full flex-shrink-0 snap-center h-full relative overflow-hidden flex flex-col justify-end p-6 sm:p-8 pb-12 cursor-pointer"
            >
              {/* Background Photo with Architectural Placeholder & Reduced Overlay */}
              <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#122621]">
                <ArchitecturalImage
                  src={sector.image}
                  alt={`${sector.title} Building Architecture`}
                  placeholderLabel={sector.title}
                  className="w-full h-full object-cover object-center filter brightness-[1.05] contrast-[1.02] scale-105"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(18, 38, 33, 0.08) 0%, rgba(18, 38, 33, 0.35) 45%, rgba(18, 38, 33, 0.82) 100%)',
                  }}
                />
              </div>

              {/* Panel Content (Minimal & Airy) */}
              <div className="relative z-10 space-y-2.5 max-w-sm">
                {/* Small label: "01 — Typology" */}
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[#B8923D] font-bold">
                    {sector.index} — Typology
                  </span>
                </div>

                {/* Title (serif) */}
                <h2 className="font-serif text-2xl sm:text-3xl text-white font-light">
                  {sector.title}
                </h2>

                {/* ONE tagline, max 6 words */}
                <p className="font-serif italic text-sm sm:text-base text-[#B8923D]">
                  "{sector.tagline}"
                </p>

                {/* 2 short bullet points, 14–15px standardized scale */}
                <ul className="space-y-1.5 pt-1 text-sm sm:text-[15px] text-[#F7F5EF]/90 font-sans">
                  {sector.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-center gap-2 whitespace-nowrap">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B8923D] flex-shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Pagination Controls for Mobile */}
        <div className="absolute top-3 right-4 z-20 flex items-center gap-1 bg-black/50 px-2 py-1 rounded-full border border-white/15 backdrop-blur-xs">
          <button
            onClick={() => scrollToCarouselItem(Math.max(0, carouselIndex - 1))}
            disabled={carouselIndex === 0}
            className="w-8 h-8 flex items-center justify-center text-white/80 hover:text-white disabled:opacity-30 cursor-pointer"
            aria-label="Previous typology"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono text-[#B8923D] px-1 tabular-nums font-semibold">
            {carouselIndex + 1} / {HERO_TYPOLOGIES.length}
          </span>
          <button
            onClick={() => scrollToCarouselItem(Math.min(HERO_TYPOLOGIES.length - 1, carouselIndex + 1))}
            disabled={carouselIndex === HERO_TYPOLOGIES.length - 1}
            className="w-8 h-8 flex items-center justify-center text-white/80 hover:text-white disabled:opacity-30 cursor-pointer"
            aria-label="Next typology"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
