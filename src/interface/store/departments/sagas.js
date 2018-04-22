import { all } from 'redux-saga/effects';
import notifications from './notifications/sagas'
import assimilation from 'assimilation/store/sagas'
export default function* rootSaga() {
  yield all([
    notifications(),
    ...assimilation
  ]);
}