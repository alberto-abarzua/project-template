import { persistor } from '@/redux/store';
export const call_purge = () => {
    persistor.pause();
    persistor.flush().then(() => {
        return persistor.purge();
    });
};
