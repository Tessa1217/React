import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  changeValue,
  resetForm,
  fetchFormRequest,
} from '@/entities/form/model/form.slice';
import {
  addQuestion,
  removeQuestion,
  changeQuestionText,
  changeRequired,
  addOption,
  removeOption,
  changeOption,
  resetQuestions,
} from '@/entities/question/model/question.slice';
import { selectForm } from '@/entities/form/model/form.selectors';
import { selectQuestions } from '@/entities/question/model/question.selectors';
import {
  updateFormRequest,
  saveFormRequest,
} from '@/features/formEditor/model/formEditor.slice';
import { HiCheckCircle } from 'react-icons/hi';
import FormMetaRenderer from '@/entities/form/ui/FormMetaRenderer';
import QuestionCardRenderer from '@/entities/question/ui/QuestionCardRenderer';
import FormEditorSidebar from '@/features/formEditor/ui/FormEditorSidebar';
import { FaTimesCircle } from 'react-icons/fa';

const FormEditorContainer = () => {
  const navigate = useNavigate();
  const { id: formId } = useParams();

  const isEditMode = Boolean(formId);

  const form = useSelector(selectForm);
  const questions = useSelector(selectQuestions);

  const [type, setType] = useState('MULTIPLE_CHOICE');

  const dispatch = useDispatch();

  useEffect(() => {
    if (isEditMode && formId) {
      dispatch(fetchFormRequest({ formId }));
    }
  }, [isEditMode, formId, dispatch]);

  const handleChange = useCallback(
    (id, value) => {
      dispatch(changeValue({ id, value }));
    },
    [dispatch]
  );

  const handleTypeChange = useCallback((type) => {
    setType(type);
  }, []);

  const handleAddQuestion = useCallback(() => {
    dispatch(addQuestion(type));
  }, [dispatch, type]);

  const resetSurveyForm = useCallback(() => {
    dispatch(resetForm());
    dispatch(resetQuestions());
  }, [dispatch]);

  const handleSaveAfter = useCallback(() => {
    resetSurveyForm();
    navigate('/forms');
  }, [resetSurveyForm, navigate]);

  const handleCancel = useCallback(() => {
    resetSurveyForm();
    navigate('/forms');
  }, [resetSurveyForm, navigate]);

  const generateFormData = useCallback(() => {
    return {
      ...form,
      questionList: questions,
    };
  }, [form, questions]);

  const handleSaveForm = useCallback(() => {
    const formData = generateFormData();
    const param = {
      param: formData,
      callbackFn: handleSaveAfter,
    };
    if (isEditMode) {
      dispatch(updateFormRequest(param));
    } else {
      dispatch(saveFormRequest(param));
    }
  }, [dispatch, handleSaveAfter, generateFormData, isEditMode]);

  return (
    <div className='relative'>
      <FormEditorSidebar
        type={type}
        onChange={handleTypeChange}
        onAddQuestion={handleAddQuestion}
      />
      <div className='max-w-4xl mx-auto p-6 space-y-6'>
        <FormMetaRenderer {...form} onChange={handleChange} />
        {questions.length > 0 &&
          questions.map((question) => (
            <QuestionCardRenderer
              key={question.id}
              {...question}
              onRemoveQuestion={() => dispatch(removeQuestion(question.id))}
              handleQuestionTextChange={(questionText) =>
                dispatch(changeQuestionText({ id: question.id, questionText }))
              }
              handleRequiredChange={(isRequired) =>
                dispatch(changeRequired({ id: question.id, isRequired }))
              }
              handleOptionChange={(optionId, optionText) =>
                dispatch(
                  changeOption({ id: question.id, optionId, optionText })
                )
              }
              onAddOption={() => dispatch(addOption(question.id))}
              onRemoveOption={(optionId) =>
                dispatch(removeOption({ id: question.id, optionId }))
              }
            />
          ))}
        <div className='flex space-y-6 w-full max-w-3xl mx-auto justify-end-safe gap-2'>
          <div>
            <button
              className='flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition cursor-pointer'
              onClick={() => handleSaveForm()}
            >
              저장 <HiCheckCircle size={20} />
            </button>
          </div>
          <div>
            <button
              className='flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition cursor-pointer'
              onClick={() => handleCancel()}
            >
              취소 <FaTimesCircle size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(FormEditorContainer);
