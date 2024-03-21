import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { router, Stack } from 'expo-router';
import { z } from 'zod';
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userSliceActions } from '@/redux/slices/userSlice';
import supabase from '@/utils/supabase/client';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const StyledView = View;
const StyledText = Text;
const StyledTextInput = TextInput;
const StyledTouchableOpacity = TouchableOpacity;

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
            <StyledView className="flex h-full w-full flex-col items-center justify-center">
                <StyledView className=" w-full px-4">
                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <StyledView>
                                <StyledText className="text-gray-800">Email</StyledText>
                                <StyledTextInput
                                    className="rounded-md border border-gray-300 px-4 py-2 text-gray-800"
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                                {errors.email && (
                                    <StyledText className="text-red-500">
                                        {errors.email.message}
                                    </StyledText>
                                )}
                            </StyledView>
                        )}
                    />
                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <StyledView className="mt-4">
                                <StyledText className="text-gray-800">Password</StyledText>
                                <StyledTextInput
                                    className="rounded-md border border-gray-300 px-4 py-2 text-gray-800"
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    secureTextEntry
                                />
                                {errors.password && (
                                    <StyledText className="text-red-500">
                                        {errors.password.message}
                                    </StyledText>
                                )}
                            </StyledView>
                        )}
                    />
                </StyledView>

                <StyledTouchableOpacity
                    className="mx-5 mt-4 w-[90%] rounded-md bg-green-600 px-4 py-2 hover:bg-green-700"
                    disabled={loading}
                    onPress={handleSubmit(onSubmit)}
                >
                    <StyledText className="text-center font-bold text-white">
                        {loading ? 'Loading...' : 'Login'}
                    </StyledText>
                </StyledTouchableOpacity>
            </StyledView>
        </>
    );
};

export default LoginForm;
