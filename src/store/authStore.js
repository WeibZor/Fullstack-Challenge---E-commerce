import { create } from 'zustand';
import { getLocalItem, setLocalItem } from '../utils/storage.js';
import { getCurrentUser, clearCurrentUser, setCurrentUser, updateUserProfile, loginUser, registerUser } from '../services/authService.js';

const initialUser = getCurrentUser();
const initialTheme = getLocalItem('theme', 'light');

export const useAuthStore = create((set, get) => ({
  user: initialUser,
  theme: initialTheme,
  isAuthenticated: Boolean(initialUser),
  loading: false,
  error: null,
  login: async (userData) => {
    set(() => ({ loading: true, error: null }));
    try {
      const user = await loginUser(userData);
      set(() => ({ user, isAuthenticated: true, loading: false }));
      setCurrentUser(user);
      return user;
    } catch (error) {
      set(() => ({ error: error.message, loading: false }));
      throw error;
    }
  },
  register: async (userData) => {
    set(() => ({ loading: true, error: null }));
    try {
      const user = await registerUser(userData);
      set(() => ({ user, isAuthenticated: true, loading: false }));
      setCurrentUser(user);
      return user;
    } catch (error) {
      set(() => ({ error: error.message, loading: false }));
      throw error;
    }
  },
  logout: () => {
    set(() => ({ user: null, isAuthenticated: false, error: null }));
    clearCurrentUser();
  },
  updateProfile: async (profile) => {
    set(() => ({ loading: true, error: null }));
    try {
      const user = getCurrentUser();
      if (!user) {
        throw new Error('No hay usuario autenticado.');
      }
      const updatedUser = await updateUserProfile({ id: user.id, ...profile });
      set(() => ({ user: updatedUser, loading: false }));
      return updatedUser;
    } catch (error) {
      set(() => ({ error: error.message, loading: false }));
      throw error;
    }
  },
  setTheme: (value) => {
    set(() => ({ theme: value }));
    setLocalItem('theme', value);
    document.documentElement.classList.toggle('dark', value === 'dark');
  },
  initializeTheme: () => {
    const currentTheme = getLocalItem('theme', 'light');
    set(() => ({ theme: currentTheme }));
    document.documentElement.classList.toggle('dark', currentTheme === 'dark');
  },
  clearError: () => set(() => ({ error: null })),
}));
