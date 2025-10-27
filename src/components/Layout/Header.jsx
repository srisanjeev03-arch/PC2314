import React from 'react';
import { Moon, Sun, LogOut, Menu, Trash2, Heart } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { useChat } from '../../hooks/useChat';

const Header = () => {
  const { state, dispatch } = useApp();
  const { darkMode, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const { clearChat } = useChat();

  const { currentPage, menuOpen } = state;

  const themeClasses = {
    card: darkMode 
      ? 'bg-gray-800/90 text-white border-gray-700' 
      : 'bg-white/90 text-gray-800 border-white/20',
    text: darkMode ? 'text-white' : 'text-gray-800',
    textMuted: darkMode ? 'text-gray-300' : 'text-gray-600'
  };

  const pageTitles = {
    chat: 'Mental Wellness Support',
    calendar: 'Schedule & Reminders',
    journal: 'Personal Journal',
    'api-settings': 'AI Configuration',
    'user-settings': 'Preferences'
  };

  const toggleMenu = () => {
    dispatch({ type: 'SET_MENU_OPEN', payload: !menuOpen });
  };

  return (
    <header className={`${themeClasses.card} backdrop-blur-sm border-b border-gray-200 shadow-lg`}>
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleMenu}
            className="p-2 hover:bg-pink-500/10 rounded-2xl transition hover:scale-110 duration-200 lg:hidden"
          >
            <Menu className="w-6 h-6 text-pink-500" />
          </button>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl shadow-lg animate-pulse hover:animate-bounce transition-all duration-300">
              <Heart className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
                Peer Council
              </h1>
              <p className={`text-sm ${themeClasses.textMuted} font-medium`}>
                {pageTitles[currentPage]}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-3 hover:bg-pink-500/10 rounded-2xl transition hover:scale-110 duration-200"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
          </button>
          
          {currentPage === 'chat' && (
            <button
              onClick={clearChat}
              className={`flex items-center gap-2 text-sm ${themeClasses.text} hover:text-pink-500 transition font-medium px-4 py-2 hover:bg-pink-500/10 rounded-lg hover:scale-105 duration-200`}
            >
              <Trash2 className="w-4 h-4" />
              Clear Chat
            </button>
          )}
          
          <span className={`text-base font-medium bg-pink-500/10 px-4 py-2 rounded-lg ${themeClasses.text} animate-pulse hidden sm:block`}>
            Hi, {state.user?.name}!
          </span>

          <button
            onClick={logout}
            className="p-3 hover:bg-pink-500/10 rounded-2xl transition shadow-sm border border-pink-500/20 hover:scale-105 duration-200"
            title="Logout"
          >
            <LogOut className="w-5 h-5 text-pink-500" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;