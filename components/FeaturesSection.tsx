import React from 'react';
import { Search, BarChart3, Bell, ShieldCheck, Zap, ShoppingBag } from 'lucide-react';
import { Theme } from '../types';

export const FeaturesSection: React.FC<{ theme: Theme }> = ({ theme }) => {
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

            <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 transition-all duration-1000 group-hover:left-[100%]"></div>

            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

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
