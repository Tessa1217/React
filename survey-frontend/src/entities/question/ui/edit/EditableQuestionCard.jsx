import { memo } from 'react';
import QuestionEditor from '@/entities/question/ui/edit/QuestionEditor';
import { QUESTION_EDIT_RENDERERS } from '@/entities/question/ui/edit/questionEditorMap';

const EditableQuestionCard = memo(
  ({
    id,
    questionText,
    isRequired,
    type,
    options = [],
    onRemoveQuestion,
    handleQuestionTextChange,
    handleRequiredChange,
    handleOptionChange,
    onAddOption,
    onRemoveOption,
  }) => {
    const EditorComponent =
      QUESTION_EDIT_RENDERERS[type] ||
      QUESTION_EDIT_RENDERERS['MULTIPLE_CHOICE'];

    return (
      <div className='p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow space-y-6 w-full max-w-3xl mx-auto my-4'>
        <QuestionEditor
          id={id}
          questionText={questionText}
          isRequired={isRequired}
          onRemoveQuestion={onRemoveQuestion}
          handleQuestionTextChange={handleQuestionTextChange}
          handleRequiredChange={handleRequiredChange}
        />
        <EditorComponent
          id={id}
          options={options}
          questionText={questionText}
          handleOptionChange={handleOptionChange}
          onAddOption={onAddOption}
          onRemoveOption={onRemoveOption}
        />
      </div>
    );
  }
);

export default EditableQuestionCard;
