import React, { useState } from 'react';
import { Bot, Loader2, Sparkles, MessageSquareQuote } from 'lucide-react';
import { LoadingState } from '../types';
import { generateConstructionUpdate } from '../services/geminiService';

const AiForeman: React.FC = () => {
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
    <div className="w-full h-full flex flex-col justify-center bg-slate-900/50 border border-indigo-500/20 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden group hover:border-indigo-500/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/20">
      
      {/* Decorative gradient background */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-600/20 rounded-full blur-3xl group-hover:bg-indigo-600/30 transition-all duration-500"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-indigo-600 rounded-lg">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-slate-200">AI Бригадир</h3>
        </div>
        
        <p className="text-slate-400 text-sm mb-6">
          Любопитни сте защо се бавим? Попитайте нашия изкуствен интелект за причината.
        </p>

        {status && (
          <div className="mb-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex gap-2 items-start">
              <MessageSquareQuote className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-1" />
              <p className="text-indigo-100 italic">"{status}"</p>
            </div>
          </div>
        )}

        <button
          onClick={handleAskAi}
          disabled={loadingState === LoadingState.LOADING}
          className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium rounded-xl shadow-lg shadow-indigo-900/20 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed h-12"
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