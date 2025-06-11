import { useState, useCallback } from 'react';

/**
 * 설문 기본 정보 상태 관리용 커스텀 훅
 *
 * @param {Object} initialForm - 초기 설문 정보 객체 (예: title, description 등)
 * @returns {{
 *   form: Object,
 *   setForm: Function,
 *   handleChange: Function,
 *   handleChangeCheckbox: Function
 * }}
 */
export const useFormMeta = (initialForm) => {
  const [form, setForm] = useState(initialForm);

  /**
   * 텍스트 입력 필드 변경 핸들러
   * - name 속성에 따라 해당 필드를 업데이트
   */
  const handleChange = useCallback(
    (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value })),
    []
  );

  /**
   * 체크박스 입력 필드 변경 핸들러
   * - name 속성에 따라 해당 불리언 필드를 업데이트
   */
  const handleChangeCheckbox = useCallback(
    (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.checked })),
    []
  );

  return { form, setForm, handleChange, handleChangeCheckbox };
};
