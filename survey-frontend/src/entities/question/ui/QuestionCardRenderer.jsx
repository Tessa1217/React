import { memo } from 'react';
import { useMode } from '@/shared/contexts/FormModeContext';
import EditableQuestionCard from '@/entities/question/ui/edit/EditableQuestionCard';
import QuestionTakeCard from '@/entities/question/ui/take/QuestionTakeCard.jsx';
import QuestionCard from '@/entities/question/ui/view/QuestionCard';

const QuestionCardRenderer = memo((props) => {
  const { mode } = useMode();
  if (mode === 'edit') {
    return <EditableQuestionCard {...props} />;
  } else if (mode === 'take') {
    return <QuestionTakeCard {...props} />;
  } else {
    return <QuestionCard {...props} />;
  }
});

export default QuestionCardRenderer;
