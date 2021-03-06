import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from '../navigation/RootNavigation';
import {User} from '../types/types';
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
  accountName,
  accountBalance,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accountName: string;
  accountBalance: number;
}): Promise<boolean> {
  try {
    const resp = await axiosClient.post('auth/register', {
      firstName,
      lastName,
      email,
      password,
      accountName,
      accountBalance,
    });
    console.log('🚀 ~ file: auth.service.ts ~ line 57 ~ resp', resp);
    if (!resp.data || resp.data.error) {
      return false;
    }
    await AsyncStorage.setItem('token', resp.data.token);
    return true;
  } catch (error) {
    console.log('🚀 ~ file: auth.service.ts ~ line 7 ~ login ~ error', error);
    return false;
  }
}

export async function getUser(): Promise<User | null> {
  try {
    const resp = await axiosClient.get('user/profile');
    console.log('🚀 ~ file: auth.service.ts ~ line 72 ~ getUser ~ resp', resp);
    return resp.data;
  } catch (error) {
    console.log('🚀 ~ file: auth.service.ts ~ line 7 ~ login ~ error', error);
    return null;
  }
}

export async function updateProfile(user: {
  user: Partial<User>;
}): Promise<User | null> {
  console.log('🚀 ~ file: auth.service.ts ~ line 84 ~ user', user);
  try {
    const resp = await axiosClient.put('user/profile', {...user});
    console.log('🚀 ~ file: auth.service.ts ~ line 72 ~ getUser ~ resp', resp);
    return resp.data;
  } catch (error) {
    console.log('🚀 ~ file: auth.service.ts ~ line 7 ~ login ~ error', error);
    return null;
  }
}

export async function logout() {
  await AsyncStorage.removeItem('token');
  navigate('Login');
}
