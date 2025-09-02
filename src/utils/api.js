// src/utils/api.js
const API_BASE_URL = 'https://openlibrary.org/search.json';
const SUBJECTS_API_URL = 'https://openlibrary.org/subjects';
const API_FIELDS = 'key,title,author_name,cover_i,first_publish_year,isbn';

/**
 * Search for books using the OpenLibrary API with advanced filtering
 * @param {string} query - The search query (book title)
 * @param {Object} filters - Filter options
 * @param {number} limit - Maximum number of results to return (default: 20)
 * @returns {Promise<Array>} Array of book objects
 */
export const searchBooks = async (query, filters = {}, limit = 20) => {
  try {
    // Encode the query parameter
    const encodedQuery = encodeURIComponent(query);
    
    // Build URL parameters
    const params = new URLSearchParams();
    params.append('title', encodedQuery);
    params.append('fields', API_FIELDS);
    params.append('limit', limit.toString());
    
    // Add genre filter
    if (filters.genre && filters.genre !== '') {
      params.append('subject', filters.genre);
    }
    
    // Add language filter
    if (filters.language && filters.language !== 'en') {
      params.append('language', filters.language);
    }
    
    // Add publication year filters
    if (filters.yearFrom && filters.yearFrom !== '') {
      params.append('first_publish_year', `[${filters.yearFrom} TO *]`);
    }
    if (filters.yearTo && filters.yearTo !== '' && !filters.yearFrom) {
      params.append('first_publish_year', `[* TO ${filters.yearTo}]`);
    }
    if (filters.yearFrom && filters.yearTo && filters.yearFrom !== '' && filters.yearTo !== '') {
      params.delete('first_publish_year');
      params.append('first_publish_year', `[${filters.yearFrom} TO ${filters.yearTo}]`);
    }
    
    // Add sorting
    if (filters.sortBy && filters.sortBy !== 'relevance') {
      params.append('sort', filters.sortBy);
    }
    
    // Construct the API URL
    const url = `${API_BASE_URL}?${params.toString()}`;
    
    // Make the API request
    const response = await fetch(url);
    
    // Check if the response is ok
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Parse the JSON response
    const data = await response.json();
    
    // Extract and return the books array
    let books = data.docs || [];
    
    // Apply client-side sorting for options not supported by API
    if (filters.sortBy) {
      books = applySorting(books, filters.sortBy);
    }
    
    return books;
    
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

/**
 * Get books by subject/genre
 * @param {string} subject - The subject/genre (e.g., 'fantasy', 'science_fiction')
 * @param {number} limit - Maximum number of results to return (default: 10)
 * @returns {Promise<Array>} Array of book objects
 */
export const getBooksBySubject = async (subject, limit = 10) => {
  try {
    // Construct the API URL with subject search
    const url = `${API_BASE_URL}?subject=${encodeURIComponent(subject)}&fields=${API_FIELDS}&limit=${limit}&sort=rating`;
    
    // Make the API request
    const response = await fetch(url);
    
    // Check if the response is ok
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Parse the JSON response
    const data = await response.json();
    
    // Extract and return the books array
    return data.docs || [];
    
  } catch (error) {
    console.error('Error fetching books by subject:', error);
    throw error;
  }
};

/**
 * Get trending books (simulated by popular fiction books for now)
 * @param {number} limit - Maximum number of results to return (default: 10)
 * @returns {Promise<Array>} Array of trending book objects
 */
export const getTrendingBooks = async (limit = 10) => {
  try {
    // Use popular books sorted by readinglog count as trending
    const url = `${API_BASE_URL}?q=*&fields=${API_FIELDS}&limit=${limit}&sort=readinglog_count desc`;
    
    // Make the API request
    const response = await fetch(url);
    
    // Check if the response is ok
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Parse the JSON response
    const data = await response.json();
    
    // Extract and return the books array
    return data.docs || [];
    
  } catch (error) {
    console.error('Error fetching trending books:', error);
    // Fallback to fiction books
    return getBooksBySubject('fiction', limit);
  }
};

/**
 * Get cover image URL for a book
 * @param {string|number} coverId - The cover ID
 * @param {string} size - Size of the image ('S', 'M', 'L')
 * @returns {string|null} Cover image URL or null if no cover ID
 */
export const getCoverImageUrl = (coverId, size = 'M') => {
  if (!coverId) return null;
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
};

/**
 * Format authors array into a readable string
 * @param {Array} authors - Array of author names
 * @param {number} maxAuthors - Maximum number of authors to display
 * @returns {string} Formatted author string
 */
export const formatAuthors = (authors, maxAuthors = 2) => {
  if (!authors || authors.length === 0) {
    return 'Unknown Author';
  }
  
  if (authors.length <= maxAuthors) {
    return authors.join(', ');
  }
  
  return authors.slice(0, maxAuthors).join(', ') + ', ...';
};

/**
 * Sort books array based on the specified criteria
 * @param {Array} books - Array of book objects
 * @param {string} sortBy - Sort criteria
 * @returns {Array} Sorted array of books
 */
const applySorting = (books, sortBy) => {
  const sortedBooks = [...books];
  
  switch (sortBy) {
    case 'title':
      return sortedBooks.sort((a, b) => {
        const titleA = (a.title || '').toLowerCase();
        const titleB = (b.title || '').toLowerCase();
        return titleA.localeCompare(titleB);
      });
      
    case 'first_publish_year':
      return sortedBooks.sort((a, b) => {
        const yearA = a.first_publish_year || 0;
        const yearB = b.first_publish_year || 0;
        return yearA - yearB;
      });
      
    case 'first_publish_year desc':
      return sortedBooks.sort((a, b) => {
        const yearA = a.first_publish_year || 0;
        const yearB = b.first_publish_year || 0;
        return yearB - yearA;
      });
      
    case 'rating desc':
      // Since OpenLibrary doesn't provide ratings, sort by readinglog_count as proxy
      return sortedBooks.sort((a, b) => {
        const ratingA = a.readinglog_count || 0;
        const ratingB = b.readinglog_count || 0;
        return ratingB - ratingA;
      });
      
    case 'readinglog_count desc':
      return sortedBooks.sort((a, b) => {
        const countA = a.readinglog_count || 0;
        const countB = b.readinglog_count || 0;
        return countB - countA;
      });
      
    default:
      return sortedBooks; // Return as-is for relevance sorting
  }
};

/**
 * Advanced search for books with multiple parameters
 * @param {Object} searchParams - Search parameters object
 * @returns {Promise<Array>} Array of book objects
 */
export const advancedSearchBooks = async (searchParams) => {
  const { query, author, subject, year, language, limit = 20 } = searchParams;
  
  try {
    const params = new URLSearchParams();
    params.append('fields', API_FIELDS);
    params.append('limit', limit.toString());
    
    // Build search query
    let searchQuery = '';
    if (query) {
      searchQuery += `title:${query}`;
    }
    if (author) {
      searchQuery += searchQuery ? ` AND author:${author}` : `author:${author}`;
    }
    if (subject) {
      searchQuery += searchQuery ? ` AND subject:${subject}` : `subject:${subject}`;
    }
    
    if (searchQuery) {
      params.append('q', searchQuery);
    } else {
      params.append('q', '*'); // Search all if no specific query
    }
    
    if (year) {
      params.append('first_publish_year', year);
    }
    
    if (language) {
      params.append('language', language);
    }
    
    const url = `${API_BASE_URL}?${params.toString()}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.docs || [];
    
  } catch (error) {
    console.error('Error in advanced search:', error);
    throw error;
  }
};
