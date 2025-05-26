import client from '@/shared/api/client';

export const sendSignUp = (signUpForm) => {
  return client.post('/user/signUp', signUpForm);
};

export const sendLogin = (loginForm) => {
  return client.post('/user/login', loginForm);
};
