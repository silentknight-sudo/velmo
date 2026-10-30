import React from 'react';
import { motion } from 'motion/react';
import { 
  Award, 
  Compass, 
  FileCheck2, 
  ShieldCheck, 
  Clock, 
  Wrench, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface ComparisonProps {
  onOpenQuote: (context?: string) => void;
  isScanActive?: boolean;
  scanCategory?: string;
}

interface ValueCard {
  id: string;
  icon: React.ReactNode;
  title: string;
  isSpecialHeading?: boolean;
  numberHighlight?: string;
  restOfTitle?: string;
  line: string;
}

const CARDS: ValueCard[] = [
  {
    id: 'experience',
    icon: <Award className="w-5 h-5 text-[#B8923D]" />,
    title: '25+ Years of Experience',
    isSpecialHeading: true,
    numberHighlight: '25+',
    restOfTitle: 'Years of Experience',
    line: 'Decades of proven work across every type of building.',
  },
  {
    id: 'requirements',
    icon: <Compass className="w-5 h-5 text-[#B8923D]" />,
    title: 'We Understand Your Requirements',
    line: 'Every lift is planned around your space, needs and vision.',
  },
  {
    id: 'pricing',
    icon: <FileCheck2 className="w-5 h-5 text-[#B8923D]" />,
    title: 'Budget-Friendly Pricing',
    line: 'Transparent quotes with no hidden costs.',
  },
  {
    id: 'safety',
    icon: <ShieldCheck className="w-5 h-5 text-[#B8923D]" />,
    title: 'Safety First',
    line: 'Compliant with IS 17900 and EN 81-20.',
  },
  {
    id: 'service',
    icon: <Clock className="w-5 h-5 text-[#B8923D]" />,
    title: '24/7 Service & Support',
    line: 'Round-the-clock help whenever you need us.',
  },
  {
    id: 'installation',
    icon: <Wrench className="w-5 h-5 text-[#B8923D]" />,
    title: 'On-Time Installation',
    line: 'Highly trained technicians. Every step quality-checked.',
  },
];

export const Comparison: React.FC<ComparisonProps> = ({ onOpenQuote }) => {
  const handleScrollToQuote = () => {
    onOpenQuote('Why Choose VELMO Section');
    const formElement = document.getElementById('lead-quote-form');
    if (formElement) {
      const navOffset = 70;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = formElement.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = Math.max(0, elementPosition - navOffset);

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      const nameInput = document.getElementById('lead-form-name') as HTMLInputElement | null;
      if (nameInput) {
        setTimeout(() => {
          nameInput.focus();
        }, 400);
      }
    }
  };

  return (
    <section
      id="why-us"
      className="py-24 sm:py-32 bg-[#F7F5EF] text-[#1B3B33] relative overflow-hidden border-b border-[#B8923D]/25"
    >
      {/* Anchor alias to ensure old links gracefully route to this section */}
      <div id="comparison" className="absolute top-0 pointer-events-none" />

      {/* Subtle architectural background texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(#1B3B33 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 relative z-10">
        
        {/* ========================================================
            1. HEADER
            ======================================================== */}
        <div className="max-w-4xl mb-16 sm:mb-20">
          {/* Eyebrow: small gold mono label */}
          <div className="flex items-center gap-2.5 mb-3.5">
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#B8923D] font-bold">
              WHY CHOOSE VELMO
            </span>
            <span className="w-10 h-[1px] bg-[#B8923D]/50" />
          </div>

          {/* Heading: serif, two lines, second line gold italic */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light text-[#1B3B33] leading-[1.0] tracking-tight">
            Why Choose
            <span className="block italic font-normal text-[#B8923D] mt-2 sm:mt-3">
              VELMO.
            </span>
          </h2>

          {/* One short subline, max 12 words */}
          <p className="mt-6 text-base sm:text-lg text-[#1B3B33]/85 font-sans font-light leading-relaxed max-w-xl">
            Trusted experience. Honest pricing. Uncompromising safety.
          </p>
        </div>

        {/* ========================================================
            2. CARD GRID (6 Cards: 3 col desktop, 2 tablet, 1 mobile)
            ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          {CARDS.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.5,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative flex flex-col justify-between h-full bg-white/85 hover:bg-white border border-[#B8923D]/30 hover:border-[#B8923D] p-7 sm:p-8 rounded-xl shadow-xs hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
            >
              {/* Subtle top gold accent line on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-[#B8923D] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left pointer-events-none" />

              <div className="space-y-4">
                {/* Small gold icon inside subtle round/square bezel */}
                <div className="w-10 h-10 rounded-lg bg-[#1B3B33]/5 border border-[#B8923D]/40 flex items-center justify-center shrink-0 group-hover:bg-[#1B3B33] group-hover:border-[#B8923D] transition-colors duration-300">
                  {card.icon}
                </div>

                {/* Title */}
                {card.isSpecialHeading ? (
                  <div className="space-y-1">
                    <span className="font-serif text-3xl sm:text-4xl text-[#B8923D] font-light leading-none block">
                      {card.numberHighlight}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1B3B33] leading-snug">
                      {card.restOfTitle}
                    </h3>
                  </div>
                ) : (
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1B3B33] leading-snug">
                    {card.title}
                  </h3>
                )}

                {/* ONE short line, max 12 words */}
                <p className="text-[15px] text-[#1B3B33]/80 font-sans font-normal leading-relaxed pt-1">
                  {card.line}
                </p>
              </div>

              {/* Minimal bottom visual anchor */}
              <div className="pt-6 mt-auto flex items-center gap-2 text-xs font-mono text-[#B8923D]/70 group-hover:text-[#B8923D] transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8923D]" />
                <span className="uppercase tracking-widest text-xs font-medium">VELMO ASSURANCE</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ========================================================
            3. BOTTOM STRIP (DARK FOREST GREEN CTA BAND)
            ======================================================== */}
        <div className="mt-14 sm:mt-16 bg-[#122621] border border-[#B8923D]/40 rounded-xl p-8 sm:p-10 text-[#F7F5EF] shadow-xl relative overflow-hidden">
          {/* Subtle decorative gold glow */}
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#B8923D]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#F7F5EF]">
                Planning a lift for your building?
              </h3>
              <p className="text-xs sm:text-sm text-[#F7F5EF]/80 font-sans">
                Get a free quote within 24 hours.
              </p>
            </div>

            <button
              type="button"
              onClick={handleScrollToQuote}
              className="self-start sm:self-auto px-6 py-3.5 bg-[#B8923D] hover:bg-[#cba44e] text-[#111111] text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md inline-flex items-center gap-2 group active:scale-[0.98] shrink-0"
            >
              <span>Get Free Quote →</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
