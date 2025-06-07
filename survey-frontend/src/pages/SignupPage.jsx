import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignUpFormContainer from '@/features/auth/container/SignUpFormContainer';
import { currentlyLoggedIn } from '@/features/auth/model/auth.selector';

const SignupPage = () => {
  const isLoggedIn = useSelector(currentlyLoggedIn);
  return isLoggedIn ? <Navigate to='/' replace /> : <SignUpFormContainer />;
};
export default SignupPage;
