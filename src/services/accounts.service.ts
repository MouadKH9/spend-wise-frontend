import {Account} from '../types/types';
import axiosClient from './api';

export async function getAccounts(): Promise<Account[]> {
  try {
    const resp = await axiosClient.get('user/accounts');
    return resp.data;
  } catch (error) {
    console.log(
      '🚀 ~ file: records.service.ts ~ line 10 ~ getRecords ~ error',
      error,
    );
    return [];
  }
}

export async function addAccount(account: Account): Promise<Account | null> {
  try {
    const resp = await axiosClient.post('user/account', account);
    return resp.data;
  } catch (error) {
    console.log(
      '🚀 ~ file: records.service.ts ~ line 10 ~ getRecords ~ error',
      error,
    );
    return null;
  }
}

export async function updateAccount(account: Account): Promise<Account | null> {
  try {
    const resp = await axiosClient.put(`user/account/${account.id}`, account);
    return resp.data;
  } catch (error) {
    console.log(
      '🚀 ~ file: records.service.ts ~ line 10 ~ getRecords ~ error',
      error,
    );
    return null;
  }
}

export async function deleteAccount(id: number): Promise<boolean> {
  try {
    await axiosClient.delete(`user/account/${id}`);
    return true;
  } catch (error) {
    console.log(
      '🚀 ~ file: records.service.ts ~ line 10 ~ getRecords ~ error',
      error,
    );
    return false;
  }
}
