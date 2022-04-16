import React from 'react';
import {Button, Descriptions, PageHeader, Tag} from 'antd';
import {ModalForm} from '@ant-design/pro-form';
import {ZIMA_BLUE} from '@/utils/common';

const InfoDetail: React.FC<{ info: API.DetailInfo }> = (props) => {
  const {info} = props;

  return (
    <ModalForm
      title={info.title}
      width={800}
      trigger={<Button type="primary">{info.title}</Button>}
      submitter={false}
    >
      <PageHeader
        title={<span style={{color: ZIMA_BLUE}}>{info.name}</span>}
        className="site-page-header"
        subTitle={info.introduction}
        tags={typeof info.tag === 'string' ? <Tag color={ZIMA_BLUE}>{info.tag}</Tag> : info.tag}
        avatar={{src: info.avatar}}
      >
        <Descriptions size="middle" column={3}>
          {info.info?.map((i) => (
            <Descriptions.Item key={i.value} label={<Tag color={ZIMA_BLUE}>{i.label}</Tag>}>
              <span style={{color:ZIMA_BLUE}}>{i.value}</span>
            </Descriptions.Item>
          ))}
        </Descriptions>
      </PageHeader>
    </ModalForm>
  );
};

export default InfoDetail;
