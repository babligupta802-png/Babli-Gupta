import React from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface RoyalLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export const RoyalLogo: React.FC<RoyalLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
}) => {
  const dimensions = {
    sm: {
      emblem: 'w-10 h-10',
      title: 'text-base sm:text-lg',
      sub: 'text-[9px]',
    },
    md: {
      emblem: 'w-12 h-12 sm:w-14 sm:h-14',
      title: 'text-lg sm:text-xl',
      sub: 'text-[10px]',
    },
    lg: {
      emblem: 'w-16 h-16 sm:w-20 sm:h-20',
      title: 'text-2xl sm:text-3xl',
      sub: 'text-xs',
    },
  }[size];

  return (
    <div className={`flex items-center gap-3.5 group select-none ${className}`}>
      {/* Ornate Royal Emblem Badge */}
      <div
        className={`relative ${dimensions.emblem} rounded-full shrink-0 flex items-center justify-center p-0.5 bg-gradient-to-br from-[#ffd700] via-[#b8860b] to-[#5c0d16] shadow-[0_0_15px_rgba(212,175,55,0.35)] group-hover:shadow-[0_0_22px_rgba(255,215,0,0.55)] group-hover:scale-105 transition-all duration-300`}
      >
        {/* Outer concentric golden ring */}
        <div className="w-full h-full rounded-full bg-[#1e0306] p-1 flex items-center justify-center border border-[#ffd700]/70 overflow-hidden relative">
          <img
            src="/src/assets/images/royal_maharashtra_king_emblem_1790396260019.jpg"
            alt="The Maharashtra King Royal Crest"
            className="w-full h-full object-cover object-center rounded-full transform group-hover:rotate-3 transition-transform duration-500"
            onError={(e) => {
              // Fallback to stylized SVG royal seal if image unavailable
              const target = e.target as HTMLElement;
              target.style.display = 'none';
            }}
          />
          {/* Subtle golden gloss highlight */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none rounded-full" />
        </div>

        {/* Mini Crown Jewel Top Accent */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-1 bg-[#ffd700] rounded-full shadow-[0_0_4px_#ffd700]" />
      </div>

      {/* Brand Typographic Identity */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-serif font-black tracking-wider uppercase gold-gradient-text drop-shadow-[0_2px_8px_rgba(212,175,55,0.35)] ${dimensions.title} leading-tight`}
          >
            {RESTAURANT_INFO.name}
          </span>
        </div>

        {showSubtitle && (
          <div className="flex items-center gap-2 mt-0.5">
            <span className="h-[1px] w-3 bg-[#d4af37]/60" />
            <span
              className={`font-sans uppercase font-semibold tracking-[0.25em] text-[#d4af37] ${dimensions.sub}`}
            >
              Royal Multi-Cuisine Dining
            </span>
            <span className="h-[1px] w-3 bg-[#d4af37]/60" />
          </div>
        )}
      </div>
    </div>
  );
};
