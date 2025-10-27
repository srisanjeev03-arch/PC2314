import { useState } from 'react';
import { openaiApi, geminiApi, groqApi } from '../utils/api';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async (message, apiKey, provider, context = []) => {
    setLoading(true);
    setError(null);

    try {
      // Validate API key
      if (!apiKey || apiKey.trim() === '') {
        throw new Error(`${provider} API key is required`);
      }

      // Validate message
      if (!message || message.trim() === '') {
        throw new Error('Message cannot be empty');
      }

      let response;
      switch (provider) {
        case 'chatgpt':
          response = await openaiApi.sendMessage([...context, { role: 'user', content: message }], apiKey);
          break;
        case 'gemini':
          response = await geminiApi.sendMessage(message, apiKey);
          break;
        case 'groq':
          response = await groqApi.sendMessage([...context, { role: 'user', content: message }], apiKey);
          break;
        default:
          throw new Error('Unsupported AI provider');
      }
      
      return response;
    } catch (err) {
      console.error(`${provider} API Error:`, err);
      
      // Format user-friendly error messages
      let userMessage = err.message;
      
      if (err.message.includes('API key')) {
        userMessage = `Invalid ${provider} API key. Please check your API key in settings.`;
      } else if (err.message.includes('network') || err.message.includes('fetch')) {
        userMessage = `Network error: Unable to connect to ${provider}. Check your internet connection.`;
      } else if (err.message.includes('quota') || err.message.includes('rate limit')) {
        userMessage = `${provider} quota exceeded. Please check your API usage limits.`;
      } else if (err.message.includes('blocked') || err.message.includes('safety')) {
        userMessage = `Message blocked by ${provider} safety filters. Please try rephrasing your message.`;
      }
      
      setError(userMessage);
      throw new Error(userMessage);
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return { sendMessage, loading, error, clearError };
};