import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const GamificationContext = createContext();

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};

// Badge definitions
const BADGES = [
  { id: 'first_task', name: 'Getting Started', description: 'Complete your first task', icon: 'Star', requirement: 1 },
  { id: 'early_bird', name: 'Early Bird', description: 'Complete a task before 9 AM', icon: 'Sunrise', requirement: null },
  { id: 'productive_day', name: 'Productive Day', description: 'Complete 5 tasks in one day', icon: 'Flame', requirement: 5 },
  { id: 'streak_3', name: 'Streak Starter', description: '3-day streak', icon: 'Zap', requirement: 3 },
  { id: 'streak_7', name: 'Week Warrior', description: '7-day streak', icon: 'Crown', requirement: 7 },
  { id: 'streak_30', name: 'Streak Master', description: '30-day streak', icon: 'Trophy', requirement: 30 },
  { id: 'task_master', name: 'Task Master', description: 'Complete 50 tasks', icon: 'Target', requirement: 50 },
  { id: 'category_king', name: 'Well-Rounded', description: 'Complete tasks in all categories', icon: 'Palette', requirement: null },
];

export const GamificationProvider = ({ children }) => {
  const [xp, setXp] = useState(() => {
    try {
      const saved = localStorage.getItem('xp');
      return saved ? parseInt(saved) : 0;
    } catch (error) {
      console.error('Error loading XP:', error);
      return 0;
    }
  });

  const [level, setLevel] = useState(() => {
    try {
      const saved = localStorage.getItem('level');
      return saved ? parseInt(saved) : 1;
    } catch (error) {
      console.error('Error loading level:', error);
      return 1;
    }
  });

  const [streak, setStreak] = useState(() => {
    try {
      const saved = localStorage.getItem('streak');
      return saved ? JSON.parse(saved) : { current: 0, lastCompletedDate: null };
    } catch (error) {
      console.error('Error loading streak:', error);
      return { current: 0, lastCompletedDate: null };
    }
  });

  const [earnedBadges, setEarnedBadges] = useState(() => {
    try {
      const saved = localStorage.getItem('badges');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading badges:', error);
      return [];
    }
  });

  const [totalTasksCompleted, setTotalTasksCompleted] = useState(() => {
    try {
      const saved = localStorage.getItem('totalTasksCompleted');
      return saved ? parseInt(saved) : 0;
    } catch (error) {
      console.error('Error loading total tasks completed:', error);
      return 0;
    }
  });

  const [tasksCompletedToday, setTasksCompletedToday] = useState(() => {
    try {
      const saved = localStorage.getItem('tasksCompletedToday');
      const savedDate = localStorage.getItem('lastTaskDate');
      const today = new Date().toDateString();
      
      if (savedDate === today) {
        return saved ? parseInt(saved) : 0;
      }
      return 0;
    } catch (error) {
      console.error('Error loading tasks completed today:', error);
      return 0;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('xp', xp.toString());
      localStorage.setItem('level', level.toString());
      localStorage.setItem('streak', JSON.stringify(streak));
      localStorage.setItem('badges', JSON.stringify(earnedBadges));
      localStorage.setItem('totalTasksCompleted', totalTasksCompleted.toString());
      localStorage.setItem('tasksCompletedToday', tasksCompletedToday.toString());
      localStorage.setItem('lastTaskDate', new Date().toDateString());
    } catch (error) {
      console.error('Error saving gamification data to localStorage:', error);
    }
  }, [xp, level, streak, earnedBadges, totalTasksCompleted, tasksCompletedToday]);

  const xpForNextLevel = Math.max(level * 100, 100);
  const currentLevelXP = xp % xpForNextLevel;
  const xpProgress = xpForNextLevel > 0 ? Math.min(100, Math.max(0, (currentLevelXP / xpForNextLevel) * 100)) : 0;

  const addXP = (amount) => {
    try {
      if (typeof amount !== 'number' || isNaN(amount)) {
        console.error('Invalid XP amount:', amount);
        return;
      }
      const newXP = xp + amount;
      setXp(newXP);

      // Check for level up
      const newLevel = Math.max(1, Math.floor(newXP / 100) + 1);
      if (newLevel > level) {
        setLevel(newLevel);
        // Level up celebration
        if (typeof confetti === 'function') {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
      }
    } catch (error) {
      console.error('Error adding XP:', error);
    }
  };

  const updateStreak = () => {
    try {
      if (!streak || typeof streak.current !== 'number') {
        console.error('Invalid streak object:', streak);
        setStreak({ current: 0, lastCompletedDate: null });
        return;
      }
      const today = new Date().toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();

      if (streak.lastCompletedDate === today) {
        return; // Already updated today
      }

      if (streak.lastCompletedDate === yesterday || streak.current === 0) {
        const newStreak = {
          current: streak.current + 1,
          lastCompletedDate: today,
        };
        setStreak(newStreak);

        // Weekly streak celebration
        if (newStreak.current % 7 === 0 && typeof confetti === 'function') {
          confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.5 }
          });
        }

        checkStreakBadges(newStreak.current);
      } else {
        // Streak broken
        setStreak({ current: 1, lastCompletedDate: today });
      }
    } catch (error) {
      console.error('Error updating streak:', error);
    }
  };

  const completeTask = (task) => {
    try {
      // Add XP based on task
      const baseXP = 10;
      const categoryBonus = 5;
      addXP(baseXP + categoryBonus);

      // Update counts
      setTotalTasksCompleted(prev => prev + 1);
      setTasksCompletedToday(prev => prev + 1);

      // Update streak
      updateStreak();

      // Check badges
      checkBadges(task);

      // Celebration confetti for task completion
      if (typeof confetti === 'function') {
        setTimeout(() => {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#3B82F6', '#60A5FA', '#93C5FD', '#DBEAFE']
          });
        }, 100);
      }
    } catch (error) {
      console.error('Error completing task:', error);
      // Continue execution even if gamification fails
    }
  };

  const checkBadges = (task) => {
    try {
      const newBadges = [];

      // First task
      if (totalTasksCompleted + 1 === 1 && !earnedBadges.includes('first_task')) {
        newBadges.push('first_task');
      }

      // Productive day (5 tasks today)
      if (tasksCompletedToday + 1 >= 5 && !earnedBadges.includes('productive_day')) {
        newBadges.push('productive_day');
      }

      // Task master (50 total tasks)
      if (totalTasksCompleted + 1 >= 50 && !earnedBadges.includes('task_master')) {
        newBadges.push('task_master');
      }

      // Early bird (completed before 9 AM)
      const hour = new Date().getHours();
      if (hour < 9 && !earnedBadges.includes('early_bird')) {
        newBadges.push('early_bird');
      }

      if (newBadges.length > 0) {
        setEarnedBadges(prev => [...prev, ...newBadges]);
        // Badge earned celebration
        if (typeof confetti === 'function') {
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
          });
          confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
          });
        }
      }
    } catch (error) {
      console.error('Error checking badges:', error);
    }
  };

  const checkStreakBadges = (currentStreak) => {
    try {
      const streakBadges = [
        { id: 'streak_3', days: 3 },
        { id: 'streak_7', days: 7 },
        { id: 'streak_30', days: 30 },
      ];

      const newBadges = streakBadges
        .filter(badge => currentStreak >= badge.days && !earnedBadges.includes(badge.id))
        .map(badge => badge.id);

      if (newBadges.length > 0) {
        setEarnedBadges(prev => [...prev, ...newBadges]);
      }
    } catch (error) {
      console.error('Error checking streak badges:', error);
    }
  };

  const getBadgeInfo = (badgeId) => {
    return BADGES.find(b => b.id === badgeId);
  };

  const value = {
    xp: xp || 0,
    level: level || 1,
    xpProgress: isFinite(xpProgress) ? xpProgress : 0,
    xpForNextLevel: xpForNextLevel || 100,
    streak: streak || { current: 0, lastCompletedDate: null },
    earnedBadges: Array.isArray(earnedBadges) ? earnedBadges : [],
    totalTasksCompleted: totalTasksCompleted || 0,
    tasksCompletedToday: tasksCompletedToday || 0,
    completeTask,
    addXP,
    getBadgeInfo,
    allBadges: BADGES,
  };

  return (
    <GamificationContext.Provider value={value}>
      {children}
    </GamificationContext.Provider>
  );
};
