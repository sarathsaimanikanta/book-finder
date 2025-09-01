import React, { useState } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import BookCard from './components/BookCard';
import { fetchBooksByTitle } from './utils/api';
import './styles/App.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError('');
    setBooks([]);

    try {
      const results = await fetchBooksByTitle(searchTerm);
      setBooks(results.slice(0, 24)); // limit results to 24
    } catch (err) {
      setError('Failed to fetch books. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Header />
      <main className="main">
        <SearchForm
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSubmit={handleSearch}
          loading={loading}
        />
        {error && <div className="error">{error}</div>}
        {loading && <div className="loading">Loading books...</div>}
        {!loading && books.length > 0 && (
          <div className="results">
            <h2>Found {books.length} books</h2>
            <div className="books-grid">
              {books.map((book, idx) => (
                <BookCard key={`${book.key}-${idx}`} book={book} />
              ))}
            </div>
          </div>
        )}
        {!loading && books.length === 0 && !error && (
          <div className="no-results">No books found.</div>
        )}
      </main>
    </div>
  );
};

export default App;
