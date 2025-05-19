import { takeLatest } from 'redux-saga/effects';
import { createRequestSaga } from '@/shared/lib/createRequestSaga';
import {
  saveFormRequest,
  saveFormSuccess,
  saveFormFailure,
} from '@/features/formEditor/model/formEditor.slice';
import { saveForm } from '@/features/formEditor/model/formEditor.api';

const saveFormSaga = createRequestSaga(
  saveForm,
  saveFormSuccess,
  saveFormFailure,
  '폼이 성공적으로 저장되었습니다.'
);

export default function* watchFormEditor() {
  yield takeLatest(saveFormRequest.type, saveFormSaga);
}
