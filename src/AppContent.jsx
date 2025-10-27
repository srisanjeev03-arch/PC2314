import React from 'react';
import { useApp } from './contexts/AppContext';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import MainLayout from './components/Layout/MainLayout';

const AppContent = () => {
  const { state } = useApp();
  const { user, currentAuthPage } = state;

  if (!user) {
    return currentAuthPage === 'signup' ? <Signup /> : <Login />;
  }

  return <MainLayout />;
};

export default AppContent;