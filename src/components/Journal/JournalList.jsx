import React from 'react';
import { BookOpen, Calendar, Edit3, Trash2 } from 'lucide-react';
import { formatDate } from '../../utils/helpers/dateUtils';

const JournalList = ({ entries, onEditEntry, onDeleteEntry, darkMode, themeClasses }) => {
  if (entries.length === 0) {
    return (
      <div className={`${themeClasses.card} p-8 text-center rounded-2xl shadow-lg`}>
        <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No journal entries yet</h3>
        <p className="text-gray-500 dark:text-gray-400">
          Start writing to track your thoughts and feelings
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map(entry => (
        <div
          key={entry.id}
          className={`${themeClasses.card} p-6 rounded-2xl shadow-lg border-l-4 border-purple-500 hover:shadow-xl transition-all duration-300`}
        >
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-3">
              {entry.mood && (
                <span className="text-2xl">{entry.mood}</span>
              )}
              <div>
                <h3 className="font-semibold text-lg">{entry.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  {formatDate(entry.createdAt)}
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => onEditEntry(entry)}
                className="p-2 hover:bg-pink-500/10 rounded-lg transition hover:scale-110"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDeleteEntry(entry.id)}
                className="p-2 hover:bg-red-500/10 rounded-lg transition hover:scale-110"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {entry.content}
          </p>
          
          {entry.tags && entry.tags.length > 0 && (
            <div className="flex gap-2 mt-4">
              {entry.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-pink-500/10 text-pink-600 dark:text-pink-400 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default JournalList;