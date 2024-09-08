import { View, Text, Image  } from 'react-native'
import React from 'react'
import { images } from '@/constants'
import ThemedButton from '@/components/ThemedButton';
import { router } from 'expo-router';

type EmptyStateProps = {
  title : string,
  subtitle : string
}

const EmptyState = ({ title , subtitle } : EmptyStateProps) => {
  return (
    <View className='justify-center items-center px-4'>
      <Image  
        source={images.empty} className='w-[200px] h-[160px]'
        resizeMode='contain'
      />
      <Text className='font-pmedium text-sm text-gray-100'>
        {subtitle}        
      </Text>
      <Text className='font-psemibold text-xl text-center text-white mt-2'>
        {title}
      </Text>

      <ThemedButton
        title="Create a Post"
        handlePress={()=> router.push('/create')}
        containerStyles="w-full mt-3"
      />

    </View>    
  )
}

export default EmptyState