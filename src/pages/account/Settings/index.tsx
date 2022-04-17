import React, {useState} from 'react';
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

const {Meta} = Card;
const {Search} = Input;
const {TabPane} = Tabs;
const {Title, Paragraph, Text, Link} = Typography;

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

const Message: React.FC<{ current: API.User, message: API.MessageVO }> = (props) => {
  const {current, message} = props;
  const {user, time, content} = message;
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

const ChatWindow: React.FC<{ current: API.User }> = (props) => {
  const {current} = props;

  return (
    <div>
      <PageHeader
        avatar={{src: '/Amy.jpg'}}
        ghost={true}
        title={<Text style={{color: ZIMA_BLUE}}>Amy</Text>}
        extra={[]}
        style={{height: 60, borderBottom: '1px solid rgba(200,200,200,0.5)'}}
      />
      <Space direction='vertical' style={{height: 440, marginLeft: '2%', width: '98%', overflowX: 'auto'}}>
        <Message current={current} message={{user: current, content: '哈哈哈哈'}}/>
        <Message current={current} message={{user: {username: 'Amy', avatar: '/Amy.jpg'}, content: '哈哈哈哈'}}/>
        <Message current={current} message={{user: current, content: '哈哈哈哈'}}/>
        <Message current={current} message={{user: current, content: '哈哈哈哈'}}/>
        <Message current={current} message={{user: {username: 'Amy', avatar: '/Amy.jpg'}, content: '哈哈哈哈'}}/>
        <Message current={current} message={{user: current, content: '哈哈哈哈'}}/>
        <Message current={current} message={{user: current, content: '哈哈哈哈'}}/>
        <Message current={current} message={{
          user: {username: 'Amy', avatar: '/Amy.jpg'},
          content: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈'
        }}/>
        <Message current={current} message={{user: current, content: '哈哈哈哈'}}/>
        <Message current={current} message={{user: current, content: '哈哈哈哈'}}/>
        <Message current={current} message={{user: {username: 'Amy', avatar: '/Amy.jpg'}, content: '哈哈哈哈'}}/>
        <Message current={current} message={{user: current, content: '哈哈哈哈'}}/>
        <Message current={current} message={{user: current, content: '哈哈哈哈'}}/>
        <Message current={current} message={{user: {username: 'Amy', avatar: '/Amy.jpg'}, content: '哈哈哈哈'}}/>
        <Message current={current} message={{user: current, content: '哈哈哈哈'}}/>
        <Message current={current} message={{user: current, content: '哈哈哈哈'}}/>
        <Message current={current} message={{user: {username: 'Amy', avatar: '/Amy.jpg'}, content: '哈哈哈哈'}}/>
        <Message current={current} message={{user: current, content: '哈哈哈哈'}}/>
        <Message current={current} message={{user: current, content: '哈哈哈哈'}}/>
        <Message current={current} message={{user: {username: 'Amy', avatar: '/Amy.jpg'}, content: '哈哈哈哈'}}/>
        <Message current={current} message={{user: current, content: '哈哈哈哈'}}/>
        <Message current={current} message={{user: current, content: '哈哈哈哈'}}/>
        <Message current={current} message={{user: {username: 'Amy', avatar: '/Amy.jpg'}, content: '哈哈哈哈'}}/>
        <Message current={current} message={{user: current, content: '哈哈哈哈'}}/>
        <Message current={current} message={{user: current, content: '哈哈哈哈'}}/>
        <Message current={current} message={{user: {username: 'Amy', avatar: '/Amy.jpg'}, content: '哈哈哈哈'}}/>
        <Message current={current} message={{user: current, content: '哈哈哈哈'}}/>
        <Message current={current} message={{user: current, content: '哈哈哈哈'}}/>
        <Message current={current} message={{user: {username: 'Amy', avatar: '/Amy.jpg'}, content: '哈哈哈哈'}}/>
        <Message current={current} message={{user: current, content: '哈哈哈哈'}}/>
        <Message current={current} message={{user: current, content: '哈哈哈哈'}}/>
        <Message current={current} message={{user: {username: 'Amy', avatar: '/Amy.jpg'}, content: '哈哈哈哈'}}/>
        <Message current={current} message={{user: current, content: '哈哈哈哈'}}/>
      </Space>
      <div style={{height: 200, borderTop: '1px solid rgba(200,200,200,0.5)'}}>发送</div>
    </div>
  )
}

const AccountSettings: React.FC = () => {
  const {initialState} = useModel('@@initialState');
  const {currentUser} = initialState || {};
  const style = {fontSize: '20px', opacity: 0.5};
  const [active, setActive] = useState<string>('message');

  const data: any[] = [
    {avatar: '/qezhhnjy.jpg', title: 'qezhhnjy', desc: '这就是聊天描述内容!!!!!!!!!!!!!######!!!!!!!SAFAFSASFSFFSSF!!!'},
    {avatar: '/Amy.jpg', title: 'Amy', desc: 'This is the description'},
    {avatar: currentUser?.user.avatar, title: 'zhaoyangfu', desc: 'This is the description'},
  ]

  const second = () => {
    if (active === 'message') return <MessageList data={data}/>
    return <Other/>
  }

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
          <ChatWindow current={currentUser?.user || {}}/>
        </Col>
      </Row>
    </div>
  );
};

export default AccountSettings;
