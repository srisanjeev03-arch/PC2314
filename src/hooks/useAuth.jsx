import { useApp } from '../contexts/AppContext';

export const useAuth = () => {
  const { state, dispatch } = useApp();

  const login = (userData) => {
    dispatch({ type: 'SET_USER', payload: userData });
  };

  const logout = () => {
    dispatch({ type: 'SET_USER', payload: null });
    dispatch({ type: 'SET_PAGE', payload: 'chat' });
  };

  const setAuthPage = (page) => {
    dispatch({ type: 'SET_AUTH_PAGE', payload: page });
  };

  return {
    user: state.user,
    login,
    logout,
    setAuthPage,
    isAuthenticated: !!state.user
  };
};