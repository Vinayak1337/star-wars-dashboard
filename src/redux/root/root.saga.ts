import { all, call } from '@redux-saga/core/effects';
import appSaga from '../app/app.saga';

export default function* rootSaga() {
	yield all([call(appSaga)]);
}
