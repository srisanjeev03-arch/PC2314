import React, { useState } from 'react';
import { Heart, Shield, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, setAuthPage } = useAuth();
  const { darkMode } = useTheme();

  const themeClasses = {
    background: darkMode 
      ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900' 
      : 'bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50',
    card: darkMode 
      ? 'bg-gray-800/90 text-white border-gray-700' 
      : 'bg-white/90 text-gray-800 border-white/20',
    text: darkMode ? 'text-white' : 'text-gray-800',
    textMuted: darkMode ? 'text-gray-300' : 'text-gray-600',
    input: darkMode 
      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
      : 'bg-white border-gray-200 text-gray-800 placeholder-gray-500'
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = () => {
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    login({ 
      name: email.split('@')[0], 
      email: email,
      id: Date.now().toString()
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className={`min-h-screen ${themeClasses.background} flex items-center justify-center p-4 transition-colors duration-300`}>
      <div className={`${themeClasses.card} backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-md border transition-all duration-300 hover:shadow-2xl`}>
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl mb-4 shadow-lg animate-pulse">
            <Heart className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-3">
            Peer Council
          </h1>
          <p className={`text-lg ${themeClasses.textMuted}`}>Your safe space for mental wellness</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl shadow-sm">
            <p className="text-red-500 text-sm text-center font-medium">{error}</p>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className={`block text-sm font-semibold ${themeClasses.text} mb-3`}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition text-lg ${themeClasses.input}`}
              placeholder="your.email@university.edu"
            />
          </div>
          <div>
            <label className={`block text-sm font-semibold ${themeClasses.text} mb-3`}>Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition text-lg pr-12 ${themeClasses.input}`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105 shadow-lg hover:from-pink-600 hover:to-purple-700"
          >
            Sign In
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className={themeClasses.textMuted}>
            Don't have an account?{' '}
            <button
              onClick={() => setAuthPage('signup')}
              className="text-purple-500 font-bold hover:underline text-lg hover:text-purple-600 transition-colors"
            >
              Sign Up
            </button>
          </p>
        </div>

        <div className={`mt-8 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20`}>
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-blue-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-400">
              <strong className="font-semibold">Your privacy matters:</strong> All conversations are stored locally on your device.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;