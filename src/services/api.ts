import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export default axiosClient;
