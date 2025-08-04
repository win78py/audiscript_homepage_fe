"use client";
import { Flex, Table, TableColumnsType, TableProps, Typography } from "antd";
import React from "react";
import useGetAudio from "./hooks/useGetAudio";
import { useRecoilState } from "recoil";
import { authAtom } from "@/base/store/atoms/auth";
import TranscriptionModal from "../components/TransriptionModal";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import InputOnlyAlphaNumeric from "@/base/components/InputOnlyAlphaNumeric";

export default function Workspace() {
  dayjs.extend(relativeTime);
  const [authData] = useRecoilState(authAtom);
  const params = {
    user_id: authData?.customer?.id || "",
    limit: 5,
  };
  const { data: audio } = useGetAudio(params);

  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedAudioId, setSelectedAudioId] = React.useState<string | null>(
    null
  );
  const [hoveredRowId, setHoveredRowId] = React.useState<string | null>(null);
  const [openedAddTagsRowId, setOpenedAddTagsRowId] = React.useState<
    string | null
  >(null);

  interface DataType {
    id: string;
    title: string;
    created_at: string;
    language: string;
    tags: string[];
  }

  const allTags = Array.from(
    new Set((audio?.data || []).flatMap((item: any) => item.tags || []))
  );

  const tagFilters = allTags.map((tag) => ({
    text: String(tag),
    value: String(tag),
  }));

  const columns: TableColumnsType<DataType> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "40%",
      render: (text: string, record: DataType) => (
        <Typography
          style={{
            cursor: "pointer",
            color: hoveredRowId === record.id ? "#1677ff" : "inherit",
            // fontWeight: hoveredRowId === record.id ? "bold" : "normal",
          }}
          onClick={() => handleOpenTranscriptionModal(record?.id as string)}
        >
          {text}
        </Typography>
      ),
    },
    {
      title: "Language",
      dataIndex: "language",
      key: "language",
      sorter: (a, b) => a.language.localeCompare(b.language),
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      filters: tagFilters,
      filterSearch: true,
      onFilter: (value, record) =>
        (record.tags || []).includes(value as string),
      render: (tags: string[], record: DataType) =>
        (!tags || tags.length === 0) && openedAddTagsRowId === record.id ? (
          <Flex style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            <InputOnlyAlphaNumeric
              type="text"
              style={{ borderRadius: 8, height: 38 }}
              placeholder="Add a tag"
            />
          </Flex>
        ) : (!tags || tags.length === 0) && hoveredRowId === record.id ? (
          <Typography
            style={{ color: "var(--black), #212121", cursor: "pointer" }}
            onClick={() => setOpenedAddTagsRowId(record.id)}
          >
            Add tags
          </Typography>
        ) : (
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            {tags?.map((tag, idx) => (
              <Typography
                key={idx}
                style={{
                  border: "1px solid #d9d9d9",
                  borderRadius: 7,
                  padding: "2px 8px",
                  fontSize: 14,
                  background: "#fafafa",
                }}
              >
                {tag}
              </Typography>
            ))}
          </div>
        ),
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      width: "20%",
      sorter: (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      render: (value: string) => {
        const date = dayjs(value);
        return (
          <span title={date.format("YYYY-MM-DD HH:mm")}>{date.fromNow()}</span>
        );
      },
    },
  ];

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const handleOpenTranscriptionModal = (id: string) => {
    setSelectedAudioId(id);
    setIsOpen(true);
  };

  // const handleAddTags = (id: string, newTags: string[]) => {
  //   console.log("Adding tags!");
  // };

  return (
    <Flex
      style={{
        marginTop: "50px",
        padding: "20px",
        width: "100%",
        height: "100vh",
        justifyContent: "center",
      }}
    >
      <Table<DataType>
        columns={columns}
        dataSource={audio?.data}
        onChange={onChange}
        rowKey="key"
        style={{ width: "100%", overflowX: "auto" }}
        onRow={(record) => ({
          onMouseEnter: () => setHoveredRowId(record.id),
          onMouseLeave: () => setHoveredRowId(null),
        })}
      />
      <TranscriptionModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        id={selectedAudioId}
      />
    </Flex>
  );
}
