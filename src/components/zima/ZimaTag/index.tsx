import React, {MouseEventHandler} from "react";
import {Tag} from "antd";
import {ZIMA_BLUE} from "@/utils/common";

type ZimaTagProps = {
  color?: any,
  style?: React.CSSProperties,
  opacity?: number,
  onClick?: MouseEventHandler | undefined;
  onClose?: (tag: any) => void;
  closeable?: boolean,
}
const ZimaTag: React.FC<ZimaTagProps> = (props) => {
  const {
    color, style, children, opacity, onClick, closeable, onClose
  } = props;
  return (
    <Tag closable={closeable} color={color || ZIMA_BLUE} style={{...style, opacity}} onClick={onClick}
         onClose={e => {
           e.preventDefault();
           if (onClose) onClose(children);
         }}
    >{children}</Tag>
  )
}

export default ZimaTag;
