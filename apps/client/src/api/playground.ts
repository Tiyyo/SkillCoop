import { api } from './api.fn';
import { Playground } from '@skillcoop/types/src';

export const createPlaygroundFn = async (data: Playground) => {
  const response = await api.post('api/playground', data);
  return response.data;
};

export const searchPlaygroundFn = async (query: string) => {
  const response = await api.get('api/playground', {
    params: {
      search: query,
    },
  });
  return response.data;
};
