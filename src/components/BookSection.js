// src/components/BookSection.js
import React from 'react';
import BookCard from './BookCard';
import { SpinnerIcon, ArrowRightIcon } from './Icons';
import '../styles/BookSection.css';

const BookSection = ({ title, books, loading, onWishlistToggle, isBookInWishlist, onBookClick }) => {
  if (loading) {
    return (
      <div className="book-section">
        <h2 className="section-title">{title}</h2>
        <div className="loading-container-horizontal">
          <SpinnerIcon size={24} className="loading-spinner-small" />
          <span>Loading {title.replace(/^[^\s]+\s/, '')}...</span>
        </div>
      </div>
    );
  }

  if (!books || books.length === 0) {
    return (
      <div className="book-section">
        <h2 className="section-title">{title}</h2>
        <div className="loading-container-horizontal">
          <span>No books found for this section</span>
        </div>
      </div>
    );
  }

  return (
    <div className="book-section">
      <h2 className="section-title">{title}</h2>
      <div className="books-horizontal-scroll">
        <div className="books-horizontal-container">
          {books.map((book, index) => (
            <div key={book.key || index} className="book-item-horizontal">
              <BookCard 
                book={book} 
                isHorizontal={true}
                onWishlistToggle={onWishlistToggle}
                isInWishlist={isBookInWishlist ? isBookInWishlist(book) : false}
                onBookClick={onBookClick}
              />
            </div>
          ))}
        </div>
        {books.length > 3 && (
          <div className="scroll-indicator">
            <ArrowRightIcon size={20} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookSection;