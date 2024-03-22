import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { router, Stack } from 'expo-router';
import { z } from 'zod';
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userSliceActions } from '@/redux/slices/userSlice';
import supabase from '@/utils/supabase/client';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3),
});

const LoginForm = () => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async form_data => {
        setLoading(true);
        const { email, password } = form_data;
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            setLoading(false);
            // Handle error without using toast
            console.error(error.message);
            return;
        }
        dispatch(userSliceActions.setUserSession(data.session));
        router.replace('/');

        setLoading(false);
    };

    return (
        <>
            <Stack.Screen options={{ title: 'Login' }} />
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View className="flex h-full w-full flex-col items-center gap-5">
                    <View className="mt-32 flex w-full flex-col gap-y-4 px-4">
                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <View>
                                    <Text className="text-gray-800">Email</Text>
                                    <TextInput
                                        className="rounded-md border border-gray-300 px-4 py-2 text-gray-800"
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        blurOnSubmit={false}
                                        returnKeyType="next"
                                    />
                                    {errors.email && (
                                        <Text className="text-red-500">{errors.email.message}</Text>
                                    )}
                                </View>
                            )}
                        />
                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <View className="mt-4">
                                    <Text className="text-gray-800">Password</Text>
                                    <TextInput
                                        className="rounded-md border border-gray-300 px-4 py-2 text-gray-800"
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        secureTextEntry
                                        blurOnSubmit={true}
                                        returnKeyType="done"
                                    />
                                    {errors.password && (
                                        <Text className="text-red-500">
                                            {errors.password.message}
                                        </Text>
                                    )}
                                </View>
                            )}
                        />
                    </View>

                    <TouchableOpacity
                        className="mx-5 mt-4 w-[90%] rounded-md bg-green-600 px-4 py-2 hover:bg-green-700"
                        disabled={loading}
                        onPress={handleSubmit(onSubmit)}
                    >
                        <Text className="text-center font-bold text-white">
                            {loading ? 'Loading...' : 'Login'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </>
    );
};

export default LoginForm;
