import {Record} from '../types/types';
import {CategoryDTO} from '../views/CategoryPicker/CategoryPicker';
import axiosClient from './api';

export async function getCategories(
  type: -1 | 0 | 1,
  parentId?: number,
): Promise<CategoryDTO[]> {
  try {
    const resp = await axiosClient.get('user/categories', {
      params: {parentId, type: type === 0 ? undefined : type},
    });
    console.log('🚀 ~ file: records.service.ts ~ line 12 ~ type', type);
    console.log(
      '🚀 ~ file: records.service.ts ~ line 7 ~ getRecords ~ resp',
      resp,
    );
    return resp.data;
  } catch (error) {
    console.log(
      '🚀 ~ file: records.service.ts ~ line 10 ~ getRecords ~ error',
      error,
    );
    return [];
  }
}

export async function getRecords(): Promise<Record[]> {
  try {
    const resp = await axiosClient.get('records/records');
    console.log(
      '🚀 ~ file: records.service.ts ~ line 7 ~ getRecords ~ resp',
      resp,
    );
    return resp.data;
  } catch (error) {
    console.log(
      '🚀 ~ file: records.service.ts ~ line 10 ~ getRecords ~ error',
      error,
    );
    return [];
  }
}

export async function addRecord({
  account,
  description,
  category,
  date,
  amount,
}: Record): Promise<Record | null> {
  try {
    const resp = await axiosClient.post('records/record', {
      accountId: account?.id,
      categoryId: category?.id,
      description,
      date,
      amount,
    });
    return resp.data;
  } catch (error) {
    console.log(
      '🚀 ~ file: records.service.ts ~ line 10 ~ getRecords ~ error',
      error,
    );
    return null;
  }
}
