import React, { useState } from 'react';
import { Mail, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { Theme } from '../types';
import Countdown from './Countdown';
import AiForeman from './AiForeman';
import { OfertikoLogo } from './OfertikoLogo';

interface HeroSectionProps {
  theme: Theme;
  handleLogoClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ theme, handleLogoClick }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shakeInput, setShakeInput] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [touched, setTouched] = useState(false);

  const isDark = theme.id !== 'light' && theme.id !== 'pastel' && theme.id !== 'classic';

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

  let focusGradient = 'bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500';
  if (theme.id === 'midnight') {
    focusGradient = 'bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600';
  } else if (theme.id === 'light') {
    focusGradient = 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500';
  } else if (theme.id === 'pastel') {
    focusGradient = 'bg-gradient-to-r from-[#DFB446] via-[#E7DACB] to-[#C26D54]';
  } else if (theme.id === 'classic') {
    focusGradient = 'bg-gradient-to-r from-[#003399] via-[#111111] to-[#DC2626]';
  }


  return (
    <main className="flex-grow flex flex-col items-center justify-center px-4 pt-32 pb-12 relative z-10">
      <div className="max-w-4xl w-full mx-auto text-center">

        <div className="mx-auto mb-6 w-32 gravity-target">
          <OfertikoLogo theme={theme} onClick={handleLogoClick} />
        </div>

        <div className={`gravity-target inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 backdrop-blur-sm shadow-xl ${theme.colors.cardBg} ${theme.colors.cardBorder}`}>
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
          </span>
          <span className={`text-sm font-medium tracking-wide uppercase ${theme.colors.textSecondary}`}>Work in Progress</span>
        </div>

        <h1 className={`gravity-target text-5xl md:text-7xl font-extrabold mb-6 tracking-tight animate-fade-in-up ${theme.colors.textMain}`}>
          <span className={`block text-3xl md:text-4xl font-light mb-2 ${theme.colors.textSecondary}`}>Здравейте, аз съм Офертико!</span>
          Готвим нещо <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-text-shimmer">
            невероятно.
          </span>
        </h1>

        <p className={`gravity-target text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed ${theme.colors.textMuted}`}>
          Аз съм вашият нов AI помощник за откриване на най-добрите оферти. Всички оферти на едно място, сравнявай цени и спестявай пари от хиляди онлайн магазини.
        </p>

        <div className="mb-16 gravity-target">
          <Countdown theme={theme} />
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto mb-12">
          <div className={`gravity-target relative overflow-hidden group border rounded-2xl p-8 backdrop-blur-sm text-left h-full flex flex-col justify-center transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/20 ${theme.colors.cardBg} ${theme.colors.cardBorder}`}>

            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-600/20 rounded-full blur-3xl group-hover:bg-cyan-600/30 transition-all duration-500"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${isDark ? 'bg-cyan-500/10' : 'bg-cyan-100'}`}>
                  <Mail className={`w-6 h-6 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
                </div>
                <h3 className={`text-xl font-semibold ${theme.colors.textMain}`}>Бъдете първи</h3>
              </div>
              <p className={`mb-6 ${theme.colors.textMuted}`}>
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
                      className={`relative z-10 w-full border rounded-xl py-3 pl-4 pr-12 focus:outline-none transition-all ${theme.colors.inputBg} ${theme.colors.textMain} ${isInputFocused ? 'border-transparent' : `${theme.colors.inputBorder} focus:border-cyan-500`} ${emailError ? 'border-red-500 focus:ring-red-500' : ''} ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
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

          <div className="h-full gravity-target">
            <AiForeman theme={theme} />
          </div>
        </div>
      </div>
    </main>
  );
};
