import React from 'react';
import {Avatar, Card, Col, Input, Row, Space, Tabs} from 'antd';
import {useModel} from 'umi';
import {
  CodeSandboxOutlined,
  FolderOutlined,
  GlobalOutlined,
  MessageOutlined,
  UserSwitchOutlined
} from '@ant-design/icons';

const {Meta} = Card;
const {Search} = Input;
const {TabPane} = Tabs;

const AccountSettings: React.FC = () => {
  const {initialState} = useModel('@@initialState');
  const {currentUser} = initialState || {};
  const style = {fontSize: '20px', margin: '6px 20px', color: 'lightgray', opacity: 0.7};

  const data: any[] = [
    {avatar: '/qezhhnjy.jpg', title: 'qezhhnjy', desc: '这就是聊天描述内容!!!!!!!!!!!!!######!!!!!!!!!!'},
    {avatar: '/Amy.jpg', title: 'Amy', desc: 'This is the description'},
    {avatar: currentUser?.user.avatar, title: 'zhaoyangfu', desc: 'This is the description'},
  ]

  return (
    <div style={{width: '60%', height: '700px', margin: "30px auto"}}>
      <Row style={{height: '100%'}}>
        <Col flex="60px" style={{backgroundColor: '#333'}}>
          <Space direction='vertical'>
            <Avatar size='large' icon={<img alt="" src={currentUser?.user?.avatar}/>}
                    style={{margin: '40px 10px 5px 10px'}}/>
            <MessageOutlined style={style}/>
            <UserSwitchOutlined style={style}/>
            <CodeSandboxOutlined style={style}/>
            <FolderOutlined style={style}/>
            <GlobalOutlined style={style}/>
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
                        title={d.title}
                        description={d.desc}
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
