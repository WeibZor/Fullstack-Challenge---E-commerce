import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="border-t border-slate-200 bg-slate-900 text-slate-300 dark:border-slate-700 dark:bg-slate-950">
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2">
        {/* Logo y descripción */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Store Moderno</h3>
          <p className="text-sm leading-6">
            Tu tienda online moderna con la mejor experiencia de compra.
            Productos de calidad con envío rápido y seguro.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-slate-400 hover:text-white transition" aria-label="Facebook">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition" aria-label="Twitter">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition" aria-label="Instagram">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C8.396 0 7.996.014 6.79.067 5.59.12 4.694.287 3.94.52c-.806.254-1.488.593-2.17 1.275C.654 2.477.315 3.158.06 3.965c-.233.754-.4 1.65-.453 2.85C-.014 7.996 0 8.396 0 12.017s-.014 4.02.067 5.226c.053 1.2.22 2.096.453 2.85.254.806.593 1.488 1.275 2.17.682.682 1.363 1.02 2.17 1.275.754.233 1.65.4 2.85.453C7.996 23.986 8.396 24 12.017 24s4.02-.014 5.226-.067c1.2-.053 2.096-.22 2.85-.453.806-.254 1.488-.593 2.17-1.275.682-.682 1.02-1.363 1.275-2.17.233-.754.4-1.65.453-2.85.067-1.206.067-1.606.067-5.226s.014-4.02-.067-5.226c-.053-1.2-.22-2.096-.453-2.85-.254-.806-.593-1.488-1.275-2.17C21.523.654 20.842.315 20.035.06c-.754-.233-1.65-.4-2.85-.453C16.037.014 15.637 0 12.017 0zm4.655 16.48c-.22.22-.48.33-.79.33-.575 0-1.035-.46-1.035-1.035 0-.315.11-.575.33-.79.22-.22.48-.33.79-.33.575 0 1.035.46 1.035 1.035 0 .315-.11.575-.33.79zM12.017 6.124c-3.107 0-5.624 2.517-5.624 5.624s2.517 5.624 5.624 5.624 5.624-2.517 5.624-5.624-2.517-5.624-5.624-5.624zm0 9.246c-2.068 0-3.746-1.678-3.746-3.746s1.678-3.746 3.746-3.746 3.746 1.678 3.746 3.746-1.678 3.746-3.746 3.746z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Categorías */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Categorías</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/category/electronics" className="hover:text-white transition">Electrónicos</Link></li>
            <li><Link to="/category/mens-clothing" className="hover:text-white transition">Ropa de Hombre</Link></li>
            <li><Link to="/category/womens-clothing" className="hover:text-white transition">Ropa de Mujer</Link></li>
            <li><Link to="/category/jewelery" className="hover:text-white transition">Joyería</Link></li>
            <li><Link to="/category/home-garden" className="hover:text-white transition">Hogar y Jardín</Link></li>
            <li><Link to="/category/sports-outdoors" className="hover:text-white transition">Deportes</Link></li>
            <li><Link to="/category/books" className="hover:text-white transition">Libros</Link></li>
          </ul>
        </div>

        {/* Navegación */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Navegación</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white transition">Inicio</Link></li>
            <li><Link to="/cart" className="hover:text-white transition">Carrito</Link></li>
            <li><Link to="/profile" className="hover:text-white transition">Mi cuenta</Link></li>
            <li><Link to="/wishlist" className="hover:text-white transition">Lista de deseos</Link></li>
          </ul>
        </div>

        {/* Contacto y newsletter */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Contacto</h4>
          <div className="space-y-2 text-sm">
            <p>¿Necesitas ayuda?</p>
            <p>support@storemoderno.com</p>
            <p>+1 (555) 123-4567</p>
          </div>

          {/* Newsletter */}
          <div className="space-y-2">
            <h5 className="text-sm font-semibold text-white">Newsletter</h5>
            <div className="flex">
              <input
                type="email"
                placeholder="Tu email"
                className="flex-1 rounded-l-lg border-0 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <button className="rounded-r-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 transition">
                Suscribir
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="mt-8 border-t border-slate-700 pt-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm">© 2026 Store Moderno. Todos los derechos reservados.</p>
          <div className="flex items-center space-x-6 text-sm">
            <Link to="/" className="hover:text-white transition">Política de privacidad</Link>
            <Link to="/" className="hover:text-white transition">Términos de servicio</Link>
            <div className="flex items-center space-x-2">
              <span>Métodos de pago:</span>
              <div className="flex space-x-1">
                <div className="h-6 w-8 rounded bg-slate-700"></div>
                <div className="h-6 w-8 rounded bg-slate-700"></div>
                <div className="h-6 w-8 rounded bg-slate-700"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
