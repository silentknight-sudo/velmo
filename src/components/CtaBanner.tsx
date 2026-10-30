import React from 'react';
import { ArrowUpRight, PhoneCall, FileText } from 'lucide-react';

interface CtaBannerProps {
  onOpenQuote: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenQuote }) => {
  return (
    <section className="bg-[#1B3B33] text-[#F7F5EF] py-24 sm:py-28 relative overflow-hidden border-t border-[#B8923D]/30">
      {/* Background Architectural Watermark / Grid Lines */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #B8923D 1px, transparent 1px), linear-gradient(to bottom, #B8923D 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-[#E6D2A8] border-b border-[#B8923D]/40 pb-2">
          <span className="w-1.5 h-1.5 bg-[#B8923D] rounded-full" />
          <span>Consultation & Direct Engineering Support</span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-serif font-light tracking-tight text-[#F7F5EF] leading-tight max-w-3xl mx-auto text-balance">
          Ready to elevate <br />
          <span className="italic font-normal text-[#E6D2A8]">your building?</span>
        </h2>

        <p className="text-sm sm:text-base text-[#F7F5EF]/80 font-sans max-w-2xl mx-auto leading-relaxed">
          Connect directly with our senior elevator engineers. We provide complimentary shaft feasibility reviews, 3D BIM/CAD elevator drawings, and transparent turn-key proposals.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={onOpenQuote}
            className="group px-8 py-4 bg-[#B8923D] text-[#111111] font-semibold text-xs uppercase tracking-widest hover:bg-[#c9a34d] transition-all flex items-center gap-2.5 cursor-pointer shadow-xl shadow-[#B8923D]/20"
          >
            <span>Request Engineering Consultation</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          <a
            href="tel:8882167309"
            className="px-7 py-4 bg-transparent border border-[#F7F5EF]/30 text-[#F7F5EF] font-semibold text-xs uppercase tracking-widest hover:border-[#B8923D] hover:text-[#B8923D] transition-colors flex items-center gap-2"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#B8923D]" />
            <span className="font-mono text-xs tracking-normal">8882167309</span>
          </a>
        </div>

        <div className="pt-8 border-t border-[#F7F5EF]/10 flex flex-wrap items-center justify-center gap-8 text-xs text-[#F7F5EF]/60">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8923D]" />
            <span>24-Hour Shaft CAD Turnaround</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8923D]" />
            <span>EN 81 European Standardized Compliance</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8923D]" />
            <span>Lifetime Telemetry & Service Contracts</span>
          </span>
        </div>
      </div>
    </section>
  );
};
