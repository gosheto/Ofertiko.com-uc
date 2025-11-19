import React, { useState } from 'react';
import { Hammer, Mail, ArrowRight, Github, Twitter, Instagram, AlertCircle } from 'lucide-react';
import Countdown from './components/Countdown';
import AiForeman from './components/AiForeman';

const OfertikoLogo = () => (
  <div className="relative w-32 h-32 mx-auto mb-6 animate-float group cursor-pointer">
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-transform duration-500 ease-in-out group-hover:rotate-6 group-hover:scale-110">
      <defs>
        {/* Glass Gradient for Head - Refined for better transparency */}
        <linearGradient id="glass-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.15)" />
          <stop offset="50%" stopColor="rgba(255, 255, 255, 0.02)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0.1)" />
        </linearGradient>
        {/* Colorful internal reflection - Made more subtle */}
        <linearGradient id="inner-glow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#a855f7" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#ec4899" stopOpacity="0.2" />
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
      
      {/* Internal Reflection Highlight */}
      <path d="M 40 80 Q 50 50 80 45" stroke="white" strokeWidth="2" strokeOpacity="0.3" fill="none" />

      {/* Eyes */}
      <g className="animate-blink">
        <ellipse cx="75" cy="95" rx="10" ry="12" fill="white" filter="drop-shadow(0 0 5px #22d3ee)" />
        <ellipse cx="125" cy="95" rx="10" ry="12" fill="white" filter="drop-shadow(0 0 5px #22d3ee)" />
      </g>

      {/* Cheeks */}
      <circle cx="60" cy="115" r="6" fill="#ec4899" fillOpacity="0.3" />
      <circle cx="140" cy="115" r="6" fill="#ec4899" fillOpacity="0.3" />

      {/* Smile */}
      <path 
        d="M 75 130 Q 100 150 125 130" 
        stroke="white" 
        strokeWidth="4" 
        strokeLinecap="round" 
        fill="none" 
        strokeOpacity="0.8"
      />
    </svg>
  </div>
);

const App: React.FC = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [shakeInput, setShakeInput] = useState(false);

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
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateEmail(email)) {
      setSubscribed(true);
      // Logic to send email to backend would go here
    } else {
      setEmailError('Моля, въведете валиден имейл адрес.');
      setShakeInput(true);
      setTimeout(() => setShakeInput(false), 500);
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex flex-col">
      {/* Animated Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-long"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-extra-long"></div>
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 -z-10"></div>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl w-full mx-auto text-center">
          
          {/* Logo */}
          <OfertikoLogo />

          {/* Header Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-700 mb-8 backdrop-blur-sm shadow-xl">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
            <span className="text-slate-300 text-sm font-medium tracking-wide uppercase">Work in Progress</span>
          </div>

          {/* Hero Text */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight animate-fade-in-up">
            <span className="block text-3xl md:text-4xl font-light text-slate-300 mb-2">Здравейте, аз съм Офертико!</span>
            Готвим нещо <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-text-shimmer">
              невероятно.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Аз съм вашият нов AI помощник за най-добрите оферти. Моите дигитални архитекти все още ме сглобяват, но скоро ще бъда готов да ви помогна да пазарувате умно!
          </p>

          {/* Countdown Section */}
          <div className="mb-16">
            <Countdown />
          </div>

          {/* Two Column Layout for Features */}
          <div className="grid md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
            
            {/* Left: Newsletter */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm text-left h-full flex flex-col justify-center transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-cyan-500/10 rounded-lg">
                  <Mail className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Бъдете първи</h3>
              </div>
              <p className="text-slate-400 mb-6">
                Абонирайте се за нашия бюлетин, за да разберете кога Офертико стартира.
              </p>

              {!subscribed ? (
                <form onSubmit={handleSubscribe} className="relative" noValidate>
                  <div className={`relative ${shakeInput ? 'animate-shake' : ''}`}>
                    <input
                      type="email"
                      placeholder="твоят@email.com"
                      value={email}
                      onChange={handleEmailChange}
                      onBlur={handleEmailBlur}
                      className={`w-full bg-slate-800 border ${emailError ? 'border-red-500 focus:ring-red-500' : 'border-slate-700 focus:ring-cyan-500'} rounded-xl py-3 pl-4 pr-12 text-slate-200 focus:outline-none focus:ring-2 placeholder-slate-500 transition-all`}
                    />
                    <button
                      type="submit"
                      disabled={!!emailError || !email}
                      className={`absolute right-1 top-1 bottom-1 p-2 rounded-lg transition-colors ${
                        !!emailError || !email 
                          ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
                          : 'bg-cyan-600 hover:bg-cyan-500 text-white'
                      }`}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                  {emailError && (
                    <div className="flex items-center gap-2 text-red-400 bg-red-950/30 p-2 rounded-lg mt-3 border border-red-900/50 animate-in fade-in slide-in-from-top-1">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm font-medium">{emailError}</span>
                    </div>
                  )}
                </form>
              ) : (
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-center animate-in zoom-in duration-300">
                  🎉 Благодарим! Ще ви уведомим скоро.
                </div>
              )}
            </div>

            {/* Right: AI Foreman */}
            <div className="h-full">
              <AiForeman />
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800 bg-slate-950/50 backdrop-blur-md z-10">
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <Hammer className="w-4 h-4" />
            <span>&copy; {new Date().getFullYear()} ofertiko.com. Всички права запазени.</span>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-slate-500 hover:text-white transition-colors transform hover:scale-110">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors transform hover:scale-110">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-slate-500 hover:text-pink-500 transition-colors transform hover:scale-110">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;