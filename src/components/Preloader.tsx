import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

interface PreloaderProps {
  onComplete?: () => void;
}

const TELEMETRY_PHASES = [
  { threshold: 0, text: 'LOADING' },
  { threshold: 40, text: 'CALIBRATING' },
  { threshold: 75, text: 'READY' },
  { threshold: 96, text: 'WELCOME' },
];

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentFloor, setCurrentFloor] = useState('FL 00');
  const [statusText, setStatusText] = useState(TELEMETRY_PHASES[0].text);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Disable background page scrolling during preloader
    document.body.style.overflow = 'hidden';

    const startTime = performance.now();
    const duration = 2200; // 2.2 seconds total, perfectly timed

    let animationFrameId: number;

    const animateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);

      // Smooth custom ease-out curve
      const easedProgress = Math.round(
        (1 - Math.pow(1 - rawProgress, 2.5)) * 100
      );

      setProgress(easedProgress);

      // Calculate floor simulation (FL 00 to FL 48 Penthouse)
      const floorNum = Math.floor((easedProgress / 100) * 48);
      const floorStr = floorNum === 48 ? 'PH' : `FL ${String(floorNum).padStart(2, '0')}`;
      setCurrentFloor(floorStr);

      // Update telemetry text according to thresholds
      for (let i = TELEMETRY_PHASES.length - 1; i >= 0; i--) {
        if (easedProgress >= TELEMETRY_PHASES[i].threshold) {
          setStatusText(TELEMETRY_PHASES[i].text);
          break;
        }
      }

      if (rawProgress < 1) {
        animationFrameId = requestAnimationFrame(animateProgress);
      } else {
        // Complete state with brief hold before parting doors
        setTimeout(() => {
          setIsFinished(true);
          document.body.style.overflow = '';
          onComplete?.();
        }, 350);
      }
    };

    animationFrameId = requestAnimationFrame(animateProgress);

    // Keyboard ESC shortcut to bypass
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFinished(true);
        document.body.style.overflow = '';
        onComplete?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsFinished(true);
    document.body.style.overflow = '';
    onComplete?.();
  };

  return (
    <AnimatePresence>
      {!isFinished && (
        <div className="fixed inset-0 z-[100] flex pointer-events-auto select-none overflow-hidden">
          {/* 
            ====================================================================
            LEFT ELEVATOR DOOR PANEL
            Slides left upon arrival: -100%
            ====================================================================
          */}
          <motion.div
            initial={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{
              duration: 1.1,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="relative w-1/2 h-full bg-[#0E231E] border-r border-[#B8923D]/50 z-20 overflow-hidden"
          >
            <div className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #B8923D 1px, transparent 1px), linear-gradient(to bottom, #B8923D 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />
            <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#B8923D]/40 via-[#B8923D] to-[#B8923D]/40" />
          </motion.div>

          {/* 
            ====================================================================
            RIGHT ELEVATOR DOOR PANEL
            Slides right upon arrival: +100%
            ====================================================================
          */}
          <motion.div
            initial={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              duration: 1.1,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="relative w-1/2 h-full bg-[#0E231E] border-l border-[#B8923D]/50 z-20 overflow-hidden"
          >
            <div className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #B8923D 1px, transparent 1px), linear-gradient(to bottom, #B8923D 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#B8923D]/40 via-[#B8923D] to-[#B8923D]/40" />
          </motion.div>

          {/* 
            ====================================================================
            CENTER KINETIC CABIN CORE
            Fades and scales gently as doors part
            ====================================================================
          */}
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30 px-4 sm:px-6"
          >
            {/* Architectural Hall Station Core Display Plate */}
            <div className="relative flex flex-col items-center text-center bg-[#0C201A] border border-[#B8923D]/40 shadow-[0_0_50px_rgba(0,0,0,0.85)] rounded-md px-8 sm:px-12 py-7 sm:py-8 max-w-sm sm:max-w-md w-full">
              {/* Subtle architectural corner accents */}
              <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-[#B8923D]/60" />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-[#B8923D]/60" />
              <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-[#B8923D]/60" />
              <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-[#B8923D]/60" />

              {/* Authentic Brand Logo */}
              <div className="flex flex-col items-center text-center mb-6">
                <img
                  src="/assets/brand/velmo_logo_white.png"
                  alt="VELMO ELEVATORS"
                  className="h-9 sm:h-11 w-auto object-contain"
                />
              </div>

              {/* Telemetry & Elevator Shaft Column */}
              <div className="flex items-center justify-center gap-6 sm:gap-8 mb-6 select-none w-full">
                {/* Left Column: Floor Display */}
                <div className="w-20 sm:w-24 text-right">
                  <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#B8923D]/70 block mb-0.5">
                    LEVEL
                  </span>
                  <span className="font-mono text-base sm:text-lg font-bold text-[#F7F5EF] tracking-[0.15em]">
                    {currentFloor}
                  </span>
                </div>

                {/* Center Column: Precision Shaft Guide Rail */}
                <div className="relative h-28 sm:h-36 w-[2px] bg-[#B8923D]/25 flex flex-col justify-between items-center my-1">
                  <div className="w-3 h-[1px] bg-[#B8923D]/40" />
                  <div className="w-2 h-[1px] bg-[#B8923D]/30" />
                  <div className="w-3 h-[1px] bg-[#B8923D]/40" />
                  <div className="w-2 h-[1px] bg-[#B8923D]/30" />
                  <div className="w-3 h-[1px] bg-[#B8923D]/40" />

                  <motion.div
                    style={{ bottom: `${Math.max(progress, 6)}%` }}
                    className="absolute -translate-x-1/2 left-1/2 w-4 h-6 sm:w-5 sm:h-7 rounded-sm bg-[#1B3B33] border border-[#B8923D] shadow-[0_0_15px_rgba(184,146,61,0.9)] flex items-center justify-center"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#B8923D] animate-ping" />
                  </motion.div>
                </div>

                {/* Right Column: Speed / Progress Display */}
                <div className="w-20 sm:w-24 text-left">
                  <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#B8923D]/70 block mb-0.5">
                    VELOCITY
                  </span>
                  <span className="font-mono text-base sm:text-lg font-bold text-[#B8923D] tracking-[0.15em]">
                    {progress}%
                  </span>
                </div>
              </div>

              {/* Status and Progress Bar */}
              <div className="flex flex-col items-center text-center w-full" role="status" aria-live="polite">
                <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono tracking-[0.3em] text-[#F7F5EF]/90 uppercase">
                  {progress >= 96 ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B8923D]" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-[#B8923D] animate-ping" />
                  )}
                  <span>{statusText}</span>
                </div>

                <div className="mt-3 w-48 sm:w-56 h-[2px] bg-white/10 overflow-hidden rounded-full">
                  <motion.div
                    style={{ width: `${progress}%` }}
                    className="h-full bg-gradient-to-r from-[#B8923D]/60 to-[#B8923D]"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleSkip}
              className="absolute bottom-8 right-8 text-[10px] sm:text-[11px] font-mono tracking-[0.28em] text-[#B8923D] hover:text-white uppercase transition-colors cursor-pointer pointer-events-auto"
              aria-label="Skip preloader animation and enter site"
            >
              Enter [Esc]
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
