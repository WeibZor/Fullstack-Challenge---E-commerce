import ProductCard from '../molecules/ProductCard.jsx';
import CategoryFilter from '../molecules/CategoryFilter.jsx';
import Pagination from '../molecules/Pagination.jsx';
import SearchForm from '../molecules/SearchForm.jsx';
import { useProductStore } from '../../store/productStore.js';
import { useCartStore } from '../../store/cartStore.js';
import { useEffect } from 'react';

const ProductGrid = () => {
  const {
    loadProducts,
    products,
    categories,
    currentItems,
    activeCategory,
    searchTerm,
    page,
    totalPages,
    setSearchTerm,
    setCategory,
    setPage,
    loading,
    error,
  } = useProductStore();

  const { addItem } = useCartStore();

  useEffect(() => {
    if (!products.length) loadProducts();
  }, [loadProducts, products.length]);

  return (
    <section className="space-y-8">
      <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
        <SearchForm value={searchTerm} onChange={setSearchTerm} />
        <div className="hidden items-center gap-4 rounded-[28px] border border-slate-200 bg-white p-4 shadow-soft dark:border-slate-800 dark:bg-slate-900 lg:flex">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Productos</span>
          <span className="rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-300">{products.length} totales</span>
        </div>
      </div>
      <CategoryFilter categories={categories} activeCategory={activeCategory} onSelect={setCategory} />
      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-96 animate-pulse rounded-[32px] bg-slate-200 dark:bg-slate-800" />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-[32px] border border-rose-200 bg-rose-50 p-8 text-center text-sm text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/20 dark:text-rose-200">
          {error}
        </div>
      ) : currentItems.length === 0 ? (
        <div className="rounded-[32px] border border-slate-200 bg-white p-10 text-center shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">No encontramos productos</h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">Ajusta los filtros o prueba con otra búsqueda.</p>
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
