import React from 'react';
import { Bot, User } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { formatTime } from '../../utils/helpers/dateUtils';

const MessageBubble = ({ message }) => {
  const { darkMode } = useTheme();

  const themeClasses = {
    card: darkMode 
      ? 'bg-gray-800/90 text-white border-gray-700' 
      : 'bg-white/90 text-gray-800 border-white/20',
    textMuted: darkMode ? 'text-gray-300' : 'text-gray-600'
  };

  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'} animate-fade-in`}>
      <div
        className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 ${
          isUser
            ? 'bg-gradient-to-r from-pink-500 to-purple-600 animate-bounce-once'
            : 'bg-gradient-to-r from-blue-500 to-purple-500 animate-bounce-once'
        }`}
      >
        {isUser ? (
          <User className="w-6 h-6 text-white" />
        ) : (
          <Bot className="w-6 h-6 text-white" />
        )}
      </div>
      <div
        className={`flex-1 max-w-2xl px-6 py-5 rounded-3xl shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl animate-message-bubble ${
          isUser
            ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
            : `${themeClasses.card} border border-pink-500/20`
        }`}
      >
        <p className="text-base leading-relaxed whitespace-pre-wrap">{message.content}</p>
        <span className={`text-xs mt-3 block font-medium ${isUser ? 'text-pink-100' : themeClasses.textMuted}`}>
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;