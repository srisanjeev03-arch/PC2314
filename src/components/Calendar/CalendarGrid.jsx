import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getDaysInMonth, getFirstDayOfMonth, isToday } from '../../utils/helpers/dateUtils';

const CalendarGrid = ({ currentDate, events, onNavigate, onEventClick, darkMode, themeClasses }) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const getEventsForDay = (day) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === day && 
             eventDate.getMonth() === month &&
             eventDate.getFullYear() === year;
    });
  };

  return (
    <div className={`${themeClasses.card} p-6 rounded-2xl shadow-lg`}>
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => onNavigate(-1)}
          className="p-2 hover:bg-pink-500/10 rounded-lg transition hover:scale-110"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <h3 className="text-xl font-semibold text-center">
          {monthName}
        </h3>
        
        <button
          onClick={() => onNavigate(1)}
          className="p-2 hover:bg-pink-500/10 rounded-lg transition hover:scale-110"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-semibold text-gray-500 dark:text-gray-400 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="h-24 border border-gray-200 dark:border-gray-600 rounded-lg" />
        ))}

        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const dayEvents = getEventsForDay(day);
          const today = isToday(new Date(year, month, day));

          return (
            <div
              key={day}
              className={`h-24 border rounded-lg p-2 overflow-y-auto cursor-pointer hover:shadow-md transition-all ${
                today 
                  ? 'border-pink-500 bg-pink-500/10' 
                  : 'border-gray-200 dark:border-gray-600 hover:border-pink-300'
              }`}
              onClick={() => {
                onEventClick({
                  date: new Date(year, month, day).toISOString().split('T')[0]
                });
              }}
            >
              <div className="flex justify-between items-start">
                <span className={`text-sm font-medium ${
                  today ? 'text-pink-500' : themeClasses.text
                }`}>
                  {day}
                </span>
              </div>
              
              <div className="mt-1 space-y-1">
                {dayEvents.slice(0, 2).map(event => (
                  <div
                    key={event.id}
                    className="text-xs bg-blue-500/20 text-blue-600 dark:text-blue-400 px-2 py-1 rounded truncate hover:bg-blue-500/30 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick(event);
                    }}
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 px-2">
                    +{dayEvents.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;