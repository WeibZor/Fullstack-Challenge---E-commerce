import { Link } from 'react-router-dom';
import { useWishlistStore } from '../../store/wishlistStore.js';
import Button from '../atoms/Button.jsx';
import Badge from '../atoms/Badge.jsx';

const ProductCard = ({ product, onAdd, showWishlistButton = true }) => {
  const { addItem, removeItem, isInWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };

  return (
    <article className="group overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-soft transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 p-6 sm:p-8">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
        />
        {showWishlistButton && (
          <button
            type="button"
            onClick={handleWishlistToggle}
            className="absolute right-3 top-3 rounded-full bg-white p-2 shadow-md transition hover:bg-red-50 hover:text-red-600 dark:bg-slate-800 dark:hover:bg-red-950"
            title={inWishlist ? 'Quitar de lista de deseos' : 'Agregar a lista de deseos'}
          >
            <svg className={`h-4 w-4 ${inWishlist ? 'fill-current text-red-500' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        )}
      </div>
      <div className="space-y-3 p-6">
        <div className="flex items-center justify-between gap-3">
          <Badge label={product.category} />
          <span className="text-lg font-semibold text-brand-600 dark:text-brand-400">${product.price.toFixed(2)}</span>
        </div>
        <h3 className="line-clamp-2 text-base font-semibold text-slate-900 dark:text-slate-100">{product.title}</h3>
        <p className="line-clamp-3 text-sm leading-6 text-slate-500 dark:text-slate-400">{product.description}</p>
        <div className="flex flex-wrap items-center gap-3 pt-3">
          <Link to={`/product/${product.id}`} className="text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-300">
            Ver detalle
          </Link>
          <Button variant="secondary" className="ml-auto" onClick={() => onAdd(product)}>
            Añadir
          </Button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
