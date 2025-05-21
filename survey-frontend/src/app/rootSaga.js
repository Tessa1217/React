import { all } from 'redux-saga/effects';

import watchForm from '@/entities/form/model/form.saga';
import watchFormEditor from '@/features/formEditor/model/formEditor.saga';
import watchFormList from '@/features/formList/model/formList.saga';
export default function* rootSaga() {
  yield all([watchForm(), watchFormEditor(), watchFormList()]);
}
