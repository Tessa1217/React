import { useMemo } from 'react';
import ShortAnswerTaker from '@/entities/question/ui/take/ShortAnswerTaker';
import CheckboxTaker from '@/entities/question/ui/take/CheckboxTaker';
import ParagraphTaker from '@/entities/question/ui/take/ParagraphTaker';
import DropdownTaker from '@/entities/question/ui/take/DropdownTaker';
import MultipleChoiceTaker from '@/entities/question/ui/take/MultipleChoiceTaker';
import QuestionMeta from '@/entities/question/ui/shared/QuestionMeta';

const QuestionTakeCard = ({
  id,
  questionText,
  isRequired,
  type,
  options = [],
  answer,
  onAnswerTextChange,
  onSelectedOptionChange,
}) => {
  const { answerText, selectedOption } = answer || {};
  const questionType = useMemo(() => {
    switch (type) {
      case 'SHORT_ANSWER':
        return (
          <ShortAnswerTaker
            id={id}
            value={answerText}
            onChange={onAnswerTextChange}
          />
        );
      case 'CHECKBOX':
        return (
          <CheckboxTaker
            id={id}
            options={options}
            selected={selectedOption}
            onChange={onSelectedOptionChange}
          />
        );
      case 'MULTIPLE_CHOICE':
        return (
          <MultipleChoiceTaker
            id={id}
            options={options}
            value={selectedOption}
            onChange={onSelectedOptionChange}
          />
        );
      case 'DROPDOWN':
        return (
          <DropdownTaker
            id={id}
            options={options}
            value={selectedOption}
            onChange={onSelectedOptionChange}
          />
        );
      case 'PARAGRAPH':
        return (
          <ParagraphTaker
            id={id}
            value={answerText}
            onChange={onAnswerTextChange}
          />
        );
      default:
        return <ShortAnswerTaker />;
    }
  }, [
    type,
    id,
    answerText,
    selectedOption,
    onSelectedOptionChange,
    onAnswerTextChange,
    options,
  ]);
  return (
    <QuestionMeta questionText={questionText} isRequired={isRequired}>
      {questionType}
    </QuestionMeta>
  );
};
export default QuestionTakeCard;
