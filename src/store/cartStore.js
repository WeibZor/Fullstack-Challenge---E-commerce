import { create } from 'zustand';
import { getLocalItem, setLocalItem } from '../utils/storage.js';

const TAX_RATE = 0.19;
const initialCart = getLocalItem('cart', []);

const normalizeCartItem = (item) => {
  let normalizedStock = 10;

  if (item.stock !== undefined && item.stock !== null) {
    normalizedStock = Number(item.stock);
  } else if (item.rating?.count !== undefined && item.rating?.count !== null) {
    normalizedStock = Number(item.rating.count);
  }

  return {
    ...item,
    price: Number(item.price) || 0,
    quantity: Math.max(1, Number(item.quantity) || 1),
    stock: normalizedStock,
  };
};

const getStock = (product) => {
  if (product.stock != null) return Number(product.stock);
  if (product.rating?.count != null) return Number(product.rating.count);
  return 10;
};

export const useCartStore = create((set, get) => ({
  items: initialCart.map(normalizeCartItem),
  addItem: (product) => {
    const normalizedProduct = normalizeCartItem(product);
    const stock = getStock(normalizedProduct);
    const existing = get().items.find((item) => item.id === normalizedProduct.id);
    const updatedItems = existing
      ? get().items.map((item) =>
          item.id === normalizedProduct.id
            ? { ...item, quantity: Math.min(item.quantity + 1, stock) }
            : item
        )
      : [...get().items, { ...normalizedProduct, quantity: 1 }];
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
        return { ...item, quantity: Math.max(1, Math.min(Number(quantity) || 1, stock)) };
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
    return get().items.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0), 0);
  },
  get tax() {
    return Number.parseFloat((get().subtotal * TAX_RATE).toFixed(2)) || 0;
  },
  get total() {
    return Number.parseFloat((get().subtotal + get().tax).toFixed(2)) || 0;
  },
}));
