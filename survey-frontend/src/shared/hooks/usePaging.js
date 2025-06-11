import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  resetPaging,
  setPaging,
  setPagingNumber,
  setSearchParams,
} from '@/shared/model/paging.slice';

/**
 * 컴포넌트 언마운트 시 해당 key의 페이징 상태 초기화
 *
 * @param {string} key - 페이징 상태를 구분하는 키
 */
export const useResetPagingOnPathChange = (key) => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetPaging(key)); // 경로 변경으로 언마운트될 때 reset
    };
  }, [dispatch, key]);
};

/**
 * 페이지 및 검색 상태를 store와 동기화하고 이벤트 핸들러 제공
 *
 * @param {{
 *   key: string,
 *   pageInfo?: { currentPage: number, totalItems?: number, limit?: number },
 *   search?: object
 * }} param0
 *
 * @returns {{
 *   handleSearchChange: (newSearch: object) => void,
 *   handlePageChange: (page: number) => void
 * }}
 */
export const usePagingSync = ({ key, pageInfo, search }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (pageInfo) {
      dispatch(setPaging({ key, pageInfo }));
    }
  }, [dispatch, key, pageInfo]);

  useEffect(() => {
    if (search) {
      dispatch(setSearchParams({ key, search }));
    }
  }, [dispatch, key, search]);

  /**
   * 검색 조건 변경 시 첫 페이지로 이동 + 검색 조건 갱신
   */
  const handleSearchChange = useCallback(
    (newSearch) => {
      dispatch(setPagingNumber({ key, page: 0 }));
      dispatch(setSearchParams({ key, search: newSearch }));
    },
    [dispatch, key]
  );

  /**
   * 페이지 번호 변경
   */
  const handlePageChange = useCallback(
    (page) => {
      dispatch(setPagingNumber({ key, page }));
    },
    [dispatch, key]
  );

  return { handleSearchChange, handlePageChange };
};
