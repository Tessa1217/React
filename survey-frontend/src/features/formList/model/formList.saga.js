import { takeLatest } from 'redux-saga/effects';
import { createRequestSaga } from '@/shared/lib/createRequestSaga';
import {
  fetchFormListRequest,
  fetchFormListSuccess,
  fetchFormListFailure,
} from '@/features/formList/model/formList.slice';
import { fetchFormList } from '@/features/formList/model/formList.api';

const fetchFormListSaga = createRequestSaga(
  fetchFormList,
  fetchFormListSuccess,
  fetchFormListFailure
);

export default function* watchFormList() {
  yield takeLatest(fetchFormListRequest.type, fetchFormListSaga);
}
