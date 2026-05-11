import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductGrid from '../components/organisms/ProductGrid.jsx';
import { useProductStore } from '../store/productStore.js';
import { useCartStore } from '../store/cartStore.js';
import Button from '../components/atoms/Button.jsx';
import { Link } from 'react-router-dom';

const CategoryPage = () => {
  const { category } = useParams();
  const { products, loading, error, setCategory } = useProductStore();
  const { addItem } = useCartStore();
  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    // Filtrar productos por categoría
    const filtered = products.filter(product =>
      product.category.toLowerCase() === category.toLowerCase().replace(/-/g, ' ')
    );
    setCategoryProducts(filtered);
  }, [products, category]);

  // Mapeo de categorías a nombres legibles
  const categoryNames = {
    'electronics': 'Electrónicos',
    'mens-clothing': 'Ropa de Hombre',
    'womens-clothing': 'Ropa de Mujer',
    'jewelery': 'Joyería',
    'home-garden': 'Hogar y Jardín',
    'sports-outdoors': 'Deportes y Aire Libre',
    'books': 'Libros'
  };

  const displayName = categoryNames[category] || category;

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400">Cargando productos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <nav className="mb-4 flex items-center justify-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
          <Link to="/" className="hover:text-brand-600">Inicio</Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-slate-100">{displayName}</span>
        </nav>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">{displayName}</h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
          Descubre nuestra selección de {displayName.toLowerCase()}
        </p>
      </div>

      {/* Productos */}
      {error && (
        <div className="rounded-3xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/20 dark:text-rose-200">
          {error}
        </div>
      )}

      {categoryProducts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categoryProducts.map((product) => (
            <div key={product.id} className="group overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-soft transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 p-6 sm:p-8">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="space-y-3 p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-lg font-semibold text-brand-600 dark:text-brand-400">${product.price.toFixed(2)}</span>
                </div>
                <h3 className="line-clamp-2 text-base font-semibold text-slate-900 dark:text-slate-100">{product.title}</h3>
                <p className="line-clamp-3 text-sm leading-6 text-slate-500 dark:text-slate-400">{product.description}</p>
                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <Link to={`/product/${product.id}`} className="text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-300">
                    Ver detalle
                  </Link>
                  <Button variant="secondary" className="ml-auto" onClick={() => addItem(product)}>
                    Añadir
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-[32px] border border-slate-200 bg-white p-10 text-center shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">No hay productos disponibles</h2>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            No encontramos productos en la categoría {displayName}.
          </p>
          <Link to="/" className="mt-6 inline-flex rounded-3xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-600">
            Ir a la tienda
          </Link>
        </div>
      )}

      {/* Newsletter */}
      <section className="rounded-[32px] bg-brand-600 px-6 py-16 text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold">¿Te gusta esta categoría?</h2>
          <p className="mt-4 text-lg text-brand-100">
            Suscríbete a nuestro newsletter y recibe ofertas exclusivas en {displayName.toLowerCase()}.
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
    </div>
  );
};

export default CategoryPage;