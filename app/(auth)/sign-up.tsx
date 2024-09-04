import { View, Text, SafeAreaView, ScrollView , Image, ToastAndroid ,ActivityIndicator} from 'react-native'
import React, {useState} from 'react';
import {images} from '@/constants'
import FormComponent from '@/components/FormComponent'
import ThemedButton from '@/components/ThemedButton';
import { Link, router } from 'expo-router';
import axios from 'axios';
import { baseUrl } from '@/env.config';

const SignUp = () => {
  const [form, setForm] = useState({
    username : "",    
    email : '', 
    password : ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    if(!form.username || !form.email || !form.password){
      ToastAndroid.show('Please fill all fields', ToastAndroid.SHORT);
      return
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${baseUrl}/auth/register`, { ...form});
      console.log(response.data);
      
      const { message } = response.data; 
    if (response.status == 201 ) {
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
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height : '100%'}}>
        <View className="w-full justify-center  h-full px-4 my-6">
          <Image 
            source={images.logo}
            resizeMode='contain'
            className='w-[150px] h-[60px]'
          />
          <Text className="text-2xl text-white  font-psemibold mt-10">
            Sign Up to Pixx
          </Text>
          <FormComponent
            title="Username"
            value={form.username}
            handleChangeText={(u)=> {
              setForm({...form, username : u})
            }}
            otherStyles="mt-10"
          />
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
            title={isSubmitting ? <ActivityIndicator color="white" /> : 'Sign Up'}
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Have an account already? 
            </Text>
            <Link href="/sign-in" className='text-lg font-psemibold text-secondary'>
              Sign In
            </Link>

          </View>
        </View>
      </ScrollView>


    </SafeAreaView>
  )
}

export default SignUp;