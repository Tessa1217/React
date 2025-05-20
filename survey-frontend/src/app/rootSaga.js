import { all } from 'redux-saga/effects';

import watchFormEditor from '@/features/formEditor/model/formEditor.saga';
import watchFormViewer from '@/features/formViewer/model/formViewer.saga';

export default function* rootSaga() {
  yield all([watchFormEditor(), watchFormViewer()]);
}
