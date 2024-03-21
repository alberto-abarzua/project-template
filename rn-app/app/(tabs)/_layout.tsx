import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import { useSelector } from 'react-redux';
import { Redirect } from 'expo-router';

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
    const insets = useSafeAreaInsets();
    console.log(insets);
    const { session } = useSelector(state => state.user);
    if (!session) {
        return <Redirect  href="/login" />;
    }
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors.light.tint,
            }}
            safeAreaInsets={{ top: insets.top, bottom: insets.bottom }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
                    headerRight: () => (
                        <Link href="/modal" asChild>
                            <Pressable>
                                {({ pressed }) => (
                                    <FontAwesome
                                        name="info-circle"
                                        size={25}
                                        color={Colors.light.tint}
                                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                                    />
                                )}
                            </Pressable>
                        </Link>
                    ),
                }}
            />
            <Tabs.Screen
                name="dates"
                options={{
                    headerShown: false,
                    title: 'Dates',
                    tabBarIcon: ({ color }) => <TabBarIcon name="calendar-o" color={color} />,
                }}
            />
            <Tabs.Screen
                name="coupons"
                options={{
                    headerShown: false,
                    title: 'Coupons',
                    tabBarIcon: ({ color }) => <TabBarIcon name="ticket" color={color} />,
                }}
            />
        </Tabs>
    );
}
