import React, { Suspense, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/templates/Layout.jsx';
import LoaderSkeleton from './components/atoms/Skeleton.jsx';
import { useAuthStore } from './store/authStore.js';

const HomePage = React.lazy(() => import('./pages/HomePage.jsx'));
const ProductDetailPage = React.lazy(() => import('./pages/ProductDetailPage.jsx'));
const CartPage = React.lazy(() => import('./pages/CartPage.jsx'));
const CheckoutPage = React.lazy(() => import('./pages/CheckoutPage.jsx'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage.jsx'));
const WishlistPage = React.lazy(() => import('./pages/WishlistPage.jsx'));
const CategoryPage = React.lazy(() => import('./pages/CategoryPage.jsx'));
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
            {/* Root route - redirect based on auth */}
            <Route path="/" element={user ? <Layout /> : <Navigate to="/login" replace />}>
              <Route index element={<HomePage />} />
              <Route path="product/:id" element={<ProductDetailPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="wishlist" element={<WishlistPage />} />
              <Route path="category/electronics" element={<CategoryPage />} />
              <Route path="category/mens-clothing" element={<CategoryPage />} />
              <Route path="category/womens-clothing" element={<CategoryPage />} />
              <Route path="category/jewelery" element={<CategoryPage />} />
              <Route path="category/home-garden" element={<CategoryPage />} />
              <Route path="category/sports-outdoors" element={<CategoryPage />} />
              <Route path="category/books" element={<CategoryPage />} />
            </Route>

            {/* Auth routes - only accessible without auth */}
            <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage />} />
            <Route path="/register" element={user ? <Navigate to="/" replace /> : <RegisterPage />} />

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
