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
    (id) => {
      updateQuestions((draft) => {
        const q = findQ(draft, id);
        if (q) {
          const newId = (q.options?.length || 0) + 1;
          if (!q.options) {
            q.options = [];
          }
          q.options.push({ id: newId, text: '', optionOrder: newId });
        }
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
