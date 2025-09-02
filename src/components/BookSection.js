// src/components/BookSection.js
import React, { useState, useEffect } from 'react';
import { fetchBooksBySubject } from '../utils/api';
import BookCard from './BookCard';
import '../styles/BookSection.css';

const BookSection = ({ genre, title }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchBooksBySubject(genre)
      .then(data => {
        setBooks(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [genre]);

  if (loading) return <div className="section-loader">Loading {title}...</div>;
  if (error) return <div className="section-error">Failed to load {title}</div>;

  return (
    <div className="book-section">
      <h2 className="section-title">{title}</h2>
      <div className="book-container">
        {books.map((book, index) => (
          <BookCard key={index} book={book} horizontal />
        ))}
      </div>
    </div>
  );
};

export default BookSection;