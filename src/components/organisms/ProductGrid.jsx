import ProductCard from '../molecules/ProductCard.jsx';
import CategoryFilter from '../molecules/CategoryFilter.jsx';
import Pagination from '../molecules/Pagination.jsx';
import SearchForm from '../molecules/SearchForm.jsx';
import { useProductStore } from '../../store/productStore.js';
import { useCartStore } from '../../store/cartStore.js';
import { useEffect } from 'react';
import { useDebounce } from '../../hooks/useDebounce.js';

const ProductGrid = () => {
  const {
    loadProducts,
    products,
    categories,
    filteredProducts,
    activeCategory,
    searchTerm,
    page,
    itemsPerPage,
    totalPages,
    setSearchTerm,
    setCategory,
    setPage,
    loading,
  } = useProductStore();

  const { addItem } = useCartStore();
  const debouncedSearch = useDebounce(searchTerm, 250);

  useEffect(() => {
    if (!products.length) loadProducts();
  }, [loadProducts, products.length]);

  const currentItems = filteredProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <section className="space-y-8">
      <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
        <SearchForm value={searchTerm} onChange={setSearchTerm} />
        <div className="hidden items-center gap-4 rounded-[28px] border border-slate-200 bg-white p-4 shadow-soft dark:border-slate-800 dark:bg-slate-900 lg:flex">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Productos</span>
          <span className="rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-300">{filteredProducts.length} disponibles</span>
        </div>
      </div>
      <CategoryFilter categories={categories} activeCategory={activeCategory} onSelect={setCategory} />
      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-96 animate-pulse rounded-[32px] bg-slate-200 dark:bg-slate-800" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {currentItems.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={addItem} />
          ))}
        </div>
      )}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </section>
  );
};

export default ProductGrid;
