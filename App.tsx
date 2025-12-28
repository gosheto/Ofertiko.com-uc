import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Theme } from './types';
import { themes, darkTheme } from './data/themes';
import { FONTS } from './data/fonts';
import { BACKGROUNDS } from './data/backgrounds';
import { Header } from './components/Header';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { SecretFontMenu } from './components/SecretFontMenu';
import { InkFlowAnimation } from './components/InkFlowAnimation';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { DealsPreview } from './components/DealsPreview';
import { JustForYouSection } from './components/JustForYouSection';
import { PopularPartnersSection } from './components/PopularPartnersSection';
import { NewFooter } from './components/NewFooter';

const App: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    const savedThemeId = localStorage.getItem('ofertiko-theme-id');
    if (savedThemeId) {
      const foundTheme = themes.find(t => t.id === savedThemeId);
      if (foundTheme) return foundTheme;
    }
    return darkTheme;
  });

  const [fontFamily, setFontFamily] = useState(() => {
    return localStorage.getItem('ofertiko-font-family') || FONTS.manrope;
  });

  const [backgroundMode, setBackgroundMode] = useState(() => {
    return localStorage.getItem('ofertiko-bg-mode') || 'solid';
  });

  const [radiusMode, setRadiusMode] = useState(() => {
    return localStorage.getItem('ofertiko-radius') || 'rounded';
  });

  const [secretClicks, setSecretClicks] = useState(0);
  const [showSecretMenu, setShowSecretMenu] = useState(false);
  const [gravityEnabled, setGravityEnabled] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!gravityEnabled) return;

    const targets = document.querySelectorAll('.gravity-target');
    const bodies: { el: HTMLElement, x: number, y: number, vx: number, vy: number, rot: number, vRot: number }[] = [];

    targets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const element = el as HTMLElement;

      element.style.position = 'fixed';
      element.style.left = `${rect.left}px`;
      element.style.top = `${rect.top}px`;
      element.style.width = `${rect.width}px`;
      element.style.zIndex = '1000';

      bodies.push({
        el: element,
        x: rect.left,
        y: rect.top,
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 2,
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

        if (b.y + b.el.offsetHeight > floor) {
          b.y = floor - b.el.offsetHeight;
          b.vy *= -0.6;
          b.vx *= friction;
          b.vRot *= friction;
        }

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

  const isDark = currentTheme.id !== 'light' && currentTheme.id !== 'pastel' && currentTheme.id !== 'classic';

  return (
    <div
      className={`min-h-screen w-full relative overflow-x-hidden flex flex-col transition-colors duration-500 ${currentTheme.colors.background} ${radiusMode === 'square' ? 'radius-square' : ''}`}
      style={{ fontFamily: fontFamily, ...getBackgroundStyle() }}
    >
      {backgroundMode !== 'solid' && (
        <div className={`absolute inset-0 z-0 pointer-events-none ${currentTheme.id === 'light' ? 'bg-white/80' : 'bg-black/70'} backdrop-blur-sm`}></div>
      )}

      <Header theme={currentTheme} scrollY={scrollY} />

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

      {backgroundMode === 'solid' && <InkFlowAnimation theme={currentTheme} />}

      {backgroundMode !== 'solid' && (
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div
            className={`absolute top-0 -left-4 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl animate-blob ${isDark ? 'bg-purple-600 opacity-20' : 'bg-purple-300 opacity-40'}`}
            style={{ animationDuration: '20s' }}
          ></div>
          <div
            className={`absolute top-0 -right-4 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-long ${isDark ? 'bg-cyan-600 opacity-20' : 'bg-cyan-300 opacity-40'}`}
            style={{ animationDuration: '25s' }}
          ></div>
        </div>
      )}

      <div className={`fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] -z-10 ${isDark ? 'opacity-20' : 'opacity-10 invert'} pointer-events-none`}></div>

      <HeroSection theme={currentTheme} handleLogoClick={handleLogoClick} />

      <div className="relative z-10">
        <FeaturesSection theme={currentTheme} />
        <DealsPreview theme={currentTheme} />
        <JustForYouSection theme={currentTheme} />
        <PopularPartnersSection theme={currentTheme} />
      </div>

      <NewFooter theme={currentTheme} />

      <Analytics />
    </div>
  );
};

export default App;
