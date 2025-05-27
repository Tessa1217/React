import { useContext } from 'react';
import { GlobalLoadingContext } from '../contexts/GlobalLoadingContext';

const useGlobalLoading = () => {
  const context = useContext(GlobalLoadingContext);
  if (!context) {
    throw new Error(
      'useGlobalLoading은 GlobalLoadingContextProvider 내에 있어야 합니다.'
    );
  }
  return context;
};

export default useGlobalLoading;
