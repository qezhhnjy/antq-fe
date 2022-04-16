import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import {useModel} from "@@/plugin-model/useModel";

const AccountSettings: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  return (
    <PageContainer>
      <h1>个人设置</h1>
      <span>{JSON.stringify(currentUser)}</span>
    </PageContainer>
  );
};

export default AccountSettings;
