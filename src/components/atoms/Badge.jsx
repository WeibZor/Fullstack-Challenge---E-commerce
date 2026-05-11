const Badge = ({ label, className = '' }) => (
  <span className={`rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700 ${className}`}>
    {label}
  </span>
);

export default Badge;
