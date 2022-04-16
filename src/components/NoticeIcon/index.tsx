import React, {useEffect, useState} from 'react';
import {message, Tag} from 'antd';
import {groupBy} from 'lodash';
import moment from 'moment';
import {useModel} from 'umi';

import NoticeIcon from './NoticeIcon';
import styles from './index.less';
import {NoticeStatus, NoticeType} from '@/services/ant-design-pro/enums';
import { ZIMA_BLUE } from '@/utils/common';

export type GlobalHeaderRightProps = {
  fetchingNotices?: boolean;
  onNoticeVisibleChange?: (visible: boolean) => void;
  onNoticeClear?: (tabName?: string) => void;
};

const getNoticeData = (notices: API.Notice[]): Record<number, API.Notice[]> => {
  if (!notices || notices.length === 0 || !Array.isArray(notices)) {
    return {};
  }

  const newNotices = notices.map((notice) => {
    const newNotice = {...notice};

    if (newNotice.productTime) {
      newNotice.productTime = moment(notice.productTime as string).fromNow();
    }

    if (newNotice.extra && newNotice.status) {
      const color = {
        todo: '',
        processing: ZIMA_BLUE,
        urgent: 'red',
        doing: 'gold',
      }[newNotice.status];
      newNotice.extra = (
        <Tag
          color={color}
          style={{
            marginRight: 0,
          }}
        >
          {newNotice.extra}
        </Tag>
      ) as any;
    }

    return newNotice;
  });
  return groupBy(newNotices, 'type');
};

const getUnreadData = (noticeData: Record<number, API.Notice[]>) => {
  const unreadMsg: Record<number, number> = {};
  Object.keys(noticeData).forEach((key) => {
    const value = noticeData[key];

    if (!unreadMsg[key]) {
      unreadMsg[key] = 0;
    }

    if (Array.isArray(value)) {
      unreadMsg[key] = value.filter((item) => !item.status).length;
    }
  });
  return unreadMsg;
};

const NoticeIconView: React.FC = () => {
  const {initialState} = useModel('@@initialState');
  const {currentUser} = initialState || {};
  const [notices, setNotices] = useState<API.Notice[]>([]);

  useEffect(() => {
    setNotices(currentUser?.noticeList || []);
  }, [currentUser]);

  const noticeData = getNoticeData(notices);
  const unreadMsg = getUnreadData(noticeData || {});

  const changeReadState = (id: string) => {
    setNotices(
      notices.map((item) => {
        const notice = {...item};
        if (notice.id === id) {
          notice.status = NoticeStatus.READ;
        }
        return notice;
      }),
    );
  };

  const clearReadState = (title: string, key: number) => {
    setNotices(
      notices.map((item) => {
        const notice = {...item};
        if (notice.type === key) {
          notice.status = NoticeStatus.READ;
        }
        return notice;
      }),
    );
    message.success(`${'清空了'} ${title}`);
  };

  return (
    <NoticeIcon
      className={styles.action}
      count={currentUser?.noticeList?.length || 0}
      onItemClick={(item) => {
        changeReadState(item.id!);
      }}
      onClear={(title: string, key: number) => clearReadState(title, key)}
      loading={false}
      clearText="清空"
      viewMoreText="查看更多"
      onViewMore={() => message.info('Click on view more')}
      clearClose
    >
      <NoticeIcon.Tab
        tabKey={NoticeType.NOTIFICATION}
        count={unreadMsg[NoticeType.NOTIFICATION]}
        list={noticeData[NoticeType.NOTIFICATION]}
        title="通知"
        emptyText="你已查看所有通知"
        showViewMore
      />
      <NoticeIcon.Tab
        tabKey={NoticeType.MESSAGE}
        count={unreadMsg[NoticeType.MESSAGE]}
        list={noticeData[NoticeType.MESSAGE]}
        title="消息"
        emptyText="您已读完所有消息"
        showViewMore
      />
      <NoticeIcon.Tab
        tabKey={NoticeType.EVENT}
        title="待办"
        emptyText="你已完成所有待办"
        count={unreadMsg[NoticeType.EVENT]}
        list={noticeData[NoticeType.EVENT]}
        showViewMore
      />
    </NoticeIcon>
  );
};

export default NoticeIconView;
