import { memo } from 'react';
import Pagination from '@/shared/ui/pagination/Pagination';
import ResponseTable from '@/features/responseList/ui/ResponseTable';
import ResponseListSearchBar from '@/features/responseList/ui/ResponseListSearchBar';

const ResponseList = memo(
  ({
    searchKeyword,
    hasResponded,
    onSearchChange,
    responseList,
    onResponseBtnClick,
    totalCount,
    currentPage,
    limit,
    onPageChange,
  }) => {
    return (
      <div className='mx-auto p-6 space-y-6'>
        <ResponseListSearchBar
          searchKeyword={searchKeyword}
          hasResponded={hasResponded}
          onSearchChange={onSearchChange}
        />
        <ResponseTable
          responseList={responseList}
          onClick={onResponseBtnClick}
        />
        <Pagination
          totalCount={totalCount}
          currentPage={currentPage}
          limit={limit}
          onPageChange={onPageChange}
        />
      </div>
    );
  }
);
export default ResponseList;
