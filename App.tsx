import React, { useState, useEffect } from 'react';
import { Hammer, Mail, ArrowRight, Github, Twitter, Instagram, AlertCircle, Palette, Check, Sun, Moon, Sparkles, Type, X, Loader2 } from 'lucide-react';
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

const themes = [darkTheme, midnightTheme, lightTheme];

// --- FONT DEFINITIONS ---

const FONTS = {
  inter: "'Inter', sans-serif",
  apple: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"
};

// --- LOGO COMPONENT ---

const OfertikoLogo: React.FC<{ theme: Theme; onClick: () => void }> = ({ theme, onClick }) => {
  const isDark = theme.id !== 'light';
  
  return (
    <div 
      onClick={onClick}
      className="relative w-32 h-32 mx-auto mb-6 animate-float group cursor-pointer select-none active:scale-95 transition-transform"
    >
      <svg key={theme.id} viewBox="0 0 200 200" className={`w-full h-full transition-transform duration-500 ease-in-out group-hover:rotate-6 group-hover:scale-110 ${isDark ? 'drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]' : 'drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]'}`}>
        <defs>
          {/* Glass Gradient for Head */}
          <linearGradient id="glass-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.8)"} />
            <stop offset="50%" stopColor={isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(255, 255, 255, 0.4)"} />
            <stop offset="100%" stopColor={isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.6)"} />
          </linearGradient>

          {/* Dynamic Sheen Gradient for Moving Reflection */}
          <linearGradient id="dynamic-sheen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="50%" stopColor="white" stopOpacity={isDark ? "0.08" : "0.3"}>
               <animate attributeName="stop-opacity" values={isDark ? "0.08;0.2;0.08" : "0.3;0.5;0.3"} dur="4s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="white" stopOpacity="0" />
            
            <animate attributeName="x1" values="-20%; 120%" dur="7s" repeatCount="indefinite" />
            <animate attributeName="y1" values="-20%; 120%" dur="7s" repeatCount="indefinite" />
            <animate attributeName="x2" values="20%; 160%" dur="7s" repeatCount="indefinite" />
            <animate attributeName="y2" values="20%; 160%" dur="7s" repeatCount="indefinite" />
          </linearGradient>

          {/* Colorful internal reflection with pulsing animation */}
          <linearGradient id="inner-glow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity={isDark ? "0.2" : "0.3"}>
              <animate attributeName="stop-color" values="#22d3ee;#ec4899;#a855f7;#22d3ee" dur="6s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor="#a855f7" stopOpacity={isDark ? "0.15" : "0.2"}>
              <animate attributeName="stop-color" values="#a855f7;#22d3ee;#ec4899;#a855f7" dur="6s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#ec4899" stopOpacity={isDark ? "0.2" : "0.3"}>
              <animate attributeName="stop-color" values="#ec4899;#a855f7;#22d3ee;#ec4899" dur="6s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
        </defs>
        
        {/* Antenna */}
        <line x1="100" y1="10" x2="100" y2="50" stroke="#a855f7" strokeWidth="4" strokeLinecap="round" />
        <circle cx="100" cy="10" r="6" fill="#ec4899" className="animate-pulse">
          <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* Head Shape (Squircle) */}
        <rect 
          x="30" y="40" width="140" height="130" rx="40" 
          fill="url(#glass-grad)" 
          stroke="url(#inner-glow)" 
          strokeWidth="2"
          className="backdrop-blur-sm"
        />
        
        {/* Sheen Overlay */}
        <rect 
          x="30" y="40" width="140" height="130" rx="40" 
          fill="url(#dynamic-sheen)" 
          pointerEvents="none"
        />
        
        {/* Internal Reflection Highlight */}
        <path d="M 40 80 Q 50 50 80 45" stroke={isDark ? "white" : "#1e293b"} strokeWidth="2" strokeOpacity="0.3" fill="none" />

        {/* Eyes */}
        <g className="animate-blink">
          <ellipse cx="75" cy="95" rx="10" ry="12" fill={isDark ? "white" : "#1e293b"} filter={isDark ? "drop-shadow(0 0 5px #22d3ee)" : ""} />
          <ellipse cx="125" cy="95" rx="10" ry="12" fill={isDark ? "white" : "#1e293b"} filter={isDark ? "drop-shadow(0 0 5px #22d3ee)" : ""} />
        </g>

        {/* Cheeks */}
        <circle cx="60" cy="115" r="6" fill="#ec4899" fillOpacity="0.3" />
        <circle cx="140" cy="115" r="6" fill="#ec4899" fillOpacity="0.3" />

        {/* Smile */}
        <path 
          d="M 75 130 Q 100 150 125 130" 
          stroke={isDark ? "white" : "#1e293b"} 
          strokeWidth="4" 
          strokeLinecap="round" 
          fill="none" 
          strokeOpacity="0.8"
        />
      </svg>
    </div>
  );
};

