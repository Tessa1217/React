import { Link } from 'react-router-dom';
const ServerErrorPage = () => {
  return (
    <div className='flex items-center justify-center min-h-screen bg-red-50 px-4'>
      <div className='text-center'>
        <h1 className='text-6xl font-bold text-red-600'>500</h1>
        <p className='mt-4 text-2xl font-semibold text-gray-800'>
          서버에 오류가 발생했습니다
        </p>
        <p className='mt-2 text-gray-600'>
          일시적인 문제일 수 있습니다. 잠시 후 다시 시도해 주세요.
        </p>
        <Link
          to={'/'}
          replace
          className='inline-block mt-6 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition'
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default ServerErrorPage;
