import React, {useContext, useState} from "react";
import {Button, Card, Col, Input, Tag} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {addRecord} from "@/services/ant-design-pro/antq-api";
import {TimelineRefreshContext} from "@/pages/account/TimelineRecord";
import {ZIMA_BLUE} from "@/utils/common";

const SaveCard: React.FC<any> = (props) => {
  const {} = props;
  const [isAdd, setIsAdd] = useState(false);
  const [record, setRecord] = useState<API.TimelineRecord>();

  const {setRefresh} = useContext(TimelineRefreshContext);

  const normal =
    (<Tag style={{borderStyle: 'dashed', borderColor: ZIMA_BLUE}} onClick={() => setIsAdd(true)}>
      <PlusOutlined style={{fontSize: 28, color: ZIMA_BLUE, opacity: 0.6}}/>
    </Tag>)

  const save =
    <Col span={20}>
      <Card title={<Input placeholder='添加标题' onChange={v => setRecord({...record, title: v.target.value})}/>}
            bordered={false}
            actions={[
              <Button key='1' type='primary' onClick={() => {
                if (record) addRecord(record).then(() => setRefresh(true));
                setIsAdd(false);
              }}>确定</Button>,
              <Button key='2' onClick={() => setIsAdd(false)}>取消</Button>
            ]}
      >
        <Input.TextArea rows={4} showCount={true} placeholder='添加内容' onChange={v => setRecord({...record, content: v.target.value})}/>
      </Card>
    </Col>;


  return (
    <>
      {isAdd ? save : normal}
    </>
  )
}

export default SaveCard;
