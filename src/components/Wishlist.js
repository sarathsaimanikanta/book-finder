// src/components/Wishlist.js
import React from 'react';
import BookCard from './BookCard';
import { HeartIcon, BrokenHeartIcon } from './Icons';
import '../styles/Wishlist.css';

const Wishlist = ({ wishlistBooks, onWishlistToggle, onBookClick }) => {
  if (wishlistBooks.length === 0) {
    return (
      <div className="wishlist-container">
        <div className="wishlist-header">
          <h2 className="wishlist-title">
            <HeartIcon size={28} className="wishlist-title-icon" />
            My Wishlist
          </h2>
          <p className="wishlist-count">0 books</p>
        </div>
        
        <div className="wishlist-empty">
          <div className="empty-wishlist-content">
            <BrokenHeartIcon size={64} className="empty-wishlist-icon" />
            <h3>Your wishlist is empty</h3>
            <p>Start adding books you'd like to read!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <div className="wishlist-header">
        <h2 className="wishlist-title">
          <HeartIcon size={28} className="wishlist-title-icon" />
          My Wishlist
        </h2>
        <p className="wishlist-count">
          {wishlistBooks.length} book{wishlistBooks.length !== 1 ? 's' : ''}
        </p>
      </div>
      
      <div className="wishlist-grid">
        {wishlistBooks.map((book, index) => (
          <BookCard 
            key={book.key || index} 
            book={book} 
            onWishlistToggle={onWishlistToggle}
            isInWishlist={true}
            onBookClick={onBookClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;