import React, { useState } from 'react';
import { X } from 'lucide-react';
import Modal from '../Common/Modal';
import { MOOD_OPTIONS } from '../../utils/helpers/constants';

const JournalEditor = ({ entry, onSave, onClose, darkMode, themeClasses }) => {
  const [formData, setFormData] = useState({
    title: entry?.title || '',
    content: entry?.content || '',
    mood: entry?.mood || '',
    tags: entry?.tags || []
  });

  const [currentTag, setCurrentTag] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.target.name !== 'content') {
      e.preventDefault();
      if (e.target.name === 'tag') {
        addTag();
      }
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title={entry ? 'Edit Journal Entry' : 'New Journal Entry'} size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Enter entry title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">How are you feeling?</label>
          <div className="flex gap-2 flex-wrap">
            {MOOD_OPTIONS.map(mood => (
              <button
                key={mood}
                type="button"
                onClick={() => handleChange('mood', mood)}
                className={`text-2xl p-2 rounded-lg transition-all ${
                  formData.mood === mood
                    ? 'bg-pink-500/20 scale-110'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-105'
                }`}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={(e) => handleChange('content', e.target.value)}
            rows={8}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
            placeholder="Write your thoughts and feelings..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Tags</label>
          <div className="flex gap-2 mb-2">
            <input
              name="tag"
              type="text"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Add a tag"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all hover:scale-105"
            >
              Add
            </button>
          </div>
          <div className="flex gap-2 flex-wrap">
            {formData.tags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 bg-pink-500/10 text-pink-600 dark:text-pink-400 text-sm rounded-full"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="hover:text-pink-800 dark:hover:text-pink-200"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-all hover:scale-105"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl hover:shadow-lg transition-all hover:scale-105"
          >
            {entry ? 'Update Entry' : 'Save Entry'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default JournalEditor;