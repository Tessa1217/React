import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 px-4'>
      <div className='text-center'>
        <h1 className='text-6xl font-bold text-blue-600'>404</h1>
        <p className='mt-4 text-2xl font-semibold text-gray-800'>
          페이지를 찾을 수 없습니다
        </p>
        <p className='mt-2 text-gray-600'>
          요청하신 페이지가 존재하지 않거나, 이동되었을 수 있습니다.
        </p>
        <Link
          to={'/'}
          replace
          className='inline-block mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition'
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
