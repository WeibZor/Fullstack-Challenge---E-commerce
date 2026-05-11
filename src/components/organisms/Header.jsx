import { Link, NavLink } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore.js';
import { useCartStore } from '../../store/cartStore.js';

const Header = () => {
  const { user, logout, theme, setTheme } = useAuthStore();
  const { items } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  };

  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-xl font-bold text-brand-700 dark:text-brand-300">
          Store Moderno
        </Link>
        <nav className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
          <NavLink className="text-sm font-medium text-slate-600 hover:text-brand-600 dark:text-slate-200" to="/">
            Tienda
          </NavLink>
          <NavLink className="text-sm font-medium text-slate-600 hover:text-brand-600 dark:text-slate-200" to="/cart">
            Carrito ({totalItems})
          </NavLink>
          {user ? (
            <button
              type="button"
              onClick={logout}
              className="text-sm font-medium text-slate-600 hover:text-brand-600 dark:text-slate-200"
            >
              Salir
            </button>
          ) : (
            <NavLink className="text-sm font-medium text-slate-600 hover:text-brand-600 dark:text-slate-200" to="/login">
              Login
            </NavLink>
          )}
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-700 transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            {theme === 'dark' ? 'Claro' : 'Oscuro'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
