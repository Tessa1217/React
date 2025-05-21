import AppRouter from '../app/AppRouter';
import Toast from '@/shared/ui/common/Toast';
const Main = () => {
  return (
    <main className='flex-grow container mx-auto p-6 bg-gray-50'>
      <AppRouter />
      <Toast />
    </main>
  );
};

export default Main;
