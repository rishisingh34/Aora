import { View, Text ,Alert ,  TextInput, TouchableOpacity, Image } from 'react-native'
import{ useState } from 'react';
import {icons} from '@/constants'
import {router , usePathname } from 'expo-router';

type SearchInputProps = {
  initialQuery? : string[], 
}

const SearchInput = ({initialQuery }: SearchInputProps) => {

  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery?.join(' ') || '');

  return (
    <View className='border-2 border-spacing-12 border-black-100 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4'>
        <TextInput 
          className='flex-1 text-white mt-0.5 font-pregular text-base'
          value ={query} 
          placeholder="Search for an image topic"
          placeholderTextColor="#7B7B8B"
          onChangeText={(e)=> setQuery(e)}
        />
        
        <TouchableOpacity
          onPress={()=> {
            if(!query) {
              return Alert.alert('Please enter a search query')
            }
            if(pathname.startsWith('/search')) router.setParams({query});
            else router.push(`/search/${query}`)
          }}
        >
          <Image 
            source={icons.search}
            className='w-5 h-5'
            resizeMode='contain'
          />
        </TouchableOpacity>
      </View>      
  )
}

export default SearchInput