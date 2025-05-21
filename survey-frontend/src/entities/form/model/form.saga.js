import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchFormById } from '@/entities/form/model/form.api';
import {
  setForm,
  fetchFormRequest,
  fetchFormSuccess,
  fetchFormFailure,
} from '@/entities/form/model/form.slice';
import { setQuestions } from '@/entities/question/model/question.slice';

export function* loadFormWithQuestionSaga(action) {
  try {
    const { formId } = action.payload;
    const { data } = yield call(fetchFormById, formId);
    const { questions, ...formData } = data;
    yield put(setForm(formData));
    yield put(setQuestions(questions));
    yield put(fetchFormSuccess());
  } catch (error) {
    yield put(fetchFormFailure(error));
  }
}

export default function* watchForm() {
  yield takeLatest(fetchFormRequest.type, loadFormWithQuestionSaga);
}
