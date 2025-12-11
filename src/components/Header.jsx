import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useMode } from '../context/ModeContext';
import { motion } from 'framer-motion';
import { Sparkles, Target } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import ModeToggle from './ModeToggle';
import GamificationBar from './GamificationBar';
import { slideUp } from '../utils/animations';

const Header = () => {
  const { theme } = useTheme();
  const { isPlayMode } = useMode();

  return (
    <motion.header
      variants={slideUp}
      className="space-y-4"
    >
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Logo and Title */}
        <motion.div 
          className="flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
        >
          {isPlayMode ? (
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className={`p-2 rounded-xl ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-blue-600 to-cyan-600'
                  : 'bg-gradient-to-br from-blue-500 to-cyan-500'
              }`}
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <div 
              className={`p-3 rounded-lg ${
                theme === 'dark' ? 'bg-dark-surface' : 'bg-white'
              }`}
              style={{
                boxShadow: theme === 'dark' 
                  ? '0 4px 12px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.05)'
                  : '0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.8)'
              }}
            >
              <Target className={`w-6 h-6 ${
                theme === 'dark' ? 'text-dark-text' : 'text-light-text'
              }`} />
            </div>
          )}
          
          <div>
            <h1 className={`text-2xl sm:text-3xl font-bold ${
              isPlayMode && theme === 'dark'
                ? 'bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-white to-blue-400'
                : theme === 'dark'
                ? 'text-dark-text'
                : 'text-light-text'
            }`}>
              TaskMaster
            </h1>
            <p className={`text-sm font-medium ${
              isPlayMode && theme === 'dark'
                ? 'text-blue-400'
                : theme === 'dark' 
                ? 'text-dark-textSecondary' 
                : 'text-light-textSecondary'
            }`}>
              {isPlayMode ? 'Level up your productivity' : 'Focus on what matters'}
            </p>
          </div>
        </motion.div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <ModeToggle />
          <ThemeToggle />
        </div>
      </div>

      {/* Gamification Bar - Only in Play Mode */}
      {isPlayMode && <GamificationBar />}
    </motion.header>
  );
};

export default Header;
