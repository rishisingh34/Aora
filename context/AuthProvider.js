import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';
import axios from 'axios';
import { getUserInfo } from '@/lib/api';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoading , setUserLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCurrentUser = async () => {
    try {
      setUserLoading(true);
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        setToken(token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;        
        const { user } = await getUserInfo();
        setUser(user);
      }
    } catch (error) {
      console.log('Error loading token:', error);
    } finally {
      setUserLoading(false);
      setLoading(false);  
    }
  };

  useEffect(() => {
    getCurrentUser(); 
  }, []);

  const login = async (token)=> {
    try {
      await AsyncStorage.setItem('authToken', token);   
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setToken(token);   
    } catch (err) {
      ToastAndroid.show(err.message, ToastAndroid.SHORT);
    }
  }

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      axios.defaults.headers.common['Authorization'] = '';
      setToken(null);
    } catch (err) {
      ToastAndroid.show(err.message, ToastAndroid.SHORT);
    }
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      token,
      login,
      loading ,
      logout,
      userLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;