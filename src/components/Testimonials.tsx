import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TESTIMONIALS, TYPOLOGY_MARQUEE } from '../data/elevators';
import { Quote, ChevronLeft, ChevronRight, Star, CheckCircle2, MapPin } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="py-24 sm:py-32 bg-[#F7F5EF] text-[#111111] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-[#B8923D]">
            <span className="w-1.5 h-1.5 bg-[#B8923D] rounded-full" />
            <span>CLIENT REVIEWS & EXPERIENCES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif text-[#1B3B33] font-light leading-tight">
            Trusted by Homeowners &amp; Builders <br />
            <span className="italic font-normal text-[#B8923D]">across India.</span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed pt-1">
            Real feedback from private villa owners, penthouse residents, and luxury developers across Delhi NCR, Mumbai, Hyderabad, and Bengaluru.
          </p>

          {/* Aggregate Rating Pill */}
          <div className="pt-2 flex items-center justify-center gap-2 text-xs font-mono text-[#1B3B33]">
            <div className="flex items-center text-[#B8923D]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#B8923D] text-[#B8923D]" />
              ))}
            </div>
            <span className="font-bold">4.98 / 5.0</span>
            <span className="text-neutral-500">· 680+ Verified Indian Installations</span>
          </div>
        </div>

        {/* Featured Customer Review Card */}
        <div 
          aria-roledescription="carousel" 
          aria-label="Customer Reviews"
          className="max-w-4xl mx-auto bg-white border border-[#B8923D]/35 p-7 sm:p-12 shadow-xl relative"
        >
          <Quote className="w-12 h-12 text-[#B8923D]/20 absolute top-6 right-8 pointer-events-none" />

          <div className="space-y-6" aria-live="polite">
            {/* Top Review Metadata: Stars + Verified Badge */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 pb-4">
              <div className="flex items-center gap-1.5">
                {[...Array(current.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#B8923D] text-[#B8923D]" />
                ))}
                <span className="font-mono text-xs font-bold text-[#1B3B33] ml-1.5">5.0 Star Experience</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-sans font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{current.verifiedBadge || 'Verified Client'}</span>
                {current.installationYear && (
                  <span className="text-neutral-400 font-mono text-[11px]">({current.installationYear})</span>
                )}
              </div>
            </div>

            {/* Review Quote Body */}
            <p className="text-lg sm:text-2xl font-serif text-[#1B3B33] font-light italic leading-relaxed">
              &ldquo;{current.quote}&rdquo;
            </p>

            {/* Author, Location, and Project Footer */}
            <div className="pt-6 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="space-y-1">
                <h4 className="font-serif text-xl font-medium text-[#1B3B33]">
                  {current.author}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 font-sans">
                  {current.role} · <strong className="font-medium text-neutral-800">{current.organization}</strong>
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
                  <span className="inline-flex items-center gap-1 text-neutral-600 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-[#B8923D]" />
                    <span>{current.location}</span>
                  </span>
                  <span className="text-neutral-300">·</span>
                  <span className="text-[#B8923D] font-mono font-medium">
                    Specification: {current.project}
                  </span>
                </div>
              </div>

              {/* Slider Controls */}
              <div className="flex items-center gap-2 self-start sm:self-center">
                <button
                  onClick={prev}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center border border-neutral-300 hover:border-[#B8923D] hover:text-[#B8923D] transition-colors cursor-pointer"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="font-mono text-xs text-neutral-600 font-semibold px-2 tabular-nums">
                  0{currentIndex + 1} / 0{TESTIMONIALS.length}
                </span>
                <button
                  onClick={next}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center border border-neutral-300 hover:border-[#B8923D] hover:text-[#B8923D] transition-colors cursor-pointer"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Architectural Typology Strip Marquee */}
        <div className="mt-20 pt-12 border-t border-neutral-200/80">
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-[0.2em] text-neutral-600 font-medium">
              Specialized Engineering Across Building Typologies
            </span>
          </div>

          {/* Infinite Scroll Typology Strip */}
          <div className="relative w-full overflow-hidden mask-fade-edges">
            <div className="flex items-center gap-12 sm:gap-16 animate-marquee whitespace-nowrap">
              {[...TYPOLOGY_MARQUEE, ...TYPOLOGY_MARQUEE].map((typology, idx) => (
                <a
                  key={idx}
                  href="#typologies"
                  className="inline-flex items-center gap-2.5 text-neutral-700/85 hover:text-[#1B3B33] transition-colors font-serif text-lg sm:text-xl tracking-wider cursor-pointer group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8923D] group-hover:scale-125 transition-transform" />
                  <span>{typology}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
