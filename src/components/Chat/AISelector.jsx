import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { useTheme } from '../../hooks/useTheme';

const AISelector = () => {
  const { state, dispatch } = useApp();
  const { darkMode } = useTheme();

  const { selectedAI, apiKeys } = state;

  const themeClasses = {
    card: darkMode 
      ? 'bg-gray-800/90 text-white border-gray-700' 
      : 'bg-white/90 text-gray-800 border-white/20',
    buttonSecondary: darkMode 
      ? 'bg-gray-700 text-white hover:bg-gray-600' 
      : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    text: darkMode ? 'text-white' : 'text-gray-800'
  };

  const aiProviders = [
    { id: 'chatgpt', name: 'ChatGPT' },
    { id: 'gemini', name: 'Gemini' },
    { id: 'groq', name: 'Groq' }
  ];

  const setSelectedAI = (ai) => {
    dispatch({ type: 'SET_SELECTED_AI', payload: ai });
  };

  return (
    <div className={`${themeClasses.card} backdrop-blur-sm border-b border-gray-200 px-6 py-4 shadow-sm mb-4`}>
      <div className="max-w-7xl mx-auto flex items-center gap-6">
        <span className={`text-base font-semibold ${themeClasses.text}`}>AI Model:</span>
        <div className="flex gap-3">
          {aiProviders.map((ai) => (
            <button
              key={ai.id}
              onClick={() => setSelectedAI(ai.id)}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all shadow-sm hover:scale-105 duration-200 ${
                selectedAI === ai.id
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg transform scale-105 animate-pulse'
                  : `${themeClasses.buttonSecondary}`
              }`}
            >
              {ai.name}
            </button>
          ))}
        </div>
        {!apiKeys[selectedAI] && (
          <span className="text-sm text-red-500 font-medium flex items-center gap-2 bg-red-500/10 px-4 py-2 rounded-lg animate-pulse">
            ⚠️ API key required
          </span>
        )}
      </div>
    </div>
  );
};

export default AISelector;