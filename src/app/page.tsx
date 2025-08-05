"use client";
import Header from "@/base/components/Header";
import { Flex } from "antd";
import UploadAudio from "@/base/components/UploadFile";
import React from "react";

export default function Home() {
  return (
    <Flex
      vertical
      style={{
        padding: "20px",
        width: "100%",
        height: "100vh",
        gap: 30,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Header
        vertical={true}
        style={{ textAlign: "center", gap: 10, width: "100%" }}
        titleStyle={{ fontSize: "34px", fontWeight: "bold", width: "100%" }}
        descriptionStyle={{ fontSize: "21px", color: "#666", width: "100%" }}
      />
      <UploadAudio
        onAudioSelected={(files) => console.log(files)}
        style={{ width: 800 }}
      />
    </Flex>
  );
}
