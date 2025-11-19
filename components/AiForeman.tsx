import React, { useState } from 'react';
import { Bot, Loader2, Sparkles, MessageSquareQuote } from 'lucide-react';
import { LoadingState, Theme } from '../types';
import { generateConstructionUpdate } from '../services/geminiService';

interface AiForemanProps {
  theme: Theme;
}

const AiForeman: React.FC<AiForemanProps> = ({ theme }) => {
  const [status, setStatus] = useState<string>("");
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);

  const handleAskAi = async () => {
    if (loadingState === LoadingState.LOADING) return;
    
    setLoadingState(LoadingState.LOADING);
    try {
      const text = await generateConstructionUpdate();
      setStatus(text);
      setLoadingState(LoadingState.SUCCESS);
    } catch (e) {
      setStatus("Възникна грешка при връзката с AI.");
      setLoadingState(LoadingState.ERROR);
    }
  };

  return (
    <div className={`w-full h-full flex flex-col justify-center rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden group transition-all duration-300 border hover:scale-[1.02] hover:shadow-2xl ${theme.colors.cardBg} ${theme.colors.cardBorder} hover:shadow-indigo-500/20`}>
      
      {/* Decorative gradient background */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-600/20 rounded-full blur-3xl group-hover:bg-indigo-600/30 transition-all duration-500"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-indigo-600 rounded-lg shadow-md">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <h3 className={`text-lg font-semibold ${theme.colors.textMain}`}>AI Бригадир</h3>
        </div>
        
        <p className={`text-sm mb-6 ${theme.colors.textSecondary}`}>
          Любопитни сте защо се бавим? Попитайте нашия изкуствен интелект за причината.
        </p>

        {status && (
          <div className={`mb-6 p-4 rounded-xl border animate-in fade-in slide-in-from-bottom-2 ${theme.colors.inputBg} ${theme.colors.inputBorder}`}>
            <div className="flex gap-2 items-start">
              <MessageSquareQuote className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-1" />
              <p className={`italic ${theme.colors.textMain}`}>"{status}"</p>
            </div>
          </div>
        )}

        <button
          onClick={handleAskAi}
          disabled={loadingState === LoadingState.LOADING}
          className={`w-full py-3 px-4 text-white font-medium rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed h-12 ${theme.colors.buttonGradient}`}
        >
          {loadingState === LoadingState.LOADING ? (
            <div className="flex items-center gap-2">
               <Loader2 className="w-5 h-5 animate-spin" />
               <span>Генериране...</span>
            </div>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Генерирай Причина</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AiForeman;