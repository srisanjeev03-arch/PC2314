import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useCalendar } from '../../hooks/useCalendar';
import CalendarGrid from './CalendarGrid';
import UpcomingEvents from './UpcomingEvents';
import EventModal from './EventModal';

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  const { darkMode } = useTheme();
  const { events, addEvent, updateEvent, deleteEvent } = useCalendar();

  const themeClasses = {
    card: darkMode 
      ? 'bg-gray-800/90 text-white border-gray-700' 
      : 'bg-white/90 text-gray-800 border-white/20',
    text: darkMode ? 'text-white' : 'text-gray-800'
  };

  const handleSaveEvent = (eventData) => {
    if (selectedEvent) {
      updateEvent(selectedEvent.id, eventData);
    } else {
      addEvent(eventData);
    }
    setShowEventModal(false);
    setSelectedEvent(null);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const navigateMonth = (direction) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Wellness Calendar
          </h2>
          <button
            onClick={() => setShowEventModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 
                       text-white rounded-xl hover:shadow-lg transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            Add Event
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CalendarGrid
              currentDate={currentDate}
              events={events}
              onNavigate={navigateMonth}
              onEventClick={handleEditEvent}
              darkMode={darkMode}
              themeClasses={themeClasses}
            />
          </div>

          <div className="lg:col-span-1">
            <UpcomingEvents
              events={events}
              onEventClick={handleEditEvent}
              darkMode={darkMode}
              themeClasses={themeClasses}
            />
          </div>
        </div>

        {showEventModal && (
          <EventModal
            event={selectedEvent}
            onSave={handleSaveEvent}
            onDelete={selectedEvent ? () => deleteEvent(selectedEvent.id) : null}
            onClose={() => {
              setShowEventModal(false);
              setSelectedEvent(null);
            }}
            darkMode={darkMode}
            themeClasses={themeClasses}
          />
        )}
      </div>
    </div>
  );
};

export default CalendarView;