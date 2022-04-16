import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import React, {useRef, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import UserForm from '@/pages/user/Manager/UserForm';
import {addUser, deleteUser, queryUser, updateUser} from '@/services/ant-design-pro/antq-api';
import {Avatar, Input, Tag} from 'antd';
import {
  DeleteOutlined,
  FormOutlined,
  IdcardTwoTone,
  InfoCircleOutlined,
  ManOutlined, SearchOutlined,
  TrademarkCircleFilled,
  UserAddOutlined,
  UserOutlined,
  WomanOutlined,
} from '@ant-design/icons';
import InfoDetail from '@/components/Detail';
import DeleteButton from '@/components/DeleteButton';
import {ZIMA_BLUE, ZIMA_BLUE_REVERSE} from "@/utils/common";

const {Search} = Input;
const UserManager: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const users: ProColumns<API.UserVO>[] = [
    {dataIndex: 'index', valueType: 'indexBorder', width: 40},
    {
      title: <IdcardTwoTone style={{fontSize: '20px'}}/>,
      dataIndex: ['user', 'avatar'],
      render: (avatar) => <Avatar src={avatar}/>,
    },
    {
      title: '用户名称',
      dataIndex: ['user', 'username'],
      render: (username) => (
        <Tag style={{fontSize: '14px'}} color={ZIMA_BLUE} icon={<UserOutlined style={{fontSize: 16}}/>}>
          {username}
        </Tag>
      ),
    },
    {
      title: '昵称',
      dataIndex: ['user', 'nickname'],
      // render: (nickname) => <span color={ZIMA_BLUE}>{nickname}</span>,
    },
    {
      title: '手机号码',
      dataIndex: ['user', 'phone'],
      // render: (phone) => <span color={ZIMA_BLUE}>{phone}</span>,
    },
    {
      title: '邮箱',
      dataIndex: ['user', 'email'],
      // render: (email) => <span color={ZIMA_BLUE}>{email}</span>,
    },
    {
      title: '性别',
      dataIndex: ['user', 'gender'],
      render: (g) =>
        g === 1 ? (
          <ManOutlined spin={true} style={{color: ZIMA_BLUE}}/>
        ) : g === 0 ? (
          <WomanOutlined spin={true} style={{color: '#FA541C'}}/>
        ) : (
          '未知'
        ),
    },
    {
      title: '角色',
      dataIndex: 'roleList',
      render: (roleList: any) => {
        return roleList?.map((role: API.Role) => (
          <Tag key={role.id} icon={<TrademarkCircleFilled/>} color={ZIMA_BLUE}>
            {role.roleName}
          </Tag>
        ));
      },
    },
    {
      title: '操作',
      key: 'option',
      width: 200,
      valueType: 'option',
      render: (text, record) => {
        const {user, roleList} = record;
        const info: API.DetailInfo = {
          title: <InfoCircleOutlined style={{fontSize: 16}}/>,
          avatar: user.avatar,
          name: user.username || '',
          introduction: user.nickname,
          tag:
            user.gender === 1 ? (
              <ManOutlined spin={true} style={{color: ZIMA_BLUE}}/>
            ) : user.gender === 0 ? (
              <WomanOutlined spin={true} style={{color: ZIMA_BLUE_REVERSE}}/>
            ) : (
              '未知'
            ),
          info: [
            {label: '邮箱', value: user.email},
            {label: '手机', value: user.phone},
            ...roleList?.map((role) => ({label: '角色', value: role.roleName})),
          ],
        };
        return [
          <InfoDetail key={user.id} info={info}/>,
          <UserForm
            key="update"
            table={actionRef}
            title={<FormOutlined style={{fontSize: 16}}/>}
            info={record}
            onFinish={updateUser}
          />,
          <DeleteButton
            title="确定删除用户?"
            table={actionRef}
            request={() => deleteUser(user.id || '')}
            key="del"
          >
            <DeleteOutlined style={{fontSize: 16}}/>
          </DeleteButton>,
        ];
      },
    },
  ];

  const info: API.UserVO = {
    user: {},
    roleList: [],
  };

  const [search, setSearch] = useState('');

  return (
    <PageContainer>
      <ProTable<API.UserVO>
        columns={users}
        pagination={{
          size: 'default',
          pageSize: 10,
        }}
        actionRef={actionRef}
        request={async (params) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          const {pageSize, current: pageNum} = params;
          return queryUser({pageSize, pageNum, search}).then((result) => ({
            data: result.data?.list,
            success: true,
            total: result.data?.total,
          }));
        }}
        // cardProps={{ title: '用户列表', bordered: false }}
        headerTitle={
          <Search
            allowClear
            enterButton={<SearchOutlined />}
            onSearch={(value) => {
              setSearch(value);
              actionRef.current?.reload();
            }}
          />
        }
        rowKey={(data) => data.user.id || ''}
        toolBarRender={() => [
          <UserForm table={actionRef} title={<UserAddOutlined style={{fontSize: 16}}/>} info={info}
                    onFinish={addUser}/>,
        ]}
        search={false}
      />
    </PageContainer>
  );
};

export default UserManager;
