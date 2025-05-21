import React, { useMemo } from 'react';
import QuestionEditor from '@/entities/question/ui/edit/QuestionEditor';
import CheckboxEditor from '@/entities/question/ui/edit/CheckboxEditor';
import DropdownEditor from '@/entities/question/ui/edit/DropdownEditor';
import MultipleChoiceEditor from '@/entities/question/ui/edit/MultipleChoiceEditor';
import ShortAnswerEditor from '@/entities/question/ui/edit/ShortAnswerEditor';
import ParagraphEditor from '@/entities/question/ui/edit/ParagraphEditor';

const EditableQuestionCard = ({
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
  const questionType = useMemo(() => {
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
  }, [type, options, handleOptionChange, onAddOption, onRemoveOption, id]);
  return (
    <QuestionEditor
      questionText={questionText}
      isRequired={isRequired}
      onRemoveQuestion={onRemoveQuestion}
      handleQuestionTextChange={handleQuestionTextChange}
      handleRequiredChange={handleRequiredChange}
    >
      {questionType}
    </QuestionEditor>
  );
};

export default React.memo(EditableQuestionCard);
