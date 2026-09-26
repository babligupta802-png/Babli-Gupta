import React from 'react';
import { Plus, Check, Flame } from 'lucide-react';
import { MENU_ITEMS, MenuItem } from '../data/restaurantData';
import { useCart } from '../context/CartContext';

export const SignatureDishes: React.FC = () => {
  const { cart, addToCart } = useCart();

  // Selected signature items matching the prompt specification
  const signatureDishes = MENU_ITEMS.filter((item) =>
    [
      'crp-9', // Chicken Kepsa (₹320)
      'mcnv-2', // Chicken Handi Full (₹400)
      'bnv-4', // Chicken Hyderabadi Biryani (₹170)
      'tan-2', // Tandoori Full (₹320)
      'tan-4', // White Afghani Tandoori Full (₹380)
      'mcnv-8', // Chicken Kasturi Murgh Masala (₹220)
      'mcv-1', // Paneer Tikka Masala (₹180)
      'mcv-6', // Veg Kolhapuri (₹160)
    ].includes(item.id)
  );

  return (
    <section id="signatures" className="py-20 bg-[#190305] relative overflow-hidden">
      {/* Decorative background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#d4af37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-8 h-[1px] bg-[#d4af37]" />
            <span className="text-xs font-serif font-semibold tracking-[0.25em] text-[#ffd700] uppercase">
              Royal Masterpieces
            </span>
            <span className="w-8 h-[1px] bg-[#d4af37]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 uppercase">
            KING’S SIGNATURE
          </h2>
          <p className="text-sm sm:text-base text-[#d9ccbe] font-light leading-relaxed">
            Curated house specialties slow-simmered with royal spices, rich clay-oven roasted meats, and traditional heritage gravies.
          </p>
        </div>

        {/* 4-column (desktop) / 2-column (tablet) / 1-column (mobile) Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {signatureDishes.map((dish) => {
            const inCart = cart.find((ci) => ci.item.id === dish.id);
            const dishImage =
              dish.image ||
              (dish.isVeg
                ? '/src/assets/images/signature_paneer_tikka_masala_1790395822066.jpg'
                : '/src/assets/images/signature_tandoori_platter_1790395811447.jpg');

            return (
              <div
                key={dish.id}
                className="group relative flex flex-col justify-between rounded-xl bg-gradient-to-b from-[#2a050a] to-[#200407] border border-[#d4af37]/30 hover:border-[#ffd700] p-4 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)] hover:-translate-y-1"
              >
                {/* Food Image Container */}
                <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-[#160204] mb-4 border border-[#d4af37]/20">
                  <img
                    src={dishImage}
                    alt={dish.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      // fallback container if image load errors
                      const target = e.target as HTMLElement;
                      target.style.display = 'none';
                    }}
                  />
                  {/* Subtle gradient overlay on image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#200407] via-transparent to-transparent opacity-80" />

                  {/* Veg / Non-Veg Indicator */}
                  <div className="absolute top-2.5 left-2.5 z-10 bg-[#160204]/90 backdrop-blur-xs p-1 rounded border border-white/10 shadow-sm flex items-center justify-center">
                    {dish.isVeg ? (
                      <div className="w-4 h-4 border-2 border-emerald-500 flex items-center justify-center rounded-[2px]" title="Vegetarian">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      </div>
                    ) : (
                      <div className="w-4 h-4 border-2 border-red-600 flex items-center justify-center rounded-[2px]" title="Non-Vegetarian">
                        <span className="w-2 h-2 rounded-full bg-red-600" />
                      </div>
                    )}
                  </div>

                  {/* Spice indicator badge */}
                  {dish.spiceLevel && (
                    <div className="absolute top-2.5 right-2.5 z-10 bg-[#160204]/80 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] text-[#ffd700] border border-[#d4af37]/30 flex items-center gap-1 font-medium">
                      <Flame className="w-2.5 h-2.5 text-[#f59e0b]" />
                      <span>{dish.spiceLevel}</span>
                    </div>
                  )}
                </div>

                {/* Dish Information */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-semibold text-[#d4af37] tracking-wider uppercase mb-1">
                      {dish.category}
                    </div>
                    <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#ffd700] transition-colors leading-snug">
                      {dish.name}
                    </h3>
                    <p className="text-xs text-[#cfc2b2] mt-2 line-clamp-2 leading-relaxed font-light">
                      {dish.description}
                    </p>
                  </div>

                  {/* Price & Action Row */}
                  <div className="mt-5 pt-3 border-t border-[#d4af37]/20 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#d4af37]/70 block font-light">Price</span>
                      <span className="font-sans font-bold text-lg text-white tabular-nums">
                        ₹{dish.price}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(dish)}
                      className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                        inCart
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm'
                          : 'bg-[#d4af37] text-[#1a0305] hover:bg-[#ffd700] shadow-sm hover:shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                      }`}
                    >
                      {inCart ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added ({inCart.quantity})</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
