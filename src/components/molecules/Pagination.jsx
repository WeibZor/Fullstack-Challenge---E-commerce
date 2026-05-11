const Pagination = ({ page, totalPages, onPageChange }) => {
  const range = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className="flex flex-wrap items-center justify-center gap-2 rounded-[32px] bg-white p-4 shadow-soft dark:bg-slate-900">
      {range.map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            pageNumber === page ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
          }`}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
    </nav>
  );
};

export default Pagination;
