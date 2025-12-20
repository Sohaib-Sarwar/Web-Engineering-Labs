import { useState, useEffect } from 'react';
import { FiPlus, FiSearch, FiX, FiCheck, FiBook, FiFilter } from 'react-icons/fi';
import { useRole } from '../context/RoleContext';
import BookCard from './BookCard';
import './BookList.css';

const BookList = ({ books: initialBooks, onBooksChange }) => {
  const { role } = useRole();
  const [books, setBooks] = useState(initialBooks || []);

  useEffect(() => {
    if (initialBooks) {
      setBooks(initialBooks);
    }
  }, [initialBooks]);

  const [newBook, setNewBook] = useState({ title: '', author: '' });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const addBook = (e) => {
    e.preventDefault();
    if (newBook.title.trim() && newBook.author.trim()) {
      const book = {
        id: Date.now(),
        title: newBook.title,
        author: newBook.author,
        dateAdded: new Date().toISOString(),
        isFavorite: false,
      };
      const updatedBooks = [...books, book];
      setBooks(updatedBooks);
      onBooksChange?.(updatedBooks);
      setNewBook({ title: '', author: '' });
      setShowAddModal(false);
    }
  };

  const deleteBook = (id) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
    onBooksChange?.(updatedBooks);
  };

  const handleEditClick = (book) => {
    setEditingBook({ ...book });
    setShowEditModal(true);
  };

  const saveEditedBook = (e) => {
    e.preventDefault();
    if (editingBook.title.trim() && editingBook.author.trim()) {
      const updatedBooks = books.map((book) => 
        book.id === editingBook.id ? editingBook : book
      );
      setBooks(updatedBooks);
      onBooksChange?.(updatedBooks);
      setShowEditModal(false);
      setEditingBook(null);
    }
  };

  const toggleFavorite = (id) => {
    const updatedBooks = books.map((book) => 
      book.id === id ? { ...book, isFavorite: !book.isFavorite } : book
    );
    setBooks(updatedBooks);
    onBooksChange?.(updatedBooks);
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="book-list-section">
        <div className="book-list-card">
          <div className="book-list-header">
            <div className="header-left">
              <FiBook className="header-icon" />
              <div>
                <h2>Book Collection</h2>
                <p className="subtitle">Browse and manage your library</p>
              </div>
            </div>
            {role === 'admin' && (
              <button className="btn-add" onClick={() => setShowAddModal(true)}>
                <FiPlus /> Add New Book
              </button>
            )}
          </div>

          <div className="search-container">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search books by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button className="btn-clear-search" onClick={() => setSearchTerm('')}>
                <FiX />
              </button>
            )}
          </div>

          <div className="books-grid">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} onDelete={deleteBook} onEditClick={handleEditClick} onToggleFavorite={toggleFavorite} />
              ))
            ) : (
              <div className="empty-state">
                <FiBook className="empty-icon" />
                <p>No books found</p>
                {searchTerm && <span>Try adjusting your search</span>}
              </div>
            )}
          </div>

          <div className="book-count">
            <FiFilter />
            <span>Showing {filteredBooks.length} of {books.length} books</span>
          </div>
        </div>
      </div>

      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Book</h2>
              <button className="btn-close" onClick={() => setShowAddModal(false)}>
                <FiX />
              </button>
            </div>

            <form onSubmit={addBook}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="title">Book Title</label>
                  <input
                    id="title"
                    type="text"
                    value={newBook.title}
                    onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                    placeholder="Enter book title"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="author">Author Name</label>
                  <input
                    id="author"
                    type="text"
                    value={newBook.author}
                    onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                    placeholder="Enter author name"
                    required
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="submit" className="btn-save">
                  <FiCheck /> Add Book
                </button>
                <button type="button" className="btn-cancel" onClick={() => setShowAddModal(false)}>
                  <FiX /> Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditModal && editingBook && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Book</h2>
              <button className="btn-close" onClick={() => setShowEditModal(false)}>
                <FiX />
              </button>
            </div>

            <form onSubmit={saveEditedBook}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="edit-title">Book Title</label>
                  <input
                    id="edit-title"
                    type="text"
                    value={editingBook.title}
                    onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value })}
                    placeholder="Enter book title"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="edit-author">Author Name</label>
                  <input
                    id="edit-author"
                    type="text"
                    value={editingBook.author}
                    onChange={(e) => setEditingBook({ ...editingBook, author: e.target.value })}
                    placeholder="Enter author name"
                    required
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="submit" className="btn-save">
                  <FiCheck /> Save Changes
                </button>
                <button type="button" className="btn-cancel" onClick={() => setShowEditModal(false)}>
                  <FiX /> Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default BookList;
