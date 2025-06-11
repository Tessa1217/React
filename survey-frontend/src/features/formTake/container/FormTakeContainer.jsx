import { useNavigate, useParams } from 'react-router-dom';
import { useAppQuery } from '@/shared/hooks/useAppQuery';
import { fetchTakeFormById } from '@/features/formTake/model/formTake.api';
import { saveFormResponse } from '@/features/formTake/model/formTake.api';
import { useCallback, useEffect } from 'react';
import { useFormTake } from '@/features/formTake/hooks/useFormTake';
import { formResponseSchema } from '@/features/formTake/lib/formTakeSchema';
import FormTake from '@/features/formTake/ui/FormTake';
import { useFormSubmit } from '@/shared/hooks/useFormSubmit';

const FormTakeContainer = () => {
  const navigate = useNavigate();
  const { id: formId } = useParams();

  /**
   * 설문지 조회 (응답용)
   */
  const { data: response } = useAppQuery(
    ['response', formId],
    () => fetchTakeFormById(formId),
    { enabled: !!formId }
  );

  /**
   * 설문 응답 상태 관리 훅
   */
  const {
    formResponse,
    answerMap,
    setFormResponse,
    updateAnswerText,
    updateSelectedOption,
    updateSelectedOptions,
  } = useFormTake({});

  /**
   * 설문 데이터 로딩 시 응답 상태 초기화
   */
  useEffect(() => {
    if (response?.data) {
      const { questions, ...form } = response.data;
      setFormResponse({ form, questions });
    }
  }, [response, setFormResponse]);

  const { questions, ...form } = response?.data || {};

  /**
   * 취소 클릭 시 응답 목록으로 이동
   */
  const handleCancel = useCallback(() => navigate('/responses'), [navigate]);

  /**
   * 응답 제출 훅
   * - 유효성 검증 및 payload 전처리 후 서버에 저장
   */
  const { submit: handleSubmit, isSaving } = useFormSubmit({
    formPayload: formResponse,
    getPayload: () => ({
      ...formResponse,
      formAnswers: formResponse.formAnswers.map((answer) => ({
        ...answer,
        selectedOption: answer.selectedOption?.map((opt) =>
          typeof opt === 'object' ? opt.optionId : opt
        ),
      })),
    }),
    schema: formResponseSchema,
    mutateFn: saveFormResponse,
    doResetPaging: false,
    onSuccess: ({ data }) => {
      navigate(`/responses/${data}`, { replace: true });
    },
  });

  return (
    <FormTake
      form={form}
      questions={questions}
      formAnswers={answerMap}
      onAnswerTextChange={updateAnswerText}
      onSelectedOptionChange={updateSelectedOption}
      onSelectedOptionsChange={updateSelectedOptions}
      onSave={handleSubmit}
      onCancel={handleCancel}
      isSaving={isSaving}
    />
  );
};
export default FormTakeContainer;
