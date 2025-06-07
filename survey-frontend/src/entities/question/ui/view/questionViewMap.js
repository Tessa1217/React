import CheckboxViewer from '@/entities/question/ui/view/CheckboxViewer';
import MultipleChoiceViewer from '@/entities/question/ui/view/MultipleChoiceViewer';
import DropdownViewer from '@/entities/question/ui/view/DropdownViewer';
import ParagraphViewer from '@/entities/question/ui/view/ParagraphViewer';
import ShortAnswerViewer from '@/entities/question/ui/view/ShortAnswerViewer';

export const QUESTION_VIEW_RENDERERS = {
  SHORT_ANSWER: ShortAnswerViewer,
  CHECKBOX: CheckboxViewer,
  MULTIPLE_CHOICE: MultipleChoiceViewer,
  DROPDOWN: DropdownViewer,
  PARAGRAPH: ParagraphViewer,
};
