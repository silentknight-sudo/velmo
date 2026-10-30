import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Menu, X, ArrowUpRight, PhoneCall } from 'lucide-react';

interface NavbarProps {
  onOpenQuote: (productType?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuote }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Typologies', href: '#hero' },
    { label: 'Why Velmo', href: '#why-velmo' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Process', href: '#process' },
    // { label: 'Configurator', href: '#configurator' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          isScrolled
            ? 'bg-[#F7F5EF]/95 backdrop-blur-md py-3.5 border-b border-[#B8923D]/20 shadow-xs'
            : 'bg-[#F7F5EF]/90 backdrop-blur-sm py-4.5 sm:py-5 border-b border-[#1B3B33]/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Zone 1: Brand Wordmark with line-art pulley */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group inline-flex items-center transition-opacity hover:opacity-90"
            aria-label="VELMO Elevators Home"
          >
            <Logo
              variant="dark"
              size={isScrolled ? 'sm' : 'md'}
            />
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-xs tracking-wider uppercase font-medium transition-all duration-200 relative py-1 group text-[#1B3B33] hover:text-[#B8923D]"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#B8923D] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Zone 3: Actions */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="tel:8882167309"
              className="hidden xl:inline-flex items-center gap-2 text-xs font-medium tracking-normal transition-colors text-[#1B3B33]/80 hover:text-[#1B3B33]"
              aria-label="Direct Phone Line: 8882167309"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#B8923D]" />
              <span className="font-mono text-xs">8882167309</span>
            </a>

            <button
              onClick={() => onOpenQuote()}
              className="relative overflow-hidden group min-h-[44px] px-5 py-2.5 rounded-none text-xs font-semibold tracking-wider uppercase transition-all duration-300 border bg-[#1B3B33] text-[#F7F5EF] border-[#1B3B33] hover:bg-[#B8923D] hover:border-[#B8923D] hover:text-[#111111] cursor-pointer shadow-xs inline-flex items-center justify-center"
            >
              <span className="relative z-10 flex items-center gap-1.5 whitespace-nowrap">
                <span>Request Quote</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </button>
          </div>

          {/* Mobile hamburger trigger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => onOpenQuote()}
              className="min-h-[44px] px-3.5 py-2 text-xs font-semibold tracking-wider uppercase bg-[#B8923D] text-[#111111] flex items-center justify-center cursor-pointer shadow-xs"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 transition-colors cursor-pointer text-[#1B3B33] hover:text-[#B8923D]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#122621]/95 backdrop-blur-xl flex flex-col pt-24 pb-8 px-6 transition-all duration-300 lg:hidden">
          <div className="flex flex-col gap-5 my-auto">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-2xl font-serif text-[#F7F5EF] hover:text-[#B8923D] transition-colors py-1.5 border-b border-[#F7F5EF]/10"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-auto space-y-4 pt-6 border-t border-[#B8923D]/20">
            <div className="flex items-center justify-between text-xs text-[#F7F5EF]/70">
              <span>Architect Hotline:</span>
              <a href="tel:8882167309" className="text-[#B8923D] font-mono">8882167309</a>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full py-3.5 bg-[#B8923D] text-[#111111] text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2"
            >
              <span>Get Free Technical Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
