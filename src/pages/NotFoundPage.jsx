import { Link } from 'react-router-dom';
import Button from '../components/atoms/Button.jsx';

const NotFoundPage = () => (
  <div className="mx-auto max-w-2xl rounded-[32px] border border-slate-200 bg-white p-10 text-center shadow-soft dark:border-slate-800 dark:bg-slate-900">
    <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">404</h1>
    <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">Página no encontrada.</p>
    <Link to="/" className="mt-6 inline-flex rounded-3xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-600">
      Volver a la tienda
    </Link>
  </div>
);

export default NotFoundPage;
