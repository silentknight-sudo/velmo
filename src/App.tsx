import React, { useState } from 'react';
import { Preloader } from './components/Preloader';
import { SmoothScroll } from './components/SmoothScroll';
import { Navbar } from './components/Navbar';
import { LeadHeroSection } from './components/LeadHeroSection';
import { Hero } from './components/Hero';
import { WhyVelmo } from './components/WhyVelmo';
import { Comparison } from './components/Comparison';
import { ProcessTimeline } from './components/ProcessTimeline';
import { Configurator } from './components/Configurator';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { QuoteModal } from './components/QuoteModal';
import { UsabilityScan } from './components/UsabilityScan';
import { ElevatorProduct } from './types';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<ElevatorProduct | null>(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteProductType, setQuoteProductType] = useState<string>('');
  const [quoteNotes, setQuoteNotes] = useState<string>('');

  const handleOpenQuote = (productType?: string, initialNotes?: string) => {
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

      // Focus full name input
      const nameInput = document.getElementById('lead-form-name') as HTMLInputElement | null;
      if (nameInput) {
        setTimeout(() => {
          nameInput.focus();
        }, 400);
      }

      // If product/typology specified, select matching building type
      if (productType) {
        const selectElem = document.getElementById('lead-form-building-type') as HTMLSelectElement | null;
        if (selectElem) {
          const lower = productType.toLowerCase();
          const match = Array.from(selectElem.options).find(opt => 
            lower.includes(opt.value.toLowerCase()) || opt.value.toLowerCase().includes(lower)
          );
          if (match) {
            selectElem.value = match.value;
            selectElem.dispatchEvent(new Event('change', { bubbles: true }));
          }
        }
      }
    } else {
      setQuoteProductType(productType || '');
      setQuoteNotes(initialNotes || '');
      setIsQuoteOpen(true);
    }
  };

  const handleSelectProduct = (product: ElevatorProduct) => {
    setSelectedProduct(product);
  };

  const handleRequestQuoteForProduct = (product: ElevatorProduct) => {
    handleOpenQuote(product.title, `Inquiring for ${product.title} (${product.category} Series). Requesting CAD drawings and shaft clearances.`);
  };

  const handleOpenQuoteWithConfig = (configSummary: string) => {
    handleOpenQuote('', configSummary);
  };

  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#111111] font-sans antialiased selection:bg-[#B8923D]/25 selection:text-[#1B3B33] flex flex-col">
      {/* Luxury Architectural Elevator Preloader */}
      <Preloader />

      {/* Silky smooth Lenis scrolling engine */}
      <SmoothScroll />

      {/* Sticky Navigation */}
      <Navbar onOpenQuote={() => handleOpenQuote()} />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* 1. Lead Generation Top Hero Section - Static & Above The Fold for Paid Ads */}
        <LeadHeroSection />

        {/* 2. Interactive Building Typology Gallery (8 Panels) */}
        <Hero
          onSelectProduct={handleSelectProduct}
          onRequestQuote={(productTitle) => handleOpenQuote(productTitle)}
        />

        {/* 3. Why Velmo - 4 Engineering Pillars */}
        <WhyVelmo onOpenQuote={() => handleOpenQuote()} />

        {/* 4. Why Choose VELMO */}
        <Comparison 
          onOpenQuote={(context) => handleOpenQuote(context || 'Why Choose VELMO')} 
        />

        {/* 5. How We Work - 5-Stage Static Architectural Experience */}
        <ProcessTimeline onOpenQuote={(context) => handleOpenQuote(context || 'Process Timeline')} />

        {/* Interactive Engineering Tool (Shaft Configurator & Dimension Estimator) - Commented out for later use */}
        {/* <Configurator onOpenQuoteWithConfig={handleOpenQuoteWithConfig} /> */}

        {/* 6. Full-Width CTA Banner */}
        <CtaBanner onOpenQuote={() => handleOpenQuote()} />
      </main>

      {/* 8. Footer */}
      <Footer onOpenQuote={() => handleOpenQuote()} />

      {/* Technical Specification Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onRequestQuoteForProduct={handleRequestQuoteForProduct}
      />

      {/* Consultation & Quote Request Dialog */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        initialProductType={quoteProductType}
        initialNotes={quoteNotes}
      />

      {/* Usability & Consistency Inspector (Dev Mode: enabled via ?audit=1 or Ctrl+Shift+U) */}
      <UsabilityScan />
    </div>
  );
}
