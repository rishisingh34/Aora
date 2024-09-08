import { View, Text, SafeAreaView, ScrollView, Image, ToastAndroid, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { images } from '@/constants';
import FormComponent from '@/components/FormComponent';
import ThemedButton from '@/components/ThemedButton';
import { Link, router } from 'expo-router';
import axios from 'axios';
import { baseUrl } from '@/env.config';

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
  });
  const validateUsername = (username: String ) => {
    if (username.trim().length < 3) {
      setErrors((prev) => ({ ...prev, username: 'Username must be at least 3 characters' }));
    } else {
      setErrors((prev) => ({ ...prev, username: '' }));
    }
  };

  const validateEmail = (email : String ) => {
    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrors((prev) => ({ ...prev, email: 'Invalid email format' }));
    } else {
      setErrors((prev) => ({ ...prev, email: '' }));
    }
  };

  const validatePassword = (password : String ) => {
    if (password.length < 6) {
      setErrors((prev) => ({ ...prev, password: 'Password must be at least 6 characters' }));
    } else {
      setErrors((prev) => ({ ...prev, password: '' }));
    }
  };

  const submit = async () => {
    if (!form.username || !form.email || !form.password || errors.username || errors.email || errors.password) {
      ToastAndroid.show('Please fill all fields correctly', ToastAndroid.SHORT);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${baseUrl}/auth/register`, { ...form });
      const { message } = response.data;
      if (response.status === 201) {
        ToastAndroid.show('User created successfully. Please verify your email.', ToastAndroid.LONG);
        router.push('/sign-in');
      } else {
        ToastAndroid.show(message || 'An error occurred during signup.', ToastAndroid.LONG);
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
        <View className="w-full justify-center h-full px-4 my-6">
          <Image source={images.logo} resizeMode="contain" className="w-[150px] h-[60px]" />
          <Text className="text-2xl text-white font-psemibold mt-10">Sign Up to Pixx</Text>

          <FormComponent
            title="Username"
            value={form.username}
            handleChangeText={(u) => {
              setForm({ ...form, username: u.trim() });
              validateUsername(u);
            }}
            otherStyles="mt-10"
          />
          {errors.username ? (
            <Text className="text-red-500 mt-2">{errors.username}</Text>
          ) : form.username && !errors.username ? (
            <Text className="text-green-500 mt-2">Valid username</Text>
          ) : null}

          <FormComponent
            title="Email"
            value={form.email}
            handleChangeText={(e) => {
              setForm({ ...form, email: e.trim() });
              validateEmail(e);
            }}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          {errors.email ? (
            <Text className="text-red-500 mt-2">{errors.email}</Text>
          ) : form.email && !errors.email ? (
            <Text className="text-green-500 mt-2">Valid email</Text>
          ) : null}

          <FormComponent
            title="Password"
            value={form.password}
            handleChangeText={(p) => {
              setForm({ ...form, password: p.trim() });
              validatePassword(p);
            }}
            otherStyles="mt-7"
          />
          {errors.password ? (
            <Text className="text-red-500 mt-2">{errors.password}</Text>
          ) : form.password && !errors.password ? (
            <Text className="text-green-500 mt-2">Valid password</Text>
          ) : null}

          <ThemedButton
            title={isSubmitting ? <ActivityIndicator color="white" /> : 'Sign Up'}
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">Have an account already?</Text>
            <Link href="/sign-in" className="text-lg font-psemibold text-secondary">
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;