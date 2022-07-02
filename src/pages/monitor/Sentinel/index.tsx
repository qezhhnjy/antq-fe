import React from "react";

const Sentinel: React.FC<any> = (props) => {
  const {} = props;
  return (
    // <iframe frameBorder={0} style={{width: '100%', height: 830, overflow: 'visible'}} src='http://43.142.106.115:11004'/>
    <>
      <iframe width="560" height="400" frameBorder="0" src="https://fatmap.com/routeid/2982532/?fmid=em"/>
      <iframe width="560" height="400" frameBorder="0" src="https://fatmap.com/routeid/525325/tmb2019?fmid=em"/>
      <div id='braft' className="braft-output-content" dangerouslySetInnerHTML={{__html: '<iframe width="560" height="400" frameBorder="0" src="https://fatmap.com/routeid/525325/tmb2019?fmid=em"/>'}}/>
    </>

  )
}

export default Sentinel;
