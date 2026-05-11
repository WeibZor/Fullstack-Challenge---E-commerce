import { useEffect } from 'react';
import ProductGrid from '../components/organisms/ProductGrid.jsx';
import { useProductStore } from '../store/productStore.js';
import Button from '../components/atoms/Button.jsx';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { loadProducts, loading, error } = useProductStore();

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <div className="space-y-10">
      <section className="grid gap-8 lg:grid-cols-[1.3fr_0.8fr] lg:items-end">
        <div className="space-y-6">
          <span className="inline-flex rounded-full bg-brand-100 px-4 py-2 text-sm font-semibold text-brand-700">
            Tienda moderna
          </span>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
            Descubre productos premium con experiencia SPA y diseño responsive.
          </h1>
          <p className="max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
            Navega, filtra y compra con un flujo optimizado. El carrito persiste localmente y la interfaz se adapta a móvil, tablet y desktop.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/cart">
              <Button>Ver carrito</Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary">Iniciar sesión</Button>
            </Link>
          </div>
        </div>
        <div className="rounded-[32px] bg-brand-500/5 p-8 shadow-soft dark:bg-brand-500/10">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Valor añadido</h2>
          <ul className="mt-6 space-y-4 text-slate-600 dark:text-slate-300">
            <li>• Filtros por categoría y búsqueda en tiempo real.</li>
            <li>• Persistencia de carrito y sesión en localStorage.</li>
            <li>• Diseño escalable basado en Atomic Design.</li>
          </ul>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-white p-4 shadow-sm dark:bg-slate-900">
              <p className="text-2xl font-semibold text-brand-600 dark:text-brand-300">9+</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Productos listos</p>
            </div>
            <div className="rounded-3xl bg-white p-4 shadow-sm dark:bg-slate-900">
              <p className="text-2xl font-semibold text-brand-600 dark:text-brand-300">100%</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Experiencia SPA</p>
            </div>
          </div>
        </div>
      </section>
      {error && (
        <div className="rounded-3xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/20 dark:text-rose-200">
          {error}
        </div>
      )}
      <ProductGrid loading={loading} />
    </div>
  );
};

export default HomePage;
