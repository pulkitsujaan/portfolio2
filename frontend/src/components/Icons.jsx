import React from 'react';

export const GithubIcon = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 1.6a10.6 10.6 0 0 0-3.35 20.66c.53.1.72-.23.72-.51v-1.98c-2.95.64-3.58-1.27-3.58-1.27-.48-1.24-1.18-1.57-1.18-1.57-.96-.66.07-.64.07-.64 1.07.07 1.63 1.1 1.63 1.1.95 1.63 2.49 1.16 3.1.89.1-.69.37-1.16.67-1.43-2.36-.27-4.84-1.18-4.84-5.25 0-1.16.41-2.11 1.09-2.85-.11-.27-.47-1.35.1-2.82 0 0 .9-.29 2.94 1.09a10.2 10.2 0 0 1 5.36 0c2.04-1.38 2.93-1.09 2.93-1.09.58 1.47.22 2.55.11 2.82.68.74 1.08 1.69 1.08 2.85 0 4.08-2.48 4.97-4.85 5.24.38.33.72.97.72 1.96v2.9c0 .28.18.62.73.51A10.6 10.6 0 0 0 12 1.6Z"/>
  </svg>
);

export const LinkedinIcon = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M5.4 3.4a2 2 0 1 0 0 4.1 2 2 0 0 0 0-4.1ZM3.6 9.1h3.6V20.6H3.6V9.1Zm6.4 0h3.5v1.6h.05c.49-.9 1.68-1.85 3.45-1.85 3.69 0 4.37 2.34 4.37 5.39v6.35h-3.6v-5.63c0-1.34-.02-3.07-1.93-3.07-1.94 0-2.24 1.46-2.24 2.97v5.73h-3.6V9.1Z"/>
  </svg>
);

export const TwitterIcon = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M14.1 10.6 21.3 2.5h-2.6l-6.1 6.97L7.7 2.5H2l7.5 10.9L2 21.5h2.6l6.4-7.36 5.3 7.36H22l-7.9-10.9Zm-2.3 2.6-.74-1.02L4.9 4.3h2.36l4.78 6.62.74 1.02 6.2 8.6h-2.36l-5.16-7Z"/>
  </svg>
);

export const InstagramIcon = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <rect x="3.3" y="3.3" width="17.4" height="17.4" rx="4.5"/>
    <circle cx="12" cy="12" r="3.9"/>
    <circle cx="17.05" cy="6.95" r="0.9" fill="currentColor" stroke="none"/>
  </svg>
);
