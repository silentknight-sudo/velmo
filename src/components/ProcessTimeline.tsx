import React from 'react';

interface ProcessTimelineProps {
  onOpenQuote?: (context?: string) => void;
}

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ onOpenQuote }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onOpenQuote) {
      onOpenQuote('Process Section');
    }
    const form = document.getElementById('lead-quote-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' });
      const nameInput = document.getElementById('lead-form-name') as HTMLInputElement | null;
      if (nameInput) {
        setTimeout(() => nameInput.focus(), 400);
      }
    }
  };

  return (
    <section
      id="process"
      className="py-16 lg:py-24 bg-[#F7F5EF] text-[#1B3B33]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
        
        {/* Header */}
        <header className="max-w-2xl mb-14 lg:mb-20">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#B8923D] font-bold mb-3">
            HOW WE WORK
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#1B3B33] leading-tight">
            Five stages.{' '}
            <span className="italic font-normal text-[#B8923D]">
              One standard.
            </span>
          </h2>

          <p className="mt-3 sm:mt-4 text-[15px] sm:text-base text-[#1B3B33]/70 font-sans">
            From first conversation to lifetime care.
          </p>
        </header>

        {/* 
          Desktop View (≥1024px): 
          5 equal columns in a single row, 1px horizontal hairline above columns,
          small gold dot on the line for each column.
        */}
        <div className="hidden lg:block">
          {/* 1px horizontal hairline with small gold dots */}
          <div className="relative mb-6">
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#1B3B33]/20 -translate-y-1/2" />
            <div className="grid grid-cols-5 gap-8 xl:gap-12 relative">
              <div className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-[#B8923D] ring-4 ring-[#F7F5EF] z-10" /></div>
              <div className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-[#B8923D] ring-4 ring-[#F7F5EF] z-10" /></div>
              <div className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-[#B8923D] ring-4 ring-[#F7F5EF] z-10" /></div>
              <div className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-[#B8923D] ring-4 ring-[#F7F5EF] z-10" /></div>
              <div className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-[#B8923D] ring-4 ring-[#F7F5EF] z-10" /></div>
            </div>
          </div>

          {/* Ordered list */}
          <ol className="grid grid-cols-5 gap-8 xl:gap-12 list-none p-0 m-0">
            <li className="space-y-1.5">
              <span className="font-serif text-xl xl:text-2xl text-[#B8923D] font-light block">01</span>
              <h3 className="font-serif text-[22px] xl:text-[24px] text-[#1B3B33] font-normal leading-snug">
                Consultation
              </h3>
              <p className="text-[15px] text-[#1B3B33]/70 font-sans leading-relaxed pt-0.5">
                We study your space, needs and budget.
              </p>
            </li>

            <li className="space-y-1.5">
              <span className="font-serif text-xl xl:text-2xl text-[#B8923D] font-light block">02</span>
              <h3 className="font-serif text-[22px] xl:text-[24px] text-[#1B3B33] font-normal leading-snug">
                Design & Quote
              </h3>
              <p className="text-[15px] text-[#1B3B33]/70 font-sans leading-relaxed pt-0.5">
                Custom design with clear, transparent pricing.
              </p>
            </li>

            <li className="space-y-1.5">
              <span className="font-serif text-xl xl:text-2xl text-[#B8923D] font-light block">03</span>
              <h3 className="font-serif text-[22px] xl:text-[24px] text-[#1B3B33] font-normal leading-snug">
                Manufacturing
              </h3>
              <p className="text-[15px] text-[#1B3B33]/70 font-sans leading-relaxed pt-0.5">
                Built with precision and quality-checked.
              </p>
            </li>

            <li className="space-y-1.5">
              <span className="font-serif text-xl xl:text-2xl text-[#B8923D] font-light block">04</span>
              <h3 className="font-serif text-[22px] xl:text-[24px] text-[#1B3B33] font-normal leading-snug">
                Installation
              </h3>
              <p className="text-[15px] text-[#1B3B33]/70 font-sans leading-relaxed pt-0.5">
                Highly trained technicians, every step checked.
              </p>
            </li>

            <li className="space-y-1.5">
              <span className="font-serif text-xl xl:text-2xl text-[#B8923D] font-light block">05</span>
              <h3 className="font-serif text-[22px] xl:text-[24px] text-[#1B3B33] font-normal leading-snug">
                Maintenance
              </h3>
              <p className="text-[15px] text-[#1B3B33]/70 font-sans leading-relaxed pt-0.5">
                24/7 service and support, for life.
              </p>
            </li>
          </ol>
        </div>

        {/* 
          Tablet View (768px - 1023px): 
          2-3 columns, flat, quiet hairline dividers
        */}
        <div className="hidden md:block lg:hidden">
          <ol className="grid grid-cols-2 gap-x-12 gap-y-10 list-none p-0 m-0 border-t border-[#1B3B33]/20 pt-8">
            <li className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#B8923D]" />
                <span className="font-serif text-xl text-[#B8923D] font-light">01</span>
              </div>
              <h3 className="font-serif text-[22px] text-[#1B3B33] font-normal">Consultation</h3>
              <p className="text-[15px] text-[#1B3B33]/70 font-sans leading-relaxed">
                We study your space, needs and budget.
              </p>
            </li>

            <li className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#B8923D]" />
                <span className="font-serif text-xl text-[#B8923D] font-light">02</span>
              </div>
              <h3 className="font-serif text-[22px] text-[#1B3B33] font-normal">Design & Quote</h3>
              <p className="text-[15px] text-[#1B3B33]/70 font-sans leading-relaxed">
                Custom design with clear, transparent pricing.
              </p>
            </li>

            <li className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#B8923D]" />
                <span className="font-serif text-xl text-[#B8923D] font-light">03</span>
              </div>
              <h3 className="font-serif text-[22px] text-[#1B3B33] font-normal">Manufacturing</h3>
              <p className="text-[15px] text-[#1B3B33]/70 font-sans leading-relaxed">
                Built with precision and quality-checked.
              </p>
            </li>

            <li className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#B8923D]" />
                <span className="font-serif text-xl text-[#B8923D] font-light">04</span>
              </div>
              <h3 className="font-serif text-[22px] text-[#1B3B33] font-normal">Installation</h3>
              <p className="text-[15px] text-[#1B3B33]/70 font-sans leading-relaxed">
                Highly trained technicians, every step checked.
              </p>
            </li>

            <li className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#B8923D]" />
                <span className="font-serif text-xl text-[#B8923D] font-light">05</span>
              </div>
              <h3 className="font-serif text-[22px] text-[#1B3B33] font-normal">Maintenance</h3>
              <p className="text-[15px] text-[#1B3B33]/70 font-sans leading-relaxed">
                24/7 service and support, for life.
              </p>
            </li>
          </ol>
        </div>

        {/* 
          Mobile View (<768px): 
          Single column vertical list with thin 1px line on the left and small gold dots
        */}
        <div className="block md:hidden">
          <ol className="relative border-l border-[#1B3B33]/20 pl-6 space-y-8 list-none p-0 ml-1.5">
            <li className="relative space-y-1">
              <span className="absolute -left-[29px] top-1.5 w-2 h-2 rounded-full bg-[#B8923D] ring-4 ring-[#F7F5EF]" />
              <span className="font-serif text-lg text-[#B8923D] font-light block">01</span>
              <h3 className="font-serif text-xl text-[#1B3B33] font-normal">Consultation</h3>
              <p className="text-[15px] text-[#1B3B33]/70 font-sans leading-relaxed">
                We study your space, needs and budget.
              </p>
            </li>

            <li className="relative space-y-1">
              <span className="absolute -left-[29px] top-1.5 w-2 h-2 rounded-full bg-[#B8923D] ring-4 ring-[#F7F5EF]" />
              <span className="font-serif text-lg text-[#B8923D] font-light block">02</span>
              <h3 className="font-serif text-xl text-[#1B3B33] font-normal">Design & Quote</h3>
              <p className="text-[15px] text-[#1B3B33]/70 font-sans leading-relaxed">
                Custom design with clear, transparent pricing.
              </p>
            </li>

            <li className="relative space-y-1">
              <span className="absolute -left-[29px] top-1.5 w-2 h-2 rounded-full bg-[#B8923D] ring-4 ring-[#F7F5EF]" />
              <span className="font-serif text-lg text-[#B8923D] font-light block">03</span>
              <h3 className="font-serif text-xl text-[#1B3B33] font-normal">Manufacturing</h3>
              <p className="text-[15px] text-[#1B3B33]/70 font-sans leading-relaxed">
                Built with precision and quality-checked.
              </p>
            </li>

            <li className="relative space-y-1">
              <span className="absolute -left-[29px] top-1.5 w-2 h-2 rounded-full bg-[#B8923D] ring-4 ring-[#F7F5EF]" />
              <span className="font-serif text-lg text-[#B8923D] font-light block">04</span>
              <h3 className="font-serif text-xl text-[#1B3B33] font-normal">Installation</h3>
              <p className="text-[15px] text-[#1B3B33]/70 font-sans leading-relaxed">
                Highly trained technicians, every step checked.
              </p>
            </li>

            <li className="relative space-y-1">
              <span className="absolute -left-[29px] top-1.5 w-2 h-2 rounded-full bg-[#B8923D] ring-4 ring-[#F7F5EF]" />
              <span className="font-serif text-lg text-[#B8923D] font-light block">05</span>
              <h3 className="font-serif text-xl text-[#1B3B33] font-normal">Maintenance</h3>
              <p className="text-[15px] text-[#1B3B33]/70 font-sans leading-relaxed">
                24/7 service and support, for life.
              </p>
            </li>
          </ol>
        </div>

        {/* Quiet text link at bottom */}
        <div className="mt-14 lg:mt-20 pt-8 border-t border-[#1B3B33]/15">
          <a
            href="#lead-quote-form"
            onClick={handleClick}
            className="text-[15px] sm:text-base text-[#1B3B33] underline decoration-[#B8923D] underline-offset-8 hover:text-[#B8923D] transition-colors duration-200 font-medium inline-block"
          >
            Get a free quote →
          </a>
        </div>

      </div>
    </section>
  );
};
