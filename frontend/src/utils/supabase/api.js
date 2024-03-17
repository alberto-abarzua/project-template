import axios from 'axios';
import store from '@/redux/store';
import { userSliceActions } from '@/redux/slices/userSlice';
import supabase from './client';

const baseUrl = import.meta.env.VITE_SUPABASE_URL + '/functions/v1/';

const api = axios.create({
    baseURL: baseUrl,
});

api.interceptors.request.use(async request => {
    const {
        user: { session },
    } = store.getState();

    if (session) {
        const { access_token: token, expires_at: expiresAt } = session;

        if (token) {
            const currentTime = Math.floor(Date.now() / 1000);
            const timeUntilExpiration = expiresAt - currentTime;

            if (timeUntilExpiration <= 60) {
                try {
                    const {
                        data: { session: refreshedSession },
                        error: refreshError,
                    } = await supabase.auth.refreshSession();

                    if (refreshError) {
                        console.error('Session refresh error:', refreshError);
                        store.dispatch(userSliceActions.logout());
                        return;
                    }

                    store.dispatch(userSliceActions.setUserSession(refreshedSession));
                    request.headers.Authorization = `Bearer ${refreshedSession.access_token}`;
                } catch (error) {
                    console.error('Error refreshing session:', error);
                    store.dispatch(userSliceActions.logout());
                    return;
                }
            } else {
                request.headers.Authorization = `Bearer ${token}`;
            }
        }
    } else {
        request.headers.Authorization = `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`;
    }

    return request;
});

api.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response && error.response.status === 401) {
            store.dispatch(userSliceActions.logout());
        }
        return Promise.reject(error);
    }
);

export default api;
