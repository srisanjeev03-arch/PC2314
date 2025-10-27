import { useApp } from '../contexts/AppContext';

export const useTheme = () => {
  const { state, dispatch } = useApp();

  const toggleTheme = () => {
    dispatch({ type: 'SET_THEME', payload: !state.darkMode });
  };

  const setDarkMode = (isDark) => {
    dispatch({ type: 'SET_THEME', payload: isDark });
  };

  return {
    darkMode: state.darkMode,
    toggleTheme,
    setDarkMode
  };
};