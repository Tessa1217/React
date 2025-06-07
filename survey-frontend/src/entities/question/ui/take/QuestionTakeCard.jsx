import { memo } from 'react';
import QuestionMeta from '@/entities/question/ui/shared/QuestionMeta';
import { QUESTION_TAKE_RENDERERS } from '@/entities/question/ui/take/questionTakeMap';

const QuestionTakeCard = memo(
  ({
    id,
    questionText,
    isRequired,
    type,
    options = [],
    answerText = '',
    selectedOption,
    onAnswerTextChange,
    onSelectedOptionChange,
    onSelectedOptionsChange,
  }) => {
    const TakeComponent = QUESTION_TAKE_RENDERERS[type];

    return (
      <QuestionMeta questionText={questionText} isRequired={isRequired}>
        <TakeComponent
          id={id}
          options={options}
          answerText={answerText}
          selectedOption={selectedOption}
          onAnswerTextChange={onAnswerTextChange}
          onSelectedOptionChange={onSelectedOptionChange}
          onSelectedOptionsChange={onSelectedOptionsChange}
        />
      </QuestionMeta>
    );
  }
);
export default QuestionTakeCard;
