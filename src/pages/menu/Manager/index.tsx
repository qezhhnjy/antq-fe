import React, {useRef, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import ProTable, {ActionType, ProColumns} from '@ant-design/pro-table';
import {addMenu, deleteMenu, queryMenu, updateMenu} from '@/services/ant-design-pro/antq-api';
import {Avatar, Input, Tag} from 'antd';
import MenuForm from '@/pages/menu/Manager/MenuForm';
import InfoDetail from '@/components/Detail';
import DeleteButton from '@/components/DeleteButton';
import {
  AppstoreAddOutlined,
  DeleteOutlined,
  FormOutlined,
  InfoCircleOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  PlayCircleFilled,
  RightCircleOutlined,
  SearchOutlined
} from '@ant-design/icons';
import {ZIMA_BLUE} from "@/utils/common";

const {Search} = Input;

const MenuManager: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const menus: ProColumns<API.MenuVO>[] = [
    {dataIndex: 'index', valueType: 'indexBorder', width: 40},
    {title: '图标', dataIndex: ['menu', 'icon'], render: (avatar) => <Avatar src={avatar}/>},
    {
      title: '菜单名称',
      dataIndex: ['menu', 'menuName'],
      render: (menuName) => (
        <Tag style={{fontSize: '14px'}} color={ZIMA_BLUE}>
          {menuName}
        </Tag>
      ),
    },
    {
      title: '权限',
      dataIndex: ['menu', 'permission'],
    },
    {
      title: '路径',
      dataIndex: ['menu', 'path'],
    },
    {
      title: '类型',
      dataIndex: ['menu', 'type'],
      render: (g) =>
        g === 0 ? (
          <MenuOutlined style={{color: ZIMA_BLUE, fontSize: 18}}/>
        ) : g === 1 ? (
          <PlayCircleFilled
            style={{color: ZIMA_BLUE, fontSize: 18}}
          />
        ) : (
          <Tag>未知</Tag>
        ),
    },
    {
      title: '操作',
      key: 'option',
      width: 200,
      valueType: 'option',
      render: (text, record) => {
        const {menu, roleList} = record;
        const info: API.DetailInfo = {
          title: <InfoCircleOutlined style={{fontSize: 16}}/>,
          avatar: menu.icon,
          name: menu.menuName || '',
          introduction: menu.permission,
          tag:
            menu.type === 0 ? (
              <MenuFoldOutlined
                style={{color: '#1890ff', fontSize: '20px', fontWeight: 'bolder'}}
              />
            ) : menu.type === 1 ? (
              <RightCircleOutlined
                style={{color: '#FA541C', fontSize: '20px', fontWeight: 'bolder'}}
              />
            ) : (
              '未知'
            ),
          info: [
            {label: '路径', value: menu.path},
            ...roleList.map((role) => ({label: '角色', value: role.roleName})),
          ],
        };
        return [
          <InfoDetail key={menu.id} info={info}/>,
          <MenuForm
            key="update"
            table={actionRef}
            title={<FormOutlined style={{fontSize: 16}}/>}
            info={menu}
            onFinish={updateMenu}
          />,
          <DeleteButton
            title="确定删除菜单?"
            table={actionRef}
            request={() => deleteMenu(menu.id || '')}
            key="del"
          >
            <DeleteOutlined style={{fontSize: 16}}/>
          </DeleteButton>,
        ];
      },
    },
  ];

  const info: API.Menu = {
    menuName: '菜单',
    icon: 'https://joeschmoe.io/api/v1/random',
    path: '/',
    type: 0,
  };

  const [search, setSearch] = useState('');

  return (
    <PageContainer>
      <ProTable<API.MenuVO>
        columns={menus}
        actionRef={actionRef}
        pagination={{
          size: 'default',
          pageSize: 10,
        }}
        request={async (params) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          const {pageSize, current: pageNum} = params;
          return queryMenu({pageSize, pageNum, search}).then((result) => ({
            data: result.data?.list,
            success: true,
            total: result.data?.total,
          }));
        }}
        headerTitle={
          <Search
            allowClear
            enterButton={<SearchOutlined/>}
            onSearch={(v) => {
              setSearch(v);
              actionRef.current?.reload();
            }}
          />
        }
        // cardProps={{ title: '菜单列表', bordered: true }}
        rowKey={(data) => data.menu?.id || ''}
        search={false}
        toolBarRender={() => [
          <MenuForm table={actionRef} title={<AppstoreAddOutlined style={{fontSize: 16}}/>} info={info}
                    onFinish={addMenu}/>,
        ]}
      />
    </PageContainer>
  );
};
export default MenuManager;
