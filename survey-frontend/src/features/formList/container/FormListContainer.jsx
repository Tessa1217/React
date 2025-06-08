import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { usePagingSync } from '@/shared/hooks/usePaging';
import { selectPagingByKey } from '@/shared/model/paging.selectors';
import {
  fetchFormList,
  deleteForm,
} from '@/features/formList/model/formList.api';
import { useAppQuery } from '@/shared/hooks/useAppQuery';
import { useAppMutation } from '@/shared/hooks/useAppMutation';
import { useQueryClient } from '@tanstack/react-query';
import useFormConfirm from '@/shared/hooks/useFormConfirm';
import FormList from '@/features/formList/ui/FormList';

const FormListContainer = () => {
  const { key } = useOutletContext();
  const paging = useSelector(selectPagingByKey(key));
  const showConfirmModal = useFormConfirm();
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { currentPage, search = {}, totalItems, limit } = paging;

  const queryKey = [key, currentPage, search];

  const queryFn = useCallback(async () => {
    const { data } = await fetchFormList({
      currentPage,
      search,
    });
    const { items: formList, search: appliedSearch, ...pageInfo } = data;
    return { formList, appliedSearch, pageInfo };
  }, [currentPage, search]);

  const { data } = useAppQuery(queryKey, queryFn);

  const { formList = [], appliedSearch = {}, pageInfo } = data || [];

  const { handlePageChange, handleSearchChange } = usePagingSync({
    key,
    pageInfo,
    appliedSearch,
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

  const { mutate: delSurvey } = useAppMutation(deleteForm, {
    showMessage: true,
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });

  const handleDeleteButtonClick = useCallback(
    (id) => {
      showConfirmModal('D').then((result) => {
        if (result) {
          delSurvey(id);
        }
      });
    },
    [delSurvey, showConfirmModal]
  );

  const handleInsertButtonClick = useCallback(
    () => navigate('/forms/new'),
    [navigate]
  );

  return (
    <FormList
      searchKeyword={search?.searchKeyword ?? ''}
      searchFilter={search?.searchFilter ?? ''}
      onSearchChange={handleSearchChange}
      formList={formList || []}
      onViewButtonClick={handleViewButtonClick}
      onUpdateButtonClick={handleUpdateButtonClick}
      onDeleteButtonClick={handleDeleteButtonClick}
      totalCount={totalItems}
      currentPage={currentPage}
      limit={limit}
      onPageChange={handlePageChange}
      onInsertButtonClick={handleInsertButtonClick}
    />
  );
};

export default FormListContainer;
