/* ============================================
   Authentication Utility Functions
   ============================================ */

const TOKEN_KEY = 'company_website_token';
const USER_KEY = 'company_website_user';

/**
 * Get JWT token from localStorage
 * @returns {string|null} JWT token or null
 */
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Set JWT token in localStorage
 * @param {string} token - JWT token
 */
export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Remove JWT token from localStorage
 */
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;

  try {
    /* Decode JWT payload to check expiration */
    const payload = JSON.parse(atob(token.split('.')[1]));
    const isExpired = payload.exp * 1000 < Date.now();
    if (isExpired) {
      removeToken();
      removeUser();
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Get user info from localStorage
 * @returns {object|null} User object or null
 */
export const getUser = () => {
  const userStr = localStorage.getItem(USER_KEY);
  try {
    return userStr ? JSON.parse(userStr) : null;
  } catch (e) {
    return null;
  }
};

/**
 * Set user info in localStorage
 * @param {object} user - User object
 */
export const setUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

/**
 * Remove user info from localStorage
 */
export const removeUser = () => {
  localStorage.removeItem(USER_KEY);
};

/**
 * Clear all auth data (logout)
 */
export const clearAuth = () => {
  removeToken();
  removeUser();
};
