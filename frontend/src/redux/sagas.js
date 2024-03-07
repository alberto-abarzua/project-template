import { all, delay, call, put, takeLatest } from 'redux-saga/effects';
import { userSliceActions } from './userSlice';
import supabase from '@/utils/supabase/client';
import { persistor } from './store';

const call_purge = persistor => {
    persistor.pause();
    persistor.flush().then(() => {
        return persistor.purge();
    });
};
function* handleLogout() {
    yield call([supabase.auth, supabase.auth.signOut]);
    yield call(call_purge, persistor);
}

function* innerRefreshSessionSaga() {
    const { data: user } = yield call([supabase.auth, supabase.auth.getUser]);
    if (!user) {
        yield put(userSliceActions.logout());
        return;
    }

    const { data, error } = yield call([supabase.auth, supabase.auth.getSession]);

    if (error) {
        console.error('Session refresh error:', error);
        yield put(userSliceActions.logout());
    } else {
        const { session } = data;
        yield put(userSliceActions.setUserSession(session));
    }
}

function* refreshSessionSaga() {
    while (true) {
        try {
            yield call(innerRefreshSessionSaga);
            yield delay(300000 * 3); // 5 minutes in milliseconds
        } catch (error) {
            console.error('Error refreshing session:', error);
            yield delay(30000); // 30 seconds in milliseconds
        }
    }
}

function* watchSessionUpdate() {
    yield takeLatest(userSliceActions.updateSession.type, innerRefreshSessionSaga);
}
function* watchLogout() {
    yield takeLatest(userSliceActions.logout.type, handleLogout);
}

export default function* rootSaga() {
    yield all([call(watchLogout), call(watchSessionUpdate), call(refreshSessionSaga)]);
}
