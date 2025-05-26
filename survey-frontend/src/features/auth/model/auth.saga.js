import { takeLatest } from 'redux-saga/effects';
import { createRequestSaga } from '@/shared/lib/createRequestSaga';
import {
  sendLoginRequest,
  sendLoginSuccess,
  sendLoginFailure,
  sendSignUpRequest,
  sendSignUpSuccess,
  sendSignUpFailure,
} from '@/features/auth/model/auth.slice';
import { sendLogin, sendSignUp } from '@/features/auth/model/auth.api';

const sendLoginSaga = createRequestSaga(
  sendLogin,
  sendLoginSuccess,
  sendLoginFailure,
  '로그인이 되었습니다.'
);

const sendSignUpSaga = createRequestSaga(
  sendSignUp,
  sendSignUpSuccess,
  sendSignUpFailure,
  '회원가입이 완료되었습니다.'
);

export default function* watchAuth() {
  yield takeLatest(sendLoginRequest.type, sendLoginSaga);
  yield takeLatest(sendSignUpRequest.type, sendSignUpSaga);
}
