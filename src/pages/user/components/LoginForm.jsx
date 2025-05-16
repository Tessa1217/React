import { Link } from 'react-router-dom';
import Button from '../../../components/common/Button';

const LoginForm = ({ email, password, onChange, onSubmit }) => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 p-4'>
      <div className='max-w-md w-full bg-white rounded-lg shadow-md p-8'>
        <h2 className='text-2xl font-bold text-center mb-6 text-gray-800'>
          회원 로그인
        </h2>
        <form className='space-y-6' onSubmit={(e) => onSubmit(e)}>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              이메일 주소
            </label>
            <input
              id='email'
              type='email'
              value={email}
              onChange={(e) => onChange(e)}
              name='email'
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              placeholder='you@example.com'
            />
          </div>

          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              비밀번호
            </label>
            <input
              id='password'
              type='password'
              value={password}
              onChange={(e) => onChange(e)}
              name='password'
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              placeholder='••••••••'
            />
          </div>
          <Button
            type='submit'
            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition disabled:opacity-50'
            buttonText='Sign In'
          />
        </form>

        <p className='mt-6 text-center text-sm text-gray-600'>
          회원가입이 필요하신가요?{' '}
          <Link
            to='/register'
            className='text-blue-600 hover:text-blue-800 font-medium'
          >
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
