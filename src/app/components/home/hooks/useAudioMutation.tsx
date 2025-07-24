import useMutationPost from "@/base/hooks/useMutationPost";
import { queryKeys } from "../configs/queryKeys";
import { UseMutationOptions } from "@tanstack/react-query";

export const useAudioMutation = (options?: UseMutationOptions<any, any, FormData>) => {
  const mCreateAudio = useMutationPost({
    queryKey: [queryKeys.postAudio],
    endPoint: '/audio/transcribe',
    isFormData: true,
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
    mCreateAudio
  };
};