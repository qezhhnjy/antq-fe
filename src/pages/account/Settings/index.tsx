import React from 'react';
import {Avatar, Card, Col, Input, Row, Space, Tabs, Typography} from 'antd';
import {useModel} from 'umi';
import {
  CodeSandboxOutlined,
  FolderOutlined,
  GlobalOutlined,
  MessageOutlined,
  UserSwitchOutlined
} from '@ant-design/icons';
import {ZIMA_BLUE} from "@/utils/common";

const {Meta} = Card;
const {Search} = Input;
const {TabPane} = Tabs;
const {Title, Paragraph, Text, Link} = Typography;
const []: string = ['lightgray', 'lightgray', 'lightgray', 'lightgray', 'lightgray'];

const AccountSettings: React.FC = () => {
  const {initialState} = useModel('@@initialState');
  const {currentUser} = initialState || {};
  const style = {fontSize: '20px', opacity: 0.5};

  const data: any[] = [
    {avatar: '/qezhhnjy.jpg', title: 'qezhhnjy', desc: '这就是聊天描述内容!!!!!!!!!!!!!######!!!!!!!SAFAFSASFSFFSSF!!!'},
    {avatar: '/Amy.jpg', title: 'Amy', desc: 'This is the description'},
    {avatar: currentUser?.user.avatar, title: 'zhaoyangfu', desc: 'This is the description'},
  ]

  return (
    <div style={{width: '70%', height: '700px', margin: "30px auto"}}>
      <Row style={{height: '100%'}}>
        <Col flex="60px" style={{backgroundColor: '#EEE'}}>
          <Space direction='vertical'>
            <Avatar size='large' icon={<img alt="" src={currentUser?.user?.avatar}/>}
                    style={{margin: '40px 10px 5px 10px'}}/>
            <Tabs style={{width: '60px'}} tabPosition='left' type='line' defaultActiveKey='message' tabBarGutter={5}>
              <TabPane tab={<MessageOutlined style={style}/>} key='message'/>
              <TabPane tab={<UserSwitchOutlined style={style}/>} key='user'/>
              <TabPane tab={<CodeSandboxOutlined style={style}/>} key='collect'/>
              <TabPane tab={<FolderOutlined style={style}/>} key='doc'/>
              <TabPane tab={<GlobalOutlined style={style}/>} key='global'/>
            </Tabs>
          </Space>
        </Col>
        <Col flex="240px" style={{backgroundColor: '#EEE', borderRight: '1px solid lightgray'}}>
          <Space direction='vertical' size='small'>
            <div style={{height: 50, borderBottom: '1px', backgroundColor: '#FFF'}}>
              <Search style={{margin: '10px 20px 0px 20px', width: 200}} placeholder='搜索'/>
            </div>
            <Tabs style={{width: '240px'}} tabPosition='left' type="card" tabBarGutter={0}>
              {
                data.map(d => <TabPane tab={
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
          </Space>
        </Col>
        <Col flex='auto' style={{backgroundColor: '#FFF'}}/>
      </Row>
    </div>
  );
};

export default AccountSettings;
