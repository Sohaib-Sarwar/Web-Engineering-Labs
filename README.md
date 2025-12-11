# Task List Management Website

## Project Information

Course: CS343 - Web Engineering  
Semester: Fall 2025  
Lab: Lab 12 - Task List Management Website (Open Ended Lab)  
Student Name: Muhammad Sohaib Sarwar  
Registration Number: 465597  
Section: BESE14A  
Date: December 04, 2025  
Instructor: Ms. Naema Asif

---

## Project Overview

This project is a sophisticated web application designed to manage tasks while reconciling two conflicting sets of design requirements: minimalist simplicity and engaging gamification. The application features a unique dual-mode system that allows users to seamlessly switch between "Focus Mode" (minimalist) and "Play Mode" (gamified).

---

## Key Features

### Core Functionality
- Task creation, editing, and deletion
- Task completion tracking with timestamps
- Category-based organization (Work, Personal, Study, Health, Finance, Other)
- Real-time search and filtering capabilities
- Multiple sorting options (by date, category, status)
- Clear completed tasks functionality
- Local storage persistence

### Dual Mode System

#### Focus Mode (Minimalist Design)
- Clean, distraction-free interface
- Minimal color scheme with light backgrounds
- Simple task cards with essential information only
- Streamlined statistics panel
- Fast, responsive performance
- Mobile-first approach

#### Play Mode (Gamified Experience)
- Rich visual design with glass morphism effects
- Dark theme with vibrant blue accents
- XP and leveling system (15 XP per completed task)
- Streak tracking for daily consistency
- Achievement badges system
- Animated progress bars and celebrations
- Interactive statistics dashboard
- Confetti celebrations on milestones

### Technical Features
- Responsive design (mobile, tablet, desktop)
- Dark/Light theme toggle
- Context API for state management
- Framer Motion animations
- Modern React icons (Lucide React)
- Soft 3D visual effects
- Glass morphism design patterns
- Error boundaries for stability

---

## Technology Stack

### Frontend Framework
- React 18.3.1
- Vite 5.1.0 (Build tool)

### Styling
- Tailwind CSS 3.4.1
- PostCSS 8.4.35
- Custom CSS with 3D effects

### Libraries
- Framer Motion 11.0.8 (Animations)
- Lucide React 0.344.0 (Icons)
- Canvas Confetti 1.9.2 (Celebrations)

### Development Tools
- ESLint for code quality
- Autoprefixer for CSS compatibility

---

## Project Structure

```
WEB_OEL/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx          (Main layout component)
│   │   ├── Header.jsx              (App header with mode toggle)
│   │   ├── TaskList.jsx            (Task display and management)
│   │   ├── TaskCard.jsx            (Individual task component)
│   │   ├── TaskForm.jsx            (Add/Edit task modal)
│   │   ├── GamificationBar.jsx     (XP, level, streak display)
│   │   ├── StatsPanel.jsx          (Statistics dashboard)
│   │   ├── Timeline.jsx            (Task timeline view)
│   │   ├── QuoteSection.jsx        (Motivational quotes)
│   │   ├── ModeToggle.jsx          (Focus/Play mode switch)
│   │   └── ThemeToggle.jsx         (Dark/Light theme switch)
│   ├── context/
│   │   ├── ThemeContext.jsx        (Theme state management)
│   │   ├── ModeContext.jsx         (Mode state management)
│   │   ├── TaskContext.jsx         (Task state management)
│   │   └── GamificationContext.jsx (Gamification logic)
│   ├── hooks/
│   │   └── useCustomHooks.js       (Custom React hooks)
│   ├── utils/
│   │   ├── animations.js           (Framer Motion configs)
│   │   └── helpers.js              (Utility functions)
│   ├── App.jsx                     (Root component)
│   ├── main.jsx                    (Entry point with error boundary)
│   └── index.css                   (Global styles)
├── public/
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
```

---

## Design Philosophy

### Reconciling Conflicting Requirements

The project successfully merges minimalist and engaging design through:

1. Mode-Based Architecture: Users can toggle between Focus Mode (minimalist) and Play Mode (gamified) based on their current needs and preferences.

2. Shared Foundation: Both modes share the same core functionality but present it differently:
   - Focus Mode: Essential features with minimal visual noise
   - Play Mode: Enhanced features with gamification elements

3. Contextual UI: Interface elements adapt based on the selected mode:
   - Color schemes change
   - Animation intensity varies
   - Information density adjusts
   - Visual effects enable/disable

4. Progressive Enhancement: The gamification system enhances rather than replaces the base functionality, ensuring usability in both modes.

---

## Installation and Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation Steps

1. Clone or extract the project files

