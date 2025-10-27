import React, { useState } from 'react';
import { Key, Shield, ExternalLink, CheckCircle, XCircle, Trash2 } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useTheme } from '../../hooks/useTheme';
import { useApi } from '../../hooks/useApi';
import { AI_PROVIDERS } from '../../utils/helpers/constants';

const ApiSettings = () => {
  const { state, dispatch } = useApp();
  const { darkMode } = useTheme();
  const { sendMessage } = useApi();
  
  const { apiKeys, selectedAI } = state;
  const [tempKeys, setTempKeys] = useState({});
  const [testing, setTesting] = useState(null);
  const [testResults, setTestResults] = useState({});

  const themeClasses = {
    card: darkMode 
      ? 'bg-gray-800/90 text-white border-gray-700' 
      : 'bg-white/90 text-gray-800 border-white/20',
    text: darkMode ? 'text-white' : 'text-gray-800',
    textMuted: darkMode ? 'text-gray-300' : 'text-gray-600',
    input: darkMode 
      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
      : 'bg-white border-gray-200 text-gray-800 placeholder-gray-500'
  };

  const saveApiKey = (aiModel) => {
    const key = tempKeys[aiModel]?.trim();
    if (!key) return;
    
    const newApiKeys = {
      ...apiKeys,
      [aiModel]: key
    };
    
    dispatch({ type: 'SET_API_KEYS', payload: newApiKeys });
    setTempKeys(prev => ({ ...prev, [aiModel]: '' }));
    setTestResults(prev => ({ ...prev, [aiModel]: null }));
  };

  const testApiKey = async (aiModel, key) => {
    setTesting(aiModel);
    setTestResults(prev => ({ ...prev, [aiModel]: null }));
    
    try {
      const testMessage = "Hello, this is a test message.";
      await sendMessage(testMessage, key, aiModel);
      setTestResults(prev => ({ ...prev, [aiModel]: 'valid' }));
    } catch (error) {
      setTestResults(prev => ({ ...prev, [aiModel]: 'invalid' }));
    } finally {
      setTesting(null);
    }
  };

  const deleteApiKey = (aiModel) => {
    const newApiKeys = {
      ...apiKeys,
      [aiModel]: ''
    };
    
    dispatch({ type: 'SET_API_KEYS', payload: newApiKeys });
    setTempKeys(prev => ({ ...prev, [aiModel]: '' }));
    setTestResults(prev => ({ ...prev, [aiModel]: null }));
  };

  const handleTempKeyChange = (aiModel, value) => {
    setTempKeys(prev => ({ ...prev, [aiModel]: value }));
  };

  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-2">
          AI API Settings
        </h2>
        <p className={`text-lg ${themeClasses.textMuted} mb-8`}>
          Configure your AI provider API keys
        </p>

        <div className="space-y-6">
          {AI_PROVIDERS.map((provider) => (
            <div key={provider.id} className={`${themeClasses.card} p-6 rounded-2xl shadow-lg`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className={`text-xl font-semibold mb-1 ${themeClasses.text}`}>{provider.name}</h3>
                  <p className={themeClasses.textMuted}>{provider.description}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  {apiKeys[provider.id] ? (
                    <div className="flex items-center gap-2 text-green-500">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">Configured</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-500">
                      <XCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">Not configured</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <input
                      type="password"
                      placeholder={provider.placeholder}
                      value={tempKeys[provider.id] || apiKeys[provider.id] || ''}
                      onChange={(e) => handleTempKeyChange(provider.id, e.target.value)}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all ${themeClasses.input}`}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    {apiKeys[provider.id] && (
                      <>
                        <button
                          onClick={() => testApiKey(provider.id, apiKeys[provider.id])}
                          disabled={testing === provider.id}
                          className="px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 
                                     disabled:opacity-50 transition-all hover:scale-105"
                        >
                          {testing === provider.id ? 'Testing...' : 'Test'}
                        </button>
                        <button
                          onClick={() => deleteApiKey(provider.id)}
                          className="px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 
                                     transition-all hover:scale-105"
                          title="Delete API Key"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    
                    <button
                      onClick={() => saveApiKey(provider.id)}
                      disabled={!tempKeys[provider.id]?.trim()}
                      className="px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white 
                                 rounded-xl hover:shadow-lg disabled:opacity-50 transition-all hover:scale-105"
                    >
                      {apiKeys[provider.id] ? 'Update' : 'Save'}
                    </button>
                  </div>
                </div>

                {testResults[provider.id] && (
                  <div className={`p-3 rounded-lg ${
                    testResults[provider.id] === 'valid' 
                      ? 'bg-green-500/20 text-green-600 dark:text-green-400' 
                      : 'bg-red-500/20 text-red-600 dark:text-red-400'
                  }`}>
                    {testResults[provider.id] === 'valid' 
                      ? '✅ API key is valid and working' 
                      : '❌ API key is invalid or not working'}
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Shield className="w-4 h-4" />
                  <span>Your API keys are stored locally and never shared</span>
                </div>

                <a
                  href={provider.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-pink-500 hover:text-pink-600 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Get API key from {provider.name}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Security Notice */}
        <div className={`mt-8 p-6 bg-blue-500/10 rounded-2xl border border-blue-500/20`}>
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">
                Security & Privacy
              </h4>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                • API keys are stored locally in your browser<br/>
                • No data is sent to our servers<br/>
                • Conversations are processed directly by AI providers<br/>
                • You can clear all data anytime via browser settings
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiSettings;