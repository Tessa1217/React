import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useMemo, memo, useCallback } from 'react';

const Pagination = memo(({ totalCount, currentPage, limit, onPageChange }) => {
  // 전체 페이지
  const totalPages = useMemo(
    () => Math.ceil(totalCount / limit),
    [totalCount, limit]
  );

  // 페이지 그룹의 첫번째, 마지막 페이지 계산
  const { firstPage, lastPage } = useMemo(() => {
    const pageGroup = Math.ceil((currentPage + 1) / 10);
    const first = (pageGroup - 1) * 10 + 1;
    const last = Math.min(pageGroup * 10, totalPages);
    return { firstPage: first, lastPage: last };
  }, [currentPage, totalPages]);

  // 페이지 버튼 클릭 핸들러
  const handlePageButtonClick = useCallback(
    (page) => {
      if (page < 1 || page > totalPages) return;
      onPageChange(page - 1);
    },
    [totalPages, onPageChange]
  );

  // 페이지 번호 렌더링
  const pages = useMemo(() => {
    const list = [];
    for (let i = firstPage; i <= lastPage; i++) {
      const isActive = i === currentPage + 1;
      list.push(
        <button
          key={i}
          onClick={() => handlePageButtonClick(i)}
          className={`px-3 py-1 rounded-md border cursor-pointer hover:bg-blue-100 ${
            isActive
              ? 'bg-blue-600 text-white font-semibold'
              : 'bg-white text-blue-600'
          }`}
        >
          {i}
        </button>
      );
    }
    return list;
  }, [firstPage, lastPage, currentPage, handlePageButtonClick]);

  if (totalPages === 0) return null;

  return (
    <div className='flex items-center justify-center space-x-2 mt-4'>
      <button
        onClick={() => handlePageButtonClick(firstPage - 1)}
        className='p-2 text-blue-600 hover:text-blue-800 disabled:opacity-40 cursor-pointer'
        disabled={currentPage === 0}
      >
        <FaChevronLeft />
      </button>
      {pages}
      <button
        onClick={() => handlePageButtonClick(lastPage + 1)}
        className='p-2 text-blue-600 hover:text-blue-800 disabled:opacity-40 cursor-pointer'
        disabled={currentPage + 1 === totalPages}
      >
        <FaChevronRight />
      </button>
    </div>
  );
});

export default Pagination;
