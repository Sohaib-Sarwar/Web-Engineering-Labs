import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useMode } from '../context/ModeContext';
import { useTask } from '../context/TaskContext';
import { useGamification } from '../context/GamificationContext';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Edit2, Trash2, MoreVertical, Briefcase, User, BookOpen, Heart, DollarSign, Tag, Calendar } from 'lucide-react';
import { getCategoryColor, getCategoryIcon, formatDate, formatDueDate } from '../utils/helpers';
import { cardHover } from '../utils/animations';
import TaskForm from './TaskForm';

const TaskCard = ({ task, index }) => {
  const { theme } = useTheme();
  const { isPlayMode } = useMode();
  const { toggleComplete, deleteTask } = useTask();
  const { completeTask } = useGamification();
  const [showMenu, setShowMenu] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  // Icon mapper
  const iconMap = {
    Briefcase, User, BookOpen, Heart, DollarSign, Tag
  };
  const iconName = getCategoryIcon(task.category);
  const IconComponent = iconMap[iconName] || Tag;

  const handleToggleComplete = () => {
    try {
      // Call completeTask BEFORE toggling if marking as complete
      if (!task.completed && typeof completeTask === 'function') {
        completeTask(task);
      }
      
      // Then toggle the task completion status
      toggleComplete(task.id);
    } catch (error) {
      console.error('Error toggling task completion:', error);
      // Still try to toggle even if gamification fails
      try {
        toggleComplete(task.id);
      } catch (e) {
        console.error('Critical error in toggleComplete:', e);
      }
    }
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  return (
    <>
      <motion.div
        variants={isPlayMode ? cardHover : {}}
        initial="rest"
        whileHover="hover"
        className={`relative p-4 rounded-xl border transition-all ${
          theme === 'dark'
            ? isPlayMode
              ? 'glass-card card-3d border-white/10 hover:glass-card-hover hover:border-blue-500/30'
              : 'bg-dark-surface border-dark-border card-3d'
            : 'bg-white border-light-border card-3d'
        } ${task.completed ? 'opacity-60' : ''} ${showMenu ? 'z-30' : ''}`}
      >
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleToggleComplete}
            className="mt-1 flex-shrink-0"
          >
            {task.completed ? (
              <CheckCircle2 className={`w-6 h-6 ${
                theme === 'dark' ? 'text-green-400' : 'text-green-500'
              }`} />
            ) : (
              <Circle className={`w-6 h-6 ${
                theme === 'dark' ? 'text-dark-textSecondary' : 'text-light-textSecondary'
              } hover:text-current transition-colors`} />
            )}
          </motion.button>

          {/* Task Content */}
          <div className="flex-1 min-w-0">
            <h3 className={`font-semibold mb-1 ${
              task.completed ? 'line-through' : ''
            } ${
              theme === 'dark' ? 'text-dark-text' : 'text-light-text'
            }`}>
              {task.title}
            </h3>
            
            {task.description && (
              <p className={`text-sm mb-2 ${
                theme === 'dark' ? 'text-dark-textSecondary' : 'text-light-textSecondary'
              }`}>
                {task.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-2 mt-2">
              {/* Category Badge */}
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border ${
                getCategoryColor(task.category, theme === 'dark')
              }`}>
                <IconComponent className="w-3 h-3" />
                {task.category}
              </span>

              {/* Priority Badge */}
              <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${
                (task.priority || 'Medium') === 'High'
                  ? theme === 'dark'
                    ? 'bg-red-500/20 text-red-400 border-red-500/30'
                    : 'bg-red-50 text-red-600 border-red-200'
                  : (task.priority || 'Medium') === 'Medium'
                  ? theme === 'dark'
                    ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                    : 'bg-yellow-50 text-yellow-600 border-yellow-200'
                  : theme === 'dark'
                  ? 'bg-green-500/20 text-green-400 border-green-500/30'
                  : 'bg-green-50 text-green-600 border-green-200'
              }`}>
                {task.priority || 'Medium'}
              </span>

              {/* Date */}
              <span className={`text-xs ${
                theme === 'dark' ? 'text-dark-textSecondary' : 'text-light-textSecondary'
              }`}>
                {formatDate(task.createdAt)}
              </span>

              {/* Due Date */}
              {task.dueDate && (
                <span className={`inline-flex items-center gap-1 text-xs ${
                  new Date(task.dueDate) < new Date() && !task.completed
                    ? theme === 'dark' ? 'text-red-400' : 'text-red-600'
                    : theme === 'dark' ? 'text-dark-textSecondary' : 'text-light-textSecondary'
                }`}>
                  <Calendar className="w-3 h-3" />
                  {formatDueDate(task.dueDate)}
                </span>
              )}

              {/* Completed Badge - Play Mode Only */}
              {isPlayMode && task.completed && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30"
                >
                  +15 XP
                </motion.span>
              )}
            </div>
          </div>

          {/* Actions Menu */}
          <div className="relative flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowMenu(!showMenu)}
              className={`p-1 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'hover:bg-dark-surfaceHover text-dark-textSecondary'
                  : 'hover:bg-gray-100 text-light-textSecondary'
              }`}
            >
              <MoreVertical className="w-4 h-4" />
            </motion.button>

            {showMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowMenu(false)}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className={`absolute right-0 top-8 z-20 w-40 rounded-lg border shadow-lg overflow-hidden ${
                    theme === 'dark'
                      ? 'bg-dark-surface border-dark-border'
                      : 'bg-white border-light-border'
                  }`}
                >
                  <button
                    onClick={() => {
                      setShowEditForm(true);
                      setShowMenu(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 transition-colors ${
                      theme === 'dark'
                        ? 'hover:bg-dark-surfaceHover text-dark-text'
                        : 'hover:bg-gray-50 text-light-text'
                    }`}
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      handleDelete();
                      setShowMenu(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 transition-colors ${
                      theme === 'dark'
                        ? 'hover:bg-red-500/10 text-red-400'
                        : 'hover:bg-red-50 text-red-600'
                    }`}
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </motion.div>
              </>
            )}
          </div>
        </div>

        {/* Play Mode Glow Effect */}
        {isPlayMode && !task.completed && theme === 'dark' && (
          <motion.div
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-blue-600/5 -z-10"
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </motion.div>

      <TaskForm
        show={showEditForm}
        onClose={() => setShowEditForm(false)}
        editTask={task}
      />
    </>
  );
};

export default TaskCard;
