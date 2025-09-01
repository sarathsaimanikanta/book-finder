import React from 'react';
import '../styles/BookCard.css';

const BookCard = ({ book }) => {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null;

  const authors = book.author_name ? book.author_name.slice(0, 3).join(', ') : 'Unknown Author';
  const subjects = book.subject ? book.subject.slice(0, 3).join(', ') : 'No subjects available';
  const publishYear = book.first_publish_year || 'Unknown';

  return (
    <div className="book-card" tabIndex={0}>
      <div className="book-cover" aria-label={`Cover image of ${book.title}`}>
        {coverUrl ? (
          <img src={coverUrl} alt={`Cover of ${book.title}`} />
        ) : (
          <div className="no-cover">
            📚<br />No Cover Available
          </div>
        )}
      </div>
      <div className="book-info">
        <h3 className="book-title" title={book.title}>{book.title}</h3>
        <p className="book-author"><strong>By:</strong> {authors}</p>
        <p className="book-year"><strong>Published:</strong> {publishYear}</p>
        <p className="book-subjects"><strong>Topics:</strong> {subjects}</p>
      </div>
    </div>
  );
};

export default BookCard;
