import { Navigate, Outlet } from 'react-router-dom';

export function PrivateRoute() {
  const isLoggedIn = Boolean(localStorage.getItem('access_token'));
  console.log('isLoggedIn', isLoggedIn);
  if (!isLoggedIn) {
    return <Navigate to={'/login'} replace />;
  }
  return <Outlet />;
}
