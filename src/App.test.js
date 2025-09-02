// src/App.test.js
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders book finder header', () => {
  render(<App />);
  const headerElement = screen.getByText(/book finder/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders search form', () => {
  render(<App />);
  const searchInput = screen.getByPlaceholderText(/enter book title/i);
  expect(searchInput).toBeInTheDocument();
});

test('renders search button', () => {
  render(<App />);
  const searchButton = screen.getByRole('button', { name: /search/i });
  expect(searchButton).toBeInTheDocument();
});
