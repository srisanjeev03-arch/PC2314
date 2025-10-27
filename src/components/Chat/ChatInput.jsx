import React, { useState } from 'react';
import { Send, AlertCircle } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useTheme } from '../../hooks/useTheme';
import { useApi } from '../../hooks/useApi';
import { useChat } from '../../hooks/useChat';

const ChatInput = () => {
  const [input, setInput] = useState('');
  const { state, dispatch } = useApp();
  const { darkMode } = useTheme();
  const { sendMessage, loading, error, clearError } = useApi();
  const { addMessage, setActiveHelper } = useChat();

  const { selectedAI, apiKeys, messages } = state;

  const themeClasses = {
    input: darkMode 
      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
      : 'bg-white border-gray-200 text-gray-800 placeholder-gray-500',
    text: darkMode ? 'text-white' : 'text-gray-800'
  };

  const handleSend = async (customMessage = null) => {
    const messageToSend = customMessage || input.trim();
    if (!messageToSend || loading) return;

    // Clear any previous errors
    clearError();

    const userMessage = {
      role: 'user',
      content: messageToSend
    };

    addMessage(userMessage);
    setInput('');
    setActiveHelper(null);

    dispatch({ type: 'SET_TYPING', payload: true });

    try {
      const apiKey = apiKeys[selectedAI];
      if (!apiKey) {
        throw new Error(`${selectedAI} API key not configured. Please add your API key in settings.`);
      }

      const context = messages.slice(-6).map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await sendMessage(messageToSend, apiKey, selectedAI, context);
      
      const aiMessage = {
        role: 'assistant',
        content: response
      };
      
      addMessage(aiMessage);
    } catch (error) {
      const errorMessage = {
        role: 'assistant',
        content: `❌ **Error**: ${error.message}\n\nPlease check your API settings or try again later.`
      };
      addMessage(errorMessage);
    } finally {
      dispatch({ type: 'SET_TYPING', payload: false });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Error Display */}
      {error && (
        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl animate-fade-in">
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            clearError(); // Clear error when user starts typing
          }}
          onKeyPress={handleKeyPress}
          placeholder="Share what's on your mind... (Press Enter to send)"
          className={`flex-1 px-6 py-4 border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition text-lg shadow-sm hover:scale-105 duration-200 ${themeClasses.input}`}
          disabled={loading}
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || loading}
          className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg font-semibold hover:from-pink-600 hover:to-purple-700"
        >
          <Send className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;