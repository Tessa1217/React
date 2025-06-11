import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppQuery } from '@/shared/hooks/useAppQuery';
import { fetchFormById } from '@/entities/form/model/form.api';
import { useFormMeta } from '@/features/formEditor/hooks/useFormMeta';
import { useQuestionEditor } from '@/features/formEditor/hooks/useQuestionEditor';
import { useFormSubmit } from '@/shared/hooks/useFormSubmit';
import useFormConfirm, { ConfirmType } from '@/shared/hooks/useFormConfirm';
import { formSchema } from '@/features/formEditor/lib/formEditorSchema';
import {
  saveForm,
  updateForm,
} from '@/features/formEditor/model/formEditor.api';
import FormEditor from '@/features/formEditor/ui/FormEditor';

const FormEditorContainer = () => {
  const navigate = useNavigate();
  const { id: formId } = useParams();
  const showConfirmModal = useFormConfirm();

  /**
   * 설문 기본 정보 상태 (제목, 설명, 공개여부 등)
   */
  const { form, setForm, handleChange, handleChangeCheckbox } = useFormMeta({
    title: '',
    description: '',
    isPublic: false,
    requiresLogin: false,
    expiresAt: '',
  });

  const [type, setType] = useState('MULTIPLE_CHOICE');

  const setTypeChange = useCallback((type) => setType(type), []);

  /**
   * 질문 관련 상태 및 편집 핸들러
   */
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

  /**
   * 수정 모드일 경우 기존 설문 데이터를 가져오기
   */
  const { data: response } = useAppQuery(
    ['formEdit', formId],
    () => fetchFormById(formId),
    { enabled: !!formId }
  );

  /**
   * 폼 및 질문 초기값 설정 (수정 모드일 경우만 실행)
   */
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

  /**
   * 취소 버튼 클릭 시 설문 목록으로 이동
   */
  const handleCancel = useCallback(() => navigate('/forms'), [navigate]);

  /**
   * 저장 핸들러: 새로 저장 또는 업데이트
   */
  const { submit: handleSubmit } = useFormSubmit({
    formPayload: { ...form, questionList: [...questions] },
    schema: formSchema,
    mutateFn: formId ? updateForm : saveForm,
    doResetPaging: formId ? false : true,
    onSuccess: () => {
      navigate('/forms');
    },
  });

  /**
   * 저장 버튼 클릭 시 확인 모달 → 확인 시 저장 실행
   */
  const handleSave = useCallback(() => {
    showConfirmModal(ConfirmType.SAVE).then((result) => {
      if (result) handleSubmit();
    });
  }, [showConfirmModal, handleSubmit]);

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
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
};
export default FormEditorContainer;
