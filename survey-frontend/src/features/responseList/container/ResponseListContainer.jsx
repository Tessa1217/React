import { useCallback, memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { useAppQuery } from '@/shared/hooks/useAppQuery';
import { usePagingSync } from '@/shared/hooks/usePaging';
import { selectPagingByKey } from '@/shared/model/paging.selectors';
import { fetchResponseList } from '@/features/responseList/model/responseList.api';
import ResponseList from '@/features/responseList/ui/ResponseList';

const ResponseListContainer = memo(() => {
  const { key } = useOutletContext();
  const paging = useSelector(selectPagingByKey(key));

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
    const { items: responseList, search, ...pageInfo } = data;
    return [responseList, search, pageInfo];
  }, [currentPage, searchCondition]);

  const { data } = useAppQuery([key, currentPage, searchCondition], queryFn);

  const [responseList = [], search, pageInfo] = data || [];

  const { handlePageChange, handleSearchChange } = usePagingSync({
    key,
    pageInfo,
    search,
  });
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

  return (
    <ResponseList
      searchKeyword={searchCondition?.searchKeyword ?? ''}
      hasResponded={searchCondition?.hasResponded ?? ''}
      onSearchChange={handleSearchChange}
      responseList={responseList}
      onResponseBtnClick={handleResponseBtnClick}
      totalCount={paging?.totalItems}
      currentPage={paging?.currentPage}
      limit={paging?.limit}
      onPageChange={handlePageChange}
    />
  );
});

export default ResponseListContainer;
