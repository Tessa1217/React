import { useNavigate, useParams } from 'react-router-dom';
import { memo, useCallback } from 'react';
import { fetchFormById } from '@/entities/form/model/form.api';
import { useAppQuery } from '@/shared/hooks/useAppQuery';
import FormView from '@/features/formViewer/ui/FormView';

/**
 * 설문 조회 컨테이너 컴포넌트 (읽기 전용)
 */
const FormViewContainer = memo(() => {
  const navigate = useNavigate();
  const { id: formId } = useParams();

  /**
   * 설문 데이터 조회 (formId가 있을 경우만 실행)
   */
  const { data: response } = useAppQuery(
    ['formView', formId],
    () => fetchFormById(formId),
    { enabled: !!formId }
  );

  const { questions, ...form } = response?.data || {};

  /**
   * 취소 버튼 클릭 시 설문 목록으로 이동
   */
  const handleCancel = useCallback(() => navigate('/forms'), [navigate]);

  return <FormView form={form} questions={questions} onCancel={handleCancel} />;
});

export default FormViewContainer;
