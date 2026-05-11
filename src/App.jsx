import React, { Suspense, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/templates/Layout.jsx';
import LoaderSkeleton from './components/atoms/Skeleton.jsx';
import { useAuthStore } from './store/authStore.js';

const HomePage = React.lazy(() => import('./pages/HomePage.jsx'));
const ProductDetailPage = React.lazy(() => import('./pages/ProductDetailPage.jsx'));
const CartPage = React.lazy(() => import('./pages/CartPage.jsx'));
const CheckoutPage = React.lazy(() => import('./pages/CheckoutPage.jsx'));
const LoginPage = React.lazy(() => import('./pages/LoginPage.jsx'));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage.jsx'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage.jsx'));

function App() {
  const { theme, initializeTheme, user } = useAuthStore();

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
        <Suspense fallback={<LoaderSkeleton />}> 
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="product/:id" element={<ProductDetailPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route
                path="checkout"
                element={user ? <CheckoutPage /> : <Navigate to="/login" replace />}
              />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
