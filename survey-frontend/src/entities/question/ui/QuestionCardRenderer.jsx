import { memo } from 'react';
import { useMode } from '@/shared/contexts/FormModeContext';
import { MODE_QUESTION_COMPONENT_MAP } from '@/entities/question/ui/questionComponentMap';

const QuestionCardRenderer = memo((props) => {
  const { mode } = useMode();
  const Component =
    MODE_QUESTION_COMPONENT_MAP[mode] || MODE_QUESTION_COMPONENT_MAP['view'];
  return <Component {...props} />;
});

export default QuestionCardRenderer;
