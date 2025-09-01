import React from 'react';
import '../styles/SearchForm.css';

const SearchForm = ({ searchTerm, setSearchTerm, onSubmit, loading }) => {
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <form onSubmit={onSubmit} className="search-form">
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Enter book title..."
          className="search-input"
          disabled={loading}
          aria-label="Search books by title"
        />
        <button
          type="submit"
          className="search-button"
          disabled={loading || !searchTerm.trim()}
          aria-label="Search button"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
