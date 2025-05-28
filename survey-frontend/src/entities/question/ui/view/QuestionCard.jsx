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
  options = [],
}) => {
  const questionType = useMemo(() => {
    switch (type) {
      case 'SHORT_ANSWER':
        return <ShortAnswerViewer />;
      case 'CHECKBOX':
        return <CheckboxViewer id={id} options={options} />;
      case 'MULTIPLE_CHOICE':
        return <MultipleChoiceViewer id={id} options={options} />;
      case 'DROPDOWN':
        return <DropdownViewer options={options} />;
      case 'PARAGRAPH':
        return <ParagraphViewer />;
      default:
        return <ShortAnswerViewer />;
    }
  }, [type, id, options]);
  return (
    <QuestionMeta questionText={questionText} isRequired={isRequired}>
      {questionType}
    </QuestionMeta>
  );
};

export default React.memo(QuestionViewCard);
