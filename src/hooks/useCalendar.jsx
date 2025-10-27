import { useApp } from '../contexts/AppContext';

export const useCalendar = () => {
  const { state, dispatch } = useApp();

  const addEvent = (event) => {
    const newEvent = {
      id: Date.now().toString(),
      ...event,
      createdAt: new Date().toISOString()
    };
    dispatch({ type: 'ADD_CALENDAR_EVENT', payload: newEvent });
  };

  const updateEvent = (eventId, updates) => {
    const updatedEvent = {
      ...state.calendarEvents.find(event => event.id === eventId),
      ...updates,
      updatedAt: new Date().toISOString()
    };
    dispatch({ type: 'UPDATE_CALENDAR_EVENT', payload: updatedEvent });
  };

  const deleteEvent = (eventId) => {
    dispatch({ type: 'DELETE_CALENDAR_EVENT', payload: eventId });
  };

  return {
    events: state.calendarEvents,
    addEvent,
    updateEvent,
    deleteEvent
  };
};