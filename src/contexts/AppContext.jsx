import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AppContext = createContext();

const initialState = {
  user: null,
  darkMode: false,
  messages: [],
  journalEntries: [],
  calendarEvents: [],
  apiKeys: {
    chatgpt: '',
    gemini: '',
    groq: ''
  },
  userPreferences: {
    fontSize: 'medium',
    reducedMotion: false,
    counselingStyle: 'compassionate'
  },
  currentPage: 'chat',
  currentAuthPage: 'login',
  customBackground: '',
  menuOpen: false,
  showHelpers: true,
  helpersMinimized: false,
  activeHelper: null,
  selectedAI: 'chatgpt',
  isTyping: false
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_THEME':
      return { ...state, darkMode: action.payload };
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };
    case 'SET_AUTH_PAGE':
      return { ...state, currentAuthPage: action.payload };
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'SET_MESSAGES':
      return { ...state, messages: action.payload };
    case 'CLEAR_CHAT':
      return { ...state, messages: [] };
    case 'ADD_JOURNAL_ENTRY':
      return { ...state, journalEntries: [action.payload, ...state.journalEntries] };
    case 'SET_JOURNAL_ENTRIES':
      return { ...state, journalEntries: action.payload };
    case 'UPDATE_JOURNAL_ENTRY':
      return {
        ...state,
        journalEntries: state.journalEntries.map(entry =>
          entry.id === action.payload.id ? action.payload : entry
        )
      };
    case 'DELETE_JOURNAL_ENTRY':
      return {
        ...state,
        journalEntries: state.journalEntries.filter(entry => entry.id !== action.payload)
      };
    case 'ADD_CALENDAR_EVENT':
      return { ...state, calendarEvents: [...state.calendarEvents, action.payload] };
    case 'SET_CALENDAR_EVENTS':
      return { ...state, calendarEvents: action.payload };
    case 'UPDATE_CALENDAR_EVENT':
      return {
        ...state,
        calendarEvents: state.calendarEvents.map(event =>
          event.id === action.payload.id ? action.payload : event
        )
      };
    case 'DELETE_CALENDAR_EVENT':
      return {
        ...state,
        calendarEvents: state.calendarEvents.filter(event => event.id !== action.payload)
      };
    case 'SET_API_KEYS':
      return { ...state, apiKeys: action.payload };
    case 'SET_USER_PREFERENCES':
      return { ...state, userPreferences: action.payload };
    case 'SET_BACKGROUND':
      return { ...state, customBackground: action.payload };
    case 'SET_MENU_OPEN':
      return { ...state, menuOpen: action.payload };
    case 'SET_SHOW_HELPERS':
      return { ...state, showHelpers: action.payload };
    case 'SET_HELPERS_MINIMIZED':
      return { ...state, helpersMinimized: action.payload };
    case 'SET_ACTIVE_HELPER':
      return { ...state, activeHelper: action.payload };
    case 'SET_SELECTED_AI':
      return { ...state, selectedAI: action.payload };
    case 'SET_TYPING':
      return { ...state, isTyping: action.payload };
    case 'LOAD_STATE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [savedState, setSavedState] = useLocalStorage('peerCouncilState', initialState);
  const [state, dispatch] = useReducer(appReducer, { ...initialState, ...savedState });

  useEffect(() => {
    const stateToSave = {
      user: state.user,
      darkMode: state.darkMode,
      messages: state.messages,
      journalEntries: state.journalEntries,
      calendarEvents: state.calendarEvents,
      apiKeys: state.apiKeys,
      userPreferences: state.userPreferences,
      customBackground: state.customBackground,
      showHelpers: state.showHelpers,
      helpersMinimized: state.helpersMinimized,
      selectedAI: state.selectedAI
    };
    setSavedState(stateToSave);
  }, [state, setSavedState]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};