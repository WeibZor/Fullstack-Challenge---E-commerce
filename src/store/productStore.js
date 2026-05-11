import { create } from 'zustand';
import { fetchProductsApi, fetchCategoriesApi } from '../services/api.js';
import { mockProducts } from '../mockdata/products.js';
import { mockCategories } from '../mockdata/categories.js';

const normalizeProduct = (product) => ({
  ...product,
  stock: product.stock ?? (product.rating?.count ?? 12),
  sku: `SKU-${String(product.id).padStart(5, '0')}`,
  images: [product.image, product.image, product.image],
  categoryLabel: product.category,
});

export const useProductStore = create((set, get) => ({
  products: [],
  categories: [],
  filteredProducts: [],
  loading: false,
  error: null,
  searchTerm: '',
  activeCategory: 'all',
  page: 1,
  itemsPerPage: 9,
  totalPages: 1,
  loadProducts: async () => {
    set({ loading: true, error: null });
    try {
      const [products, categories] = await Promise.all([
        fetchProductsApi(),
        fetchCategoriesApi(),
      ]);
      const normalizedProducts = products.map(normalizeProduct);
      set({
        products: normalizedProducts,
        categories: ['all', ...categories],
        filteredProducts: normalizedProducts,
        totalPages: Math.ceil(normalizedProducts.length / get().itemsPerPage),
      });
    } catch (error) {
      const normalizedProducts = mockProducts.map(normalizeProduct);
      set({
        products: normalizedProducts,
        categories: ['all', ...mockCategories],
        filteredProducts: normalizedProducts,
        totalPages: Math.ceil(normalizedProducts.length / get().itemsPerPage),
        error: 'No fue posible cargar productos desde la API. Se cargó contenido local.',
      });
    } finally {
      set({ loading: false });
    }
  },
  setSearchTerm: (value) =>
    set((state) => {
      const term = value.toLowerCase();
      const filtered = state.products.filter((product) => {
        const matchText =
          product.title.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term);
        const matchCategory =
          state.activeCategory === 'all' ||
          product.category === state.activeCategory;
        return matchText && matchCategory;
      });

      return {
        searchTerm: value,
        page: 1,
        filteredProducts: filtered,
        totalPages: Math.max(1, Math.ceil(filtered.length / state.itemsPerPage)),
      };
    }),
  setCategory: (category) =>
    set((state) => {
      const filtered = state.products.filter((product) => {
        const matchCategory = category === 'all' || product.category === category;
        const term = state.searchTerm.toLowerCase();
        const matchText =
          product.title.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term);
        return matchCategory && matchText;
      });

      return {
        activeCategory: category,
        page: 1,
        filteredProducts: filtered,
        totalPages: Math.max(1, Math.ceil(filtered.length / state.itemsPerPage)),
      };
    }),
  setPage: (page) => set(() => ({ page })),
  get currentItems() {
    return this.filteredProducts.slice((this.page - 1) * this.itemsPerPage, this.page * this.itemsPerPage);
  },
  get featuredProducts() {
    return this.products.slice(0, 6);
  },
  getRecentProducts: () => {
    return get().products.slice(0, 8);
  },
  getRelatedProducts: (category, currentId) => {
    return get().products.filter((product) => product.category === category && product.id !== currentId).slice(0, 4);
  },
}));
