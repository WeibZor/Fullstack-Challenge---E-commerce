import { useEffect, useState, useMemo } from 'react';
import { useProductStore } from '../store/productStore.js';
import { productMatchesSearch } from '../utils/search.js';
import Button from '../components/atoms/Button.jsx';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { loadProducts, error, products } = useProductStore();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Featured products (first 4)
  const featuredProducts = products.slice(0, 4);

  // Categories data
  const categories = [
    { id: 'all', name: 'Todos', icon: 'grid' },
    { id: 'electronics', name: 'Electrónicos', icon: 'device' },
    { id: "men's clothing", name: 'Ropa Hombre', icon: 'user' },
    { id: "women's clothing", name: 'Ropa Mujer', icon: 'user' },
    { id: 'jewelery', name: 'Joyería', icon: 'diamond' },
    { id: 'home & garden', name: 'Hogar y Jardín', icon: 'home' },
    { id: 'sports & outdoors', name: 'Deportes', icon: 'activity' },
    { id: 'books', name: 'Libros', icon: 'book' },
  ];

  // Filter products by search term and category
  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim();
    return products.filter((product) => {
      const matchesSearch = normalizedSearch ? productMatchesSearch(product, normalizedSearch) : true;
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 px-6 py-16 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <span className="inline-flex rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 text-sm font-semibold">
                ✨ Tienda moderna 2026
              </span>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Descubre productos premium con experiencia SPA excepcional
              </h1>
              <p className="max-w-xl text-lg leading-8 text-brand-100">
                Navega, filtra y compra con un flujo optimizado. El carrito persiste localmente y la interfaz se adapta perfectamente a todos los dispositivos.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/cart">
                  <Button className="bg-white text-brand-600 hover:bg-brand-50">Ver carrito</Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-brand-600">
                    Iniciar sesión
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-[32px] bg-white/10 backdrop-blur-sm p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-square rounded-2xl bg-white/20"></div>
                  <div className="aspect-square rounded-2xl bg-white/20"></div>
                  <div className="aspect-square rounded-2xl bg-white/20"></div>
                  <div className="aspect-square rounded-2xl bg-white/20"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 text-center shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-900/30">
            <svg className="h-6 w-6 text-brand-600 dark:text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Envío rápido</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Entrega en 24-48 horas</p>
        </div>
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 text-center shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-900/30">
            <svg className="h-6 w-6 text-brand-600 dark:text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Garantía</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">30 días de devolución</p>
        </div>
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 text-center shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-900/30">
            <svg className="h-6 w-6 text-brand-600 dark:text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Pago seguro</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">SSL certificado</p>
        </div>
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 text-center shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-900/30">
            <svg className="h-6 w-6 text-brand-600 dark:text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Soporte 24/7</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Atención personalizada</p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Explora nuestros productos</h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">Busca y filtra productos únicos en cada categoría</p>
        </div>

        {/* Search Bar */}
        <div className="mx-auto max-w-md">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm placeholder-slate-400 shadow-soft focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-brand-400"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`whitespace-nowrap rounded-full px-6 py-3 text-sm font-semibold transition-colors ${
                selectedCategory === category.id
                  ? 'bg-brand-600 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Search Results Info */}
        {(searchTerm || selectedCategory !== 'all') && (
          <div className="text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {searchTerm && `Resultados para "${searchTerm}"`}
              {searchTerm && selectedCategory !== 'all' && ' en '}
              {selectedCategory !== 'all' && `categoría ${categories.find(c => c.id === selectedCategory)?.name}`}
              {filteredProducts.length > 0 && ` (${filteredProducts.length} productos)`}
            </p>
          </div>
        )}

        {/* Filtered Products */}
        {currentProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {currentProducts.map((product) => (
              <div key={product.id} className="group rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                <div className="aspect-square overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 line-clamp-2">
                    {product.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating.rate)
                              ? 'text-yellow-400'
                              : 'text-slate-300 dark:text-slate-600'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      ({product.rating.count})
                    </span>
                  </div>
                  <p className="text-xl font-bold text-brand-600 dark:text-brand-400">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
                <Link
                  to={`/product/${product.id}`}
                  className="mt-4 inline-block text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-300"
                >
                  Ver producto →
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
              <svg className="h-8 w-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">No se encontraron productos</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Intenta con otros términos de búsqueda o selecciona una categoría diferente.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-slate-800 dark:hover:text-slate-300"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {Array.from({ length: Math.min(totalPages, 9) }, (_, i) => {
                const pageNumber = i + 1;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      currentPage === pageNumber
                        ? 'bg-brand-600 text-white'
                        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-slate-800 dark:hover:text-slate-300"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Show more link */}
        <div className="text-center">
          <Link
            to="/products"
            className="inline-flex items-center rounded-full bg-brand-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Ver todos los productos
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <>
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Productos destacados</h2>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">Los más vendidos y mejor valorados</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <div key={product.id} className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
                  <img src={product.image} alt={product.title} className="aspect-square w-full rounded-2xl object-cover" />
                  <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-100 line-clamp-2">{product.title}</h3>
                  <p className="mt-2 text-xl font-bold text-brand-600 dark:text-brand-400">${product.price.toFixed(2)}</p>
                  <Link to={`/product/${product.id}`} className="mt-4 inline-block text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-300">
                    Ver producto →
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* Testimonials Section */}
      <section className="rounded-[32px] bg-slate-50 px-6 py-16 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Lo que dicen nuestros clientes</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
              <div className="flex text-yellow-400">
                {'★'.repeat(5)}
              </div>
              <p className="mt-4 text-slate-600 dark:text-slate-400">"Excelente experiencia de compra. La interfaz es intuitiva y el envío fue rapidísimo."</p>
              <p className="mt-4 font-semibold text-slate-900 dark:text-slate-100">María García</p>
            </div>
            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
              <div className="flex text-yellow-400">
                {'★'.repeat(5)}
              </div>
              <p className="mt-4 text-slate-600 dark:text-slate-400">"Productos de calidad y atención al cliente excepcional. Recomiendo totalmente."</p>
              <p className="mt-4 font-semibold text-slate-900 dark:text-slate-100">Carlos Rodríguez</p>
            </div>
            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900 sm:col-span-2 lg:col-span-1">
              <div className="flex text-yellow-400">
                {'★'.repeat(5)}
              </div>
              <p className="mt-4 text-slate-600 dark:text-slate-400">"La mejor tienda online que he usado. Diseño moderno y funcionalidad perfecta."</p>
              <p className="mt-4 font-semibold text-slate-900 dark:text-slate-100">Ana López</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="rounded-[32px] bg-brand-600 px-6 py-16 text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold">Suscríbete a nuestro newsletter</h2>
          <p className="mt-4 text-lg text-brand-100">
            Recibe ofertas exclusivas, nuevos productos y consejos de moda directamente en tu email.
          </p>
          <div className="mt-8 flex">
            <input
              type="email"
              placeholder="Tu email"
              className="flex-1 rounded-l-lg border-0 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="rounded-r-lg bg-white px-6 py-3 font-semibold text-brand-600 hover:bg-brand-50 transition">
              Suscribir
            </button>
          </div>
        </div>
      </section>

      {/* All Products Section */}
      {error && (
        <div className="rounded-3xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/20 dark:text-rose-200">
          {error}
        </div>
      )}
    </div>
  );
};

export default HomePage;
