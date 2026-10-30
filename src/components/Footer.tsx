import React from 'react';
import { Logo } from './Logo';
import { MapPin, Phone, Mail, Clock, ArrowUp, ShieldCheck, Award } from 'lucide-react';

interface FooterProps {
  onOpenQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQuote }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#0D1C18] text-[#F7F5EF] pt-20 pb-12 border-t border-[#B8923D]/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#F7F5EF]/10">
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-4 space-y-6">
            <div className="inline-block">
              <Logo variant="light" size="md" />
            </div>
            <p className="text-xs text-[#F7F5EF]/70 leading-relaxed font-sans max-w-sm">
              VELMO ELEVATORS engineers bespoke architectural passenger, villa, and panoramic capsule elevators. Driven by whisper-quiet gearless PMSM propulsion and uncompromising European safety standards.
            </p>
            
            {/* Engineering Standard Badges */}
            <div className="pt-2 flex items-center gap-4 text-xs text-[#B8923D] font-mono">
              <div className="flex items-center gap-1.5 border border-[#B8923D]/30 px-2.5 py-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>EN 81-20 / EN 81-50</span>
              </div>
              <div className="flex items-center gap-1.5 border border-[#B8923D]/30 px-2.5 py-1">
                <Award className="w-3.5 h-3.5" />
                <span>ISO 9001:2015</span>
              </div>
            </div>
          </div>

          {/* Col 2: Company & Process */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-mono text-[#E6D2A8] font-semibold">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F7F5EF]/75 font-sans">
              <li><a href="#why-velmo" className="hover:text-[#B8923D] transition-colors">Why Velmo</a></li>
              <li><a href="#why-us" className="hover:text-[#B8923D] transition-colors">Why Choose Us</a></li>
              <li><a href="#process" className="hover:text-[#B8923D] transition-colors">Engineering Process</a></li>
              {/* <li><a href="#configurator" className="hover:text-[#B8923D] transition-colors">Shaft Estimator</a></li> */}
              <li>
                <button
                  onClick={onOpenQuote}
                  className="text-[#B8923D] hover:underline cursor-pointer"
                >
                  Request Turnkey Quote
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Facilities */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-mono text-[#E6D2A8] font-semibold">
              Engineering Facilities
            </h4>
            <div className="space-y-3 text-xs text-[#F7F5EF]/75">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B8923D] shrink-0 mt-0.5" />
                <span>
                  VELMO Towers, 480 Grand Promenade, Innovation Corridor, New York & London Design Studio
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B8923D] shrink-0" />
                <a href="tel:8882167309" className="font-mono hover:text-[#B8923D] transition-colors">8882167309</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B8923D] shrink-0" />
                <a href="mailto:info@velmoelevators.com" className="hover:text-[#B8923D] transition-colors">info@velmoelevators.com</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#B8923D] shrink-0" />
                <span>24/7 Rapid Emergency Dispatch Hotline</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Legal & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F7F5EF]/60">
          <div>
            © {new Date().getFullYear()} VELMO ELEVATORS INC. All Rights Reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="p-2 border border-[#B8923D]/40 text-[#B8923D] hover:bg-[#B8923D] hover:text-[#111111] transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
