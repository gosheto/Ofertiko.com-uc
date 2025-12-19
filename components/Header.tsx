import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { Theme } from '../types';
import { FONTS } from '../data/fonts';
import { OfertikoLogo } from './OfertikoLogo';

// --- HEADER COMPONENT ---
export const Header: React.FC<{ theme: Theme; scrollY: number }> = ({ theme, scrollY }) => {
  const isScrolled = scrollY > 20;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const navLinkClass = `text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 ${theme.colors.textSecondary} hover:bg-white/10 hover:text-cyan-400 hover:shadow-[0_0_10px_rgba(34,211,238,0.2)]`;
  const activeLinkClass = `text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 bg-white/10 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.2)]`;

  // Smooth scroll handler
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();

    if (targetId === '#') {
      // Scroll to top for home
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsMobileMenuOpen(false);
      return;
    }

    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['features', 'deals', 'just-for-you', 'partners'];
      const scrollPosition = window.scrollY + 200; // Offset for header

      // Check each section from bottom to top to get the most accurate one
      let foundSection = '';

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = window.scrollY + rect.top;

          // If we've scrolled past the start of this section
          if (scrollPosition >= elementTop) {
            foundSection = sectionId;
          }
        }
      }

      setActiveSection(foundSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 gravity-target ${isScrolled
        ? `backdrop-blur-lg border-b ${theme.colors.cardBg} ${theme.colors.divider} shadow-lg`
        : 'bg-transparent border-b border-transparent py-4'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 relative">

          {/* Brand */}
          <div className="flex items-center gap-3 cursor-pointer group gravity-target">
            <div className="relative w-12 h-12">
              <OfertikoLogo theme={theme} className="w-full h-full" animated={false} />
            </div>
            <div
              className={`flex items-center text-2xl font-bold tracking-tight transition-all duration-300 group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] ${theme.colors.textMain}`}
              style={{ fontFamily: FONTS.bricolage }}
            >
              <span>Ofertiko<span className="text-cyan-500">.com</span></span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 gravity-target">
            <a href="#" onClick={(e) => handleSmoothScroll(e, '#')} className={navLinkClass}>Начало</a>
            <a href="#features" onClick={(e) => handleSmoothScroll(e, '#features')} className={activeSection === 'features' ? activeLinkClass : navLinkClass}>Как работи</a>
            <a href="#deals" onClick={(e) => handleSmoothScroll(e, '#deals')} className={activeSection === 'deals' ? activeLinkClass : navLinkClass}>Оферти</a>
            <a href="#just-for-you" onClick={(e) => handleSmoothScroll(e, '#just-for-you')} className={activeSection === 'just-for-you' ? activeLinkClass : navLinkClass}>Само за теб</a>
            <a href="#partners" onClick={(e) => handleSmoothScroll(e, '#partners')} className={activeSection === 'partners' ? activeLinkClass : navLinkClass}>Партньори</a>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4 gravity-target">
            <button className={`text-sm font-medium px-4 py-2 rounded-lg border transition-colors hover:bg-white/5 ${theme.colors.textMain} ${theme.colors.cardBorder}`}>
              Вход
            </button>
            <button className={`text-sm font-medium px-4 py-2 rounded-lg text-white shadow-lg hover:opacity-90 transition-opacity ${theme.colors.buttonGradient}`}>
              Регистрация
            </button>
          </div>

          {/* Mobile Toggle (Hamburger) with Animation */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg z-50 relative transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''} ${theme.colors.textMain}`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Full Screen Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className={`md:hidden fixed inset-0 h-[100dvh] z-40 flex flex-col pt-24 px-6 backdrop-blur-xl animate-in slide-in-from-top-5 duration-300 overflow-y-auto ${theme.colors.background}`}>
          <div className="space-y-6 flex flex-col">
            <a href="#" onClick={(e) => handleSmoothScroll(e, '#')} className={`text-2xl font-bold animate-in fade-in slide-in-from-left-4 delay-100 ${theme.colors.textMain}`}>Начало</a>
            <a href="#features" onClick={(e) => handleSmoothScroll(e, '#features')} className={`text-2xl font-bold animate-in fade-in slide-in-from-left-4 delay-150 ${theme.colors.textSecondary}`}>Как работи</a>
            <a href="#deals" onClick={(e) => handleSmoothScroll(e, '#deals')} className={`text-2xl font-bold animate-in fade-in slide-in-from-left-4 delay-200 ${theme.colors.textSecondary}`}>Оферти</a>
            <a href="#just-for-you" onClick={(e) => handleSmoothScroll(e, '#just-for-you')} className={`text-2xl font-bold animate-in fade-in slide-in-from-left-4 delay-250 ${theme.colors.textSecondary}`}>Само за теб</a>
            <a href="#partners" onClick={(e) => handleSmoothScroll(e, '#partners')} className={`text-2xl font-bold animate-in fade-in slide-in-from-left-4 delay-300 ${theme.colors.textSecondary}`}>Партньори</a>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-500/30 to-transparent my-4"></div>

            <button className={`w-full py-4 text-lg rounded-xl border font-medium animate-in fade-in slide-in-from-bottom-4 delay-300 ${theme.colors.textMain} ${theme.colors.cardBorder}`}>Вход</button>
            <button className={`w-full py-4 text-lg rounded-xl font-medium text-white animate-in fade-in slide-in-from-bottom-4 delay-400 ${theme.colors.buttonGradient}`}>Регистрация</button>
          </div>

          {/* Decoration */}
          <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-cyan-500/10 to-transparent pointer-events-none"></div>
        </div>
      )}
    </header>
  );
};
