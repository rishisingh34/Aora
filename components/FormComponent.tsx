import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { Key, useState } from 'react';
import { icons } from '@/constants';

type FormComponentProps = {
  title: string;
  value: string;
  placeholder?: string;
  handleChangeText: (e: string) => void;
  handleBlur?: () => void; 
  otherStyles?: string;
  keyboardType?: TextInput['props']['keyboardType'];
};

const FormComponent = ({
  title,
  value,
  placeholder,
  handleChangeText,
  handleBlur, 
  otherStyles,
  keyboardType,
  ...props
}: FormComponentProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="border-2 border-spacing-12 border-black-100 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          onBlur={handleBlur}
          secureTextEntry={title === 'Password' && !showPassword}
          keyboardType={keyboardType}
          {...props}
        />

        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-8 h-8"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormComponent;