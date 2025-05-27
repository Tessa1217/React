import React from 'react';
const LoginForm = ({
  userId,
  password,
  onFormChange,
  onSubmit,
  isLoggingIn,
}) => {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100 px-4'>
      <div className='w-full max-w-md bg-white p-8 rounded-2xl shadow-xl space-y-6'>
        <h2 className='text-2xl font-bold text-gray-800 text-center'>로그인</h2>

        <form onSubmit={onSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              아이디
            </label>
            <input
              type='userId'
              name='userId'
              className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
              value={userId}
              onChange={(e) => onFormChange(e)}
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              비밀번호
            </label>
            <input
              type='password'
              name='password'
              className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
              value={password}
              onChange={(e) => onFormChange(e)}
              required
            />
          </div>

          <button
            type='submit'
            disabled={isLoggingIn}
            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200'
          >
            {isLoggingIn ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <p className='text-center text-sm text-gray-500'>
          계정이 없으신가요?{' '}
          <a href='/signup' className='text-blue-600 hover:underline'>
            회원가입
          </a>
        </p>
      </div>
    </div>
  );
};
export default React.memo(LoginForm);
