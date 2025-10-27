import React from 'react';
import { Calendar } from 'lucide-react';
import { formatDate } from '../../utils/helpers/dateUtils';

const UpcomingEvents = ({ events, onEventClick, darkMode, themeClasses }) => {
  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  return (
    <div className={`${themeClasses.card} p-6 rounded-2xl shadow-lg h-fit`}>
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-pink-500" />
        Upcoming Events
      </h3>
      
      {upcomingEvents.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
          No upcoming events
        </p>
      ) : (
        <div className="space-y-3">
          {upcomingEvents.map(event => (
            <div
              key={event.id}
              className="p-3 rounded-xl border-l-4 border-pink-500 bg-pink-500/5 cursor-pointer hover:bg-pink-500/10 transition-all hover:scale-105"
              onClick={() => onEventClick(event)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{event.title}</h4>
                  {event.description && (
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 truncate">
                      {event.description}
                    </p>
                  )}
                </div>
                <div className="text-right text-xs text-gray-500 dark:text-gray-400 ml-2">
                  <div>{formatDate(event.date)}</div>
                  {event.time && <div>{event.time}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingEvents;