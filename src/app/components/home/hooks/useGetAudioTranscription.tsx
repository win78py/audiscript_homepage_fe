import { useGet } from "@/base/hooks/uesGet";
import { keyStringify } from "@/base/utils/helper/schema";

export const useGetAudioDetail = (id?: string, opts?: any) => {
  return useGet<any>(
    ["get-audio-detail", keyStringify({ id })],
    `audio/${id}`,
    { id },
    {
      keepPreviousData: true,
      enabled: !!id,
      ...opts,
    }
  );
};
