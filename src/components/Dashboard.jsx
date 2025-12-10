import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useMode } from '../context/ModeContext';
import { motion } from 'framer-motion';
import Header from './Header';
import TaskList from './TaskList';
import StatsPanel from './StatsPanel';
import Timeline from './Timeline';
import QuoteSection from './QuoteSection';
import { fadeIn } from '../utils/animations';

const Dashboard = () => {
  const { theme } = useTheme();
  const { isPlayMode } = useMode();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className={`min-h-screen transition-colors duration-500 overflow-x-hidden ${
        theme === 'dark'
          ? 'bg-black'
          : 'bg-light-bg'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <Header />
        
        <div className="mt-8 space-y-6">
          {/* Quote Section - More prominent in Play Mode */}
          <QuoteSection />

          {/* Stats Panel - Show in Play Mode or as minimal in Focus Mode */}
          <StatsPanel />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Task List - Takes more space */}
            <div className="lg:col-span-2">
              <TaskList />
            </div>

            {/* Timeline - Sidebar */}
            <div className="lg:col-span-1">
              <Timeline />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
