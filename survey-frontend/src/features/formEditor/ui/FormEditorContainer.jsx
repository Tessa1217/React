import { useState, useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import FormMetaRenderer from '@/entities/form/ui/FormMetaRenderer';
import QuestionCardRenderer from '@/entities/question/ui/QuestionCardRenderer';
import FormEditorSidebar from '@/features/formEditor/ui/FormEditorSidebar';
import ButtonSave from '@/shared/ui/common/ButtonSave';
import ButtonCancel from '@/shared/ui/common/ButtonCancel';
import { useImmer } from 'use-immer';
import { fetchFormById } from '@/entities/form/model/form.api';
import {
  saveForm,
  updateForm,
} from '@/features/formEditor/model/formEditor.api';
import { useAppQuery } from '@/shared/hooks/useAppQuery';
import { useAppMutation } from '@/shared/hooks/useAppMutation';

const FormEditorContainer = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id: formId } = useParams();
  const [form, setForm] = useState({
    title: '',
    description: '',
    isPublic: false,
    requiresLogin: false,
    expiresAt: '',
  });
  const [questions, updateQuestions] = useImmer([]);
  const [type, setType] = useState('MULTIPLE_CHOICE');

  const { data: response } = useAppQuery(
    ['formEdit', formId],
    () => fetchFormById(formId),
    { enabled: !!formId }
  );

  const { mutate } = useAppMutation(formId ? updateForm : saveForm, {
    onSuccess: () => {
      navigate('/forms');
    },
  });

  useEffect(() => {
    return () => {
      queryClient.removeQueries({
        queryKey: ['formEdit', formId],
        exact: true,
      });
    };
  }, [formId, queryClient]);

  useEffect(() => {
    if (formId && response?.data) {
      const { questions, ...rest } = response.data;
      setForm(rest);
      updateQuestions(() => questions || []);
    }
  }, [response, formId, updateQuestions]);

  const handleChange = useCallback(
    (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value })),
    []
  );

  const handleChangeCheckbox = useCallback(
    (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.checked })),
    []
  );

  const handleTypeChange = useCallback(setType, [setType]);

  const handleAddQuestion = useCallback(() => {
    updateQuestions((draft) => {
      const maxId = draft.length > 0 ? Math.max(...draft.map((q) => q.id)) : 0;
      draft.push({
        id: maxId + 1,
        type,
        questionText: '',
        isRequired: false,
        options: [],
      });
    });
  }, [updateQuestions, type]);

  const handleCancel = useCallback(() => navigate('/forms'), [navigate]);

  const findQuestionById = (draft, qId) => draft.find(({ id }) => id === qId);

  const handleQuestionTextChange = useCallback(
    (qId, text) => {
      updateQuestions((draft) => {
        const q = findQuestionById(draft, qId);
        if (q) q.questionText = text;
      });
    },
    [updateQuestions]
  );

  const handleRequiredChange = useCallback(
    (qId, isRequired) => {
      updateQuestions((draft) => {
        const q = findQuestionById(draft, qId);
        if (q) q.isRequired = isRequired;
      });
    },
    [updateQuestions]
  );

  const handleRemoveQuestion = useCallback(
    (qId) => {
      updateQuestions((draft) => {
        const idx = draft.findIndex((q) => q.id === qId);
        if (idx !== -1) draft.splice(idx, 1);
      });
    },
    [updateQuestions]
  );

  const handleAddOption = useCallback(
    (qId) => {
      updateQuestions((draft) => {
        const q = findQuestionById(draft, qId);
        if (q) {
          const newId = (q.options?.length || 0) + 1;
          q.options.push({ id: newId, text: '', optionOrder: newId });
        }
      });
    },
    [updateQuestions]
  );

  const handleOptionChange = useCallback(
    (qId, oId, optionText) => {
      updateQuestions((draft) => {
        const q = findQuestionById(draft, qId);
        if (q) {
          const opt = q.options.find((o) => o.id === oId);
          if (opt) opt.optionText = optionText;
        }
      });
    },
    [updateQuestions]
  );

  const handleRemoveOption = useCallback(
    (qId, oId) => {
      updateQuestions((draft) => {
        const q = findQuestionById(draft, qId);
        if (q) {
          q.options = q.options.filter((o) => o.id !== oId);
        }
      });
    },
    [updateQuestions]
  );

  const handleSaveForm = useCallback(() => {
    mutate({ ...form, questionList: [...questions] });
  }, [form, questions, mutate]);

  const renderedQuestions = useMemo(
    () =>
      questions.map((question) => (
        <QuestionCardRenderer
          key={question.id}
          {...question}
          onRemoveQuestion={() => handleRemoveQuestion(question.id)}
          handleQuestionTextChange={(text) =>
            handleQuestionTextChange(question.id, text)
          }
          handleRequiredChange={(req) => handleRequiredChange(question.id, req)}
          handleOptionChange={(oId, text) =>
            handleOptionChange(question.id, oId, text)
          }
          onAddOption={() => handleAddOption(question.id)}
          onRemoveOption={(oId) => handleRemoveOption(question.id, oId)}
        />
      )),
    [
      questions,
      handleRemoveQuestion,
      handleQuestionTextChange,
      handleRequiredChange,
      handleOptionChange,
      handleAddOption,
      handleRemoveOption,
    ]
  );

  return (
    <div className='relative min-h-screen bg-gray-100 py-12 px-6'>
      <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-8'>
        {/* 메인 컨텐츠 */}
        <main className='space-y-8'>
          <FormMetaRenderer
            {...form}
            onChange={handleChange}
            onChangeCheckbox={handleChangeCheckbox}
          />

          <section className='space-y-6'>{renderedQuestions}</section>

          <section className='flex justify-end gap-3 mt-6 mr-10'>
            <ButtonSave onSaveButtonClick={handleSaveForm} size={20} />
            <ButtonCancel onCancelButtonClick={handleCancel} size={20} />
          </section>
        </main>
        {/* 사이드바 */}
        <aside className='bg-white shadow-md rounded-xl p-6 h-fit sticky top-12'>
          <FormEditorSidebar
            type={type}
            onChange={handleTypeChange}
            onAddQuestion={handleAddQuestion}
          />
        </aside>
      </div>
    </div>
  );
};
export default FormEditorContainer;
