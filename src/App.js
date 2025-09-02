// src/App.js
import React, { useState } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import BookCard from './components/BookCard';
import FeaturedSections from './components/FeaturedSections';
import Wishlist from './components/Wishlist';
import Profile from './components/Profile';
import { searchBooks } from './utils/api';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [currentView, setCurrentView] = useState('home'); // 'home', 'wishlist', 'profile'
  const [wishlist, setWishlist] = useState([]);
  const [totalSearches, setTotalSearches] = useState(0);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setError('Please enter a book title to search');
      return;
    }

    setLoading(true);
    setError('');
    setSearchQuery(query);
    setHasSearched(true);
    setCurrentView('home'); // Ensure we're on home view when searching
    setTotalSearches(prev => prev + 1);
    
    try {
      const results = await searchBooks(query);
      setBooks(results);
      
      if (results.length === 0) {
        setError('No books found for your search. Try different keywords.');
      }
    } catch (err) {
      setError('Failed to search books. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleHomeClick = () => {
    setCurrentView('home');
    // Reset search when going home
    setBooks([]);
    setHasSearched(false);
    setError('');
    setSearchQuery('');
  };

  const handleWishlistClick = () => {
    setCurrentView('wishlist');
  };

  const handleProfileClick = () => {
    setCurrentView('profile');
  };

  const handleWishlistToggle = (book) => {
    setWishlist(prevWishlist => {
      const bookKey = book.key || book.title;
      const isAlreadyInWishlist = prevWishlist.some(item => 
        (item.key || item.title) === bookKey
      );

      if (isAlreadyInWishlist) {
        // Remove from wishlist
        return prevWishlist.filter(item => 
          (item.key || item.title) !== bookKey
        );
      } else {
        // Add to wishlist
        return [...prevWishlist, book];
      }
    });
  };

  const isBookInWishlist = (book) => {
    const bookKey = book.key || book.title;
    return wishlist.some(item => (item.key || item.title) === bookKey);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'wishlist':
        return (
          <Wishlist 
            wishlistBooks={wishlist} 
            onWishlistToggle={handleWishlistToggle}
          />
        );
      
      case 'profile':
        return (
          <Profile 
            wishlistCount={wishlist.length}
            totalSearches={totalSearches}
          />
        );
      
      default: // 'home'
        return (
          <>
            <SearchForm onSearch={handleSearch} loading={loading} />
            
            {loading && (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Searching for books...</p>
              </div>
            )}
            
            {error && (
              <div className="error-container">
                <div className="error-message">
                  <span className="error-icon">⚠️</span>
                  {error}
                </div>
              </div>
            )}
            
            {hasSearched && !loading && !error && books.length === 0 && (
              <div className="no-results">
                <div className="no-results-content">
                  <span className="no-results-icon">📚</span>
                  <h3>No books found</h3>
                  <p>Try searching with different keywords</p>
                </div>
              </div>
            )}
            
            {books.length > 0 && !loading && (
              <div className="results-section">
                <h2 className="results-title">
                  Found {books.length} book{books.length !== 1 ? 's' : ''} for "{searchQuery}"
                </h2>
                <div className="books-grid">
                  {books.map((book, index) => (
                    <BookCard 
                      key={book.key || index} 
                      book={book}
                      onWishlistToggle={handleWishlistToggle}
                      isInWishlist={isBookInWishlist(book)}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {/* Show featured sections only when no search has been performed or no results */}
            {(!hasSearched || (hasSearched && books.length === 0 && !loading && !error)) && (
              <FeaturedSections onWishlistToggle={handleWishlistToggle} isBookInWishlist={isBookInWishlist} />
            )}
          </>
        );
    }
  };

  return (
    <div className="App">
      <Header 
        onHomeClick={handleHomeClick}
        onWishlistClick={handleWishlistClick}
        onProfileClick={handleProfileClick}
        wishlistCount={wishlist.length}
      />
      
      <main className="main-content">
        <div className="container">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;