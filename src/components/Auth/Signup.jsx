import React, { useState } from 'react';
import { User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';

const Signup = () => {
  const [name, setName] = useState('');
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

  const handleSignup = () => {
    setError('');
    
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    login({ 
      name: name, 
      email: email,
      id: Date.now().toString()
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSignup();
    }
  };

  return (
    <div className={`min-h-screen ${themeClasses.background} flex items-center justify-center p-4 transition-colors duration-300`}>
      <div className={`${themeClasses.card} backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-md border transition-all duration-300 hover:shadow-2xl`}>
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg animate-bounce">
            <User className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-3">
            Join Peer Council
          </h1>
          <p className={`text-lg ${themeClasses.textMuted}`}>Start your journey to wellbeing</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl shadow-sm">
            <p className="text-red-500 text-sm text-center font-medium">{error}</p>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className={`block text-sm font-semibold ${themeClasses.text} mb-3`}>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition text-lg ${themeClasses.input}`}
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className={`block text-sm font-semibold ${themeClasses.text} mb-3`}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            onClick={handleSignup}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105 shadow-lg hover:from-blue-600 hover:to-purple-700"
          >
            Create Account
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className={themeClasses.textMuted}>
            Already have an account?{' '}
            <button
              onClick={() => setAuthPage('login')}
              className="text-blue-500 font-bold hover:underline text-lg hover:text-blue-600 transition-colors"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;