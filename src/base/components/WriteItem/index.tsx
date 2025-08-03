import { ReactNode } from "react";

import { Col, ColProps, ConfigProvider, Flex, Typography } from "antd";
import Form, { FormItemProps, Rule } from "antd/es/form";
import { FormLayout } from "antd/es/form/Form";
// import styled from 'styled-components';

import "./WriteItem.style.css";
import useDevice from "@/base/hooks/useDevice";

export interface FieldWriteForm {
  label?: ReactNode;
  name?: string | any[];
  key: string;
  Component?: any;
  componentProps?: any;
  formItemProps?: FormItemProps;
  rules?: Rule[];
  defaultValue?: any;
  style?: React.CSSProperties;
  labelBlock?: boolean;
}

interface WriteItemProps {
  item: FieldWriteForm;
  colProps?: ColProps;
  labelStyle?: React.CSSProperties;
  layout?: FormLayout;
  requiredAsterisk?: boolean;
  mobileLabel?: boolean;
}

const WriteItem = (props: WriteItemProps) => {
  const {
    item,
    colProps,
    labelStyle,
    layout,
    requiredAsterisk = true,
    mobileLabel = true,
  } = props;
  const { isMobile } = useDevice();
  const Component: any = item?.Component;
  return (
    <Col
      xs={24}
      {...colProps}
      className={layout === "vertical" ? "vertical-form-item" : undefined}
      style={{
        padding: 0,
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: item?.labelBlock ? "column" : "row",
          alignItems: item?.labelBlock ? "start" : "center",
          gap: 8,
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            marginRight: "",

            marginBottom: isMobile ? 6 : 0,
            gap: 4,
            ...(layout === "vertical" && {
              padding: 0,
            }),
            ...labelStyle,
          }}
        >
          {typeof item.label === "string" ? (
            <Typography
              className={layout === "vertical" ? "title-sm" : "body-text-lg"}
            >
              {item.label}
            </Typography>
          ) : (
            item.label
          )}
          {item?.rules?.some((rule: any) => rule?.required) &&
            requiredAsterisk && (
              <span
                style={{
                  color:
                    "var(--status-error-color-status-error-fg-60, #DC2626)",
                  fontSize: 6,
                  marginBottom: 6,
                }}
              >
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 6 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.75977 5.66602H2.83008L2.91211 3.54688L1.10742 4.68164L0.642578 3.875L2.5293 2.89062L0.642578 1.89258L1.10742 1.08594L2.91211 2.2207L2.83008 0.101562H3.75977L3.67773 2.2207L5.48242 1.08594L5.94727 1.89258L4.07422 2.89062L5.94727 3.875L5.48242 4.68164L3.67773 3.54688L3.75977 5.66602Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            )}
        </div>
        <Form.Item
          key={item.key}
          name={item.name}
          required={item?.rules?.some((rule: any) => rule?.required)}
          //   label={
          //   <div
          //     style={{
          //       width: 120,
          //       display: 'flex',
          //       marginRight: '',

          //       marginBottom: isMobile ? 6 : 0,
          //       gap: 4,
          //       ...(layout === 'vertical' && {
          //         padding: 0
          //       }),
          //       ...labelStyle
          //     }}
          //   >
          //     {typeof item.label === 'string' ? (
          //       <Typography className={layout === 'vertical' ? 'title-sm' : 'body-text-lg'}>{item.label}</Typography>
          //     ) : (
          //       item.label
          //     )}
          //     {item?.rules?.some((rule: any) => rule?.required) && requiredAsterisk && (
          //       <span style={{ color: 'var(--status-error-color-status-error-fg-60, #DC2626)', fontSize: 6, marginBottom: 6 }}>
          //         <svg width="1em" height="1em" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          //           <path
          //             d="M3.75977 5.66602H2.83008L2.91211 3.54688L1.10742 4.68164L0.642578 3.875L2.5293 2.89062L0.642578 1.89258L1.10742 1.08594L2.91211 2.2207L2.83008 0.101562H3.75977L3.67773 2.2207L5.48242 1.08594L5.94727 1.89258L4.07422 2.89062L5.94727 3.875L5.48242 4.68164L3.67773 3.54688L3.75977 5.66602Z"
          //             fill="currentColor"
          //           />
          //         </svg>
          //       </span>
          //     )}
          //   </div>
          // }
          rules={item?.rules}
          style={{
            ...(layout === "vertical" && {
              gap: 8,
            }),
            ...item?.style,
          }}
          initialValue={item?.defaultValue}
          {...item?.formItemProps}
          labelCol={{
            style: {
              ...item?.formItemProps?.labelCol?.style,
              alignSelf:
                item?.formItemProps?.labelCol?.style?.alignSelf ||
                (layout === "vertical" ? "start" : "center"),
            },
          }}
        >
          {Component ? <Component {...item?.componentProps} /> : <></>}
        </Form.Item>
      </div>
    </Col>
  );
};

export default WriteItem;
