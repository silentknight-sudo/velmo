import React, { useEffect } from 'react';
import { ElevatorProduct } from '../types';
import { ElevatorIllustration } from './ElevatorIllustration';
import { X, CheckCircle2, ArrowRight, Gauge, Layers, ShieldCheck } from 'lucide-react';

interface ProductModalProps {
  product: ElevatorProduct | null;
  onClose: () => void;
  onRequestQuoteForProduct: (product: ElevatorProduct) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onRequestQuoteForProduct,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (product) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-[#0D1C18]/85 backdrop-blur-md animate-fadeIn">
      {/* Modal Dialog Container */}
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#F7F5EF] text-[#111111] border border-[#B8923D]/40 shadow-2xl flex flex-col focus:outline-none"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
      >
        {/* Modal Top Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#F7F5EF]/95 backdrop-blur-xs border-b border-[#B8923D]/25">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-wider text-[#B8923D] font-bold">
              Engineering Specification
            </span>
            <span className="text-neutral-400">·</span>
            <span className="text-xs uppercase tracking-wider text-neutral-600 font-medium">
              {product.category} Series
            </span>
          </div>

          <button
            onClick={onClose}
            autoFocus
            className="p-1.5 text-neutral-600 hover:text-[#1B3B33] hover:bg-neutral-200/60 transition-colors cursor-pointer"
            aria-label="Close product details modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Header & Tagline */}
          <div className="space-y-2">
            <h3 id="product-modal-title" className="text-3xl sm:text-4xl font-serif text-[#1B3B33] font-normal">
              {product.title}
            </h3>
            <p className="text-sm font-serif italic text-[#B8923D] text-lg">
              {product.subtitle}
            </p>
            <p className="text-sm text-neutral-700 leading-relaxed max-w-3xl pt-1">
              {product.description}
            </p>
          </div>

          {/* Visual Illustration & Key Telemetry Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Visual CAD rendering */}
            <div className="md:col-span-6 h-[260px] md:h-auto min-h-[240px] border border-[#B8923D]/30 relative overflow-hidden bg-[#122621]">
              <ElevatorIllustration type={product.illustrationType} className="h-full" />
              <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-[#122621]/90 border border-[#B8923D]/40 text-xs font-mono text-[#E6D2A8]">
                CAD DRAWING REF #{product.id.toUpperCase()}
              </div>
            </div>

            {/* Spec Matrix */}
            <div className="md:col-span-6 bg-white p-5 border border-neutral-200/80 space-y-4 flex flex-col justify-center">
              <h4 className="text-xs uppercase tracking-widest font-bold text-[#1B3B33] border-b border-neutral-200 pb-2">
                Technical Blueprint
              </h4>
              
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="text-neutral-500 uppercase text-xs block font-medium">Rated Load</span>
                  <div className="font-mono text-neutral-900 font-semibold flex items-center gap-1.5">
                    <Gauge className="w-3.5 h-3.5 text-[#B8923D]" />
                    <span>{product.capacity}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-neutral-500 uppercase text-xs block font-medium">Shaft Pit Depth</span>
                  <div className="font-mono text-neutral-900 font-semibold flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#B8923D]" />
                    <span>{product.pitDepth}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-neutral-500 uppercase text-xs block font-medium">Overhead Clearance</span>
                  <div className="font-mono text-neutral-900 font-semibold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#B8923D]" />
                    <span>{product.overhead}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-100 text-xs">
                <span className="text-neutral-500 uppercase text-xs block font-medium">Drive Machine Architecture</span>
                <p className="font-medium text-[#1B3B33] mt-1 text-xs leading-snug">
                  {product.driveSystem}
                </p>
              </div>

              <div className="pt-1 text-xs">
                <span className="text-neutral-500 uppercase text-xs block font-medium">Travel Envelope</span>
                <p className="font-mono text-neutral-800 text-xs">
                  {product.maxStops}
                </p>
              </div>
            </div>
          </div>

          {/* Key Engineering Features */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-[#1B3B33]">
              Standard Engineering Deliverables
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {product.keyFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-700 bg-neutral-100/70 p-2.5 border-l-2 border-[#B8923D]">
                  <CheckCircle2 className="w-4 h-4 text-[#B8923D] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Architectural Finishes Available */}
          <div className="space-y-2 pt-2 border-t border-neutral-200">
            <h4 className="text-xs uppercase tracking-widest font-bold text-[#1B3B33]">
              Curated Architectural Finishes
            </h4>
            <div className="flex flex-wrap gap-2 text-xs">
              {product.finishes.map((finish, idx) => (
                <span key={idx} className="bg-white border border-[#B8923D]/30 px-3 py-1 text-neutral-800 font-medium">
                  {finish}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="sticky bottom-0 z-20 flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 bg-[#1B3B33] text-[#F7F5EF] border-t border-[#B8923D]/30">
          <div className="text-xs text-[#F7F5EF]/80 text-center sm:text-left">
            <span>Complimentary 3D BIM/CAD shaft layout provided for architects</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs uppercase tracking-wider text-[#F7F5EF]/70 hover:text-[#F7F5EF] transition-colors border border-transparent hover:border-[#F7F5EF]/20"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onRequestQuoteForProduct(product);
              }}
              className="flex-1 sm:flex-initial px-6 py-2.5 bg-[#B8923D] text-[#111111] font-semibold text-xs uppercase tracking-widest hover:bg-[#c9a34d] transition-all flex items-center justify-center gap-2"
            >
              <span>Request Quote for {product.title}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
