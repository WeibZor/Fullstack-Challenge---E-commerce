import { useMemo, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore.js';
import { useCartStore } from '../../store/cartStore.js';
import { useWishlistStore } from '../../store/wishlistStore.js';
import { MenuIcon, XIcon, ShoppingCartIcon } from '../ui/Icons.jsx';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout, theme, setTheme } = useAuthStore();
  const { items } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const [openMenu, setOpenMenu] = useState(false);

  const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const totalWishlist = wishlistItems.length;

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-xl font-bold text-brand-700 dark:text-brand-300">
          Store Moderno
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-medium transition ${
                isActive ? 'text-brand-600' : 'text-slate-600 hover:text-brand-600 dark:text-slate-200'
              }`
            }
          >
            Tienda
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `text-sm font-medium transition ${
                isActive ? 'text-brand-600' : 'text-slate-600 hover:text-brand-600 dark:text-slate-200'
              }`
            }
          >
            Perfil
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `text-sm font-medium transition ${
                isActive ? 'text-brand-600' : 'text-slate-600 hover:text-brand-600 dark:text-slate-200'
              }`
            }
          >
            Carrito ({totalItems})
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full border border-slate-200 bg-slate-100 p-2 text-slate-700 transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {theme === 'dark' ? '☀' : '🌙'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/wishlist')}
            className="relative rounded-full border border-slate-200 bg-white p-2 text-slate-700 transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            title="Lista de deseos"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {totalWishlist > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
                {totalWishlist}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => navigate('/cart')}
            className="relative rounded-full border border-slate-200 bg-white p-2 text-slate-700 transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            title="Ver carrito"
          >
            <ShoppingCartIcon className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-brand-600 px-1.5 text-[10px] font-bold text-white">
                {totalItems}
              </span>
            )}
          </button>

          {user ? (
            <button
              type="button"
              onClick={handleLogout}
              className="hidden rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 md:inline-flex"
            >
              Salir
            </button>
          ) : (
            <Link
              to="/login"
              className="hidden rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 md:inline-flex"
            >
              Login
            </Link>
          )}

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-slate-700 transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 md:hidden"
            onClick={() => setOpenMenu((state) => !state)}
            aria-label="Menú móvil"
          >
            {openMenu ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {openMenu && (
        <div className="border-t border-slate-200 bg-white/95 p-4 dark:border-slate-800 dark:bg-slate-950/95 md:hidden">
          <nav className="flex flex-col gap-4">
            <Link
              to="/"
              className="text-sm font-medium text-slate-700 hover:text-brand-600 dark:text-slate-100"
              onClick={() => setOpenMenu(false)}
            >
              Tienda
            </Link>
            <Link
              to="/profile"
              className="text-sm font-medium text-slate-700 hover:text-brand-600 dark:text-slate-100"
              onClick={() => setOpenMenu(false)}
            >
              Perfil
            </Link>
            <Link
              to="/wishlist"
              className="text-sm font-medium text-slate-700 hover:text-brand-600 dark:text-slate-100"
              onClick={() => setOpenMenu(false)}
            >
              Lista de deseos ({totalWishlist})
            </Link>
            <Link
              to="/cart"
              className="text-sm font-medium text-slate-700 hover:text-brand-600 dark:text-slate-100"
              onClick={() => setOpenMenu(false)}
            >
              Carrito ({totalItems})
            </Link>
            {user ? (
              <button
                type="button"
                onClick={() => {
                  handleLogout();
                  setOpenMenu(false);
                }}
                className="text-left text-sm font-medium text-slate-700 hover:text-brand-600 dark:text-slate-100"
              >
                Salir
              </button>
            ) : (
              <Link
                to="/login"
                className="text-sm font-medium text-slate-700 hover:text-brand-600 dark:text-slate-100"
                onClick={() => setOpenMenu(false)}
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
