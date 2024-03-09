import { delay, call, put, takelatest } from 'redux-saga/effects';

import { usersliceactions } from '@/redux/slices/userslice';

import supabase from '@/utils/supabase/client';

import { persistor } from '@/redux/store';

const call_purge = persistor => {
    // clear redux store
    persistor.pause();
    persistor.flush().then(() => {
        return persistor.purge();
    });
};

function* handlelogout() {
    yield call([supabase.auth, supabase.auth.signout]);
    yield call(call_purge, persistor);
}

export function* refreshsessionsaga() {
    while (true) {
        try {
            const {
                data: { session },
            } = yield call([supabase.auth, supabase.auth.getsession]);

            yield put(usersliceactions.setusersession(session));

            if (session) {
                const timeuntilexpiration =
                    new date(session.expires_at).gettime() - new date().gettime();

                if (timeuntilexpiration > 200) {
                    yield delay(timeuntilexpiration * 1000 * 0.6);
                }

                const {
                    data: { session: refreshedsession },
                    error: refresherror,
                } = yield call([supabase.auth, supabase.auth.refreshsession]);

                if (refresherror) {
                    console.error('session refresh error:', refresherror);
                    yield put(usersliceactions.logout());
                } else {
                    yield put(usersliceactions.setusersession(refreshedsession));
                }
            } else {
                yield delay(5000);
                continue;
            }
        } catch (error) {
            console.error('error refreshing session:', error);
            yield delay(5000);
            continue;
        }
    }
}

export function* watchsessionupdate() {
    yield takelatest(usersliceactions.updatesession.type, refreshsessionsaga);
}

export function* watchlogout() {
    yield takelatest(usersliceactions.logout.type, handlelogout);
}
