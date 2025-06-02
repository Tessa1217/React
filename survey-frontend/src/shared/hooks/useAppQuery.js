import { useQuery } from '@tanstack/react-query';
import { useModal } from '@/shared/hooks/useModal';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '@/shared/model/loading.slice';
import { useNavigate } from 'react-router-dom';

export const useAppQuery = (key, queryFn, options = {}) => {
  const { openModal } = useModal();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mergedOptions = {
    isLoading: true,
    retry: false,
    retryOnMount: false,
    refetchOnWindowFocus: false,
    ...options,
  };

  const useQueryResult = useQuery({
    queryKey: key,
    queryFn,
    ...mergedOptions,
  });

  useEffect(() => {
    if (
      useQueryResult.isLoading &&
      mergedOptions.isLoading &&
      mergedOptions.enabled !== false
    ) {
      dispatch(startLoading());
    }
  }, [
    dispatch,
    useQueryResult.isLoading,
    mergedOptions.isLoading,
    mergedOptions.enabled,
  ]);

  useEffect(() => {
    if (useQueryResult.isSuccess) {
      dispatch(stopLoading());
    }
  }, [useQueryResult.isSuccess, dispatch]);

  const { isError, error } = useQueryResult;
  const hasShownErrorRef = useRef(false);

  useEffect(() => {
    if (isError && !hasShownErrorRef.current) {
      hasShownErrorRef.current = true;
      dispatch(stopLoading());
      openModal({
        id: 'alertModal',
        type: 'alert',
        title: '오류가 발생했습니다.',
        description: error?.message || '알 수 없는 오류가 발생했습니다.',
      }).then(() => {
        navigate(-1);
      });
    }
  }, [dispatch, isError, error, openModal, navigate]);

  useEffect(() => {
    if (!isError) {
      hasShownErrorRef.current = false;
    }
  }, [isError]);

  return useQueryResult;
};
