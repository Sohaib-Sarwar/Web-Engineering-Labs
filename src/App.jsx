import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ModeProvider } from './context/ModeContext';
import { TaskProvider } from './context/TaskContext';
import { GamificationProvider } from './context/GamificationContext';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <ThemeProvider>
      <ModeProvider>
        <TaskProvider>
          <GamificationProvider>
            <Dashboard />
          </GamificationProvider>
        </TaskProvider>
      </ModeProvider>
    </ThemeProvider>
  );
}

export default App;
