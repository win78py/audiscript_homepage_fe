import { Flex, Typography } from "antd";
import React from "react";

interface HeaderProps {
  style?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
  descriptionStyle?: React.CSSProperties;
  vertical?: boolean;
}
const Header = (props: HeaderProps) => {
  const { style, vertical, titleStyle, descriptionStyle } = props;
  return (
    <Flex vertical={vertical} style={style}>
      <Typography style={titleStyle}>Audio to text converter</Typography>
      <Typography style={descriptionStyle}>
        Transcribe audio to text with AudisScribe's AI transcription tool.
      </Typography>
    </Flex>
  );
};

export default Header;
