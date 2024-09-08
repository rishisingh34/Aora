import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, ToastAndroid } from 'react-native';
import { icons } from '@/constants';
import axios from 'axios';
import { baseUrl } from '@/env.config';

type ImageCardProps = {
  title: string;
  creator: string;
  avatar: string;
  thumbnail: string;
  isBookmarked: boolean;
  postId: string;
};

const ImageCard = ({ title, creator, avatar, thumbnail, isBookmarked: initialBookmarkStatus, postId }: ImageCardProps) => {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarkStatus);
  const [isLoading, setIsLoading] = useState(false);

  const handleBookmarkToggle = async () => {
    setIsLoading(true);
    const url = isBookmarked ? `${baseUrl}/user/bookmark/remove` : `${baseUrl}/user/bookmark/add`;
    try {
      const response = await axios.post(`${url}`, {
        postId, 
      })
      if(response.status != 200) { throw new Error('Failed to bookmark');}
      setIsBookmarked((prev) => !prev);
    } catch (error: any ) {
      ToastAndroid.show('Failed to bookmark', ToastAndroid.SHORT);        
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image source={{ uri: avatar }} className="w-full h-full rounded-lg" resizeMode="cover" />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text className="font-psemibold text-sm text-white" numberOfLines={1}>
              {title}
            </Text>
            <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>
              {creator}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <TouchableOpacity onPress={handleBookmarkToggle} disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" className="w-5 h-5" />
            ) : (
              <Image
                source={isBookmarked ? icons.bookmarked : icons.bookmark}
                className={isBookmarked ? "w-8 h-8": "w-5 h-5"}
                resizeMode="contain"
              />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center">
        <Image source={{ uri: thumbnail }} className="w-full h-full rounded-xl mt-3" resizeMode="cover" />
      </View>
    </View>
  );
};

export default ImageCard;
