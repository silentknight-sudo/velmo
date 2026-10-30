import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { STATS_COUNTERS } from '../data/elevators';

interface SingleCounterProps {
  target: number;
  suffix: string;
  duration?: number;
}

const SingleCounter: React.FC<SingleCounterProps> = ({ target, suffix, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(ease * target);
      setCount(current);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="font-mono tabular-nums">
      {count}
      {suffix}
    </span>
  );
};

export const StatsCounter: React.FC = () => {
  return (
    <section className="bg-[#1B3B33] text-[#F7F5EF] py-20 relative overflow-hidden border-y border-[#B8923D]/30">
      {/* Background Accent Grid */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #B8923D 1px, transparent 1px), linear-gradient(to bottom, #B8923D 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 divide-y sm:divide-y-0 sm:divide-x divide-[#B8923D]/20">
          {STATS_COUNTERS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`flex flex-col items-center text-center space-y-2 ${idx > 0 ? 'pt-6 sm:pt-0 sm:pl-8' : ''}`}
            >
              <div className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-[#E6D2A8] tracking-tight">
                <SingleCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <h3 className="font-serif text-base sm:text-lg text-[#F7F5EF] font-medium leading-snug">
                {stat.label}
              </h3>
              <p className="text-xs text-[#F7F5EF]/60 max-w-[200px] leading-relaxed">
                {stat.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
