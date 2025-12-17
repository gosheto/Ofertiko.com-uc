import React, { useState, useRef } from 'react';
import { Theme } from '../types';
import { partners } from '../data/partners';

export const PopularPartnersSection: React.FC<{ theme: Theme }> = ({ theme }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragY, setDragY] = useState(0);

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setDragY(clientY);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (dragY === 0) return;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const diff = dragY - clientY;

    if (Math.abs(diff) > 30) {
      if (diff > 0) {
        setActiveIndex(prev => Math.min(prev + 1, partners.length - 1));
      } else {
        setActiveIndex(prev => Math.max(prev - 1, 0));
      }
      setDragY(clientY);
    }
  };

  const handleTouchEnd = () => {
    setDragY(0);
  };

  return (
    <section id="partners" className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 gravity-target">
          <h2 className={`text-3xl md:text-4xl font-bold ${theme.colors.textMain} mb-4`}>
            Разгледай нашите <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">най-популярни партньори</span>
          </h2>
          <p className={`max-w-2xl mx-auto ${theme.colors.textSecondary} text-lg`}>
            Приготви се за големи спестявания с отстъпки и кешбек от любимите ти международни марки.
          </p>
        </div>

        <div className="hidden md:grid grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {partners.map((partner, index) => (
            <div
              key={index}
              className={`gravity-target group flex flex-row items-center justify-start p-2 rounded-lg border transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-md cursor-pointer ${theme.colors.cardBg} ${theme.colors.cardBorder} hover:border-cyan-400/30`}
            >
              <div className={`w-8 h-8 mr-3 rounded-md bg-white p-1 flex-shrink-0 flex items-center justify-center shadow-sm overflow-hidden transition-transform group-hover:scale-110`}>
                <img
                  src={`https://logo.clearbit.com/${partner.domain}`}
                  alt={partner.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="text-[10px] font-bold text-slate-900">${partner.name.substring(0, 2).toUpperCase()}</span>`;
                  }}
                />
              </div>
              <span className={`text-xs font-bold text-left truncate ${theme.colors.textMain} group-hover:text-cyan-400 transition-colors`}>
                {partner.name}
              </span>
            </div>
          ))}
        </div>

        <div
          className="md:hidden relative h-[300px] w-full perspective-1000 touch-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleTouchStart}
          onMouseMove={handleTouchMove}
          onMouseUp={handleTouchEnd}
          onMouseLeave={handleTouchEnd}
        >
          {partners.map((partner, index) => {
            const offset = index - activeIndex;
            const isActive = offset === 0;

            if (Math.abs(offset) > 3) return null;

            let transform = '';
            let zIndex = 0;
            let opacity = 0;

            if (offset === 0) {
              transform = 'translateY(0) scale(1) rotateX(0deg)';
              zIndex = 50;
              opacity = 1;
            } else if (offset > 0) {
              transform = `translateY(${offset * 40}px) scale(${1 - offset * 0.05}) rotateX(-${offset * 5}deg)`;
              zIndex = 50 - offset;
              opacity = 1 - offset * 0.2;
            } else {
              transform = `translateY(${offset * 40}px) scale(${1 + offset * 0.05}) rotateX(${offset * 5}deg)`;
              zIndex = 50 + offset;
              opacity = 1 + offset * 0.2;
            }

            return (
              <div
                key={index}
                className={`absolute left-0 right-0 mx-auto w-[80%] h-20 p-4 rounded-xl border shadow-xl transition-all duration-500 ease-out flex items-center gap-4 ${theme.colors.cardBg} ${theme.colors.cardBorder} backdrop-blur-md`}
                style={{
                  top: '40%',
                  transform: `${transform} translateZ(0)`,
                  zIndex,
                  opacity: Math.max(0, opacity),
                  marginTop: '-40px'
                }}
              >
                <div className={`w-10 h-10 rounded-lg bg-white p-1.5 flex-shrink-0 flex items-center justify-center shadow-sm overflow-hidden`}>
                  <img
                    src={`https://logo.clearbit.com/${partner.domain}`}
                    alt={partner.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="text-xs font-bold text-slate-900">${partner.name.substring(0, 2).toUpperCase()}</span>`;
                    }}
                  />
                </div>
                <span className={`text-lg font-bold ${theme.colors.textMain}`}>
                  {partner.name}
                </span>
                {isActive && <div className="ml-auto text-cyan-400 animate-pulse">●</div>}
              </div>
            );
          })}

          <div className={`absolute bottom-4 left-0 right-0 text-center text-xs ${theme.colors.textMuted} animate-pulse`}>
            Плъзнете нагоре/надолу
          </div>
        </div>

        <div className="mt-10 text-center">
          <button className={`px-8 py-3 rounded-full font-bold text-white shadow-lg transition-all hover:scale-105 active:scale-95 ${theme.colors.buttonGradient}`}>
            Виж всички партньори
          </button>
        </div>
      </div>
    </section>
  );
};
