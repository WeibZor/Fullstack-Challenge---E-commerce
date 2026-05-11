import { create } from 'zustand';
import { getLocalItem, setLocalItem } from '../utils/storage.js';

const initialWishlist = getLocalItem('wishlist', []);

export const useWishlistStore = create((set, get) => ({
  items: initialWishlist,
  addItem: (product) => {
    const exists = get().items.find((item) => item.id === product.id);
    if (!exists) {
      const updatedItems = [...get().items, product];
      set(() => ({ items: updatedItems }));
      setLocalItem('wishlist', updatedItems);
    }
  },
  removeItem: (id) => {
    const updatedItems = get().items.filter((item) => item.id !== id);
    set(() => ({ items: updatedItems }));
    setLocalItem('wishlist', updatedItems);
  },
  isInWishlist: (id) => {
    return get().items.some((item) => item.id === id);
  },
  clearWishlist: () => {
    set(() => ({ items: [] }));
    setLocalItem('wishlist', []);
  },
}));