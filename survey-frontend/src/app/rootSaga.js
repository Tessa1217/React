import { all } from 'redux-saga/effects';

import watchFormEditor from '@/features/formEditor/model/formEditor.saga';
export default function* rootSaga() {
  yield all([watchFormEditor()]);
}
