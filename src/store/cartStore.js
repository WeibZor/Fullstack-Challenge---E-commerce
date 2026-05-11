import { create } from 'zustand';
import { getLocalItem, setLocalItem } from '../utils/storage.js';

const TAX_RATE = 0.19;
const initialCart = getLocalItem('cart', []);

const getStock = (product) => {
  if (product.stock != null) return product.stock;
  if (product.rating?.count != null) return product.rating.count;
  return 10;
};

export const useCartStore = create((set, get) => ({
  items: initialCart,
  addItem: (product) => {
    const stock = getStock(product);
    const existing = get().items.find((item) => item.id === product.id);
    const updatedItems = existing
      ? get().items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, stock) }
            : item
        )
      : [...get().items, { ...product, quantity: 1 }];
    set(() => ({ items: updatedItems }));
    setLocalItem('cart', updatedItems);
  },
  removeItem: (id) => {
    const updatedItems = get().items.filter((item) => item.id !== id);
    set(() => ({ items: updatedItems }));
    setLocalItem('cart', updatedItems);
  },
  updateQuantity: (id, quantity) => {
    const updatedItems = get().items
      .map((item) => {
        if (item.id !== id) return item;
        const stock = getStock(item);
        return { ...item, quantity: Math.max(1, Math.min(quantity, stock)) };
      })
      .filter((item) => item.quantity > 0);
    set(() => ({ items: updatedItems }));
    setLocalItem('cart', updatedItems);
  },
  clearCart: () => {
    set(() => ({ items: [] }));
    setLocalItem('cart', []);
  },
  get subtotal() {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },
  get tax() {
    return parseFloat((get().subtotal * TAX_RATE).toFixed(2));
  },
  get total() {
    return parseFloat((get().subtotal + get().tax).toFixed(2));
  },
}));
