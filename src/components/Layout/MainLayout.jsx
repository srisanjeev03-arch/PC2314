import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { useTheme } from '../../hooks/useTheme';
import { useImageUpload } from '../../hooks/useImageUpload';
import Header from './Header';
import SideMenu from './SideMenu';
import ChatInterface from '../Chat/ChatInterface';
import CalendarView from '../Calendar/CalendarView';
import Journal from '../Journal/Journal';
import ApiSettings from '../Settings/ApiSettings';
import UserSettings from '../Settings/UserSettings';

const MainLayout = () => {
  const { state } = useApp();
  const { darkMode } = useTheme();
  const { background } = useImageUpload();

  const { currentPage, menuOpen } = state;

  const backgroundStyle = background 
    ? { 
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }
    : darkMode 
      ? { background: 'linear-gradient(135deg, #1f2937 0%, #3730a3 50%, #831843 100%)' }
      : { background: 'linear-gradient(135deg, #fdf2f8 0%, #faf5ff 50%, #f0f9ff 100%)' };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'calendar':
        return <CalendarView />;
      case 'journal':
        return <Journal />;
      case 'api-settings':
        return <ApiSettings />;
      case 'user-settings':
        return <UserSettings />;
      case 'chat':
      default:
        return <ChatInterface />;
    }
  };

  return (
    <div className="h-screen flex transition-colors duration-300" style={backgroundStyle}>
      <SideMenu />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <Header />
        <div className="flex-1 overflow-hidden">
          {renderCurrentPage()}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;