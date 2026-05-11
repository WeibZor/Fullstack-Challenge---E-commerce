const Input = ({ label, error, className = '', ...props }) => {
  return (
    <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
      {label && <span className="mb-2 inline-block">{label}</span>}
      <input
        className={`w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-brand-400 dark:focus:ring-brand-900 ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </label>
  );
};

export default Input;