// --- THEME SWITCHER COMPONENT ---

const ThemeSwitcher: React.FC<{ currentTheme: Theme, onThemeChange: (t: Theme) => void }> = ({ currentTheme, onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute top-6 right-6 z-50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 ${currentTheme.colors.cardBg} ${currentTheme.colors.cardBorder} border backdrop-blur-md`}
      >
        <Palette className={`w-5 h-5 ${currentTheme.colors.textMain}`} />
      </button>

      {isOpen && (
        <div className={`absolute right-0 mt-2 w-48 rounded-xl border shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 ${currentTheme.colors.cardBg} ${currentTheme.colors.cardBorder}`}>
          <div className="p-2">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  onThemeChange(t);
                  setIsOpen(false);
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
                  <span>{t.label}</span>
                </div>
                {currentTheme.id === t.id && <Check className="w-3 h-3" />}
              </button>
            ))}
          </div>
        </div>
      )}
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

        <div className="space-y-3">
          <button
            onClick={() => onFontChange(FONTS.inter)}
            className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
              currentFont === FONTS.inter 
                ? `border-cyan-500 bg-cyan-500/10 ${theme.colors.textMain}` 
                : `${theme.colors.cardBorder} hover:bg-white/5 ${theme.colors.textSecondary}`
            }`}
          >
            <span style={{ fontFamily: FONTS.inter }}>Inter (Стандартен)</span>
            {currentFont === FONTS.inter && <Check className="w-4 h-4 text-cyan-500" />}
          </button>

          <button
            onClick={() => onFontChange(FONTS.apple)}
            className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
              currentFont === FONTS.apple 
                ? `border-cyan-500 bg-cyan-500/10 ${theme.colors.textMain}` 
                : `${theme.colors.cardBorder} hover:bg-white/5 ${theme.colors.textSecondary}`
            }`}
          >
            <span style={{ fontFamily: FONTS.apple }}>Apple System (SF)</span>
            {currentFont === FONTS.apple && <Check className="w-4 h-4 text-cyan-500" />}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

const App: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(darkTheme);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shakeInput, setShakeInput] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  
  // Secret Menu States
  const [fontFamily, setFontFamily] = useState(FONTS.inter);
  const [secretClicks, setSecretClicks] = useState(0);
  const [showSecretMenu, setShowSecretMenu] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) {
      setEmailError('');
    }
  };

  const handleEmailBlur = () => {
    if (email && !validateEmail(email)) {
      setEmailError('Моля, въведете валиден имейл адрес.');
      setShakeInput(true);
      setTimeout(() => setShakeInput(false), 500);
    }
    setIsInputFocused(false);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setEmailError('Моля, въведете валиден имейл адрес.');
      setShakeInput(true);
      setTimeout(() => setShakeInput(false), 500);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Send request to our Vercel API function
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
      } else {
        const data = await response.json().catch(() => ({}));
        if (data && data.error) {
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

    // Reset clicks if inactive for 2 seconds
    setTimeout(() => setSecretClicks(0), 2000);
  };

  const isDark = currentTheme.id !== 'light';
  
  const focusGradient = currentTheme.id === 'midnight' 
    ? 'bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600'
    : currentTheme.id === 'light'
      ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500'
      : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500'; // dark default

  return (
    <div 
      className={`min-h-screen w-full relative overflow-hidden flex flex-col transition-colors duration-500 ${currentTheme.colors.background}`}
      style={{ fontFamily: fontFamily }}
    >
      
      <ThemeSwitcher currentTheme={currentTheme} onThemeChange={setCurrentTheme} />

      <SecretFontMenu 
        isOpen={showSecretMenu} 
        onClose={() => setShowSecretMenu(false)} 
        currentFont={fontFamily} 
        onFontChange={setFontFamily} 
        theme={currentTheme}
      />

      {/* Animated Background blobs - Adjusted for Light/Dark Modes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
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
      <div className={`absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] -z-10 ${isDark ? 'opacity-20' : 'opacity-10 invert'}`}></div>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl w-full mx-auto text-center">
          
          {/* Logo */}
          <OfertikoLogo theme={currentTheme} onClick={handleLogoClick} />

          {/* Header Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 backdrop-blur-sm shadow-xl ${currentTheme.colors.cardBg} ${currentTheme.colors.cardBorder}`}>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
            <span className={`text-sm font-medium tracking-wide uppercase ${currentTheme.colors.textSecondary}`}>Work in Progress</span>
          </div>

          {/* Hero Text */}
          <h1 className={`text-5xl md:text-7xl font-extrabold mb-6 tracking-tight animate-fade-in-up ${currentTheme.colors.textMain}`}>
            <span className={`block text-3xl md:text-4xl font-light mb-2 ${currentTheme.colors.textSecondary}`}>Здравейте, аз съм Офертико!</span>
            Готвим нещо <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-text-shimmer">
              невероятно.
            </span>
          </h1>
          
          <p className={`text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed ${currentTheme.colors.textMuted}`}>
            Аз съм вашият нов AI помощник за най-добрите оферти. Моите дигитални архитекти все още ме сглобяват, но скоро ще бъда готов да ви помогна да пазарувате умно!
          </p>

          {/* Countdown Section */}
          <div className="mb-16">
            <Countdown theme={currentTheme} />
          </div>

          {/* Two Column Layout for Features */}
          <div className="grid md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
            
            {/* Left: Newsletter */}
            <div className={`border rounded-2xl p-8 backdrop-blur-sm text-left h-full flex flex-col justify-center transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/10 ${currentTheme.colors.cardBg} ${currentTheme.colors.cardBorder}`}>
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
                    {/* Gradient Border Background - Visible on focus */}
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
                      className={`relative z-10 w-full border rounded-xl py-3 pl-4 pr-12 focus:outline-none transition-all 
                        ${currentTheme.colors.inputBg} 
                        ${currentTheme.colors.textMain} 
                        ${isInputFocused ? 'border-transparent' : `${currentTheme.colors.inputBorder} focus:border-cyan-500`}
                        ${emailError ? 'border-red-500 focus:ring-red-500' : ''}
                        ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}
                      `}
                    />
                    <button
                      type="submit"
                      disabled={!!emailError || !email || isSubmitting}
                      className={`absolute right-1 top-1 bottom-1 p-2 rounded-lg transition-colors z-20 flex items-center justify-center ${
                        !!emailError || !email || isSubmitting
                          ? 'bg-slate-500/20 text-slate-400 cursor-not-allowed' 
                          : 'bg-cyan-600 hover:bg-cyan-500 text-white'
                      }`}
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <ArrowRight className="w-5 h-5" />
                      )}
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

            {/* Right: AI Foreman */}
            <div className="h-full">
              <AiForeman theme={currentTheme} />
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className={`py-8 border-t backdrop-blur-md z-10 ${currentTheme.colors.divider} ${currentTheme.colors.cardBg}`}>
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className={`flex items-center gap-2 text-sm ${currentTheme.colors.textMuted}`}>
            <Hammer className="w-4 h-4" />
            <span>&copy; {new Date().getFullYear()} ofertiko.com. Всички права запазени.</span>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className={`${currentTheme.colors.textMuted} hover:${currentTheme.colors.textMain} transition-colors transform hover:scale-110`}>
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className={`${currentTheme.colors.textMuted} hover:text-cyan-500 transition-colors transform hover:scale-110`}>
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className={`${currentTheme.colors.textMuted} hover:text-pink-500 transition-colors transform hover:scale-110`}>
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;