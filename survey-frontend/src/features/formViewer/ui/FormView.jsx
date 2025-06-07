import { memo } from 'react';
import FormMetaRenderer from '@/entities/form/ui/FormMetaRenderer';
import QuestionCardRenderer from '@/entities/question/ui/QuestionCardRenderer';
import ButtonList from '@/shared/ui/common/ButtonList';

const FormView = memo(({ form, questions, onCancel }) => {
  return (
    <div className='min-h-screen bg-gray-50 py-10 px-4'>
      <div className='max-w-4xl mx-auto space-y-8'>
        <FormMetaRenderer {...form} />
        {questions?.map((question) => (
          <QuestionCardRenderer key={question.id} {...question} />
        ))}
        <div className='flex justify-end gap-3 mt-8 mr-10'>
          <ButtonList size={20} onListButtonClick={onCancel} />
        </div>
      </div>
    </div>
  );
});
export default FormView;
