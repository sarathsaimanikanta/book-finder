// src/components/BookDetailModal.js
import React, { useEffect } from 'react';
import { CloseIcon, HeartIcon, HeartFilledIcon, BookIcon, ExternalLinkIcon } from './Icons';
import '../styles/BookDetailModal.css';

const BookDetailModal = ({ book, isOpen, onClose, onWishlistToggle, isInWishlist }) => {
  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !book) return null;

  const {
    title,
    author_name,
    first_publish_year,
    publisher,
    cover_i,
    isbn,
    subject,
    key
  } = book;

  // Generate cover image URL
  const getCoverImageUrl = (coverId, size = 'L') => {
    if (!coverId) return null;
    return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
  };

  // Get display authors
  const getAuthors = () => {
    if (!author_name || author_name.length === 0) return 'Unknown Author';
    return author_name.join(', ');
  };

  // Get subjects/genres
  const getGenres = () => {
    if (!subject || subject.length === 0) return [];
    return subject.slice(0, 8); // Show max 8 genres
  };

  // Handle wishlist toggle
  const handleWishlistClick = (e) => {
    e.stopPropagation();
    if (onWishlistToggle) {
      onWishlistToggle(book);
    }
  };

  // Handle backdrop click to close
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content" role="dialog" aria-labelledby="book-title" aria-modal="true">
        {/* Close button */}
        <button 
          className="modal-close-button" 
          onClick={onClose}
          aria-label="Close modal"
        >
          <CloseIcon size={24} />
        </button>

        <div className="modal-body">
          {/* Book cover section */}
          <div className="modal-cover-section">
            {cover_i ? (
              <img
                src={getCoverImageUrl(cover_i)}
                alt={`Cover of ${title}`}
                className="modal-book-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div 
              className="modal-cover-placeholder" 
              style={cover_i ? { display: 'none' } : {}}
            >
              <BookIcon size={64} className="modal-placeholder-icon" ariaLabel="No cover available" />
              <span className="modal-placeholder-text">No Cover Available</span>
            </div>
          </div>

          {/* Book details section */}
          <div className="modal-details-section">
            <div className="modal-header">
              <h2 id="book-title" className="modal-book-title">{title}</h2>
              {onWishlistToggle && (
                <button 
                  className={`modal-wishlist-button ${isInWishlist ? 'active' : ''}`}
                  onClick={handleWishlistClick}
                  title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  {isInWishlist ? (
                    <HeartFilledIcon size={24} />
                  ) : (
                    <HeartIcon size={24} />
                  )}
                </button>
              )}
            </div>

            <div className="modal-book-info">
              <div className="modal-info-row">
                <span className="modal-info-label">Author:</span>
                <span className="modal-info-value">{getAuthors()}</span>
              </div>

              {first_publish_year && (
                <div className="modal-info-row">
                  <span className="modal-info-label">Published:</span>
                  <span className="modal-info-value">{first_publish_year}</span>
                </div>
              )}

              {publisher && publisher.length > 0 && (
                <div className="modal-info-row">
                  <span className="modal-info-label">Publisher:</span>
                  <span className="modal-info-value">{publisher[0]}</span>
                </div>
              )}

              {isbn && isbn.length > 0 && (
                <div className="modal-info-row">
                  <span className="modal-info-label">ISBN:</span>
                  <span className="modal-info-value">{isbn[0]}</span>
                </div>
              )}

              {getGenres().length > 0 && (
                <div className="modal-info-row">
                  <span className="modal-info-label">Genres:</span>
                  <div className="modal-genres">
                    {getGenres().map((genre, index) => (
                      <span key={index} className="modal-genre-tag">
                        {genre.charAt(0).toUpperCase() + genre.slice(1)}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {key && (
                <div className="modal-info-row">
                  <span className="modal-info-label">OpenLibrary ID:</span>
                  <span className="modal-info-value">
                    <a 
                      href={`https://openlibrary.org${key}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="modal-external-link"
                    >
                      View on OpenLibrary <ExternalLinkIcon size={16} className="external-link-icon" />
                    </a>
                  </span>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="modal-actions">
              <button 
                className="modal-action-button primary"
                onClick={handleWishlistClick}
              >
                {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </button>
              <button 
                className="modal-action-button secondary"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailModal;