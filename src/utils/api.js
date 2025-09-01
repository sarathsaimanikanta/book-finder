const BASE_URL = 'https://openlibrary.org/search.json';

export const fetchBooksByTitle = async (title) => {
  if (!title || !title.trim()) {
    return [];
  }

  const url = `${BASE_URL}?title=${encodeURIComponent(title.trim())}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch books. Status: ${response.status}`);
    }

    const data = await response.json();

    return data.docs || [];
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};
