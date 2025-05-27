import { useNavigate, useParams } from 'react-router-dom';
import { memo, useCallback } from 'react';
import { fetchFormById } from '@/entities/form/model/form.api';
import { useAppQuery } from '@/shared/hooks/useAppQuery';
import FormMetaRenderer from '@/entities/form/ui/FormMetaRenderer';
import QuestionCardRenderer from '@/entities/question/ui/QuestionCardRenderer';

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
    <div className='max-w-4xl mx-auto p-6 space-y-6'>
      <FormMetaRenderer {...form} />
      {questions &&
        questions.length > 0 &&
        questions.map((question) => (
          <QuestionCardRenderer key={question.id} {...question} />
        ))}
      <div className='flex space-y-6 w-full max-w-3xl mx-auto justify-end-safe gap-2'>
        <button
          className='flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition cursor-pointer'
          onClick={() => handleCancel()}
        >
          목록
        </button>
      </div>
    </div>
  );
});

export default FormViewContainer;
