// src/components/FeaturedSections.js
import React, { useState, useEffect } from 'react';
import BookSection from './BookSection';
import { getBooksBySubject, getTrendingBooks } from '../utils/api';
import '../styles/FeaturedSections.css';

const FeaturedSections = ({ onWishlistToggle, isBookInWishlist, onBookClick }) => {
  const [sections, setSections] = useState({});
  const [loadingStates, setLoadingStates] = useState({});

  // Define the sections we want to display
  const bookSections = [
    { key: 'trending', title: '🔥 Trending Now', type: 'trending' },
    { key: 'fiction', title: '📚 Popular Fiction', subject: 'fiction' },
    { key: 'science_fiction', title: '🚀 Science Fiction', subject: 'science_fiction' },
    { key: 'mystery', title: '🔍 Mystery & Thriller', subject: 'mystery' },
    { key: 'romance', title: '💕 Romance', subject: 'romance' },
    { key: 'fantasy', title: '🐉 Fantasy', subject: 'fantasy' },
    { key: 'biography', title: '👤 Biography', subject: 'biography' },
    { key: 'history', title: '🏛️ History', subject: 'history' },
    { key: 'science', title: '🔬 Science', subject: 'science' },
    { key: 'business', title: '💼 Business', subject: 'business' }
  ];

  useEffect(() => {
    const fetchAllSections = async () => {
      // Set initial loading states
      const initialLoadingStates = {};
      bookSections.forEach(section => {
        initialLoadingStates[section.key] = true;
      });
      setLoadingStates(initialLoadingStates);

      // Fetch books for each section
      const sectionPromises = bookSections.map(async (section) => {
        try {
          let books;
          if (section.type === 'trending') {
            books = await getTrendingBooks();
          } else {
            books = await getBooksBySubject(section.subject, 12);
          }
          
          return { key: section.key, books: books.slice(0, 10) };
        } catch (error) {
          console.error(`Error fetching ${section.title}:`, error);
          return { key: section.key, books: [] };
        }
      });

      // Wait for all sections to load
      const results = await Promise.allSettled(sectionPromises);
      const newSections = {};
      const newLoadingStates = {};

      results.forEach((result, index) => {
        const sectionKey = bookSections[index].key;
        newLoadingStates[sectionKey] = false;
        
        if (result.status === 'fulfilled') {
          newSections[result.value.key] = result.value.books;
        } else {
          newSections[sectionKey] = [];
        }
      });

      setSections(newSections);
      setLoadingStates(newLoadingStates);
    };

    fetchAllSections();
  }, []);

  return (
    <div className="featured-sections">
      {bookSections.map(section => (
        <BookSection
          key={section.key}
          title={section.title}
          books={sections[section.key] || []}
          loading={loadingStates[section.key] || false}
          onWishlistToggle={onWishlistToggle}
          isBookInWishlist={isBookInWishlist}
          onBookClick={onBookClick}
        />
      ))}
    </div>
  );
};

export default FeaturedSections;
