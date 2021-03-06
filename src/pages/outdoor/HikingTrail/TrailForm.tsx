import React, {MutableRefObject, useState} from 'react';
import {Avatar, Button, message, Space, Upload} from 'antd';
import {ModalForm, ProFormGroup, ProFormRate, ProFormText,} from '@ant-design/pro-form';
import {ActionType} from '@ant-design/pro-table';
import {CloudUploadOutlined} from "@ant-design/icons";
import ImgCrop from 'antd-img-crop';
import {difficultyRate, recommendRate} from '.';

const token = JSON.parse(localStorage.getItem('token') || '{}');

const TrailForm: React.FC<{
  table: MutableRefObject<ActionType | undefined>;
  title: any;
  info: Outdoor.HikingTrail;
  onFinish: any;
}> = (props) => {
  const [avatar, setAvatar] = useState<string>();
  const {
    table,
    title,
    info,
    onFinish,
  } = props;
  return (
    <ModalForm
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
        const {difficulty, recommend} = params;
        const response = await onFinish({
          ...params,
          id: info?.id,
          difficulty: difficulty * 2,
          recommend: recommend * 2
        });
        if (response.code === 1000) message.success(`添加成功`);
        await table.current?.reload();
        return true;
      }}
    >
      <Avatar src={avatar}/>
      <ProFormGroup>
        <ProFormText
          width="md"
          name="title"
          label="路线名称"
          rules={[
            {
              required: true,
              message: '路线名称不能为空!',
            },
          ]}
          initialValue={info.title}
          placeholder="请输入路线名称"
        />

        <ProFormText
          width="md"
          name="summary"
          label="路线描述"
          initialValue={info.summary}
          rules={[{required: true, message: '路线描述不能为空!'}]}
          placeholder="请输入路线描述"
        />
      </ProFormGroup>

      <ProFormGroup>
        <ProFormText
          width="sm"
          name="avatar"
          label="图标"
          initialValue={info.avatar}
          fieldProps={{
            onChange: (e) => setAvatar(e.target.value),
            value: avatar,
          }}
          placeholder="请输入路线图标"
        />

        <ImgCrop
          rotate>
          <Upload
            action='/antq/web/minio/upload'
            headers={{Authorization: token?.token_type + ' ' + token?.access_token}}
            showUploadList={false}
            onChange={img => {
              if (img.file.status === 'done') setAvatar(img.file.response?.data)
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
          name="iframe"
          label="地图页"
          initialValue={info.iframe}
          tooltip="FatMap分享的iframe标签"
          rules={[{required: true, message: '地图页不能为空!', whitespace: true}]}
          placeholder="请输入地图页"
        />
      </ProFormGroup>
      <ProFormGroup>
        <ProFormText
          width="md"
          name="distance"
          label="距离(米)"
          initialValue={info.distance}
          rules={[{pattern: RegExp('\\dn*'), message: '距离只能为整数', whitespace: true}]}
          placeholder="请输入线路距离"
          prefixCls='m'
        />
        <ProFormText
          width="md"
          name="elevation"
          label="平均海拔(米)"
          initialValue={info.elevation}
          rules={[{pattern: RegExp('\\dn*'), message: '海拔只能为整数', whitespace: true}]}
          placeholder="请输入平均海拔"
        />
      </ProFormGroup>
      <ProFormGroup>
        <ProFormText
          width="md"
          name="elevationRise"
          label="累计爬升(米)"
          initialValue={info.elevationRise}
          rules={[{pattern: RegExp('\\dn*'), message: '累计爬升只能为整数', whitespace: true}]}
          placeholder="请输入累计爬升"
          prefixCls='m'
        />
        <ProFormText
          width="md"
          name="elevationFall"
          label="累计下降(米)"
          initialValue={info.elevationFall}
          rules={[{pattern: RegExp('\\dn*'), message: '累计下降只能为整数', whitespace: true}]}
          placeholder="请输入累计下降"
        />
      </ProFormGroup>
      <ProFormGroup>
        <ProFormRate width={330} name='difficulty'
                     fieldProps={{character: ({index}: { index: number }) => difficultyRate[index + 1]}}
                     label='难度系数' initialValue={Number(info.difficulty) / 2}/>
        <ProFormRate width={330} name='recommend'
                     fieldProps={{character: ({index}: { index: number }) => recommendRate[index + 1]}}
                     label='推荐指数' initialValue={Number(info.recommend) / 2}/>
      </ProFormGroup>
    </ModalForm>
  );
};
export default TrailForm;
