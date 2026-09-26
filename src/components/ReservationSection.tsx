import React, { useState } from 'react';
import { Calendar, Clock, Users, CheckCircle, Sparkles, Phone, MessageSquare } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const ReservationSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    time: '19:30',
    guests: '2 Guests',
    specialRequest: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    const ref = 'TMK-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(ref);
    setIsSubmitted(true);
  };

  return (
    <section id="book-table" className="py-20 bg-[#190305] relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4af37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Prominent Menu Notice Banner */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#2e050b] border border-[#d4af37]/60 text-xs sm:text-sm font-bold text-[#ffd700] uppercase tracking-wider shadow-lg">
            <Sparkles className="w-4 h-4 text-[#ffd700]" />
            <span>{RESTAURANT_INFO.sittingArrangementNotice}</span>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3 uppercase">
            BOOK A TABLE
          </h2>
          <p className="text-sm sm:text-base text-[#d9ccbe] font-light leading-relaxed">
            Reserve your royal dining experience in advance. We cater to family gatherings, celebratory feasts, and private lunches.
          </p>
        </div>

        {/* Reservation Card Form */}
        <div className="rounded-2xl bg-gradient-to-b from-[#250508] to-[#1c0305] border border-[#d4af37]/40 p-6 sm:p-10 shadow-2xl">
          {isSubmitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle className="w-9 h-9" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">
                Table Reserved Successfully!
              </h3>
              <p className="text-sm text-[#cfc2b2] max-w-md mx-auto">
                Thank you, <strong className="text-white">{formData.name}</strong>. Your reservation for{' '}
                <strong className="text-[#ffd700]">{formData.guests}</strong> on{' '}
                <strong className="text-white">{formData.date}</strong> at{' '}
                <strong className="text-white">{formData.time}</strong> has been logged.
              </p>
              <div className="inline-block px-4 py-2 bg-[#160204] border border-[#d4af37]/40 rounded text-xs font-mono text-[#ffd700]">
                Booking Reference: {bookingRef}
              </div>
              <div className="pt-4">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#1a0305] bg-[#d4af37] hover:bg-[#ffd700] rounded transition-colors cursor-pointer"
                >
                  Make Another Reservation
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#ffd700] uppercase tracking-wider mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#160204] border border-[#d4af37]/30 rounded-lg px-4 py-3 text-sm text-white placeholder-[#d9ccbe]/40 focus:outline-none focus:border-[#ffd700] transition-colors"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-semibold text-[#ffd700] uppercase tracking-wider mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#160204] border border-[#d4af37]/30 rounded-lg px-4 py-3 text-sm text-white placeholder-[#d9ccbe]/40 focus:outline-none focus:border-[#ffd700] transition-colors"
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block text-xs font-semibold text-[#ffd700] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Date *</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-[#160204] border border-[#d4af37]/30 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ffd700] transition-colors"
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block text-xs font-semibold text-[#ffd700] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Time *</span>
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-[#160204] border border-[#d4af37]/30 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ffd700] transition-colors"
                  >
                    <option value="12:00">12:00 PM (Lunch)</option>
                    <option value="12:30">12:30 PM (Lunch)</option>
                    <option value="13:00">01:00 PM (Lunch)</option>
                    <option value="13:30">01:30 PM (Lunch)</option>
                    <option value="14:00">02:00 PM (Lunch)</option>
                    <option value="19:00">07:00 PM (Dinner)</option>
                    <option value="19:30">07:30 PM (Dinner)</option>
                    <option value="20:00">08:00 PM (Dinner)</option>
                    <option value="20:30">08:30 PM (Dinner)</option>
                    <option value="21:00">09:00 PM (Dinner)</option>
                    <option value="21:30">09:30 PM (Dinner)</option>
                    <option value="22:00">10:00 PM (Dinner)</option>
                  </select>
                </div>

                {/* Number of Guests */}
                <div>
                  <label className="block text-xs font-semibold text-[#ffd700] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Number of Guests *</span>
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full bg-[#160204] border border-[#d4af37]/30 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ffd700] transition-colors"
                  >
                    <option value="1 Guest">1 Guest</option>
                    <option value="2 Guests">2 Guests</option>
                    <option value="3 Guests">3 Guests</option>
                    <option value="4 Guests">4 Guests</option>
                    <option value="5-6 Guests">5-6 Guests</option>
                    <option value="7-10 Guests">7-10 Guests (Large Table)</option>
                    <option value="10+ Guests">10+ Guests (Celebration Banquet)</option>
                  </select>
                </div>

                {/* Direct quick call info */}
                <div className="flex items-center p-3 rounded-lg bg-[#160204] border border-[#d4af37]/20 text-xs text-[#cfc2b2]">
                  <Phone className="w-4 h-4 text-[#ffd700] mr-2 shrink-0" />
                  <span>
                    Prefer instant assistance? Call us directly at{' '}
                    <strong className="text-white">{RESTAURANT_INFO.phone}</strong>
                  </span>
                </div>
              </div>

              {/* Special Request */}
              <div>
                <label className="block text-xs font-semibold text-[#ffd700] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Special Request (Optional)</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="E.g. anniversary celebration, high chair needed, less spicy preference..."
                  value={formData.specialRequest}
                  onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
                  className="w-full bg-[#160204] border border-[#d4af37]/30 rounded-lg px-4 py-3 text-sm text-white placeholder-[#d9ccbe]/40 focus:outline-none focus:border-[#ffd700] transition-colors"
                />
              </div>

              {/* Submit Button: RESERVE YOUR TABLE */}
              <button
                type="submit"
                className="w-full py-4 text-xs sm:text-sm font-bold uppercase tracking-widest text-[#1a0305] bg-gradient-to-r from-[#ffd700] via-[#e5c158] to-[#d4af37] hover:from-[#fff0ad] hover:to-[#ffd700] rounded-lg shadow-xl transition-all cursor-pointer hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] active:scale-[0.99]"
              >
                RESERVE YOUR TABLE
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
