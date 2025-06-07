import { useNavigate, useParams } from 'react-router-dom';
import { useAppQuery } from '@/shared/hooks/useAppQuery';
import { fetchFormResponseById } from '@/features/formResponse/model/formResponse.api';
import { useCallback, useMemo } from 'react';
import FormResponse from '@/features/formResponse/ui/FormResponse';

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
    <FormResponse
      form={form}
      questionsWithAnswer={questionsWithAnswer}
      onCancel={handleCancel}
    />
  );
};
export default FormResponseContainer;
