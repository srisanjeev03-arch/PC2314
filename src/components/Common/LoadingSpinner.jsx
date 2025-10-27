import React from 'react';

const LoadingSpinner = ({ 
  size = 'medium', 
  className = '', 
  color = 'pink',
  text = '' 
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
    xlarge: 'w-16 h-16'
  };

  const colorClasses = {
    pink: 'border-t-pink-500',
    purple: 'border-t-purple-500',
    blue: 'border-t-blue-500',
    white: 'border-t-white'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div 
        className={`animate-spin rounded-full border-2 border-gray-300 ${sizeClasses[size]} ${colorClasses[color]}`} 
      />
      {text && (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;