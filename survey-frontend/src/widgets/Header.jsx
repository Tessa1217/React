import LoginHeader from '@/features/auth/ui/LoginHeader';
import { Link } from 'react-router-dom';
import { HiClipboardList } from 'react-icons/hi';

const Header = () => {
  return (
    <header className='bg-white shadow-sm border-b border-gray-200'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center'>
        {/* Logo */}
        <div className='flex items-center space-x-2'>
          <HiClipboardList className='text-blue-600 w-7 h-7' />
          <Link
            to='/'
            className='text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors'
          >
            SurveyHub
          </Link>
        </div>
        <LoginHeader />
      </div>
    </header>
  );
};

export default Header;
