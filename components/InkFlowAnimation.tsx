import React from 'react';
import { Theme } from '../types';

export const InkFlowAnimation: React.FC<{ theme: Theme }> = ({ theme }) => {
  const isDark = theme.id !== 'light' && theme.id !== 'pastel' && theme.id !== 'classic';

  const colors = isDark
    ? ['bg-cyan-600', 'bg-purple-600', 'bg-pink-600', 'bg-blue-600']
    : ['bg-cyan-300', 'bg-purple-300', 'bg-pink-300', 'bg-blue-300'];

  return (
    <div className="absolute top-0 left-0 w-full h-[120vh] overflow-hidden pointer-events-none z-0">
      <div className={`absolute inset-0 z-10`} style={{ background: `linear-gradient(to bottom, transparent 60%, ${theme.id === 'light' ? 'rgba(248,250,252,1)' : theme.id === 'classic' ? '#F3F4F6' : theme.id === 'pastel' ? '#F5F0EB' : theme.id === 'midnight' ? 'rgba(30, 27, 75, 1)' : 'rgba(2, 6, 23, 1)'} 95%)` }}></div>

      <div className={`absolute top-[-20%] left-[10%] w-[60vw] md:w-[40vw] h-[60vw] md:h-[40vw] rounded-full mix-blend-multiply filter blur-[80px] md:blur-[80px] opacity-60 md:opacity-40 animate-flow-down ${colors[0]}`} style={{ animationDuration: '25s', animationDelay: '0s' }}></div>
      <div className={`absolute top-[-20%] right-[10%] w-[55vw] md:w-[35vw] h-[55vw] md:h-[35vw] rounded-full mix-blend-multiply filter blur-[80px] md:blur-[80px] opacity-60 md:opacity-40 animate-flow-down ${colors[1]}`} style={{ animationDuration: '30s', animationDelay: '5s' }}></div>
      <div className={`absolute top-[-30%] left-[40%] w-[65vw] md:w-[45vw] h-[65vw] md:h-[45vw] rounded-full mix-blend-multiply filter blur-[80px] md:blur-[80px] opacity-60 md:opacity-40 animate-flow-down ${colors[2]}`} style={{ animationDuration: '28s', animationDelay: '2s' }}></div>

      <div className={`absolute top-[10%] left-[20%] w-[30vw] md:w-[20vw] h-[30vw] md:h-[20vw] rounded-full mix-blend-multiply filter blur-[60px] opacity-50 md:opacity-30 animate-blob ${colors[3]}`} style={{ animationDuration: '20s' }}></div>
      <div className={`absolute top-[20%] right-[20%] w-[35vw] md:w-[25vw] h-[35vw] md:h-[25vw] rounded-full mix-blend-multiply filter blur-[60px] opacity-50 md:opacity-30 animate-blob animation-delay-4000 ${colors[0]}`} style={{ animationDuration: '24s' }}></div>
    </div>
  );
};
