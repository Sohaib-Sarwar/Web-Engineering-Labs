import React, { useMemo, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useMode } from '../context/ModeContext';
import { useTask } from '../context/TaskContext';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle2, Circle, Clock } from 'lucide-react';
import { groupTasksByDate, groupTasksByDueDate, formatDate, formatDueDate } from '../utils/helpers';
import { slideUp, listItem, staggerContainer } from '../utils/animations';

const Timeline = () => {
  const { theme } = useTheme();
  const { isPlayMode } = useMode();
  const [viewMode, setViewMode] = useState('created'); // 'created' or 'due'
  
  try {
    const { tasks } = useTask();
    const safeTasks = Array.isArray(tasks) ? tasks : [];

    const groupedTasks = useMemo(() => 
      viewMode === 'created' ? groupTasksByDate(safeTasks) : groupTasksByDueDate(safeTasks), 
      [safeTasks, viewMode]
    );

  const TimelineSection = ({ title, tasks, icon }) => {
    if (tasks.length === 0) return null;

    // Sort tasks by priority: High > Medium > Low
    const priorityOrder = { 'High': 0, 'Medium': 1, 'Low': 2 };
    const sortedTasks = [...tasks].sort((a, b) => {
      return priorityOrder[a.priority || 'Medium'] - priorityOrder[b.priority || 'Medium'];
    });

    const getPriorityColor = (priority) => {
      const p = priority || 'Medium';
      if (p === 'High') return theme === 'dark' ? 'bg-red-500' : 'bg-red-500';
      if (p === 'Medium') return theme === 'dark' ? 'bg-yellow-500' : 'bg-yellow-500';
      return theme === 'dark' ? 'bg-green-500' : 'bg-green-500';
    };

    return (
      <div className="relative">
        <div className="flex items-center gap-3 mb-4 pl-1">
          <h3 className={`text-sm font-bold uppercase tracking-wider ${
            theme === 'dark' ? 'text-dark-text' : 'text-light-text'
          }`}>
            {title}
          </h3>
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            theme === 'dark'
              ? 'bg-dark-surfaceHover text-dark-textSecondary'
              : 'bg-gray-100 text-light-textSecondary'
          }`}>
            {tasks.length}
          </span>
        </div>
        
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className={`absolute left-[11px] top-0 bottom-0 w-[2px] ${
            theme === 'dark' ? 'bg-dark-border' : 'bg-gray-200'
          }`} />
          
          <div className="space-y-4">
            {sortedTasks.map((task, index) => (
              <motion.div
                key={task.id}
                variants={listItem}
                className="relative flex gap-4"
              >
                {/* Timeline Dot */}
                <div className="relative z-10 flex-shrink-0">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    theme === 'dark' ? 'border-dark-bg' : 'border-white'
                  } ${getPriorityColor(task.priority)}`}>
                    {task.completed ? (
                      <CheckCircle2 className="w-3 h-3 text-white" strokeWidth={3} />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                </div>

                {/* Task Card */}
                <motion.div
                  whileHover={{ scale: 1.02, x: 4 }}
                  className={`flex-1 p-4 rounded-xl border transition-all ${
                    theme === 'dark'
                      ? isPlayMode 
                        ? 'glass-card border-white/10 hover:border-blue-500/30'
                        : 'bg-dark-surfaceHover border-dark-border hover:border-blue-500/30'
                      : 'bg-white border-light-border hover:border-blue-500 shadow-sm hover:shadow-md'
                  } ${task.completed ? 'opacity-60' : ''}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-semibold mb-1 ${
                        task.completed ? 'line-through' : ''
                      } ${
                        theme === 'dark' ? 'text-dark-text' : 'text-light-text'
                      }`}>
                        {task.title}
                      </h4>
                      {task.description && (
                        <p className={`text-sm mb-2 line-clamp-2 ${
                          theme === 'dark' ? 'text-dark-textSecondary' : 'text-light-textSecondary'
                        }`}>
                          {task.description}
                        </p>
                      )}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${
                          theme === 'dark'
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            : 'bg-blue-50 text-blue-600 border border-blue-200'
                        }`}>
                          {task.category}
                        </span>
                        <span className={`text-xs ${
                          theme === 'dark' ? 'text-dark-textSecondary' : 'text-light-textSecondary'
                        }`}>
                          {formatDate(task.createdAt)}
                        </span>
                      </div>
                    </div>
                    
                    {/* Priority Badge */}
                    <span className={`flex-shrink-0 inline-flex items-center px-2 py-1 rounded-md text-xs font-bold border ${
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
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      variants={slideUp}
      className={`p-6 rounded-2xl border h-fit sticky top-6 ${
        theme === 'dark'
          ? isPlayMode ? 'glass-card border-white/10 shadow-lg shadow-blue-500/5' : 'bg-dark-surface border-dark-border'
          : 'bg-white border-light-border shadow-sm'
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Calendar className={`w-5 h-5 ${
            isPlayMode && theme === 'dark' ? 'text-blue-400' : theme === 'dark' ? 'text-dark-text' : 'text-light-text'
          }`} />
          <h2 className={`text-lg font-bold ${
            isPlayMode && theme === 'dark' ? 'text-white' : theme === 'dark' ? 'text-dark-text' : 'text-light-text'
          }`}>
            Timeline
          </h2>
        </div>
        
        {/* View Mode Toggle */}
        <div className={`flex rounded-lg p-1 ${
          theme === 'dark' ? 'bg-dark-bg' : 'bg-gray-100'
        }`}>
          <button
            onClick={() => setViewMode('created')}
            className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-all ${
              viewMode === 'created'
                ? theme === 'dark'
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'bg-white text-blue-600 shadow-sm'
                : theme === 'dark'
                ? 'text-dark-textSecondary hover:text-dark-text'
                : 'text-light-textSecondary hover:text-light-text'
            }`}
          >
            <Clock className="w-3 h-3" />
            Created
          </button>
          <button
            onClick={() => setViewMode('due')}
            className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-all ${
              viewMode === 'due'
                ? theme === 'dark'
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'bg-white text-blue-600 shadow-sm'
                : theme === 'dark'
                ? 'text-dark-textSecondary hover:text-dark-text'
                : 'text-light-textSecondary hover:text-light-text'
            }`}
          >
            <Calendar className="w-3 h-3" />
            Due
          </button>
        </div>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-8 custom-scrollbar max-h-[600px] overflow-y-auto pr-2"
      >
        {viewMode === 'created' ? (
          <>
            <TimelineSection
              title="Today"
              tasks={groupedTasks.today}
            />
            <TimelineSection
              title="Yesterday"
              tasks={groupedTasks.yesterday}
            />
            <TimelineSection
              title="This Week"
              tasks={groupedTasks.thisWeek}
            />
            <TimelineSection
              title="Older"
              tasks={groupedTasks.older}
            />
          </>
        ) : (
          <>
            <TimelineSection
              title="Overdue"
              tasks={groupedTasks.overdue}
            />
            <TimelineSection
              title="Today"
              tasks={groupedTasks.today}
            />
            <TimelineSection
              title="Tomorrow"
              tasks={groupedTasks.tomorrow}
            />
            <TimelineSection
              title="This Week"
              tasks={groupedTasks.thisWeek}
            />
            {/* Dynamic future date sections */}
            {Object.keys(groupedTasks.futureDates || {})
              .sort()
              .map(dateKey => (
                <TimelineSection
                  key={dateKey}
                  title={groupedTasks.futureDates[dateKey].label}
                  tasks={groupedTasks.futureDates[dateKey].tasks}
                />
              ))
            }
            <TimelineSection
              title="No Due Date"
              tasks={groupedTasks.noDueDate}
            />
          </>
        )}

        {safeTasks.length === 0 && (
          <div className="text-center py-8">
            <Calendar className={`w-12 h-12 mx-auto mb-2 ${
              theme === 'dark' ? 'text-dark-textSecondary' : 'text-light-textSecondary'
            }`} />
            <p className={`text-sm ${
              theme === 'dark' ? 'text-dark-textSecondary' : 'text-light-textSecondary'
            }`}>
              No tasks yet
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
  } catch (error) {
    console.error('Error rendering Timeline:', error);
    return null;
  }
};

export default Timeline;
