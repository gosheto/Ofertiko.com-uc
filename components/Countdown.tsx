import React, { useState, useEffect } from 'react';
import { CountdownTime, Theme } from '../types';

interface CountdownProps {
  theme: Theme;
}

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

  const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className={`flex flex-col items-center p-2 backdrop-blur-md rounded-lg border min-w-[80px] transition-colors duration-300 ${theme.colors.cardBg} ${theme.colors.cardBorder}`}>
      <span 
        key={value}
        className={`text-3xl font-bold font-mono animate-count-pulse ${theme.colors.textMain}`}
      >
        {value < 10 ? `0${value}` : value}
      </span>
      <span className={`text-xs uppercase tracking-widest mt-1 ${theme.colors.textMuted}`}>{label}</span>
    </div>
  );

  return (
    <div className="flex gap-4 flex-wrap justify-center">
      <TimeUnit value={timeLeft.days} label="Дни" />
      <TimeUnit value={timeLeft.hours} label="Часа" />
      <TimeUnit value={timeLeft.minutes} label="Мин" />
      <TimeUnit value={timeLeft.seconds} label="Сек" />
    </div>
  );
};

export default Countdown;