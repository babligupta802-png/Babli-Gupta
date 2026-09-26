import React from 'react';
import { Sparkles, Utensils, Award, Flame, HeartHandshake } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const RoyalThaliShowcase: React.FC = () => {
  const { setIsCartOpen } = useCart();

  const feastPillars = [
    {
      title: 'Dum Biryani Pots',
      tag: 'Aromatic & Slow-Cooked',
      desc: 'Steamed on slow charcoal dum with saffron-infused basmati, tender chicken pieces, caramelised barista, and whole royal spices.',
      image: '/src/assets/images/showcase_biryani_handi_1790395785215.jpg',
    },
    {
      title: 'Charcoal Tandoori Sizzlers',
      tag: 'Clay-Oven Charred',
      desc: 'Whole chicken, seekh kababs, and Afghani specialties marinated in thick hung curd, Kashmiri chilies, and roasted to juicy perfection.',
      image: '/src/assets/images/signature_tandoori_platter_1790395811447.jpg',
    },
    {
      title: 'Rich Handi & Kadai Curries',
      tag: 'Velvety & Desi Ghee Infused',
      desc: 'Paneer Tikka Masala, Chicken Handi, and authentic fiery Veg Kolhapuri cooked in copper vessels with fresh cream.',
      image: '/src/assets/images/signature_paneer_tikka_masala_1790395822066.jpg',
    },
    {
      title: 'Indo-Chinese Wok Delights',
      tag: 'High Flame Roaring Woks',
      desc: 'Crispy chicken lollipops, Manchurian dry, Hakka noodles, and Mumbai-famous Triple Schezwan rice plates.',
      image: '/src/assets/images/signature_chicken_kepsa_1790395798343.jpg',
    },
  ];

  return (
    <section id="showcase" className="py-24 bg-[#140203] relative overflow-hidden">
      {/* Decorative Golden Arch and Border Lines */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />

      {/* Background Fort Pattern Accent */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#5c0d16]/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-[#ffd700]" />
            <span className="text-xs font-serif font-bold tracking-[0.3em] text-[#ffd700] uppercase">
              The Grand Imperial Spread
            </span>
            <Sparkles className="w-4 h-4 text-[#ffd700]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 uppercase">
            <span className="gold-gradient-text drop-shadow-[0_2px_10px_rgba(212,175,55,0.2)]">
              FEAST LIKE A KING
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#ded3c5] font-light leading-relaxed">
            From clay-oven roasted tandoori chicken and fragrant biryanis to rich Indian curries, piping hot butter naan, and sizzling Indo-Chinese platters — every meal is prepared with royal pride.
          </p>
        </div>

        {/* Feature Cards Spread */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {feastPillars.map((pillar, idx) => (
            <div
              key={pillar.title}
              className="relative rounded-xl overflow-hidden bg-gradient-to-b from-[#250508] to-[#1c0305] border border-[#d4af37]/30 hover:border-[#ffd700] p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(212,175,55,0.15)] group"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-[#3d080e] border border-[#d4af37]/50 flex items-center justify-center text-[#ffd700] mb-4 group-hover:scale-110 transition-transform">
                  {idx === 0 && <Utensils className="w-5 h-5" />}
                  {idx === 1 && <Flame className="w-5 h-5" />}
                  {idx === 2 && <Award className="w-5 h-5" />}
                  {idx === 3 && <HeartHandshake className="w-5 h-5" />}
                </div>

                <div className="text-[10px] font-semibold uppercase tracking-wider text-[#d4af37] mb-1">
                  {pillar.tag}
                </div>
                <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#ffd700] transition-colors mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#cfc2b2] leading-relaxed font-light">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#d4af37]/15 flex items-center justify-between">
                <span className="text-[11px] text-[#ffd700]/70 font-medium">Fresh Daily</span>
                <span className="text-xs text-[#d4af37] font-bold group-hover:translate-x-1 transition-transform">
                  Explore →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Center Call-to-action Banquet Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-[#2c0509] via-[#450912] to-[#2c0509] border border-[#d4af37]/50 p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto relative z-10">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3 uppercase">
              Ready for a Regal Banquet?
            </h3>
            <p className="text-sm text-[#e6dbce] font-light mb-6">
              Whether dining in our comfortable family hall or enjoying a grand feast at home, our chefs prepare every order fresh to order.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#menu"
                className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#1a0305] bg-gradient-to-r from-[#ffd700] to-[#e0b445] hover:from-[#fff0ad] hover:to-[#ffd700] rounded shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer"
              >
                Browse All Dishes
              </a>
              <button
                onClick={() => setIsCartOpen(true)}
                className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#ffd700] bg-[#1a0305] border border-[#d4af37]/60 hover:bg-[#2b0509] rounded transition-colors cursor-pointer"
              >
                Order Online Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
