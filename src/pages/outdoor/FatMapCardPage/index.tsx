import React, {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {Col, Divider, Input, Row, Skeleton, Space, Typography} from "antd";
import 'react-photo-view/dist/react-photo-view.css';
import {PageContainer} from "@ant-design/pro-layout";
import {hikingTrailList} from "@/services/ant-design-pro/antq-api";

const FatMapCardPage: React.FC<any> = () => {
  const [pageInfo, setPageInfo] = useState<API.PageInfo<Outdoor.HikingTrail>>();
  const [trails, setTrails] = useState<Outdoor.HikingTrail[]>([]);
  const {nextPage = 0} = pageInfo || {};
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<API.Query>({pageNum: 0, pageSize: 2});

  const loadData = () => {
    setLoading(true);
    hikingTrailList(query)
      .then(result => {
        setPageInfo(result?.data);
        setTrails([...trails, ...result?.data?.list || []]);
        setQuery({...query, pageNum: (result?.data?.pageNum ?? 0) + 1})
      }).then(() => setLoading(false));
  }

  const refresh = () => {
    setLoading(true);
    hikingTrailList({...query, pageNum: 0}).then(result => {
      setPageInfo(result?.data);
      setTrails(result?.data?.list || []);
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
      </Space>
      <Divider orientation="left" plain dashed><Typography.Text type='secondary' style={{fontSize: 12}}
                                                                strong>FatMap</Typography.Text></Divider>
      <InfiniteScroll
        dataLength={trails?.length || 0}
        next={() => loadData()}
        hasMore={nextPage !== 0}
        loader={<Skeleton avatar paragraph={{rows: 1}} active/>}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <Row style={{padding: 10}}>
          {trails.map((trail) => (
            <Col span={12} key={trail.id} style={{padding: 10}}>
              <div dangerouslySetInnerHTML={{__html: trail.iframe || ''}}/>
            </Col>
          ))}
        </Row>
      </InfiniteScroll>
    </PageContainer>
  );
}

export default FatMapCardPage;
