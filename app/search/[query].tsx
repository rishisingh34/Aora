import { View, Text , FlatList, ActivityIndicator, Image} from 'react-native'
import {useState, useEffect } from 'react'
import {SafeAreaView} from 'react-native-safe-area-context' 
import SearchInput from '@/components/SearchInput'
import EmptyState from '@/components/EmptyState';
import ImageCard from '@/components/ImageCard';
import { useLocalSearchParams } from 'expo-router'
import useApi from '@/hooks/useApi';
import { searchPosts } from '@/lib/api';

type Post = {
  id: string;
  avatar: string;
  thumbnail: string;
  title: string;
  username: string;
  isBookmarked: boolean;
};

const Search = () => {
  const { query } = useLocalSearchParams();
  const searchQuery = Array.isArray(query) ? query : [query];
  const { data, loading , refetch } = useApi<{ posts: Post[] }>(() => searchPosts(searchQuery));

  useEffect(()=> {
    refetch(); 
  }, [query]);

  return (
    <SafeAreaView className='bg-primary h-full'>
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ):(
        <FlatList 
          data={data?.posts}
          keyExtractor={(item) => item.id}
          renderItem={({item})=>(
            <ImageCard 
              postId={item.id}
              title={item.title}
              thumbnail={item.thumbnail}
              creator={item.username}
              avatar={item.avatar}
              isBookmarked={item.isBookmarked}
            />
          )}
          ListHeaderComponent={()=> (
            <>
              <View className="flex my-6 px-4">
                <Text className="font-pmedium text-gray-100 text-sm">
                  Search Results
                </Text>
                <Text className="text-2xl font-psemibold text-white mt-1">
                  {query}
                </Text>

                <View className="mt-6 mb-8">
                  <SearchInput initialQuery={searchQuery}  />
                </View>
              </View>
            </>
          )}
          ListEmptyComponent={()=> (
            <EmptyState 
              title="No images found"
              subtitle="No images found for the search query"
            />
          )}
        />
      )}
    </SafeAreaView>
  )
}

export default Search; 