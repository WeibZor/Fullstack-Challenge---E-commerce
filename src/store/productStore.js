import { create } from 'zustand';
import { fetchProductsApi, fetchCategoriesApi } from '../services/api.js';
import { mockProducts } from '../mockdata/products.js';
import { mockCategories } from '../mockdata/categories.js';

export const useProductStore = create((set) => ({
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
      set({
        products,
        categories: ['all', ...categories],
        filteredProducts: products,
        totalPages: Math.ceil(products.length / 9),
      });
    } catch (error) {
      set({
        products: mockProducts,
        categories: ['all', ...mockCategories],
        filteredProducts: mockProducts,
        totalPages: Math.ceil(mockProducts.length / 9),
        error: 'No fue posible cargar productos. Mostrando datos locales.',
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
          product.description.toLowerCase().includes(term);
        const matchCategory =
          state.activeCategory === 'all' ||
          product.category === state.activeCategory;
        return matchText && matchCategory;
      });

      return {
        searchTerm: value,
        page: 1,
        filteredProducts: filtered,
        totalPages: Math.ceil(filtered.length / state.itemsPerPage),
      };
    }),
  setCategory: (category) =>
    set((state) => {
      const filtered = state.products.filter((product) => {
        const matchCategory = category === 'all' || product.category === category;
        const matchText = product.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(state.searchTerm.toLowerCase());
        return matchCategory && matchText;
      });

      return {
        activeCategory: category,
        page: 1,
        filteredProducts: filtered,
        totalPages: Math.ceil(filtered.length / state.itemsPerPage),
      };
    }),
  setPage: (page) => set(() => ({ page })),
  get currentItems() {
    return this.filteredProducts.slice((this.page - 1) * this.itemsPerPage, this.page * this.itemsPerPage);
  },
}));
