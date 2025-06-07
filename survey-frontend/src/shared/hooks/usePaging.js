import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  resetPaging,
  setPaging,
  setPagingNumber,
  setSearchParams,
} from '@/shared/model/paging.slice';

export const useResetPagingOnPathChange = (key) => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetPaging(key));
    };
  }, [dispatch, key]);
};

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

  const handleSearchChange = useCallback(
    (newSearch) => {
      dispatch(setSearchParams({ key, search: newSearch }));
    },
    [dispatch, key]
  );

  const handlePageChange = useCallback(
    (page) => {
      dispatch(setPagingNumber({ key, page }));
    },
    [dispatch, key]
  );

  return { handleSearchChange, handlePageChange };
};
