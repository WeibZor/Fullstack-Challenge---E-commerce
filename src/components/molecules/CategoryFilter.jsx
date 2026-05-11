const CategoryFilter = ({ categories, activeCategory, onSelect }) => (
  <div className="space-x-2 overflow-x-auto pb-2">
    {categories.map((category) => (
      <button
        key={category}
        type="button"
        onClick={() => onSelect(category)}
        className={`inline-flex whitespace-nowrap rounded-full border px-4 py-2 text-sm transition ${
          activeCategory === category
            ? 'border-brand-500 bg-brand-500 text-white'
            : 'border-slate-200 bg-white text-slate-700 hover:border-brand-500 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
        }`}
      >
        {category}
      </button>
    ))}
  </div>
);

export default CategoryFilter;
