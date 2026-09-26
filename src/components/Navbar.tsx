import React, { useState } from 'react';
import { ShoppingBag, Phone, Menu as MenuIcon, X, Calendar, UtensilsCrossed } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { RoyalLogo } from './RoyalLogo';

interface NavbarProps {
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenReservation }) => {
  const { totalItemsCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Signatures', href: '#signatures' },
    { label: 'Menu', href: '#menu' },
    { label: 'Showcase', href: '#showcase' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Book Table', href: '#book-table' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#160204]/95 backdrop-blur-md border-b border-[#d4af37]/20 transition-all duration-200">
        {/* Top subtle golden hairline decoration */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Zone 1: Royal Emblem & Brand Typography */}
          <a
            href="#home"
            className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] rounded"
          >
            <RoyalLogo size="md" />
          </a>

          {/* Zone 2: Clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#e8ded1]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative py-1 hover:text-[#d4af37] transition-colors whitespace-nowrap after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#d4af37] hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenReservation}
              className="hidden md:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-[#d4af37] border border-[#d4af37]/50 rounded hover:bg-[#d4af37]/10 transition-colors whitespace-nowrap cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Table</span>
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="View shopping cart"
              className="relative flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#1a0305] bg-gradient-to-r from-[#e0b445] via-[#ffd700] to-[#b8860b] hover:from-[#f3d47d] hover:to-[#d4af37] rounded shadow-md transition-all whitespace-nowrap cursor-pointer active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 text-[#1a0305]" />
              <span className="hidden sm:inline">Cart</span>
              {totalItemsCount > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[11px] font-extrabold bg-[#1a0305] text-[#ffd700] rounded-full min-w-5">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#e8ded1] hover:text-[#d4af37] focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#1f0407] border-b border-[#d4af37]/20 px-4 pt-3 pb-5 space-y-2">
            <div className="py-1 px-2 mb-2 text-xs text-[#d4af37] font-medium border-b border-[#d4af37]/10 flex items-center justify-between">
              <span>{RESTAURANT_INFO.sittingArrangementNotice}</span>
              <span className="text-[10px] text-[#e8ded1]/60">11:30 AM - 11:30 PM</span>
            </div>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-[#f5ebe1] hover:text-[#ffd700] hover:bg-[#34070c] rounded transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full py-2.5 px-4 text-center text-xs font-bold uppercase tracking-wider text-[#d4af37] border border-[#d4af37]/60 rounded bg-[#2a0509]"
              >
                Reserve Your Table
              </button>
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="w-full py-2.5 px-4 text-center text-xs font-bold uppercase tracking-wider text-[#f5ebe1] border border-white/10 rounded flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                Call {RESTAURANT_INFO.phone}
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Fixed Mobile Bottom Navigation: HOME | MENU | CART | CALL as required by USER_REQUEST */}
      <nav
        aria-label="Mobile Navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#160204]/95 backdrop-blur-lg border-t border-[#d4af37]/30 px-3 py-1.5 flex items-center justify-around shadow-2xl"
      >
        <a
          href="#home"
          className="flex flex-col items-center justify-center py-1 px-3 text-[#d4af37] hover:text-[#ffd700] transition-colors text-center"
        >
          <div className="w-5 h-5 rounded-full overflow-hidden border border-[#ffd700] bg-[#2d060a]">
            <img
              src="/src/assets/images/royal_maharashtra_king_emblem_1790396260019.jpg"
              alt="Home"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-[10px] font-semibold mt-0.5 uppercase tracking-wider">Home</span>
        </a>

        <a
          href="#menu"
          className="flex flex-col items-center justify-center py-1 px-3 text-[#e8ded1] hover:text-[#d4af37] transition-colors text-center"
        >
          <UtensilsCrossed className="w-4 h-4" />
          <span className="text-[10px] font-semibold mt-1 uppercase tracking-wider">Menu</span>
        </a>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center justify-center py-1 px-3 text-[#e8ded1] hover:text-[#d4af37] transition-colors text-center cursor-pointer"
        >
          <div className="relative">
            <ShoppingBag className="w-4 h-4" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#d4af37] text-[#1a0305] text-[9px] font-extrabold rounded-full px-1 leading-tight">
                {totalItemsCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold mt-1 uppercase tracking-wider">Cart</span>
        </button>

        <a
          href={`tel:${RESTAURANT_INFO.phone}`}
          className="flex flex-col items-center justify-center py-1 px-3 text-[#e8ded1] hover:text-[#d4af37] transition-colors text-center"
        >
          <Phone className="w-4 h-4" />
          <span className="text-[10px] font-semibold mt-1 uppercase tracking-wider">Call</span>
        </a>
      </nav>
    </>
  );
};
