const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const styles = {
    primary: 'bg-brand-500 text-white hover:bg-brand-600',
    secondary: 'bg-slate-200 text-slate-900 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-100',
    outline: 'border border-slate-300 text-slate-900 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100',
  };

  return (
    <button
      className={`btn-base ${styles[variant] || styles.primary} ${className}`}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
