import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosClient from './api';

export async function isLoggedIn(): Promise<boolean> {
  const token = await AsyncStorage.getItem('token');
  console.log(
    '🚀 ~ file: auth.service.ts ~ line 6 ~ isLoggedIn ~ token',
    token,
  );
  return !!token;
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<boolean> {
  try {
    const resp = await axiosClient.post('auth/login', {email, password});
    console.log('🚀 ~ file: auth.service.ts ~ line 19 ~ resp', resp);
    if (!resp.data.token || resp.data.error) {
      return false;
    }
    await AsyncStorage.setItem('token', resp.data.token);
    return true;
  } catch (error) {
    console.log('🚀 ~ file: auth.service.ts ~ line 7 ~ login ~ error', error);
    return false;
  }
}

export async function signup({
  firstName,
  lastName,
  email,
  password,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): Promise<boolean> {
  try {
    const resp = await axiosClient.post('auth/login', {
      firstName,
      lastName,
      email,
      password,
    });
    if (!resp.data || resp.data.error) {
      return false;
    }
    return true;
  } catch (error) {
    console.log('🚀 ~ file: auth.service.ts ~ line 7 ~ login ~ error', error);
    return false;
  }
}
