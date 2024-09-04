import { View, Text , FlatList, Image, RefreshControl , ActivityIndicator} from 'react-native'
import {useState} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import { images } from '@/constants'  
import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending'
import EmptyState from '@/components/EmptyState';
import ImageCard from '@/components/ImageCard';
import { getAllPosts, getLatestPosts} from '@/lib/api';
import useApi from '@/hooks/useApi';
import { useAuth } from '@/context/AuthProvider'

type Post = {
  id: string;
  avatar: string;
  thumbnail: string;
  title: string;
  username: string;
  isBookmarked: boolean;
};

const Home = () => {
  const { user, userLoading  } = useAuth();
  const { data, loading , refetch } = useApi<{ posts: Post[] }>(getAllPosts);
  const { data: latestPosts, loading : loadingLatest } = useApi<{ posts: Post[] }>(getLatestPosts);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh =async ()=> {
    setRefreshing(true);
    await refetch(); 
    setRefreshing(false); 
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <FlatList
          data={data?.posts ?? []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ImageCard
              postId={item.id}
              title={item.title}
              thumbnail={item.thumbnail}
              creator={item.username}
              avatar={item.avatar}
              isBookmarked = {item.isBookmarked}
            />
          )}
          ListHeaderComponent={() => (
            <View className="my-6 px-4 space-y-6">
              <View className="justify-between items-start flex-row mb-6">
                <View>
                  <Text className="font-pmedium text-sm text-gray-100">
                    Welcome back,
                  </Text>
                  {userLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text className="text-2xl font-psemibold text-white">
                      {user.username}
                    </Text>
                  )}
                </View>

                <View className="mt-1.5">
                  <Image
                    source={images.logoSmall}
                    className="w-12 h-11"
                    resizeMode="contain"
                  />
                </View>
              </View>

              <SearchInput />
              <View>
                <Text className="text-gray-100 text-lg font-pregular mb-3">
                  Latest AI Pics
                </Text>
                {loadingLatest ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Trending posts={latestPosts?.posts ?? []} />
                )}
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title="No posts found"
              subtitle="Be the first to upload a post"
            />
          )}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      )}
    </SafeAreaView>
  )
}

export default Home