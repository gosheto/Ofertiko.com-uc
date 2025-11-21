
import React, { useState, useEffect, useRef } from 'react';
import { Hammer, Mail, ArrowRight, Github, Twitter, Instagram, AlertCircle, Palette, Check, Sun, Moon, Sparkles, Type, X, Loader2, Menu, Zap, Search, ShieldCheck, ShoppingBag, Tag, ExternalLink, ChevronRight, ChevronLeft, BarChart3, Bell, Smartphone, Watch, Monitor, Headphones, Heart, Home, Trophy, Star, Store, Image as ImageIcon, Square, Circle, ArrowDown, ThumbsUp, MessageCircle, Share2, Info, Flame, User } from 'lucide-react';
import Countdown from './components/Countdown';
import AiForeman from './components/AiForeman';
import { Theme } from './types';

// --- THEME DEFINITIONS ---

const darkTheme: Theme = {
  id: 'dark',
  label: 'Тъмен Режим',
  colors: {
    background: 'bg-slate-950',
    textMain: 'text-white',
    textSecondary: 'text-slate-300',
    textMuted: 'text-slate-400',
    cardBg: 'bg-slate-900/40',
    cardBorder: 'border-slate-800',
    inputBg: 'bg-slate-800',
    inputBorder: 'border-slate-700',
    accent: 'text-cyan-400',
    buttonGradient: 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-indigo-900/20',
    divider: 'border-slate-800',
  }
};

const midnightTheme: Theme = {
  id: 'midnight',
  label: 'Неон',
  colors: {
    background: 'bg-indigo-950',
    textMain: 'text-indigo-50',
    textSecondary: 'text-indigo-200',
    textMuted: 'text-indigo-400',
    cardBg: 'bg-black/40',
    cardBorder: 'border-indigo-500/30',
    inputBg: 'bg-indigo-900/40',
    inputBorder: 'border-indigo-500/40',
    accent: 'text-fuchsia-400',
    buttonGradient: 'bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 shadow-fuchsia-900/40',
    divider: 'border-indigo-900',
  }
};

const lightTheme: Theme = {
  id: 'light',
  label: 'Дневен Режим',
  colors: {
    background: 'bg-slate-50',
    textMain: 'text-slate-900',
    textSecondary: 'text-slate-600',
    textMuted: 'text-slate-500',
    cardBg: 'bg-white/70',
    cardBorder: 'border-slate-200',
    inputBg: 'bg-white',
    inputBorder: 'border-slate-300',
    accent: 'text-cyan-600',
    buttonGradient: 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-cyan-500/20',
    divider: 'border-slate-200',
  }
};

const pastelTheme: Theme = {
  id: 'pastel',
  label: 'Пастел',
  colors: {
    // Background based on the Beige/Cream color #E7DACB, but lighter for readability
    background: 'bg-[#F5F0EB]',
    // Text based on the Blue-Grey #738A94 but darker
    textMain: 'text-[#4A5D6B]',
    textSecondary: 'text-[#738A94]',
    textMuted: 'text-[#9BAdb6]',
    // Card bg based on Beige
    cardBg: 'bg-[#FFFFFF]/60',
    cardBorder: 'border-[#E7DACB]',
    inputBg: 'bg-[#FFFFFF]',
    inputBorder: 'border-[#738A94]/30',
    // Accent based on Terracotta #C26D54
    accent: 'text-[#C26D54]',
    // Gradient from Mustard #DFB446 to Terracotta #C26D54
    buttonGradient: 'bg-gradient-to-r from-[#DFB446] to-[#C26D54] hover:from-[#EBC55E] hover:to-[#D67E65] shadow-[#C26D54]/20',
    divider: 'border-[#E7DACB]',
  }
};

const classicTheme: Theme = {
  id: 'classic',
  label: 'Класик',
  colors: {
    // Clean White/Light Gray background
    background: 'bg-[#F3F4F6]',
    // High contrast Black text
    textMain: 'text-[#111111]',
    textSecondary: 'text-[#374151]',
    textMuted: 'text-[#6B7280]',
    // White cards with clean borders
    cardBg: 'bg-white',
    cardBorder: 'border-gray-200',
    inputBg: 'bg-white',
    inputBorder: 'border-gray-300',
    // Red Accent (Top Stripe)
    accent: 'text-[#DC2626]',
    // Gradient from Blue (Bottom Stripe) to Red (Top Stripe)
    buttonGradient: 'bg-gradient-to-r from-[#003399] to-[#DC2626] hover:from-[#002288] hover:to-[#B91C1C] shadow-blue-900/20',
    divider: 'border-gray-200',
  }
};

const themes = [darkTheme, midnightTheme, lightTheme, pastelTheme, classicTheme];

// --- BACKGROUND DEFINITIONS ---
const BACKGROUNDS = {
  solid: 'solid',
  tech: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
  mesh: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2070&auto=format&fit=crop',
  geo: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop',
  sky: 'https://images.unsplash.com/photo-1579033461380-adb47c3eb938?q=80&w=2064&auto=format&fit=crop', // Pastel Sky
  rain: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=2070&auto=format&fit=crop', // Rain
  neon: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2070&auto=format&fit=crop', // Neon
  bg1: '/assets/backgrounds/bg-1.jpg',
  bg2: '/assets/backgrounds/bg-2.jpg',
  bg3: '/assets/backgrounds/bg-3.jpg',
  bg4: '/assets/backgrounds/bg-4.jpg',
  bg5: '/assets/backgrounds/bg-5.jpg',
};

// --- FONT DEFINITIONS ---

const FONTS = {
  inter: "'Inter', sans-serif",
  apple: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
  satoshi: "'Satoshi', sans-serif",
  roboto: "'Roboto', sans-serif",
  manrope: "'Manrope', sans-serif",
  bricolage: "'Bricolage Grotesque', sans-serif",
};

// --- REUSABLE LOGO COMPONENT ---

