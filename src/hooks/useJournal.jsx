import { useApp } from '../contexts/AppContext';

export const useJournal = () => {
  const { state, dispatch } = useApp();

  const addEntry = (entry) => {
    const newEntry = {
      id: Date.now().toString(),
      ...entry,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    dispatch({ type: 'ADD_JOURNAL_ENTRY', payload: newEntry });
  };

  const updateEntry = (entryId, updates) => {
    const updatedEntry = {
      ...state.journalEntries.find(entry => entry.id === entryId),
      ...updates,
      updatedAt: new Date().toISOString()
    };
    dispatch({ type: 'UPDATE_JOURNAL_ENTRY', payload: updatedEntry });
  };

  const deleteEntry = (entryId) => {
    dispatch({ type: 'DELETE_JOURNAL_ENTRY', payload: entryId });
  };

  return {
    entries: state.journalEntries,
    addEntry,
    updateEntry,
    deleteEntry
  };
};