import Button from '../atoms/Button.jsx';
import QuantityControl from '../molecules/QuantityControl.jsx';
import { useCartStore } from '../../store/cartStore.js';

const CartSummary = () => {
  const { items, updateQuantity, removeItem, subtotal, tax, total, clearCart } = useCartStore();

  return (
    <aside className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <div className="space-y-2">
        <p className="text-sm uppercase text-slate-500 dark:text-slate-400">Resumen del carrito</p>
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Total parcial</h2>
      </div>
      <div className="space-y-4">
        {items.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">No hay elementos en el carrito.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.title} className="h-20 w-20 rounded-3xl object-contain" />
                <div>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">{item.title}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">${item.price.toFixed(2)}</p>
                </div>
              </div>
              <QuantityControl
                quantity={item.quantity}
                onChange={(value) => updateQuantity(item.id, value)}
                onRemove={() => removeItem(item.id)}
              />
            </div>
          ))
        )}
      </div>
      <div className="space-y-2 border-t border-slate-200 pt-4 dark:border-slate-800">
        <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
          <span>Impuestos</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-base font-semibold text-slate-900 dark:text-slate-100">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Button variant="primary" className="w-full">Proceder a pagar</Button>
        <Button variant="secondary" className="w-full" onClick={clearCart}>Limpiar carrito</Button>
      </div>
    </aside>
  );
};

export default CartSummary;
