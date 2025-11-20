
import React, { useState, useEffect } from 'react';
import { Hammer, Mail, ArrowRight, Github, Twitter, Instagram, AlertCircle, Palette, Check, Sun, Moon, Sparkles, Type, X, Loader2, Menu, Zap, Search, ShieldCheck, ShoppingBag, Tag, ExternalLink, ChevronRight, ChevronLeft, BarChart3, Bell, Smartphone, Watch, Monitor, Headphones, Heart, Home, Trophy, Star, Store, Image as ImageIcon, Square, Circle } from 'lucide-react';
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? `backdrop-blur-lg border-b ${theme.colors.cardBg} ${theme.colors.divider} shadow-lg` 
          : 'bg-transparent border-b border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 relative">
          
          {/* Brand */}
          <div className="flex items-center gap-2 cursor-pointer group">
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
          <nav className="hidden md:flex items-center gap-4">
            <a href="#" className={navLinkClass}>Начало</a>
            <a href="#features" className={navLinkClass}>Как работи</a>
            <a href="#deals" className={navLinkClass}>Оферти</a>
            <a href="#contact" className={navLinkClass}>Контакти</a>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
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
          <div className={`absolute right-0 mt-2 w-64 rounded-xl border shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 ${currentTheme.colors.cardBg} ${currentTheme.colors.cardBorder}`}>
            {/* Themes List */}
            <div className="p-2 border-b border-slate-500/20">
              <p className={`text-xs font-bold uppercase px-3 py-1 mb-1 ${currentTheme.colors.textMuted}`}>Тема</p>
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    onThemeChange(t);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                    currentTheme.id === t.id 
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
                    className={`flex flex-col items-center gap-1 p-2 rounded-lg border transition-all ${
                      radiusMode === 'rounded' 
                        ? 'border-cyan-500 bg-cyan-500/10 text-cyan-500' 
                        : 'border-transparent hover:bg-slate-500/10'
                    }`}
                 >
                    <div className={`w-8 h-8 rounded-xl border-2 ${radiusMode === 'rounded' ? 'border-cyan-500' : 'border-gray-400'}`}></div>
                    <span className={`text-xs ${currentTheme.colors.textSecondary}`}>Заоблен</span>
                 </button>
                 <button
                    onClick={() => onRadiusChange('square')}
                    className={`flex flex-col items-center gap-1 p-2 rounded-lg border transition-all ${
                      radiusMode === 'square' 
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
                    className={`w-full aspect-square rounded-md border-2 transition-all flex items-center justify-center relative overflow-hidden ${
                      backgroundMode === key ? 'border-cyan-500' : 'border-transparent hover:border-gray-400'
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
}> = ({ isOpen, onClose, currentFont, onFontChange, theme }) => {
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
        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
          {fontOptions.map((font) => (
            <button
              key={font.name}
              onClick={() => onFontChange(font.value)}
              className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                currentFont === font.value 
                  ? `border-cyan-500 bg-cyan-500/10 ${theme.colors.textMain}` 
                  : `${theme.colors.cardBorder} hover:bg-white/5 ${theme.colors.textSecondary}`
              }`}
            >
              <span style={{ fontFamily: font.value }}>{font.name}</span>
              {currentFont === font.value && <Check className="w-4 h-4 text-cyan-500" />}
            </button>
          ))}
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
      <div className="text-center mb-16">
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
          <div key={i} className={`group relative p-8 rounded-2xl border backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 ${theme.colors.cardBg} ${theme.colors.cardBorder} hover:border-cyan-400/50 hover:shadow-[0_0_50px_rgba(34,211,238,0.25)] overflow-hidden`}>
             
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

// --- DEALS PREVIEW SECTION ---
const DealsPreview: React.FC<{ theme: Theme }> = ({ theme }) => {
  const [activeCategory, setActiveCategory] = useState("Всички");
  const [currentSlide, setCurrentSlide] = useState(0);
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
      title: "Dyson V15 Detect",
      image: "https://plus.unsplash.com/premium_photo-1663054460858-246d3097d163?q=80&w=400",
      price: "1,299 лв.",
      oldPrice: "1,599 лв.",
      discount: "-18%",
      category: "Дом",
      store: "Dyson",
      rating: 4.9,
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

  const itemsPerPage = 4;
  const totalPages = Math.ceil(filteredDeals.length / itemsPerPage);

  // Slice for pagination
  const visibleDeals = filteredDeals.slice(currentSlide * itemsPerPage, (currentSlide + 1) * itemsPerPage);

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

  return (
    <section id="deals" className="py-24 px-4 relative overflow-hidden">
      {/* Background - simplified z-index to prevent stacking issues */}
      <div className={`absolute inset-0 -z-10 opacity-50 ${theme.id === 'light' ? 'bg-slate-100' : 'bg-black/20'}`}></div>
      
      <div className="max-w-7xl mx-auto relative z-0">
        {/* Centered Header */}
        <div className="text-center mb-12">
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
          <div className="flex flex-wrap justify-center gap-3 px-2 py-2">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border hover:scale-105 active:scale-95 ${
                  activeCategory === cat
                  ? `bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 text-white border-transparent shadow-[0_0_20px_rgba(34,211,238,0.4)]`
                  : `${theme.colors.cardBg} ${theme.colors.cardBorder} ${theme.colors.textSecondary} hover:text-white hover:border-cyan-500/50 hover:bg-white/5`
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Right Aligned "View All" */}
          <div className="w-full md:w-auto flex justify-center md:justify-end">
            <button className={`flex items-center gap-2 text-sm font-bold px-6 py-2 rounded-full transition-all duration-300 border hover:scale-105 active:scale-95 ${theme.colors.cardBg} ${theme.colors.cardBorder} ${theme.colors.textMain} hover:bg-gradient-to-r hover:from-cyan-600 hover:via-blue-600 hover:to-purple-600 hover:text-white hover:border-transparent hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]`}>
               Виж всички <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="relative group/carousel">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[400px]">
            {visibleDeals.length > 0 ? visibleDeals.map((deal) => (
               <div key={deal.id} className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:-translate-y-1 hover:border-cyan-400/50 ${theme.colors.cardBg} ${theme.colors.cardBorder} animate-in fade-in zoom-in-95 duration-500`}>
                  
                  {/* Image Area */}
                  <div className="h-56 relative overflow-hidden bg-slate-800 transition-all duration-500 ease-in-out">
                     <img src={deal.image} alt={deal.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                     
                     {/* Overlay Gradient */}
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
  
                     {/* Discount Badge */}
                     <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-lg">
                       {deal.discount}
                     </div>

                     {/* Store Badge */}
                     <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg">
                       <Store className="w-3 h-3" />
                       {deal.store}
                     </div>
  
                     {/* Category Badge (Moved down slightly) */}
                     <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/10">
                       {deal.icon}
                       {deal.category}
                     </div>
                  </div>
                  
                  <div className="p-5 relative">
                     {/* Hover Glow Bottom */}
                     <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
  
                     <h3 className={`font-bold text-lg mb-3 line-clamp-2 leading-snug ${theme.colors.textMain}`}>{deal.title}</h3>
                     
                     {/* Rating */}
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
            )) : (
              <div className={`col-span-4 flex flex-col items-center justify-center h-64 text-center ${theme.colors.textMuted}`}>
                <Search className="w-12 h-12 mb-4 opacity-50" />
                <p>Няма намерени оферти в тази категория.</p>
              </div>
            )}
          </div>

          {/* Carousel Controls */}
          {totalPages > 1 && (
            <>
              <button 
                onClick={handlePrev}
                className={`absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 p-3 rounded-full shadow-xl backdrop-blur-md border transition-all hover:scale-110 ${theme.colors.cardBg} ${theme.colors.cardBorder} ${theme.colors.textMain} hover:text-cyan-400 z-10`}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={handleNext}
                className={`absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 p-3 rounded-full shadow-xl backdrop-blur-md border transition-all hover:scale-110 ${theme.colors.cardBg} ${theme.colors.cardBorder} ${theme.colors.textMain} hover:text-cyan-400 z-10`}
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

// --- NEW FOOTER ---
const NewFooter: React.FC<{ theme: Theme }> = ({ theme }) => {
  return (
    <footer className={`pt-16 pb-8 border-t backdrop-blur-md z-10 ${theme.colors.divider} ${theme.colors.background}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            
            {/* Brand Col */}
            <div className="col-span-2 md:col-span-1">
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
            <div>
               <h4 className={`font-bold mb-4 ${theme.colors.textMain}`}>Продукт</h4>
               <ul className="space-y-2 text-sm">
                 <li><a href="#" className={`${theme.colors.textSecondary} hover:${theme.colors.accent}`}>Всички Оферти</a></li>
                 <li><a href="#" className={`${theme.colors.textSecondary} hover:${theme.colors.accent}`}>Категории</a></li>
                 <li><a href="#" className={`${theme.colors.textSecondary} hover:${theme.colors.accent}`}>Магазини</a></li>
                 <li><a href="#" className={`${theme.colors.textSecondary} hover:${theme.colors.accent}`}>Мобилно Приложение</a></li>
               </ul>
            </div>

            {/* Links 2 */}
            <div>
               <h4 className={`font-bold mb-4 ${theme.colors.textMain}`}>Компания</h4>
               <ul className="space-y-2 text-sm">
                 <li><a href="#" className={`${theme.colors.textSecondary} hover:${theme.colors.accent}`}>За Нас</a></li>
                 <li><a href="#" className={`${theme.colors.textSecondary} hover:${theme.colors.accent}`}>Кариери</a></li>
                 <li><a href="#" className={`${theme.colors.textSecondary} hover:${theme.colors.accent}`}>Контакти</a></li>
                 <li><a href="#" className={`${theme.colors.textSecondary} hover:${theme.colors.accent}`}>Партньори</a></li>
               </ul>
            </div>

            {/* Links 3 */}
            <div>
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
  
  // Scroll Tracking
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <Header theme={currentTheme} onThemeToggle={() => {}} scrollY={scrollY} />

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
          
          <div className="mx-auto mb-6 w-32">
            <OfertikoLogo theme={currentTheme} onClick={handleLogoClick} />
          </div>

          {/* Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 backdrop-blur-sm shadow-xl ${currentTheme.colors.cardBg} ${currentTheme.colors.cardBorder}`}>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
            <span className={`text-sm font-medium tracking-wide uppercase ${currentTheme.colors.textSecondary}`}>Work in Progress</span>
          </div>

          <h1 className={`text-5xl md:text-7xl font-extrabold mb-6 tracking-tight animate-fade-in-up ${currentTheme.colors.textMain}`}>
            <span className={`block text-3xl md:text-4xl font-light mb-2 ${currentTheme.colors.textSecondary}`}>Здравейте, аз съм Офертико!</span>
            Готвим нещо <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-text-shimmer">
              невероятно.
            </span>
          </h1>
          
          <p className={`text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed ${currentTheme.colors.textMuted}`}>
            Аз съм вашият нов AI помощник за откриване на най-добрите оферти. Всички оферти на едно място, сравнявай цени и спестявай пари от хиляди онлайн магазини.
          </p>

          <div className="mb-16">
            <Countdown theme={currentTheme} />
          </div>

          {/* Main Cards */}
          <div className="grid md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto mb-12">
            {/* Left: Newsletter */}
            <div className={`relative overflow-hidden group border rounded-2xl p-8 backdrop-blur-sm text-left h-full flex flex-col justify-center transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/20 ${currentTheme.colors.cardBg} ${currentTheme.colors.cardBorder}`}>
              
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
            <div className="h-full">
              <AiForeman theme={currentTheme} />
            </div>
          </div>
        </div>
      </main>

      {/* New Sections */}
      <div className="relative z-10">
        <FeaturesSection theme={currentTheme} />
        <DealsPreview theme={currentTheme} />
      </div>

      {/* New Expanded Footer */}
      <NewFooter theme={currentTheme} />
    </div>
  );
};

export default App;
