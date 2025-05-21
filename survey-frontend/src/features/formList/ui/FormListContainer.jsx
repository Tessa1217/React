import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchFormListRequest } from '@/features/formList/model/formList.slice';
import { selectCurrentFormList } from '@/features/formList/model/formList.selectors';
import { setPaging } from '@/shared/model/paging.slice';
import { selectPagingByKey } from '@/shared/model/paging.selectors';
import Pagination from '@/shared/ui/pagination/Pagination';
import FormTable from '@/features/formList/ui/FormTable';
import { HiCheckCircle } from 'react-icons/hi';

const key = 'form';

const FormListContainer = () => {
  const formList = useSelector(selectCurrentFormList);
  const paging = useSelector(selectPagingByKey(key));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePagination = useCallback(
    ({ pageable, totalElements, totalPages, numberOfElements }) => {
      dispatch(
        setPaging({
          key,
          paging: { ...pageable, totalElements, totalPages, numberOfElements },
        })
      );
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(fetchFormListRequest({ callbackFn: handlePagination }));
  }, [dispatch, handlePagination]);

  const handleViewButtonClick = useCallback(
    (formId) => {
      navigate(`/forms/${formId}`);
    },
    [navigate]
  );

  const handlePageChange = useCallback(
    (page) => {
      dispatch(
        fetchFormListRequest({
          param: { page },
          callbackFn: handlePagination,
        })
      );
    },
    [dispatch, handlePagination]
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
        <button
          className='flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition cursor-pointer'
          onClick={() => navigate('/forms/new')}
        >
          등록 <HiCheckCircle size={20} />
        </button>
      </div>
    </div>
  );
};

export default FormListContainer;
