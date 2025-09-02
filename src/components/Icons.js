// src/components/Icons.js
import React from 'react';

// Base SVG wrapper component with accessibility features
const SvgIcon = ({ 
  children, 
  size = 20, 
  className = '', 
  ariaLabel, 
  fill = 'currentColor',
  viewBox = '0 0 24 24',
  ...props 
}) => (
  <svg
    className={`icon ${className}`}
    width={size}
    height={size}
    viewBox={viewBox}
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label={ariaLabel}
    {...props}
  >
    {children}
  </svg>
);

// Home icon
export const HomeIcon = ({ size, className, ariaLabel = "Home", ...props }) => (
  <SvgIcon size={size} className={className} ariaLabel={ariaLabel} {...props}>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </SvgIcon>
);

// Heart icons for wishlist
export const HeartIcon = ({ size, className, ariaLabel = "Add to wishlist", ...props }) => (
  <SvgIcon size={size} className={className} ariaLabel={ariaLabel} {...props}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </SvgIcon>
);

export const HeartFilledIcon = ({ size, className, ariaLabel = "Remove from wishlist", ...props }) => (
  <SvgIcon size={size} className={className} ariaLabel={ariaLabel} fill="#ef4444" {...props}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </SvgIcon>
);

// User/Profile icon
export const UserIcon = ({ size, className, ariaLabel = "Profile", ...props }) => (
  <SvgIcon size={size} className={className} ariaLabel={ariaLabel} {...props}>
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </SvgIcon>
);

// Book icon
export const BookIcon = ({ size, className, ariaLabel = "Book", ...props }) => (
  <SvgIcon size={size} className={className} ariaLabel={ariaLabel} {...props}>
    <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
  </SvgIcon>
);

// Search icon
export const SearchIcon = ({ size, className, ariaLabel = "Search", ...props }) => (
  <SvgIcon size={size} className={className} ariaLabel={ariaLabel} {...props}>
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </SvgIcon>
);

// Filter icon
export const FilterIcon = ({ size, className, ariaLabel = "Filters", ...props }) => (
  <SvgIcon size={size} className={className} ariaLabel={ariaLabel} {...props}>
    <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
  </SvgIcon>
);

// Close/X icon
export const CloseIcon = ({ size, className, ariaLabel = "Close", ...props }) => (
  <SvgIcon size={size} className={className} ariaLabel={ariaLabel} {...props}>
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </SvgIcon>
);

// Arrow right icon
export const ArrowRightIcon = ({ size, className, ariaLabel = "Scroll right", ...props }) => (
  <SvgIcon size={size} className={className} ariaLabel={ariaLabel} {...props}>
    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
  </SvgIcon>
);

// Warning icon
export const WarningIcon = ({ size, className, ariaLabel = "Warning", ...props }) => (
  <SvgIcon size={size} className={className} ariaLabel={ariaLabel} fill="#f59e0b" {...props}>
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
  </SvgIcon>
);

// Error icon
export const ErrorIcon = ({ size, className, ariaLabel = "Error", ...props }) => (
  <SvgIcon size={size} className={className} ariaLabel={ariaLabel} fill="#ef4444" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </SvgIcon>
);

// Broken heart icon for empty wishlist
export const BrokenHeartIcon = ({ size, className, ariaLabel = "Empty wishlist", ...props }) => (
  <SvgIcon size={size} className={className} ariaLabel={ariaLabel} fill="#6b7280" {...props}>
    <path d="M12 21.35l-1.45-1.32c-.69-.62-1.34-1.19-1.92-1.71L12 15.1l3.37 3.22c-.58.52-1.23 1.09-1.92 1.71L12 21.35zM16.5 3C19.58 3 22 5.42 22 8.5c0 1.74-.81 3.41-2.09 4.5L12 21.35 4.09 13C2.81 11.91 2 10.24 2 8.5 2 5.42 4.42 3 7.5 3c1.04 0 2.01.31 2.84.84L12 5.1l1.66-1.26C14.49 3.31 15.46 3 16.5 3zM7.5 5C5.57 5 4 6.57 4 8.5c0 .94.33 1.85.91 2.58l.59.66L12 18.28l6.5-6.54.59-.66C19.67 10.35 20 9.44 20 8.5 20 6.57 18.43 5 16.5 5c-.46 0-.9.09-1.31.26L12 7.45 8.81 5.26C8.4 5.09 7.96 5 7.5 5z"/>
  </SvgIcon>
);

// No books found icon
export const NoResultsIcon = ({ size, className, ariaLabel = "No results found", ...props }) => (
  <SvgIcon size={size} className={className} ariaLabel={ariaLabel} fill="#6b7280" {...props}>
    <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
    <path d="M3 17.25l1.4-1.4 3.6 3.6-1.4 1.4z" opacity="0.7"/>
  </SvgIcon>
);

// Edit icon
export const EditIcon = ({ size, className, ariaLabel = "Edit", ...props }) => (
  <SvgIcon size={size} className={className} ariaLabel={ariaLabel} {...props}>
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
  </SvgIcon>
);

// Check icon
export const CheckIcon = ({ size, className, ariaLabel = "Save", ...props }) => (
  <SvgIcon size={size} className={className} ariaLabel={ariaLabel} fill="#10b981" {...props}>
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
  </SvgIcon>
);

// Cancel icon
export const CancelIcon = ({ size, className, ariaLabel = "Cancel", ...props }) => (
  <SvgIcon size={size} className={className} ariaLabel={ariaLabel} fill="#ef4444" {...props}>
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </SvgIcon>
);

// Trending/Fire icon
export const TrendingIcon = ({ size, className, ariaLabel = "Trending", ...props }) => (
  <SvgIcon size={size} className={className} ariaLabel={ariaLabel} fill="#f59e0b" viewBox="0 0 20 20" {...props}>
    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"/>
  </SvgIcon>
);

// Spinner/Loading icon
export const SpinnerIcon = ({ size, className, ariaLabel = "Loading", ...props }) => (
  <SvgIcon 
    size={size} 
    className={`${className} animate-spin`} 
    ariaLabel={ariaLabel} 
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
  </SvgIcon>
);

// External link icon
export const ExternalLinkIcon = ({ size, className, ariaLabel = "External link", ...props }) => (
  <SvgIcon size={size} className={className} ariaLabel={ariaLabel} {...props}>
    <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
  </SvgIcon>
);

// Chevron down icon
export const ChevronDownIcon = ({ size, className, ariaLabel = "Expand", ...props }) => (
  <SvgIcon size={size} className={className} ariaLabel={ariaLabel} {...props}>
    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
  </SvgIcon>
);

// Reset/Refresh icon
export const RefreshIcon = ({ size, className, ariaLabel = "Reset", ...props }) => (
  <SvgIcon size={size} className={className} ariaLabel={ariaLabel} {...props}>
    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
  </SvgIcon>
);

export default {
  HomeIcon,
  HeartIcon,
  HeartFilledIcon,
  UserIcon,
  BookIcon,
  SearchIcon,
  FilterIcon,
  CloseIcon,
  ArrowRightIcon,
  WarningIcon,
  ErrorIcon,
  BrokenHeartIcon,
  NoResultsIcon,
  EditIcon,
  CheckIcon,
  CancelIcon,
  TrendingIcon,
  SpinnerIcon,
  ExternalLinkIcon,
  ChevronDownIcon,
  RefreshIcon
};