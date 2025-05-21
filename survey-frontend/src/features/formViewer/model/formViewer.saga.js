import { takeLatest } from 'redux-saga/effects';
import { createRequestSaga } from '@/shared/lib/createRequestSaga';
import {
  fetchFormListRequest,
  fetchFormListSuccess,
  fetchFormListFailure,
  fetchFormRequest,
  fetchFormSuccess,
  fetchFormFailure,
} from '@/features/formViewer/model/formViewer.slice';
import { getSurveyFormList } from '@/features/formViewer/model/formViewer.api';
import { fetchFormById } from '@/entities/form/model/form.api';

const fetchFormListSaga = createRequestSaga(
  getSurveyFormList,
  fetchFormListSuccess,
  fetchFormListFailure
);

const fetchFormSaga = createRequestSaga(
  fetchFormById,
  fetchFormSuccess,
  fetchFormFailure
);

export default function* watchFormViewer() {
  yield takeLatest(fetchFormListRequest.type, fetchFormListSaga);
  yield takeLatest(fetchFormRequest.type, fetchFormSaga);
}
