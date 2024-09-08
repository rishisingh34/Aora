import { ScrollView, View, Text, Image, ActivityIndicator } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';
import ThemedButton from '@/components/ThemedButton';
import { StatusBar } from 'expo-status-bar';
import { Redirect, router } from 'expo-router';
import { useAuth } from '@/context/AuthProvider';

const index = () => {
  const { token, loading } = useAuth();
  if (token && !loading) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="bg-primary h-full">
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ height: '100%' }}>
          <View className="w-full items-center justify-center h-full px-4">
            <Image
              source={images.logo}
              className="w-[160px] h-[90px]"
              resizeMode="contain"
            />
            <Image
              source={images.cards}
              className="max-w-[380px] w-full h-[300px]"
              resizeMode="contain"
            />
            <View>
              <Text className="text-3xl text-white font-bold text-center">
                Discover Endless Possibilities with{' '}
                <Text className="text-secondary-200">Pixx</Text>
              </Text>
              <Image
                source={images.path}
                className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
                resizeMode="contain"
              />
            </View>
            <ThemedButton
              title="Continue with Email"
              handlePress={() => router.push('/sign-in')}
              containerStyles="w-full mt-7"
            />
          </View>
        </ScrollView>
      )}
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default index;
