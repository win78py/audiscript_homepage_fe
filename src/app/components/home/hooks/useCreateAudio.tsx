'use client';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../queryKey/querykey';
import { getAudioDetailAPI, postAudioAPI } from '../apis/audioApi';
import { RcFile } from 'antd/es/upload/interface';

interface CreateAudioParams {
  file_url: RcFile[];
  // thêm các field khác nếu cần
}

export const useGetAudioDetail = (id: string) => {
	// const access_token = localStorage.getItem('access_token');
	return useQuery({
		queryKey: [QUERY_KEY.AUDIO, id],
		queryFn: async () => {
			const { data } = await getAudioDetailAPI(id);
			return data;
		},
    enabled: !!id,
	});
};

export const useCreateAudio = (options?: {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: CreateAudioParams) => postAudioAPI(params),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.AUDIO] });
      if (options?.onSuccess) options.onSuccess(data);
      return data;
    },
    onError: (error) => {
      if (options?.onError) options.onError(error);
      console.log(error);
    },
  });
};