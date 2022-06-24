import React, {useState} from "react";
import {Button, Modal, Space, Upload} from "antd";
import ImgCrop from 'antd-img-crop';
import {UploadFile} from "antd/lib/upload/interface";
import 'antd/es/modal/style';
import 'antd/es/slider/style';
import {CloudUploadOutlined} from "@ant-design/icons";
import {ZIMA_BLUE} from "@/utils/common";

const token = JSON.parse(localStorage.getItem('token') || '{}');

const Minio: React.FC<any> = (props) => {
  const {} = props;

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [preview, setPreview] = useState<{ image?: string, visible: boolean, title?: string }>({visible: false});

  const onPreview = async (file: UploadFile) => {
    setPreview({image: file.response?.data, visible: true, title: file.name})
  };

  return (
    <Space direction='vertical'>
      <Button type='primary' onClick={() => window.open('http://43.142.106.115:11006')}>MINIO</Button>
      <ImgCrop
        rotate>
        <Upload
          action='/antq/web/minio/upload'
          listType="picture-card"
          fileList={fileList}
          onPreview={onPreview}
          onChange={info => {
            setFileList(info.fileList);
            console.log('fileList', info.fileList);
          }}
          headers={{Authorization: token?.token_type + ' ' + token?.access_token}}
        >
          <CloudUploadOutlined style={{fontSize: 36, color: ZIMA_BLUE}}/>
        </Upload>
      </ImgCrop>
      <Modal
        visible={preview.visible}
        title={preview?.title}
        footer={preview?.image}
        onCancel={() => setPreview({visible: false})}
      >
        <img alt="预览" style={{width: '100%'}} src={preview?.image}/>
      </Modal>
      <Upload
        action='/antq/web/minio/upload'
        headers={{Authorization: token?.token_type + ' ' + token?.access_token}}
      >
        <Button icon={<CloudUploadOutlined style={{fontSize: 16}}/>} type='primary'>上传</Button>
      </Upload>
    </Space>
  )
}

export default Minio;
