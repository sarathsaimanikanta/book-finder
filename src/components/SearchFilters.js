// src/components/SearchFilters.js
import React, { useState } from 'react';
import { FilterIcon, ChevronDownIcon, RefreshIcon } from './Icons';
import '../styles/SearchFilters.css';

const SearchFilters = ({ onFiltersChange, initialFilters = {} }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    sortBy: 'relevance',
    genre: '',
    yearFrom: '',
    yearTo: '',
    language: 'en',
    ...initialFilters
  });

  const sortOptions = [
    { value: 'relevance', label: '📊 Relevance' },
    { value: 'title', label: '📚 Title A-Z' },
    { value: 'first_publish_year desc', label: '📅 Newest First' },
    { value: 'first_publish_year', label: '📅 Oldest First' },
    { value: 'rating desc', label: '⭐ Highest Rated' },
    { value: 'readinglog_count desc', label: '🔥 Most Popular' }
  ];

  const genreOptions = [
    { value: '', label: 'All Genres' },
    { value: 'fiction', label: '📖 Fiction' },
    { value: 'science_fiction', label: '🚀 Science Fiction' },
    { value: 'fantasy', label: '🐉 Fantasy' },
    { value: 'mystery', label: '🔍 Mystery & Thriller' },
    { value: 'romance', label: '💕 Romance' },
    { value: 'biography', label: '👤 Biography' },
    { value: 'history', label: '🏛️ History' },
    { value: 'science', label: '🔬 Science' },
    { value: 'business', label: '💼 Business' },
    { value: 'self_help', label: '🎯 Self Help' },
    { value: 'health', label: '🏥 Health' },
    { value: 'cooking', label: '👨‍🍳 Cooking' },
    { value: 'travel', label: '✈️ Travel' },
    { value: 'art', label: '🎨 Art' },
    { value: 'music', label: '🎵 Music' }
  ];

  const languageOptions = [
    { value: 'en', label: '🇺🇸 English' },
    { value: 'es', label: '🇪🇸 Spanish' },
    { value: 'fr', label: '🇫🇷 French' },
    { value: 'de', label: '🇩🇪 German' },
    { value: 'it', label: '🇮🇹 Italian' },
    { value: 'pt', label: '🇵🇹 Portuguese' },
    { value: 'ru', label: '🇷🇺 Russian' },
    { value: 'ja', label: '🇯🇵 Japanese' },
    { value: 'zh', label: '🇨🇳 Chinese' }
  ];

  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let year = currentYear; year >= 1800; year -= 10) {
    yearOptions.push({ value: year.toString(), label: `${year}s` });
  }

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      sortBy: 'relevance',
      genre: '',
      yearFrom: '',
      yearTo: '',
      language: 'en'
    };
    setFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  const hasActiveFilters = () => {
    return filters.genre !== '' || 
           filters.yearFrom !== '' || 
           filters.yearTo !== '' || 
           filters.language !== 'en' ||
           filters.sortBy !== 'relevance';
  };

  return (
    <div className="search-filters">
      <button 
        className={`filters-toggle ${isExpanded ? 'expanded' : ''}`}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls="filters-content"
      >
        <FilterIcon size={20} className="filters-icon" />
        <span className="filters-text">
          {isExpanded ? 'Hide Filters' : 'Show Filters'}
          {hasActiveFilters() && <span className="active-indicator">●</span>}
        </span>
        <ChevronDownIcon size={16} className={`filters-chevron ${isExpanded ? 'up' : 'down'}`} />
      </button>

      <div 
        id="filters-content"
        className={`filters-content ${isExpanded ? 'expanded' : ''}`}
      >
        <div className="filters-grid">
          {/* Sort By */}
          <div className="filter-group">
            <label htmlFor="sort-select" className="filter-label">Sort By</label>
            <select 
              id="sort-select"
              className="filter-select"
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Genre */}
          <div className="filter-group">
            <label htmlFor="genre-select" className="filter-label">Genre</label>
            <select 
              id="genre-select"
              className="filter-select"
              value={filters.genre}
              onChange={(e) => handleFilterChange('genre', e.target.value)}
            >
              {genreOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Language */}
          <div className="filter-group">
            <label htmlFor="language-select" className="filter-label">Language</label>
            <select 
              id="language-select"
              className="filter-select"
              value={filters.language}
              onChange={(e) => handleFilterChange('language', e.target.value)}
            >
              {languageOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Publication Year Range */}
          <div className="filter-group year-range">
            <label className="filter-label">Publication Year</label>
            <div className="year-inputs">
              <input
                type="number"
                className="filter-input year-input"
                placeholder="From"
                min="1800"
                max={currentYear}
                value={filters.yearFrom}
                onChange={(e) => handleFilterChange('yearFrom', e.target.value)}
              />
              <span className="year-separator">–</span>
              <input
                type="number"
                className="filter-input year-input"
                placeholder="To"
                min="1800"
                max={currentYear}
                value={filters.yearTo}
                onChange={(e) => handleFilterChange('yearTo', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Filter Actions */}
        <div className="filter-actions">
          <button 
            className="filter-reset-button"
            onClick={handleReset}
            disabled={!hasActiveFilters()}
          >
            <RefreshIcon size={16} />
            Reset Filters
          </button>
          <div className="active-filters-summary">
            {hasActiveFilters() && (
              <span className="active-count">
                {Object.values(filters).filter(v => v !== '' && v !== 'relevance' && v !== 'en').length} active filter{Object.values(filters).filter(v => v !== '' && v !== 'relevance' && v !== 'en').length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;