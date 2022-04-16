import React, { MutableRefObject } from 'react';
import { Button, message } from 'antd';
import { ModalForm, ProFormCheckbox, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { listMenu } from '@/services/ant-design-pro/antq-api';
import { ActionType } from '@ant-design/pro-table';

const RoleForm: React.FC<{
  table: MutableRefObject<ActionType | undefined>;
  title: any;
  info: API.RoleVO;
  onFinish: any;
}> = (props) => {
  const {
    table,
    title,
    info: { role, menuList },
    onFinish,
  } = props;

  return (
    <ModalForm
      width={450}
      title={title}
      trigger={<Button type="primary">{title}</Button>}
      modalProps={{ destroyOnClose: true }}
      submitter={{
        searchConfig: {
          submitText: title,
          resetText: '取消',
        },
      }}
      onFinish={async (params: { roleName: string; menus: string[] }) => {
        const { roleName, menus } = params;
        const roleVO = {
          role: { id: role?.id, roleName },
          menuList: menus.map((m) => ({ id: m })),
        };
        const response = await onFinish(roleVO);
        if (response.code === 1000) message.success(`添加成功`);
        await table.current?.reload();
        return true;
      }}
    >
      <ProFormText
        width="md"
        name="roleName"
        label="角色名称"
        initialValue={role?.roleName}
        disabled={role?.id !== undefined}
        rules={[
          {
            required: true,
            message: '角色名称不能为空!',
          },
        ]}
        placeholder="请输入角色名称"
      />

      <ProFormSelect
        mode="multiple"
        width="md"
        name="menus"
        label="菜单"
        initialValue={menuList?.map((menu) => menu.id)}
        request={async () => {
          const result = await listMenu();
          return (
            result?.data?.map((m) => ({ label: m.menu.menuName || '', value: m.menu.id || '' })) ||
            []
          );
        }}
        placeholder="请选择菜单"
        rules={[{ required: true, message: '请选择菜单!' }]}
      />

      <ProFormCheckbox
        width="md"
        name="agreement"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('请先阅读协议')),
          },
        ]}
        valuePropName="checked"
      >
        我已经阅读相关 <a href="">协议</a>
      </ProFormCheckbox>
    </ModalForm>
  );
};

export default RoleForm;
