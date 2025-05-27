import useGlobalLoading from '@/shared/hooks/useGlobalLoading';
const LoadingLayer = () => {
  const { loading } = useGlobalLoading();
  if (!loading) {
    return null;
  }
  return (
    <div className='fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center'>
      <div className='spinner'></div>
    </div>
  );
};
export default LoadingLayer;
