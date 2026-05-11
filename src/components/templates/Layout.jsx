import { Outlet } from 'react-router-dom';
import Header from '../organisms/Header.jsx';
import Footer from '../organisms/Footer.jsx';

const Layout = () => (
  <div className="min-h-screen">
    <Header />
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;
