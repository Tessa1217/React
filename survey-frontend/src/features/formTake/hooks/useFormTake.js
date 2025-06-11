import { useImmer } from 'use-immer';
import { useCallback, useMemo } from 'react';

/**
 * 설문 응답 상태를 관리하는 커스텀 훅
 *
 * @param {Object} initial - 초기 응답 상태
 * @returns 응답 데이터, 업데이트 함수들
 */
export const useFormTake = (initial) => {
  const [formResponse, updateFormResponse] = useImmer(initial);

  /**
   * 질문 ID별 응답을 빠르게 찾기 위한 Map 생성
   * - answerMap: { [questionId]: answer }
   */
  const answerMap = useMemo(() => {
    const map = new Map();
    formResponse?.formAnswers?.forEach((a) => map.set(a.questionId, a));
    return map;
  }, [formResponse.formAnswers]);

  /**
   * 질문 ID로 응답 항목 찾기
   */
  const findQ = useCallback(
    (formAnswers, qId) => formAnswers.find((q) => q.questionId === qId),
    []
  );

  /**
   * 설문 데이터와 질문 리스트를 초기 응답 상태로 변환
   *
   * @param {Object} form - 설문 메타 정보
   * @param {Array} questions - 질문 리스트
   */
  const setFormResponse = useCallback(
    ({ form, questions }) => {
      updateFormResponse((draft) => {
        draft.formId = form.id;
        draft.formAnswers = questions?.map((q) => ({
          questionId: q.id,
          type: q.type,
          isRequired: q.isRequired,
          selectedOption: [],
          answerText: '',
        }));
      });
    },
    [updateFormResponse]
  );

  /**
   * 주관식 또는 서술형 답변 텍스트 업데이트
   */
  const updateAnswerText = useCallback(
    (qId, answerText) => {
      updateFormResponse((draft) => {
        const { formAnswers } = draft;
        const answer = findQ(formAnswers, qId);
        answer.answerText = answerText;
      });
    },
    [updateFormResponse, findQ]
  );

  /**
   * 단일 선택형 보기 응답 설정 (e.g., 라디오 버튼)
   *
   * @param {number} qId - 질문 ID
   * @param {number} optionId - 선택한 보기 ID
   * @param {boolean} isEtc - '기타' 항목 여부
   */
  const updateSelectedOption = useCallback(
    (qId, optionId, isEtc = false) => {
      updateFormResponse((draft) => {
        const { formAnswers } = draft;
        const answer = findQ(formAnswers, qId);
        if (!answer) return;
        answer.selectedOption = [{ optionId, isEtc }];
      });
    },
    [updateFormResponse, findQ]
  );

  /**
   * 다중 선택형 보기 응답 설정 (e.g., 체크박스)
   *
   * @param {number} qId - 질문 ID
   * @param {number} optionId - 선택/해제할 보기 ID
   * @param {boolean} checked - 체크 여부
   * @param {boolean} isEtc - '기타' 항목 여부
   */
  const updateSelectedOptions = useCallback(
    (qId, optionId, checked, isEtc = false) => {
      updateFormResponse((draft) => {
        const { formAnswers } = draft;
        const answer = findQ(formAnswers, qId);
        if (!answer) return;

        if (!Array.isArray(answer.selectedOption)) {
          answer.selectedOption = [];
        }
        const index = answer.selectedOption.indexOf(optionId);
        if (checked && index === -1) {
          answer.selectedOption.push({ optionId, isEtc });
        } else if (!checked && index !== -1) {
          answer.selectedOption.splice(index, 1);
        }
      });
    },
    [updateFormResponse, findQ]
  );

  return {
    formResponse,
    answerMap,
    setFormResponse,
    updateFormResponse,
    updateAnswerText,
    updateSelectedOption,
    updateSelectedOptions,
  };
};
