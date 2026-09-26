import React from 'react';
import { Utensils, Calendar, ChevronRight } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { useCart } from '../context/CartContext';

interface HeroSectionProps {
  onOpenReservation: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenReservation }) => {
  const { setIsCartOpen } = useCart();

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_royal_indian_feast_1790395785215.jpg"
          alt="Royal Indian feast spread at The Maharashtra King"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 transform animate-pulse duration-10000"
          onError={(e) => {
            // graceful fallback background
            const target = e.target as HTMLElement;
            target.style.display = 'none';
          }}
        />
        {/* Layered cinematic gradient scrims for maximum legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#160204] via-[#240408]/90 to-[#160204]/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#160204] via-transparent to-[#160204]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#160204]/40 to-[#160204]/90" />
      </div>

      {/* Decorative Royal Corner Accents */}
      <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-[#d4af37]/40 pointer-events-none hidden md:block" />
      <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-[#d4af37]/40 pointer-events-none hidden md:block" />
      <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-[#d4af37]/40 pointer-events-none hidden md:block" />
      <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-[#d4af37]/40 pointer-events-none hidden md:block" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        {/* Royal Crest Emblem Medallion */}
        <div className="relative mb-5 group">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-tr from-[#d4af37] via-[#ffd700] to-[#b8860b] shadow-[0_0_35px_rgba(212,175,55,0.4)] group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full rounded-full bg-[#1b0306] p-1 border border-[#ffd700]/70 overflow-hidden relative shadow-inner">
              <img
                src="/src/assets/images/royal_maharashtra_king_emblem_1790396260019.jpg"
                alt="The Maharashtra King Emblem"
                className="w-full h-full object-cover object-center rounded-full"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none rounded-full" />
            </div>
          </div>
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-2 bg-[#ffd700] rounded-full shadow-[0_0_8px_#ffd700]" />
        </div>

        {/* Royal Crest / Top Motif */}
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#d4af37]" />
          <span className="text-[#ffd700] text-xs sm:text-sm font-serif tracking-[0.3em] uppercase">
            Royal Cuisine & Hospitality
          </span>
          <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#d4af37]" />
        </div>

        {/* Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 uppercase">
          <span className="block gold-gradient-text drop-shadow-[0_4px_12px_rgba(212,175,55,0.3)]">
            {RESTAURANT_INFO.headline}
          </span>
        </h1>

        {/* Subheadline */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-[#fdf6e9] font-medium max-w-3xl mb-6 leading-relaxed">
          "{RESTAURANT_INFO.subheadline}"
        </h2>

        {/* Supporting text */}
        <p className="text-sm sm:text-base md:text-lg text-[#e6dbce] max-w-2xl mb-10 leading-relaxed font-sans font-light">
          {RESTAURANT_INFO.supportingText}
        </p>

        {/* 3 Prominent Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto">
          {/* [EXPLORE MENU] */}
          <a
            href="#menu"
            className="w-full sm:w-auto px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1a0305] bg-gradient-to-r from-[#ffd700] via-[#e5c158] to-[#d4af37] hover:from-[#fff0ad] hover:to-[#ffd700] rounded shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Utensils className="w-4 h-4" />
            <span>Explore Menu</span>
          </a>

          {/* [ORDER NOW] */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full sm:w-auto px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#ffd700] bg-[#3a060c]/80 hover:bg-[#4a0810] border border-[#d4af37]/70 rounded shadow-md transition-transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Order Now</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* [BOOK A TABLE] */}
          <button
            onClick={onOpenReservation}
            className="w-full sm:w-auto px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#f5f0e6] bg-transparent hover:bg-white/5 border border-white/30 rounded transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#d4af37]" />
            <span>Book a Table</span>
          </button>
        </div>

        {/* Menu Notice Badge */}
        <div className="mt-12 inline-flex items-center gap-2 px-4 py-2 bg-[#2d060a]/90 border border-[#d4af37]/40 rounded-md backdrop-blur-sm text-xs sm:text-sm text-[#ffd700] shadow-md">
          <span className="inline-block w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
          <span className="font-semibold tracking-wider uppercase">
            {RESTAURANT_INFO.sittingArrangementNotice}
          </span>
          <span className="text-[#e8ded1]/60">· Full Dining Space Available</span>
        </div>
      </div>
    </section>
  );
};
