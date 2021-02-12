import {Record} from '../types/types';
import axiosClient from './api';

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
