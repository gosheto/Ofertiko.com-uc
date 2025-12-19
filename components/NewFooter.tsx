import React from 'react';
import { Twitter, Instagram, Github, Heart, Hammer } from 'lucide-react';
import { Theme } from '../types';
import { FONTS } from '../data/fonts';
import { OfertikoLogo } from './OfertikoLogo';

export const NewFooter: React.FC<{ theme: Theme }> = ({ theme }) => {
  return (
    <footer className={`pt-16 pb-8 border-t backdrop-blur-md z-10 gravity-target ${theme.colors.divider} ${theme.colors.background}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">

          <div className="col-span-2 md:col-span-1 gravity-target">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                <OfertikoLogo theme={theme} className="w-full h-full" animated={false} />
              </div>
              <div
                className={`flex items-center text-xl font-bold ${theme.colors.textMain}`}
                style={{ fontFamily: FONTS.bricolage }}
              >
                <span>Ofertiko<span className="text-cyan-500">.com</span></span>
              </div>
            </div>
            <p className={`text-sm mb-4 ${theme.colors.textMuted}`}>
              Вашият интелигентен помощник за пазаруване. Сравнявайте цени, следете промоции и пестете време.
            </p>
            <div className="flex gap-4">
              <a href="#" className={`${theme.colors.textMuted} hover:text-cyan-500 transition-colors`}><Twitter className="w-5 h-5" /></a>
              <a href="#" className={`${theme.colors.textMuted} hover:text-pink-500 transition-colors`}><Instagram className="w-5 h-5" /></a>
              <a href="#" className={`${theme.colors.textMuted} hover:${theme.colors.textMain} transition-colors`}><Github className="w-5 h-5" /></a>
            </div>
          </div>

          <div className="gravity-target">
            <h4 className={`font-bold mb-4 ${theme.colors.textMain}`}>Продукт</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className={`${theme.colors.textSecondary} hover:${theme.colors.accent}`}>Всички Оферти</a></li>
              <li><a href="#" className={`${theme.colors.textSecondary} hover:${theme.colors.accent}`}>Категории</a></li>
              <li><a href="#" className={`${theme.colors.textSecondary} hover:${theme.colors.accent}`}>Магазини</a></li>
              <li><a href="#" className={`${theme.colors.textSecondary} hover:${theme.colors.accent}`}>Мобилно Приложение</a></li>
            </ul>
          </div>

          <div className="gravity-target">
            <h4 className={`font-bold mb-4 ${theme.colors.textMain}`}>Компания</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className={`${theme.colors.textSecondary} hover:${theme.colors.accent}`}>За Нас</a></li>
              <li><a href="#" className={`${theme.colors.textSecondary} hover:${theme.colors.accent}`}>Кариери</a></li>
              <li><a href="#" className={`${theme.colors.textSecondary} hover:${theme.colors.accent}`}>Контакти</a></li>
              <li><a href="#" className={`${theme.colors.textSecondary} hover:${theme.colors.accent}`}>Партньори</a></li>
            </ul>
          </div>

          <div className="gravity-target">
            <h4 className={`font-bold mb-4 ${theme.colors.textMain}`}>Помощ</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className={`${theme.colors.textSecondary} hover:${theme.colors.accent}`}>Чести въпроси</a></li>
              <li><a href="#" className={`${theme.colors.textSecondary} hover:${theme.colors.accent}`}>Условия за ползване</a></li>
              <li><a href="#" className={`${theme.colors.textSecondary} hover:${theme.colors.accent}`}>Политика за поверителност</a></li>
            </ul>
          </div>

        </div>

        <div className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 ${theme.colors.divider}`}>
          <div className={`flex items-center gap-2 text-sm ${theme.colors.textMuted}`}>
            <span>&copy; {new Date().getFullYear()} ofertiko.com. Всички права запазени.</span>
          </div>
          <div className={`flex items-center gap-1 text-xs ${theme.colors.textMuted}`}>
            <span className="bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 text-transparent bg-clip-text font-bold">Made with</span>
            <Heart className="w-3 h-3 mx-1 text-red-500 fill-red-500" />
            <Hammer className="w-3 h-3 mx-1" />
            <span>by AI & Humans</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
