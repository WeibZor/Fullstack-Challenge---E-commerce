const QuantityControl = ({ quantity, onChange, onRemove }) => (
  <div className="flex items-center gap-2 rounded-3xl border border-slate-200 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-900">
    <button
      type="button"
      onClick={() => onChange(Math.max(1, quantity - 1))}
      className="w-10 rounded-full bg-white text-lg font-bold text-slate-700 shadow-sm transition hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-100"
    >
      -
    </button>
    <span className="w-10 text-center text-sm font-semibold">{quantity}</span>
    <button
      type="button"
      onClick={() => onChange(quantity + 1)}
      className="w-10 rounded-full bg-white text-lg font-bold text-slate-700 shadow-sm transition hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-100"
    >
      +
    </button>
    <button
      type="button"
      onClick={onRemove}
      className="ml-4 rounded-full bg-rose-500 px-3 py-2 text-xs font-semibold text-white hover:bg-rose-600"
    >
      Eliminar
    </button>
  </div>
);

export default QuantityControl;
