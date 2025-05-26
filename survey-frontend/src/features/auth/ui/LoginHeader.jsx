import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/features/auth/model/auth.slice';
import { useDispatch, useSelector } from 'react-redux';
import {
  currentUserName,
  currentlyLoggedIn,
} from '@/features/auth/model/auth.selector';
import { HiOutlineLogout, HiOutlineLogin } from 'react-icons/hi';
const LoginHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useSelector(currentUserName);
  const isLoggedIn = useSelector(currentlyLoggedIn);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <ul className='flex space-x-6 text-sm font-medium'>
      <ul className='flex space-x-6 text-sm font-medium items-center'>
        {isLoggedIn ? (
          <>
            {name && <li className='text-white'>{name} 님</li>}
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
              onClick={() => navigate('/login')}
            >
              <HiOutlineLogin size={20} /> <span>Login</span>
            </button>
          </li>
        )}
      </ul>
    </ul>
  );
};
export default React.memo(LoginHeader);
