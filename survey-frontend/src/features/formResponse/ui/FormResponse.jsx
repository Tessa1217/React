import { memo } from 'react';
import FormMetaRenderer from '@/entities/form/ui/FormMetaRenderer';
import QuestionCardRenderer from '@/entities/question/ui/QuestionCardRenderer';
import ButtonList from '@/shared/ui/common/ButtonList';

const FormResponse = memo(({ form, questionsWithAnswer, onCancel }) => {
  return (
    <div className='max-w-4xl mx-auto p-6 space-y-6'>
      <FormMetaRenderer {...form} />
      {questionsWithAnswer &&
        questionsWithAnswer.length > 0 &&
        questionsWithAnswer.map((question) => (
          <QuestionCardRenderer key={question.id} {...question} />
        ))}
      <div className='flex space-y-6 w-full max-w-3xl mx-auto justify-end-safe gap-2'>
        <ButtonList onListButtonClick={onCancel} size={20} />
      </div>
    </div>
  );
});
export default FormResponse;
