import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logout} from './auth.service';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/api/',
  headers: {
    Accept: 'application/json',
  },
});

axiosClient.interceptors.request.use(async (config) => {
  if (!config.url?.includes('auth')) {
    console.log('Including the token');

    const token = await AsyncStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (resp) => {
    return resp;
  },
  (error) => {
    if (error.response.status === 401) {
      logout();
    }
  },
);

export default axiosClient;
