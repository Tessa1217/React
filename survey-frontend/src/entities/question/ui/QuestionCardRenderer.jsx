import { memo } from 'react';
import { useMode } from '@/shared/contexts/FormModeContext';
import EditableQuestionCard from './edit/EditableQuestionCard';
import QuestionCard from '@/entities/question/ui/view/QuestionCard';
const QuestionCardRenderer = memo((props) => {
  const { mode } = useMode();
  if (mode === 'edit') {
    return <EditableQuestionCard {...props} />;
  }
  return <QuestionCard {...props} />;
});

export default QuestionCardRenderer;
