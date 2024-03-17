import { all, call, takeLatest } from 'redux-saga/effects';
import { watchLogout, refreshSessionSaga } from '@/redux/sagas/userSagas';

function* startupSaga() {
    yield takeLatest('REHYDRATION_COMPLETE', function* () {
        console.log('REHYDRATION_COMPLETE');
        yield all([call(watchLogout), call(refreshSessionSaga)]);
    });
}

export default function* rootSaga() {
    yield all([call(startupSaga)]);
}
