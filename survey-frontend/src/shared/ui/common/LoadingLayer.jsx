import { memo } from 'react';
import { useSelector } from 'react-redux';
import { loadingState } from '@/shared/model/loading.selector';
const LoadingLayer = memo(() => {
  const loading = useSelector(loadingState);
  if (!loading) {
    return null;
  }
  return (
    <div className='fixed inset-0 z-50 bg-gray-300 bg-opacity-40 flex items-center justify-center'>
      <div className='spinner'></div>
    </div>
  );
});
export default LoadingLayer;
