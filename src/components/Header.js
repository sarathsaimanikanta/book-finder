// src/components/Header.js
import React from 'react';
import '../styles/Header.css';

const Header = ({ onHomeClick, onWishlistClick, onProfileClick, wishlistCount }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Left side - Logo */}
          <div className="header-left">
            <div className="logo" onClick={onHomeClick}>
              <span className="header-icon">📚</span>
              <span className="logo-text">Book Finder</span>
            </div>
          </div>
          
          {/* Right side - Navigation */}
          <div className="header-right">
            <button className="nav-button" onClick={onHomeClick}>
              <span className="nav-icon">🏠</span>
              <span className="nav-text">Home</span>
            </button>
            <button className="nav-button" onClick={onWishlistClick}>
              <span className="nav-icon">❤️</span>
              <span className="nav-text">Wishlist</span>
              {wishlistCount > 0 && <span className="wishlist-indicator">{wishlistCount}</span>}
            </button>
            <button className="nav-button" onClick={onProfileClick}>
              <span className="nav-icon">👤</span>
              <span className="nav-text">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;