const OfertikoLogo: React.FC<{ theme: Theme; onClick?: () => void; className?: string; animated?: boolean }> = ({ theme, onClick, className = "w-32 h-32", animated = true }) => {
  const isDark = theme.id !== 'light' && theme.id !== 'pastel' && theme.id !== 'classic';

  return (
    <div
      onClick={onClick}
      className={`relative ${className} ${animated ? 'animate-float' : ''} group cursor-pointer select-none active:scale-95 transition-transform`}
    >
      <svg key={theme.id} viewBox="0 0 200 200" className={`w-full h-full transition-transform duration-500 ease-in-out ${animated ? 'group-hover:rotate-6 group-hover:scale-110' : ''} ${isDark ? 'drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]' : 'drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]'}`}>
        <defs>
          {/* Glass Gradient for Head - Increased opacity for brighter look */}
          <linearGradient id={`glass-grad-${theme.id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={isDark ? "rgba(255, 255, 255, 0.25)" : "rgba(255, 255, 255, 0.9)"} />
            <stop offset="50%" stopColor={isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.6)"} />
            <stop offset="100%" stopColor={isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.8)"} />
          </linearGradient>

          {/* Dynamic Sheen Gradient for Moving Reflection */}
          {animated && (
            <linearGradient id={`dynamic-sheen-${theme.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="50%" stopColor="white" stopOpacity={isDark ? "0.15" : "0.4"}>
                <animate attributeName="stop-opacity" values={isDark ? "0.15;0.3;0.15" : "0.4;0.6;0.4"} dur="4s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="white" stopOpacity="0" />

              <animate attributeName="x1" values="-20%; 120%" dur="7s" repeatCount="indefinite" />
              <animate attributeName="y1" values="-20%; 120%" dur="7s" repeatCount="indefinite" />
              <animate attributeName="x2" values="20%; 160%" dur="7s" repeatCount="indefinite" />
              <animate attributeName="y2" values="20%; 160%" dur="7s" repeatCount="indefinite" />
            </linearGradient>
          )}

          {/* Colorful internal reflection with pulsing animation */}
          <linearGradient id={`inner-glow-${theme.id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity={isDark ? "0.4" : "0.5"}>
              {animated && <animate attributeName="stop-color" values="#22d3ee;#ec4899;#a855f7;#22d3ee" dur="6s" repeatCount="indefinite" />}
            </stop>
            <stop offset="50%" stopColor="#a855f7" stopOpacity={isDark ? "0.3" : "0.4"}>
              {animated && <animate attributeName="stop-color" values="#a855f7;#22d3ee;#ec4899;#a855f7" dur="6s" repeatCount="indefinite" />}
            </stop>
            <stop offset="100%" stopColor="#ec4899" stopOpacity={isDark ? "0.4" : "0.5"}>
              {animated && <animate attributeName="stop-color" values="#ec4899;#a855f7;#22d3ee;#ec4899" dur="6s" repeatCount="indefinite" />}
            </stop>
          </linearGradient>
        </defs>

        {/* Antenna */}
        <line x1="100" y1="10" x2="100" y2="50" stroke="#a855f7" strokeWidth="4" strokeLinecap="round" />
        <circle cx="100" cy="10" r="6" fill="#ec4899" className={animated ? "animate-pulse" : ""}>
          {animated && <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />}
        </circle>

        {/* Head Shape (Squircle) */}
        <rect
          x="30" y="40" width="140" height="130" rx="40"
          fill={`url(#glass-grad-${theme.id})`}
          stroke={`url(#inner-glow-${theme.id})`}
          strokeWidth="3"
          className="backdrop-blur-md"
        />

        {/* Sheen Overlay */}
        {animated && (
          <rect
            x="30" y="40" width="140" height="130" rx="40"
            fill={`url(#dynamic-sheen-${theme.id})`}
            pointerEvents="none"
          />
        )}

        {/* Internal Reflection Highlight */}
        <path d="M 40 80 Q 50 50 80 45" stroke={isDark ? "white" : "#1e293b"} strokeWidth="2" strokeOpacity="0.5" fill="none" />

        {/* Eyes */}
        <g className={animated ? "animate-blink" : ""}>
          <ellipse cx="75" cy="95" rx="10" ry="12" fill={isDark ? "white" : "#1e293b"} filter={isDark ? "drop-shadow(0 0 5px #22d3ee)" : ""} />
          <ellipse cx="125" cy="95" rx="10" ry="12" fill={isDark ? "white" : "#1e293b"} filter={isDark ? "drop-shadow(0 0 5px #22d3ee)" : ""} />
        </g>

        {/* Cheeks */}
        <circle cx="60" cy="115" r="6" fill="#ec4899" fillOpacity="0.5" />
        <circle cx="140" cy="115" r="6" fill="#ec4899" fillOpacity="0.5" />

        {/* Smile */}
        <path
          d="M 75 130 Q 100 150 125 130"
          stroke={isDark ? "white" : "#1e293b"}
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          strokeOpacity="0.9"
        />
      </svg>
    </div>
  );
};

// --- HEADER COMPONENT ---

const Header: React.FC<{ theme: Theme; onThemeToggle: () => void; scrollY: number }> = ({ theme, onThemeToggle, scrollY }) => {
  const isScrolled = scrollY > 20;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinkClass = `text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 ${theme.colors.textSecondary} hover:bg-white/10 hover:text-cyan-400 hover:shadow-[0_0_10px_rgba(34,211,238,0.2)]`;

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
          <div className="flex items-center gap-2 cursor-pointer group gravity-target">
            <div className="relative w-10 h-10">
              <OfertikoLogo theme={theme} className="w-full h-full" animated={false} />
            </div>
            <div
              className={`flex items-center text-xl font-bold tracking-tight transition-all duration-300 group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] ${theme.colors.textMain}`}
              style={{ fontFamily: FONTS.bricolage }}
            >
              <span>Ofertiko<span className="text-cyan-500">.com</span></span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 gravity-target">
            <a href="#" className={navLinkClass}>Начало</a>
            <a href="#features" className={navLinkClass}>Как работи</a>
            <a href="#deals" className={navLinkClass}>Оферти</a>
            <a href="#contact" className={navLinkClass}>Контакти</a>
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
            <a href="#" onClick={() => setIsMobileMenuOpen(false)} className={`text-2xl font-bold animate-in fade-in slide-in-from-left-4 delay-100 ${theme.colors.textMain}`}>Начало</a>
            <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className={`text-2xl font-bold animate-in fade-in slide-in-from-left-4 delay-150 ${theme.colors.textSecondary}`}>Как работи</a>
            <a href="#deals" onClick={() => setIsMobileMenuOpen(false)} className={`text-2xl font-bold animate-in fade-in slide-in-from-left-4 delay-200 ${theme.colors.textSecondary}`}>Оферти</a>

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

// --- THEME SWITCHER COMPONENT ---
const ThemeSwitcher: React.FC<{
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

// --- SECRET FONT MENU COMPONENT ---
const SecretFontMenu: React.FC<{
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

// --- FEATURES SECTION ---
const FeaturesSection: React.FC<{ theme: Theme }> = ({ theme }) => {
  const features = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "AI Търсене",
      desc: "Интелигентни алгоритми за прецизно намиране на продукти."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "История на Цените",
      desc: "Проследи как се е променяла цената във времето."
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Известия",
      desc: "Получавай сигнал веднага щом цената падне."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Проверени Търговци",
      desc: "Само легитимни магазини с висок рейтинг."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Бързо Сравнение",
      desc: "Сравни оферти от 1000+ магазина с един клик."
    },
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      title: "Умен Кош",
      desc: "Събирай и организирай любимите си находки."
    }
  ];

  return (
    <section id="features" className="py-12 max-w-7xl mx-auto px-4">
      <div className="text-center mb-16 gravity-target">
        <span className={`text-sm font-bold uppercase tracking-widest ${theme.colors.accent} mb-2 block`}>Предимства</span>
        <h2 className={`text-3xl md:text-4xl font-bold ${theme.colors.textMain} mb-4`}>
          Как Ofertiko <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">пести парите ти</span>
        </h2>
        <p className={`max-w-2xl mx-auto ${theme.colors.textSecondary} text-lg`}>
          Нашият AI пазарен асистент използва усъвършенствани алгоритми за намиране на най-добрите оферти, проследяване на цени и известяване за възможности за спестявания.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div key={i} className={`gravity-target group relative p-8 rounded-2xl border backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 ${theme.colors.cardBg} ${theme.colors.cardBorder} hover:border-cyan-400/50 hover:shadow-[0_0_50px_rgba(34,211,238,0.25)] overflow-hidden`}>

            {/* Passing Flash Effect */}
            <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 transition-all duration-1000 group-hover:left-[100%]"></div>

            {/* Enhanced Glow Effect from Alternate Design */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

            {/* Icon Container */}
            <div className={`relative z-10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-lg transition-transform group-hover:scale-110 duration-300 ${theme.id === 'light' ? 'bg-gradient-to-br from-cyan-100 to-blue-50 text-cyan-600' : 'bg-gradient-to-br from-cyan-900/30 to-purple-900/30 text-cyan-400'}`}>
              {f.icon}
            </div>

            <h3 className={`relative z-10 text-xl font-bold mb-3 ${theme.colors.textMain} group-hover:text-cyan-400 transition-colors`}>{f.title}</h3>
            <p className={`relative z-10 ${theme.colors.textSecondary} leading-relaxed`}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// --- POPULAR PARTNERS SECTION ---
const PopularPartnersSection: React.FC<{ theme: Theme }> = ({ theme }) => {
  const partners = [
    { name: "Amazon", domain: "amazon.com" },
    { name: "Nike", domain: "nike.com" },
    { name: "Adidas", domain: "adidas.com" },
    { name: "Apple", domain: "apple.com" },
    { name: "Samsung", domain: "samsung.com" },
    { name: "eBay", domain: "ebay.com" },
    { name: "AliExpress", domain: "aliexpress.com" },
    { name: "Zara", domain: "zara.com" },
    { name: "H&M", domain: "hm.com" },
    { name: "IKEA", domain: "ikea.com" },
    { name: "Sephora", domain: "sephora.com" },
    { name: "Booking", domain: "booking.com" },
    { name: "Airbnb", domain: "airbnb.com" },
    { name: "Uber", domain: "uber.com" },
    { name: "Netflix", domain: "netflix.com" },
    { name: "Spotify", domain: "spotify.com" },
    { name: "Microsoft", domain: "microsoft.com" },
    { name: "Sony", domain: "sony.com" },
    { name: "LG", domain: "lg.com" },
    { name: "Dyson", domain: "dyson.com" },
    { name: "Philips", domain: "philips.com" },
    { name: "Lego", domain: "lego.com" },
    { name: "Puma", domain: "puma.com" },
    { name: "Reebok", domain: "reebok.com" },
    { name: "New Balance", domain: "newbalance.com" },
    { name: "Under Armour", domain: "underarmour.com" },
    { name: "Asics", domain: "asics.com" },
    { name: "The North Face", domain: "thenorthface.com" },
    { name: "Columbia", domain: "columbia.com" },
    { name: "Patagonia", domain: "patagonia.com" },
    { name: "Levi's", domain: "levi.com" },
    { name: "Calvin Klein", domain: "calvinklein.com" },
    { name: "Tommy Hilfiger", domain: "tommy.com" },
    { name: "Ralph Lauren", domain: "ralphlauren.com" },
    { name: "Gucci", domain: "gucci.com" },
    { name: "Prada", domain: "prada.com" },
    { name: "Louis Vuitton", domain: "louisvuitton.com" },
    { name: "Rolex", domain: "rolex.com" },
    { name: "Omega", domain: "omegawatches.com" },
    { name: "Swatch", domain: "swatch.com" },
    { name: "Casio", domain: "casio.com" },
    { name: "Canon", domain: "canon.com" },
    { name: "Nikon", domain: "nikon.com" },
    { name: "GoPro", domain: "gopro.com" },
    { name: "DJI", domain: "dji.com" },
    { name: "Nintendo", domain: "nintendo.com" },
    { name: "PlayStation", domain: "playstation.com" },
    { name: "Xbox", domain: "xbox.com" },
    { name: "Steam", domain: "steampowered.com" },
    { name: "Epic Games", domain: "epicgames.com" },
  ];

  // Mobile 3D Carousel State
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragY, setDragY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setDragY(clientY);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (dragY === 0) return;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const diff = dragY - clientY;

    // Sensitivity threshold
    if (Math.abs(diff) > 30) {
      if (diff > 0) {
        setActiveIndex(prev => Math.min(prev + 1, partners.length - 1));
      } else {
        setActiveIndex(prev => Math.max(prev - 1, 0));
      }
      setDragY(clientY); // Reset drag anchor for continuous scrolling
    }
  };

  const handleTouchEnd = () => {
    setDragY(0);
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 gravity-target">
          <h2 className={`text-3xl md:text-4xl font-bold ${theme.colors.textMain} mb-4`}>
            Разгледай нашите <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">най-популярни партньори</span>
          </h2>
          <p className={`max-w-2xl mx-auto ${theme.colors.textSecondary} text-lg`}>
            Приготви се за големи спестявания с отстъпки и кешбек от любимите ти международни марки.
          </p>
        </div>

        {/* Desktop Grid (Smaller Cards) */}
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

        {/* Mobile 3D Stack Carousel */}
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

            // Only render cards within a visible range to improve performance
            if (Math.abs(offset) > 3) return null;

            let transform = '';
            let zIndex = 0;
            let opacity = 0;

            // 3D Stack Logic (Safari Tabs Style)
            if (offset === 0) {
              transform = 'translateY(0) scale(1) rotateX(0deg)';
              zIndex = 50;
              opacity = 1;
            } else if (offset > 0) {
              // Cards below
              transform = `translateY(${offset * 40}px) scale(${1 - offset * 0.05}) rotateX(-${offset * 5}deg)`;
              zIndex = 50 - offset;
              opacity = 1 - offset * 0.2;
            } else {
              // Cards above
              transform = `translateY(${offset * 40}px) scale(${1 + offset * 0.05}) rotateX(${offset * 5}deg)`;
              zIndex = 50 + offset; // Lower z-index for items above (behind)
              opacity = 1 + offset * 0.2;
            }

            return (
              <div
                key={index}
                className={`absolute left-0 right-0 mx-auto w-[80%] h-20 p-4 rounded-xl border shadow-xl transition-all duration-500 ease-out flex items-center gap-4 ${theme.colors.cardBg} ${theme.colors.cardBorder} backdrop-blur-md`}
                style={{
                  top: '40%', // Center vertically
                  transform: `${transform} translateZ(0)`, // Force GPU
                  zIndex,
                  opacity: Math.max(0, opacity),
                  marginTop: '-40px' // Half height to center
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

          {/* Helper Text */}
          <div className={`absolute bottom-4 left-0 right-0 text-center text-xs ${theme.colors.textMuted} animate-pulse`}>
            Плъзнете нагоре/надолу
          </div>
        </div>

        {/* View All Button */}
        <div className="mt-10 text-center">
          <button className={`px-8 py-3 rounded-full font-bold text-white shadow-lg transition-all hover:scale-105 active:scale-95 ${theme.colors.buttonGradient}`}>
            Виж всички партньори
          </button>
        </div>
      </div>
    </section>
  );
};

// --- DEALS PREVIEW SECTION ---
const DealsPreview: React.FC<{ theme: Theme }> = ({ theme }) => {
  const [activeCategory, setActiveCategory] = useState("Всички");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const categories = ["Всички", "Технологии", "Мода", "Дом", "Спорт"];

  const deals = [
    {
      id: 1,
      title: "Apple iPhone 15 Pro Max",
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=400",
      price: "2,199 лв.",
      oldPrice: "2,699 лв.",
      discount: "-18%",
      category: "Технологии",
      store: "Amazon",
      rating: 4.8,
      icon: <Smartphone className="w-4 h-4" />
    },
    {
      id: 2,
      title: "Sony WH-1000XM5",
      image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=400",
      price: "629 лв.",
      oldPrice: "799 лв.",
      discount: "-21%",
      category: "Технологии",
      store: "Ozone",
      rating: 4.9,
      icon: <Headphones className="w-4 h-4" />
    },
    {
      id: 3,
      title: "Nike Air Max 270",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400",
      price: "189 лв.",
      oldPrice: "299 лв.",
      discount: "-36%",
      category: "Мода",
      store: "Nike",
      rating: 4.5,
      icon: <ShoppingBag className="w-4 h-4" />
    },
    {
      id: 4,
      title: "Philips Espresso Machine",
      image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&q=80&w=400",
      price: "849 лв.",
      oldPrice: "1,299 лв.",
      discount: "-34%",
      category: "Дом",
      store: "Technopolis",
      rating: 4.7,
      icon: <Monitor className="w-4 h-4" />
    },
    {
      id: 5,
      title: "Samsung 4K Smart TV",
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=400",
      price: "1,099 лв.",
      oldPrice: "1,499 лв.",
      discount: "-26%",
      category: "Технологии",
      store: "Emag",
      rating: 4.6,
      icon: <Monitor className="w-4 h-4" />
    },
    {
      id: 6,
      title: "Adidas Ultraboost",
      image: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&q=80&w=400",
      price: "220 лв.",
      oldPrice: "360 лв.",
      discount: "-38%",
      category: "Мода",
      store: "Adidas",
      rating: 4.8,
      icon: <ShoppingBag className="w-4 h-4" />
    },
    {
      id: 7,
      title: "iRobot Roomba j7+",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400",
      price: "1,399 лв.",
      oldPrice: "1,799 лв.",
      discount: "-22%",
      category: "Дом",
      store: "iRobot",
      rating: 4.8,
      icon: <Home className="w-4 h-4" />
    },
    {
      id: 8,
      title: "Garmin Fenix 7",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400",
      price: "999 лв.",
      oldPrice: "1,299 лв.",
      discount: "-23%",
      category: "Спорт",
      store: "Garmin",
      rating: 4.9,
      icon: <Watch className="w-4 h-4" />
    }
  ];

  // Filter deals
  const filteredDeals = activeCategory === "Всички"
    ? deals
    : deals.filter(d => d.category === activeCategory);

  // Responsive items per page
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

    handleResize(); // Init
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(filteredDeals.length / itemsPerPage);

  // NOTE: We are NOT slicing here anymore for the sliding effect.
  // We render all items and translate the container.

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentSlide(0); // Reset to first page on category change
  };

  // Swipe Handlers
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

    // Reset
    setTouchEnd(0);
    setTouchStart(0);
  };

  return (
    <section id="deals" className="py-24 px-4 relative overflow-hidden">
      {/* Background - simplified z-index to prevent stacking issues */}
      <div className={`absolute inset-0 -z-10 opacity-50 ${theme.id === 'light' ? 'bg-slate-100' : 'bg-black/20'}`}></div>

      <div className="max-w-7xl mx-auto relative z-0">
        {/* Centered Header */}
        <div className="text-center mb-12 gravity-target">
          <span className={`text-sm font-bold uppercase tracking-widest ${theme.colors.accent} mb-2 block`}>Специална селекция</span>
          <h2 className={`text-3xl md:text-4xl font-bold ${theme.colors.textMain} mb-4`}>
            Актуални оферти <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">в момента</span>
          </h2>
          <p className={`max-w-xl mx-auto ${theme.colors.textSecondary} text-lg`}>
            Открий най-горещите оферти в популярни категории, подбрани от нашия AI, за да ти спестим време и пари.
          </p>
        </div>

        {/* Controls Row: Tabs Center, Button Right */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">

          {/* Spacer for desktop alignment */}
          <div className="hidden md:block w-40"></div>

          {/* Centered Categories with Flex Wrap (Fixes "iframe" look and overflow) */}
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

          {/* Right Aligned "View All" */}
          <div className="w-full md:w-auto flex justify-center md:justify-end gravity-target">
            <button className={`flex items-center gap-2 text-sm font-bold px-6 py-2 rounded-full transition-all duration-300 border hover:scale-105 active:scale-95 ${theme.colors.cardBg} ${theme.colors.cardBorder} ${theme.colors.textMain} hover:bg-gradient-to-r hover:from-cyan-600 hover:via-blue-600 hover:to-purple-600 hover:text-white hover:border-transparent hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]`}>
              Виж всички <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Container with Overflow Hidden */}
        <div
          className="relative group/carousel touch-pan-y cursor-grab active:cursor-grabbing overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={(e) => setTouchStart(e.clientX)}
          onMouseMove={(e) => { if (touchStart) setTouchEnd(e.clientX); }}
          onMouseUp={() => { handleTouchEnd(); setTouchStart(0); }}
          onMouseLeave={() => { if (touchStart) { handleTouchEnd(); setTouchStart(0); } }}
        >
          {/* Sliding Track */}
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {/* We group items into 'pages' for the slide effect */}
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <div key={pageIndex} className="min-w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-1">
                {filteredDeals.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage).map((deal) => (
                  <div key={deal.id} className={`gravity-target group relative rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:-translate-y-1 hover:border-cyan-400/50 ${theme.colors.cardBg} ${theme.colors.cardBorder}`}>
                    {/* Image Area */}
                    <div className="h-56 relative overflow-hidden bg-slate-800 transition-all duration-500 ease-in-out">
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
                {/* Fill empty slots if last page is not full */}
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

          {/* Carousel Controls - Visible on Mobile too now */}
          {totalPages > 1 && (
            <>
              <button
                onClick={handlePrev}
                className={`absolute top-1/2 -left-2 md:-left-12 -translate-y-1/2 p-3 rounded-full shadow-xl backdrop-blur-md border transition-all hover:scale-110 ${theme.colors.cardBg} ${theme.colors.cardBorder} ${theme.colors.textMain} hover:text-cyan-400 z-10`}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className={`absolute top-1/2 -right-2 md:-right-12 -translate-y-1/2 p-3 rounded-full shadow-xl backdrop-blur-md border transition-all hover:scale-110 ${theme.colors.cardBg} ${theme.colors.cardBorder} ${theme.colors.textMain} hover:text-cyan-400 z-10`}
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

// --- JUST FOR YOU SECTION ---
const JustForYouSection: React.FC<{ theme: Theme }> = ({ theme }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Drag to scroll state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Sample personalized deals data
  const personalizedDeals = [
    {
      id: 1,
      foundBy: "AI_Асистент",
      foundDate: "Днес 18:30",
      title: "Samsung Galaxy S24 Ultra 512GB Смартфон с S Pen, 200MP камера, 5G, 12GB RAM, 512GB памет, титанов корпус",
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=400",
      price: "1,899 лв.",
      oldPrice: "2,399 лв.",
      discount: "-20%",
      extraInfo: "Безплатна доставка",
      store: "Samsung",
      likes: 234,
      comments: 89,
      shares: 45,
      isHot: true
    },
    {
      id: 2,
      foundBy: "Ofertiko_AI",
      foundDate: "Днес 17:15",
      title: "Sony WH-1000XM5 Безжични слушалки с шумопоглъщане, 30 часа батерия, Bluetooth 5.2, Hi-Res Audio",
      image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=400",
      price: "599 лв.",
      oldPrice: "799 лв.",
      discount: "-25%",
      extraInfo: "20% кешбек",
      store: "Sony",
      likes: 189,
      comments: 67,
      shares: 32,
      isHot: true
    },
    {
      id: 3,
      foundBy: "Smart_Deals",
      foundDate: "Вчера 20:45",
      title: "Apple MacBook Pro 14\" M3 Pro чип, 18GB RAM, 512GB SSD, Liquid Retina XDR дисплей, 18 часа батерия",
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=400",
      price: "3,299 лв.",
      oldPrice: "3,999 лв.",
      discount: "-17%",
      extraInfo: "Безплатна доставка",
      store: "Apple",
      likes: 456,
      comments: 123,
      shares: 78,
      isHot: true
    },
    {
      id: 4,
      foundBy: "Deal_Hunter",
      foundDate: "Днес 16:20",
      title: "Dyson V15 Detect Прахосмукачка с лазерна технология, HEPA филтър, 60 минути работа, безжична",
      image: "https://images.unsplash.com/photo-1558317374-a354d5f6d4da?auto=format&fit=crop&q=80&w=400",
      price: "1,199 лв.",
      oldPrice: "1,599 лв.",
      discount: "-25%",
      extraInfo: "Безплатна доставка",
      store: "Dyson",
      likes: 312,
      comments: 98,
      shares: 56,
      isHot: true
    },
    {
      id: 5,
      foundBy: "Tech_Savvy",
      foundDate: "Днес 15:10",
      title: "LG OLED 65\" 4K Smart TV с AI ThinQ, Dolby Vision, HDR10, WebOS, 120Hz, HDMI 2.1, игров режим",
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=400",
      price: "2,499 лв.",
      oldPrice: "3,299 лв.",
      discount: "-24%",
      extraInfo: "Безплатна доставка",
      store: "LG",
      likes: 278,
      comments: 112,
      shares: 64,
      isHot: true
    },
    {
      id: 6,
      foundBy: "Deal_Finder",
      foundDate: "Днес 14:25",
      title: "Nike Air Max 270 Мъжки спортни обувки с Air технология, максимален комфорт, дънки за амортизация, различни размери",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400",
      price: "189 лв.",
      oldPrice: "299 лв.",
      discount: "-36%",
      extraInfo: "Безплатна доставка",
      store: "Nike",
      likes: 156,
      comments: 43,
      shares: 28,
      isHot: true
    },
    {
      id: 7,
      foundBy: "Price_Watcher",
      foundDate: "Днес 13:40",
      title: "Canon EOS R6 Mark II Безогледален фотоапарат с 24.2MP сензор, 4K видео, Dual Pixel AF, 6K RAW, безжичен",
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?auto=format&fit=crop&q=80&w=400",
      price: "2,899 лв.",
      oldPrice: "3,599 лв.",
      discount: "-19%",
      extraInfo: "Безплатна доставка",
      store: "Canon",
      likes: 423,
      comments: 156,
      shares: 89,
      isHot: true
    },
    {
      id: 8,
      foundBy: "Smart_Buyer",
      foundDate: "Вчера 22:15",
      title: "Xbox Series X Игрова конзола с 1TB SSD, 4K 120fps, Ray Tracing, обратна съвместимост, Game Pass включен",
      image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&q=80&w=400",
      price: "699 лв.",
      oldPrice: "899 лв.",
      discount: "-22%",
      extraInfo: "Безплатна доставка",
      store: "Microsoft",
      likes: 567,
      comments: 234,
      shares: 145,
      isHot: true
    },
    {
      id: 9,
      foundBy: "Tech_Expert",
      foundDate: "Днес 12:05",
      title: "Bose QuietComfort 45 Безжични слушалки с активно шумопоглъщане, 24 часа батерия, USB-C, Bluetooth 5.1",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400",
      price: "449 лв.",
      oldPrice: "599 лв.",
      discount: "-25%",
      extraInfo: "Безплатна доставка",
      store: "Bose",
      likes: 298,
      comments: 112,
      shares: 67,
      isHot: true
    },
    {
      id: 10,
      foundBy: "Deal_Master",
      foundDate: "Днес 11:30",
      title: "KitchenAid Artisan Stand Mixer 5.5L с планетарно движение, 10 скорости, различни аксесоари, различни цветове",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=400",
      price: "799 лв.",
      oldPrice: "1,099 лв.",
      store: "KitchenAid",
      likes: 187,
      comments: 65,
      shares: 42,
      isHot: true,
      extraInfo: "Безплатна доставка"
    }
  ];

  const handleNext = () => {
    if (carouselRef.current) {
      const cardWidth = 288 + 24; // w-72 (288px) + gap-6 (24px)
      carouselRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, personalizedDeals.length - 4);
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const handlePrev = () => {
    if (carouselRef.current) {
      const cardWidth = 288 + 24; // w-72 (288px) + gap-6 (24px)
      carouselRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, personalizedDeals.length - 4);
      return prev <= 0 ? maxIndex : prev - 1;
    });
  };

  // Mouse Drag Handlers
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
    const walk = (x - startX) * 2; // Scroll-fast
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  // Show all deals in carousel, not just 4
  const visibleDeals = personalizedDeals;

  return (
    <section className="py-16 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header with title and info icon */}
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

          {/* Navigation arrows */}
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

        {/* Carousel */}
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
            {visibleDeals.map((deal) => (
              <div
                key={deal.id}
                className={`flex-shrink-0 w-56 rounded-xl border transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:-translate-y-1 hover:border-cyan-400/50 group relative ${theme.colors.cardBg} ${theme.colors.cardBorder} backdrop-blur-sm flex flex-col overflow-visible select-none`}
              >
                {/* Card Header - Found by info */}
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

                {/* Product Image with For You Badge */}
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
                  {/* For You Badge on image */}
                  <div className="absolute top-2 left-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-cyan-500/90 text-white backdrop-blur-sm shadow-md">
                      За теб
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-3 flex flex-col flex-grow">
                  {/* Title - always 3 lines height */}
                  <h3 className={`font-semibold text-xs mb-2 min-h-[3rem] line-clamp-3 leading-relaxed ${theme.colors.textMain}`}>
                    {deal.title}
                  </h3>

                  {/* Price - always one line */}
                  <div className="mb-1.5">
                    <div className="flex items-baseline gap-1.5">
                      <span className={`text-base font-bold ${theme.colors.textMain}`}>{deal.price}</span>
                      <span className={`text-xs line-through ${theme.colors.textMuted}`}>{deal.oldPrice}</span>
                      {deal.isHot && <Flame className="w-3.5 h-3.5 text-red-500 fill-red-500" />}
                    </div>
                  </div>

                  {/* Description - always one line */}
                  <div className="mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-medium text-red-500">{deal.discount}</span>
                      {deal.extraInfo && (
                        <span className={`text-[10px] ${theme.colors.textMuted} truncate`}>{deal.extraInfo}</span>
                      )}
                    </div>
                  </div>

                  {/* Store - always one line */}
                  <div className={`flex items-center gap-1 mb-2 text-[10px] ${theme.colors.textMuted}`}>
                    <Store className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{deal.store}</span>
                  </div>

                  {/* Engagement Metrics - always at bottom, one line with border */}
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

                {/* Hover Glow Bottom */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[0.5px]"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- NEW FOOTER ---
const NewFooter: React.FC<{ theme: Theme }> = ({ theme }) => {
  return (
    <footer className={`pt-16 pb-8 border-t backdrop-blur-md z-10 gravity-target ${theme.colors.divider} ${theme.colors.background}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">

          {/* Brand Col */}
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

          {/* Links 1 */}
          <div className="gravity-target">
            <h4 className={`font-bold mb-4 ${theme.colors.textMain}`}>Продукт</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className={`${theme.colors.textSecondary} hover:${theme.colors.accent}`}>Всички Оферти</a></li>
              <li><a href="#" className={`${theme.colors.textSecondary} hover:${theme.colors.accent}`}>Категории</a></li>
              <li><a href="#" className={`${theme.colors.textSecondary} hover:${theme.colors.accent}`}>Магазини</a></li>
              <li><a href="#" className={`${theme.colors.textSecondary} hover:${theme.colors.accent}`}>Мобилно Приложение</a></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div className="gravity-target">
            <h4 className={`font-bold mb-4 ${theme.colors.textMain}`}>Компания</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className={`${theme.colors.textSecondary} hover:${theme.colors.accent}`}>За Нас</a></li>
              <li><a href="#" className={`${theme.colors.textSecondary} hover:${theme.colors.accent}`}>Кариери</a></li>
              <li><a href="#" className={`${theme.colors.textSecondary} hover:${theme.colors.accent}`}>Контакти</a></li>
              <li><a href="#" className={`${theme.colors.textSecondary} hover:${theme.colors.accent}`}>Партньори</a></li>
            </ul>
          </div>

          {/* Links 3 */}
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

// --- MAIN APP COMPONENT ---

const App: React.FC = () => {
  // Theme State with Persistence
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    const savedThemeId = localStorage.getItem('ofertiko-theme-id');
    if (savedThemeId) {
      const foundTheme = themes.find(t => t.id === savedThemeId);
      if (foundTheme) return foundTheme;
    }
    return darkTheme;
  });

  // Font State with Persistence
  const [fontFamily, setFontFamily] = useState(() => {
    return localStorage.getItem('ofertiko-font-family') || FONTS.manrope;
  });

  // Background State with Persistence
  const [backgroundMode, setBackgroundMode] = useState(() => {
    return localStorage.getItem('ofertiko-bg-mode') || 'solid';
  });

  // Radius Mode State with Persistence
  const [radiusMode, setRadiusMode] = useState(() => {
    return localStorage.getItem('ofertiko-radius') || 'rounded';
  });

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shakeInput, setShakeInput] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [touched, setTouched] = useState(false);

  // Secret Menu States
  const [secretClicks, setSecretClicks] = useState(0);
  const [showSecretMenu, setShowSecretMenu] = useState(false);

  // Gravity Mode State
  const [gravityEnabled, setGravityEnabled] = useState(false);

  // Scroll Tracking
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- PHYSICS ENGINE LOGIC (Simplified Gravity) ---
  useEffect(() => {
    if (!gravityEnabled) return;

    // Select targets
    const targets = document.querySelectorAll('.gravity-target');
    const bodies: { el: HTMLElement, x: number, y: number, vx: number, vy: number, rot: number, vRot: number }[] = [];

    // Initial Setup
    targets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const element = el as HTMLElement;

      // Prepare element for physics
      element.style.position = 'fixed';
      element.style.left = `${rect.left}px`;
      element.style.top = `${rect.top}px`;
      element.style.width = `${rect.width}px`;
      element.style.zIndex = '1000';

      bodies.push({
        el: element,
        x: rect.left,
        y: rect.top,
        vx: (Math.random() - 0.5) * 4, // Random horizontal Push
        vy: Math.random() * 2, // Initial drop speed
        rot: 0,
        vRot: (Math.random() - 0.5) * 2
      });
    });

    let animationId: number;

    const update = () => {
      const gravity = 0.5;
      const friction = 0.98;
      const floor = window.innerHeight;

      bodies.forEach(b => {
        b.vy += gravity;
        b.x += b.vx;
        b.y += b.vy;
        b.rot += b.vRot;

        // Floor Collision
        if (b.y + b.el.offsetHeight > floor) {
          b.y = floor - b.el.offsetHeight;
          b.vy *= -0.6; // Bounce
          b.vx *= friction;
          b.vRot *= friction;
        }

        // Wall Collision
        if (b.x < 0) {
          b.x = 0;
          b.vx *= -0.8;
        } else if (b.x + b.el.offsetWidth > window.innerWidth) {
          b.x = window.innerWidth - b.el.offsetWidth;
          b.vx *= -0.8;
        }

        b.el.style.transform = `translate(${b.x - b.el.offsetLeft}px, ${b.y - b.el.offsetTop}px) rotate(${b.rot}deg)`;
      });

      animationId = requestAnimationFrame(update);
    };

    update();

    return () => cancelAnimationFrame(animationId);
  }, [gravityEnabled]);

  const handleThemeChange = (newTheme: Theme) => {
    setCurrentTheme(newTheme);
    localStorage.setItem('ofertiko-theme-id', newTheme.id);
  };

  const handleFontChange = (newFont: string) => {
    setFontFamily(newFont);
    localStorage.setItem('ofertiko-font-family', newFont);
  };

  const handleBackgroundChange = (newBg: string) => {
    setBackgroundMode(newBg);
    localStorage.setItem('ofertiko-bg-mode', newBg);
  };

  const handleRadiusChange = (mode: string) => {
    setRadiusMode(mode);
    localStorage.setItem('ofertiko-radius', mode);
  };

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setEmail(newValue);

    if (touched) {
      if (validateEmail(newValue)) {
        setEmailError('');
      } else {
        if (newValue.length > 0) {
          setEmailError('Моля, въведете валиден имейл адрес.');
        } else {
          setEmailError('');
        }
      }
    }
  };

  const handleEmailBlur = () => {
    setTouched(true);
    if (email && !validateEmail(email)) {
      setEmailError('Моля, въведете валиден имейл адрес.');
      setShakeInput(true);
      setTimeout(() => setShakeInput(false), 500);
    }
    setIsInputFocused(false);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);

    if (!validateEmail(email)) {
      setEmailError('Моля, въведете валиден имейл адрес.');
      setShakeInput(true);
      setTimeout(() => setShakeInput(false), 500);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setSubscribed(true);
        setEmail("");
        setTouched(false);
      } else {
        const data = await response.json().catch(() => ({}));
        if (response.status === 404) {
          setEmailError("Грешка 404: API endpoint not found. (Check Vercel deployment)");
        } else if (response.status === 500) {
          setEmailError("Грешка 500: Server Error. (Check Vercel DB connection)");
        } else if (data && data.error) {
          setEmailError(data.error);
        } else {
          setEmailError("Възникна проблем. Моля, опитайте отново.");
        }
      }
    } catch (error) {
      console.error("Subscribe error:", error);
      setEmailError("Грешка при свързване. Проверете интернет връзката си.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogoClick = () => {
    setSecretClicks(prev => {
      const newCount = prev + 1;
      if (newCount >= 5) {
        setShowSecretMenu(true);
        return 0;
      }
      return newCount;
    });
    setTimeout(() => setSecretClicks(0), 2000);
  };

  const handleGravityToggle = () => {
    setGravityEnabled(true);
    setShowSecretMenu(false);
  };

  const isDark = currentTheme.id !== 'light' && currentTheme.id !== 'pastel' && currentTheme.id !== 'classic';

  // Define gradients for inputs
  let focusGradient = 'bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500';
  if (currentTheme.id === 'midnight') {
    focusGradient = 'bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600';
  } else if (currentTheme.id === 'light') {
    focusGradient = 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500';
  } else if (currentTheme.id === 'pastel') {
    focusGradient = 'bg-gradient-to-r from-[#DFB446] via-[#E7DACB] to-[#C26D54]';
  } else if (currentTheme.id === 'classic') {
    focusGradient = 'bg-gradient-to-r from-[#003399] via-[#111111] to-[#DC2626]';
  }

  // Background Image Styles
  const getBackgroundStyle = () => {
    if (backgroundMode === 'solid') return {};
    const url = BACKGROUNDS[backgroundMode as keyof typeof BACKGROUNDS];
    return {
      backgroundImage: `url(${url})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    };
  };

  return (
    <div
      className={`min-h-screen w-full relative overflow-x-hidden flex flex-col transition-colors duration-500 ${currentTheme.colors.background} ${radiusMode === 'square' ? 'radius-square' : ''}`}
      style={{ fontFamily: fontFamily, ...getBackgroundStyle() }}
    >
      {/* Background Overlay for readability if image is active */}
      {backgroundMode !== 'solid' && (
        <div className={`absolute inset-0 z-0 pointer-events-none ${currentTheme.id === 'light' ? 'bg-white/80' : 'bg-black/70'} backdrop-blur-sm`}></div>
      )}

      {/* Sticky Header */}
      <Header theme={currentTheme} onThemeToggle={() => { }} scrollY={scrollY} />

      {/* Dynamic Sticky Theme Switcher */}
      <ThemeSwitcher
        currentTheme={currentTheme}
        onThemeChange={handleThemeChange}
        scrollY={scrollY}
        backgroundMode={backgroundMode}
        onBackgroundChange={handleBackgroundChange}
        radiusMode={radiusMode}
        onRadiusChange={handleRadiusChange}
      />

      <SecretFontMenu
        isOpen={showSecretMenu}
        onClose={() => setShowSecretMenu(false)}
        currentFont={fontFamily}
        onFontChange={handleFontChange}
        theme={currentTheme}
        onGravityToggle={handleGravityToggle}
      />

      {/* Animated Background blobs (Only visible on solid background or faintly behind) */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div
          className={`absolute top-0 -left-4 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl animate-blob ${isDark ? 'bg-purple-600 opacity-20' : 'bg-purple-300 opacity-40'}`}
          style={{ animationDuration: '20s' }}
        ></div>
        <div
          className={`absolute top-0 -right-4 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-long ${isDark ? 'bg-cyan-600 opacity-20' : 'bg-cyan-300 opacity-40'}`}
          style={{ animationDuration: '25s' }}
        ></div>
        <div
          className={`absolute -bottom-8 left-20 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-extra-long ${isDark ? 'bg-pink-600 opacity-20' : 'bg-pink-300 opacity-40'}`}
          style={{ animationDuration: '23s' }}
        ></div>
      </div>

      {/* Grid Overlay */}
      <div className={`fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] -z-10 ${isDark ? 'opacity-20' : 'opacity-10 invert'} pointer-events-none`}></div>

      {/* Hero Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 pt-32 pb-12 relative z-10">
        <div className="max-w-4xl w-full mx-auto text-center">

          <div className="mx-auto mb-6 w-32 gravity-target">
            <OfertikoLogo theme={currentTheme} onClick={handleLogoClick} />
          </div>

          {/* Badge */}
          <div className={`gravity-target inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 backdrop-blur-sm shadow-xl ${currentTheme.colors.cardBg} ${currentTheme.colors.cardBorder}`}>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
            <span className={`text-sm font-medium tracking-wide uppercase ${currentTheme.colors.textSecondary}`}>Work in Progress</span>
          </div>

          <h1 className={`gravity-target text-5xl md:text-7xl font-extrabold mb-6 tracking-tight animate-fade-in-up ${currentTheme.colors.textMain}`}>
            <span className={`block text-3xl md:text-4xl font-light mb-2 ${currentTheme.colors.textSecondary}`}>Здравейте, аз съм Офертико!</span>
            Готвим нещо <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-text-shimmer">
              невероятно.
            </span>
          </h1>

          <p className={`gravity-target text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed ${currentTheme.colors.textMuted}`}>
            Аз съм вашият нов AI помощник за откриване на най-добрите оферти. Всички оферти на едно място, сравнявай цени и спестявай пари от хиляди онлайн магазини.
          </p>

          <div className="mb-16 gravity-target">
            <Countdown theme={currentTheme} />
          </div>

          {/* Main Cards */}
          <div className="grid md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto mb-12">
            {/* Left: Newsletter */}
            <div className={`gravity-target relative overflow-hidden group border rounded-2xl p-8 backdrop-blur-sm text-left h-full flex flex-col justify-center transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/20 ${currentTheme.colors.cardBg} ${currentTheme.colors.cardBorder}`}>

              {/* Decorative Blob matching Right Card */}
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-600/20 rounded-full blur-3xl group-hover:bg-cyan-600/30 transition-all duration-500"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${isDark ? 'bg-cyan-500/10' : 'bg-cyan-100'}`}>
                    <Mail className={`w-6 h-6 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
                  </div>
                  <h3 className={`text-xl font-semibold ${currentTheme.colors.textMain}`}>Бъдете първи</h3>
                </div>
                <p className={`mb-6 ${currentTheme.colors.textMuted}`}>
                  Абонирайте се за нашия бюлетин, за да разберете кога Офертико стартира.
                </p>

                {!subscribed ? (
                  <form onSubmit={handleSubscribe} className="relative" noValidate>
                    <div className={`relative ${shakeInput ? 'animate-shake' : ''}`}>
                      <div className={`absolute -inset-[2px] rounded-xl opacity-0 transition-opacity duration-300 -z-10 ${focusGradient} ${isInputFocused ? 'opacity-100' : ''}`} />
                      <input
                        type="email"
                        name="email"
                        placeholder="твоят@email.com"
                        value={email}
                        onChange={handleEmailChange}
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={handleEmailBlur}
                        disabled={isSubmitting}
                        className={`relative z-10 w-full border rounded-xl py-3 pl-4 pr-12 focus:outline-none transition-all ${currentTheme.colors.inputBg} ${currentTheme.colors.textMain} ${isInputFocused ? 'border-transparent' : `${currentTheme.colors.inputBorder} focus:border-cyan-500`} ${emailError ? 'border-red-500 focus:ring-red-500' : ''} ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                      />
                      <button
                        type="submit"
                        disabled={!!emailError || !email || isSubmitting}
                        className={`absolute right-1 top-1 bottom-1 p-2 rounded-lg transition-colors z-20 flex items-center justify-center ${!!emailError || !email || isSubmitting ? 'bg-slate-500/20 text-slate-400 cursor-not-allowed' : 'bg-cyan-600 hover:bg-cyan-500 text-white'}`}
                      >
                        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
                      </button>
                    </div>
                    {emailError && (
                      <div className="flex items-center gap-2 text-red-400 bg-red-500/10 p-2 rounded-lg mt-3 border border-red-500/20 animate-in fade-in slide-in-from-top-1">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm font-medium">{emailError}</span>
                      </div>
                    )}
                  </form>
                ) : (
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-500 text-center animate-in zoom-in duration-300">
                    🎉 Благодарим! Ще ви уведомим скоро.
                  </div>
                )}
              </div>
            </div>

            {/* Right: AI Foreman */}
            <div className="h-full gravity-target">
              <AiForeman theme={currentTheme} />
            </div>
          </div>
        </div>
      </main>

      {/* New Sections */}
      <div className="relative z-10">
        <FeaturesSection theme={currentTheme} />
        <DealsPreview theme={currentTheme} />
        <JustForYouSection theme={currentTheme} />
        <PopularPartnersSection theme={currentTheme} />
      </div>

      {/* New Expanded Footer */}
      <NewFooter theme={currentTheme} />
    </div>
  );
};

export default App;
