import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useMode } from '../context/ModeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, RefreshCw } from 'lucide-react';
import { getMotivationalQuote } from '../utils/helpers';
import { slideUp, buttonHover } from '../utils/animations';

const QuoteSection = () => {
  const { theme } = useTheme();
  const { isPlayMode } = useMode();
  const [quote, setQuote] = useState(getMotivationalQuote());
  const [key, setKey] = useState(0);

  const refreshQuote = () => {
    setQuote(getMotivationalQuote());
    setKey(prev => prev + 1);
  };

  // In focus mode, don't show quotes
  if (!isPlayMode) return null;

  return (
    <motion.div
      variants={slideUp}
      className={`relative p-6 rounded-2xl border overflow-hidden ${
        theme === 'dark'
          ? 'glass-card border-dark-border'
          : 'bg-white border-light-border shadow-sm'
      }`}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 opacity-10 ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500'
          : 'bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-500'
      }`} />

      <div className="relative flex items-start gap-4">
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className={`p-3 rounded-xl flex-shrink-0 ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-blue-600 to-cyan-600'
              : 'bg-gradient-to-br from-blue-500 to-cyan-500'
          }`}
        >
          <Quote className="w-6 h-6 text-white" />
        </motion.div>

        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <p className={`text-lg font-medium mb-2 ${
                theme === 'dark' ? 'text-dark-text' : 'text-light-text'
              }`}>
                "{quote.text}"
              </p>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-dark-textSecondary' : 'text-light-textSecondary'
              }`}>
                — {quote.author}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.button
          variants={buttonHover}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          onClick={refreshQuote}
          className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
            theme === 'dark'
              ? 'hover:bg-dark-surfaceHover text-dark-textSecondary hover:text-dark-text'
              : 'hover:bg-gray-100 text-light-textSecondary hover:text-light-text'
          }`}
          aria-label="Get new quote"
        >
          <RefreshCw className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default QuoteSection;
