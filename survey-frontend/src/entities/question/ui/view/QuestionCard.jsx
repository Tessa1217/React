import React, { useMemo } from 'react';
import { useMode } from '@/shared/contexts/FormModeContext';
import ShortAnswerViewer from '@/entities/question/ui/view/ShortAnswerViewer';
import CheckboxViewer from '@/entities/question/ui/view/CheckboxViewer';
import ParagraphViewer from '@/entities/question/ui/view/ParagraphViewer';
import DropdownViewer from '@/entities/question/ui/view/DropdownViewer';
import MultipleChoiceViewer from '@/entities/question/ui/view/MultipleChoiceViewer';
import QuestionViewer from '@/entities/question/ui/view/QuestionViewer';

const QuestionViewCard = ({
  id,
  questionText,
  isRequired,
  type,
  options = [],
}) => {
  const { mode } = useMode();
  const questionType = useMemo(() => {
    switch (type) {
      case 'SHORT_ANSWER':
        return <ShortAnswerViewer mode={mode} />;
      case 'CHECKBOX':
        return <CheckboxViewer mode={mode} id={id} options={options} />;
      case 'MULTIPLE_CHOICE':
        return <MultipleChoiceViewer mode={mode} id={id} options={options} />;
      case 'DROPDOWN':
        return <DropdownViewer mode={mode} options={options} />;
      case 'PARAGRAPH':
        return <ParagraphViewer mode={mode} />;
      default:
        return <ShortAnswerViewer mode={mode} />;
    }
  }, [type, mode, id, options]);
  return (
    <QuestionViewer questionText={questionText} isRequired={isRequired}>
      {questionType}
    </QuestionViewer>
  );
};

export default React.memo(QuestionViewCard);
