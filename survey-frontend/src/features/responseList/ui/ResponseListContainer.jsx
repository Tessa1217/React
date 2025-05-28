import { useCallback, memo, useMemo, useEffect } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Pagination from '@/shared/ui/pagination/Pagination';
import ResponseTable from '@/features/responseList/ui/ResponseTable';
import { useAppQuery } from '@/shared/hooks/useAppQuery';
import { setPaging, setPagingNumber } from '@/shared/model/paging.slice';
import { selectPagingByKey } from '@/shared/model/paging.selectors';
import { fetchResponseList } from '@/features/responseList/model/responseList.api';

const key = 'responseList';

const ResponseListContainer = memo(() => {
  const paging = useSelector(selectPagingByKey(key), shallowEqual);
  const page = paging.pageNumber;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: response } = useAppQuery([key, page], () =>
    fetchResponseList({ page })
  );
  const responseList = response?.data?.content || [];

  const handlePagination = useCallback(
    ({ pageable, totalElements, totalPages, numberOfElements }) => {
      const next = {
        ...pageable,
        totalElements,
        totalPages,
        numberOfElements,
      };

      if (JSON.stringify(paging) !== JSON.stringify(next)) {
        dispatch(setPaging({ key, paging: next }));
      }
    },
    [dispatch, paging]
  );

  useEffect(() => {
    if (response) {
      const { data } = response;
      handlePagination(data);
    }
  });

  const handleResponseBtnClick = useCallback(
    (id) => navigate(`/responses/${id}`),
    [navigate]
  );

  const handlePageChange = useCallback(
    (page) => {
      dispatch(setPagingNumber({ key, page }));
    },
    [dispatch]
  );

  const shouldShowPagination = useMemo(
    () => paging && paging.totalElements > 0,
    [paging]
  );

  return (
    <div className='mx-auto p-6 space-y-6'>
      <ResponseTable
        responseList={responseList}
        onClick={handleResponseBtnClick}
      />
      {shouldShowPagination && (
        <Pagination
          totalCount={paging?.totalElements}
          currentPage={paging?.pageNumber}
          limit={paging?.pageSize}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
});

export default ResponseListContainer;
