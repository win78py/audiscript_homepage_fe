import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosProgressEvent } from 'axios';
import { isArray } from 'lodash';
import { axiosPost } from '../utils/axios/api';

export function useMutationPost<T, E extends {} = {}, V extends {} = {}>(params: {
  queryKey: any[];
  endPoint: string;
  options?: UseMutationOptions<T, E, V>;
  getEndPoint?: (endPoint: string, payload: V) => string;
  getPayload?: (endPoint: string, payload: V) => any;
  header?: any;
  responseType?: string;
  customConfig?: any;
  uploadProgressCallback?: (progressEvent: AxiosProgressEvent, payload: V) => void;
  isFormData?: boolean;
}) {
  const { queryKey, endPoint, options, getEndPoint, getPayload, header, responseType, customConfig, uploadProgressCallback, isFormData } =
    params;

  const key = isArray(queryKey) ? queryKey : [queryKey];
 
    return useMutation<T, E, V>(
    {
      mutationKey: key,
      mutationFn: async (payload: V) => {
        const finalPayload = getPayload ? getPayload(endPoint, payload) : payload;

        const headers = {
          ...header,
          ...(isFormData ? { 'Content-Type': 'multipart/form-data' } : {})
        };

        return axiosPost<T>(getEndPoint ? getEndPoint(endPoint, payload) : endPoint, finalPayload, headers, responseType, {
          ...customConfig,
          onUploadProgress: (progressEvent: AxiosProgressEvent) => {
            uploadProgressCallback?.(progressEvent, payload);
          }
        });
      },
      ...options
    });
}

export default useMutationPost;
