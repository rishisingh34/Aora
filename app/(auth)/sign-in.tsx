import { View, Text, SafeAreaView, ScrollView, Image, ToastAndroid, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { images } from '@/constants';
import FormComponent from '@/components/FormComponent';
import ThemedButton from '@/components/ThemedButton';
import { Link, router } from 'expo-router';
import { useAuth } from '@/context/AuthProvider';
import axios from 'axios';
import { baseUrl } from '@/env.config';

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const validateEmail = (email: String) => {
    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrors((prev) => ({ ...prev, email: 'Invalid email format' }));
    } else {
      setErrors((prev) => ({ ...prev, email: '' }));
    }
  };

  const validatePassword = (password : string ) => {
    if (password.length < 6) {
      setErrors((prev) => ({ ...prev, password: 'Password must be at least 6 characters' }));
    } else {
      setErrors((prev) => ({ ...prev, password: '' }));
    }
  };

  const submit = async () => {
    if (!form.email || !form.password || errors.email || errors.password) {
      ToastAndroid.show('Please fill all fields correctly', ToastAndroid.SHORT);
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, { ...form });
      if (response.status === 200) {
        const { token } = response.data;
        await login(token);
        ToastAndroid.show('Logged in successfully', ToastAndroid.SHORT);
        router.replace('/home');
      }
    } catch (err : any ) {
      ToastAndroid.show(err.message, ToastAndroid.SHORT);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[150px] h-[60px] border-2 border-red-200"
          />
          <Text className="text-2xl text-white font-psemibold mt-10">Log in to Pixx</Text>
          
          {/* Email Input */}
          <FormComponent
            title="Email"
            value={form.email}
            handleChangeText={(e) => {
              setForm({ ...form, email: e.trim() });
              validateEmail(e);
            }}
            handleBlur={() => validateEmail(form.email)}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          {/* Email Error/Success Message */}
          {errors.email ? (
            <Text className="text-red-500 mt-2">{errors.email}</Text>
          ) : form.email && !errors.email ? (
            <Text className="text-green-500 mt-2">Valid email</Text>
          ) : null}
          
          {/* Password Input */}
          <FormComponent
            title="Password"
            value={form.password}
            handleChangeText={(p) => {
              setForm({ ...form, password: p.trim() });
              validatePassword(p);
            }}
            handleBlur={() => validatePassword(form.password)}
            otherStyles="mt-7"
          />
          {/* Password Error/Success Message */}
          {errors.password ? (
            <Text className="text-red-500 mt-2">{errors.password}</Text>
          ) : form.password && !errors.password ? (
            <Text className="text-green-500 mt-2">Valid password</Text>
          ) : null}
          
          {/* Sign In Button */}
          <ThemedButton
            title={isSubmitting ? <ActivityIndicator color="white" /> : 'Sign In'}
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          {/* Sign Up Link */}
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">Don't have an account?</Text>
            <Link href="/sign-up" className="text-lg font-psemibold text-secondary">
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;