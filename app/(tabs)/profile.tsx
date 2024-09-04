import { router } from 'expo-router';
import React, { useEffect , useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Image, FlatList, TouchableOpacity, Text, ToastAndroid ,RefreshControl, ActivityIndicator} from 'react-native';
import { icons } from '@/constants';
import { useAuth } from '@/context/AuthProvider';
import EmptyState from '@/components/EmptyState';
import ImageCard from '@/components/ImageCard';
import InfoBox from '@/components/InfoBox';
import { getUserPosts } from '@/lib/api';
import useApi from '@/hooks/useApi';

type Post = {
  id: string;
  avatar: string;
  thumbnail: string;
  title: string;
  username: string;
  isBookmarked: boolean;  
};

const Profile = () => {

  const { logout } = useAuth();
  const { data, loading, refetch } = useApi<{ posts: Post[] }>(getUserPosts); 
  useEffect(()=> {
    refetch();
  }, []);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh =async ()=> {
    setRefreshing(true);
    await refetch(); 
    setRefreshing(false); 
  }

  const logoutHandler = async () => {
    try {
      await logout(); 
      router.replace("/sign-in");
    } catch (err : any ) {
      ToastAndroid.show(err.message, ToastAndroid.SHORT);
    }
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <FlatList 
          data={data?.posts ?? []}
          keyExtractor={(item)=> item.id}
          renderItem={({item}) => (
            <ImageCard 
              postId={item.id}
              title={item.title}
              thumbnail={item.thumbnail}
              creator={item.username}
              avatar={item.avatar}
              isBookmarked={item.isBookmarked}
            />
          )}
          ListEmptyComponent={()=> (
            <EmptyState 
              title="No images found"
              subtitle="No images found for the user"
            />
          )}
          ListHeaderComponent={() => (
            <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
              <View className="flex w-full items-end mb-10">
                <TouchableOpacity
                  onPress={logoutHandler}
                >
                  <Image 
                    source={icons.logout}
                    resizeMode="contain"
                    className="w-6 h-6"
                  />
                  <Text className='font-psemibold text-sm text-white'>
                    Logout
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
                <Image
                  source={{ uri: data?.posts[0].avatar }}
                  className="w-[90%] h-[90%] rounded-lg"
                  resizeMode="cover"
                />
              </View>

              <InfoBox 
                title={data?.posts[0].username || "User"}
                containerStyles="mt-5"
                titleStyles="text-lg"
              />

              <View>
                <InfoBox 
                  title={ (" " + data?.posts.length).trim() || "0"  } 
                  subtitle="Posts"
                  titleStyles="text-xl"
                />
              </View>

            </View>
          )}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      )}
    </SafeAreaView>
  )
}

export default Profile;