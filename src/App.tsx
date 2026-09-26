/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SittingBanner } from './components/SittingBanner';
import { SignatureDishes } from './components/SignatureDishes';
import { MenuSection } from './components/MenuSection';
import { RoyalThaliShowcase } from './components/RoyalThaliShowcase';
import { GallerySection } from './components/GallerySection';
import { ReservationSection } from './components/ReservationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';

export default function App() {
  const scrollToReservation = () => {
    const el = document.getElementById('book-table');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#160204] text-[#fbf5ea] flex flex-col selection:bg-[#d4af37] selection:text-[#1a0305]">
        {/* Sticky Top Navigation */}
        <Navbar onOpenReservation={scrollToReservation} />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* 1. Dramatic Full-Screen Hero */}
          <HeroSection onOpenReservation={scrollToReservation} />

          {/* 2. Sitting Arrangement Notice Banner */}
          <SittingBanner onOpenReservation={scrollToReservation} />

          {/* 3. King's Signature Dishes */}
          <SignatureDishes />

          {/* 4. Interactive 13-Category Menu */}
          <MenuSection />

          {/* 5. Feast Like a King Showcase */}
          <RoyalThaliShowcase />

          {/* 6. Restaurant Gallery */}
          <GallerySection />

          {/* 7. Book a Table Reservation */}
          <ReservationSection />

          {/* 8. Contact & Location Information */}
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Slide-out Cart & Checkout Drawer */}
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
