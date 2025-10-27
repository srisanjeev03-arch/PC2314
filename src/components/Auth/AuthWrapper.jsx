import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../Common/LoadingSpinner';

const AuthWrapper = ({ children, fallback = null }) => {
  const { isAuthenticated, user } = useAuth();

  if (user === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return fallback || null;
  }

  return children;
};

export default AuthWrapper;