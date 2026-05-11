import { create } from 'zustand';
import { getLocalItem, setLocalItem } from '../utils/storage.js';

const initialUser = getLocalItem('ecommerce_user', null);
const initialTheme = getLocalItem('ecommerce_theme', 'light');

export const useAuthStore = create((set) => ({
  user: initialUser,
  theme: initialTheme,
  isAuthenticated: Boolean(initialUser),
  login: (userData) => {
    set(() => ({ user: userData, isAuthenticated: true }));
    setLocalItem('ecommerce_user', userData);
  },
  register: (userData) => {
    set(() => ({ user: userData, isAuthenticated: true }));
    setLocalItem('ecommerce_user', userData);
  },
  logout: () => {
    set(() => ({ user: null, isAuthenticated: false }));
    localStorage.removeItem('ecommerce_user');
  },
  setTheme: (value) => {
    set(() => ({ theme: value }));
    setLocalItem('ecommerce_theme', value);
  },
  initializeTheme: () => {
    const currentTheme = getLocalItem('ecommerce_theme', 'light');
    set(() => ({ theme: currentTheme }));
    document.documentElement.classList.toggle('dark', currentTheme === 'dark');
  },
}));
