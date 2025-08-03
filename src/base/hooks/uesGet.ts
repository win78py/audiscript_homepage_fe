"use client";
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { isArray } from 'lodash';
import { axiosGet } from '../utils/axios/api';

export function useGet<T>(
  queryKey: any[],
  endPoint: string,
  payload?: any,
  options?: UseQueryOptions<T>,
  header?: any,
  responseType?: string,
  customConfig?: any
) {
  const key = isArray(queryKey) ? queryKey : [queryKey];
  return useQuery<T>({
    queryKey: key,
    queryFn: async () => {
      const start = performance.now();
      const result = await axiosGet<T>(endPoint, payload, header, responseType, customConfig);
      const end = performance.now();
      console.log(`⏱️ API "${endPoint}" chạy trong ${(end - start).toFixed(2)} ms`);
      return result;
    },
    ...options,
  });
}

export default useGet;
