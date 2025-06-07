import { useState, useCallback } from 'react';

export const useFormMeta = (initialForm) => {
  const [form, setForm] = useState(initialForm);

  const handleChange = useCallback(
    (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value })),
    []
  );

  const handleChangeCheckbox = useCallback(
    (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.checked })),
    []
  );

  return { form, setForm, handleChange, handleChangeCheckbox };
};
