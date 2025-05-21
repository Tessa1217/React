import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ totalCount, currentPage, limit, onPageChange }) => {
  const totalPages = Math.ceil(totalCount / limit);
  if (totalPages == 0) return null;

  const handleClick = (page) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page - 1);
  };

  const renderPages = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handleClick(i)}
          className={`px-3 py-1 rounded-md border cursor-pointer ${
            i === currentPage + 1
              ? 'bg-blue-600 text-white font-semibold'
              : 'bg-white text-blue-600'
          } hover:bg-blue-100`}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className='flex items-center justify-center space-x-2 mt-4'>
      <button
        onClick={() => handleClick(currentPage - 1)}
        className='p-2 text-blue-600 hover:text-blue-800 disabled:opacity-40 cursor-pointer'
        disabled={currentPage === 0}
      >
        <FaChevronLeft />
      </button>
      {renderPages()}
      <button
        onClick={() => handleClick(currentPage + 1)}
        className='p-2 text-blue-600 hover:text-blue-800 disabled:opacity-40 cursor-pointer'
        disabled={currentPage + 1 === totalPages}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
