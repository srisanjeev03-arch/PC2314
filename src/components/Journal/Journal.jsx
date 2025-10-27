import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useJournal } from '../../hooks/useJournal';
import JournalList from './JournalList';
import JournalEditor from './JournalEditor';
import JournalFilters from './JournalFilters';

const Journal = () => {
  const [showEditor, setShowEditor] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [moodFilter, setMoodFilter] = useState('all');
  
  const { darkMode } = useTheme();
  const { entries, addEntry, updateEntry, deleteEntry } = useJournal();

  const themeClasses = {
    text: darkMode ? 'text-white' : 'text-gray-800'
  };

  const handleSaveEntry = (entryData) => {
    if (currentEntry) {
      updateEntry(currentEntry.id, entryData);
    } else {
      addEntry(entryData);
    }
    setShowEditor(false);
    setCurrentEntry(null);
  };

  const handleEditEntry = (entry) => {
    setCurrentEntry(entry);
    setShowEditor(true);
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMood = moodFilter === 'all' || entry.mood === moodFilter;
    return matchesSearch && matchesMood;
  });

  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Personal Journal
          </h2>
          <button
            onClick={() => {
              setCurrentEntry(null);
              setShowEditor(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 
                       text-white rounded-xl hover:shadow-lg transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            New Entry
          </button>
        </div>

        <JournalFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          moodFilter={moodFilter}
          onMoodFilterChange={setMoodFilter}
          darkMode={darkMode}
          themeClasses={themeClasses}
        />

        <JournalList
          entries={filteredEntries}
          onEditEntry={handleEditEntry}
          onDeleteEntry={deleteEntry}
          darkMode={darkMode}
          themeClasses={themeClasses}
        />

        {showEditor && (
          <JournalEditor
            entry={currentEntry}
            onSave={handleSaveEntry}
            onClose={() => {
              setShowEditor(false);
              setCurrentEntry(null);
            }}
            darkMode={darkMode}
            themeClasses={themeClasses}
          />
        )}
      </div>
    </div>
  );
};

export default Journal;