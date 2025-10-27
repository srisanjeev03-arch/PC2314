import React, { useState } from 'react';
import { X, Trash2 } from 'lucide-react';
import Modal from '../Common/Modal';

const EventModal = ({ event, onSave, onDelete, onClose, darkMode, themeClasses }) => {
  const [formData, setFormData] = useState({
    title: event?.title || '',
    description: event?.description || '',
    date: event?.date || new Date().toISOString().split('T')[0],
    time: event?.time || '',
    type: event?.type || 'wellness'
  });

  const eventTypes = [
    { value: 'wellness', label: 'Wellness', color: 'bg-pink-500' },
    { value: 'therapy', label: 'Therapy', color: 'bg-purple-500' },
    { value: 'medication', label: 'Medication', color: 'bg-blue-500' },
    { value: 'exercise', label: 'Exercise', color: 'bg-green-500' },
    { value: 'social', label: 'Social', color: 'bg-yellow-500' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Modal isOpen={true} onClose={onClose} title={event ? 'Edit Event' : 'Create New Event'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Event Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Enter event title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Enter event description"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleChange('date', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Time (Optional)</label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => handleChange('time', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Event Type</label>
          <div className="grid grid-cols-2 gap-2">
            {eventTypes.map(type => (
              <button
                key={type.value}
                type="button"
                onClick={() => handleChange('type', type.value)}
                className={`p-3 border-2 rounded-lg text-center transition-all ${
                  formData.type === type.value
                    ? 'border-pink-500 bg-pink-500/10 text-pink-500'
                    : 'border-gray-200 dark:border-gray-600 hover:border-pink-300'
                }`}
              >
                <div className="flex items-center gap-2 justify-center">
                  <div className={`w-3 h-3 rounded-full ${type.color}`} />
                  <span className="text-sm font-medium">{type.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          {event && onDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all hover:scale-105"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          )}
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl hover:shadow-lg transition-all hover:scale-105"
          >
            {event ? 'Update Event' : 'Create Event'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EventModal;