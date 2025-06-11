import { useCallback, memo } from 'react';
import { useSelector } from 'react-redux';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { useAppQuery } from '@/shared/hooks/useAppQuery';
import { usePagingSync } from '@/shared/hooks/usePaging';
import { selectPagingByKey } from '@/shared/model/paging.selectors';
import { fetchResponseList } from '@/features/responseList/model/responseList.api';
import ResponseList from '@/features/responseList/ui/ResponseList';

/**
 * 설문 응답 목록 컨테이너 컴포넌트
 */
const ResponseListContainer = memo(() => {
  const { key } = useOutletContext();
  const paging = useSelector(selectPagingByKey(key));

  const navigate = useNavigate();

  const { currentPage, search = {}, totalItems, limit } = paging;

  const queryKey = [key, currentPage, search];

  /**
   * 설문 응답 목록 조회 API 요청 함수
   */
  const queryFn = useCallback(async () => {
    const { data } = await fetchResponseList({
      currentPage,
      search,
    });
    const { items: responseList, search: appliedSearch, ...pageInfo } = data;
    return { responseList, appliedSearch, pageInfo };
  }, [currentPage, search]);

  // 설문 응답 목록 조회 (React Query)
  const { data } = useAppQuery(queryKey, queryFn);

  const { responseList = [], appliedSearch = {}, pageInfo } = data || [];

  /**
   * 검색 및 페이징 상태 동기화
   */
  const { handlePageChange, handleSearchChange } = usePagingSync({
    key,
    pageInfo,
    appliedSearch,
  });

  /**
   * 응답 버튼 클릭 시 라우팅
   * - 이미 응답한 경우: 응답 결과 보기
   * - 응답하지 않은 경우: 설문 응답 작성
   */
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
      searchKeyword={search?.searchKeyword ?? ''}
      hasResponded={search?.hasResponded ?? ''}
      onSearchChange={handleSearchChange}
      responseList={responseList}
      onResponseBtnClick={handleResponseBtnClick}
      totalCount={totalItems}
      currentPage={currentPage}
      limit={limit}
      onPageChange={handlePageChange}
    />
  );
});

export default ResponseListContainer;
