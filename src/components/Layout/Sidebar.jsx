// src/components/Layout/Sidebar.jsx
import React from 'react';
import { 
  MessageCircle, 
  BookOpen, 
  Calendar, 
  Settings, 
  User, 
  LogOut,
  Menu,
  X 
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';

const Sidebar = () => {
  const { state, dispatch } = useApp();
  const { logout } = useAuth();
  const { darkMode } = useTheme();
  const { menuOpen, currentPage, user } = state;

  const navigation = [
    { id: 'chat', name: 'Chat', icon: MessageCircle },
    { id: 'journal', name: 'Journal', icon: BookOpen },
    { id: 'calendar', name: 'Calendar', icon: Calendar },
    { id: 'api-settings', name: 'API Settings', icon: Settings },
    { id: 'user-settings', name: 'Settings', icon: User },
  ];

  const themeClasses = {
    sidebar: darkMode 
      ? 'bg-gray-800/90 border-r border-gray-700 backdrop-blur-lg' 
      : 'bg-white/90 border-r border-gray-200 backdrop-blur-lg',
    text: darkMode ? 'text-white' : 'text-gray-800',
    textMuted: darkMode ? 'text-gray-300' : 'text-gray-600',
    hover: darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100',
    active: darkMode ? 'bg-purple-600 text-white' : 'bg-purple-500 text-white'
  };

  const setCurrentPage = (page) => {
    dispatch({ type: 'SET_PAGE', payload: page });
    dispatch({ type: 'SET_MENU_OPEN', payload: false });
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => dispatch({ type: 'SET_MENU_OPEN', payload: !menuOpen })}
        className={`lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl backdrop-blur-lg ${
          darkMode ? 'bg-gray-800/90 text-white' : 'bg-white/90 text-gray-800'
        }`}
      >
        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      {menuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => dispatch({ type: 'SET_MENU_OPEN', payload: false })}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out
        ${menuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${themeClasses.sidebar}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  Peer Council
                </h1>
                <p className="text-sm opacity-75">Mental Wellness</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    currentPage === item.id 
                      ? themeClasses.active + ' shadow-lg'
                      : themeClasses.text + ' ' + themeClasses.hover
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-gray-100 dark:bg-gray-700">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.name || 'User'}</p>
                <p className="text-xs opacity-75 truncate">{user?.email || ''}</p>
              </div>
            </div>
            
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;