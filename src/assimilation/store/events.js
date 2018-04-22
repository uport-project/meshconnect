import { put } from 'redux-saga/effects';
import { dialogOpen } from 'store/departments/actions'
function* eventManager(metadata) {
  if (metadata.dialog) yield put(dialogOpen({payload:{foundry: metadata.dialog}}))
}

export default eventManager