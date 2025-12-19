import { Theme } from '../types';

export const darkTheme: Theme = {
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

export const midnightTheme: Theme = {
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

export const lightTheme: Theme = {
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

export const pastelTheme: Theme = {
  id: 'pastel',
  label: 'Пастел',
  colors: {
    background: 'bg-[#F5F0EB]',
    textMain: 'text-[#4A5D6B]',
    textSecondary: 'text-[#738A94]',
    textMuted: 'text-[#9BAdb6]',
    cardBg: 'bg-[#FFFFFF]/60',
    cardBorder: 'border-[#E7DACB]',
    inputBg: 'bg-[#FFFFFF]',
    inputBorder: 'border-[#738A94]/30',
    accent: 'text-[#C26D54]',
    buttonGradient: 'bg-gradient-to-r from-[#DFB446] to-[#C26D54] hover:from-[#EBC55E] hover:to-[#D67E65] shadow-[#C26D54]/20',
    divider: 'border-[#E7DACB]',
  }
};

export const classicTheme: Theme = {
  id: 'classic',
  label: 'Класик',
  colors: {
    background: 'bg-[#F3F4F6]',
    textMain: 'text-[#111111]',
    textSecondary: 'text-[#374151]',
    textMuted: 'text-[#6B7280]',
    cardBg: 'bg-white',
    cardBorder: 'border-gray-200',
    inputBg: 'bg-white',
    inputBorder: 'border-gray-300',
    accent: 'text-[#DC2626]',
    buttonGradient: 'bg-gradient-to-r from-[#003399] to-[#DC2626] hover:from-[#002288] hover:to-[#B91C1C] shadow-blue-900/20',
    divider: 'border-gray-200',
  }
};

export const themes = [darkTheme, midnightTheme, lightTheme, pastelTheme, classicTheme];
