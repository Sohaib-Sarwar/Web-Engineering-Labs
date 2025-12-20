# BookShelf - Personal Library Management System

**CS-344 Web Engineering Lab 14**  
**Student Name:** Sohaib  
**Registration Number:** 465597  
**Section:** BESE-14A  
**Submitted To:** Web Engineering Instructor

---

## Project Overview

BookShelf is a modern, elegant library management application built with React and Vite. This project demonstrates advanced React concepts including state management, context API, role-based access control, and component-driven architecture with a professional neomorphic design system.

## Lab Objectives Achieved

This project successfully implements all Lab 14 requirements:

1. **React State Management**: Comprehensive use of `useState` and `useEffect` hooks for managing objects and arrays
2. **Context API Implementation**: Global state management using React Context for role-based access
3. **Component Architecture**: Modular, reusable components following best practices
4. **CRUD Operations**: Complete Create, Read, Update, Delete functionality for books
5. **Role-Based Rendering**: Dynamic UI based on user roles (Admin/User)
6. **Form Handling**: Modal-based forms with validation and state management
7. **Conditional Rendering**: Smart UI updates based on user permissions and data state
8. **Modern Design System**: Neomorphic design with minimalist black and white theme

---

## Key Features

### User Management
- **Profile Editor**: Manage personal information (Name, Age, Email, Phone) with modal-based editing
- **Role Switcher**: Toggle between User and Admin roles seamlessly
- **Real-time Updates**: Instant profile updates with visual feedback
- **Secure Access Control**: Different permissions for different user types

### Book Management
- **Dynamic Book Collection**: Complete CRUD operations with real-time updates
- **Smart Search**: Filter books by title or author with instant results
- **Favorite System**: Mark/unmark books as favorites with visual indicators
- **Modal-Based Editing**: Clean, focused editing experience with full-page blur effects
- **Unique Identification**: Automatic timestamp-based ID and date tracking
- **Statistics Integration**: Real-time book counts and favorite tracking

### Statistics Dashboard
- **Total Books Counter**: Displays complete collection size
- **Active Users**: Shows current system users (hardcoded to 1)
- **Monthly Statistics**: Calculates books added in current month
- **Favorites Tracking**: Dynamic count of favorited books
- **Real-time Updates**: All statistics update automatically with book changes

### 👥 Role-Based Features

**Admin Access:**
- ✏️ Full CRUD operations (Create, Read, Update, Delete)
- ➕ Add new books via modal form
- 📝 Edit existing book information
- 🗑️ Remove books from the library
- ⭐ Mark/unmark favorites

**User Access:**
- 📚 Browse complete book collection
- 🔍 Search and filter books
- 👀 View all book details
- ⭐ Mark/unmark favorites
- 📊 View statistics

---

## 🎨 Design Features

