import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useMode } from '../context/ModeContext';
import { useTask } from '../context/TaskContext';
import { motion } from 'framer-motion';
import { TrendingUp, CheckCircle2, Clock, Target, Trophy } from 'lucide-react';
import { slideUp, pulse } from '../utils/animations';

const StatsPanel = () => {
  const { theme } = useTheme();
  const { isPlayMode, isFocusMode } = useMode();
  
  try {
    const { stats, tasks } = useTask();

    // Validate inputs
    const safeTasks = Array.isArray(tasks) ? tasks : [];
    const safeStats = stats || { total: 0, completed: 0, pending: 0, completionRate: 0 };

    // Calculate category stats
    const categoryStats = safeTasks.reduce((acc, task) => {
      if (task && task.completed && task.category) {
        acc[task.category] = (acc[task.category] || 0) + 1;
      }
      return acc;
    }, {});

    const topCategory = Object.entries(categoryStats).length > 0 
      ? Object.entries(categoryStats).sort((a, b) => b[1] - a[1])[0]
      : null;

  // In focus mode, show minimal stats
  if (isFocusMode) {
    return (
      <motion.div
        variants={slideUp}
        className={`p-4 rounded-2xl border ${
          theme === 'dark'
            ? 'bg-dark-surface border-dark-border'
            : 'bg-white border-light-border shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className={`w-5 h-5 ${
                theme === 'dark' ? 'text-green-400' : 'text-green-500'
              }`} />
              <span className={`font-medium ${
                theme === 'dark' ? 'text-dark-text' : 'text-light-text'
              }`}>
                {stats.completed} completed
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className={`w-5 h-5 ${
                theme === 'dark' ? 'text-dark-textSecondary' : 'text-light-textSecondary'
              }`} />
              <span className={`font-medium ${
                theme === 'dark' ? 'text-dark-text' : 'text-light-text'
              }`}>
                {stats.pending} pending
              </span>
            </div>
          </div>
          <div className={`text-2xl font-bold ${
            theme === 'dark' ? 'text-blue-400' : 'text-light-accent'
          }`}>
            {stats.completionRate}%
          </div>
        </div>
      </motion.div>
    );
  }

  // In play mode, show rich stats
  return (
    <motion.div
      variants={slideUp}
      className={`p-6 rounded-2xl border ${
        theme === 'dark'
          ? 'glass-card border-white/10 shadow-lg shadow-blue-500/5'
          : 'bg-white border-light-border shadow-sm'
      }`}
    >
      <h2 className={`text-lg font-bold mb-4 flex items-center gap-2 ${
        theme === 'dark' ? 'text-white' : 'text-light-text'
      }`}>
        <TrendingUp className="w-5 h-5" />
        Your Progress
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Tasks */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`card-3d p-4 rounded-xl ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20'
              : 'bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200'
          }`}
        >
          <Target className={`w-6 h-6 mb-2 ${
            theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
          }`} />
          <p className={`text-2xl font-bold ${
            theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
          }`}>
            {stats.total}
          </p>
          <p className={`text-sm ${
            theme === 'dark' ? 'text-dark-textSecondary' : 'text-light-textSecondary'
          }`}>
            Total Tasks
          </p>
        </motion.div>

        {/* Completed */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`card-3d p-4 rounded-xl ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-green-500/10 to-cyan-500/10 border border-green-500/20'
              : 'bg-gradient-to-br from-green-50 to-cyan-50 border border-green-200'
          }`}
        >
          <CheckCircle2 className={`w-6 h-6 mb-2 ${
            theme === 'dark' ? 'text-green-400' : 'text-green-600'
          }`} />
          <p className={`text-2xl font-bold ${
            theme === 'dark' ? 'text-green-400' : 'text-green-600'
          }`}>
            {stats.completed}
          </p>
          <p className={`text-sm ${
            theme === 'dark' ? 'text-dark-textSecondary' : 'text-light-textSecondary'
          }`}>
            Completed
          </p>
        </motion.div>

        {/* Pending */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`card-3d p-4 rounded-xl ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border border-orange-500/20'
              : 'bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-200'
          }`}
        >
          <Clock className={`w-6 h-6 mb-2 ${
            theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
          }`} />
          <p className={`text-2xl font-bold ${
            theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
          }`}>
            {stats.pending}
          </p>
          <p className={`text-sm ${
            theme === 'dark' ? 'text-dark-textSecondary' : 'text-light-textSecondary'
          }`}>
            Pending
          </p>
        </motion.div>

        {/* Completion Rate */}
        <motion.div
          variants={pulse}
          animate="animate"
          className={`card-3d p-4 rounded-xl ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20'
              : 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200'
          }`}
        >
          <div className={`text-3xl font-bold mb-1 ${
            theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
          }`}>
            {stats.completionRate}%
          </div>
          <p className={`text-sm ${
            theme === 'dark' ? 'text-dark-textSecondary' : 'text-light-textSecondary'
          }`}>
            Completion Rate
          </p>
          <div className={`w-full h-2 rounded-full mt-2 overflow-hidden ${
            theme === 'dark' ? 'bg-white/10' : 'bg-black/20'
          }`}>
            <motion.div
              className={`h-full rounded-full ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg shadow-blue-500/50'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${stats.completionRate}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      </div>

      {/* Top Category */}
      {topCategory && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-4 p-3 rounded-lg border flex items-center gap-2 ${
            theme === 'dark'
              ? 'bg-dark-surfaceHover border-dark-border'
              : 'bg-gray-50 border-light-border'
          }`}
        >
          <Trophy className={`w-4 h-4 ${
            theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'
          }`} />
          <p className={`text-sm ${
            theme === 'dark' ? 'text-dark-textSecondary' : 'text-light-textSecondary'
          }`}>
            Most productive in: <span className={`font-semibold ${
              theme === 'dark' ? 'text-dark-text' : 'text-light-text'
            }`}>{topCategory[0]}</span> ({topCategory[1]} tasks)
          </p>
        </motion.div>
      )}
    </motion.div>
  );
  } catch (error) {
    console.error('Error rendering StatsPanel:', error);
    return null;
  }
};

export default StatsPanel;
