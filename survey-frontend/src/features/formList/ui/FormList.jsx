import Pagination from '@/shared/ui/pagination/Pagination';
import FormTable from '@/features/formList/ui/FormTable';
import FormListSearchBar from '@/features/formList/ui/FormListSearchBar';
import ButtonInsert from '@/shared/ui/common/ButtonInsert';
const FormList = ({
  searchKeyword,
  searchFilter,
  onSearchChange,
  formList,
  onViewButtonClick,
  onUpdateButtonClick,
  onDeleteButtonClick,
  totalCount,
  currentPage,
  limit,
  onPageChange,
  onInsertButtonClick,
}) => {
  return (
    <div className='mx-auto p-6 space-y-6'>
      <FormListSearchBar
        searchKeyword={searchKeyword}
        searchFilter={searchFilter}
        onSearchChange={onSearchChange}
      />
      <FormTable
        formList={formList}
        onViewButtonClick={onViewButtonClick}
        onUpdateButtonClick={onUpdateButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
      />
      <Pagination
        totalCount={totalCount}
        currentPage={currentPage}
        limit={limit}
        onPageChange={onPageChange}
      />
      <div className='flex space-y-6 w-full mx-auto justify-end-safe gap-2'>
        <ButtonInsert size={20} onInsertButtonClick={onInsertButtonClick} />
      </div>
    </div>
  );
};
export default FormList;
