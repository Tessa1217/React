import CheckboxTaker from '@/entities/question/ui/take/CheckboxTaker';
import MultipleChoiceTaker from '@/entities/question/ui/take/MultipleChoiceTaker';
import DropdownTaker from '@/entities/question/ui/take/DropdownTaker';
import ParagraphTaker from '@/entities/question/ui/take/ParagraphTaker';
import ShortAnswerTaker from '@/entities/question/ui/take/ShortAnswerTaker';

export const QUESTION_TAKE_RENDERERS = {
  SHORT_ANSWER: ShortAnswerTaker,
  CHECKBOX: CheckboxTaker,
  MULTIPLE_CHOICE: MultipleChoiceTaker,
  DROPDOWN: DropdownTaker,
  PARAGRAPH: ParagraphTaker,
};
