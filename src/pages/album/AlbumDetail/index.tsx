import React, {useEffect, useState} from "react";
import {infoList, picDelete} from "@/services/album/album-api";
import {Button, Col, Divider, Image, message, PageHeader, Row, Skeleton, Space, Tag, Typography, Upload} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import {PhotoProvider, PhotoView} from "react-photo-view";
import 'react-photo-view/dist/react-photo-view.css';
import {history} from "@@/core/history";
import {ZIMA_BLUE} from "@/utils/common";
import './index.less';
import {CloudUploadOutlined, DeleteOutlined, FullscreenExitOutlined, FullscreenOutlined} from "@ant-design/icons";
import {ALBUM_LIST_PATH, pushToInfo} from "@/utils/pushUtil";

const pageSize = 10;
const token = JSON.parse(localStorage.getItem('token') || '{}');
export const Content: React.FC<{ extraContent: React.ReactNode, left?: boolean }>
  = (props) => {
  const {children, extraContent, left} = props;
  return (
    left ?
      <Row gutter={16}>
        <Col>{extraContent}</Col>
        <Col style={{flex: 1}}>{children}</Col>
      </Row> :
      <Row gutter={16}>
        <Col style={{flex: 1}}>{children}</Col>
        <Col>{extraContent}</Col>
      </Row>
  );
}
const AlbumDetail: React.FC = () => {
  // @ts-ignore
  const [album] = useState<Album.Album>(history?.location?.state || {});
  const {id, title, station, cover, count, tag, author, model, summary} = album;
  const [pageInfo, setPageInfo] = useState<API.PageInfo<Album.PicInfo>>();
  const [picInfos, setPicInfos] = useState<Album.PicInfo[]>([]);
  const {pageNum = 0, nextPage = 0} = pageInfo || {};
  const [full, setFull] = useState<boolean>(false);
  const [del, setDel] = useState<boolean>(false);

  const loadData = (albumId?: string) => infoList({albumId, pageNum: pageNum + 1, pageSize})
    .then(result => {
      setPageInfo(result?.data);
      setPicInfos([...picInfos, ...result?.data?.list || []]);
    });

  useEffect(() => {
    if (id === undefined) pushToInfo(ALBUM_LIST_PATH, null);
    else loadData(id);
  }, []);


  return (
    <div style={{margin: '0 6%'}}>
      <PageHeader
        style={{border: '1px solid rgb(235, 237, 240)'}}
        onBack={() => history.goBack()}
        title={title}
        subTitle={`${count}P`}
        tags={[
          <Tag key='model' color={ZIMA_BLUE}>{model}</Tag>,
          <Tag key='station' color={ZIMA_BLUE}>{station}</Tag>,
          <Tag key='author' color={ZIMA_BLUE}>{author}</Tag>,
          ...(tag?.split(',').map(t => <Tag key={t} color={ZIMA_BLUE}>{t}</Tag>) || [])
        ]}
        extra={
          <Space size='large'>
            <Upload
              action='/antq/web/album/add-pic'
              data={{albumId: id}}
              headers={{Authorization: token?.token_type + ' ' + token?.access_token}}
              showUploadList={false}
              listType='picture'
              onChange={info => {
                if (info.file.status === 'done') {
                  const {data, code, msg} = info.file.response;
                  if (code === 1000) {
                    setPicInfos([data, ...picInfos]);
                    message.success('上传成功');
                  } else message.error(msg);
                }
              }}
            >
              <Button
                icon={<CloudUploadOutlined/>} type='primary'>上传</Button>
            </Upload>
            <DeleteOutlined key='del' onClick={() => setDel(!del)}
                            style={{fontSize: 20, color: del ? 'gray' : 'orangered'}}/>
            <div key='full' onClick={() => setFull(!full)}>
              {
                full ?
                  <FullscreenExitOutlined style={{fontSize: 20}}/> :
                  <FullscreenOutlined style={{fontSize: 20}}/>
              }
            </div>
          </Space>}>
        <Content
          left
          extraContent={<Image width={120} height={120} preview={false} style={{objectFit: "cover"}} src={cover}
                               alt={title}/>}>
          <Typography.Title level={4}>{model}</Typography.Title>
          <Typography.Paragraph>{summary}</Typography.Paragraph>
        </Content>
      </PageHeader>
      <Divider orientation="left" plain dashed><Typography.Text type='secondary' style={{fontSize: 12}}
                                                                strong>图片展示</Typography.Text></Divider>
      <InfiniteScroll
        dataLength={picInfos?.length || 0}
        next={() => loadData(id)}
        hasMore={nextPage !== 0}
        loader={<Skeleton avatar paragraph={{rows: 1}} active/>}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <div className='photo'>
          <PhotoProvider bannerVisible={false} maskOpacity={.5}>
            {picInfos.map((info) => (
              <Space key={info.id} direction='vertical'
                     style={{margin: 10, border: '1px solid rgba(158,158,158,.05)'}}>
                {del ? <DeleteOutlined
                  onClick={() => {
                    picDelete(info.id).then(() => setPicInfos([...picInfos.filter(i => i.id !== info.id)]));
                  }}
                  style={{
                    fontSize: 20,
                    textAlign: 'end',
                    visibility: del ? 'visible' : 'hidden',
                    color: 'orangered',
                    opacity: .6
                  }}/> : <></>}
                <PhotoView src={info.url}>
                  {
                    full ? <img src={info.url} style={{maxWidth: '98%', margin: '1%',}} alt=''/> :
                      <img src={info.url} className='img' style={{maxHeight: 280, margin: 5,}} alt=''/>
                  }
                </PhotoView>
              </Space>
            ))}
          </PhotoProvider>
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default AlbumDetail;