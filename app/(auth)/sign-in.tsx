import { View, Text, SafeAreaView, ScrollView , Image, ToastAndroid, ActivityIndicator } from 'react-native'
import React, {useState} from 'react';
import {images} from '@/constants'
import FormComponent from '@/components/FormComponent'
import ThemedButton from '@/components/ThemedButton';
import { Link, router } from 'expo-router';
import { useAuth } from '@/context/AuthProvider';
import axios from 'axios';
import { baseUrl } from '@/env.config';

const SignIn = () => {
  const [form, setForm] = useState({
    email : '', 
    password : ''
  });

  const {login} = useAuth(); 
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    if(!form.email || !form.password){
      ToastAndroid.show('Please fill all fields', ToastAndroid.SHORT);
      return; 
    }
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, { ...form}); 
      if( response.status == 200) {
        const { token } = response.data; 
        login(token); 
        ToastAndroid.show('Logged in successfully', ToastAndroid.SHORT);
      }
      router.replace('/home'); 

    } catch (err : any ) {
      ToastAndroid.show(err.message, ToastAndroid.SHORT);
    } finally {
      setIsSubmitting(false); 
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height : '100%'}}>
        <View className="w-full justify-center  min-h-[85vh] px-4 my-6">
          <Image 
            source={images.logo}
            resizeMode='contain'
            className='w-[150px] h-[60px] border-2 border-red-200'

          />
          <Text className="text-2xl text-white  font-psemibold mt-10">
            Log in to Pixx
          </Text>
          <FormComponent
            title="Email"
            value={form.email}
            handleChangeText={(e)=> {
              setForm({...form, email : e})
            }}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormComponent
            title="Password"
            value={form.password}
            handleChangeText={(p)=> {
              setForm({...form, password : p})
            }}
            otherStyles="mt-7"
          />

          <ThemedButton
            title={isSubmitting ? <ActivityIndicator color="white" /> : 'Sign In'}
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Don't have an account? 
            </Text>
            <Link href="/sign-up" className='text-lg font-psemibold text-secondary'>
              Sign Up
            </Link>

          </View>
        </View>
      </ScrollView>


    </SafeAreaView>
  )
}

export default SignIn