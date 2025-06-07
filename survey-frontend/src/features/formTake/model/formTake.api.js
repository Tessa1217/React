import client from '@/shared/api/client';

/**
 * 응답할 설문지 상세 조회 API
 * @param {Number} formId
 * @returns {Promise} 응답할 설문지 조회 정보
 */
export const fetchTakeFormById = (formId) => {
  return client.get(`/survey/response/take/${formId}`);
};

/**
 * 설문지 응답 저장 API
 * @param {Object} formData
 * @returns {Promise} 설문지 저장
 */
export const saveFormResponse = (formData) => {
  return client.post('/survey/response/ins', formData);
};
