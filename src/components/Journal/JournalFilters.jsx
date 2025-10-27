import React from 'react';
import { Search } from 'lucide-react';
import { MOOD_OPTIONS } from '../../utils/helpers/constants';

const JournalFilters = ({ searchTerm, onSearchChange, moodFilter, onMoodFilterChange, darkMode, themeClasses }) => {
  return (
    <div className={`${themeClasses.card} p-4 rounded-2xl shadow-lg mb-6`}>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search entries..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-200 text-gray-800 placeholder-gray-500'
            }`}
          />
        </div>
        
        <select
          value={moodFilter}
          onChange={(e) => onMoodFilterChange(e.target.value)}
          className={`px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 ${
            darkMode 
              ? 'bg-gray-700 border-gray-600 text-white' 
              : 'bg-white border-gray-200 text-gray-800'
          }`}
        >
          <option value="all">All Moods</option>
          {MOOD_OPTIONS.map(mood => (
            <option key={mood} value={mood}>{mood} Mood</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default JournalFilters;