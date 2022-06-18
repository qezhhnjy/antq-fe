import React, {MutableRefObject, useState} from 'react';
import {Avatar, Button, message, Space, Upload} from 'antd';
import {ModalForm, ProFormCheckbox, ProFormGroup, ProFormSelect, ProFormText,} from '@ant-design/pro-form';
import {listRole} from '@/services/ant-design-pro/antq-api';
import {ActionType} from '@ant-design/pro-table';
import {CloudUploadOutlined, UserOutlined} from "@ant-design/icons";
import ImgCrop from 'antd-img-crop';

const token = JSON.parse(localStorage.getItem('token') || '{}');

const UserForm: React.FC<{
  table: MutableRefObject<ActionType | undefined>;
  title: any;
  info: API.UserVO;
  onFinish: any;
}> = (props) => {
  const [avatar, setAvatar] = useState<string>();
  const {
    table,
    title,
    info: {user, roleList},
    onFinish,
  } = props;
  return (
    <ModalForm
      title={title}
      width={800}
      trigger={<Button type="primary">{title}</Button>}
      modalProps={{destroyOnClose: true}}
      submitter={{
        searchConfig: {
          submitText: title,
          resetText: '取消',
        },
      }}
      onFinish={async (params) => {
        const response = await onFinish(
          {...params, id: user?.id},
          params.roles.map((id: string) => ({id})),
        );
        if (response.code === 1000) message.success(`添加成功`);
        await table.current?.reload();
        return true;
      }}
    >
      <Avatar src={avatar} icon={<UserOutlined/>}/>
      <ProFormGroup>
        <ProFormText
          width="md"
          name="username"
          label="用户名"
          rules={[
            {
              required: true,
              message: '用户名不能为空!',
            },
          ]}
          initialValue={user.username}
          disabled={user.id !== undefined}
          placeholder="请输入用户名"
        />

        <ProFormText.Password
          width="md"
          name="password"
          label="密码"
          initialValue={user.password}
          rules={[{required: true, message: '密码不能为空!'}]}
          hasFeedback
          placeholder="请输入密码"
        />
      </ProFormGroup>

      <ProFormGroup>
        <ProFormText
          width="sm"
          name="avatar"
          label="头像"
          initialValue={user.avatar}
          fieldProps={{
            onChange: (e) => setAvatar(e.target.value),
            value: avatar,
          }}
          placeholder="请输入头像网址"
        />

        <ImgCrop
          quality={0.5}
          rotate>
          <Upload
            action='/antq/web/minio/upload'
            headers={{Authorization: token?.token_type + ' ' + token?.access_token}}
            showUploadList={false}
            onChange={info => {
              if (info.file.status === 'done') setAvatar(info.file.response?.data)
            }}
          >
            <Space direction='vertical'>
              <div>upload</div>
              <Button
                icon={<CloudUploadOutlined/>} type='primary'>上传</Button>
            </Space>
          </Upload>
        </ImgCrop>

        <ProFormText
          width="md"
          name="nickname"
          label="昵称"
          initialValue={user.nickname}
          tooltip="What do you want others to call you?"
          rules={[{required: true, message: '昵称不能为空!', whitespace: true}]}
          placeholder="请输入昵称"
        />
      </ProFormGroup>

      <ProFormGroup>
        <ProFormSelect
          mode="multiple"
          width="md"
          name="roles"
          label="角色"
          initialValue={roleList.map((r) => r.id)}
          request={async () => {
            const response = await listRole();
            return (
              response?.data
                ?.filter((r) => r?.role?.id && r?.role?.roleName)
                .map((r) => ({
                  label: r.role?.roleName || '',
                  value: r.role?.id || '',
                })) || []
            );
          }}
          placeholder="请选择角色"
          rules={[{required: true, message: '请选择角色!'}]}
        />

        <ProFormText
          width="md"
          name="phone"
          initialValue={user.phone}
          label="手机号码"
          rules={[{required: true, message: '手机号码不能为空!'}]}
          placeholder="请输入手机号码"
        />
      </ProFormGroup>

      <ProFormGroup>
        <ProFormText
          width="md"
          name="email"
          label="邮箱"
          initialValue={user.email}
          rules={[
            {
              type: 'email',
              message: '邮箱不合法!',
            },
          ]}
          placeholder="请输入邮箱"
        />

        <ProFormSelect
          width="md"
          name="gender"
          label="性别"
          initialValue={user.gender + ''}
          valueEnum={{'1': '男', '0': '女'}}
          placeholder="请选择性别"
          rules={[{required: true, message: '请输入性别!'}]}
        />
      </ProFormGroup>
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

export default UserForm;
