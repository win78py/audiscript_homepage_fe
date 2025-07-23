'use client';

import { Flex, Typography } from "antd";
import { useSearchParams } from "next/navigation";
import { useGetAudioDetail } from "../components/home/hooks/useCreateAudio";

// interface UploadAudioProps {
//   audioId: string;
// }

export default function Transcriptions() {
  const searchParams = useSearchParams();
  const audioId = searchParams.get("id");

  const { data: transcriptions, isLoading } = useGetAudioDetail(audioId || "");
  return (
    <Flex>
      <Typography className="body-lg" style={{ padding: 20 }}>
       {isLoading ? "Loading..." : transcriptions?.transcript}
      </Typography>
    </Flex>
  );
}
