import { Outlet } from 'react-router-dom';
import { useResetPagingOnPathChange } from '@/shared/hooks/usePaging';
const ResponsePage = () => {
  const key = 'responses';
  useResetPagingOnPathChange(key);
  return (
    <div className='min-h-screen p-6 space-y-6'>
      <h1 className='text-2xl font-bold'>📋 참여 설문</h1>
      <Outlet context={{ key }} />
    </div>
  );
};
export default ResponsePage;
