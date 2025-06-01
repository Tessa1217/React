import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useCallback, useEffect, useMemo, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { setPaging, setPagingNumber } from '@/shared/model/paging.slice';
import { selectPagingByKey } from '@/shared/model/paging.selectors';
import Pagination from '@/shared/ui/pagination/Pagination';
import FormTable from '@/features/formList/ui/FormTable';
import ButtonInsert from '@/shared/ui/common/ButtonInsert';
import { fetchFormList } from '@/features/formList/model/formList.api';
import { useAppQuery } from '@/shared/hooks/useAppQuery';

const key = 'form';

const FormListContainer = memo(() => {
  const paging = useSelector(selectPagingByKey(key), shallowEqual);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const page = useMemo(() => paging.pageNumber, [paging]);

  const queryFn = useCallback(() => fetchFormList({ page }), [page]);

  const { data: response } = useAppQuery(['form', page], queryFn);

  const formList = response?.data?.content || [];

  useEffect(() => {
    if (response) {
      const { data } = response;
      handlePagination(data);
    }
  }, [response, handlePagination]);

  const handleViewButtonClick = useCallback(
    (formId) => {
      navigate(`/forms/${formId}`);
    },
    [navigate]
  );

  const handlePageChange = useCallback(
    (page) => {
      dispatch(setPagingNumber({ key, page }));
    },
    [dispatch]
  );

  const handleUpdateButtonClick = useCallback(
    (formId) => {
      navigate(`/forms/${formId}/edit`);
    },
    [navigate]
  );

  const handleDeleteButtonClick = () => {
    console.log('deleted');
  };

  const shouldShowPagination = useMemo(
    () => paging && paging.totalElements > 0,
    [paging]
  );

  return (
    <div className='mx-auto p-6 space-y-6'>
      <FormTable
        formList={formList || []}
        onViewButtonClick={handleViewButtonClick}
        onUpdateButtonClick={handleUpdateButtonClick}
        onDeleteButtonClick={handleDeleteButtonClick}
      />
      {shouldShowPagination && (
        <Pagination
          totalCount={paging?.totalElements}
          currentPage={paging?.pageNumber}
          limit={paging?.pageSize}
          onPageChange={handlePageChange}
        />
      )}
      <div className='flex space-y-6 w-full mx-auto justify-end-safe gap-2'>
        <ButtonInsert
          size={20}
          onInsertButtonClick={() => navigate('/forms/new')}
        />
      </div>
    </div>
  );
});

export default FormListContainer;
