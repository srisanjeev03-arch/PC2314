import React from 'react';
import { Bot } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const TypingIndicator = () => {
  const { darkMode } = useTheme();

  const themeClasses = {
    card: darkMode 
      ? 'bg-gray-800/90 text-white border-gray-700' 
      : 'bg-white/90 text-gray-800 border-white/20'
  };

  return (
    <div className="flex gap-4 animate-pulse">
      <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg animate-bounce">
        <Bot className="w-6 h-6 text-white" />
      </div>
      <div className={`${themeClasses.card} px-6 py-5 rounded-3xl shadow-lg border border-pink-500/20`}>
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;