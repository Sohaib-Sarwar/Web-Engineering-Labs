import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useMode } from '../context/ModeContext';
import { useTask } from '../context/TaskContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, SlidersHorizontal, ClipboardList, Trash2 } from 'lucide-react';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import { staggerContainer, listItem, buttonHover } from '../utils/animations';

const TaskList = () => {
  const { theme } = useTheme();
  const { isPlayMode } = useMode();
  const {
    getFilteredTasks,
    searchQuery,
    setSearchQuery,
    filterCategory,
    setFilterCategory,
    filterPriority,
    setFilterPriority,
    sortBy,
    setSortBy,
    categories,
    priorities,
    clearCompleted,
  } = useTask();

  const [showForm, setShowForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const tasks = getFilteredTasks();

  return (
    <div className="space-y-4">
      {/* Search and Filter Bar */}
      <div className={`p-4 rounded-2xl border card-3d ${
        theme === 'dark'
          ? isPlayMode ? 'glass-card border-dark-border' : 'bg-dark-surface border-dark-border'
          : 'bg-white border-light-border'
      }`}>
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="flex-1 relative group">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
              theme === 'dark' ? 'text-dark-textSecondary group-focus-within:text-blue-400' : 'text-light-textSecondary group-focus-within:text-blue-500'
            }`} />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-11 pr-4 py-2.5 rounded-xl border transition-all ${
                theme === 'dark'
                  ? 'bg-dark-bg border-dark-border text-dark-text placeholder:text-dark-textSecondary focus:border-blue-500 focus:bg-dark-surfaceHover'
                  : 'bg-light-bg border-light-border text-light-text placeholder:text-light-textSecondary focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            />
          </div>

          {/* Filter Toggle */}
          <motion.button
            variants={buttonHover}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            onClick={() => setShowFilters(!showFilters)}
            className={`btn-3d px-5 py-2.5 rounded-xl border transition-all flex items-center gap-2 font-medium ${
              showFilters
                ? theme === 'dark'
                  ? 'bg-blue-600/20 border-blue-500/30 text-blue-400'
                  : 'bg-blue-50 border-blue-200 text-blue-600'
                : theme === 'dark'
                ? 'bg-dark-surfaceHover border-dark-border text-dark-text hover:bg-dark-surfaceHover/80'
                : 'bg-white border-light-border text-light-text hover:bg-gray-50'
            }`}
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span className="hidden sm:inline">Filters</span>
          </motion.button>

          {/* Clear Completed Button */}
          {tasks.some(t => t.completed) && (
            <motion.button
              variants={buttonHover}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              onClick={clearCompleted}
              className={`btn-3d px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 font-medium ${
                theme === 'dark'
                  ? 'bg-red-600/20 border border-red-500/30 text-red-400 hover:bg-red-600/30'
                  : 'bg-red-50 border border-red-200 text-red-600 hover:bg-red-100'
              }`}
            >
              <Trash2 className="w-5 h-5" />
              <span className="hidden sm:inline">Clear</span>
            </motion.button>
          )}

          {/* Add Task Button */}
          <motion.button
            variants={buttonHover}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            onClick={() => setShowForm(true)}
            className={`btn-3d px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 font-semibold ${
              isPlayMode && theme === 'dark'
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-900/50'
                : theme === 'dark'
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <Plus className="w-5 h-5" strokeWidth={2.5} />
            <span>Add Task</span>
          </motion.button>
        </div>

        {/* Filters Dropdown */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 pt-4 border-t border-opacity-50 space-y-3"
            >
              {/* Category Filter */}
              <div>
                <label className={`text-xs font-semibold uppercase tracking-wider mb-3 block ${
                  theme === 'dark' ? 'text-dark-textSecondary' : 'text-light-textSecondary'
                }`}>
                  Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <motion.button
                      key={category}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFilterCategory(category)}
                      className={`btn-3d px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        filterCategory === category
                          ? theme === 'dark'
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
                            : 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                          : theme === 'dark'
                          ? 'bg-dark-surfaceHover text-dark-textSecondary hover:text-dark-text'
                          : 'bg-gray-100 text-light-textSecondary hover:text-light-text'
                      }`}
                    >
                      {category}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Priority Filter */}
              <div>
                <label className={`text-xs font-semibold uppercase tracking-wider mb-3 block ${
                  theme === 'dark' ? 'text-dark-textSecondary' : 'text-light-textSecondary'
                }`}>
                  Priority
                </label>
                <div className="flex flex-wrap gap-2">
                  {priorities.map((priority) => (
                    <motion.button
                      key={priority}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFilterPriority(priority)}
                      className={`btn-3d px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        filterPriority === priority
                          ? theme === 'dark'
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
                            : 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                          : theme === 'dark'
                          ? 'bg-dark-surfaceHover text-dark-textSecondary hover:text-dark-text'
                          : 'bg-gray-100 text-light-textSecondary hover:text-light-text'
                      }`}
                    >
                      {priority}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Sort Options */}
              <div>
                <label className={`text-xs font-semibold uppercase tracking-wider mb-3 block ${
                  theme === 'dark' ? 'text-dark-textSecondary' : 'text-light-textSecondary'
                }`}>
                  Sort by
                </label>
                <div className="flex flex-wrap gap-2">
                  {['date', 'category', 'status', 'priority'].map((sort) => (
                    <motion.button
                      key={sort}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSortBy(sort)}
                      className={`btn-3d px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
                        sortBy === sort
                          ? theme === 'dark'
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
                            : 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                          : theme === 'dark'
                          ? 'bg-dark-surfaceHover text-dark-textSecondary hover:text-dark-text'
                          : 'bg-gray-100 text-light-textSecondary hover:text-light-text'
                      }`}
                    >
                      {sort}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Task List */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <AnimatePresence mode="popLayout">
          {tasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-12 text-center rounded-2xl border ${
                theme === 'dark'
                  ? 'border-dark-border bg-dark-surface/50'
                  : 'border-light-border bg-white'
              }`}
            >
              <ClipboardList className={`w-16 h-16 mx-auto mb-4 ${
                theme === 'dark' ? 'text-dark-textSecondary' : 'text-light-textSecondary'
              }`} />
              <p className={`text-lg font-medium ${
                theme === 'dark' ? 'text-dark-text' : 'text-light-text'
              }`}>
                No tasks found
              </p>
              <p className={`mt-2 ${
                theme === 'dark' ? 'text-dark-textSecondary' : 'text-light-textSecondary'
              }`}>
                {searchQuery || filterCategory !== 'All'
                  ? 'Try adjusting your filters'
                  : 'Start by adding your first task'}
              </p>
            </motion.div>
          ) : (
            tasks.map((task, index) => (
              <motion.div
                key={task.id}
                variants={listItem}
                layout
              >
                <TaskCard task={task} index={index} />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>

      {/* Task Form Modal */}
      <TaskForm show={showForm} onClose={() => setShowForm(false)} />
    </div>
  );
};

export default TaskList;
