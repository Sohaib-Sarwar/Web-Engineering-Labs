import React, { createContext, useContext, useState, useEffect } from 'react';

const ModeContext = createContext();

export const useMode = () => {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
};

export const ModeProvider = ({ children }) => {
  // 'focus' = Minimalist Mode, 'play' = Engaged Mode
  const [mode, setMode] = useState(() => {
    try {
      const saved = localStorage.getItem('mode');
      return saved || 'focus';
    } catch (error) {
      console.error('Error loading mode:', error);
      return 'focus';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('mode', mode);
    } catch (error) {
      console.error('Error saving mode:', error);
    }
  }, [mode]);

  const toggleMode = () => {
    setMode(prev => prev === 'focus' ? 'play' : 'focus');
  };

  const isFocusMode = mode === 'focus';
  const isPlayMode = mode === 'play';

  return (
    <ModeContext.Provider value={{ mode, toggleMode, isFocusMode, isPlayMode }}>
      {children}
    </ModeContext.Provider>
  );
};
