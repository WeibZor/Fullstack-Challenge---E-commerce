import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import App from './App.jsx';
import './index.css';

// Error Boundary para capturar errores
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error capturado:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen items-center justify-center bg-slate-100 p-4">
          <div className="space-y-4 rounded-lg bg-white p-8 text-center shadow-lg">
            <h1 className="text-2xl font-bold text-red-600">Oops, algo salió mal</h1>
            <p className="text-slate-600">{this.state.error?.message || 'Intenta recargar la página'}</p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-lg bg-brand-500 px-6 py-2 text-white hover:bg-brand-600"
            >
              Recargar página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Fallback mientras carga
const LoadingFallback = () => (
  <div className="flex h-screen items-center justify-center bg-slate-100">
    <div className="space-y-4 text-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-300 border-t-brand-500 mx-auto"></div>
      <p className="text-slate-600">Cargando aplicación...</p>
    </div>
  </div>
);

// Verificar que el elemento root existe
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Elemento #root no encontrado en index.html');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <App />
          <Toaster position="top-right" richColors />
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  </React.StrictMode>
);
