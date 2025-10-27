import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { useTheme } from '../../hooks/useTheme';
import { useChat } from '../../hooks/useChat';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import QuickHelpers from './QuickHelpers';
import AISelector from './AISelector';

const ChatInterface = () => {
  const { state } = useApp();
  const { darkMode } = useTheme();
  const { showHelpers, helpersMinimized, activeHelper } = useChat();

  const themeClasses = {
    card: darkMode 
      ? 'bg-gray-800/90 text-white border-gray-700' 
      : 'bg-white/90 text-gray-800 border-white/20',
    text: darkMode ? 'text-white' : 'text-gray-800'
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <AISelector />
      
      {!activeHelper && (
        <div className="px-6 py-2">
          <QuickHelpers />
        </div>
      )}

      {activeHelper && (
        <div className="px-6 py-4 animate-slide-in-down">
          {/* Active helper prompts would go here */}
        </div>
      )}

      <div className={`flex-1 overflow-y-auto px-6 transition-all duration-300 ${
        showHelpers && !helpersMinimized && !activeHelper ? 'py-4' : 'py-8'
      }`}>
        <MessageList />
      </div>

      <div className={`${themeClasses.card} backdrop-blur-sm border-t border-gray-200 px-6 py-6 shadow-lg mt-4`}>
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatInterface;