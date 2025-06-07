import EditableQuestionCard from '@/entities/question/ui/edit/EditableQuestionCard';
import QuestionTakeCard from '@/entities/question/ui/take/QuestionTakeCard.jsx';
import QuestionCard from '@/entities/question/ui/view/QuestionCard';

export const MODE_QUESTION_COMPONENT_MAP = {
  edit: EditableQuestionCard,
  take: QuestionTakeCard,
  view: QuestionCard,
  preview: QuestionCard,
};
