import { Link } from 'react-router-dom';
import MenuContext from '../../contexts/MenuContext';
import { useContext, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { FaArrowCircleRight } from 'react-icons/fa';
import { logoutUser } from '../../stores/auth';
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menus = useContext(MenuContext);
  const { loginYn } = useSelector(({ auth }) => ({
    loginYn: auth.loginUser.loginYn,
  }));

  const handleLogout = useCallback(() => {
    dispatch(logoutUser());
    navigate('/');
  }, [dispatch, navigate]);

  return (
    <header className='bg-blue-600 text-white'>
      <div className='container mx-auto flex justify-between items-center p-4'>
        <div className='text-xl font-bold'>MyLogo</div>
        <nav>
          <ul className='flex space-x-6 text-sm font-medium'>
            {menus
              .filter((menu) => menu.loginYn === loginYn)
              .map((menu) => (
                <li key={menu.menuId}>
                  <Link to={menu.path} className='hover:underline'>
                    {menu.menuNm}
                  </Link>
                </li>
              ))}
            {loginYn && (
              <li>
                <Button
                  className='text-white hover:underline cursor-pointer bg-transparent border-none p-0'
                  icons={FaArrowCircleRight}
                  buttonText='로그아웃'
                  onClick={handleLogout}
                ></Button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
