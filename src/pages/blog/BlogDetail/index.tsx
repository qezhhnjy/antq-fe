import React, {useEffect, useState} from "react";
// 在展示页面引入css样板文件
import "vditor/dist/index.css";
import {history} from "@@/core/history";
import ProList from "@ant-design/pro-list";
import {Avatar, Button, Image, message, Space} from "antd";
import {ZIMA_BLUE} from "@/utils/common";
import {
  ClockCircleOutlined,
  DeleteOutlined,
  FormOutlined,
  LikeOutlined,
  MessageOutlined,
  StarOutlined,
  SwapLeftOutlined
} from "@ant-design/icons";
import {useModel} from "@@/plugin-model/useModel";
import {pushToInfo, UTIL_VDITOR_PATH} from "@/utils/pushUtil";
import {deleteBlog, detailBlog} from "@/services/ant-design-pro/antq-api";
import ZimaTag from "@/components/zima/ZimaTag";
import ZimaIconText from "@/components/zima/ZimaIconText";
import Vditor from "vditor";

const BlogDetail: React.FC = () => {
  // @ts-ignore
  const [blog, setBlog] = useState<API.Blog>(history?.location?.state || {});
  const {initialState} = useModel('@@initialState');
  const {currentUser} = initialState || {};

  useEffect(() => {
    if (blog?.id) detailBlog(blog.id).then(result => setBlog({...blog, raw: result.data?.raw, html: result.data?.html}))
  }, [])

  useEffect(()=>{
    Vditor.preview(document.getElementById('preview') as HTMLDivElement, blog.raw || '', {
      mode: 'light',
      hljs: {lineNumber: true, style: 'dracula'},
      theme: {current: 'light'},
    });
  },[blog])

  return (
    <ProList<API.Blog>
      bordered={true}
      itemLayout="vertical"
      split
      rowKey="id"
      headerTitle={<Space size='large'>
        <SwapLeftOutlined style={{fontSize: 18, color: ZIMA_BLUE}} onClick={history.goBack}/>
        <Space size='small'>
          <Avatar src={blog.avatar}/>
          <span style={{color: ZIMA_BLUE}}>{blog.username}</span>
        </Space>
      </Space>}
      dataSource={[blog]}
      toolBarRender={() => [
        blog.username === currentUser?.user.username ?
          <Space size='large'>
            <Button key='edit' type='primary' onClick={() => pushToInfo(UTIL_VDITOR_PATH, blog)}
                    icon={<FormOutlined/>}/>
            <Button danger type='primary' onClick={() => {
              if (blog?.id) deleteBlog(blog.id).then(history.goBack).then(() => message.success('删除成功'))
            }} icon={<DeleteOutlined/>}/>
          </Space>
          : null
      ]}
      metas={{
        title: {render: () => <h1 style={{color: ZIMA_BLUE}}>{blog.title}</h1>},
        subTitle: {
          render: () =>
            <Space direction='vertical'>
              {blog.icon ? <Image
                key='1'
                alt="logo"
                src={blog.icon}
                fallback={blog.avatar}
              /> : null}
              <b key='2' style={{color: ZIMA_BLUE}}>{blog.summary}</b>
            </Space>
        },
        description: {
          render: () => (
            <>
              {blog?.tags?.split(',').map(tag => <ZimaTag key={tag} opacity={0.7}>{tag}</ZimaTag>)}
            </>
          ),
        },
        actions: {
          render: () => [
            <ZimaIconText icon={StarOutlined} text='2147483648' key="star"/>,
            <ZimaIconText icon={LikeOutlined} text="156" key="like"/>,
            <ZimaIconText icon={MessageOutlined} text="2" key="message"/>,
            <ZimaIconText icon={ClockCircleOutlined} text={blog.editTime} key="clock"/>,
          ]
        },
        content: {
          render: () =>
            <>
              <div id='preview'/>
              <div id='braft' className="braft-output-content" dangerouslySetInnerHTML={{__html: blog.html || ''}}/>
            </>
        },
      }}
    />
  )
}

export default BlogDetail;
