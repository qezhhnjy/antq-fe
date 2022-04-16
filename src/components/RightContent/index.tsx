import { Space } from 'antd';
import React from 'react';
import styles from './index.less';
import { useModel } from '@@/plugin-model/useModel';
import AvatarDropdown from '@/components/RightContent/AvatarDropdown';
import NoticeIconView from '../NoticeIcon';
import { SelectLang } from 'umi';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }
  return (
    <Space className={className}>
      <NoticeIconView />
      <AvatarDropdown />
      <SelectLang className={styles.action} />
    </Space>
  );
};
export default GlobalHeaderRight;
