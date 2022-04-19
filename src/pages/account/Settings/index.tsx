import React, {useEffect, useRef, useState} from 'react';
import {Avatar, Col, Input, PageHeader, Row, Space, Tabs, Typography} from 'antd';
import {
  CodeSandboxOutlined,
  FolderOutlined,
  GlobalOutlined,
  MessageOutlined,
  UserSwitchOutlined
} from '@ant-design/icons';
import {ZIMA_BLUE} from "@/utils/common";
import './Settings.less';
import "vditor/dist/index.css";
import Vditor from "vditor";
import {now} from '@/utils/timeUtil';
import {listUser} from "@/services/ant-design-pro/antq-api";
import ProList from '@ant-design/pro-list';
import useWebsocket from "@/utils/websocket";
import {useModel} from "@@/plugin-model/useModel";

const {Search} = Input;
const {TabPane} = Tabs;
const {Paragraph, Text,} = Typography;

const FriendList: React.FC<{ data: API.User[], chat: API.User | undefined, setChat: Function, setMessages: Function }> = (props) => {
  const {data, chat, setChat} = props;
  return (
    <div>
      <div style={{height: 80, backgroundColor: '#EEE'}}>
        <Search style={{margin: '30px', width: 240}} placeholder='搜索'/>
      </div>
      <div style={{height: 640, width: 300, overflowY: 'auto', overflowX: 'hidden'}}>
        <ProList<API.User>
          rowKey='id'
          metas={{
            title: {render: (dom, user) => <span style={{color: ZIMA_BLUE, fontSize: 15}}>{user.username}</span>},
            avatar: {render: (dom, user) => <Avatar size='large' src={user.avatar}/>},
            // extra: {dataIndex: 'phone'},
            description: {dataIndex: 'email'}
          }}
          style={{marginLeft: -20, marginRight: -20}}
          split
          onRow={(record) => {
            return {
              onClick: () => {
                if (chat?.username !== record.username) setChat(record);
                // setMessages([]);
              },
            };
          }}
          dataSource={data}
        />
      </div>
    </div>
  );
}

const Other: React.FC = () => {
  return (
    <div style={{height: 80, backgroundColor: '#EEE'}}>
      <Search style={{margin: '30px', width: 240}} placeholder='搜索'/>
    </div>
  )
}

const Message: React.FC<{ current: API.User, msg: API.MessageVO, chat: API.User }> = (props) => {
  const {current, msg, chat} = props;
  const {id, from, content} = msg;
  const float = current.username === from ? 'right' : 'left';

  useEffect(() => {
    Vditor.preview(document.getElementById(id) as HTMLDivElement, content, {
      mode: 'light',
      hljs: {lineNumber: true, style: 'dracula'},
      theme: {current: 'light'},
    });
  });

  if (float === 'left') {
    return (
      <Space style={{float: float, marginTop: 5, marginBottom: 5}}>
        <Avatar src={chat.avatar}/>
        <div style={{
          backgroundColor: '#FFF',
          borderRadius: 5,
          minHeight: 40,
          display: 'table',
        }}>
          <Paragraph style={{
            display: 'table-cell',
            verticalAlign: 'middle',
            padding: '0 10px',
            maxWidth: 350,
          }}>
            <div id={id}/>
          </Paragraph>
        </div>
      </Space>
    );
  } else {
    return (
      <Space style={{float: float, marginRight: 15, marginTop: 5, marginBottom: 5}}>
        <div style={{
          backgroundColor: 'rgba(22, 184, 243, 0.8)',
          borderRadius: 5,
          minHeight: 40,
          display: 'table',
        }}>
          <Paragraph style={{
            display: 'table-cell',
            verticalAlign: 'middle',
            padding: '0 10px',
            maxWidth: 350,
          }}>
            <div id={id}/>
          </Paragraph>
        </div>
        <Avatar src={current.avatar}/>
      </Space>
    );
  }
}

