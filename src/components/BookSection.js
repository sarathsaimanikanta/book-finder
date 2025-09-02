// src/components/BookSection.js
import React from 'react';
import BookCard from './BookCard';
import '../styles/BookSection.css';

const BookSection = ({ title, books, loading }) => {
  if (loading) {
    return (
      <div className="book-section">
        <h2 className="section-title">{title}</h2>
        <div className="loading-container-horizontal">
          <div className="loading-spinner-small"></div>
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
              <BookCard book={book} isHorizontal={true} />
            </div>
          ))}
        </div>
        {books.length > 3 && (
          <div className="scroll-indicator">→</div>
        )}
      </div>
    </div>
  );
};

export default BookSection;