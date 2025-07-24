"use client";
import React, { useState } from "react";
import { Upload, Flex, Typography, Progress } from "antd";
import {
  RcFile,
  UploadChangeParam,
  UploadFile as AntdUploadFile,
} from "antd/es/upload/interface";
import Button from "@/base/components/Button/CustomButton";
import UploadArrowIcon from "@/base/icons/UploadArrowIcon";
import FileIcon from "@/base/icons/FileIcon";
import { useCreateAudio } from "@/app/components/home/hooks/useCreateAudio";
import DeleteIcon from "@/base/icons/DeleteIcon";
import { useRouter } from "next/navigation";
import CheckCircleIcon from "@/base/icons/CheckCircleIcon";
import TranscriptionModal from "@/app/components/TransriptionModal";

interface UploadAudioProps {
  onAudioSelected: (files: File[]) => void;
  uploadKey?: number;
  style?: React.CSSProperties;
}

const UploadAudio: React.FC<UploadAudioProps> = ({
  onAudioSelected,
  uploadKey,
  style,
}) => {
  const router = useRouter();
  const [fileList, setFileList] = useState<AntdUploadFile[]>([]);
  const [dataAudio, setDataAudio] = useState<string | null>(null);
  const { mutate, isPending, isSuccess } = useCreateAudio({
    onSuccess: (data) => {
      setDataAudio(data.data);
    },
  });
  const [progressPercent, setProgressPercent] = useState(0);
  const [progressRunning, setProgressRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isOpen, setIsOpen] = React.useState(isSuccess);

  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isPending) {
      setProgressRunning(true);
      setProgressPercent(0);
      interval = setInterval(() => {
        setProgressPercent((prev) => {
          if (prev < 80) return prev + 2;
          return prev;
        });
      }, 20);
    }

    if (isSuccess) {
      if (interval) clearInterval(interval);
      setProgressPercent(100);
      setTimeout(() => {
        setProgressRunning(false);
        setProgressPercent(0);
        setIsComplete(true);
      }, 1100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPending, isSuccess]);
  const beforeUpload = async (file: RcFile) => {
    const isLt10M = file.size / 1024 / 1024 <= 10;
    const allowedTypes = [
      "audio/mpeg",
      "audio/wav",
      "audio/x-wav",
      "audio/mp4",
      "audio/m4a",
      "audio/x-m4a",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Only supports audio formats such as MP3, WAV, M4A");
      return Upload.LIST_IGNORE;
    }

    if (!isLt10M) {
      alert("Audio file must be smaller than 10MB");
      return Upload.LIST_IGNORE;
    }

    return false;
  };

  const handleChange = (info: UploadChangeParam<AntdUploadFile<any>>) => {
    setProgressRunning(true);
    setProgressPercent(0);
    setIsComplete(false);
    const filtered = info.fileList.filter((file) => !!file.originFileObj);

    const newFileList = filtered.slice(0, 1);

    setFileList(newFileList);
    const files = newFileList
      .map((file) => file.originFileObj)
      .filter((f): f is RcFile => !!f);
    onAudioSelected?.(files);

    mutate({ file_url: files });
  };

  const handleOpenTranscriptionModal = () => {
    if (!isSuccess) return;
    setIsOpen(true);
  }

  return (
    <Flex vertical gap={8}>
      <div
        style={{
          border: "2px solid #1677ff",
          borderRadius: 26,
          padding: 8,
          background: "#fafcff",
          width: "100%",
          ...style,
        }}
      >
        <Upload.Dragger
          key={uploadKey}
          name="audio"
          fileList={fileList}
          accept=".mp3,.wav,.m4a"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          style={{
            display: "flex",
            width: "100%",
            minHeight: 120,
            padding: 16,
            borderRadius: 20,
            position: "relative",
            pointerEvents: fileList.length > 0 ? "none" : "auto",
          }}
        >
          {fileList.length === 0 ? (
            <Flex
              vertical
              align="middle"
              justify="center"
              style={{
                width: "100%",
                height: "100%",
                textAlign: "center",
                gap: 26,
              }}
            >
              <div>
                <FileIcon color="#797979ff" />
              </div>
              <Typography>
                <span style={{ fontWeight: 500 }}>
                  Click or drag & drop to upload your audio
                </span>
              </Typography>
              <div>
                <Button
                  style={{
                    background: "#1677ff",
                    color: "#fff",
                    borderRadius: 12,
                    height: 52,
                    padding: "10px 28px",
                  }}
                  icon={
                    <UploadArrowIcon
                      width={20}
                      height={20}
                      fill="var(--primary-fg-color-primary-fg-0, #fff)"
                    />
                  }
                >
                  Upload a file
                </Button>
              </div>
            </Flex>
          ) : (
            fileList.map((file) => {
              const sizeMB = (file.size || 0) / 1024 / 1024;
              return (
                <Flex
                  vertical
                  key={file.uid}
                  align="center"
                  justify="space-between"
                  style={{
                    width: "100%",
                    background: "#fefdfb",
                    padding: 16,
                    borderRadius: 20,
                    border: "1px solid #f1eee9",
                  }}
                >
                  <Flex
                    style={{
                      width: "100%",
                      padding: 16,
                      background: "#f2eedc4d",
                      borderRadius: 16,
                    }}
                    gap={12}
                  >
                    <Flex align="center" gap={12} style={{ width: "100%" }}>
                      <div
                        style={{
                          background: isComplete
                            ? "var(--green-correct, #0dbb84)"
                            : "#f2eedc",
                          borderRadius: 12,
                          padding: 16,
                          color: isComplete ? "#fff" : "#000",
                          transition: "background 0.4s",
                        }}
                      >
                        <FileIcon
                          width={24}
                          height={24}
                          style={{
                            display: isComplete ? "none" : "flex",
                            transform: isComplete
                              ? "scale(0.8) rotate(-10deg)"
                              : "scale(1) rotate(0deg)",
                            transition: "transform 0.4s",
                          }}
                        />
                        <CheckCircleIcon
                          width={24}
                          height={24}
                          style={{
                            display: isComplete ? "flex" : "none",
                            transform: isComplete
                              ? "scale(1) rotate(0deg)"
                              : "scale(0.8) rotate(10deg)",
                            transition: "transform 0.4s",
                          }}
                        />
                      </div>
                      <Flex vertical style={{ alignItems: "start", gap: 6 }}>
                        <Typography.Text strong>{file.name}</Typography.Text>
                        <Typography.Text
                          type="secondary"
                          style={{ fontSize: 12 }}
                        >
                          {sizeMB.toFixed(1)} MB
                        </Typography.Text>
                      </Flex>
                    </Flex>

                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setFileList([]);
                      }}
                      style={{
                        border: "1px solid #cdcdcdff",
                        cursor: "pointer",
                        padding: "14px 16px",
                        borderRadius: 12,
                        background: "#fff",
                        pointerEvents: "auto",
                      }}
                    >
                      <DeleteIcon width={24} height={25.5} />
                    </div>
                  </Flex>
                  {progressRunning && (
                    <Progress
                      percent={progressPercent}
                      status="active"
                      showInfo={false}
                      strokeColor="#1677ff"
                      style={{ marginTop: 16 }}
                    />
                  )}

                  {isSuccess && !progressRunning && (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: 24,
                        pointerEvents: "auto",
                      }}
                    >
                      <Button
                        style={{
                          background: "#1677ff",
                          color: "#fff",
                          borderRadius: 12,
                          height: 48,
                          width: "100%",
                          padding: "0 32px",
                          fontWeight: 600,
                        }}
                        onClick={() => handleOpenTranscriptionModal()}
                      >
                        View Transcription
                      </Button>
                    </div>
                  )}
                </Flex>
              );
            })
          )}
        </Upload.Dragger>
      </div>
      <TranscriptionModal isOpen={isOpen} onClose={() => setIsOpen(false)} data={dataAudio} />
    </Flex>
  );
};

export default UploadAudio;
