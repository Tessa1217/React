import { useNavigate, useParams } from 'react-router-dom';
import { useAppQuery } from '@/shared/hooks/useAppQuery';
import { useAppMutation } from '@/shared/hooks/useAppMutation';
import { fetchFormById } from '@/entities/form/model/form.api';
import { saveFormResponse } from '@/features/formTake/model/formTake.api';
import FormMetaRenderer from '@/entities/form/ui/FormMetaRenderer';
import QuestionCardRenderer from '@/entities/question/ui/QuestionCardRenderer';
import { useCallback, useEffect } from 'react';
import { useImmer } from 'use-immer';

const key = 'response';

const FormTakeContainer = () => {
  const navigate = useNavigate();
  const { id: formId } = useParams();
  const { data: response } = useAppQuery(
    [key, formId],
    () => fetchFormById(formId),
    { enabled: !!formId }
  );

  const [formResponse, updateFormResponse] = useImmer({});

  useEffect(() => {
    const { questions, ...form } = response?.data || {};
    if (form) {
      updateFormResponse((draft) => {
        draft.formId = form.id;
        draft.formAnswers = questions?.map((q) => {
          return { questionId: q.id, type: q.type, selectedOption: [] };
        });
      });
    }
  }, [response, updateFormResponse]);

  const { questions, ...form } = response?.data || {};

  const findQuestion = useCallback(
    (formAnswers, qId) => formAnswers.find((a) => a.questionId === qId),
    []
  );

  const handleCancel = useCallback(() => navigate('/responses'), [navigate]);

  const handleAnswerTextChange = useCallback(
    (qId, answerText) => {
      updateFormResponse((draft) => {
        const { formAnswers } = draft;
        const answer = findQuestion(formAnswers, qId);
        answer.answerText = answerText;
      });
    },
    [updateFormResponse, findQuestion]
  );

  const handleSelectedOptionChange = useCallback(
    (qId, optionId) => {
      updateFormResponse((draft) => {
        const { formAnswers } = draft;
        const answer = findQuestion(formAnswers, qId);
        if (!answer) return;
        answer.selectedOption = [optionId];
      });
    },
    [updateFormResponse, findQuestion]
  );

  const handleSelectedOptionsChange = useCallback(
    (qId, optionId, checked) => {
      updateFormResponse((draft) => {
        const { formAnswers } = draft;
        const answer = findQuestion(formAnswers, qId);
        if (!answer) return;

        if (!Array.isArray(answer.selectedOption)) {
          answer.selectedOption = [];
        }
        const index = answer.selectedOption.indexOf(optionId);
        if (checked && index === -1) {
          answer.selectedOption.push(optionId);
        } else if (!checked && index !== -1) {
          answer.selectedOption.splice(index, 1);
        }
      });
    },
    [updateFormResponse, findQuestion]
  );

  console.log(formResponse);

  const { mutate, isPending } = useAppMutation(saveFormResponse, {
    onSuccess: ({ data }) => {
      navigate(`/responses/${data}`);
    },
  });

  const saveResponse = useCallback(() => {
    mutate(formResponse);
  }, [mutate, formResponse]);

  return (
    <div className='max-w-4xl mx-auto p-6 space-y-6'>
      <FormMetaRenderer {...form} />
      {questions &&
        questions.length > 0 &&
        questions.map((question) => {
          const answer = formResponse?.formAnswers?.find(
            (a) => a.questionId === question.id
          );
          return (
            <QuestionCardRenderer
              key={question.id}
              {...question}
              {...answer}
              onAnswerTextChange={handleAnswerTextChange}
              onSelectedOptionChange={handleSelectedOptionChange}
              onSelectedOptionsChange={handleSelectedOptionsChange}
            />
          );
        })}
      <div className='flex w-full max-w-3xl mx-auto justify-end gap-3'>
        <button
          className='flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-2xl shadow-md transition-colors duration-200'
          onClick={() => saveResponse()}
          disabled={isPending}
        >
          {isPending ? '등록 중...' : '등록'}
        </button>
        <button
          className='flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-2xl shadow-sm transition-colors duration-200'
          onClick={() => handleCancel()}
        >
          목록
        </button>
      </div>
    </div>
  );
};
export default FormTakeContainer;
