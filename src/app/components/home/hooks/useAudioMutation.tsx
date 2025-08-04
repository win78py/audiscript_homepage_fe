import useMutationPost from "@/base/hooks/useMutationPost";
import { queryKeys } from "../configs/queryKeys";
import { UseMutationOptions } from "@tanstack/react-query";

export const useAudioMutation = (options?: UseMutationOptions<any, any, any>) => {
  const mCreateAudio = useMutationPost({
    queryKey: [queryKeys.postAudio],
    endPoint: '/audio/create',
    isFormData: true,
    options
  });
  const mTranscribeAudio = useMutationPost({
    queryKey: [queryKeys.transcribeAudio],
    endPoint: '/audio/transcribe',
    isFormData: false,
    options
  });
//   const mUpdateAudio = useMutationPut({
//     queryKey: [queryKeys.updateAudio],
//     endPoint: '/audio',
//     getEndPoint(endPoint, payload) {
//       return endPoint + '/' + payload.id;
//     },
//     getPayload(endPoint, payload) {
//       const { id, ...rest } = payload;
//       return rest;
//     },
//     options: {
//       onSuccess: (data: any, variables: any, context: any) => {},
//       onError: (error: any, variables: any, context: any) => {}
//     }
//   });
  return {
    mCreateAudio,
    mTranscribeAudio
  };
};