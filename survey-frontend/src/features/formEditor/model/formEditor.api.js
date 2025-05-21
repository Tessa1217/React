import client from '@/shared/api/client';

/**
 * 설문지 저장 API
 * @param {Object} formData
 * @returns {Promise} 설문지 저장
 */
export const saveForm = (formData) => {
  return client.post('/survey/form/ins', formData);
};

/**
 * 설문지 수정 API
 * @param {Object} formData
 * @returns {Promise} 설문지 저장
 */
export const updateForm = (formData) => {
  return client.post('/survey/form/upd', formData);
};
