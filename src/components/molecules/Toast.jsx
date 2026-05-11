const Toast = ({ toast }) => {
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 rounded-3xl border border-slate-200 bg-white p-4 shadow-xl dark:border-slate-700 dark:bg-slate-900">
      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{toast.type === 'error' ? 'Error' : '¡Éxito!'}</p>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{toast.message}</p>
    </div>
  );
};

export default Toast;
