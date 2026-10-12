import React from 'react';

interface HotelLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  variant?: 'full' | 'crest-only';
  theme?: 'light' | 'dark'; // light background vs dark background
}

export const HotelLogo: React.FC<HotelLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  theme = 'light',
}) => {
  // Dimensions mapping
  const sizeConfig = {
    sm: { img: 'w-9 h-9', title: 'text-base sm:text-lg', sub: 'text-[10px]' },
    md: { img: 'w-11 h-11', title: 'text-lg sm:text-xl', sub: 'text-[10px] sm:text-[11px]' },
    lg: { img: 'w-16 h-16', title: 'text-2xl', sub: 'text-xs' },
    xl: { img: 'w-24 h-24', title: 'text-3xl', sub: 'text-sm' },
  };

  const currentSize = sizeConfig[size];

  return (
    <div className={`inline-flex items-center gap-3 shrink-0 ${className}`}>
      {/* Official Golden Royal Emblem Logo */}
      <div
        className={`${currentSize.img} rounded-full overflow-hidden border border-[#c5a059]/50 shadow-sm shrink-0 bg-[#fdfcf9] flex items-center justify-center p-0.5 transition-transform duration-300 hover:scale-105`}
      >
        <img
          src="/images/hotel_brand_logo_1791786790395.jpg"
          alt="Thiên Phú Hotel Logo"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover rounded-full"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/logo.jpg';
          }}
        />
      </div>

      {/* Brand Typography (guaranteed no line wrap) */}
      {showText && (
        <div className="flex flex-col whitespace-nowrap shrink-0 leading-tight">
          <span
            className={`font-brand-title ${currentSize.title} font-bold tracking-widest whitespace-nowrap ${
              theme === 'dark' ? 'text-white' : 'text-[#1c1917]'
            }`}
          >
            THIÊN&#160;PHÚ
          </span>
          <span
            className={`font-bold tracking-[0.25em] uppercase text-[#9f7d3a] whitespace-nowrap mt-0.5 ${currentSize.sub}`}
          >
            HOTEL
          </span>
        </div>
      )}
    </div>
  );
};
