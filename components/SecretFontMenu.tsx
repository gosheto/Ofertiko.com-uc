import React from 'react';
import { Type, X, Check, ArrowDown } from 'lucide-react';
import { Theme } from '../types';
import { FONTS } from '../data/fonts';

export const SecretFontMenu: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  currentFont: string;
  onFontChange: (font: string) => void;
  theme: Theme;
  onGravityToggle: () => void;
}> = ({ isOpen, onClose, currentFont, onFontChange, theme, onGravityToggle }) => {
  if (!isOpen) return null;

  const fontOptions = [
    { name: 'Inter (Стандартен)', value: FONTS.inter },
    { name: 'Apple System (SF)', value: FONTS.apple },
    { name: 'Satoshi (Geometric)', value: FONTS.satoshi },
    { name: 'Roboto (Google)', value: FONTS.roboto },
    { name: 'Manrope (Modern)', value: FONTS.manrope },
    { name: 'Bricolage (Grotesque)', value: FONTS.bricolage },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className={`w-80 rounded-2xl p-6 shadow-2xl border animate-in zoom-in-95 duration-200 ${theme.colors.cardBg} ${theme.colors.cardBorder}`}>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Type className={`w-5 h-5 ${theme.colors.accent}`} />
            <h3 className={`text-lg font-bold ${theme.colors.textMain}`}>Тайни Настройки</h3>
          </div>
          <button onClick={onClose} className={`p-1 rounded-lg hover:bg-white/10 ${theme.colors.textSecondary}`}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className={`text-sm mb-4 ${theme.colors.textMuted}`}>Избери шрифт на сайта:</p>
        <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar mb-6">
          {fontOptions.map((font) => (
            <button
              key={font.name}
              onClick={() => onFontChange(font.value)}
              className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${currentFont === font.value
                ? `border-cyan-500 bg-cyan-500/10 ${theme.colors.textMain}`
                : `${theme.colors.cardBorder} hover:bg-white/5 ${theme.colors.textSecondary}`
                }`}
            >
              <span style={{ fontFamily: font.value }}>{font.name}</span>
              {currentFont === font.value && <Check className="w-4 h-4 text-cyan-500" />}
            </button>
          ))}
        </div>

        <div className="pt-4 border-t border-gray-500/20">
          <button
            onClick={onGravityToggle}
            className={`w-full py-3 rounded-xl font-bold text-white shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-600`}
          >
            <ArrowDown className="w-5 h-5" />
            Gravity Experiment
          </button>
          <p className="text-xs text-center mt-2 opacity-60">Warning: May break the universe.</p>
        </div>
      </div>
    </div>
  );
};
