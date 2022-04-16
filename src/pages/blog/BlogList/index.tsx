import {queryBlog} from "@/services/ant-design-pro/antq-api";
import React, {useEffect, useState} from "react";
import {Avatar, Button, Divider, Empty, Image, Input, Skeleton, Space} from "antd";
import {ClockCircleOutlined, LikeOutlined, MessageOutlined, StarOutlined} from "@ant-design/icons";
import 'braft-editor/dist/output.css';
import ProList from "@ant-design/pro-list";
import ZimaTag from "@/components/zima/ZimaTag";
import ZimaIconText from "@/components/zima/ZimaIconText";
import {ZIMA_BLUE} from "@/utils/common";
import {BLOG_DETAIL_PATH, pushToInfo, UTIL_VDITOR_PATH} from "@/utils/pushUtil";
import InfiniteScroll from "react-infinite-scroll-component";

const {Search} = Input;
const pageSize = 5;

const BlogList: React.FC<any> = (props) => {
  const {} = props;

  const [pageInfo, setPageInfo] = useState<API.PageInfo<API.Blog>>();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [blogs, setBlogs] = useState<API.Blog[]>([]);

  const {pageNum = 0, nextPage = 0} = pageInfo || {};

  const loadData = () => queryBlog({search, pageNum: pageNum + 1, pageSize})
    .then(result => {
      setPageInfo(result?.data);
      while (blogs.length >= 50 * pageSize) blogs.shift()
      setBlogs([...blogs, ...result?.data?.list || []])
    }).then(() => setLoading(false));

  useEffect(() => {
    loadData();
  }, []);

  const push = (blog: any) => pushToInfo(BLOG_DETAIL_PATH, blog);
  const create = () => pushToInfo(UTIL_VDITOR_PATH, null);
  const onSearch = (tag: string | undefined) => {
    setLoading(true);
    queryBlog({search: tag || search, pageNum: 0, pageSize})
      .then(result => {
        setPageInfo(result?.data);
        setBlogs(result?.data?.list || []);
      }).then(() => setLoading(false))
  }

  return (
    <>
      <InfiniteScroll
        dataLength={blogs?.length || 0}
        next={loadData}
        hasMore={nextPage !== 0}
        loader={<Skeleton avatar paragraph={{rows: 1}} active/>}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <ProList<API.Blog>
          // bordered={true}
          loading={loading}
          headerTitle={
            [...new Set(blogs?.flatMap(b => b.tags?.split(',')))]
              .filter(tag => tag)
              .slice(0, 10)
              .map(tag => <ZimaTag key={tag} opacity={0.9}
                                   onClick={() => onSearch(tag)}>{tag}</ZimaTag>)
          }
          toolBarRender={() => {
            return [
              <Space size='large' key='0'>
                <Search
                  key='0'
                  onSearch={onSearch}
                  enterButton="搜索"
                  onChange={(e: any) => setSearch(e.target.value)}
                />
                <Button onClick={create} key="1" type="primary">+新建</Button>,
              </Space>
            ];
          }}
          itemLayout="vertical"
          split
          rowKey="id"
          dataSource={blogs}
          metas={{
            title: {
              render: (dom, blog) =>
                <h1 onClick={() => push(blog)}
                    style={{color: ZIMA_BLUE}}>{blog.title}</h1>
            },
            avatar: {
              render: (dom, blog) => <Avatar src={blog.avatar}/>
            },
            subTitle: {
              render: (dom, blog) => <span onClick={() => push(blog)} style={{color: ZIMA_BLUE}}>{blog.summary}</span>
            },
            description: {
              render: (dom, blog) => (
                <>
                  {blog?.tags?.split(',')
                    .map(tag => <ZimaTag key={tag} opacity={0.7} onClick={() => onSearch(tag)}>{tag}</ZimaTag>)}
                </>
              ),
            },
            actions: {
              render: (dom, blog) => [
                <ZimaIconText icon={StarOutlined} text='2147483648' key="list-vertical-star-o"/>,
                <ZimaIconText icon={LikeOutlined} text="156" key="list-vertical-like-o"/>,
                <ZimaIconText icon={MessageOutlined} text="2" key="list-vertical-message"/>,
                <ZimaIconText icon={ClockCircleOutlined} text={blog.editTime} key="list-vertical-message"/>,
              ],
            },
            extra: {
              render: (dom: any, blog: API.Blog) =>
                blog.icon ? <Image
                  width={160}
                  alt="logo"
                  src={blog.icon}
                /> : <Empty description={false} imageStyle={{width: 160}}/>
              ,
            },
            content: {
              // render: (dom, blog) => <span onClick={() => push(blog)} style={{color: ZIMA_BLUE}}>{blog.summary}</span>
            },
          }}
        />
      </InfiniteScroll>
    </>
  )
}

export default BlogList;
