import rootSaga from '@/redux/sagas';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import userSliceReducer from '@/redux/slices/userSlice';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    // storage,
    // blacklist:[""] // add here the reducers you want to ignore
};

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
    user: userSliceReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    'persist/PERSIST',
                    'persist/REHYDRATE',
                    'persist/PAUSE',
                    'persist/PERSIST',
                    'persist/PURGE',
                    'persist/REGISTER',
                    'persist/FLUSH',
                ],
                ignoredPaths: ['some.path.to.ignore'], // Add paths to ignore here
            },
        }).prepend(sagaMiddleware),
});

export const persistor = persistStore(store, null, () => {
    store.dispatch({ type: 'REHYDRATION_COMPLETE' });
});


sagaMiddleware.run(rootSaga);

export default store;
