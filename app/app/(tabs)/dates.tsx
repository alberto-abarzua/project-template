
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';

export default function Dates() {
    const insets = useSafeAreaInsets();
    return (
        <View className="flex flex-row justify-start" style={{ paddingTop: insets.top }}>
            <Text className="text-3xl text-gray-800">Dates page!</Text>
        </View>
    );
}
