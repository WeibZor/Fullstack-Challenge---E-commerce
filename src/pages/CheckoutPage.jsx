import { useState } from 'react';
import { toast } from 'sonner';
import { useCartStore } from '../store/cartStore.js';
import Button from '../components/atoms/Button.jsx';
import { formatCurrency } from '../utils/format.js';
import { useAuthStore } from '../store/authStore.js';

const CheckoutPage = () => {
  const { items, subtotal, tax, total, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderSummary, setOrderSummary] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setOrderSummary({
      items: [...items],
      subtotal,
      tax,
      total,
    });
    setOrderComplete(true);
    clearCart();
    toast.success('¡Gracias por tu compra! Tu orden ha sido confirmada.');
  };

  if (!items.length && !orderComplete) {
    return (
      <div className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">No hay artículos para pagar</h2>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Agrega productos al carrito y regresa para completar tu compra.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.5fr_0.7fr]">
      <section className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">Checkout</h1>
        {orderComplete ? (
          <div className="space-y-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-6 text-slate-700 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200">
            <h2 className="text-xl font-semibold">¡Compra completada!</h2>
            <p className="mt-2 text-sm">Gracias por tu pedido, {user?.name || 'cliente'}. Tu pago ha sido procesado correctamente.</p>
            {orderSummary && (
              <div className="space-y-4 rounded-3xl bg-white p-4 text-slate-800 dark:bg-slate-900 dark:text-slate-100">
                <h3 className="text-lg font-semibold">Resumen de tu orden</h3>
                <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  {orderSummary.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-4">
                      <span>{item.quantity}x {item.title}</span>
                      <strong>{formatCurrency(item.price * item.quantity)}</strong>
                    </div>
                  ))}
                </div>
                <div className="mt-4 space-y-2 border-t border-slate-200 pt-4 dark:border-slate-800">
                  <div className="flex items-center justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatCurrency(orderSummary.subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Impuestos</span>
                    <span>{formatCurrency(orderSummary.tax)}</span>
                  </div>
                  <div className="flex items-center justify-between text-base font-semibold">
                    <span>Total</span>
                    <span>{formatCurrency(orderSummary.total)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Información del pedido</h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">Se enviará un resumen a tu correo.</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Nombre</label>
                  <input value={user?.name || ''} disabled className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" />
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Correo</label>
                  <input value={user?.email || ''} disabled className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" />
                </div>
              </div>
            </div>
            <div className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Resumen de productos</h2>
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-4 text-sm text-slate-600 dark:text-slate-300">
                  <span>{item.quantity}x {item.title}</span>
                  <strong>{formatCurrency(item.price * item.quantity)}</strong>
                </div>
              ))}
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                <span>Impuestos (19%)</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-slate-300 pt-3 text-xl font-semibold text-slate-900 dark:border-slate-600 dark:text-slate-100">
                <span>Total final</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
            <Button type="submit" className="w-full">Confirmar compra</Button>
          </form>
        )}
      </section>
      <aside className="space-y-6 rounded-[32px] border border-slate-200 bg-slate-50 p-6 shadow-soft dark:border-slate-800 dark:bg-slate-950">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Pago seguro</p>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Lista de compras</h2>
        </div>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="rounded-3xl bg-white p-4 shadow-sm dark:bg-slate-900">
              <div className="flex items-center justify-between gap-3 text-sm text-slate-600 dark:text-slate-300">
                <span>{item.title}</span>
                <strong>{formatCurrency(item.price * item.quantity)}</strong>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default CheckoutPage;
