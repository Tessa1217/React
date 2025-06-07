import { useMutation } from '@tanstack/react-query';
import { useModal } from '@/shared/hooks/useModal';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '@/shared/model/loading.slice';

export const useAppMutation = (mutationFn, options = { isLoading: true }) => {
  const { openModal } = useModal();
  const dispatch = useDispatch();

  const showSuccessAlert = useCallback(
    (message) => {
      return openModal({
        id: 'confirmModal',
        type: 'alert',
        title: '알림',
        description: message || '정상적으로 처리가 완료되었습니다.',
      });
    },
    [openModal]
  );

  return useMutation({
    mutationFn,
    ...options,
    onMutate: () => {
      if (options.isLoading) {
        dispatch(startLoading());
      }

      if (options.onMutate) options.onMutate();
    },
    onError: (error, ...args) => {
      if (options.isLoading) {
        dispatch(stopLoading());
      }

      if (options.onError) return options.onError(error, ...args);

      console.log(error);

      const { data: errorData } = error?.response || {};
      openModal({
        id: 'alertModal',
        type: 'alert',
        title: '요청 실패',
        description: errorData?.message || '오류가 발생했습니다.',
      });
    },
    onSettled: (...args) => {
      if (options.isLoading) {
        dispatch(stopLoading());
      }

      if (options.onSettled) options.onSettled(...args);
    },
    onSuccess: async (data, ...args) => {
      if (options.showMessage == true) {
        await showSuccessAlert();
      }

      if (options.onSuccess) options.onSuccess(data, ...args);
    },
  });
};
