import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useMode } from '../context/ModeContext';
import { useTask } from '../context/TaskContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { buttonHover, scaleIn } from '../utils/animations';

const TaskForm = ({ show, onClose, editTask = null }) => {
  const { theme } = useTheme();
  const { isPlayMode } = useMode();
  const { addTask, updateTask, categories } = useTask();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Work',
    priority: 'Medium',
    dueDate: '',
  });

  useEffect(() => {
    if (editTask) {
      setFormData({
        title: editTask.title,
        description: editTask.description || '',
        category: editTask.category,
        priority: editTask.priority || 'Medium',
        dueDate: editTask.dueDate || '',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        category: 'Work',
        priority: 'Medium',
        dueDate: '',
      });
    }
  }, [editTask, show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) return;

    if (editTask) {
      updateTask(editTask.id, formData);
    } else {
      addTask(formData);
    }

    setFormData({ title: '', description: '', category: 'Work', priority: 'Medium', dueDate: '' });
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className={`relative w-full max-w-md rounded-2xl border p-6 ${
            theme === 'dark'
              ? isPlayMode
                ? 'glass-card border-dark-border'
                : 'bg-dark-surface border-dark-border'
              : 'bg-white border-light-border shadow-2xl'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-bold ${
              isPlayMode && theme === 'dark'
                ? 'text-white'
                : theme === 'dark'
                ? 'text-dark-text'
                : 'text-light-text'
            }`}>
              {editTask ? 'Edit Task' : 'New Task'}
            </h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'hover:bg-dark-surfaceHover text-dark-textSecondary'
                  : 'hover:bg-gray-100 text-light-textSecondary'
              }`}
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-dark-text' : 'text-light-text'
              }`}>
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter task title..."
                required
                autoFocus
                className={`w-full px-4 py-2 rounded-lg border transition-all ${
                  theme === 'dark'
                    ? 'bg-dark-bg border-dark-border text-dark-text placeholder:text-dark-textSecondary focus:border-blue-500'
                    : 'bg-light-bg border-light-border text-light-text placeholder:text-light-textSecondary focus:border-light-accent'
                } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                  theme === 'dark' ? 'focus:ring-blue-500' : 'focus:ring-light-accent'
                }`}
              />
            </div>

            {/* Description */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-dark-text' : 'text-light-text'
              }`}>
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Add details (optional)..."
                rows={3}
                className={`w-full px-4 py-2 rounded-lg border transition-all resize-none ${
                  theme === 'dark'
                    ? 'bg-dark-bg border-dark-border text-dark-text placeholder:text-dark-textSecondary focus:border-blue-500'
                    : 'bg-light-bg border-light-border text-light-text placeholder:text-light-textSecondary focus:border-light-accent'
                } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                  theme === 'dark' ? 'focus:ring-blue-500' : 'focus:ring-light-accent'
                }`}
              />
            </div>

            {/* Category */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-dark-text' : 'text-light-text'
              }`}>
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border transition-all ${
                  theme === 'dark'
                    ? 'bg-dark-bg border-dark-border text-dark-text focus:border-blue-500'
                    : 'bg-light-bg border-light-border text-light-text focus:border-light-accent'
                } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                  theme === 'dark' ? 'focus:ring-blue-500' : 'focus:ring-light-accent'
                }`}
              >
                {categories.filter(c => c !== 'All').map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-dark-text' : 'text-light-text'
              }`}>
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border transition-all ${
                  theme === 'dark'
                    ? 'bg-dark-bg border-dark-border text-dark-text focus:border-blue-500'
                    : 'bg-light-bg border-light-border text-light-text focus:border-light-accent'
                } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                  theme === 'dark' ? 'focus:ring-blue-500' : 'focus:ring-light-accent'
                }`}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            {/* Due Date */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-dark-text' : 'text-light-text'
              }`}>
                Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border transition-all ${
                  theme === 'dark'
                    ? 'bg-dark-bg border-dark-border text-dark-text focus:border-blue-500'
                    : 'bg-light-bg border-light-border text-light-text focus:border-light-accent'
                } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                  theme === 'dark' ? 'focus:ring-blue-500' : 'focus:ring-light-accent'
                }`}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <motion.button
                variants={buttonHover}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                type="button"
                onClick={onClose}
                className={`flex-1 px-4 py-2 rounded-lg border font-medium transition-colors ${
                  theme === 'dark'
                    ? 'border-dark-border hover:bg-dark-surfaceHover text-dark-text'
                    : 'border-light-border hover:bg-gray-50 text-light-text'
                }`}
              >
                Cancel
              </motion.button>
              <motion.button
                variants={buttonHover}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                type="submit"
                className={`btn-3d flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                  isPlayMode && theme === 'dark'
                    ? 'bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white border border-blue-500/30'
                    : theme === 'dark'
                    ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white'
                    : 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
                }`}
              >
                {editTask ? 'Update' : 'Create'} Task
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TaskForm;
