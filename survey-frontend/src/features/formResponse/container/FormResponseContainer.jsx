import { useNavigate, useParams } from 'react-router-dom';
import { useAppQuery } from '@/shared/hooks/useAppQuery';
import { fetchFormResponseById } from '@/features/formResponse/model/formResponse.api';
import { useCallback, useMemo } from 'react';
import FormResponse from '@/features/formResponse/ui/FormResponse';

const key = 'response';

const FormResponseContainer = () => {
  const navigate = useNavigate();
  const { id: formId } = useParams();

  /**
   * 설문 응답 조회 API 호출
   * - formId가 존재할 때만 실행됨
   */
  const { data: response } = useAppQuery(
    [key, formId],
    () => fetchFormResponseById(formId),
    { enabled: !!formId }
  );

  const { form, answers } = response?.data || {};

  const { questions } = form || [];

  /**
   * 질문 리스트에 사용자의 응답을 결합한 구조 생성
   * - 각 질문 객체에 answer 속성 추가
   */
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

  /**
   * 취소 버튼 클릭 시 응답 목록으로 이동
   */
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
