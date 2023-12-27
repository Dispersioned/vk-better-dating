import { useAuthStore } from 'app/store/auth.store';
import { Navigate, Outlet } from 'react-router-dom';

export function PublicRoute() {
  const { authData } = useAuthStore();
  const user = authData;

  if (user) return <Navigate to="/" />;

  return <Outlet />;
}
