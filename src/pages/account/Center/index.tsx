import React, {useEffect, useState} from 'react';
import {GridContent} from '@ant-design/pro-layout';
import {Avatar, Card, Col, Divider, Row, Tabs, Tag} from 'antd';
import styles from './Center.less';
import {userInfo} from '@/services/ant-design-pro/antq-api';
import {ManOutlined, PhoneOutlined, PrinterOutlined, UserOutlined, WomanOutlined,} from '@ant-design/icons';
import FinanceCardGroup from '@/components/snowball/FinanceCardGroup';
import {ZIMA_BLUE, ZIMA_BLUE_REVERSE} from '@/utils/common';

const {TabPane} = Tabs;

export interface TagType {
  key: string;
  label: string;
}

const tabs = ['自选股', '指数', '基金'];

const AccountCenter: React.FC = () => {
  const [data, setData] = useState<API.UserVO>();
  const [activeKey, setActiveKey] = useState(tabs[0]);

  useEffect(() => {
    userInfo().then(result => setData(result?.data));
  }, []);

  const {user: currentUser, roleList, menuMap, optionalList} = data || {};
  const roleTags = roleList?.map((role) => ({key: role.id || '', label: role.roleName || ''}));
  const menuList: { name: string; status: boolean }[] = [];
  for (const menu in menuMap) {
    if (menuMap[menu]) menuList.push({name: menu, status: menuMap[menu]});
  }

  //  渲染用户信息
  const renderUserInfo = ({nickname, phone, email}: Partial<API.User>) => {
    return (
      <div className={styles.detail}>
        <p><UserOutlined style={{marginRight: 8,}}/>{nickname}</p>
        <p><PhoneOutlined style={{marginRight: 8,}}/>{phone}</p>
        <p><PrinterOutlined style={{marginRight: 8,}}/>{email}</p>
      </div>
    );
  };

  const TagList: React.FC<{ tags: TagType[] }> = ({tags}) => {

    return (
      <div className={styles.tags}>
        <div className={styles.tagsTitle}>角色</div>
        {(tags || []).map((item) => (
          <Tag style={{fontSize: '14px'}} key={item.key} color={ZIMA_BLUE}>
            {item.label}
          </Tag>
        ))}
      </div>
    );
  };

  return (
    <GridContent>
      <Row gutter={12}>
        <Col lg={6} md={24}>
          <Card bordered={false} style={{marginBottom: 24}}>
            {currentUser && (
              <div>
                <div className={styles.avatarHolder}>
                  <Avatar size={110} icon={<img alt="" src={currentUser.avatar}/>}/>
                  <div className={styles.name}>{currentUser.username}</div>
                  <div>
                    {currentUser.nickname}
                    {currentUser.gender === 1 ? (
                      <ManOutlined spin style={{color: ZIMA_BLUE, margin: 5}}/>
                    ) : currentUser.gender === 0 ? (
                      <WomanOutlined spin style={{color: ZIMA_BLUE_REVERSE, margin: 5}}/>
                    ) : (
                      '未知'
                    )}
                  </div>
                </div>
                {renderUserInfo(currentUser)}
                <Divider dashed/>
                <TagList tags={roleTags || []}/>
                <Divider style={{marginTop: 16}} dashed/>
                <div className={styles.team}>
                  <div className={styles.teamTitle}>自选</div>
                  <Row gutter={[12, 12]}>
                    {optionalList &&
                    optionalList.map((optional) => (
                      <Col key={optional.symbol} lg={12} xl={6}>
                        <Tag color={ZIMA_BLUE}>{optional.symbol}</Tag>
                      </Col>
                    ))}
                  </Row>
                </div>
              </div>
            )}
          </Card>
        </Col>
        <Col lg={18} md={24}>
          <Card>
            <Tabs defaultActiveKey={tabs[0]} onChange={(key) => setActiveKey(key)}>
              <TabPane tab={tabs[0]} key={tabs[0]}>
                {optionalList ?
                  <FinanceCardGroup colspan={6} active={activeKey === tabs[0]} optionals={optionalList}/> : null}
              </TabPane>
              <TabPane tab={tabs[1]} key={tabs[1]}>
                {optionalList ? <FinanceCardGroup colspan={6} active={activeKey === tabs[1]}
                                                  optionals={optionalList.slice(0, 1)}/> : null}
              </TabPane>
              <TabPane tab={tabs[2]} key={tabs[2]}>
                {optionalList ? <FinanceCardGroup colspan={6} active={activeKey === tabs[2]}
                                                  optionals={optionalList.slice(1, 3)}/> : null}
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </GridContent>
  );
};

export default AccountCenter;