const ChatWindow: React.FC<{ current: API.User, connector: WebSocket | null, data: API.MessageVO[], chat: API.User | undefined }> =
  (props) => {
    const end = useRef<HTMLDivElement>(null);

    const {current, connector, data, chat} = props;

    useEffect(() => {
      if (!chat) return;
      const vditor = new Vditor("vditor", {
        ctrlEnter: () => {
          // TODO 不知道怎么自定义快捷键实现换行
        },
        toolbar: ['emoji', {
          hotkey: 'Enter',
          name: 'send',
          tip: '发送',
          tipPosition: 'n',
          className: 'right',
          icon: '<img width=16 style="float: right" src="/send.svg"/>',
          click: () => {
            if (vditor.getValue().trim() === '') return;
            connector?.send(JSON.stringify({
              from: current.username,
              to: chat.username,
              content: vditor.getValue(),
              createTime: now()
            }));
            vditor.setValue('');
          }
        }],
        mode: 'ir',
        width: '100%',
        counter: {enable: true, type: 'markdown'},
        height: 200,
        preview: {
          theme: {current: 'light'},
          hljs: {lineNumber: true, style: 'dracula'},
          // maxWidth: 200
        },
        after: () => {
          vditor.setValue('');
        }
      });
    }, [chat]);

    useEffect(() => {
      if (end?.current) end.current.scrollIntoView({behavior: 'smooth'});
    },);

    if (!chat) return <div/>;

    return (
      <div style={{width: '100%'}}>
        <PageHeader
          avatar={{src: chat.avatar, size: 'large'}}
          ghost={true}
          title={<Text style={{color: ZIMA_BLUE}}>{chat.username}</Text>}
          extra={[]}
          style={{height: 80, borderBottom: '1px solid rgba(200,200,200,0.5)'}}
        />
        <div style={{
          height: 440,
          width: '100%',
        }}>
          <Space direction='vertical'
                 style={{
                   height: 440,
                   marginLeft: '2%',
                   width: '98%',
                   border: 'true',
                   minHeight: 440,
                   minWidth: '98%',
                   overflowX: 'auto',
                 }}>
            {
              data.filter(datum => current.username === datum.from || current.username === datum.to)
                .map(datum => <Message key={datum.id} current={current} msg={datum} chat={chat}/>)
            }
            <div style={{height: 1}} ref={end}/>
          </Space>
        </div>
        <div id="vditor" className="vditor" style={{border: '0px', width: '100%'}}/>
      </div>
    )
  }

const AccountSettings: React.FC = () => {
  const {initialState} = useModel('@@initialState');
  const {currentUser} = initialState || {};
  const style = {fontSize: '20px', opacity: 0.5};
  const {connector, msg} = useWebsocket(`ws://localhost:11009/${currentUser?.user.username}`);

  const [active, setActive] = useState<string>('message');
  const [msgList, setMsgList] = useState<API.MessageVO[]>([]);
  const [friends, setFriends] = useState<API.User[]>([]);
  // 当前聊天的对象
  const [chat, setChat] = useState<API.User>();

  const second = () => {
    if (active === 'message') return <FriendList chat={chat} data={friends} setChat={setChat} setMessages={setMsgList}/>
    return <Other/>
  }

  useEffect(() => {
    if (msg) setMsgList([...msgList, msg])
  }, [msg]);

  useEffect(() => {
    listUser().then(result => setFriends(result.data?.map(vo => vo.user) || []));
  }, [currentUser]);

  return (
    <div style={{width: '70%', height: '700px', margin: "30px auto"}}>
      <Row style={{height: '100%'}}>
        <Col span={1.5} style={{backgroundColor: '#EEE'}}>
          <Space direction='vertical'>
            <Avatar size='large' icon={<img alt="" src={currentUser?.user?.avatar}/>}
                    style={{margin: '40px 10px 5px 10px'}}/>
            <Tabs style={{width: '60px'}} tabPosition='left' type='line' onChange={(key) => setActive(key)}
                  defaultActiveKey='message' tabBarGutter={5}>
              <TabPane tab={<MessageOutlined style={style}/>} key='message'/>
              <TabPane tab={<UserSwitchOutlined style={style}/>} key='user'/>
              <TabPane tab={<CodeSandboxOutlined style={style}/>} key='collect'/>
              <TabPane tab={<FolderOutlined style={style}/>} key='doc'/>
              <TabPane tab={<GlobalOutlined style={style}/>} key='global'/>
            </Tabs>
          </Space>
        </Col>
        <Col span={6} style={{backgroundColor: '#EEE', borderRight: '1px solid lightgray'}}>
          {second()}
        </Col>
        <Col span={16} style={{backgroundColor: '#F0F0F0'}}>
          <ChatWindow current={currentUser?.user || {}} connector={connector.current} data={msgList} chat={chat}/>
        </Col>
      </Row>
    </div>
  );
};

export default AccountSettings;
