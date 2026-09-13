/**
 * Central fetch wrapper for all backend (Flask) calls.
 *
 * Why this exists:
 * - In the browser (dev or Vercel), relative fetch("/api/...") works fine
 *   because the frontend and the /api proxy are same-origin.
 * - Inside the Capacitor native app, there is no dev proxy and no shared
 *   origin — the app loads from capacitor://localhost / https://localhost
 *   and must call your hosted Flask backend's full URL instead.
 *
 * Set VITE_API_URL in seediq-frontend/.env to your backend's base URL
 * (e.g. https://api.seediq.app) when building for Capacitor. Leave it
 * empty for normal web dev/deploys and relative paths keep working.
 */

const API_BASE_URL = (import.meta.env.VITE_API_URL ?? "").replace(/\/+$/, "");

/**
 * Resolves a backend path ("/api/login") to an absolute URL when
 * VITE_API_URL is set, otherwise leaves it relative.
 */
export function apiUrl(path: string): string {
  if (!API_BASE_URL) return path;
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Drop-in replacement for fetch() against our own backend.
 * Always sends credentials so the Flask session cookie is included,
 * which is required once the frontend and backend are on different
 * origins (as they are inside the mobile app).
 */
export function apiFetch(path: string, options: RequestInit = {}): Promise<Response> {
  return fetch(apiUrl(path), {
    credentials: "include",
    ...options,
  });
}
