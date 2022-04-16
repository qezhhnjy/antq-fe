import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { addRole, deleteRole, queryRole, updateRole } from '@/services/ant-design-pro/antq-api';
import RoleForm from '@/pages/role/Manager/RoleForm';
import InfoDetail from '@/components/Detail';
import DeleteButton from '@/components/DeleteButton';
import { Input, Tag } from 'antd';
import {
  DeleteOutlined,
  FormOutlined,
  InfoCircleOutlined,
  SearchOutlined,
  TrademarkCircleOutlined,
  UsergroupAddOutlined
} from '@ant-design/icons';
import { ZIMA_BLUE } from '@/utils/common';

const { Search } = Input;

const RoleManager: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const roles: ProColumns<API.RoleVO>[] = [
    { dataIndex: 'index', valueType: 'indexBorder', width: 40 },
    {
      title: '角色名称',
      dataIndex: ['role', 'roleName'],
      render: (roleName) => (
        <Tag style={{ fontSize: '14px' }} color={ZIMA_BLUE} icon={<TrademarkCircleOutlined />}>
          {roleName}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'option',
      width: 200,
      valueType: 'option',
      render: (text, record) => {
        const { role, menuList } = record;
        const info: API.DetailInfo = {
          title: <InfoCircleOutlined style={{fontSize: 16}}/>,
          name: role?.roleName || '',
          info: menuList?.map((menu) => ({ label: '权限', value: menu.menuName })),
        };
        return [
          <InfoDetail key={role?.id} info={info} />,
          <RoleForm
            key="update"
            table={actionRef}
            title={<FormOutlined style={{fontSize: 16}}/>}
            info={record}
            onFinish={updateRole}
          />,
          <DeleteButton
            title="确定删除角色?"
            table={actionRef}
            request={() => deleteRole(role?.id || '')}
            key="del"
          >
            <DeleteOutlined style={{fontSize: 16}}/>
          </DeleteButton>,
        ];
      },
    },
  ];

  const [search, setSearch] = useState('');

  return (
    <PageContainer>
      <ProTable<API.RoleVO>
        pagination={{
          size: 'default',
          pageSize: 10,
        }}
        columns={roles}
        actionRef={actionRef}
        request={async (params) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          const { pageSize, current: pageNum } = params;
          return queryRole({ pageSize, pageNum, search }).then((result) => ({
            data: result.data?.list,
            success: true,
            total: result.data?.total,
          }));
        }}
        // cardProps={{ title: '角色列表', bordered: true }}
        headerTitle={
          <Search
            allowClear
            enterButton={<SearchOutlined />}
            onSearch={(v) => {
              setSearch(v);
              actionRef.current?.reload();
            }}
          />
        }
        rowKey={(data) => data.role?.id || ''}
        search={false}
        toolBarRender={() => [
          <RoleForm table={actionRef} title={<UsergroupAddOutlined style={{fontSize: 16}} />} onFinish={addRole} info={{}} />,
        ]}
      />
    </PageContainer>
  );
};

export default RoleManager;
