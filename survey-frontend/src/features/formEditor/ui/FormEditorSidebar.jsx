import React from 'react';
import { MdAddCircleOutline, MdViewAgenda } from 'react-icons/md';
import { useState } from 'react';
import { useMode } from '@/shared/contexts/FormModeContext';
import QuestionTypeSelector from '@/features/formEditor/ui/QuestionTypeSelector';

const FormEditorSidebar = ({ type: questionType, onChange, onAddQuestion }) => {
  const [showQuestionTypeSelector, setShowQuestionTypeSelector] =
    useState(false);
  const { toggleMode } = useMode();
  return (
    <>
      <div className='absolute top-10 w-15 right-70 flex flex-col space-y-4 z-50 shadow-md'>
        <div className='bg-white dark:bg-gray-800 rounded-xl p-3 shadow-lg flex flex-col items-center space-y-4'>
          <button className='text-gray-600 hover:text-purple-800 transition-colors'>
            <MdViewAgenda size={28} onClick={() => toggleMode()} />
          </button>
          <button
            className='text-gray-600 hover:text-purple-800 transition-colors'
            onClick={() =>
              setShowQuestionTypeSelector(!showQuestionTypeSelector)
            }
          >
            <MdAddCircleOutline size={28} />
          </button>
        </div>
      </div>
      {/* 드롭다운 선택창 */}
      {showQuestionTypeSelector && (
        <QuestionTypeSelector
          type={questionType}
          onChange={onChange}
          onAddQuestion={onAddQuestion}
        />
      )}
    </>
  );
};

export default React.memo(FormEditorSidebar);
