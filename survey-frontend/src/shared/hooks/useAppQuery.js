import { useQuery } from '@tanstack/react-query';
import { useModal } from '@/shared/hooks/useModal';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '@/shared/model/loading.slice';

export const useAppQuery = (key, queryFn, options = { isLoading: true }) => {
  const { openModal } = useModal();
  const dispatch = useDispatch();

  const useQueryResult = useQuery({
    queryKey: key,
    queryFn,
    ...options,
  });

  useEffect(() => {
    if (useQueryResult.isLoading && options.isLoading && options.enabled) {
      dispatch(startLoading());
    }
  }, [dispatch, useQueryResult.isLoading, options.isLoading, options.enabled]);

  useEffect(() => {
    if (useQueryResult.isSuccess) {
      dispatch(stopLoading());
    }
  }, [useQueryResult.isSuccess, dispatch]);

  useEffect(() => {
    if (useQueryResult.isError) {
      dispatch(stopLoading());
      openModal({
        type: 'alert',
        title: '오류가 발생했습니다.',
        description:
          useQueryResult.error?.message || '알 수 없는 오류가 발생했습니다.',
      });
    }
  }, [dispatch, useQueryResult.isError, useQueryResult.error, openModal]);

  return useQueryResult;
};
