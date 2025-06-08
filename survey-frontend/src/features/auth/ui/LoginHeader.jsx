import { useCallback, memo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from '@/features/auth/model/auth.slice';
import { useDispatch, useSelector } from 'react-redux';
import {
  currentUserName,
  currentlyLoggedIn,
} from '@/features/auth/model/auth.selector';
import { HiOutlineLogout, HiOutlineLogin, HiUser } from 'react-icons/hi';
const LoginHeader = memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useSelector(currentUserName);
  const isLoggedIn = useSelector(currentlyLoggedIn);

  const handleLogin = useCallback(() => navigate('/login'), []);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate('/login');
  }, [dispatch, navigate]);

  return (
    <nav className='flex items-center space-x-6 text-sm sm:text-base'>
      {isLoggedIn && (
        <Link
          to='/forms'
          className='text-gray-600 hover:text-blue-600 transition-colors font-medium'
        >
          내 설문
        </Link>
      )}
      <Link
        to='/responses'
        className='text-gray-600 hover:text-blue-600 transition-colors font-medium'
      >
        참여 설문
      </Link>
      <ul className='flex space-x-6 text-sm font-medium'>
        <ul className='flex space-x-6 text-sm font-medium items-center'>
          {isLoggedIn ? (
            <>
              {name && (
                <li className='text-black font-medium flex gap-2 align-center justify-center justify-items-center text-[16px]'>
                  <HiUser size={16} />
                  {name} 님
                </li>
              )}
              <li>
                <button
                  className='bg-white flex justify-center items-center text-blue-600 px-3 py-1 rounded hover:bg-gray-100 transition cursor-pointer'
                  onClick={handleLogout}
                >
                  <HiOutlineLogout size={20} />
                  <span>Logout</span>
                </button>
              </li>
            </>
          ) : (
            <li>
              <button
                className='bg-white flex justify-center items-center text-blue-600 px-3 py-1 rounded hover:bg-gray-100 transition cursor-pointer'
                onClick={handleLogin}
              >
                <HiOutlineLogin size={20} /> <span>Login</span>
              </button>
            </li>
          )}
        </ul>
      </ul>
    </nav>
  );
});
export default LoginHeader;
