import axiosClient from './api';

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<boolean> {
  try {
    const resp = await axiosClient.post('auth/login', {email, password});
    if (!resp.data || resp.data.error) {
      return false;
    }
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
