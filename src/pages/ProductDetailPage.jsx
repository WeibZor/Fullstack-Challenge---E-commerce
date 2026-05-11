import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductByIdApi } from '../services/api.js';
import { useCartStore } from '../store/cartStore.js';
import { useWishlistStore } from '../store/wishlistStore.js';
import Button from '../components/atoms/Button.jsx';
import Badge from '../components/atoms/Badge.jsx';
import { formatCurrency } from '../utils/format.js';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const addItem = useCartStore((state) => state.addItem);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();

  const inWishlist = product ? isInWishlist(product.id) : false;

  const handleWishlistToggle = () => {
    if (!product) return;
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const response = await fetchProductByIdApi(id);
        setProduct(response);
      } catch (err) {
        setError('No se pudo cargar el producto, inténtalo de nuevo.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return <p className="text-center text-slate-600 dark:text-slate-300">Cargando producto...</p>;
  }

  if (error || !product) {
    return (
      <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-center text-sm text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/20 dark:text-rose-200">
        <p>{error || 'Producto no encontrado.'}</p>
        <Link to="/" className="mt-4 inline-block text-brand-600 hover:text-brand-700">Volver a la tienda</Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <img src={product.image} alt={product.title} className="mx-auto max-h-[520px] object-contain" />
        <div className="mt-8 space-y-4">
          <Badge label={product.category} />
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">{product.title}</h1>
          <p className="text-xl font-bold text-brand-600 dark:text-brand-300">{formatCurrency(product.price)}</p>
          <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{product.description}</p>
        </div>
      </div>
      <aside className="space-y-6 rounded-[32px] border border-slate-200 bg-slate-50 p-6 shadow-soft dark:border-slate-800 dark:bg-slate-950">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Detalle</p>
          <div className="grid gap-3 text-sm text-slate-600 dark:text-slate-300">
            <div className="flex justify-between rounded-3xl bg-white p-4 shadow-sm dark:bg-slate-900">
              <span>Categoría</span>
              <strong>{product.category}</strong>
            </div>
            <div className="flex justify-between rounded-3xl bg-white p-4 shadow-sm dark:bg-slate-900">
              <span>Valoración</span>
              <strong>{product.rating?.rate || 'N/A'} ⭐</strong>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleWishlistToggle}
          >
            <svg className={`mr-2 h-4 w-4 ${inWishlist ? 'fill-current text-red-500' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {inWishlist ? 'En lista de deseos' : 'Agregar a lista de deseos'}
          </Button>
          <Button variant="primary" className="flex-1" onClick={() => addItem(product)}>
            Agregar al carrito
          </Button>
        </div>
        <Link to="/cart" className="block text-center text-sm font-semibold text-brand-600 hover:text-brand-700">
          Ver carrito
        </Link>
      </aside>
    </div>
  );
};

export default ProductDetailPage;
