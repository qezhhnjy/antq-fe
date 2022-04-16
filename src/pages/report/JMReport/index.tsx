import React from "react";

const JiMu: React.FC<any> = (props) => {
  const {} = props;
  return (
    <iframe frameBorder={0} style={{width: '100%', height: 830, overflow: 'visible'}} src="http://localhost:11005/jmreport/list"/>
  )
}

export default JiMu;
