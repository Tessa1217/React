import { memo } from 'react';
import { HiUser, HiCalendar } from 'react-icons/hi';
import clsx from 'clsx';
const FormCard = memo(
  ({ id, title, description, expiresAt, isLoggedIn, onCardClick }) => {
    return (
      <div
        className={clsx(
          'bg-white rounded-xl p-5 border transition-all duration-200 ease-in-out transform',
          'hover:shadow-xl hover:-translate-y-1 cursor-pointer',
          isLoggedIn ? 'border-indigo-400' : 'border-gray-200'
        )}
        onClick={() => onCardClick(id)}
        aria-label={`${title} 설문 보기`}
      >
        <h3 className='text-lg font-semibold text-gray-900 mb-2 line-clamp-2'>
          {title}
        </h3>

        <p className='text-sm text-gray-600 mb-4 line-clamp-2'>
          {description || '설명 없는 설문입니다.'}
        </p>

        <div className='flex justify-between items-center text-xs sm:text-sm text-gray-500'>
          <div className='flex items-center gap-1'>
            <HiUser size={16} className='text-gray-400' />
            <span>{isLoggedIn && '내 설문'}</span>
          </div>
          <div className='flex items-center gap-1'>
            <HiCalendar size={16} className='text-gray-400' />
            <span>
              {expiresAt
                ? new Date(expiresAt).toLocaleDateString()
                : '설문 기한 없음'}
            </span>
          </div>
        </div>
      </div>
    );
  }
);
export default FormCard;
