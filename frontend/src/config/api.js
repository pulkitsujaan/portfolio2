/**
 * API base URL — uses relative paths in production (Vercel),
 * falls back to localhost for local development.
 */
const API_BASE = import.meta.env.VITE_API_URL || '';

export default API_BASE;
