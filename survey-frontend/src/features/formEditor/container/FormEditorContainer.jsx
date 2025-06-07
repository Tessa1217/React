import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppQuery } from '@/shared/hooks/useAppQuery';
import { fetchFormById } from '@/entities/form/model/form.api';
import { useFormMeta } from '@/features/formEditor/hooks/useFormMeta';
import { useQuestionEditor } from '@/features/formEditor/hooks/useQuestionEditor';
import { useFormSubmit } from '@/shared/hooks/useFormSubmit';
import { formSchema } from '@/features/formEditor/lib/formEditorSchema';
import {
  saveForm,
  updateForm,
} from '@/features/formEditor/model/formEditor.api';
import FormEditor from '@/features/formEditor/ui/FormEditor';

const FormEditorContainer = () => {
  const navigate = useNavigate();
  const { id: formId } = useParams();

  const { form, setForm, handleChange, handleChangeCheckbox } = useFormMeta({
    title: '',
    description: '',
    isPublic: false,
    requiresLogin: false,
    expiresAt: '',
  });

  const [type, setType] = useState('MULTIPLE_CHOICE');

  const setTypeChange = useCallback((type) => setType(type), []);

  const {
    questions,
    setQuestions,
    addQuestion,
    removeQuestion,
    updateQuestionText,
    updateRequired,
    addOption,
    updateOptionText,
    removeOption,
  } = useQuestionEditor([]);

  const { data: response } = useAppQuery(
    ['formEdit', formId],
    () => fetchFormById(formId),
    { enabled: !!formId }
  );

  useEffect(() => {
    if (formId && response?.data) {
      const {
        questions,
        id,
        title = '',
        description = '',
        isPublic = false,
        requiresLogin = false,
        expiresAt = '',
      } = response.data;
      setForm({ id, title, description, isPublic, requiresLogin, expiresAt });
      setQuestions(questions || []);
    }
  }, [response, formId, setForm, setQuestions]);

  const handleCancel = useCallback(() => navigate('/forms'), [navigate]);

  const { submit: handleSubmit } = useFormSubmit({
    formPayload: { ...form, questionList: [...questions] },
    schema: formSchema,
    mutateFn: formId ? updateForm : saveForm,
    doResetPaging: formId ? false : true,
    onSuccess: () => {
      navigate('/forms');
    },
  });

  return (
    <FormEditor
      form={form}
      onChange={handleChange}
      onChangeCheckbox={handleChangeCheckbox}
      questions={questions}
      onAddQuestion={addQuestion}
      onRemoveQuestion={removeQuestion}
      onQuestionTextChange={updateQuestionText}
      onRequiredChange={updateRequired}
      onAddOption={addOption}
      onOptionTextChange={updateOptionText}
      onRemoveOption={removeOption}
      type={type}
      onTypeChange={setTypeChange}
      onSave={handleSubmit}
      onCancel={handleCancel}
    />
  );
};
export default FormEditorContainer;
