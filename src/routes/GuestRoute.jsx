import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore.js';

const GuestRoute = ({ redirectTo = '/' }) => {
  const { user } = useAuthStore();
  return user ? <Navigate to={redirectTo} replace /> : <Outlet />;
};

export default GuestRoute;
