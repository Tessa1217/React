import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useCallback, useEffect, useMemo, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  setPaging,
  setPagingNumber,
  setSearchParams,
} from '@/shared/model/paging.slice';
import { selectPagingByKey } from '@/shared/model/paging.selectors';
import Pagination from '@/shared/ui/pagination/Pagination';
import FormTable from '@/features/formList/ui/FormTable';
import FormListSearchBar from '@/features/formList/ui/FormListSearchBar';
import ButtonInsert from '@/shared/ui/common/ButtonInsert';
import { fetchFormList } from '@/features/formList/model/formList.api';
import { useAppQuery } from '@/shared/hooks/useAppQuery';

const key = 'form';

const FormListContainer = memo(() => {
  const paging = useSelector(selectPagingByKey(key), shallowEqual);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePagination = useCallback(
    (paging) => {
      dispatch(setPaging({ key, paging }));
    },
    [dispatch]
  );

  const { currentPage, search: searchCondition } = useMemo(() => {
    const { currentPage, search } = paging;
    return { currentPage, search };
  }, [paging]);

  const queryFn = useCallback(async () => {
    const { data } = await fetchFormList({
      currentPage,
      search: searchCondition,
    });
    return data;
  }, [currentPage, searchCondition]);

  const { data } = useAppQuery(['form', currentPage, searchCondition], queryFn);

  const { items: formList = [], search, ...pageInfo } = data || {};

  useEffect(() => {
    if (pageInfo) {
      handlePagination(pageInfo);
    }
  }, [pageInfo, handlePagination]);

  useEffect(() => {
    if (search) {
      dispatch(setSearchParams({ key, search }));
    }
  }, [dispatch, search]);

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

  const handleSearchChange = useCallback(
    (newSearch) => {
      dispatch(setSearchParams({ key, search: newSearch }));
    },
    [dispatch]
  );
  return (
    <div className='mx-auto p-6 space-y-6'>
      <FormListSearchBar
        searchKeyword={searchCondition?.searchKeyword}
        searchFilter={searchCondition?.searchFilter}
        onSearchChange={handleSearchChange}
      />
      <FormTable
        formList={formList || []}
        onViewButtonClick={handleViewButtonClick}
        onUpdateButtonClick={handleUpdateButtonClick}
        onDeleteButtonClick={handleDeleteButtonClick}
      />
      <Pagination
        totalCount={paging?.totalItems}
        currentPage={paging?.currentPage}
        limit={paging?.limit}
        onPageChange={handlePageChange}
      />
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
