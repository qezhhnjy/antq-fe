import React, {useEffect, useRef, useState} from 'react';
import {Avatar, Card, Col, Input, PageHeader, Row, Space, Tabs, Typography} from 'antd';
import {useModel} from 'umi';
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

const {Meta} = Card;
const {Search} = Input;
const {TabPane} = Tabs;
const {Paragraph, Text,} = Typography;
const wsInit = (user: API.User) => new WebSocket(`ws://127.0.0.1:11009?username=${user.username}`);

const MessageList: React.FC<{ data: any }> = (props) => {
  const {data} = props;
  return (
    <div>
      <div style={{height: 60, backgroundColor: '#EEE'}}>
        <Search style={{margin: '20px', width: 200}} placeholder='搜索'/>
      </div>
      <Tabs style={{width: '240px'}} tabPosition='left' type="card" tabBarGutter={0}>
        {
          data.map((d: any) => <TabPane tab={
            <Meta style={{width: '240px'}} avatar={<Avatar size='large' src={d.avatar}/>}
                  title={
                    <Row>
                      <Col span={17} style={{textAlign: 'left'}}>
                        <Text style={{color: ZIMA_BLUE}}>{d.title}</Text>
                      </Col>
                      <Col span={3} style={{textAlign: 'right'}}>
                        <Text style={{fontSize: '8px'}} type="secondary">11:20</Text>
                      </Col>
                    </Row>
                  }
                  description={<div style={{textAlign: 'left'}}><Text type="secondary">{d.desc}</Text></div>}
            />
          } key={d.title}/>)
        }
      </Tabs>
    </div>
  );
}

const Other: React.FC = () => {
  return (
    <div style={{height: 60, backgroundColor: '#EEE'}}>
      <Search style={{margin: '20px', width: 200}} placeholder='搜索'/>
    </div>
  )
}

const Message: React.FC<{ current: API.User, msg: API.MessageVO }> = (props) => {
  const {current, msg} = props;
  const {user, content} = msg;
  const float = current.username === user.username ? 'right' : 'left';

  if (float === 'left') {
    return (
      <Space style={{float: float, marginTop: 5, marginBottom: 5}}>
        <Avatar src={user.avatar}/>
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
            maxWidth: 300,
          }}>{content}</Paragraph>
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
          }}>{content}</Paragraph>
        </div>
        <Avatar src={user.avatar}/>
      </Space>
    );
  }
}

const ChatWindow: React.FC<{ current: API.User, ws: any, data: API.MessageVO[] }> =
  (props) => {
    const {current, ws, data} = props;

    useEffect(() => {
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
            if (!ws.current) ws.current = wsInit(current)
            ws.current.send(JSON.stringify({user: current, content: vditor.getValue(), time: now()}));
            vditor.setValue('');
          }
        }],
        mode: 'ir',
        width: 'auto',
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
    }, []);

    return (
      <div>
        <PageHeader
          avatar={{src: '/Amy.jpg'}}
          ghost={true}
          title={<Text style={{color: ZIMA_BLUE}}>Amy</Text>}
          extra={[]}
          style={{height: 60, borderBottom: '1px solid rgba(200,200,200,0.5)'}}
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
                   overflowX: 'scroll',
                   border: 'true',
                   minHeight: 440,
                   minWidth: '98%'
                 }}>
            {
              data.map(datum => <Message key={datum.time} current={current} msg={datum}/>)
            }
          </Space>
        </div>
        <div id="vditor" className="vditor" style={{border: '0px'}}/>
      </div>
    )
  }

const AccountSettings: React.FC = () => {
  const {initialState} = useModel('@@initialState');
  const {currentUser} = initialState || {};
  const style = {fontSize: '20px', opacity: 0.5};
  const [active, setActive] = useState<string>('message');
  const [messages, setMessages] = useState<API.MessageVO[]>([]);

  const data: any[] = [
    {avatar: '/qezhhnjy.jpg', title: 'qezhhnjy', desc: '这就是聊天描述内容!!!!!!!!!!!!!######!!!!!!!SAFAFSASFSFFSSF!!!'},
    {avatar: '/Amy.jpg', title: 'Amy', desc: 'This is the description'},
    {avatar: currentUser?.user.avatar, title: 'zhaoyangfu', desc: 'This is the description'},
  ]

  const ws = useRef<WebSocket | null>(null);

  const second = () => {
    if (active === 'message') return <MessageList data={data}/>
    return <Other/>
  }

  useEffect(() => {
    ws.current = wsInit(currentUser?.user || {});
    ws.current.onmessage = (e) => {
      const temp: API.MessageVO[] = [];
      messages.push(JSON.parse(e.data));
      messages.forEach(m => temp.push(m));
      setMessages(temp);
    }
    return () => {
      ws.current?.close();
    }
  }, [currentUser])

  return (
    <div style={{width: '70%', height: '700px', margin: "30px auto"}}>
      <Row style={{height: '100%'}}>
        <Col flex="60px" style={{backgroundColor: '#EEE'}}>
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
        <Col flex="240px" style={{backgroundColor: '#EEE', borderRight: '1px solid lightgray'}}>
          {second()}
        </Col>
        <Col flex='auto' style={{backgroundColor: '#F0F0F0'}}>
          <ChatWindow current={currentUser?.user || {}} ws={ws} data={messages}/>
        </Col>
      </Row>
    </div>
  );
};

export default AccountSettings;
