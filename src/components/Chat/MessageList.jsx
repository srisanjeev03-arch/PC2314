import React, { useEffect, useRef } from 'react';
import { Heart } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useTheme } from '../../hooks/useTheme';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

const MessageList = () => {
  const { state } = useApp();
  const { darkMode } = useTheme();
  const messagesEndRef = useRef();

  const { messages, isTyping } = state;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Heart className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
            Welcome to Peer Council
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Start a conversation to get support and guidance
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      {isTyping && <TypingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;