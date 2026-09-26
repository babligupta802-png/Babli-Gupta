import React, { useState, useMemo } from 'react';
import { Search, Plus, Minus, Check, Flame } from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS, MenuCategory, MenuItem } from '../data/restaurantData';
import { useCart } from '../context/CartContext';

export type DietFilterType = 'All' | 'Vegetarian' | 'Non-Vegetarian';

export const MenuSection: React.FC = () => {
  const { cart, addToCart, updateQuantity } = useCart();
  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietFilter, setDietFilter] = useState<DietFilterType>('All');

  // Overall counts for instant reference
  const totalCount = MENU_ITEMS.length;
  const vegCount = useMemo(() => MENU_ITEMS.filter((i) => i.isVeg).length, []);
  const nonVegCount = useMemo(() => MENU_ITEMS.filter((i) => !i.isVeg).length, []);

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (activeCategory !== 'ALL' && item.category !== activeCategory) {
        return false;
      }
      // Diet filter
      if (dietFilter === 'Vegetarian' && !item.isVeg) return false;
      if (dietFilter === 'Non-Vegetarian' && item.isVeg) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        return matchesName || matchesCategory || matchesDesc;
      }

      return true;
    });
  }, [activeCategory, dietFilter, searchQuery]);

  return (
    <section id="menu" className="py-20 bg-[#160204] relative">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-8 h-[1px] bg-[#d4af37]" />
            <span className="text-xs font-serif font-semibold tracking-[0.25em] text-[#ffd700] uppercase">
              Authentic Dining Selection
            </span>
            <span className="w-8 h-[1px] bg-[#d4af37]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 uppercase">
            ROYAL DINING MENU
          </h2>
          <p className="text-sm sm:text-base text-[#d9ccbe] font-light leading-relaxed">
            Crafted with traditional recipes, clay-oven tandoor techniques, and fresh wok cooking. Select any dish to customize and add to your order.
          </p>
        </div>

        {/* Dedicated Primary Dietary Filter Toggle (All | Vegetarian | Non-Vegetarian) */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="inline-flex p-1.5 sm:p-2 bg-[#200407] border-2 border-[#d4af37]/40 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.5)] gap-1.5 sm:gap-2 max-w-full overflow-x-auto">
            {/* All View */}
            <button
              type="button"
              onClick={() => setDietFilter('All')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap ${
                dietFilter === 'All'
                  ? 'bg-gradient-to-r from-[#ffd700] via-[#e5c158] to-[#d4af37] text-[#1a0305] shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-102'
                  : 'text-[#d9ccbe] hover:text-white hover:bg-white/5'
              }`}
            >
              <span>All Dishes</span>
              <span
                className={`text-[11px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                  dietFilter === 'All'
                    ? 'bg-[#1a0305] text-[#ffd700]'
                    : 'bg-[#2e050b] text-[#ffd700]/80'
                }`}
              >
                {totalCount}
              </span>
            </button>

            {/* Vegetarian View */}
            <button
              type="button"
              onClick={() => setDietFilter('Vegetarian')}
              className={`flex items-center gap-2.5 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap ${
                dietFilter === 'Vegetarian'
                  ? 'bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] border border-emerald-400 scale-102'
                  : 'text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/40 border border-emerald-500/20'
              }`}
            >
              {/* Authentic Veg Symbol */}
              <div
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 flex items-center justify-center rounded-[2px] shrink-0 ${
                  dietFilter === 'Vegetarian' ? 'border-white' : 'border-emerald-500'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                    dietFilter === 'Vegetarian' ? 'bg-white' : 'bg-emerald-400'
                  }`}
                />
              </div>
              <span>Vegetarian</span>
              <span
                className={`text-[11px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                  dietFilter === 'Vegetarian'
                    ? 'bg-white text-emerald-800'
                    : 'bg-emerald-950 text-emerald-300'
                }`}
              >
                {vegCount}
              </span>
            </button>

            {/* Non-Vegetarian View */}
            <button
              type="button"
              onClick={() => setDietFilter('Non-Vegetarian')}
              className={`flex items-center gap-2.5 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap ${
                dietFilter === 'Non-Vegetarian'
                  ? 'bg-red-700 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)] border border-red-500 scale-102'
                  : 'text-red-400 hover:text-red-300 hover:bg-red-950/40 border border-red-500/20'
              }`}
            >
              {/* Authentic Non-Veg Symbol */}
              <div
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 flex items-center justify-center rounded-[2px] shrink-0 ${
                  dietFilter === 'Non-Vegetarian' ? 'border-white' : 'border-red-600'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                    dietFilter === 'Non-Vegetarian' ? 'bg-white' : 'bg-red-500'
                  }`}
                />
              </div>
              <span>Non-Vegetarian</span>
              <span
                className={`text-[11px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                  dietFilter === 'Non-Vegetarian'
                    ? 'bg-white text-red-900'
                    : 'bg-red-950 text-red-300'
                }`}
              >
                {nonVegCount}
              </span>
            </button>
          </div>
        </div>

        {/* Search & Active Info Controls Bar */}
        <div className="bg-[#240408] border border-[#d4af37]/25 rounded-xl p-4 mb-8 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#d4af37]" />
            <input
              type="text"
              placeholder="Search chicken, paneer, biryani, tandoori..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#160204] border border-[#d4af37]/30 rounded-lg pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#d9ccbe]/50 focus:outline-none focus:border-[#ffd700] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#d9ccbe] hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Current Filter Status and Instant Reset */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end text-xs">
            <span className="text-[#d4af37]/90 font-medium">
              Showing <strong className="text-white font-bold tabular-nums">{filteredItems.length}</strong>{' '}
              {dietFilter === 'All' ? 'total' : dietFilter.toLowerCase()} dishes
            </span>

            {(dietFilter !== 'All' || activeCategory !== 'ALL' || searchQuery) && (
              <button
                onClick={() => {
                  setDietFilter('All');
                  setActiveCategory('ALL');
                  setSearchQuery('');
                }}
                className="px-2.5 py-1 text-[11px] font-semibold text-[#ffd700] hover:text-[#fff2be] bg-[#1a0305] border border-[#d4af37]/30 rounded cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Horizontally Scrollable Category Filter Pills */}
        <div className="relative mb-10">
          <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 no-scrollbar scroll-smooth">
            <button
              onClick={() => setActiveCategory('ALL')}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-md whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === 'ALL'
                  ? 'bg-gradient-to-r from-[#ffd700] to-[#d4af37] text-[#1a0305] shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                  : 'bg-[#260509] text-[#e3d7c9] border border-[#d4af37]/20 hover:border-[#d4af37]/60 hover:text-white'
              }`}
            >
              Full Menu ({dietFilter === 'All' ? totalCount : dietFilter === 'Vegetarian' ? vegCount : nonVegCount})
            </button>

            {MENU_CATEGORIES.map((cat) => {
              const count = MENU_ITEMS.filter((i) => {
                if (i.category !== cat) return false;
                if (dietFilter === 'Vegetarian') return i.isVeg;
                if (dietFilter === 'Non-Vegetarian') return !i.isVeg;
                return true;
              }).length;

              const isZero = count === 0;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-md whitespace-nowrap transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-gradient-to-r from-[#ffd700] to-[#d4af37] text-[#1a0305] shadow-[0_0_15px_rgba(212,175,55,0.3)] font-bold'
                      : isZero
                      ? 'bg-[#190305] text-[#e3d7c9]/40 border border-white/5 hover:text-[#e3d7c9]'
                      : 'bg-[#260509] text-[#e3d7c9] border border-[#d4af37]/20 hover:border-[#d4af37]/60 hover:text-white'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Dish Cards Grid: single column on mobile, 2-col on md, 3-col on lg */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#200407] rounded-xl border border-[#d4af37]/20 space-y-3">
            <p className="text-base text-[#d9ccbe] font-serif">
              No dishes found matching <span className="text-[#ffd700]">"{dietFilter}"</span> in{' '}
              <span className="text-white">{activeCategory === 'ALL' ? 'the menu' : activeCategory}</span>.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDietFilter('All')}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#1a0305] bg-[#d4af37] hover:bg-[#ffd700] rounded cursor-pointer"
              >
                Switch to All Dishes
              </button>
              <button
                onClick={() => {
                  setActiveCategory('ALL');
                  setSearchQuery('');
                  setDietFilter('All');
                }}
                className="px-4 py-2 text-xs font-semibold text-[#ffd700] hover:text-white border border-[#d4af37]/40 rounded cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map((dish) => {
              const cartItem = cart.find((ci) => ci.item.id === dish.id);

              return (
                <div
                  key={dish.id}
                  className="group relative flex flex-col justify-between rounded-xl bg-[#200407] border border-[#d4af37]/25 hover:border-[#ffd700] p-4 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(212,175,55,0.12)] hover:-translate-y-0.5"
                >
                  <div>
                    {/* Top Row: Category tag, Veg/NonVeg Indicator & Spice */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {dish.isVeg ? (
                          <div
                            className="w-4 h-4 border-2 border-emerald-500 flex items-center justify-center rounded-[2px]"
                            title="Vegetarian"
                          >
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          </div>
                        ) : (
                          <div
                            className="w-4 h-4 border-2 border-red-600 flex items-center justify-center rounded-[2px]"
                            title="Non-Vegetarian"
                          >
                            <span className="w-2 h-2 rounded-full bg-red-600" />
                          </div>
                        )}
                        <span className="text-[10px] font-semibold tracking-wider text-[#d4af37]/80 uppercase">
                          {dish.category}
                        </span>
                      </div>

                      {dish.spiceLevel && (
                        <span className="text-[10px] text-[#ffd700]/70 flex items-center gap-1 font-sans">
                          <Flame className="w-2.5 h-2.5 text-[#f59e0b]" />
                          {dish.spiceLevel}
                        </span>
                      )}
                    </div>

                    {/* Dish Title */}
                    <h3 className="font-serif text-base sm:text-lg font-bold text-white group-hover:text-[#ffd700] transition-colors leading-tight">
                      {dish.name}
                    </h3>

                    {/* Portion indicator if applicable (e.g. Half / Full) */}
                    {dish.portion && (
                      <span className="text-[11px] text-[#ffd700] font-medium block mt-0.5">
                        Portion: {dish.portion}
                      </span>
                    )}

                    {/* Short appetizing description */}
                    <p className="text-xs text-[#cfc2b2] mt-2 line-clamp-2 leading-relaxed font-light">
                      {dish.description}
                    </p>
                  </div>

                  {/* Price & Action Row */}
                  <div className="mt-5 pt-3 border-t border-[#d4af37]/15 flex items-center justify-between">
                    <div>
                      <span className="font-sans font-extrabold text-xl text-white tabular-nums tracking-tight">
                        ₹{dish.price}
                      </span>
                    </div>

                    {/* Add to Cart / Quantity Stepper */}
                    {cartItem ? (
                      <div className="flex items-center bg-[#2f060b] border border-[#d4af37]/50 rounded overflow-hidden">
                        <button
                          onClick={() => updateQuantity(cartItem.id, -1)}
                          aria-label={`Decrease quantity of ${dish.name}`}
                          className="px-2.5 py-1.5 text-[#d4af37] hover:bg-[#d4af37]/20 transition-colors cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 py-1 text-xs font-bold text-white tabular-nums">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(cartItem.id, 1)}
                          aria-label={`Increase quantity of ${dish.name}`}
                          className="px-2.5 py-1.5 text-[#d4af37] hover:bg-[#d4af37]/20 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(dish)}
                        className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1a0305] bg-[#d4af37] hover:bg-[#ffd700] rounded transition-all flex items-center gap-1 shadow-sm active:scale-95 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
