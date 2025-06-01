import React, { useMemo } from 'react';
import ShortAnswerViewer from '@/entities/question/ui/view/ShortAnswerViewer';
import CheckboxViewer from '@/entities/question/ui/view/CheckboxViewer';
import ParagraphViewer from '@/entities/question/ui/view/ParagraphViewer';
import DropdownViewer from '@/entities/question/ui/view/DropdownViewer';
import MultipleChoiceViewer from '@/entities/question/ui/view/MultipleChoiceViewer';
import QuestionMeta from '@/entities/question/ui/shared/QuestionMeta';

const QuestionViewCard = ({
  id,
  questionText,
  isRequired,
  type,
  answer = {},
  options = [],
}) => {
  const { answerText, selectedOption } = answer;
  const questionType = useMemo(() => {
    switch (type) {
      case 'SHORT_ANSWER':
        return <ShortAnswerViewer value={answerText} />;
      case 'CHECKBOX':
        return (
          <CheckboxViewer id={id} options={options} selected={selectedOption} />
        );
      case 'MULTIPLE_CHOICE':
        return (
          <MultipleChoiceViewer
            id={id}
            options={options}
            value={selectedOption?.[0]}
          />
        );
      case 'DROPDOWN':
        return <DropdownViewer options={options} value={selectedOption?.[0]} />;
      case 'PARAGRAPH':
        return <ParagraphViewer value={answerText} />;
      default:
        return <ShortAnswerViewer />;
    }
  }, [type, id, options, answerText, selectedOption]);
  return (
    <QuestionMeta questionText={questionText} isRequired={isRequired}>
      {questionType}
    </QuestionMeta>
  );
};

export default React.memo(QuestionViewCard);
