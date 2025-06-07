import { useNavigate, useParams } from 'react-router-dom';
import { memo, useCallback } from 'react';
import { fetchFormById } from '@/entities/form/model/form.api';
import { useAppQuery } from '@/shared/hooks/useAppQuery';
import FormView from '@/features/formViewer/ui/FormView';

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

  return <FormView form={form} questions={questions} onCancel={handleCancel} />;
});

export default FormViewContainer;
