import React, { useState, useEffect } from 'react';
import { Smartphone, Headphones, ShoppingBag, Monitor, Home, Watch, ArrowRight, ChevronLeft, ChevronRight, Store, Star, ExternalLink, Search } from 'lucide-react';
import { Theme } from '../types';
import { deals } from '../data/deals';

export const DealsPreview: React.FC<{ theme: Theme }> = ({ theme }) => {
  const [activeCategory, setActiveCategory] = useState("Всички");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const categories = ["Всички", "Технологии", "Мода", "Дом", "Спорт"];

  const filteredDeals = activeCategory === "Всички"
    ? deals
    : deals.filter(d => d.category === activeCategory);

  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(filteredDeals.length / itemsPerPage);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentSlide(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrev();
    }

    setTouchEnd(0);
    setTouchStart(0);
  };

  return (
    <section id="deals" className="py-24 px-4 relative overflow-hidden">
      <div className={`absolute inset-0 -z-10 opacity-50 ${theme.id === 'light' ? 'bg-slate-100' : 'bg-black/20'}`}></div>

      <div className="max-w-7xl mx-auto relative z-0">
        <div className="text-center mb-12 gravity-target">
          <span className={`text-sm font-bold uppercase tracking-widest ${theme.colors.accent} mb-2 block`}>Специална селекция</span>
          <h2 className={`text-3xl md:text-4xl font-bold ${theme.colors.textMain} mb-4`}>
            Актуални оферти <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">в момента</span>
          </h2>
          <p className={`max-w-xl mx-auto ${theme.colors.textSecondary} text-lg`}>
            Открий най-горещите оферти в популярни категории, подбрани от нашия AI, за да ти спестим време и пари.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <div className="hidden md:block w-40"></div>
          <div className="flex flex-wrap justify-center gap-3 px-2 py-2 gravity-target">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border hover:scale-105 active:scale-95 ${activeCategory === cat
                  ? `bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 text-white border-transparent shadow-[0_0_20px_rgba(34,211,238,0.4)]`
                  : `${theme.colors.cardBg} ${theme.colors.cardBorder} ${theme.colors.textSecondary} hover:text-white hover:border-cyan-500/50 hover:bg-white/5`
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="w-full md:w-auto flex justify-center md:justify-end gravity-target">
            <button className={`flex items-center gap-2 text-sm font-bold px-6 py-2 rounded-full transition-all duration-300 border hover:scale-105 active:scale-95 ${theme.colors.cardBg} ${theme.colors.cardBorder} ${theme.colors.textMain} hover:bg-gradient-to-r hover:from-cyan-600 hover:via-blue-600 hover:to-purple-600 hover:text-white hover:border-transparent hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]`}>
              Виж всички <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden py-6 -my-6 px-2 -mx-2">
            <div
              className="relative group/carousel touch-pan-y cursor-grab active:cursor-grabbing"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={(e) => setTouchStart(e.clientX)}
              onMouseMove={(e) => { if (touchStart) setTouchEnd(e.clientX); }}
              onMouseUp={() => { handleTouchEnd(); setTouchStart(0); }}
              onMouseLeave={() => { if (touchStart) { handleTouchEnd(); setTouchStart(0); } }}
            >
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from({ length: totalPages }).map((_, pageIndex) => (
                  <div key={pageIndex} className="min-w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                    {filteredDeals.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage).map((deal) => (
                      <div key={deal.id} className={`gravity-target group relative rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:-translate-y-1 hover:border-cyan-400/50 hover:z-10 ${theme.colors.cardBg} ${theme.colors.cardBorder}`}>
                        <div className="h-56 relative overflow-hidden bg-slate-800 transition-all duration-500 ease-in-out rounded-t-2xl">
                          <img src={deal.image} alt={deal.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-lg">{deal.discount}</div>
                          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg">
                            <Store className="w-3 h-3" />
                            {deal.store}
                          </div>
                          <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/10">
                            {deal.icon}
                            {deal.category}
                          </div>
                        </div>

                        <div className="p-5 relative">
                          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                          <h3 className={`font-bold text-lg mb-3 line-clamp-2 leading-snug ${theme.colors.textMain}`}>{deal.title}</h3>
                          <div className="flex items-center gap-1 mb-3">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className={`text-sm font-bold ${theme.colors.textMain}`}>{deal.rating}</span>
                            <span className={`text-xs ${theme.colors.textMuted}`}>(120+ ревюта)</span>
                          </div>
                          <div className="flex items-end justify-between mb-4">
                            <div className="flex flex-col">
                              <span className={`text-xs line-through mb-0.5 ${theme.colors.textMuted}`}>{deal.oldPrice}</span>
                              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">{deal.price}</span>
                            </div>
                          </div>
                          <button className={`w-full py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all ${theme.id === 'light' ? 'bg-slate-100 hover:bg-slate-200 text-slate-900' : 'bg-slate-800 hover:bg-slate-700 text-white'}`}>
                            Виж оферта <ExternalLink className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {filteredDeals.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage).length < itemsPerPage &&
                      Array.from({ length: itemsPerPage - filteredDeals.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage).length }).map((_, i) => (
                        <div key={`empty-${i}`} className="hidden lg:block"></div>
                      ))
                    }
                  </div>
                ))}

                {filteredDeals.length === 0 && (
                  <div className={`min-w-full flex flex-col items-center justify-center h-64 text-center ${theme.colors.textMuted}`}>
                    <Search className="w-12 h-12 mb-4 opacity-50" />
                    <p>Няма намерени оферти в тази категория.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {totalPages > 1 && (
            <>
              <button
                onClick={handlePrev}
                className={`absolute top-1/2 left-0 -translate-y-1/2 p-3 rounded-full shadow-xl backdrop-blur-md border transition-all hover:scale-110 ${theme.colors.cardBg} ${theme.colors.cardBorder} ${theme.colors.textMain} hover:text-cyan-400 z-10`}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className={`absolute top-1/2 right-0 -translate-y-1/2 p-3 rounded-full shadow-xl backdrop-blur-md border transition-all hover:scale-110 ${theme.colors.cardBg} ${theme.colors.cardBorder} ${theme.colors.textMain} hover:text-cyan-400 z-10`}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
