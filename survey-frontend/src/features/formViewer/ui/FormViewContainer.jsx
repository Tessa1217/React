import { useNavigate, useParams } from 'react-router-dom';
import { memo, useCallback } from 'react';
import { fetchFormById } from '@/entities/form/model/form.api';
import { useAppQuery } from '@/shared/hooks/useAppQuery';
import FormMetaRenderer from '@/entities/form/ui/FormMetaRenderer';
import QuestionCardRenderer from '@/entities/question/ui/QuestionCardRenderer';
import ButtonList from '@/shared/ui/common/ButtonList';

const FormViewContainer = memo(() => {
  const navigate = useNavigate();
  const { id: formId } = useParams();

  const { data: response } = useAppQuery(
    ['formView', formId],
    () => fetchFormById(formId),
    { enabled: !!formId }
  );

  const { questions, ...form } = response?.data || {};

  const handleCancel = useCallback(() => navigate('/forms'), [navigate]);

  return (
    <div className='min-h-screen bg-gray-50 py-10 px-4'>
      <div className='max-w-4xl mx-auto space-y-8'>
        <FormMetaRenderer {...form} />
        {questions?.map((question) => (
          <QuestionCardRenderer key={question.id} {...question} />
        ))}
        <div className='flex justify-end gap-3 mt-8 mr-10'>
          <ButtonList size={20} onListButtonClick={handleCancel} />
        </div>
      </div>
    </div>
  );
});

export default FormViewContainer;
