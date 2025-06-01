import client from '@/shared/api/client';

/**
 * 설문지 응답 저장 API
 * @param {Object} formData
 * @returns {Promise} 설문지 저장
 */
export const saveFormResponse = (formData) => {
  return client.post('/survey/response/ins', formData);
};
