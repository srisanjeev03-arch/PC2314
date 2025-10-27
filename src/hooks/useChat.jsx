import { useApp } from '../contexts/AppContext';

export const useChat = () => {
  const { state, dispatch } = useApp();

  const addMessage = (message) => {
    const newMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    dispatch({ type: 'ADD_MESSAGE', payload: newMessage });
  };

  const clearChat = () => {
    dispatch({ type: 'CLEAR_CHAT' });
  };

  const setActiveHelper = (helper) => {
    dispatch({ type: 'SET_ACTIVE_HELPER', payload: helper });
  };

  const setShowHelpers = (show) => {
    dispatch({ type: 'SET_SHOW_HELPERS', payload: show });
  };

  const setHelpersMinimized = (minimized) => {
    dispatch({ type: 'SET_HELPERS_MINIMIZED', payload: minimized });
  };

  return {
    messages: state.messages,
    activeHelper: state.activeHelper,
    showHelpers: state.showHelpers,
    helpersMinimized: state.helpersMinimized,
    addMessage,
    clearChat,
    setActiveHelper,
    setShowHelpers,
    setHelpersMinimized
  };
};