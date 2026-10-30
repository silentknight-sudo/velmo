import React, { useState, useEffect } from 'react';
import { Building2 } from 'lucide-react';

interface ArchitecturalImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  placeholderLabel?: string;
  containerClassName?: string;
}

export const ArchitecturalImage: React.FC<ArchitecturalImageProps> = ({
  src,
  alt = 'VELMO Architectural Elevator',
  fallbackSrc,
  placeholderLabel,
  className = '',
  containerClassName = 'relative w-full h-full overflow-hidden bg-[#122621]',
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setError(false);
    setLoaded(false);
  }, [src]);

  return (
    <div className={containerClassName}>
      {/* Loading Skeleton / Processing State */}
      {!loaded && !error && (
        <div className="absolute inset-0 bg-[#142A24] animate-pulse flex flex-col items-center justify-center p-4 z-0">
          <Building2 className="w-8 h-8 text-[#B8923D]/40 mb-2 animate-bounce" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#B8923D]/70 text-center">
            {placeholderLabel || 'Loading Architectural View...'}
          </span>
        </div>
      )}

      {/* Fallback Display if Image Processing Fails or is Interrupted */}
      {error ? (
        <div className="absolute inset-0 bg-[#122621] border border-[#B8923D]/30 flex flex-col items-center justify-center p-4 text-center z-10">
          <Building2 className="w-8 h-8 text-[#B8923D] mb-1.5" />
          <span className="text-xs font-serif text-[#F7F5EF] font-medium">
            {alt || 'VELMO Engineering'}
          </span>
          <span className="text-[10px] font-mono text-[#B8923D] mt-1 tracking-wider uppercase">
            Architectural Specification
          </span>
        </div>
      ) : (
        <img
          src={currentSrc}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => {
            if (fallbackSrc && currentSrc !== fallbackSrc) {
              setCurrentSrc(fallbackSrc);
            } else {
              setError(true);
            }
          }}
          className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}
          {...props}
        />
      )}
    </div>
  );
};
