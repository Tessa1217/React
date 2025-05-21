import { call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

/**
 * 공통 요청 사가 생성기
 * @param {Function} apiFn - 호출할 API 함수
 * @param {Function} successAction - 성공 시 dispatch할 액션
 * @param {Function} failureAction - 실패 시 dispatch할 액션
 * @param {Function} callbackFn - 콜백 함수
 * @param {string} successMessage - 성공 토스트 메시지 (선택)
 */
export function createRequestSaga(
  apiFn,
  successAction,
  failureAction,
  successMessage
) {
  return function* (action) {
    try {
      const { payload = { param: '' } } = action;
      const { param, callbackFn } = payload;

      const response = yield call(apiFn, param);
      yield put(successAction(response));
      if (successMessage) {
        toast.success(successMessage);
      }
      if (callbackFn && callbackFn instanceof Function) {
        yield call(callbackFn, response.data);
      }
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || '요청 실패';
      yield put(failureAction(message));
      toast.error(message);
    }
  };
}
