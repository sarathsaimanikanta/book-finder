// src/components/SearchForm.js
import React, { useState, useEffect, useCallback } from 'react';
import '../styles/SearchForm.css';

const SearchForm = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);

  // Debounced search function
  const debouncedSearch = useCallback((searchQuery) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    const timeout = setTimeout(() => {
      if (searchQuery.trim().length >= 2) {
        onSearch(searchQuery.trim());
      }
    }, 500); // Wait 500ms after user stops typing
    
    setSearchTimeout(timeout);
  }, [onSearch, searchTimeout]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !loading) {
      setShowSuggestions(false);
      onSearch(query.trim());
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    // Trigger real-time search
    if (value.trim().length >= 2) {
      debouncedSearch(value);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };

  const handleInputFocus = () => {
    if (query.trim().length >= 2) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => setShowSuggestions(false), 200);
  };

  const selectSuggestion = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);

  return (
    <div className="search-form-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-input-container">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder="Enter book title or author..."
            className="search-input"
            disabled={loading}
            autoComplete="off"
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
        
        {/* Search suggestions dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="search-suggestions">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="suggestion-item"
                onClick={() => selectSuggestion(suggestion)}
              >
                <span className="suggestion-icon">🔍</span>
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchForm;