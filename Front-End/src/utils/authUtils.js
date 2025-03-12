// Keys (keep consistent)
const LOGGED_IN_KEY = 'isLoggedIn';
const USER_ID_KEY = 'userId';
const ROLE_KEY = 'role';

// Set user info
export const setUserInfo = (id, role) => {
  localStorage.setItem(LOGGED_IN_KEY, 'true');
  localStorage.setItem(USER_ID_KEY, id);
  localStorage.setItem(ROLE_KEY, role);
};

// Get user info
export const getUserInfo = () => {
  return {
    isLoggedIn: localStorage.getItem(LOGGED_IN_KEY) === 'true',
    userId: localStorage.getItem(USER_ID_KEY),
    role: localStorage.getItem(ROLE_KEY),
  };
};

// Logout user
export const clearUserInfo = () => {
  localStorage.removeItem(LOGGED_IN_KEY);
  localStorage.removeItem(USER_ID_KEY);
  localStorage.removeItem(ROLE_KEY);
};
