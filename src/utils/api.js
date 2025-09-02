// src/utils/api.js
const API_BASE_URL = 'https://openlibrary.org/search.json';
const API_FIELDS = 'key,title,author_name,cover_i,first_publish_year,isbn';

/**
 * Search for books using the OpenLibrary API
 * @param {string} query - The search query (book title)
 * @param {number} limit - Maximum number of results to return (default: 20)
 * @returns {Promise<Array>} Array of book objects
 */
export const searchBooks = async (query, limit = 20) => {
  try {
    // Encode the query parameter
    const encodedQuery = encodeURIComponent(query);
    
    // Construct the API URL
    const url = `${API_BASE_URL}?title=${encodedQuery}&fields=${API_FIELDS}&limit=${limit}`;
    
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
    console.error('Error fetching books:', error);
    throw error;
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
