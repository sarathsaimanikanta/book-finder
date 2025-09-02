// src/components/Header.js
import React from 'react';
import { HomeIcon, HeartIcon, UserIcon, BookIcon } from './Icons';
import '../styles/Header.css';

const Header = ({ onHomeClick, onWishlistClick, onProfileClick, wishlistCount }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Left side - Logo */}
          <div className="header-left">
            <div className="logo" onClick={onHomeClick}>
              <BookIcon size={32} className="header-icon" ariaLabel="Book Finder Logo" />
              <span className="logo-text">Book Finder</span>
            </div>
          </div>
          
          {/* Right side - Navigation */}
          <div className="header-right">
            <button className="nav-button" onClick={onHomeClick}>
              <HomeIcon size={20} className="nav-icon" />
              <span className="nav-text">Home</span>
            </button>
            <button className="nav-button" onClick={onWishlistClick}>
              <HeartIcon size={20} className="nav-icon" />
              <span className="nav-text">Wishlist</span>
              {wishlistCount > 0 && <span className="wishlist-indicator">{wishlistCount}</span>}
            </button>
            <button className="nav-button" onClick={onProfileClick}>
              <UserIcon size={20} className="nav-icon" />
              <span className="nav-text">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;