### Neomorphic Design System
- **Black & White Theme**: Professional minimalist palette (#e0e5ec background, #000000 accent)
- **Soft Shadows**: Dual-tone shadow system for depth and dimension
- **Subtle Borders**: Minimal borders with light shadows for clean separation
- **Floating Navbar**: Fixed position with soft shadows and rounded corners
- **Modal Overlays**: Full-page blur effects with centered content
- **Smooth Animations**: CSS transitions for all interactive elements

### Modern UI Elements
- **React Icons**: Feather Icons (react-icons/fi) throughout the application
- **Responsive Grid**: Auto-fit grid layout for book cards
- **Hover Effects**: Subtle transform and shadow changes
- **Empty States**: Friendly messages when no data is available
- **Loading States**: Smooth transitions between states
- **Form Validation**: Required field validation on all forms

### Visual Hierarchy
- **Card-Based Layout**: Organized content in neomorphic cards
- **Icon Integration**: Meaningful icons for all actions and information
- **Color Coding**: Grayscale palette for different stat categories
- **Typography**: Clear font sizes and weights for readability
- **Spacing**: Consistent padding and margins throughout

---

## 🛠️ Technical Implementation

### Technology Stack
- **Frontend Framework**: React 18.2.0
- **Build Tool**: Vite 5.0.8
- **Icons**: react-icons 4.12.0
- **Styling**: Custom CSS with CSS Variables
- **State Management**: React Hooks (useState, useEffect, useContext)
- **Routing**: N/A (Single Page Application)

### Project Structure
```
src/
├── components/
│   ├── BookCard.jsx         # Individual book display component
│   ├── BookCard.css         # Book card neomorphic styling
│   ├── BookList.jsx         # Book collection with CRUD operations
│   ├── BookList.css         # Book list and modal styling
│   ├── ProfileEditor.jsx    # User profile management
│   ├── ProfileEditor.css    # Profile card and modal styling
│   ├── RoleSwitcher.jsx     # Role toggle component
│   ├── RoleSwitcher.css     # Role switcher styling
│   ├── Statistics.jsx       # Statistics dashboard
│   └── Statistics.css       # Statistics card styling
├── context/
│   └── RoleContext.jsx      # Global role state management
├── App.jsx                  # Main application component
├── App.css                  # Application-level styling
├── main.jsx                 # Application entry point
└── index.css                # Global styles and CSS variables
```

### State Management Architecture

**App.jsx (Root Level)**
```javascript
const [books, setBooks] = useState([...initialBooks]);
// Manages global book state, passed to both Statistics and BookList
```

**BookList.jsx (Component Level)**
```javascript
const [books, setBooks] = useState(initialBooks);
const [showAddModal, setShowAddModal] = useState(false);
const [showEditModal, setShowEditModal] = useState(false);
const [editingBook, setEditingBook] = useState(null);
const [searchTerm, setSearchTerm] = useState('');
// Local state synchronized with parent via useEffect
```

**RoleContext.jsx (Global Context)**
```javascript
const [role, setRole] = useState('user');
// Global role state accessible via useRole() hook
```

### Key React Concepts Demonstrated

1. **useState Hook**: Managing local component state for forms, modals, and data
2. **useEffect Hook**: Synchronizing BookList state with parent component
3. **useContext Hook**: Accessing global role state across components
4. **Props Passing**: Data flow from parent to child components
5. **Callback Functions**: Child-to-parent communication (onBooksChange, onEditClick)
6. **Conditional Rendering**: Role-based UI elements and empty states
7. **Array Methods**: map(), filter(), find() for data manipulation
8. **Event Handling**: onClick, onChange, onSubmit handlers
9. **Form Management**: Controlled components with state binding
10. **Component Composition**: Reusable components with props
- Custom scrollbar styling

## Technology Stack

- **React 18.2**: Modern React with hooks
- **Vite 5.0**: Lightning-fast build tool
- **React Icons**: Modern icon library
- **CSS3**: Custom animations and effects

## Project Structure

```
src/
├── components/
│   ├── BookCard.jsx         # Individual book card component
│   ├── BookCard.css
│   ├── BookList.jsx         # Book list with CRUD operations
│   ├── BookList.css
│   ├── ProfileEditor.jsx    # Profile management component
│   ├── ProfileEditor.css
│   ├── RoleSwitcher.jsx     # Role toggle component
│   └── RoleSwitcher.css
├── context/
│   └── RoleContext.jsx      # Global role state management
├── App.jsx                  # Main application component
├── App.css                  # Global application styles
├── main.jsx                 # Application entry point
└── index.css                # Base styles and resets
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Steps

1. **Navigate to project directory:**
   ```bash
   cd Web_Lab14_Sohaib_465597_BESE14A
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   - Navigate to `http://localhost:5173`

5. **Build for production:**
   ```bash
   npm run build
   ```

## Usage Guide

### ProfileEditor (Section 1)
1. View current profile information
2. Update name or age in the input fields
3. Changes reflect immediately in the display

### BookList (Section 2 & 3)
**As User:**
- View all books in the dashboard
- Search books by title or author
- Read-only access to book information

**As Admin:**
- All user permissions plus:
- Add new books using "Add Book" button
- Edit existing books (click edit icon)
- Delete books (click delete icon)
- Full CRUD operations

### RoleSwitcher
- Click "Switch to Admin/User" button in the navbar
- Toggle between user and admin roles
- UI updates automatically based on role

## Key Concepts Demonstrated

### 1. State Management with Objects
```javascript
const [profile, setProfile] = useState({ name: 'John Doe', age: 25 });
setProfile({ ...profile, name: newName }); // Spread operator
```

### 2. Array State Management
```javascript
const [books, setBooks] = useState([...]);
// Add: setBooks([...books, newBook])
// Delete: setBooks(books.filter(book => book.id !== id))
// Edit: setBooks(books.map(book => book.id === id ? updated : book))
```

### 3. Context API
```javascript
const RoleContext = createContext();
export const useRole = () => useContext(RoleContext);
```

### 4. Conditional Rendering
```javascript
{role === 'admin' && <button>Edit</button>}
```

## Review Questions Answers

**Q: Why do we use the spread operator when updating state?**
- React requires immutability for state updates
- Spread operator creates a new object/array
- Ensures React detects changes and re-renders
- Prevents accidental mutations of original state

**Q: What problems does useContext solve?**
- Eliminates prop drilling through multiple components
- Provides global state accessible anywhere in component tree
- Simplifies state management for shared data
- Makes code cleaner and more maintainable

**Q: What are the benefits of splitting state and logic into components?**
- Separation of concerns
- Reusability across application
- Easier testing and debugging
- Better code organization
- Improved performance with targeted re-renders

## Color Palette

- **Background**: Linear gradient (#1a1a1a to #2d2d2d)
- **Primary Text**: #f5f5f5 (off-white)
- **Secondary Text**: #a0a0a0 (light gray)
- **Borders**: rgba(255, 255, 255, 0.1)
- **Accents**: White with transparency
- **Hover States**: Increased opacity and transforms

## Responsive Breakpoints

- **Desktop**: 1200px+ (Full layout)
- **Tablet**: 768px - 1199px (Adapted layout)
- **Mobile**: < 768px (Stacked layout)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Vite for fast HMR (Hot Module Replacement)
- CSS transitions for smooth animations
- Efficient re-rendering with proper key props
- Backdrop-filter for native blur effects

## Future Enhancements

- LocalStorage persistence
- Book categories and tags
- Advanced filtering and sorting
- User authentication
- Dark/Light theme toggle
- Export books to JSON/CSV

## Author

**Student Name:** Sohaib  
**Registration No:** 465597  
**Section:** BESE-14A  
**Lab:** 14  
**Date:** December 18, 2025

## License

This project is created for educational purposes as part of CS-344 Web Engineering course.
