/**
 * Generate a unique ID for tasks
 */
export const generateId = () => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Format date to readable string
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now - date;
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInHours < 1) {
    return 'Just now';
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
};

/**
 * Get category color
 */
export const getCategoryColor = (category, isDark = false) => {
  const colors = {
    Work: isDark ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-blue-100 text-blue-700 border-blue-200',
    Personal: isDark ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' : 'bg-indigo-100 text-indigo-700 border-indigo-200',
    Study: isDark ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-green-100 text-green-700 border-green-200',
    Health: isDark ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-red-100 text-red-700 border-red-200',
    Finance: isDark ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-yellow-100 text-yellow-700 border-yellow-200',
    Other: isDark ? 'bg-gray-500/20 text-gray-400 border-gray-500/30' : 'bg-gray-100 text-gray-700 border-gray-200',
  };
  return colors[category] || colors.Other;
};

/**
 * Get category icon (Lucide icon name)
 */
export const getCategoryIcon = (category) => {
  const icons = {
    Work: 'Briefcase',
    Personal: 'User',
    Study: 'BookOpen',
    Health: 'Heart',
    Finance: 'DollarSign',
    Other: 'Tag',
  };
  return icons[category] || icons.Other;
};

/**
 * Get motivational quote
 */
export const getMotivationalQuote = () => {
  const quotes = [
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "Success is not final, failure is not fatal.", author: "Winston Churchill" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Small daily improvements lead to stunning results.", author: "Robin Sharma" },
    { text: "Focus on being productive instead of busy.", author: "Tim Ferriss" },
    { text: "You are capable of amazing things.", author: "Anonymous" },
    { text: "Progress, not perfection.", author: "Anonymous" },
    { text: "One task at a time, one day at a time.", author: "Anonymous" },
  ];
  return quotes[Math.floor(Math.random() * quotes.length)];
};

/**
 * Calculate completion percentage
 */
export const calculateCompletionRate = (completed, total) => {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};

/**
 * Group tasks by date
 */
export const groupTasksByDate = (tasks) => {
  const groups = {
    today: [],
    yesterday: [],
    thisWeek: [],
    older: [],
  };

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);

  tasks.forEach(task => {
    const taskDate = new Date(task.createdAt);
    const taskDay = new Date(taskDate.getFullYear(), taskDate.getMonth(), taskDate.getDate());

    if (taskDay.getTime() === today.getTime()) {
      groups.today.push(task);
    } else if (taskDay.getTime() === yesterday.getTime()) {
      groups.yesterday.push(task);
    } else if (taskDay >= weekAgo) {
      groups.thisWeek.push(task);
    } else {
      groups.older.push(task);
    }
  });

  return groups;
};
