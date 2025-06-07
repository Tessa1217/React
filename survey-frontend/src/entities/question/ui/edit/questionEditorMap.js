import CheckboxEditor from '@/entities/question/ui/edit/CheckboxEditor';
import DropdownEditor from '@/entities/question/ui/edit/DropdownEditor';
import MultipleChoiceEditor from '@/entities/question/ui/edit/MultipleChoiceEditor';
import ParagraphEditor from '@/entities/question/ui/edit/ParagraphEditor';
import ShortAnswerEditor from '@/entities/question/ui/edit/ShortAnswerEditor';

export const QUESTION_EDIT_RENDERERS = {
  SHORT_ANSWER: ShortAnswerEditor,
  CHECKBOX: CheckboxEditor,
  MULTIPLE_CHOICE: MultipleChoiceEditor,
  DROPDOWN: DropdownEditor,
  PARAGRAPH: ParagraphEditor,
};
