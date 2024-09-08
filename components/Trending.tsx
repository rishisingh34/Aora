import { View, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import TrendingItem from '@/components/TrendingItem';

type Post = {
  id: string;
  title: string;
  thumbnail: string;
  username: string;
  avatar: string;
};

type TrendingProps = {
  posts: Post[];
};

const Trending = ({ posts }: TrendingProps) => {
  const [activePost, setActivePost] = useState<Post | null>(null);

  useEffect(() => {
    if (posts.length > 0) {
      setActivePost(posts[0]);
    }
  }, [posts]);

  const viewablePostsChanged = ({ viewableItems }: { viewableItems: Array<{ item: Post }> }) => {
    if (viewableItems.length > 0) {
      setActivePost(viewableItems[0].item);
    }
  };

  if (!activePost) {
    return null;
  }

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(post) => post.id}
      renderItem={({ item }) => (
        <TrendingItem activePost={activePost} post={item} />
      )}
      onViewableItemsChanged={viewablePostsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170, y: 0 }}
      ListHeaderComponent={<View style={{ width: 16 }} />}
    />
  );
};

export default Trending;