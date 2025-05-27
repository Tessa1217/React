import { memo } from 'react';
import QuestionEditor from '@/entities/question/ui/edit/QuestionEditor';
import CheckboxEditor from '@/entities/question/ui/edit/CheckboxEditor';
import DropdownEditor from '@/entities/question/ui/edit/DropdownEditor';
import MultipleChoiceEditor from '@/entities/question/ui/edit/MultipleChoiceEditor';
import ShortAnswerEditor from '@/entities/question/ui/edit/ShortAnswerEditor';
import ParagraphEditor from '@/entities/question/ui/edit/ParagraphEditor';

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
    const questionTypeRenderer = () => {
      switch (type) {
        case 'SHORT_ANSWER':
          return <ShortAnswerEditor />;
        case 'CHECKBOX':
          return (
            <CheckboxEditor
              id={id}
              options={options}
              handleOptionChange={handleOptionChange}
              onAddOption={onAddOption}
              onRemoveOption={onRemoveOption}
            />
          );
        case 'MULTIPLE_CHOICE':
          return (
            <MultipleChoiceEditor
              id={id}
              options={options}
              handleOptionChange={handleOptionChange}
              onAddOption={onAddOption}
              onRemoveOption={onRemoveOption}
            />
          );
        case 'DROPDOWN':
          return (
            <DropdownEditor
              options={options}
              handleOptionChange={handleOptionChange}
              onAddOption={onAddOption}
              onRemoveOption={onRemoveOption}
            />
          );
        case 'PARAGRAPH':
          return <ParagraphEditor />;
        default:
          return <ShortAnswerEditor />;
      }
    };

    return (
      <div className='p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow space-y-6 w-full max-w-3xl mx-auto my-4'>
        <QuestionEditor
          questionText={questionText}
          isRequired={isRequired}
          onRemoveQuestion={onRemoveQuestion}
          handleQuestionTextChange={handleQuestionTextChange}
          handleRequiredChange={handleRequiredChange}
        />
        {questionTypeRenderer()}
      </div>
    );
  }
);

export default EditableQuestionCard;
