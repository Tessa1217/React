import { useCallback, memo, useMemo, useEffect } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Pagination from '@/shared/ui/pagination/Pagination';
import ResponseTable from '@/features/responseList/ui/ResponseTable';
import ResponseListSearchBar from '@/features/responseList/ui/ResponseListSearchBar';
import { useAppQuery } from '@/shared/hooks/useAppQuery';
import {
  setPaging,
  setPagingNumber,
  setSearchParams,
} from '@/shared/model/paging.slice';
import { selectPagingByKey } from '@/shared/model/paging.selectors';
import { fetchResponseList } from '@/features/responseList/model/responseList.api';

const key = 'responseList';

const ResponseListContainer = memo(() => {
  const paging = useSelector(selectPagingByKey(key), shallowEqual);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentPage, search: searchCondition } = useMemo(() => {
    const { currentPage, search } = paging;
    return { currentPage, search };
  }, [paging]);

  const queryFn = useCallback(async () => {
    const { data } = await fetchResponseList({
      currentPage,
      search: searchCondition,
    });
    return data;
  }, [currentPage, searchCondition]);

  const { data } = useAppQuery([key, currentPage, searchCondition], queryFn);

  const { items: responseList = [], search, ...pageInfo } = data || {};

  const handlePagination = useCallback(
    (paging) => {
      dispatch(setPaging({ key, paging }));
    },
    [dispatch]
  );

  useEffect(() => {
    if (pageInfo) {
      handlePagination(pageInfo);
    }
  }, [handlePagination, pageInfo]);

  useEffect(() => {
    if (search) {
      dispatch(setSearchParams({ key, search }));
    }
  }, [dispatch, search]);

  const handleResponseBtnClick = useCallback(
    ({ responseId, id }) => {
      if (responseId) {
        navigate(`/responses/${responseId}`);
      } else {
        navigate(`/responses/take/${id}`);
      }
    },
    [navigate]
  );

  const handlePageChange = useCallback(
    (page) => {
      dispatch(setPagingNumber({ key, page }));
    },
    [dispatch]
  );

  const handleSearchChange = useCallback(
    (newSearch) => dispatch(setSearchParams({ key, search: newSearch })),
    [dispatch]
  );

  return (
    <div className='mx-auto p-6 space-y-6'>
      <ResponseListSearchBar
        searchKeyword={searchCondition?.searchKeyword}
        hasResponded={searchCondition?.hasResponded}
        onSearchChange={handleSearchChange}
      />
      <ResponseTable
        responseList={responseList}
        onClick={handleResponseBtnClick}
      />
      <Pagination
        totalCount={paging?.totalItems}
        currentPage={paging?.currentPage}
        limit={paging?.limit}
        onPageChange={handlePageChange}
      />
    </div>
  );
});

export default ResponseListContainer;
