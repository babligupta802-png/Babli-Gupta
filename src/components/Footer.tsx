import React from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { MapPin, Phone, Clock, Armchair, ChevronRight } from 'lucide-react';
import { RoyalLogo } from './RoyalLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#120103] border-t border-[#d4af37]/20 pt-16 pb-24 lg:pb-12 text-[#d9ccbe] relative">
      {/* Top golden hairline */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4">
            <RoyalLogo size="md" />
            <p className="text-xs text-[#cfc2b2] leading-relaxed font-light">
              Experience authentic royal taste. Serving mouth-watering tandoori starters, aromatic biryanis, fresh Indo-Chinese woks, and slow-cooked Indian curries.
            </p>
            <div className="inline-flex items-center gap-2 p-2 rounded bg-[#200407] border border-[#d4af37]/30 text-xs text-[#ffd700]">
              <Armchair className="w-3.5 h-3.5" />
              <span className="font-semibold">{RESTAURANT_INFO.sittingArrangementNotice}</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-[#d4af37]/20 pb-2">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="hover:text-[#ffd700] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#d4af37]" /> Home
                </a>
              </li>
              <li>
                <a href="#signatures" className="hover:text-[#ffd700] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#d4af37]" /> King's Signatures
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#ffd700] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#d4af37]" /> Full Interactive Menu
                </a>
              </li>
              <li>
                <a href="#showcase" className="hover:text-[#ffd700] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#d4af37]" /> Feast Like a King
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#ffd700] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#d4af37]" /> Restaurant Gallery
                </a>
              </li>
              <li>
                <a href="#book-table" className="hover:text-[#ffd700] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#d4af37]" /> Book a Table
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Specialties */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-[#d4af37]/20 pb-2">
              Menu Highlights
            </h4>
            <ul className="space-y-2 text-xs text-[#cfc2b2]">
              <li>Chicken Kepsa Platter</li>
              <li>Tandoori Full & Afghani Tandoor</li>
              <li>Chicken Dum & Hyderabadi Biryani</li>
              <li>Paneer Tikka & Butter Masala</li>
              <li>Authentic Veg Kolhapuri</li>
              <li>Triple Schezwan Rice & Noodles</li>
              <li>Fresh Tandoori Butter Naan & Kulcha</li>
            </ul>
          </div>

          {/* Col 4: Visit & Timings */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-[#d4af37]/20 pb-2">
              Restaurant Hours
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white block font-medium">Daily Operating Hours</span>
                  <span className="text-[#ffd700]">{RESTAURANT_INFO.openingHours}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white block font-medium">Location</span>
                  <span>{RESTAURANT_INFO.address}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white block font-medium">Inquiries & Reservations</span>
                  <span className="text-[#ffd700] font-mono">{RESTAURANT_INFO.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-[#cfc2b2]/60 gap-4">
          <p>© {new Date().getFullYear()} {RESTAURANT_INFO.name}. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Authentic Indian, Tandoori & Indo-Chinese Dining · Royal Hospitality
          </p>
        </div>
      </div>
    </footer>
  );
};
