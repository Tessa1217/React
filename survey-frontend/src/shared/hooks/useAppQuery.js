import { useQuery } from '@tanstack/react-query';
import { useModal } from '@/shared/hooks/useModal';
import useGlobalLoading from './useGlobalLoading';

export const useAppQuery = (key, queryFn, options = { isLoading: true }) => {
  const { openModal } = useModal();
  const { startLoading, stopLoading } = useGlobalLoading();

  const useQueryResult = useQuery({
    queryKey: key,
    queryFn,
    ...options,
    onSuccess: () => {
      if (options.onSuccess) options.onSuccess;
    },
    onSettled: () => {
      stopLoading();
      if (options.onSetteld) options.onSettled;
    },
    onError: (error) => {
      if (options.onError) options.onError(error);
      else {
        openModal({
          type: 'alert',
          title: '오류가 발생했습니다.',
          description: error.message || '알 수 없는 오류가 발생했습니다.',
        });
      }
    },
  });

  if (useQueryResult.isLoading && options.isLoading) {
    startLoading();
  }

  return useQueryResult;
};
