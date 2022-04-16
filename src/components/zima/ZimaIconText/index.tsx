import React, {ReactNode} from "react";
import {ZIMA_BLUE} from "@/utils/common";

type ZimaIconTextProps = {
  icon: any,
  text?: ReactNode,
  size?: number
}
const ZimaIconText: React.FC<ZimaIconTextProps> = (props) => {
  const {icon, text, size} = props;
  return <span style={{color: ZIMA_BLUE, fontSize: size}}>
    {React.createElement(icon, {style: {marginRight: 8}})}
    {text}
  </span>
}

export default ZimaIconText;
