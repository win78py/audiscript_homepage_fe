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
import DeleteIcon from "@/base/icons/DeleteIcon";
import CheckCircleIcon from "@/base/icons/CheckCircleIcon";
import TranscriptionModal from "@/app/components/TransriptionModal";
import useToast from "@/base/hooks/useToast";
import { useAudioMutation } from "@/app/components/home/hooks/useAudioMutation";
import { useRecoilState } from "recoil";
import { authAtom } from "@/base/store/atoms/auth";
import CustomSelect from "../CustomSelect/CustomSelect";
import { LANGUAGE_OPTIONS } from "@/base/configs/language";
import { queryClient } from "@/base/configs/queryClient";
import { queryKeys } from "@/app/workspace/configs/queryKeys";
import { keyStringify } from "@/base/utils/helper/schema";

interface UploadAudioProps {
  onAudioSelected: (files: File[]) => void;
  uploadKey?: number;
  style?: React.CSSProperties;
}

const UploadAudio: React.FC<UploadAudioProps> = ({ uploadKey, style }) => {
  const showToast = useToast();
  const [file, setFile] = useState<AntdUploadFile>();
  // const { mutate, isPending, isSuccess } = useCreateAudio({
  //   onSuccess: (data) => {
  //     setDataAudio(data.data);
  //     showToast({
  //       content: "Upload successful! Click to transcribe.",
  //       type: "success",
  //     });
  //   },
  //   onError: (error) => {
  //     console.log("Mutation error:", error);
  //     showToast({
  //       content: "Upload failed. Please try again.",
  //       type: "error",
  //     });
  //   },
  // });
  const { mCreateAudio, mTranscribeAudio } = useAudioMutation();
  console.log("mCreateAudio:", mCreateAudio);
  console.log("mTranscribeAudio:", mTranscribeAudio?.isPending);
  const [progressPercent, setProgressPercent] = useState(0);
  const [progressRunning, setProgressRunning] = useState(false);
  console.log("progressRunning:", progressRunning);
  const [isComplete, setIsComplete] = useState(false);
  const [isOpen, setIsOpen] = React.useState(mCreateAudio?.isSuccess);
  const [authData] = useRecoilState(authAtom);

  const [selectedLanguage, setSelectedLanguage] = useState<string | "auto">("auto");

  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (mCreateAudio?.isPending) {
      setProgressRunning(true);
      setProgressPercent(0);
      interval = setInterval(() => {
        setProgressPercent((prev) => {
          if (prev < 80) return prev + 2;
          return prev;
        });
      }, 20);
    }

    if (mCreateAudio?.isSuccess) {
      if (interval) clearInterval(interval);
      setProgressPercent(100);
      setTimeout(() => {
        setProgressRunning(false);
        setProgressPercent(0);
        setIsComplete(true);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [mCreateAudio?.isPending, mCreateAudio?.isSuccess]);

  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (mTranscribeAudio?.isPending) {
      setProgressRunning(true);
      setProgressPercent(0);
      interval = setInterval(() => {
        setProgressPercent((prev) => {
          if (prev < 80) return prev + 2;
          return prev;
        });
      }, 20);
    }

    if (mTranscribeAudio?.isSuccess) {
      if (interval) clearInterval(interval);
      setProgressPercent(100);
      setTimeout(() => {
        setProgressRunning(false);
        setProgressPercent(0);
        setIsComplete(true);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [mTranscribeAudio?.isPending, mTranscribeAudio?.isSuccess]);

  const beforeUpload = async (file: RcFile) => {
    const isLt10M = file.size / 1024 / 1024 <= 10;
    const allowedTypes = [
      "audio/mpeg",
      "audio/wav",
      "audio/x-wav",
      "audio/mp4",
      "audio/m4a",
      "audio/x-m4a",
      "video/mp4",
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

  const handleUpload = (info: UploadChangeParam<AntdUploadFile<any>>) => {
    setProgressRunning(true);
    setProgressPercent(0);
    setIsComplete(false);

    const firstFile = info.fileList.find((file) => !!file.originFileObj);
    if (!firstFile) {
      setFile(undefined);
      return;
    }
    setFile(firstFile);

    const file = firstFile.originFileObj as RcFile;
    const userId = authData?.customer?.id;
    // Tạo FormData
    const formData = new FormData();
    formData.append("file_url", file);
    formData.append("user_id", String(userId));

    mCreateAudio.mutate(formData, {
      onSuccess: () => {
        showToast({
          content: "Upload successful! Click to transcribe.",
          type: "success",
        });
      },
      onError: () => {
        showToast({
          content: "Upload failed. Please try again.",
          type: "error",
        });
      },
    });
  };

  const handleTranscribe = () => {
    setProgressRunning(true);
    setProgressPercent(0);
    setIsComplete(false);
    // if (!file) return;
    const file_url = mCreateAudio?.data?.file_url; // hoặc file.response?.url nếu upload lên cloud
    const language = selectedLanguage;
    const audio_id = mCreateAudio?.data?.id;

    if (!file_url || !language || !audio_id) {
      showToast({ content: "Missing data for transcription.", type: "error" });
      return;
    }

    const body = {
      file_url,
      language,
      audio_id,
    };
    const params = {

    };

    mTranscribeAudio.mutate(body, {
      onSuccess: () => {
        // queryClient.invalidateQueries({ queryKey: [queryKeys.getAudioList] });
        showToast({
          content: "Transcription started!",
          type: "success",
        });
      },
      onError: () => {
        showToast({
          content: "Transcription failed. Please try again.",
          type: "error",
        });
      },
    });
  };

  const handleOpenTranscriptionModal = () => {
    if (!mTranscribeAudio?.isSuccess) return;
    setIsOpen(true);
  };

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
          fileList={file ? [file] : []}
          accept=".mp3,.wav,.m4a"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleUpload}
          style={{
            display: "flex",
            width: "100%",
            minHeight: 120,
            padding: 16,
            borderRadius: 20,
            position: "relative",
            pointerEvents: file ? "none" : "auto",
          }}
        >
          {!file ? (
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
                    background:
                      "var(--primary-fg-color-primary-fg-50, #1677ff)",
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
                    <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                      {((file.size || 0) / 1024 / 1024).toFixed(1)} MB
                    </Typography.Text>
                  </Flex>
                </Flex>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(undefined);
                    mTranscribeAudio.reset();
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

              {mCreateAudio?.isSuccess &&
                !progressRunning &&
                !mTranscribeAudio?.isSuccess && (
                  <Flex
                    vertical
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: 24,
                      pointerEvents: "auto",
                      gap: 38,
                    }}
                  >
                    <Flex vertical gap={8} style={{ width: "100%" }}>
                      <Typography style={{ textAlign: "left" }}>
                        Select transcription language
                      </Typography>
                      <CustomSelect
                        style={{
                          width: "100%",
                          height: 52,
                          textAlign: "left",
                          borderRadius: 12,
                        }}
                        value={selectedLanguage}
                        onChange={(value) => setSelectedLanguage(value)}
                        placeholder="Auto select"
                        options={LANGUAGE_OPTIONS}
                      />
                    </Flex>
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
                      onClick={() => handleTranscribe()}
                    >
                      Transcribe
                    </Button>
                  </Flex>
                )}

              {mTranscribeAudio?.isSuccess && !progressRunning && (
                <Flex
                  vertical
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: 24,
                    pointerEvents: "auto",
                    gap: 38,
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
                    View transcription
                  </Button>
                </Flex>
              )}
            </Flex>
          )}
        </Upload.Dragger>
      </div>
      {isOpen && (
        <TranscriptionModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          id={mCreateAudio?.data?.id}
        />
      )}
    </Flex>
  );
};

export default UploadAudio;
