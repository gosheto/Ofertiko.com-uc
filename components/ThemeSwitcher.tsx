import React, { useState } from 'react';
import { Palette, X, Check, Moon, Sparkles, Sun } from 'lucide-react';
import { Theme } from '../types';
import { themes } from '../data/themes';
import { BACKGROUNDS } from '../data/backgrounds';

export const ThemeSwitcher: React.FC<{
  currentTheme: Theme,
  onThemeChange: (t: Theme) => void,
  scrollY: number,
  backgroundMode: string,
  onBackgroundChange: (bg: string) => void,
  radiusMode: string,
  onRadiusChange: (mode: string) => void
}> = ({ currentTheme, onThemeChange, scrollY, backgroundMode, onBackgroundChange, radiusMode, onRadiusChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isDocked = scrollY > 50;

  return (
    <div
      className="fixed z-[60] transition-all duration-500 ease-in-out"
      style={{
        top: isDocked ? '0.6rem' : '6rem',
      }}
    >
      <div
        className={`
           fixed transition-all duration-500
           right-[60px] md:right-6
         `}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 ${currentTheme.colors.cardBg} ${currentTheme.colors.cardBorder} border backdrop-blur-md`}
        >
          <Palette className={`w-5 h-5 ${currentTheme.colors.textMain}`} />
        </button>

        {isOpen && (
          <>
            {/* Mobile version - modal style like SecretFontMenu */}
            <div className="md:hidden fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
              <div className={`w-80 rounded-2xl p-6 shadow-2xl border animate-in zoom-in-95 duration-200 ${currentTheme.colors.cardBg} ${currentTheme.colors.cardBorder} max-h-[90vh] overflow-y-auto`}>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <Palette className={`w-5 h-5 ${currentTheme.colors.accent}`} />
                    <h3 className={`text-lg font-bold ${currentTheme.colors.textMain}`}>Настройки на темата</h3>
                  </div>
                  <button onClick={() => setIsOpen(false)} className={`p-1 rounded-lg hover:bg-white/10 ${currentTheme.colors.textSecondary}`}>
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Themes List */}
                <div className="mb-6">
                  <p className={`text-sm mb-4 ${currentTheme.colors.textMuted}`}>Избери тема:</p>
                  <div className="space-y-2">
                    {themes.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          onThemeChange(t);
                          setIsOpen(false);
                        }}
                        className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${currentTheme.id === t.id
                          ? `border-cyan-500 bg-cyan-500/10 ${currentTheme.colors.textMain}`
                          : `${currentTheme.colors.cardBorder} hover:bg-white/5 ${currentTheme.colors.textSecondary}`
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          {t.id === 'dark' && <Moon className="w-4 h-4" />}
                          {t.id === 'midnight' && <Sparkles className="w-4 h-4" />}
                          {t.id === 'light' && <Sun className="w-4 h-4" />}
                          {t.id === 'pastel' && (
                            <div className="w-4 h-4 rounded overflow-hidden flex flex-col border border-gray-300/50 opacity-80">
                              <div className="h-1 bg-[#738A94] w-full"></div>
                              <div className="h-1 bg-[#E7DACB] w-full"></div>
                              <div className="h-1 bg-[#DFB446] w-full"></div>
                              <div className="h-1 bg-[#C26D54] w-full"></div>
                            </div>
                          )}
                          {t.id === 'classic' && (
                            <div className="w-4 h-4 rounded overflow-hidden flex flex-col border border-gray-300/50 opacity-90">
                              <div className="h-1 bg-[#DC2626] w-full"></div>
                              <div className="h-1 bg-[#000000] w-full"></div>
                              <div className="h-1 bg-[#FFFFFF] w-full"></div>
                              <div className="h-1 bg-[#003399] w-full"></div>
                            </div>
                          )}
                          <span>{t.label}</span>
                        </div>
                        {currentTheme.id === t.id && <Check className="w-4 h-4 text-cyan-500" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Radius (Corner) Style Switcher */}
                <div className="mb-6 pt-4 border-t border-gray-500/20">
                  <p className={`text-sm mb-4 ${currentTheme.colors.textMuted}`}>Дизайн на ъглите:</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => onRadiusChange('rounded')}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${radiusMode === 'rounded'
                        ? 'border-cyan-500 bg-cyan-500/10 text-cyan-500'
                        : `${currentTheme.colors.cardBorder} hover:bg-white/5`
                        }`}
                    >
                      <div className={`w-10 h-10 rounded-xl border-2 ${radiusMode === 'rounded' ? 'border-cyan-500' : 'border-gray-400'}`}></div>
                      <span className={`text-sm ${currentTheme.colors.textSecondary}`}>Заоблен</span>
                    </button>
                    <button
                      onClick={() => onRadiusChange('square')}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${radiusMode === 'square'
                        ? 'border-cyan-500 bg-cyan-500/10 text-cyan-500'
                        : `${currentTheme.colors.cardBorder} hover:bg-white/5`
                        }`}
                    >
                      <div className={`w-10 h-10 rounded-none border-2 ${radiusMode === 'square' ? 'border-cyan-500' : 'border-gray-400'}`}></div>
                      <span className={`text-sm ${currentTheme.colors.textSecondary}`}>Квадратен</span>
                    </button>
                  </div>
                </div>

                {/* Background Switcher */}
                <div className="pt-4 border-t border-gray-500/20">
                  <p className={`text-sm mb-4 ${currentTheme.colors.textMuted}`}>Фон на сайта:</p>
                  <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto custom-scrollbar">
                    {Object.entries(BACKGROUNDS).map(([key, url]) => (
                      <button
                        key={key}
                        onClick={() => onBackgroundChange(key)}
                        className={`w-full aspect-square rounded-md border-2 transition-all flex items-center justify-center relative overflow-hidden ${backgroundMode === key ? 'border-cyan-500' : 'border-transparent hover:border-gray-400'
                          }`}
                        title={key}
                      >
                        {key === 'solid' ? (
                          <div className={`w-full h-full ${currentTheme.id === 'light' ? 'bg-slate-100' : 'bg-slate-800'}`}></div>
                        ) : (
                          <img src={url} alt={key} className="w-full h-full object-cover" />
                        )}
                        {backgroundMode === key && <div className="absolute inset-0 flex items-center justify-center bg-black/20"><Check className="w-4 h-4 text-white drop-shadow-md" /></div>}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop version - transparent cardBg */}
            <div className={`hidden md:block absolute right-0 mt-2 w-64 rounded-xl border shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 ${currentTheme.colors.cardBorder} backdrop-blur-md ${currentTheme.colors.cardBg}`}>
              {/* Themes List */}
              <div className="p-2 border-b border-slate-500/20">
                <p className={`text-xs font-bold uppercase px-3 py-1 mb-1 ${currentTheme.colors.textMuted}`}>Тема</p>
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      onThemeChange(t);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${currentTheme.id === t.id
                      ? 'bg-indigo-500/10 text-indigo-500'
                      : `${t.colors.textSecondary} hover:bg-slate-500/10`
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      {t.id === 'dark' && <Moon className="w-4 h-4" />}
                      {t.id === 'midnight' && <Sparkles className="w-4 h-4" />}
                      {t.id === 'light' && <Sun className="w-4 h-4" />}
                      {t.id === 'pastel' && (
                        <div className="w-4 h-4 rounded overflow-hidden flex flex-col border border-gray-300/50 opacity-80">
                          <div className="h-1 bg-[#738A94] w-full"></div>
                              <div className="h-1 bg-[#E7DACB] w-full"></div>
                              <div className="h-1 bg-[#DFB446] w-full"></div>
                              <div className="h-1 bg-[#C26D54] w-full"></div>
                        </div>
                      )}
                      {t.id === 'classic' && (
                        <div className="w-4 h-4 rounded overflow-hidden flex flex-col border border-gray-300/50 opacity-90">
                          <div className="h-1 bg-[#DC2626] w-full"></div>
                          <div className="h-1 bg-[#000000] w-full"></div>
                          <div className="h-1 bg-[#FFFFFF] w-full"></div>
                          <div className="h-1 bg-[#003399] w-full"></div>
                        </div>
                      )}
                      <span>{t.label}</span>
                    </div>
                    {currentTheme.id === t.id && <Check className="w-3 h-3" />}
                  </button>
                ))}
              </div>

              {/* Radius (Corner) Style Switcher */}
              <div className="p-2 border-b border-slate-500/20">
                <p className={`text-xs font-bold uppercase px-3 py-1 mb-2 ${currentTheme.colors.textMuted}`}>Дизайн на ъглите</p>
                <div className="grid grid-cols-2 gap-2 px-1">
                  <button
                    onClick={() => onRadiusChange('rounded')}
                    className={`flex flex-col items-center gap-1 p-2 rounded-lg border transition-all ${radiusMode === 'rounded'
                      ? 'border-cyan-500 bg-cyan-500/10 text-cyan-500'
                      : 'border-transparent hover:bg-slate-500/10'
                      }`}
                  >
                    <div className={`w-8 h-8 rounded-xl border-2 ${radiusMode === 'rounded' ? 'border-cyan-500' : 'border-gray-400'}`}></div>
                    <span className={`text-xs ${currentTheme.colors.textSecondary}`}>Заоблен</span>
                  </button>
                  <button
                    onClick={() => onRadiusChange('square')}
                    className={`flex flex-col items-center gap-1 p-2 rounded-lg border transition-all ${radiusMode === 'square'
                      ? 'border-cyan-500 bg-cyan-500/10 text-cyan-500'
                      : 'border-transparent hover:bg-slate-500/10'
                      }`}
                  >
                    <div className={`w-8 h-8 rounded-none border-2 ${radiusMode === 'square' ? 'border-cyan-500' : 'border-gray-400'}`}></div>
                    <span className={`text-xs ${currentTheme.colors.textSecondary}`}>Квадратен</span>
                  </button>
                </div>
              </div>

              {/* Background Switcher */}
              <div className="p-2 bg-black/5">
                <p className={`text-xs font-bold uppercase px-3 py-1 mb-2 ${currentTheme.colors.textMuted}`}>Фон на сайта</p>
                <div className="grid grid-cols-4 gap-2 px-1 max-h-64 overflow-y-auto custom-scrollbar">
                  {Object.entries(BACKGROUNDS).map(([key, url]) => (
                    <button
                      key={key}
                      onClick={() => onBackgroundChange(key)}
                      className={`w-full aspect-square rounded-md border-2 transition-all flex items-center justify-center relative overflow-hidden ${backgroundMode === key ? 'border-cyan-500' : 'border-transparent hover:border-gray-400'
                        }`}
                      title={key}
                    >
                      {key === 'solid' ? (
                        <div className={`w-full h-full ${currentTheme.id === 'light' ? 'bg-slate-100' : 'bg-slate-800'}`}></div>
                      ) : (
                        <img src={url} alt={key} className="w-full h-full object-cover" />
                      )}
                      {backgroundMode === key && <div className="absolute inset-0 flex items-center justify-center bg-black/20"><Check className="w-4 h-4 text-white drop-shadow-md" /></div>}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
