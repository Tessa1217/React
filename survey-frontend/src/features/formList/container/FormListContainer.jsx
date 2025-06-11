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
import useFormConfirm, { ConfirmType } from '@/shared/hooks/useFormConfirm';
import FormList from '@/features/formList/ui/FormList';

const FormListContainer = () => {
  // Outlet에서 key(페이징 상태 키) 받아옴
  const { key } = useOutletContext();
  const paging = useSelector(selectPagingByKey(key));
  const showConfirmModal = useFormConfirm();
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { currentPage, search = {}, totalItems, limit } = paging;

  const queryKey = [key, currentPage, search];

  /**
   * 설문 목록 조회 API 요청 함수
   */
  const queryFn = useCallback(async () => {
    const { data } = await fetchFormList({
      currentPage,
      search,
    });
    const { items: formList, search: appliedSearch, ...pageInfo } = data;
    return { formList, appliedSearch, pageInfo };
  }, [currentPage, search]);

  // 설문 목록 조회 (React Query)
  const { data } = useAppQuery(queryKey, queryFn);

  const { formList = [], appliedSearch = {}, pageInfo } = data || [];

  /**
   * 검색 및 페이징 상태 동기화
   */
  const { handlePageChange, handleSearchChange } = usePagingSync({
    key,
    pageInfo,
    appliedSearch,
  });

  /**
   * 설문 상세보기
   */
  const handleViewButtonClick = useCallback(
    (formId) => {
      navigate(`/forms/${formId}`);
    },
    [navigate]
  );

  /**
   * 설문 수정 페이지 이동
   */
  const handleUpdateButtonClick = useCallback(
    (formId) => {
      navigate(`/forms/${formId}/edit`);
    },
    [navigate]
  );

  /**
   * 설문 삭제
   */
  const { mutate: delSurvey } = useAppMutation(deleteForm, {
    showMessage: true,
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });

  /**
   * 설문 삭제 클릭 시 확인 모달 → 확인 시 삭제 실행
   */
  const handleDeleteButtonClick = useCallback(
    (id) => {
      showConfirmModal(ConfirmType.DELETE).then((result) => {
        if (result) {
          delSurvey(id);
        }
      });
    },
    [delSurvey, showConfirmModal]
  );

  /**
   * 새 설문 생성 페이지로 이동
   */
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
