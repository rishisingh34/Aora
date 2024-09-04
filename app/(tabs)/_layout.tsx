import React from 'react'
import {Tabs  } from 'expo-router'; 
import { icons } from '@/constants'
import TabIcon from '@/components/TabIcon';

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel : false,
          tabBarActiveTintColor : '#FFA001', 
          tabBarInactiveTintColor : '#BDBDBD',
          tabBarStyle : {
            backgroundColor : '#161622',
            borderTopWidth : 1,
            borderTopColor : '#232533',
            height : 75
          }
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title : 'Home',
            headerShown : false,
            tabBarIcon : ({color , focused }) =>  (
              <TabIcon
                icon={icons.home}
                color={color} 
                name="Home"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name="bookmark"
          options={{
            title : 'Bookmark',
            headerShown : false,
            tabBarIcon : ({color , focused }) =>  (
              <TabIcon
                icon={icons.bookmark}
                color={color} 
                name="Bookmark"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title : 'Create',
            headerShown : false,
            tabBarIcon : ({color , focused }) =>  (
              <TabIcon
                icon={icons.plus}
                color={color} 
                name="Create"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title : 'Profile',
            headerShown : false,
            tabBarIcon : ({color , focused }) =>  (
              <TabIcon
                icon={icons.profile}
                color={color} 
                name="Profile"
                focused={focused}
              />
            )
          }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout