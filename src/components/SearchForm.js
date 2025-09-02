// src/components/SearchForm.js
import React, { useState } from 'react';
import '../styles/SearchForm.css';

const SearchForm = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !loading) {
      onSearch(query.trim());
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="search-form-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-input-container">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Enter book title..."
            className="search-input"
            disabled={loading}
            required
          />
          <button 
            type="submit" 
            className={`search-button ${loading ? 'loading' : ''}`}
            disabled={loading || !query.trim()}
          >
            {loading ? (
              <>
                <span className="button-spinner"></span>
                Searching...
              </>
            ) : (
              <>
                <span className="search-icon">🔍</span>
                Search
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
