import React from 'react';
import { FaQuestion } from 'react-icons/fa';
import RequiredAsterick from '@/shared/ui/form/RequiredAsterick';
const QuestionViewer = ({ children, questionText, isRequired }) => {
  return (
    <div className='p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow space-y-6 w-full max-w-3xl mx-auto my-4'>
      <div className='flex gap-2 justify-between items-center text-lg font-medium text-gray-800'>
        <div className='flex gap-2 items-center'>
          <FaQuestion size={15} color={'red'} />
          {questionText} {isRequired && <RequiredAsterick />}
        </div>
      </div>
      {children}
    </div>
  );
};

export default React.memo(QuestionViewer);
