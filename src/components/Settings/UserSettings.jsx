import React from 'react';
import { Moon, Sun, Type, Eye, Palette, MessageCircle, Trash2 } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useTheme } from '../../hooks/useTheme';
import { useImageUpload } from '../../hooks/useImageUpload';
import ImageUpload from '../Common/ImageUpload';
import { FONT_SIZE_OPTIONS, COUNSELING_STYLES } from '../../utils/helpers/constants';

const UserSettings = () => {
  const { state, dispatch } = useApp();
  const { darkMode, setDarkMode } = useTheme();
  const { background, uploadImage, removeImage } = useImageUpload();

  const { userPreferences } = state;

  const themeClasses = {
    card: darkMode 
      ? 'bg-gray-800/90 text-white border-gray-700' 
      : 'bg-white/90 text-gray-800 border-white/20',
    text: darkMode ? 'text-white' : 'text-gray-800',
    textMuted: darkMode ? 'text-gray-300' : 'text-gray-600'
  };

  const updatePreferences = (updates) => {
    const newPreferences = { ...userPreferences, ...updates };
    dispatch({ type: 'SET_USER_PREFERENCES', payload: newPreferences });
  };

  const handleImageUpload = async (file) => {
    try {
      await uploadImage(file);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const clearAllData = () => {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-2">
          User Settings
        </h2>
        <p className={`text-lg ${themeClasses.textMuted} mb-8`}>
          Customize your experience
        </p>

        <div className="space-y-6">
          {/* Appearance Settings */}
          <div className={`${themeClasses.card} p-6 rounded-2xl shadow-lg`}>
            <h3 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${themeClasses.text}`}>
              <Palette className="w-5 h-5 text-pink-500" />
              Appearance
            </h3>
            
            <div className="space-y-4">
              {/* Dark Mode Toggle */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <h4 className={`font-medium ${themeClasses.text}`}>Dark Mode</h4>
                  <p className={`text-sm ${themeClasses.textMuted}`}>
                    Switch between light and dark themes
                  </p>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    darkMode ? 'bg-pink-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      darkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Font Size */}
              <div>
                <h4 className={`font-medium mb-3 flex items-center gap-2 ${themeClasses.text}`}>
                  <Type className="w-4 h-4" />
                  Font Size
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {FONT_SIZE_OPTIONS.map(option => (
                    <button
                      key={option.value}
                      onClick={() => updatePreferences({ fontSize: option.value })}
                      className={`p-3 border-2 rounded-xl text-center transition-all hover:scale-105 ${
                        userPreferences.fontSize === option.value
                          ? 'border-pink-500 bg-pink-500/10 text-pink-500'
                          : `border-gray-200 dark:border-gray-600 hover:border-pink-300 ${themeClasses.text}`
                      }`}
                    >
                      <span className="text-sm font-medium">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Background Customization */}
          <div className={`${themeClasses.card} p-6 rounded-2xl shadow-lg`}>
            <h3 className={`text-xl font-semibold mb-4 ${themeClasses.text}`}>Background</h3>
            <ImageUpload
              currentImage={background}
              onImageUpload={handleImageUpload}
              onImageRemove={removeImage}
            />
          </div>

          {/* Chat Preferences */}
          <div className={`${themeClasses.card} p-6 rounded-2xl shadow-lg`}>
            <h3 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${themeClasses.text}`}>
              <MessageCircle className="w-5 h-5 text-pink-500" />
              Chat Preferences
            </h3>
            
            <div className="space-y-4">
              {/* Counseling Style */}
              <div>
                <h4 className={`font-medium mb-3 ${themeClasses.text}`}>Counseling Style</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {COUNSELING_STYLES.map(style => (
                    <button
                      key={style.value}
                      onClick={() => updatePreferences({ counselingStyle: style.value })}
                      className={`p-4 border-2 rounded-xl text-left transition-all hover:scale-105 ${
                        userPreferences.counselingStyle === style.value
                          ? 'border-pink-500 bg-pink-500/10 text-pink-500'
                          : `border-gray-200 dark:border-gray-600 hover:border-pink-300 ${themeClasses.text}`
                      }`}
                    >
                      <div className="font-medium">{style.label}</div>
                      <div className={`text-sm opacity-75 mt-1 ${themeClasses.textMuted}`}>{style.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Accessibility */}
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <h4 className={`font-medium ${themeClasses.text}`}>Reduced Motion</h4>
                    <p className={`text-sm ${themeClasses.textMuted}`}>
                      Minimize animations and transitions
                    </p>
                  </div>
                  <button
                    onClick={() => updatePreferences({ reducedMotion: !userPreferences.reducedMotion })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      userPreferences.reducedMotion ? 'bg-pink-500' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        userPreferences.reducedMotion ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Data Management */}
          <div className={`${themeClasses.card} p-6 rounded-2xl shadow-lg border-2 border-red-200 dark:border-red-800`}>
            <h3 className="text-xl font-semibold mb-4 text-red-600 dark:text-red-400">
              Data Management
            </h3>
            
            <div className="space-y-4">
              <p className="text-red-600 dark:text-red-400">
                This will permanently delete all your data including chat history, journal entries, and calendar events.
              </p>
              
              <button
                onClick={clearAllData}
                className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all hover:scale-105"
              >
                <Trash2 className="w-4 h-4" />
                Clear All Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;