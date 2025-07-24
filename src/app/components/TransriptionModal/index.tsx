"use client";

import { Flex, Typography } from "antd";
import { useGetAudioDetail } from "../home/hooks/useCreateAudio";
import BaseModal from "@/base/components/BaseModal";

interface UploadAudioProps {
  isOpen: boolean;
  onClose?: () => void;
  data?: any;
}

export default function TranscriptionModal(props: UploadAudioProps) {
  const { isOpen = false, onClose, data } = props;
  const { data: transcriptions, isLoading } = useGetAudioDetail(data?.id || "");
  console.log(data?.title);
  return (
    <BaseModal
      modalTitle={data?.title}
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
          {isLoading ? "Loading..." : transcriptions?.transcript}
        </Typography>
        <Flex vertical style={{ padding: "0 20px 20px 20px" }}>
          <audio controls style={{ width: "100%", marginTop: 10 }}>
            <source src={data?.file_url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </Flex>
      </Flex>
    </BaseModal>
  );
}
