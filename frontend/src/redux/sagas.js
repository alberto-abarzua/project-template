import { all, call } from 'redux-saga/effects';
import { watchLogout, refreshSessionSaga } from '@/redux/sagas/userSagas';

export default function* rootSaga() {
    yield all([call(watchLogout), call(refreshSessionSaga)]);
}
