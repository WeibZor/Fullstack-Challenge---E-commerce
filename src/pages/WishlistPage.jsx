import { Link } from 'react-router-dom';
import { useWishlistStore } from '../store/wishlistStore.js';
import { useCartStore } from '../store/cartStore.js';
import Button from '../components/atoms/Button.jsx';
import ProductCard from '../components/molecules/ProductCard.jsx';

const WishlistPage = () => {
  const { items, removeItem } = useWishlistStore();
  const { addItem } = useCartStore();

  const handleAddToCart = (product) => {
    addItem(product);
  };

  const handleRemoveFromWishlist = (id) => {
    removeItem(id);
  };

  if (items.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center px-4 py-16">
        <div className="text-center">
          <HeartIcon className="mx-auto h-16 w-16 text-slate-300 dark:text-slate-600" />
          <h2 className="mt-4 text-2xl font-bold text-slate-900 dark:text-slate-100">
            Tu lista de deseos está vacía
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Agrega productos que te gusten para verlos aquí
          </p>
          <Link to="/" className="mt-6 inline-block">
            <Button>Explorar productos</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Mi Lista de Deseos
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          {items.length} producto{items.length !== 1 ? 's' : ''} guardado{items.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((product) => (
          <div key={product.id} className="relative">
            <ProductCard
              product={product}
              onAddToCart={() => handleAddToCart(product)}
              showWishlistButton={false}
            />
            <button
              type="button"
              onClick={() => handleRemoveFromWishlist(product.id)}
              className="absolute right-3 top-3 rounded-full bg-white p-2 shadow-md transition hover:bg-red-50 hover:text-red-600 dark:bg-slate-800 dark:hover:bg-red-950"
              title="Quitar de lista de deseos"
            >
              <HeartIcon className="h-4 w-4 fill-current text-red-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;