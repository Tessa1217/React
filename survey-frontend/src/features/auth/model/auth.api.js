import client from '@/shared/api/client';

/**
 * @description 회원가입 API
 * @param {Object} signUpForm
 * @returns {Promise} 회원가입 Promise
 */
export const sendSignUp = (signUpForm) => {
  return client.post('/user/signUp', signUpForm);
};

/**
 * @description 로그인 API
 * @param {Object} loginForm
 * @returns {Promise} 로그인 Promise
 */
export const sendLogin = (loginForm) => {
  return client.post('/user/login', loginForm);
};

/**
 * @description 이메일 중복 체크 API
 * @param {String} email
 * @returns {Promise} 이메일 중복 체크 Promise
 */
export const checkDuplicateEmail = (email) => {
  return client.get(`/user/exists/email/${email}`);
};

/**
 * @description 아이디 중복 체크 API
 * @param {String} userId
 * @returns {Promise} 아이디 중복 체크 Promise
 */
export const checkDuplicateUserId = (userId) => {
  return client.get(`/user/exists/userId/${userId}`);
};
