import { useSelector } from 'react-redux';
import { useCallback, useMemo } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { usePagingSync } from '@/shared/hooks/usePaging';
import { selectPagingByKey } from '@/shared/model/paging.selectors';
import { fetchFormList } from '@/features/formList/model/formList.api';
import { useAppQuery } from '@/shared/hooks/useAppQuery';
import FormList from '@/features/formList/ui/FormList';

const FormListContainer = () => {
  const { key } = useOutletContext();
  const paging = useSelector(selectPagingByKey(key));

  const navigate = useNavigate();

  const { currentPage, search: searchCondition } = useMemo(() => {
    const { currentPage, search } = paging;
    return { currentPage, search };
  }, [paging]);

  const queryFn = useCallback(async () => {
    const { data } = await fetchFormList({
      currentPage,
      search: searchCondition,
    });
    const { items: formList, search, ...pageInfo } = data;
    return [formList, search, pageInfo];
  }, [currentPage, searchCondition]);

  const { data } = useAppQuery([key, currentPage, searchCondition], queryFn);

  const [formList = [], search, pageInfo] = data || [];

  const { handlePageChange, handleSearchChange } = usePagingSync({
    key,
    pageInfo,
    search,
  });

  const handleViewButtonClick = useCallback(
    (formId) => {
      navigate(`/forms/${formId}`);
    },
    [navigate]
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

  const handleInsertButtonClick = useCallback(
    () => navigate('/forms/new'),
    [navigate]
  );

  return (
    <FormList
      searchKeyword={searchCondition?.searchKeyword ?? ''}
      searchFilter={searchCondition?.searchFilter ?? ''}
      onSearchChange={handleSearchChange}
      formList={formList || []}
      onViewButtonClick={handleViewButtonClick}
      onUpdateButtonClick={handleUpdateButtonClick}
      onDeleteButtonClick={handleDeleteButtonClick}
      totalCount={paging?.totalItems}
      currentPage={paging?.currentPage}
      limit={paging?.limit}
      onPageChange={handlePageChange}
      onInsertButtonClick={handleInsertButtonClick}
    />
  );
};

export default FormListContainer;
