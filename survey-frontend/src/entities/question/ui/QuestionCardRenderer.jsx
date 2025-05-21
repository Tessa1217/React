import React from 'react';
import { useMode } from '@/shared/contexts/FormModeContext';
import EditableQuestionCard from './edit/EditableQuestionCard';
import QuestionCard from '@/entities/question/ui/view/QuestionCard';
const QuestionCardRenderer = (props) => {
  const { mode } = useMode();
  if (mode === 'edit') {
    return <EditableQuestionCard {...props} />;
  }
  return <QuestionCard {...props} />;
};

export default React.memo(QuestionCardRenderer);
