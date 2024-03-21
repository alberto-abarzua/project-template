import { Text, View,Button } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { userSliceActions } from '@/redux/slices/userSlice';

export default function Home() {
    const dispatch = useDispatch();
    const insets = useSafeAreaInsets();
    const { session } = useSelector(state => state.user);
    const handleLogout = async () => {
        dispatch(userSliceActions.logout());
    };
    return (
        <View className="flex flex-col justify-start" style={{ paddingTop: insets.top }}>
            <Text className="text-3xl text-gray-800">Home page!</Text>

            <Text className="text-xs text-gray-800">Session: {JSON.stringify(session)}</Text>
            <Button onPress={handleLogout} title="Logout" />
        </View>
    );
}
