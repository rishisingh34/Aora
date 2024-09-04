import axios from 'axios';
import { baseUrl } from '../env.config';

export async function getAllPosts() {
  try{
    const response = await axios.get(`${baseUrl}/user/posts/all`); 
    return response.data;
  } catch (err) {
    return err.response.data;
  }
}

export async function getUserPosts() {
  try {
    const response = await axios.get(`${baseUrl}/user/profile`);
    return response.data;
  } catch (err) {
    return err.response.data;
  }
}

export async function getLatestPosts() {
  try {
    const response = await axios.get(`${baseUrl}/user/posts/latest`);
    return response.data;
  } catch (err) {
    return err.response.data;
  }
}

export async function getUserInfo(){
  try {
    const response = await axios.get(`${baseUrl}/user/info`);
    return response.data;
  } catch (err) {
    return err.response.data;
  }
}

export async function searchPosts(query){
  try {
    const response = await axios.get(`${baseUrl}/user/posts/search?title=${query}`);
    return response.data;
  } catch (err) {
    return err.response.data;
  }
}
export async function fetchBookmarks() {
  try {
    const response = await axios.get(`${baseUrl}/user/bookmarks`);
    return response.data;
  } catch (err) {
    return err.response.data;
  }
}