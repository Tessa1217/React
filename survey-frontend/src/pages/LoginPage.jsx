import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginFormContainer from '@/features/auth/ui/LoginFormContainer';
import { currentlyLoggedIn } from '@/features/auth/model/auth.selector';
const LoginPage = () => {
  const isLoggedIn = useSelector(currentlyLoggedIn);
  return isLoggedIn ? <Navigate to='/' replace /> : <LoginFormContainer />;
};
export default LoginPage;
