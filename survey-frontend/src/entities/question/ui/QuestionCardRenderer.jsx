import { useMode } from '@/shared/contexts/FormModeContext';
import EditableQuestionCard from './edit/EditableQuestionCard';
import QuestionCard from '@/entities/question/ui/view/QuestionCard';
const QuestionCardRenderer = (props) => {
  const { mode } = useMode();
  console.log(props);
  if (mode === 'edit') {
    return <EditableQuestionCard {...props} />;
  }
  return <QuestionCard {...props} />;
};

export default QuestionCardRenderer;
