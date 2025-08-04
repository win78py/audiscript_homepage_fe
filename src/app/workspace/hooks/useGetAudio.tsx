import { useGet } from "@/base/hooks/uesGet";
import { keyStringify } from "@/base/utils/helper/schema";
import { queryKeys } from "../configs/queryKeys";

export default function useGetAudio(params: any, opts?: any) {
   return useGet<any>([queryKeys.getAudioList, keyStringify(params)], 'audio/', params, {
    keepPreviousData: true,
    ...opts
  });
}
