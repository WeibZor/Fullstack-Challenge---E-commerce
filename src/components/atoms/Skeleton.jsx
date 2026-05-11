const Skeleton = () => (
  <div className="space-y-4 p-6">
    <div className="h-6 w-40 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="animate-pulse rounded-3xl bg-slate-200 p-5 dark:bg-slate-800">
          <div className="h-48 rounded-3xl bg-slate-300 dark:bg-slate-700" />
          <div className="mt-4 h-4 w-3/4 rounded-full bg-slate-300 dark:bg-slate-700" />
          <div className="mt-2 h-4 w-1/2 rounded-full bg-slate-300 dark:bg-slate-700" />
        </div>
      ))}
    </div>
  </div>
);

export default Skeleton;
