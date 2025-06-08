import { useImmer } from 'use-immer';
import { useCallback } from 'react';

export const useQuestionEditor = (initial) => {
  const [questions, updateQuestions] = useImmer(initial);

  const setQuestions = useCallback(
    (newQs) => updateQuestions(() => newQs),
    [updateQuestions]
  );

  const findQ = useCallback((draft, id) => draft.find((q) => q.id === id), []);

  const addQuestion = useCallback(
    (type) => {
      updateQuestions((draft) => {
        const maxId = draft.length ? Math.max(...draft.map((q) => q.id)) : 0;
        draft.push({
          id: maxId + 1,
          type,
          questionText: '',
          questionOrder: maxId + 1,
          isRequired: false,
        });
      });
    },
    [updateQuestions]
  );

  const removeQuestion = useCallback(
    (id) => {
      updateQuestions((draft) => {
        const idx = draft.findIndex((q) => q.id === id);
        if (idx != -1) {
          draft.splice(idx, 1);
        }
      });
    },
    [updateQuestions]
  );

  const updateQuestionText = useCallback(
    (id, text) => {
      updateQuestions((draft) => {
        const q = findQ(draft, id);
        if (q) {
          q.questionText = text;
        }
      });
    },
    [findQ, updateQuestions]
  );

  const updateRequired = useCallback(
    (id, required) => {
      updateQuestions((draft) => {
        const q = findQ(draft, id);
        if (q) {
          q.isRequired = required;
        }
      });
    },
    [findQ, updateQuestions]
  );

  const addOption = useCallback(
    (id, isEtc = false) => {
      updateQuestions((draft) => {
        const q = findQ(draft, id);
        if (!q) return;

        if (!q.options) {
          q.options = [];
        }

        // isEtc 옵션이 이미 있는 경우
        let etcOption = null;
        const index = q.options.findIndex((opt) => opt.isEtc);
        if (isEtc && index !== -1) {
          // 옵션이 있는데 추가하려는 경우
          return;
        }

        if (index !== -1) {
          // 옵션 객체 맨마지막으로 위치 시키기 위해 splice 처리
          etcOption = q.options.splice(index, 1)[0];
        }

        // isEtc 옵션 다시 추가
        if (isEtc) {
          const etcId = q.options.length + 1;
          q.options.push({
            id: etcId,
            optionText: '기타',
            optionOrder: etcId,
            isEtc: true,
          });
        } else {
          // 일반 옵션 추가
          const newId = q.options.length + 1;
          q.options.push({
            id: newId,
            optionText: '',
            optionOrder: newId,
            isEtc: false,
          });
          if (etcOption) {
            q.options.push(etcOption);
          }
        }

        // 전체 순서 재정렬
        q.options.forEach((opt, idx) => {
          opt.optionOrder = idx + 1;
        });
      });
    },
    [findQ, updateQuestions]
  );

  const updateOptionText = useCallback(
    (qid, oid, text) => {
      updateQuestions((draft) => {
        const q = findQ(draft, qid);
        const opt = q?.options?.find((o) => o.id === oid);
        if (opt) opt.optionText = text;
      });
    },
    [findQ, updateQuestions]
  );

  const removeOption = useCallback(
    (qid, oid) => {
      updateQuestions((draft) => {
        const q = findQ(draft, qid);
        if (q) q.options = q.options.filter((o) => o.id !== oid);
      });
    },
    [findQ, updateQuestions]
  );

  return {
    questions,
    setQuestions,
    addQuestion,
    removeQuestion,
    updateQuestionText,
    updateRequired,
    addOption,
    updateOptionText,
    removeOption,
  };
};
