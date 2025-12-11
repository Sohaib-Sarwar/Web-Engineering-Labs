import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateId } from '../utils/helpers';

const TaskContext = createContext();

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('tasks');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading tasks:', error);
      return [];
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [sortBy, setSortBy] = useState('date'); // 'date', 'category', 'status', 'priority'

  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  }, [tasks]);

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: generateId(),
      completed: false,
      priority: task.priority || 'Medium',
      createdAt: new Date().toISOString(),
      completedAt: null,
    };
    setTasks(prev => [newTask, ...prev]);
    return newTask;
  };

  const updateTask = (id, updates) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(prev => prev.map(task => {
      if (task.id === id) {
        const completed = !task.completed;
        return {
          ...task,
          completed,
          completedAt: completed ? new Date().toISOString() : null,
        };
      }
      return task;
    }));
  };

  const clearCompleted = () => {
    setTasks(prev => prev.filter(task => !task.completed));
  };

  // Filter and sort tasks
  const getFilteredTasks = () => {
    let filtered = [...tasks];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (filterCategory !== 'All') {
      filtered = filtered.filter(task => task.category === filterCategory);
    }

    // Priority filter
    if (filterPriority !== 'All') {
      filtered = filtered.filter(task => (task.priority || 'Medium') === filterPriority);
    }

    // Sort
    const priorityOrder = { 'High': 0, 'Medium': 1, 'Low': 2 };
    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === 'category') {
        return a.category.localeCompare(b.category);
      } else if (sortBy === 'status') {
        return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
      } else if (sortBy === 'priority') {
        return priorityOrder[a.priority || 'Medium'] - priorityOrder[b.priority || 'Medium'];
      }
      return 0;
    });

    return filtered;
  };

  const categories = ['All', 'Work', 'Personal', 'Study', 'Health', 'Finance', 'Other'];
  const priorities = ['All', 'High', 'Medium', 'Low'];

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
    completionRate: tasks.length > 0 
      ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100)
      : 0,
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      addTask,
      updateTask,
      deleteTask,
      toggleComplete,
      clearCompleted,
      searchQuery,
      setSearchQuery,
      filterCategory,
      setFilterCategory,
      filterPriority,
      setFilterPriority,
      sortBy,
      setSortBy,
      getFilteredTasks,
      categories,
      priorities,
      stats,
    }}>
      {children}
    </TaskContext.Provider>
  );
};
