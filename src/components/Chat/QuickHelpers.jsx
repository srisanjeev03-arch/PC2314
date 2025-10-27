import React from 'react';
import { Minimize2, Maximize2, ChevronDown, ChevronUp, BookOpen, Brain, Zap, Sparkles } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useTheme } from '../../hooks/useTheme';
import { useChat } from '../../hooks/useChat';
import { HELPER_PROMPTS } from '../../utils/helpers/constants';

const QuickHelpers = () => {
  const { state, dispatch } = useApp();
  const { darkMode } = useTheme();
  const { showHelpers, helpersMinimized, setActiveHelper, setShowHelpers, setHelpersMinimized } = useChat();

  const themeClasses = {
    card: darkMode 
      ? 'bg-gray-800/90 text-white border-gray-700' 
      : 'bg-white/90 text-gray-800 border-white/20',
    text: darkMode ? 'text-white' : 'text-gray-800',
    textMuted: darkMode ? 'text-gray-300' : 'text-gray-600'
  };

  const toggleShowHelpers = () => {
    setShowHelpers(!showHelpers);
  };

  const toggleHelpersMinimized = () => {
    setHelpersMinimized(!helpersMinimized);
  };

  const helperConfigs = {
    study: { icon: BookOpen, color: 'blue', borderColor: 'blue-500' },
    mindfulness: { icon: Brain, color: 'green', borderColor: 'green-500' },
    wellness: { icon: Zap, color: 'pink', borderColor: 'pink-500' }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={toggleShowHelpers}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 ${
            showHelpers ? 'bg-green-500/20 text-green-500' : 'bg-gray-500/20 text-gray-500'
          }`}
        >
          {showHelpers ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          <span className="text-sm font-medium">Quick Helpers</span>
        </button>
        
        {showHelpers && (
          <button
            onClick={toggleHelpersMinimized}
            className="p-2 hover:bg-pink-500/10 rounded-lg transition hover:scale-110 duration-200"
            title={helpersMinimized ? 'Expand Helpers' : 'Minimize Helpers'}
          >
            {helpersMinimized ? <ChevronDown className="w-5 h-5 text-pink-500" /> : <ChevronUp className="w-5 h-5 text-pink-500" />}
          </button>
        )}
      </div>

      {showHelpers && (
        <div className={`transition-all duration-500 ease-in-out ${
          helpersMinimized ? 'max-h-0 opacity-0' : 'max-h-96 opacity-100'
        } overflow-hidden`}>
          <h2 className={`text-xl font-bold mb-6 ${themeClasses.text} flex items-center gap-2 animate-fade-in`}>
            <Sparkles className="w-6 h-6 text-pink-500 animate-spin-slow" />
            Quick Helpers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(helperConfigs).map(([helperType, config]) => {
              const Icon = config.icon;
              return (
                <div
                  key={helperType}
                  className={`${themeClasses.card} p-6 rounded-2xl shadow-lg border border-${config.borderColor}/20 hover:border-${config.borderColor}/40 transition-all duration-300 hover:scale-105 cursor-pointer group animate-slide-in-left`}
                  onClick={() => setActiveHelper(helperType)}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 bg-${config.color}-500/20 rounded-xl group-hover:bg-${config.color}-500/30 transition-colors animate-pulse group-hover:animate-bounce`}>
                      <Icon className={`w-6 h-6 text-${config.color}-500`} />
                    </div>
                    <h3 className={`text-lg font-semibold ${themeClasses.text}`}>
                      {helperType.charAt(0).toUpperCase() + helperType.slice(1)} Helper
                    </h3>
                  </div>
                  <p className={`text-sm ${themeClasses.textMuted} mb-4`}>
                    {helperType === 'study' && 'Get help with studying, time management, and academic success'}
                    {helperType === 'mindfulness' && 'Practice mindfulness, meditation, and stress relief techniques'}
                    {helperType === 'wellness' && 'Get support for stress, anxiety, sleep, and daily wellness'}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {HELPER_PROMPTS[helperType].slice(0, 2).map((prompt, index) => (
                      <span key={index} className={`text-xs bg-${config.color}-500/10 text-${config.color}-500 px-2 py-1 rounded-full animate-fade-in`}>
                        {prompt.split(' ').slice(0, 3).join(' ')}...
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickHelpers;