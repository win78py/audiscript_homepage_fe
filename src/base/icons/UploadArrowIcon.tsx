import React from "react";

const UploadArrowIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 256 256"
    fill={props.fill || "currentColor"}
    width={props.width || 20}
    height={props.height || 20}
    // color={props.color}
    {...props}
  >
    <path d="M228,144v64a12,12,0,0,1-12,12H40a12,12,0,0,1-12-12V144a12,12,0,0,1,24,0v52H204V144a12,12,0,0,1,24,0ZM96.49,80.49,116,61v83a12,12,0,0,0,24,0V61l19.51,19.52a12,12,0,1,0,17-17l-40-40a12,12,0,0,0-17,0l-40,40a12,12,0,1,0,17,17Z"></path>
  </svg>
);

export default UploadArrowIcon;