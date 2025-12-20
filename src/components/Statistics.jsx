import { FiBook, FiUser, FiTrendingUp, FiStar } from 'react-icons/fi';
import './Statistics.css';

const Statistics = ({ books = [] }) => {
  const totalBooks = books.length;
  
  const booksThisMonth = books.filter(book => {
    if (!book.dateAdded) return false;
    const bookDate = new Date(book.dateAdded);
    const now = new Date();
    return bookDate.getMonth() === now.getMonth() && bookDate.getFullYear() === now.getFullYear();
  }).length;
  
  const favoriteBooks = books.filter(book => book.isFavorite).length;
  
  return (
    <div className="statistics">
      <div className="stat-card">
        <div className="stat-icon books">
          <FiBook />
        </div>
        <div className="stat-info">
          <span className="stat-label">Total Books</span>
          <span className="stat-value">{totalBooks}</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon users">
          <FiUser />
        </div>
        <div className="stat-info">
          <span className="stat-label">Active Users</span>
          <span className="stat-value">1</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon trending">
          <FiTrendingUp />
        </div>
        <div className="stat-info">
          <span className="stat-label">Books This Month</span>
          <span className="stat-value">{booksThisMonth}</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon favorites">
          <FiStar />
        </div>
        <div className="stat-info">
          <span className="stat-label">Favorites</span>
          <span className="stat-value">{favoriteBooks}</span>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
