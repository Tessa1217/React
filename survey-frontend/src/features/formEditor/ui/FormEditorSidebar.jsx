import React, { useState } from 'react';
import { MdAddCircleOutline, MdViewAgenda } from 'react-icons/md';
import { useMode } from '@/shared/contexts/FormModeContext';
import QuestionTypeSelector from '@/features/formEditor/ui/QuestionTypeSelector';

const FormEditorSidebar = ({ type: questionType, onChange, onAddQuestion }) => {
  const [showQuestionTypeSelector, setShowQuestionTypeSelector] =
    useState(false);
  const { toggleMode } = useMode();

  return (
    <div className='space-y-6'>
      {/* 버튼 영역 */}
      <div className='bg-white rounded-xl p-4 shadow space-y-4 flex flex-col items-center'>
        <button
          className='text-gray-600 hover:text-purple-800 transition-colors'
          onClick={toggleMode}
        >
          <MdViewAgenda size={28} />
        </button>
        <button
          className='text-gray-600 hover:text-purple-800 transition-colors'
          onClick={() => setShowQuestionTypeSelector((prev) => !prev)}
        >
          <MdAddCircleOutline size={28} />
        </button>
      </div>

      {/* 질문 타입 선택창 */}
      {showQuestionTypeSelector && (
        <div className='bg-white rounded-xl p-4 shadow'>
          <QuestionTypeSelector
            type={questionType}
            onChange={onChange}
            onAddQuestion={onAddQuestion}
          />
        </div>
      )}
    </div>
  );
};

export default React.memo(FormEditorSidebar);
