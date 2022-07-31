import React, {useEffect, useState} from "react";
import {albumAdd, albumDelete, albumList} from "@/services/album/album-api";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Image,
  Input,
  message,
  Row,
  Skeleton,
  Space,
  Tag,
  Typography,
  Upload
} from "antd";
import 'react-photo-view/dist/react-photo-view.css';
import {PageContainer} from "@ant-design/pro-layout";
import {CloudUploadOutlined, DeleteOutlined, FolderAddOutlined, UserOutlined} from "@ant-design/icons";
import {ModalForm, ProFormGroup, ProFormText, ProFormTextArea, ProFormUploadDragger} from "@ant-design/pro-form";
import {Content} from "@/pages/album/AlbumDetail";
import {ZIMA_BLUE} from "@/utils/common";
import {ALBUM_DETAIL_PATH, pushToInfo} from "@/utils/pushUtil";
import './index.less';

const add = '添加图集';
const token = JSON.parse(localStorage.getItem('token') || '{}');
const NormalFormText: React.FC<{ name: string, label: string }>
  = (props) => {
  const {label, name} = props;
  return <ProFormText
    width="md"
    name={name}
    label={label}
    rules={[
      {
        required: true,
        message: `${label}不能为空!`,
      },
    ]}
    placeholder={`请输入${label}`}
  />;
}
const AlbumDelete: React.FC<{ album: Album.Album, refresh: VoidFunction }> = (props) => {
  const {album, refresh} = props;
  return <ModalForm
    title={`删除${album.title}`}
    width={400}
    trigger={<DeleteOutlined style={{fontSize: 20, color: 'orangered', opacity: .6}}/>}
    modalProps={{destroyOnClose: true}}
    onFinish={async () => {
      const response = await albumDelete(album.id ?? '');
      if (response.code === 1000) message.success('删除成功');
      refresh();
      return true;
    }}
  >
    <b>确认删除{album.title}?</b>
  </ModalForm>;
}

const AlbumAdd: React.FC<{ refresh: VoidFunction }> = (props) => {
  const [cover, setCover] = useState<string>();
  const {refresh} = props;
  return <ModalForm
    title={<b>{add}</b>}
    width={800}
    trigger={<Button type='primary'><FolderAddOutlined style={{fontSize: 16}}/></Button>}
    modalProps={{destroyOnClose: true}}
    onFinish={async (params) => {
      const response = await albumAdd({...params, cover});
      if (response.code === 1000) message.success('添加成功');
      refresh();
      return true;
    }}
    submitter={{
      searchConfig: {
        submitText: '添加',
        resetText: '取消',
      },
    }}
  >
    <Avatar src={cover} icon={<UserOutlined/>}/>
    <ProFormGroup>
      <NormalFormText name='title' label='标题'/>
      <NormalFormText name='station' label='站点'/>
      <NormalFormText name='author' label='作者'/>
      <NormalFormText name='model' label='模特'/>
      <ProFormText
        width="sm"
        name="cover"
        label="封面"
        fieldProps={{
          onChange: (e) => setCover(e.target.value),
          value: cover,
        }}
        placeholder="请输入/上传封面"
      />
      <Upload
        action='/antq/web/minio/upload'
        headers={{Authorization: token?.token_type + ' ' + token?.access_token}}
        showUploadList={false}
        onChange={info => {
          if (info.file.status === 'done') setCover(info.file.response?.data)
        }}
      >
        <Space direction='vertical'>
          <div>upload</div>
          <Button
            icon={<CloudUploadOutlined/>} type='primary'>上传</Button>
        </Space>
      </Upload>
      <NormalFormText name='tag' label='标签'/>
      <ProFormTextArea
        width={690}
        name="summary"
        label="描述"
        placeholder="请输入描述信息"
      />
      <ProFormUploadDragger width={690} fieldProps={{
        beforeUpload: (file) => {
          if (file.size / (1024 * 1024) > 100) {
            message.success('上传文件不能超过100MB');
            return Upload.LIST_IGNORE;
          }
          return false;
        }
      }} max={1} label="图集ZIP" name="file"/>
    </ProFormGroup>
  </ModalForm>;
}

const AlbumList: React.FC<any> = () => {
  const [pageInfo, setPageInfo] = useState<API.PageInfo<Album.Album>>();
  const [albums, setAlbums] = useState<Album.Album[]>([]);
  const {nextPage = 0} = pageInfo || {};
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<API.AlbumQuery>({pageNum: 0, pageSize: 8});

  const loadData = () => {
    setLoading(true);
    albumList(query)
      .then(result => {
        setPageInfo(result?.data);
        setAlbums([...albums, ...result?.data?.list || []]);
        setQuery({...query, pageNum: (result?.data?.pageNum ?? 0) + 1})
      }).then(() => setLoading(false));
  }

  const refresh = () => {
    setLoading(true);
    albumList({...query, pageNum: 0}).then(result => {
      setPageInfo(result?.data);
      setAlbums(result?.data?.list || []);
      setQuery({...query, pageNum: (result?.data?.pageNum ?? 0) + 1});
    });
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    refresh();
  }, [query.search]);

  return (
    <PageContainer>
      <Space size='large'>
        <Input.Search style={{width: 240}} loading={loading} onSearch={v => {
          setQuery({...query, pageNum: 0, search: v});
        }} enterButton/>
        <AlbumAdd refresh={refresh}/>
      </Space>
      <Divider orientation="left" plain dashed><Typography.Text type='secondary' style={{fontSize: 12}}
                                                                strong>图集展示</Typography.Text></Divider>
      <InfiniteScroll
        dataLength={albums?.length || 0}
        next={() => loadData()}
        hasMore={nextPage !== 0}
        loader={<Skeleton avatar paragraph={{rows: 1}} active/>}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <Row style={{padding: 10}}>
          {albums.map((album) => (
            <Col span={6} key={album.id} style={{padding: 6}}>
              <Card
                style={{padding: 5}}
                bordered
                hoverable
                size='small'
                cover={
                  <Image className='card' width='100%' height={240} preview={false}
                         style={{objectFit: "cover", borderRadius: 2}} src={album.cover}
                         onClick={() => pushToInfo(ALBUM_DETAIL_PATH, album)}
                         alt={album.title}/>
                }
              >
                <Typography.Title level={5}>{album.title}</Typography.Title>
                <Content
                  extraContent={<AlbumDelete album={album} refresh={refresh}/>}
                >
                  <Tag color={ZIMA_BLUE}>{album.count}P</Tag>
                  <Tag color={ZIMA_BLUE}>模特-{album.model}</Tag>
                  <Tag color={ZIMA_BLUE}>{album.station}</Tag>
                </Content>
              </Card>
            </Col>
          ))}
        </Row>
      </InfiniteScroll>
    </PageContainer>
  );
}

export default AlbumList;
