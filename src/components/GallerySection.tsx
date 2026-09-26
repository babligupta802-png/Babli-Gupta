import React, { useState } from 'react';
import { Camera, Eye, X, ZoomIn } from 'lucide-react';
import { GALLERY_ITEMS, GalleryItem } from '../data/restaurantData';

export const GallerySection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  // Extended gallery elements covering all prompt requirements
  const allGalleryItems: GalleryItem[] = [
    ...GALLERY_ITEMS,
    {
      id: 'gal-6',
      title: 'Smoky Charcoal Tandoor Grill',
      category: 'Tandoori',
      image: '/src/assets/images/signature_tandoori_platter_1790395811447.jpg',
      caption: 'Skewers roasted inside deep clay pots with natural wood and charcoal embers.',
    },
    {
      id: 'gal-7',
      title: 'Spiced Chicken Kepsa Platter',
      category: 'Biryani',
      image: '/src/assets/images/signature_chicken_kepsa_1790395798343.jpg',
      caption: 'Grand celebration rice garnished with dry fruits, eggs, and roasted chicken.',
    },
    {
      id: 'gal-8',
      title: 'Family Dining Ambience',
      category: 'Ambience',
      image: '/src/assets/images/hero_royal_indian_feast_1790395785215.jpg',
      caption: 'Warm royal lighting and welcoming family seating arrangements.',
    },
    {
      id: 'gal-9',
      title: 'Creamy Paneer Butter Curry',
      category: 'Curries',
      image: '/src/assets/images/signature_paneer_tikka_masala_1790395822066.jpg',
      caption: 'Simmered in pure desi butter, fresh cream, and whole garam masala.',
    },
  ];

  const categories = ['All', 'Tandoori', 'Biryani', 'Curries', 'Ambience'];

  const filteredItems = activeFilter === 'All'
    ? allGalleryItems
    : allGalleryItems.filter((item) => item.category === activeFilter);

  return (
    <section id="gallery" className="py-20 bg-[#160204] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 mb-2">
            <Camera className="w-4 h-4 text-[#ffd700]" />
            <span className="text-xs font-serif font-bold tracking-[0.25em] text-[#ffd700] uppercase">
              Culinary Artistry
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 uppercase">
            RESTAURANT GALLERY
          </h2>
          <p className="text-sm sm:text-base text-[#d9ccbe] font-light leading-relaxed">
            Take a visual tour of our royal kitchen, sizzling charcoal tandoors, vibrant multi-cuisine presentations, and cozy dining atmosphere.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded transition-all cursor-pointer ${
                activeFilter === cat
                  ? 'bg-[#d4af37] text-[#1a0305] shadow-md font-bold'
                  : 'bg-[#250508] text-[#e3d7c9] border border-[#d4af37]/20 hover:border-[#d4af37]/60 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              onClick={() => setSelectedImage(item)}
              className="group relative rounded-xl overflow-hidden bg-[#240408] border border-[#d4af37]/25 hover:border-[#ffd700] shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(212,175,55,0.2)]"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#160204]">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
              </div>

              {/* Hover overlay with caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#160204] via-[#160204]/60 to-transparent opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end">
                <span className="text-[10px] font-semibold text-[#ffd700] uppercase tracking-wider mb-1">
                  {item.category}
                </span>
                <h4 className="font-serif text-lg font-bold text-white mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-[#cfc2b2] font-light line-clamp-2">
                  {item.caption}
                </p>

                <div className="mt-3 flex items-center gap-1.5 text-xs text-[#ffd700] font-medium">
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>View Photo</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#1c0305] border border-[#d4af37]/60 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              aria-label="Close image modal"
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-[#d4af37] hover:text-black transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-[16/10] sm:aspect-[16/9] w-full bg-black overflow-hidden">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 bg-[#200407]">
              <div className="text-xs font-semibold text-[#ffd700] uppercase tracking-wider mb-1">
                {selectedImage.category}
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
                {selectedImage.title}
              </h3>
              <p className="text-sm text-[#cfc2b2] font-light">
                {selectedImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
