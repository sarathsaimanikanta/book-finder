// src/components/Header.js
import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <h1 className="header-title">
            <span className="header-icon">📚</span>
            Book Finder
          </h1>
          <p className="header-subtitle">Discover your next great read</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
