import { takeLatest } from 'redux-saga/effects';
import { createRequestSaga } from '@/shared/lib/createRequestSaga';
import {
  fetchFormListRequest,
  fetchFormListSuccess,
  fetchFormListFailure,
} from '@/features/formViewer/model/formViewer.slice';
import {
  getSurveyForm,
  getSurveyFormList,
} from '@/features/formViewer/model/formViewer.api';

const fetchFormListSaga = createRequestSaga(
  getSurveyFormList,
  fetchFormListSuccess,
  fetchFormListFailure
);

export default function* watchFormViewer() {
  yield takeLatest(fetchFormListRequest.type, fetchFormListSaga);
}
