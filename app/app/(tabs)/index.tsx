import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Home() {
    const insets = useSafeAreaInsets();
    return (
        <View className="flex flex-row justify-start" style={{ paddingTop: insets.top }}>
            <Text className="text-3xl text-gray-800">Home page!</Text>
        </View>
    );
}
