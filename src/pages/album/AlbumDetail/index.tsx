import React, {useEffect, useState} from "react";
import {albumList} from "@/services/album/album-api";
import ProList from "@ant-design/pro-list";
import {Divider, Image, Skeleton} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";

const pageSize = 3;
const AlbumDetail: React.FC<any> = (props) => {
  const {} = props;

  const [pageInfo, setPageInfo] = useState<API.PageInfo<Album.PicInfo>>();
  const [loading, setLoading] = useState(true);
  const [picInfos, setPicInfos] = useState<Album.PicInfo[]>([]);
  const {pageNum = 0, nextPage = 0} = pageInfo || {};

  const loadData = (albumId: string) => albumList({albumId, pageNum: pageNum + 1, pageSize})
    .then(result => {
      setPageInfo(result?.data);
      setPicInfos([...picInfos, ...result?.data?.list || []]);
    }).then(() => setLoading(false));

  useEffect(() => {
    loadData('1553089645032558594');
  }, []);

  return (
    <InfiniteScroll
      dataLength={picInfos?.length || 0}
      next={() => loadData('1553089645032558594')}
      hasMore={nextPage !== 0}
      loader={<Skeleton avatar paragraph={{rows: 1}} active/>}
      endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
      scrollableTarget="scrollableDiv"
    >
      <ProList<Album.PicInfo>
        itemLayout="vertical"
        split
        loading={loading}
        rowKey="id"
        dataSource={picInfos}
        metas={{
          description: {
            render: (dom, info) => <Image src={info.url} preview={false}/>,
          },
        }}
      />
    </InfiniteScroll>
  );
}

export default AlbumDetail;