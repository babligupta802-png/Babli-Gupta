import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, Clock, Mail, Navigation, Edit3, Check, RotateCcw } from 'lucide-react';
import { RESTAURANT_INFO, RestaurantInfo } from '../data/restaurantData';

export const ContactSection: React.FC = () => {
  const [info, setInfo] = useState<RestaurantInfo>(() => {
    try {
      const saved = localStorage.getItem('tmk_custom_info');
      return saved ? JSON.parse(saved) : RESTAURANT_INFO;
    } catch {
      return RESTAURANT_INFO;
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempInfo, setTempInfo] = useState<RestaurantInfo>(info);

  const handleSave = () => {
    setInfo(tempInfo);
    try {
      localStorage.setItem('tmk_custom_info', JSON.stringify(tempInfo));
    } catch {
      // ignore
    }
    setIsEditing(false);
  };

  const handleReset = () => {
    setTempInfo(RESTAURANT_INFO);
    setInfo(RESTAURANT_INFO);
    try {
      localStorage.removeItem('tmk_custom_info');
    } catch {
      // ignore
    }
    setIsEditing(false);
  };

  return (
    <section id="contact" className="py-20 bg-[#160204] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-[#ffd700]" />
            <span className="text-xs font-serif font-bold tracking-[0.25em] text-[#ffd700] uppercase">
              Location & Hours
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 uppercase">
            VISIT THE MAHARASHTRA KING
          </h2>
          <p className="text-sm sm:text-base text-[#d9ccbe] font-light leading-relaxed">
            Conveniently situated with dedicated parking and a royal dining hall. Reach out directly or visit us for lunch and dinner.
          </p>
        </div>

        {/* Contact Info Cards & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Address & Landmark */}
          <div className="rounded-xl bg-[#240408] border border-[#d4af37]/30 p-6 flex flex-col justify-between shadow-lg">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#3d080e] border border-[#d4af37]/50 flex items-center justify-center text-[#ffd700] mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white mb-2">
                Restaurant Address
              </h3>
              <p className="text-sm text-[#cfc2b2] leading-relaxed font-light">
                {info.address}
              </p>
              <p className="text-xs text-[#d4af37] mt-2 font-medium">
                Landmark: {info.landmark}
              </p>
              <div className="mt-3 text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>{info.sittingArrangementNotice}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#d4af37]/15">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(info.address)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-[#1a0305] bg-[#d4af37] hover:bg-[#ffd700] rounded transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>GET DIRECTIONS</span>
              </a>
            </div>
          </div>

          {/* Card 2: Contact Numbers & WhatsApp */}
          <div className="rounded-xl bg-[#240408] border border-[#d4af37]/30 p-6 flex flex-col justify-between shadow-lg">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#3d080e] border border-[#d4af37]/50 flex items-center justify-center text-[#ffd700] mb-4">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white mb-2">
                Direct Contact
              </h3>
              <p className="text-xs text-[#cfc2b2] mb-4 font-light">
                For table inquiries, takeaways, and parcel orders:
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#d4af37]" />
                  <div>
                    <span className="text-[10px] text-[#ffd700]/70 uppercase block">Phone</span>
                    <span className="text-sm font-bold text-white font-mono">{info.phone}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <div>
                    <span className="text-[10px] text-emerald-400/80 uppercase block">WhatsApp</span>
                    <span className="text-sm font-bold text-white font-mono">{info.whatsapp}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#d4af37]" />
                  <div>
                    <span className="text-[10px] text-[#ffd700]/70 uppercase block">Email</span>
                    <span className="text-xs text-[#cfc2b2]">{info.email}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#d4af37]/15 grid grid-cols-2 gap-2">
              <a
                href={`tel:${info.phone}`}
                className="py-2.5 px-3 text-xs font-bold uppercase tracking-wider text-[#1a0305] bg-[#d4af37] hover:bg-[#ffd700] rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>CALL NOW</span>
              </a>
              <a
                href={`https://wa.me/${info.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-3 text-xs font-bold uppercase tracking-wider text-white bg-emerald-700 hover:bg-emerald-600 rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WHATSAPP</span>
              </a>
            </div>
          </div>

          {/* Card 3: Opening Hours & Service */}
          <div className="rounded-xl bg-[#240408] border border-[#d4af37]/30 p-6 flex flex-col justify-between shadow-lg">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#3d080e] border border-[#d4af37]/50 flex items-center justify-center text-[#ffd700] mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white mb-2">
                Opening Hours
              </h3>
              <p className="text-sm text-[#ffd700] font-semibold mb-4">
                {info.openingHours}
              </p>

              <div className="space-y-2 text-xs text-[#cfc2b2]">
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span>Lunch Service:</span>
                  <span className="text-white font-medium">11:30 AM – 04:00 PM</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span>Evening Refreshments:</span>
                  <span className="text-white font-medium">04:00 PM – 07:00 PM</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span>Dinner Feast:</span>
                  <span className="text-white font-medium">07:00 PM – 11:30 PM</span>
                </div>
                <div className="flex justify-between py-1.5 text-emerald-400 font-semibold">
                  <span>Service Days:</span>
                  <span>Monday through Sunday</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#d4af37]/15">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-[#d4af37] border border-[#d4af37]/40 hover:bg-[#d4af37]/10 rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditing ? 'Close Contact Editor' : 'Edit Contact Information'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Central Data Structure In-Page Editor (CMS requirement) */}
        {isEditing && (
          <div className="rounded-xl bg-[#200407] border-2 border-[#d4af37] p-6 mb-12 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between mb-4 border-b border-[#d4af37]/20 pb-3">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#ffd700]">
                  Central CMS: Edit Contact Information
                </h3>
                <p className="text-xs text-[#cfc2b2]">
                  Customize restaurant address, phone, WhatsApp and operating hours. Saved to local storage.
                </p>
              </div>
              <button
                onClick={handleReset}
                className="text-xs text-[#ffd700] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Defaults</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-[#ffd700] font-semibold mb-1">Address</label>
                <input
                  type="text"
                  value={tempInfo.address}
                  onChange={(e) => setTempInfo({ ...tempInfo, address: e.target.value })}
                  className="w-full bg-[#160204] border border-[#d4af37]/30 rounded px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-[#ffd700] font-semibold mb-1">Landmark</label>
                <input
                  type="text"
                  value={tempInfo.landmark}
                  onChange={(e) => setTempInfo({ ...tempInfo, landmark: e.target.value })}
                  className="w-full bg-[#160204] border border-[#d4af37]/30 rounded px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-[#ffd700] font-semibold mb-1">Phone Number</label>
                <input
                  type="text"
                  value={tempInfo.phone}
                  onChange={(e) => setTempInfo({ ...tempInfo, phone: e.target.value })}
                  className="w-full bg-[#160204] border border-[#d4af37]/30 rounded px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-[#ffd700] font-semibold mb-1">WhatsApp Number</label>
                <input
                  type="text"
                  value={tempInfo.whatsapp}
                  onChange={(e) => setTempInfo({ ...tempInfo, whatsapp: e.target.value })}
                  className="w-full bg-[#160204] border border-[#d4af37]/30 rounded px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-[#ffd700] font-semibold mb-1">Opening Hours</label>
                <input
                  type="text"
                  value={tempInfo.openingHours}
                  onChange={(e) => setTempInfo({ ...tempInfo, openingHours: e.target.value })}
                  className="w-full bg-[#160204] border border-[#d4af37]/30 rounded px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-[#ffd700] font-semibold mb-1">Email</label>
                <input
                  type="email"
                  value={tempInfo.email}
                  onChange={(e) => setTempInfo({ ...tempInfo, email: e.target.value })}
                  className="w-full bg-[#160204] border border-[#d4af37]/30 rounded px-3 py-2 text-white"
                />
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-xs text-[#cfc2b2] hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 text-xs font-bold text-[#1a0305] bg-[#d4af37] hover:bg-[#ffd700] rounded flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
