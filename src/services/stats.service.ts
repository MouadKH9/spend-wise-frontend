import moment from 'moment';
import {DATE_FORMAT} from '../constants';
import axiosClient from './api';

export async function getActivityPerPeriod(
  period: string,
  start?: string,
  end?: string,
): Promise<any> {
  try {
    if (!start)
      start = moment(new Date())
        .add(
          period === 'weekly' ? -60 : period === 'monthly' ? -120 : -15,
          'day',
        )
        .format(DATE_FORMAT);
    if (!end) end = moment(new Date()).format(DATE_FORMAT);
    console.log(period, start, end);

    const resp = await axiosClient.get('stats/activity/' + period, {
      params: {start, end},
    });
    return resp.data;
  } catch (error) {
    console.log(
      '🚀 ~ file: records.service.ts ~ line 10 ~ getRecords ~ error',
      error,
    );
    return [];
  }
}

export async function getExpensesStructure(period: string): Promise<any> {
  try {
    const resp = await axiosClient.get('stats/structure/expenses/' + period);
    return resp.data;
  } catch (error) {
    console.log(
      '🚀 ~ file: records.service.ts ~ line 10 ~ getRecords ~ error',
      error,
    );
    return [];
  }
}
