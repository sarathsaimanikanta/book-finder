// src/components/BookCard.js
import React from 'react';
import { HeartIcon, HeartFilledIcon, BookIcon } from './Icons';
import '../styles/BookCard.css';

const BookCard = ({ book, isHorizontal = false, onWishlistToggle, isInWishlist = false, onBookClick }) => {
  const {
    title,
    author_name,
    first_publish_year,
    cover_i,
    isbn,
    key
  } = book;

  // Generate cover image URL
  const getCoverImageUrl = (coverId) => {
    if (!coverId) return null;
    return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
  };

  // Get display authors
  const getAuthors = () => {
    if (!author_name || author_name.length === 0) return 'Unknown Author';
    return author_name.slice(0, 2).join(', ') + (author_name.length > 2 ? ', ...' : '');
  };

  // Get display ISBN
  const getISBN = () => {
    if (!isbn || isbn.length === 0) return null;
    return isbn[0]; // Show first ISBN
  };

  // Handle image error
  const handleImageError = (e) => {
    e.target.style.display = 'none';
    e.target.nextSibling.style.display = 'flex';
  };

  // Handle wishlist toggle
  const handleWishlistClick = (e) => {
    e.stopPropagation();
    if (onWishlistToggle) {
      onWishlistToggle(book);
    }
  };

  const cardClassName = isHorizontal ? 'book-card book-card-horizontal' : 'book-card';

  // Handle card click
  const handleCardClick = () => {
    if (onBookClick) {
      onBookClick(book);
    }
  };

  return (
    <div className={cardClassName} onClick={handleCardClick} style={{ cursor: onBookClick ? 'pointer' : 'default' }}>
      <div className="book-cover-container">
        {/* Wishlist button */}
        {onWishlistToggle && (
          <button 
            className={`wishlist-button ${isInWishlist ? 'active' : ''}`}
            onClick={handleWishlistClick}
            title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            {isInWishlist ? (
              <HeartFilledIcon size={20} />
            ) : (
              <HeartIcon size={20} />
            )}
          </button>
        )}
        
        {cover_i ? (
          <>
            <img
              src={getCoverImageUrl(cover_i)}
              alt={`Cover of ${title}`}
              className="book-cover"
              onError={handleImageError}
            />
            <div className="book-cover-placeholder" style={{ display: 'none' }}>
              <BookIcon size={48} className="cover-placeholder-icon" ariaLabel="No cover available" />
              <span className="cover-placeholder-text">No Cover</span>
            </div>
          </>
        ) : (
          <div className="book-cover-placeholder">
            <BookIcon size={48} className="cover-placeholder-icon" ariaLabel="No cover available" />
            <span className="cover-placeholder-text">No Cover</span>
          </div>
        )}
      </div>
      
      <div className="book-info">
        <h3 className="book-title" title={title}>
          {title}
        </h3>
        
        <p className="book-author" title={getAuthors()}>
          <span className="author-label">By:</span> {getAuthors()}
        </p>
        
        {first_publish_year && (
          <p className="book-year">
            <span className="year-label">Published:</span> {first_publish_year}
          </p>
        )}
        
        {!isHorizontal && getISBN() && (
          <p className="book-isbn">
            <span className="isbn-label">ISBN:</span> {getISBN()}
          </p>
        )}
      </div>
    </div>
  );
};

export default BookCard;