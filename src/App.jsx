import { useState } from 'react';
import { RoleProvider } from './context/RoleContext';
import RoleSwitcher from './components/RoleSwitcher';
import ProfileEditor from './components/ProfileEditor';
import BookList from './components/BookList';
import Statistics from './components/Statistics';
import './App.css';
import { FiBook, FiHeart } from 'react-icons/fi';

function App() {
  const [books, setBooks] = useState([
    { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee', dateAdded: new Date().toISOString(), isFavorite: false },
    { id: 2, title: '1984', author: 'George Orwell', dateAdded: new Date().toISOString(), isFavorite: true },
    { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', dateAdded: new Date().toISOString(), isFavorite: false },
  ]);

  return (
    <RoleProvider>
      <div className="app">
        <nav className="navbar">
          <div className="nav-content">
            <div className="nav-brand">
              <FiBook className="brand-icon" />
              <div className="brand-text">
                <span className="brand-title">BookShelf</span>
                <span className="brand-subtitle">Manage Your Library</span>
              </div>
            </div>
            <RoleSwitcher />
          </div>
        </nav>

        <main className="main-content">
          <div className="container">
            <div className="hero">
              <h1>Welcome to Your Personal Library</h1>
              <p>Organize, manage, and track your book collection with ease</p>
            </div>

            <Statistics books={books} />
            <ProfileEditor />
            <BookList books={books} onBooksChange={setBooks} />

            <footer className="footer">
              <div className="footer-content">
                <div className="footer-left">
                  <FiBook className="footer-icon" />
                  <span>BookShelf &copy; 2025. All rights reserved.</span>
                </div>
                <div className="footer-right">
                  <span>Made with</span>
                  <FiHeart className="heart-icon" />
                  <span>using React & Vite</span>
                </div>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </RoleProvider>
  );
}

export default App;
