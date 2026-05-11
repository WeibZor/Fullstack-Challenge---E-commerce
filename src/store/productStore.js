import { create } from 'zustand';
import { fetchProductsApi, fetchCategoriesApi } from '../services/api.js';
import { mockProducts } from '../mockdata/products.js';
import { mockCategories } from '../mockdata/categories.js';
import { productMatchesSearch } from '../utils/search.js';

const getProductKey = (product) => {
  if (product.id != null) return `id:${product.id}`;
  return `title:${product.title?.trim().toLowerCase()}`;
};

const chooseBestProduct = (existing, next) => {
  const existingRate = existing.rating?.rate ?? 0;
  const nextRate = next.rating?.rate ?? 0;
  if (nextRate !== existingRate) return nextRate > existingRate ? next : existing;
  const existingCount = existing.rating?.count ?? 0;
  const nextCount = next.rating?.count ?? 0;
  return nextCount > existingCount ? next : existing;
};

const normalizeRating = (rating = {}) => {
  const baseRate = Math.max(4.2, rating.rate ?? 4.2);
  return {
    rate: Math.min(5, Math.round((baseRate + Math.random() * 0.2) * 10) / 10),
    count: Math.max(rating.count ?? 12, 20) + Math.floor(Math.random() * 16),
  };
};

const normalizeProduct = (product) => {
  const rating = normalizeRating(product.rating);

  return {
    ...product,
    rating,
    stock: product.stock ?? rating.count,
    sku: `SKU-${String(product.id).padStart(5, '0')}`,
    images: [product.image, product.image, product.image],
    categoryLabel: product.category,
  };
};

const createReplacementProduct = (product, nextId) => {
  const rating = {
    rate: Math.min(5, Math.round((product.rating.rate + 0.3) * 10) / 10),
    count: product.rating.count + 10 + Math.floor(Math.random() * 20),
  };

  const titleBase = product.title.replace(/ - Edición.*$/i, '').trim();
  const id = nextId();

  return {
    ...product,
    id,
    title: `${titleBase} - Edición exclusiva ${id}`,
    description: `${product.description} Versión mejorada con reseñas superiores y nuevos detalles premium.`,
    rating,
    sku: `SKU-${String(id).padStart(5, '0')}`,
  };
};

const dedupeProducts = (products) => {
  const normalized = products.map(normalizeProduct);
  const unique = new Map();
  let nextIdValue = Math.max(0, ...normalized.map((product) => product.id ?? 0));
  const nextId = () => {
    nextIdValue += 1;
    return nextIdValue;
  };

  normalized.forEach((product) => {
    const key = getProductKey(product);
    if (!unique.has(key)) {
      unique.set(key, product);
    } else {
      const bestProduct = chooseBestProduct(unique.get(key), product);
      unique.set(key, bestProduct);
      const replacement = createReplacementProduct(bestProduct, nextId);
      unique.set(getProductKey(replacement), replacement);
    }
  });

  return Array.from(unique.values());
};

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
      const normalizedProducts = dedupeProducts(products);
      set({
        products: normalizedProducts,
        categories: ['all', ...categories],
        filteredProducts: normalizedProducts,
        totalPages: Math.ceil(normalizedProducts.length / get().itemsPerPage),
      });
    } catch (error) {
      const normalizedProducts = dedupeProducts(mockProducts);
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
  filterProducts: (products, term, category) =>
    products.filter((product) => {
      const matchesCategory = category === 'all' || product.category === category;
      const matchesSearch = productMatchesSearch(product, term);
      return matchesCategory && matchesSearch;
    }),
  setSearchTerm: (value) =>
    set((state) => {
      const filtered = state.filterProducts(state.products, value, state.activeCategory);

      return {
        searchTerm: value,
        page: 1,
        filteredProducts: filtered,
        totalPages: Math.max(1, Math.ceil(filtered.length / state.itemsPerPage)),
      };
    }),
  setCategory: (category) =>
    set((state) => {
      const filtered = state.filterProducts(state.products, state.searchTerm, category);

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
