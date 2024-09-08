import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, ToastAndroid, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormComponent from '@/components/FormComponent';
import ThemedButton from '@/components/ThemedButton';
import * as DocumentPicker from "expo-document-picker";
import { baseUrl } from '@/env.config';
import axios from 'axios';

interface Form {
  title: string;
  thumbnail: any;
}

const Create = () => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [form, setForm] = useState<Form>({
    title: '',
    thumbnail: null,
  });

  const openPicker = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });
    if (!result.canceled) {
      setForm({ ...form, thumbnail: result.assets[0] });
    }
  };

  const handleSubmit = async () => {
    if (!form.title || !form.thumbnail) {
      ToastAndroid.show('Please fill all fields', ToastAndroid.SHORT);
      return;
    }

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('thumbnail', {
      uri: form.thumbnail.uri,
      name: form.thumbnail.name || 'thumbnail.jpg', 
      type: form.thumbnail.mimeType || 'image/jpeg',
    } as unknown as Blob);

    setUploading(true);

    try {
      const axiosResponse = await axios.post(`${baseUrl}/user/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploading(false);

      if (axiosResponse.status === 201) {
        ToastAndroid.show('Post created successfully', ToastAndroid.SHORT);
        setForm({ title: '', thumbnail: null });
      } else {
        ToastAndroid.show(axiosResponse.data.message || 'Failed to create post', ToastAndroid.SHORT);
      }
    } catch (error: any) {
      console.log('Error:', error.message);
      setUploading(false);
      ToastAndroid.show('An error occurred. Please try again.', ToastAndroid.SHORT);
    }
  };
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView className='px-4 my-6'>
        <Text className='text-2xl text-white font-psemibold'>
          Create Post
        </Text>

        <FormComponent
          title="Image Title"
          value={form.title}
          placeholder='Enter Image Title...'
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles='mt-10'
        />
        <View className='mt-7 space-y-2'>
          <Text className='text-base text-gray-100 font-pmedium'>
            Upload Image
          </Text>
          <TouchableOpacity onPress={openPicker}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                style={{ width: '100%', height: 300, borderRadius: 16 }}
              />
            ) : (
              <View className='w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center'>
                <Text className='text-white'>Select Image</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <ThemedButton
          title={uploading ? <ActivityIndicator color="white" /> : 'Create Post'}
          handlePress={handleSubmit}
          containerStyles='mt-10'
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;