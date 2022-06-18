import React, {MutableRefObject, useState} from 'react';
import {Avatar, Button, Form, message, TreeSelect, Upload} from 'antd';
import {ModalForm, ProFormCheckbox, ProFormSelect, ProFormText} from '@ant-design/pro-form';
import {ActionType} from '@ant-design/pro-table';
import {CloudUploadOutlined, MenuFoldOutlined, MenuOutlined} from '@ant-design/icons';
import {treeMenu} from '@/services/ant-design-pro/antq-api';
import ImgCrop from "antd-img-crop";

const token = JSON.parse(localStorage.getItem('token') || '{}');

const MenuForm: React.FC<{
  table: MutableRefObject<ActionType | undefined>;
  title: any;
  info: API.Menu;
  onFinish: any;
}> = (props) => {
  const [icon, setIcon] = useState<string>();
  const [tree, setTree] = useState<API.Tree[]>([]);

  const menuTree = () => {
    treeMenu(true).then((data) => {
      console.log('data', data.data);
      if (data.data) setTree([data.data]);
    });
  };

  const {table, title, info, onFinish} = props;

  return (
    <ModalForm
      width={450}
      title={title}
      trigger={<Button type="primary">{title}</Button>}
      modalProps={{destroyOnClose: true}}
      submitter={{
        searchConfig: {
          submitText: title,
          resetText: '取消',
        },
      }}
      onFinish={async (params) => {
        console.log('params', params);
        const {parentId} = params;
        const response = await onFinish({parentId, menu: {...params, id: info.id, icon}});
        if (response.code === 1000) message.success('添加成功');
        await table.current?.reload();
        return true;
      }}
    >
      <Avatar src={icon} icon={<MenuOutlined/>}/>
      <Form.Item label="上级目录" name="parentId">
        <TreeSelect
          onFocus={menuTree}
          placeholder="请选择上级目录"
          treeData={tree}
          treeLine={true}
          treeDefaultExpandAll={true}
          showArrow={true}
          suffixIcon={<MenuFoldOutlined/>}
          treeIcon={true}
          style={{width: '328px'}}
        />
      </Form.Item>

      <ProFormText
        width="md"
        name="menuName"
        label="菜单名称"
        initialValue={info.menuName}
        rules={[
          {
            required: true,
            message: '菜单名称不能为空!',
          },
        ]}
        placeholder="请输入菜单名称"
      />

      <ProFormText
        width="md"
        name="permission"
        initialValue={info.permission}
        label="权限"
        rules={[{required: true, message: '权限不能为空!'}]}
        placeholder="请输入权限名称"
      />

      <ProFormText
        width="md"
        name="path"
        label="路径"
        initialValue={info.path}
        disabled={info.id !== undefined}
        tooltip="路由或者接口路径"
        rules={[{required: true, message: '路径不能为空!', whitespace: true}]}
        placeholder="请输入路径"
      />

      <ProFormText
        width="md"
        name="icon"
        initialValue={info.icon}
        fieldProps={{
          onChange: (e) => setIcon(e.target.value),
          value: icon,
        }}
        label="菜单图标"
        addonAfter={
          <ImgCrop
            rotate>
            <Upload
              action='/antq/web/minio/upload'
              headers={{Authorization: token?.token_type + ' ' + token?.access_token}}
              showUploadList={false}
              onChange={fileInfo => {
                if (fileInfo.file.status === 'done') setIcon(fileInfo.file.response?.data)
              }}
            >
              <Button icon={<CloudUploadOutlined/>} type='primary'/>
            </Upload>
          </ImgCrop>
        }
        placeholder="请输入图标网址"
      />

      <ProFormSelect
        width="md"
        name="type"
        label="类型"
        initialValue={info.type + ''}
        valueEnum={{
          '0': '菜单',
          '1': '按钮',
        }}
        placeholder="请选择类型"
        rules={[{required: true, message: '请选择类型!'}]}
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
export default MenuForm;
