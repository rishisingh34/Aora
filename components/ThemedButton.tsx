import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

type ThemedButtonProps = {
  title : string | JSX.Element , 
  handlePress : () => void,
  containerStyles? : Object,
  textStyles? : Object ,
  isLoading? : boolean
}

const ThemedButton = ({title,  handlePress, containerStyles, textStyles, isLoading}: ThemedButtonProps) => {
  return (
    <TouchableOpacity className={`bg-secondary    rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
      disabled={isLoading}
      onPress={handlePress}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default ThemedButton