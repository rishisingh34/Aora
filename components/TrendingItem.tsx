import { useEffect } from 'react';
import { Image, TextStyle, ViewStyle, ImageStyle, ImageSourcePropType } from 'react-native';
import * as Animatable from 'react-native-animatable';

type TrendingItemProps = {
  post: {
    id: string;
    title: string;
    thumbnail: string;
    username: string;
    avatar: string;
  };
  activePost: {
    id: string;
    title: string;
    thumbnail: string;
    username: string;
    avatar: string;
  };
};

const zoomIn: Animatable.CustomAnimation<TextStyle & ViewStyle & ImageStyle> = {
  0: {
    scaleX: 0.9,
    scaleY: 0.9,
  },
  1: {
    scaleX: 1.1,
    scaleY: 1.1,
  },
};

const zoomOut: Animatable.CustomAnimation<TextStyle & ViewStyle & ImageStyle> = {
  0: {
    scaleX: 1.1,
    scaleY: 1.1,
  },
  1: {
    scaleX: 0.9,
    scaleY: 0.9,
  },
};

const TrendingItem = ({ activePost, post }: TrendingItemProps) => {


  return (
    <Animatable.View
      style={{ marginRight: 20 }}
      animation={activePost.id === post.id ? zoomIn : zoomOut }
      duration={500}
    >
      <Image
        source={{ uri: post.thumbnail }}
        style={{
          width: 200,
          height: 288,
          borderRadius: 33,
          marginVertical: 20,
          overflow: 'hidden',
          shadowColor: 'black',
          shadowOpacity: 0.4,
          shadowRadius: 10,
        }}
        resizeMode="cover"
      />
    </Animatable.View>
  );
};

export default TrendingItem;