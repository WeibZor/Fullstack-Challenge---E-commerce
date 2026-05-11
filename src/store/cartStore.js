import { create } from 'zustand';
import { getLocalItem, setLocalItem } from '../utils/storage.js';

const initialCart = getLocalItem('ecommerce_cart', []);

export const useCartStore = create((set, get) => ({
  items: initialCart,
  addItem: (product) => {
    const existing = get().items.find((item) => item.id === product.id);
    const updatedItems = existing
      ? get().items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      : [...get().items, { ...product, quantity: 1 }];
    set(() => ({ items: updatedItems }));
    setLocalItem('ecommerce_cart', updatedItems);
  },
  removeItem: (id) => {
    const updatedItems = get().items.filter((item) => item.id !== id);
    set(() => ({ items: updatedItems }));
    setLocalItem('ecommerce_cart', updatedItems);
  },
  updateQuantity: (id, quantity) => {
    const updatedItems = get().items
      .map((item) => (item.id === id ? { ...item, quantity } : item))
      .filter((item) => item.quantity > 0);
    set(() => ({ items: updatedItems }));
    setLocalItem('ecommerce_cart', updatedItems);
  },
  clearCart: () => {
    set(() => ({ items: [] }));
    setLocalItem('ecommerce_cart', []);
  },
  get subtotal() {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },
  get total() {
    return get().subtotal;
  },
}));
