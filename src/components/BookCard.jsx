import { FiEdit2, FiTrash2, FiBookOpen, FiStar } from 'react-icons/fi';
import { useRole } from '../context/RoleContext';
import './BookCard.css';

const BookCard = ({ book, onDelete, onEditClick, onToggleFavorite }) => {
  const { role } = useRole();

  return (
    <div className="book-card">
      <div className="book-icon">
        <FiBookOpen />
      </div>
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{book.author}</p>
      </div>
      <div className="book-actions">
        <button 
          className={`btn-favorite ${book.isFavorite ? 'active' : ''}`}
          onClick={() => onToggleFavorite(book.id)}
          title={book.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        >
          <FiStar />
        </button>
        {role === 'admin' && (
          <>
            <button className="btn-edit" onClick={() => onEditClick(book)} title="Edit Book">
              <FiEdit2 />
            </button>
            <button className="btn-delete" onClick={() => onDelete(book.id)} title="Delete Book">
              <FiTrash2 />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BookCard;
