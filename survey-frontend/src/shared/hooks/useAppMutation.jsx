import { useMutation } from '@tanstack/react-query';
import { useModal } from '@/shared/hooks/useModal';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '@/shared/model/loading.slice';

export const useAppMutation = (mutationFn, options = { isLoading: true }) => {
  const { openModal } = useModal();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn,
    ...options,
    onMutate: () => {
      if (options.isLoading) {
        dispatch(startLoading());
      }

      if (options.onMutate) options.onMutate;
    },
    onError: (error, ...args) => {
      if (options.isLoading) {
        dispatch(stopLoading());
      }

      if (options.onError) return options.onError(error, ...args);
      openModal({
        id: 'alertModal',
        type: 'alert',
        title: '요청 실패',
        description: error?.message || '오류가 발생했습니다.',
      });
      console.log('hii');
    },
    onSettled: (...args) => {
      if (options.isLoading) {
        dispatch(stopLoading());
      }

      if (options.onSettled) options.onSettled(...args);
    },
  });
};
