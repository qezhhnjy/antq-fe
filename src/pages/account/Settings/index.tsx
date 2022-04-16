import {PageContainer} from '@ant-design/pro-layout';
import React from 'react';
import {useModel} from "@@/plugin-model/useModel";
import {Col, Row} from 'antd';

const AccountSettings: React.FC = () => {
  const {initialState} = useModel('@@initialState');
  const {currentUser} = initialState || {};
  return (
    <PageContainer>
      <h1>个人设置</h1>
      <span>{JSON.stringify(currentUser)}</span>
      <Row style={{width: '60%', height: '600px'}}>
        <Col flex={60} style={{backgroundColor: 'darkblue'}}/>
        <Col flex={240}/>
        <Col flex='auto'/>
      </Row>
    </PageContainer>
  );
};

export default AccountSettings;
