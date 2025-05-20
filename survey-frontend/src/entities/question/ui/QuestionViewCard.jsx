import RequiredAsterick from '@/shared/ui/form/RequiredAsterick';
const QuestionCard = ({ children, questionText, required }) => {
  return (
    <div className='p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow space-y-6 w-full max-w-3xl mx-auto my-4'>
      <div className='flex gap-2 justify-between items-center'>
        {questionText} {required && <RequiredAsterick />}
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
  const questionType = () => {
    switch (type) {
      case 'short_text':
        return <ShortAnswer />;
      case 'checkbox':
        return <Checkbox id={id} options={options} />;
      case 'multiple_choice':
        return <MultipleChoice id={id} options={options} />;
      case 'dropdown':
        return <Dropdown options={options} />;
      case 'paragraph':
        return <Paragraph />;
      default:
        return <ShortAnswer />;
    }
  };
  return (
    <QuestionCard questionText={questionText} required={required}>
      {questionType()}
    </QuestionCard>
  );
};

export default QuestionViewCard;
