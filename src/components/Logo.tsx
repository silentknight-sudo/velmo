import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark' | 'cream';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showSubtitle?: boolean;
  iconOnly?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  size = 'md',
  className = '',
  iconOnly = false,
}) => {
  // Brand assets based on background variant:
  // 'dark' = for light cream backgrounds (e.g., sticky Navbar): deep forest green + gold accents
  // 'light' | 'cream' = for deep dark backgrounds (e.g., Footer): crisp white negative knockout
  const isDarkBg = variant === 'light' || variant === 'cream';

  const logoSrc = isDarkBg
    ? '/assets/brand/velmo_logo_white.png'
    : '/assets/brand/velmo_logo_color.png';

  const markSrc = isDarkBg
    ? '/assets/brand/velmo_mark_white.png'
    : '/assets/brand/velmo_mark_color.png';

  // Calibrated size classes to fit navbar, footer, and hero banners with perfect proportions
  const sizeClasses = {
    sm: iconOnly ? 'h-7 w-auto' : 'h-8 sm:h-9 w-auto',
    md: iconOnly ? 'h-9 w-auto' : 'h-10 sm:h-11 w-auto',
    lg: iconOnly ? 'h-13 w-auto' : 'h-14 sm:h-16 w-auto',
  };

  const selectedSrc = iconOnly ? markSrc : logoSrc;

  return (
    <div
      className={`inline-flex items-center select-none ${className}`}
      aria-label="VELMO Elevators"
    >
      <img
        src={selectedSrc}
        alt="VELMO ELEVATORS"
        className={`${sizeClasses[size]} object-contain transition-transform duration-300 group-hover:scale-[1.02]`}
        loading="eager"
        decoding="async"
      />
    </div>
  );
};
