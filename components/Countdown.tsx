import React, { useState, useEffect } from 'react';
import { CountdownTime, Theme } from '../types';

interface CountdownProps {
  theme: Theme;
}

// Extracted TimeUnit to prevent re-renders of static numbers
const TimeUnit: React.FC<{ value: number; label: string; theme: Theme }> = ({ value, label, theme }) => {
  const formattedValue = value < 10 ? `0${value}` : value;

  // Industrial Metal Styles Configuration
  const getMetalStyles = () => {
    if (theme.id === 'light') {
      // Chrome / Brushed Aluminum
      return {
        plate: 'bg-gradient-to-b from-slate-50 via-slate-100 to-slate-300',
        border: 'border-slate-300',
        borderBottom: 'border-b-slate-400',
        text: 'text-slate-700',
        shadow: 'shadow-[0_10px_20px_-5px_rgba(0,0,0,0.3)]',
        screw: 'bg-slate-200 border-slate-400',
      };
    } else if (theme.id === 'pastel') {
      // Matte Painted Metal (Blue Grey Plate with Terracotta/Beige accents)
      return {
        plate: 'bg-gradient-to-b from-[#738A94] via-[#637882] to-[#546770]',
        border: 'border-[#E7DACB]',
        borderBottom: 'border-b-[#C26D54]',
        text: 'text-[#F5F0EB]', // Off-white text for contrast
        shadow: 'shadow-[0_10px_20px_-5px_rgba(115,138,148,0.4)]',
        screw: 'bg-[#E7DACB] border-[#C26D54]',
      };
    } else if (theme.id === 'classic') {
      // Rally / Sport Style (Black Plate with Red/Blue accents)
      return {
        plate: 'bg-gradient-to-b from-[#1a1a1a] via-[#2c2c2c] to-[#000000]', // Black Carbon-ish
        border: 'border-[#DC2626]', // Red Border
        borderBottom: 'border-b-[#003399]', // Blue Bottom Border
        text: 'text-white',
        shadow: 'shadow-[0_10px_20px_-5px_rgba(0,0,0,0.5)]',
        screw: 'bg-gray-300 border-gray-500',
      };
    } else {
      // Gunmetal / Dark Steel
      return {
        plate: 'bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900',
        border: 'border-slate-600',
        borderBottom: 'border-b-slate-800',
        text: 'text-cyan-400',
        shadow: 'shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]',
        screw: 'bg-slate-700 border-slate-600',
      };
    }
  };

  const metal = getMetalStyles();

  return (
    <div className="flex flex-col items-center gap-4 mx-2">
      {/* 
        Added 'perspective' for 3D effect 
        Added padding bottom (pb-1) to parent to prevent border cropping
      */}
      <div
        className={`
          relative w-20 h-24 md:w-28 md:h-32 rounded-xl 
          flex items-center justify-center 
          border-x border-t border-b-[6px]
          transition-colors duration-300
          ${metal.plate} ${metal.border} ${metal.borderBottom} ${metal.shadow}
          perspective-[1000px]
        `}
      >
        {/* "Screws" in corners */}
        <div className={`absolute top-2 left-2 w-2.5 h-2.5 rounded-full border flex items-center justify-center ${metal.screw} shadow-inner opacity-80`}>
          <div className="w-1.5 h-[1px] bg-black/30 rotate-45"></div>
        </div>
        <div className={`absolute top-2 right-2 w-2.5 h-2.5 rounded-full border flex items-center justify-center ${metal.screw} shadow-inner opacity-80`}>
          <div className="w-1.5 h-[1px] bg-black/30 rotate-45"></div>
        </div>
        <div className={`absolute bottom-2 left-2 w-2.5 h-2.5 rounded-full border flex items-center justify-center ${metal.screw} shadow-inner opacity-80`}>
          <div className="w-1.5 h-[1px] bg-black/30 rotate-45"></div>
        </div>
        <div className={`absolute bottom-2 right-2 w-2.5 h-2.5 rounded-full border flex items-center justify-center ${metal.screw} shadow-inner opacity-80`}>
          <div className="w-1.5 h-[1px] bg-black/30 rotate-45"></div>
        </div>

        {/* The Number - Key triggers animation only on change */}
        <div className="relative z-20 overflow-hidden px-1">
          <span
            key={formattedValue}
            className={`
              block text-5xl md:text-6xl font-bold font-mono tracking-tighter
              animate-flip-card
              ${metal.text}
            `}
            style={{ backfaceVisibility: 'hidden' }}
          >
            {formattedValue}
          </span>
        </div>
      </div>

      <span className={`text-xs font-bold uppercase tracking-[0.2em] ${theme.colors.textMuted}`}>{label}</span>
    </div>
  );
};

const Countdown: React.FC<CountdownProps> = ({ theme }) => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Set a target date 14 days from now for demonstration purposes
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 14);

    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      let newTimeLeft: CountdownTime = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return newTimeLeft;
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-wrap justify-center items-end pb-4">
      <TimeUnit value={timeLeft.days} label="Дни" theme={theme} />
      <TimeUnit value={timeLeft.hours} label="Часа" theme={theme} />
      <TimeUnit value={timeLeft.minutes} label="Мин" theme={theme} />
      <TimeUnit value={timeLeft.seconds} label="Сек" theme={theme} />
    </div>
  );
};

export default Countdown;