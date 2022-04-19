import React, {useEffect, useRef, useState} from "react";
import {imManagerGroup, imManagerUsernameMap, imMessageList} from "@/services/ant-design-pro/antq-api";
import ProTable, {ProColumns} from "@ant-design/pro-table";
import {PageHeader, Space, Typography} from "antd";
import ZimaTag from "@/components/zima/ZimaTag";

const {Paragraph} = Typography;

const ChatInfo: React.FC<any> = () => {
  const [online, setOnline] = useState<any[]>([]);
  const [users, setUses] = useState<string[]>([]);
  const ref: any = useRef();

  const init = () => {
    imManagerGroup().then(result => setOnline(result.data || []));
    imManagerUsernameMap().then(result => setUses(result.data || []));
  }

  useEffect(() => {
    init();
    if (!ref.current) ref.current = setInterval(() => init(), 5000);
    return () => {
      if (ref.current) clearInterval(ref.current)
    }
  }, []);

  const msgColumn: ProColumns<IM.MessageVO>[] = [
    {dataIndex: 'index', valueType: 'indexBorder', width: 40},
    {
      title: '发送',
      dataIndex: 'send',
    },
    {
      title: '接收',
      dataIndex: 'receive',
    },
    {
      title: '聊天内容',
      dataIndex: 'content',
      render: content => <Paragraph ellipsis={{
        expandable: false,
        rows: 1,
        tooltip: true,
      }} type='secondary' style={{width: '60%'}}>{content}</Paragraph>
    },
    {title: '命令码', dataIndex: 'cmd'},
    {title: '类型', dataIndex: 'type'},
    {title: '聊天类型', dataIndex: 'chatType'},
    {title: '群组', dataIndex: 'groupId'},
    {
      title: '发送时间',
      dataIndex: 'sendTime',
    },
  ]

  return (
    <div>
      <PageHeader
        ghost
        title={online.length + '人'}
        subTitle="在线人数"
      >
        <Space>{users.map(user => <ZimaTag key={user}>{user}</ZimaTag>)}</Space>
      </PageHeader>
      <ProTable<IM.MessageVO>
        pagination={{
          size: 'default',
          pageSize: 10,
        }}
        columns={msgColumn}
        request={async (params) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          const {pageSize, current: pageNum} = params;
          return imMessageList({pageSize, pageNum}).then((result) => ({
            data: result.data?.list,
            success: true,
            total: result.data?.total,
          }));
        }}
        rowKey={(data) => data.id}
        search={false}
      />

    </div>
  );
}

export default ChatInfo;