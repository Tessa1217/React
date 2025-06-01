import LoginHeader from '@/features/auth/ui/LoginHeader';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <header className='bg-blue-600 text-white'>
      <div className='container mx-auto flex justify-between items-center p-4'>
        <div className='text-xl font-bold'>
          <Link to='/'>Home</Link>
        </div>
        <nav>
          <LoginHeader />
        </nav>
      </div>
    </header>
  );
};

export default Header;
