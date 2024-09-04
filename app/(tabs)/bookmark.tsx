import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Image, FlatList, TouchableOpacity, Text , RefreshControl, ActivityIndicator} from 'react-native';
import { icons } from '@/constants';
import EmptyState from '@/components/EmptyState';
import ImageCard from '@/components/ImageCard';
import InfoBox from '@/components/InfoBox';
import { fetchBookmarks } from '@/lib/api';
import useApi from '@/hooks/useApi';
import { useState, useEffect } from 'react';

type Post = {
  id: string;
  avatar: string;
  thumbnail: string;
  title: string;
  username: string;
  isBookmarked: boolean;
};

const Bookmark  = () => {
  const { data, loading, refetch } = useApi<{ posts: Post[] }>(fetchBookmarks);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh =async ()=> {
    setRefreshing(true);
    await refetch(); 
    setRefreshing(false); 
  }
  useEffect(()=> {
    refetch();
  }, [])
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
              subtitle="No images saved in the bookmark"
            />
          )}
          ListHeaderComponent={() => (
            <View className="w-full flex-row items-center gap-6 mt-6 mb-12 px-4">
              <Image
                source={icons.bookmark}
                resizeMode="contain"
                className="w-7 h-7"
              />
              <Text className='font-psemibold text-2xl text-white'>
                Bookmarks
              </Text>
            </View>
          )}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      )}
      
    </SafeAreaView>
  )
}

export default Bookmark;