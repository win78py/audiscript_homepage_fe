"use client";

import { Flex, Typography } from "antd";
// import { useGetAudioDetail } from "../home/hooks/useCreateAudio";
import BaseModal from "@/base/components/BaseModal";
import { useGetAudioDetail } from "../home/hooks/useGetAudioTranscription";

interface UploadAudioProps {
  isOpen: boolean;
  onClose?: () => void;
  id?: any;
}

export default function TranscriptionModal(props: UploadAudioProps) {
  const { isOpen = false, onClose, id } = props;
  // const { data: transcriptions, isLoading } = useGetAudioDetail(data?.id || "");
  // console.log("TranscriptionModal data:", data);
  const { data: dataTranscription, isLoading } = useGetAudioDetail(id);
  return (
    <BaseModal
      modalTitle={dataTranscription?.title}
      open={isOpen}
      onClose={() => {
        onClose && onClose();
      }}
      width={800}
    >
      <Flex vertical style={{ width: "100%", gap: 20 }}>
        <Typography
          className="body-lg"
          style={{
            padding: "20px 20px 0 20px",
            maxHeight: 340,
            overflowY: "auto",
          }}
        >
          {isLoading ? "Loading..." : dataTranscription?.transcript}
        </Typography>
        <Flex vertical style={{ padding: "0 20px 20px 20px" }}>
          <audio controls style={{ width: "100%", marginTop: 10 }}>
            <source src={dataTranscription?.file_url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </Flex>
      </Flex>
    </BaseModal>
  );
}
