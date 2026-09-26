import React from 'react';
import { Armchair, Sparkles, Users, Clock, ShieldCheck } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface SittingBannerProps {
  onOpenReservation: () => void;
}

export const SittingBanner: React.FC<SittingBannerProps> = ({ onOpenReservation }) => {
  return (
    <section className="relative z-10 py-10 bg-gradient-to-b from-[#160204] via-[#240409] to-[#160204] border-y border-[#d4af37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#2e050b] via-[#3f0810] to-[#2e050b] border border-[#d4af37]/40 p-6 sm:p-8 shadow-2xl">
          {/* Subtle gold ornamental corner motifs */}
          <div className="absolute top-2 left-2 text-[#d4af37]/30 text-xs font-serif select-none">❖</div>
          <div className="absolute top-2 right-2 text-[#d4af37]/30 text-xs font-serif select-none">❖</div>
          <div className="absolute bottom-2 left-2 text-[#d4af37]/30 text-xs font-serif select-none">❖</div>
          <div className="absolute bottom-2 right-2 text-[#d4af37]/30 text-xs font-serif select-none">❖</div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4 text-left">
              <div className="w-14 h-14 rounded-lg bg-[#500a14] border border-[#d4af37]/60 flex items-center justify-center shrink-0 text-[#ffd700] shadow-inner">
                <Armchair className="w-7 h-7" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#ffd700] mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
                  <span>Dine-In Hospitality</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-white uppercase">
                  {RESTAURANT_INFO.sittingArrangementNotice}
                </h3>
                <p className="text-sm text-[#e0d3c4] mt-1 max-w-2xl font-light">
                  Spacious air-conditioned dining hall ready for family celebrations, friendly get-togethers, and relaxed multi-course meals.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 w-full lg:w-auto shrink-0 justify-end">
              <div className="flex items-center gap-6 text-xs text-[#d6c7b5] mr-2 hidden sm:flex">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#d4af37]" /> Family Friendly
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#d4af37]" /> Fast Service
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" /> Clean & Hygienic
                </span>
              </div>

              <button
                onClick={onOpenReservation}
                className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#1a0305] bg-gradient-to-r from-[#ffd700] via-[#e5c158] to-[#d4af37] hover:from-[#fff0ad] hover:to-[#ffd700] rounded shadow-md transition-all whitespace-nowrap cursor-pointer"
              >
                Reserve Your Table
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
