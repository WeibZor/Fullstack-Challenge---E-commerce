import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore.js';
import { formatCurrency } from '../utils/format.js';
import Button from '../components/atoms/Button.jsx';
import QuantityControl from '../components/molecules/QuantityControl.jsx';

const CartPage = () => {
  const { items, updateQuantity, removeItem, subtotal, tax, total, clearCart } = useCartStore();

  if (!items.length) {
    return (
      <div className="rounded-[32px] border border-slate-200 bg-white p-10 text-center shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Tu carrito está vacío</h2>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Explora productos y agrégalos para empezar tu compra.</p>
        <Link to="/" className="mt-6 inline-flex rounded-3xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-600">
          Ir a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.5fr_0.7fr]">
      <div className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">Carrito de compras</h1>
        {items.map((item) => (
          <div key={item.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.title} className="h-24 w-24 rounded-3xl object-contain" />
                <div>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">{item.title}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">${item.price.toFixed(2)}</p>
                </div>
              </div>
              <QuantityControl
                quantity={item.quantity}
                onChange={(value) => updateQuantity(item.id, value)}
                onRemove={() => removeItem(item.id)}
              />
            </div>
          </div>
        ))}
      </div>
      <aside className="space-y-6 rounded-[32px] border border-slate-200 bg-slate-50 p-6 shadow-soft dark:border-slate-800 dark:bg-slate-950">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Resumen</p>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Total</h2>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
            <span>Impuestos (19%)</span>
            <span>{formatCurrency(tax)}</span>
          </div>
          <div className="flex items-center justify-between border-t border-slate-300 pt-3 text-lg font-semibold text-slate-900 dark:border-slate-600 dark:text-slate-100">
            <span>Total final</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
        <div className="space-y-3">
          <Link to="/checkout">
            <Button className="w-full">Continuar al checkout</Button>
          </Link>
          <Button variant="secondary" className="w-full" onClick={clearCart}>
            Vaciar carrito
          </Button>
        </div>
      </aside>
    </div>
  );
};

export default CartPage;
