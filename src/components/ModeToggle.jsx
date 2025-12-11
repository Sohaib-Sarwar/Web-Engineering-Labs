import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useMode } from '../context/ModeContext';
import { motion } from 'framer-motion';
import { Zap, Focus } from 'lucide-react';
import { buttonHover } from '../utils/animations';

const ModeToggle = () => {
  const { theme } = useTheme();
  const { mode, toggleMode, isPlayMode } = useMode();

  return (
    <motion.button
      variants={buttonHover}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      onClick={toggleMode}
      className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
        isPlayMode
          ? theme === 'dark'
            ? 'bg-gradient-to-r from-blue-600 to-blue-800'
            : 'bg-gradient-to-r from-blue-500 to-blue-700'
          : theme === 'dark'
          ? 'bg-dark-border'
          : 'bg-gray-300'
      } shadow-lg`}
      aria-label="Toggle mode"
    >
      <motion.div
        className={`absolute top-1 left-1 w-6 h-6 rounded-full shadow-md flex items-center justify-center ${
          theme === 'dark' ? 'bg-dark-surface' : 'bg-white'
        }`}
        animate={{
          x: isPlayMode ? 32 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      >
        {isPlayMode ? (
          <Zap className={`w-4 h-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
        ) : (
          <Focus className={`w-4 h-4 ${theme === 'dark' ? 'text-dark-textSecondary' : 'text-gray-600'}`} />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ModeToggle;
