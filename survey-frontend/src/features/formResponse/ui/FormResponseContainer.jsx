import { useNavigate, useParams } from 'react-router-dom';
import { useAppQuery } from '@/shared/hooks/useAppQuery';
import { fetchFormResponseById } from '@/features/formResponse/model/formResponse.api';
import FormMetaRenderer from '@/entities/form/ui/FormMetaRenderer';
import QuestionCardRenderer from '@/entities/question/ui/QuestionCardRenderer';
import { useCallback, useMemo } from 'react';

const key = 'response';

const FormResponseContainer = () => {
  const navigate = useNavigate();
  const { id: formId } = useParams();
  const { data: response } = useAppQuery(
    [key, formId],
    () => fetchFormResponseById(formId),
    { enabled: !!formId }
  );

  const { form, answers } = response?.data || {};

  const { questions } = form || [];

  const questionsWithAnswer = useMemo(() => {
    if (!questions && !answers) {
      return null;
    }
    questions.map((q) => {
      const answer = answers.find((a) => q.id == a.questionId);
      if (answer) {
        q.answer = answer;
      }
      return q;
    });

    return questions;
  }, [questions, answers]);

  const handleCancel = useCallback(() => navigate('/responses'), [navigate]);

  return (
    <div className='max-w-4xl mx-auto p-6 space-y-6'>
      <FormMetaRenderer {...form} />
      {questionsWithAnswer &&
        questionsWithAnswer.length > 0 &&
        questionsWithAnswer.map((question) => (
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
};
export default FormResponseContainer;