2. Navigate to the project directory:
   ```
   cd WEB_OEL
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open browser and navigate to:
   ```
   http://localhost:5173
   ```

### Build for Production

To create a production build:
```
npm run build
```

The optimized files will be in the dist directory.

---

## Usage Guide

### Getting Started

1. First Launch: The application starts in Focus Mode with an empty task list.

2. Adding Tasks:
   - Click the "Add Task" button
   - Fill in task title (required)
   - Add description (optional)
   - Select category
   - Click "Add Task" to save

3. Managing Tasks:
   - Click the checkbox to mark tasks complete
   - Click the edit icon to modify tasks
   - Click the delete icon to remove tasks
   - Use the "Clear" button to remove all completed tasks

4. Search and Filter:
   - Use the search bar to find specific tasks
   - Click "Filters" to access category and sorting options
   - Filter by category (All, Work, Personal, etc.)
   - Sort by date, category, or status

5. Switching Modes:
   - Use the toggle switch in the header
   - Focus Mode (target icon) for minimal interface
   - Play Mode (zap icon) for gamified experience

6. Theme Toggle:
   - Switch between light and dark themes
   - Located in the header
   - Preference is saved locally

### Gamification System (Play Mode)

- XP System: Earn 15 XP per completed task
- Leveling: Level up every 100 XP
- Streaks: Maintain daily task completion streaks
- Badges:
  - Getting Started: Complete your first task
  - Early Bird: Complete a task before 9 AM
  - Productive Day: Complete 5 tasks in one day
  - Streak Starter: 3-day streak
  - Week Warrior: 7-day streak
  - Streak Master: 30-day streak
  - Task Master: Complete 50 tasks

---

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

Minimum supported versions: Last 2 major versions

---

## Features Breakdown

### Task Management
- CRUD operations (Create, Read, Update, Delete)
- Category assignment
- Completion status tracking
- Bulk clear completed tasks
- Timestamp tracking (created, completed)

### Search and Filtering
- Real-time text search
- Category filtering
- Multi-criteria sorting
- Dynamic task display

### Gamification Elements
- Experience points (XP) system
- Progressive leveling mechanism
- Daily streak tracking
- Badge achievement system
- Visual celebrations (confetti)
- Progress visualization

### User Interface
- Responsive grid layouts
- Card-based design
- Modal dialogs
- Smooth animations
- Loading states
- Error boundaries

### Data Persistence
- LocalStorage integration
- Automatic state saving
- Data recovery on reload
- Separate storage for:
  - Tasks
  - Gamification progress
  - User preferences

---

## Error Handling

The application includes comprehensive error handling:

- Error boundaries to catch React errors
- Try-catch blocks in critical functions
- LocalStorage quota management
- Fallback values for corrupted data
- User-friendly error messages
- Console logging for debugging

---

## Performance Optimizations

- Code splitting with React lazy loading
- Memoization of expensive calculations
- Efficient re-render prevention
- Optimized bundle size with Vite
- CSS-in-JS avoided for better performance
- Minimal external dependencies

---

## Accessibility Features

- Semantic HTML elements
- ARIA labels where appropriate
- Keyboard navigation support
- Focus management
- Color contrast compliance
- Screen reader compatible

---

## Future Enhancements

Potential features for future development:
- Cloud synchronization
- Task sharing and collaboration
- Recurring tasks
- Task priorities
- Due dates and reminders
- Custom themes
- Data export/import
- Analytics dashboard
- Mobile native app

---

## Known Limitations

- Local storage only (no backend)
- Single-user application
- Limited to browser storage capacity
- No offline-first PWA features
- No cross-device synchronization

---

## Credits and Acknowledgments

Developer: Muhammad Sohaib Sarwar (465597)  
Instructor: Ms. Naema Asif  
Course: CS343 - Web Engineering  
Institution: Department of Computing  
Semester: Fall 2025

### Libraries and Tools
- React Team for React framework
- Vercel for Vite build tool
- Tailwind Labs for Tailwind CSS
- Lucide for icon library
- Framer Motion team for animation library
- Canvas Confetti for celebration effects

---

## License

This project is developed as part of academic coursework for CS343 - Web Engineering, Fall 2025.

---

## Contact

For questions or feedback regarding this project:

Student: Muhammad Sohaib Sarwar  
Registration Number: 465597  
Section: BESE14A  
Course: CS343 - Web Engineering

---

## Conclusion

This Task List Management Website successfully demonstrates the ability to reconcile conflicting design requirements through innovative architectural decisions. The dual-mode system provides users with the flexibility to choose their preferred experience while maintaining full functionality across both modes. The project showcases modern web development practices, responsive design principles, and creative problem-solving in user interface design.
