import { useImmer } from 'use-immer';
import { useCallback, useMemo } from 'react';
export const useFormTake = (initial) => {
  const [formResponse, updateFormResponse] = useImmer(initial);

  const answerMap = useMemo(() => {
    const map = new Map();
    formResponse?.formAnswers?.forEach((a) => map.set(a.questionId, a));
    return map;
  }, [formResponse.formAnswers]);

  const findQ = useCallback(
    (formAnswers, qId) => formAnswers.find((q) => q.questionId === qId),
    []
  );

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
