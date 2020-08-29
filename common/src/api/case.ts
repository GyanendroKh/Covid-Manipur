import axios, { CancelToken } from 'axios';
import { Total, TimelineData, CaseTypeData } from '../types';

export const total = async (cancelToken?: CancelToken): Promise<Total> => {
  const { data } = await axios.get('/case/total', { cancelToken });

  return data;
};

export const timeline = async (
  cancelToken?: CancelToken
): Promise<TimelineData[]> => {
  const { data } = await axios.get('/case/timeline', { cancelToken });

  return data;
};

export const type = async (
  type: 'confirmed' | 'death' | 'recovered',
  cancelToken?: CancelToken
): Promise<CaseTypeData> => {
  const { data } = await axios.get(`/case/${type}`, { cancelToken });

  return data;
};
