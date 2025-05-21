import { useMode } from '@/shared/contexts/FormModeContext';
import RequiredAsterick from '@/shared/ui/form/RequiredAsterick';
import ShortAnswerViewer from '@/entities/question/ui/view/ShortAnswerViewer';
import CheckboxViewer from '@/entities/question/ui/view/CheckboxViewer';
import ParagraphViewer from '@/entities/question/ui/view/ParagraphViewer';
import DropdownViewer from '@/entities/question/ui/view/DropdownViewer';
import MultipleChoiceViewer from '@/entities/question/ui/view/MultipleChoiceViewer';
import { FaQuestion } from 'react-icons/fa';

const QuestionCard = ({ children, questionText, required }) => {
  return (
    <div className='p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow space-y-6 w-full max-w-3xl mx-auto my-4'>
      <div className='flex gap-2 justify-between items-center text-lg font-medium text-gray-800'>
        <div className='flex gap-2 items-center'>
          <FaQuestion size={15} color={'red'} />
          {questionText} {required && <RequiredAsterick />}
        </div>
      </div>
      {children}
    </div>
  );
};

const QuestionViewCard = ({
  id,
  questionText,
  required,
  type,
  options = [],
}) => {
  const { mode } = useMode();
  const questionType = () => {
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
  };
  return (
    <QuestionCard questionText={questionText} required={required}>
      {questionType()}
    </QuestionCard>
  );
};

export default QuestionViewCard;
