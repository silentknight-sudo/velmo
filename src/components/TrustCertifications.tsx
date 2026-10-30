import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Cpu, 
  Compass, 
  CheckCircle2, 
  FileText, 
  Sparkles,
  Lock,
  Zap,
  Clock
} from 'lucide-react';

interface TrustCertificationsProps {
  onOpenQuote: (context?: string) => void;
}

interface StandardItem {
  code: string;
  agency: string;
  headline: string;
  detail: string;
  verifiedMetric: string;
}

const STANDARDS: StandardItem[] = [
  {
    code: 'EN 81-20 / EN 81-50',
    agency: 'TÜV Rheinland Certified',
    headline: 'European Direct Safety Code',
    detail: 'Complete bi-directional progressive safety clamping, optical beam curtain arrays, and structural seismic dampeners audited to Europe’s most demanding vertical safety directive.',
    verifiedMetric: '100% Certified Safety Baseline'
  },
  {
    code: 'VDI 4707 CLASS A+',
    agency: 'Energy Efficiency Direct',
    headline: 'Highest Environmental Rating',
    detail: 'Direct-drive permanent magnet gearless motors with regenerative drives returning deceleration energy back into the building power grid. Ultra-low standby draw (<15W).',
    verifiedMetric: '40–45% Energy Recaptured'
  },
  {
    code: 'DIN EN ISO 9001 / 14001',
    agency: 'Swiss Precision Standard',
    headline: 'Swiss Quality & Horology Tolerances',
    detail: 'Manufactured and assembled under stringent ISO quality controls. Shaft rail alignment laser-calibrated down to ±0.01 mm for absolute vibration-free vertical flight.',
    verifiedMetric: '<10 mg Lateral Vibration'
  },
  {
    code: 'OPEN-SYSTEM GUARANTEE',
    agency: '100% Non-Proprietary',
    headline: 'Zero Locked Diagnostic Codes',
    detail: 'Unlike legacy elevator conglomerates that lock customers into exorbitant multi-decade service contracts with proprietary diagnostic tools, VELMO uses 100% open-architecture hardware.',
    verifiedMetric: 'Zero Vendor Monopolies'
  }
];

export const TrustCertifications: React.FC<TrustCertificationsProps> = ({ onOpenQuote }) => {
  return (
    <section className="py-20 sm:py-28 bg-[#122621] text-[#F7F5EF] relative overflow-hidden border-t border-[#B8923D]/30">
      {/* Background Accent Grid */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #B8923D 1px, transparent 1px), linear-gradient(to bottom, #B8923D 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2.5 mb-2.5">
            <span className="text-xs font-sans tracking-[0.25em] uppercase text-[#B8923D] font-bold">
              TRUST, SAFETY & COMPLIANCE
            </span>
            <span className="w-10 h-[1px] bg-[#B8923D]/40" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#F7F5EF] font-light leading-tight">
            Safety You Never Have to Question. <br />
            <span className="italic font-normal text-[#E6D2A8]">Open Architecture You Truly Own.</span>
          </h2>

          <p className="mt-4 text-xs sm:text-sm text-[#F7F5EF]/80 font-sans max-w-2xl leading-relaxed">
            Elevators carry the lives of your family, colleagues, and guests. Every VELMO system exceeds European vertical safety codes, backed by guaranteed open diagnostics and non-proprietary replacement parts.
          </p>
        </div>

        {/* 4 Trust Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STANDARDS.map((std, idx) => (
            <div 
              key={std.code}
              className="bg-[#1B3B33]/80 border border-[#B8923D]/30 p-6 rounded-xl flex flex-col justify-between hover:border-[#B8923D] transition-colors shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-[#B8923D]/20">
                  <span className="text-xs font-mono font-bold text-[#E6D2A8] tracking-wider">
                    {std.code}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#B8923D]" />
                </div>

                <div className="text-xs font-mono text-[#B8923D] uppercase tracking-wider">
                  {std.agency}
                </div>

                <h3 className="font-serif text-lg text-white font-medium leading-snug">
                  {std.headline}
                </h3>

                <p className="text-xs text-[#F7F5EF]/75 font-sans leading-relaxed pt-1">
                  {std.detail}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#B8923D]/20 flex items-center justify-between text-xs font-mono">
                <span className="text-[#B8923D] font-semibold">{std.verifiedMetric}</span>
                <CheckCircle2 className="w-4 h-4 text-[#B8923D]" />
              </div>
            </div>
          ))}
        </div>

        {/* Triple Pillar Guarantee Strip */}
        <div className="mt-12 p-6 sm:p-8 bg-[#1B3B33] border border-[#B8923D]/40 rounded-xl grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#B8923D]/20 border border-[#B8923D]/40 flex items-center justify-center shrink-0 text-[#E6D2A8]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-semibold text-white">Lifetime Freedom Guarantee</h4>
              <p className="text-xs text-[#F7F5EF]/70 mt-1">
                Zero locked toolkits or proprietary diagnostic locks. Any qualified elevator engineer can inspect and service your equipment.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#B8923D]/20 border border-[#B8923D]/40 flex items-center justify-center shrink-0 text-[#E6D2A8]">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-semibold text-white">10-Year Structural Warranty</h4>
              <p className="text-xs text-[#F7F5EF]/70 mt-1">
                Shaft structural framework, guide rail systems, and direct PMSM drive units are warranted for 10 years of continuous duty.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#B8923D]/20 border border-[#B8923D]/40 flex items-center justify-center shrink-0 text-[#E6D2A8]">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-semibold text-white">Sub-30 Minute Telemetry SLA</h4>
              <p className="text-xs text-[#F7F5EF]/70 mt-1">
                Sensors detect anomalies before they cause a stoppage. Our 24/7 central engineering monitoring responds instantaneously.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
