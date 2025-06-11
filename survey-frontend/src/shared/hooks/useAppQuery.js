import { useQuery } from '@tanstack/react-query';
import { useModal } from '@/shared/hooks/useModal';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '@/shared/model/loading.slice';
import { useNavigate } from 'react-router-dom';

/**
 * 공통 API 조회 훅
 *
 * React Query의 useQuery를 감싸 전역 로딩/에러 처리/모달 대응 등을 포함함
 *
 * @param {Array} key - React Query의 queryKey
 * @param {Function} queryFn - API 호출 함수 (Promise 반환)
 * @param {Object} options - useQuery 옵션
 * @returns {UseQueryResult} - React Query에서 반환하는 응답 객체
 */
export const useAppQuery = (key, queryFn, options = {}) => {
  const { openModal } = useModal();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * 공통 기본 옵션 + 사용자 정의 옵션 병합
   */
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

  /**
   * 쿼리 로딩 상태에 따라 전역 로딩 활성화
   */
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

  /**
   * 쿼리 성공 시 전역 로딩 종료
   */
  useEffect(() => {
    if (useQueryResult.isSuccess) {
      dispatch(stopLoading());
    }
  }, [useQueryResult.isSuccess, dispatch]);

  const { isError, error } = useQueryResult;
  const hasShownErrorRef = useRef(false);

  /**
   * 에러 발생 시 alert 모달 출력 + 뒤로 가기 처리
   */
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

  /**
   * 에러 상태 초기화되면 플래그도 초기화
   */
  useEffect(() => {
    if (!isError) {
      hasShownErrorRef.current = false;
    }
  }, [isError]);

  return useQueryResult;
};
