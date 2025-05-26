import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { jwtStr } from '@/features/auth/model/auth.selector';
const AuthGuard = () => {
  const accessToken = useSelector(jwtStr);
  return accessToken ? <Outlet /> : <Navigate to='/login' replace />;
};
export default AuthGuard;
