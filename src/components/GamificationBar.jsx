import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useMode } from '../context/ModeContext';
import { useGamification } from '../context/GamificationContext';
import { motion } from 'framer-motion';
import { Trophy, Zap, Flame, Award } from 'lucide-react';
import { slideUp } from '../utils/animations';

const GamificationBar = () => {
  const { theme } = useTheme();
  const { isPlayMode } = useMode();
  
  if (!isPlayMode) return null;

  try {
    const { level, xpProgress, streak, earnedBadges } = useGamification();
    const safeLevel = level || 1;
    const safeXpProgress = typeof xpProgress === 'number' && isFinite(xpProgress) ? xpProgress : 0;
    const safeStreak = streak?.current || 0;
    const safeBadges = Array.isArray(earnedBadges) ? earnedBadges : [];

  return (
    <motion.div
      variants={slideUp}
      className={`p-4 rounded-2xl border ${
        theme === 'dark'
          ? 'glass-card border-white/10 shadow-lg shadow-blue-500/10'
          : 'bg-white border-light-border shadow-sm'
      }`}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Level */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`card-3d flex items-center gap-3 p-3 rounded-xl ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border border-yellow-500/20'
              : 'bg-gradient-to-br from-yellow-100 to-yellow-200'
          }`}
        >
          <Trophy className={`w-5 h-5 ${
            theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'
          }`} />
          <div>
            <p className={`text-xs ${
              theme === 'dark' ? 'text-dark-textSecondary' : 'text-light-textSecondary'
            }`}>
              Level
            </p>
            <p className={`text-lg font-bold ${
              theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'
            }`}>
              {safeLevel}
            </p>
          </div>
        </motion.div>

        {/* XP Progress */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`card-3d flex items-center gap-3 p-3 rounded-xl ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20'
              : 'bg-gradient-to-br from-blue-100 to-cyan-100'
          }`}
        >
          <Zap className={`w-5 h-5 ${
            theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
          }`} />
          <div className="flex-1">
            <p className={`text-xs ${
              theme === 'dark' ? 'text-dark-textSecondary' : 'text-light-textSecondary'
            }`}>
              XP Progress
            </p>
            <div className={`w-full h-2 rounded-full mt-1 overflow-hidden ${
              theme === 'dark' ? 'bg-white/10' : 'bg-black/20'
            }`}>
              <motion.div
                className={`h-full rounded-full ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg shadow-blue-500/50'
                    : 'bg-gradient-to-r from-blue-600 to-cyan-600'
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${safeXpProgress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Streak */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`card-3d flex items-center gap-3 p-3 rounded-xl ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/20'
              : 'bg-gradient-to-br from-orange-100 to-red-100'
          }`}
        >
          <Flame className={`w-5 h-5 ${
            theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
          }`} />
          <div>
            <p className={`text-xs ${
              theme === 'dark' ? 'text-dark-textSecondary' : 'text-light-textSecondary'
            }`}>
              Streak
            </p>
            <p className={`text-lg font-bold ${
              theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
            }`}>
              {safeStreak}
            </p>
          </div>
        </motion.div>

        {/* Badges */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`card-3d flex items-center gap-3 p-3 rounded-xl ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20'
              : 'bg-gradient-to-br from-green-100 to-emerald-100'
          }`}
        >
          <Award className={`w-5 h-5 ${
            theme === 'dark' ? 'text-green-400' : 'text-green-600'
          }`} />
          <div>
            <p className={`text-xs ${
              theme === 'dark' ? 'text-dark-textSecondary' : 'text-light-textSecondary'
            }`}>
              Badges
            </p>
            <p className={`text-lg font-bold ${
              theme === 'dark' ? 'text-green-400' : 'text-green-600'
            }`}>
              {safeBadges.length}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
  } catch (error) {
    console.error('Error rendering GamificationBar:', error);
    return null;
  }
};

export default GamificationBar;
