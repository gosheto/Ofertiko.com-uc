import React, { useState, useRef } from 'react';
import { Info, ChevronLeft, ChevronRight, User, Flame, Store, ThumbsUp, MessageCircle, ExternalLink } from 'lucide-react';
import { Theme } from '../types';
import { personalizedDeals } from '../data/deals';

export const JustForYouSection: React.FC<{ theme: Theme }> = ({ theme }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleNext = () => {
    if (carouselRef.current) {
      const cardWidth = 288 + 24;
      carouselRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, personalizedDeals.length - 4);
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const handlePrev = () => {
    if (carouselRef.current) {
      const cardWidth = 288 + 24;
      carouselRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, personalizedDeals.length - 4);
      return prev <= 0 ? maxIndex : prev - 1;
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section id="just-for-you" className="py-16 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <h2 className={`text-2xl md:text-3xl font-bold ${theme.colors.textMain}`}>
              Само за теб
            </h2>
            <button
              className={`p-1.5 rounded-full hover:bg-white/10 transition-colors ${theme.colors.textMuted} hover:${theme.colors.accent}`}
              title="За тези оферти"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>

          {personalizedDeals.length > 4 && (
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className={`p-2 rounded-full border transition-all hover:scale-110 ${theme.colors.cardBg} ${theme.colors.cardBorder} ${theme.colors.textMain} hover:text-cyan-400`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className={`p-2 rounded-full border transition-all hover:scale-110 ${theme.colors.cardBg} ${theme.colors.cardBorder} ${theme.colors.textMain} hover:text-cyan-400`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        <div className="relative">
          <div
            ref={carouselRef}
            className={`flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth py-6 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {personalizedDeals.map((deal) => (
              <div
                key={deal.id}
                className={`flex-shrink-0 w-56 rounded-xl border transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:-translate-y-1 hover:border-cyan-400/50 group relative ${theme.colors.cardBg} ${theme.colors.cardBorder} backdrop-blur-sm flex flex-col overflow-visible select-none`}
              >
                <div className={`px-3 pt-2.5 pb-2 ${theme.colors.textMuted} text-[10px]`}>
                  <div className="flex items-start gap-1.5">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${theme.id === 'light' ? 'bg-slate-200' : 'bg-slate-700'}`}>
                      <User className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col justify-center h-9">
                      <span className="text-[10px] leading-tight">Намерено от {deal.foundBy}</span>
                      <span className="text-[10px] leading-tight">{deal.foundDate}</span>
                    </div>
                  </div>
                </div>

                <div className="relative h-40 bg-slate-800 overflow-hidden mx-2 rounded-lg">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                  />
                  {deal.isHot && (
                    <div className="absolute top-2 right-2">
                      <Flame className="w-4 h-4 text-red-500 fill-red-500 drop-shadow-lg" />
                    </div>
                  )}
                  <div className="absolute top-2 left-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-cyan-500/90 text-white backdrop-blur-sm shadow-md">
                      За теб
                    </span>
                  </div>
                </div>

                <div className="p-3 flex flex-col flex-grow">
                  <h3 className={`font-semibold text-xs mb-2 min-h-[3rem] line-clamp-3 leading-relaxed ${theme.colors.textMain}`}>
                    {deal.title}
                  </h3>

                  <div className="mb-1.5">
                    <div className="flex items-baseline gap-1.5">
                      <span className={`text-base font-bold ${theme.colors.textMain}`}>{deal.price}</span>
                      <span className={`text-xs line-through ${theme.colors.textMuted}`}>{deal.oldPrice}</span>
                      {deal.isHot && <Flame className="w-3.5 h-3.5 text-red-500 fill-red-500" />}
                    </div>
                  </div>

                  <div className="mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-medium text-red-500">{deal.discount}</span>
                      {deal.extraInfo && (
                        <span className={`text-[10px] ${theme.colors.textMuted} truncate`}>{deal.extraInfo}</span>
                      )}
                    </div>
                  </div>

                  <div className={`flex items-center gap-1 mb-2 text-[10px] ${theme.colors.textMuted}`}>
                    <Store className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{deal.store}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-500/20 mt-auto">
                    <div className="flex items-center gap-3">
                      <button className={`flex items-center gap-1 ${theme.colors.textMuted} hover:text-cyan-400 transition-colors`}>
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span className="text-[10px]">{deal.likes}</span>
                      </button>
                      <button className={`flex items-center gap-1 ${theme.colors.textMuted} hover:text-cyan-400 transition-colors`}>
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span className="text-[10px]">{deal.comments}</span>
                      </button>
                    </div>
                    <button className={`${theme.colors.textMuted} hover:text-cyan-400 transition-colors`}>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[0.5px]"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
