import React, {useContext, useState} from "react";
import {Avatar, Button, Card, Divider, Input, Space} from "antd";
import {DeleteOutlined, EditOutlined, LikeOutlined} from "@ant-design/icons";
import {deleteRecord, updateRecord} from "@/services/ant-design-pro/antq-api";
import {TimelineRefreshContext} from "@/pages/account/TimelineRecord";
import {ZIMA_BLUE, ZIMA_BLUE_REVERSE} from "@/utils/common";

type EditCardProps = {
  record: API.TimelineRecord,
}

const EditCard: React.FC<EditCardProps> = (props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [record, setRecord] = useState<API.TimelineRecord>(props.record);
  const {id, title, content, avatar} = record;

  const {setRefresh} = useContext(TimelineRefreshContext);

  const edit =
    <Card title={<Input defaultValue={title} onChange={v => setRecord({...record, title: v.target.value})}/>}
          bordered={false}
          actions={[
            <Button type='primary' key='0' onClick={() => {
              updateRecord(record).then(() => setRefresh(true));
              setIsEdit(false);
            }}>确定</Button>,
            <Button key='1' onClick={() => setIsEdit(false)}>取消</Button>
          ]}
    >
      <Input.TextArea rows={4} showCount={true} defaultValue={content} onChange={v => setRecord({...record, content: v.target.value})}/>
    </Card>;

  const normal =
    <Card
      style={{opacity: 0.8}}
      bordered={false} title={title ? <b style={{color: ZIMA_BLUE}}>{title}</b> : null} hoverable
      extra={<Space>
        <LikeOutlined style={{color: ZIMA_BLUE, fontSize: 16}}/>
        <Divider type='vertical' dashed/>
        <EditOutlined onClick={() => setIsEdit(true)} style={{color: ZIMA_BLUE, fontSize: 16}} key="edit"/>
        <Divider type='vertical' dashed/>
        <DeleteOutlined style={{color: ZIMA_BLUE_REVERSE, fontSize: 16}} onClick={() => {
          if (id) deleteRecord(id).then(() => setRefresh(true));
        }}/>
      </Space>
      }
    >
      <Card.Meta avatar={<Avatar src={avatar}/>}
                 description={
                   <span style={{color: ZIMA_BLUE}}>
                    <div dangerouslySetInnerHTML={{__html: content || ''}}/>
                   </span>
                 }/>
    </Card>;

  return (
    <>
      {isEdit ? edit : normal}
    </>
  );
}

export default EditCard;
