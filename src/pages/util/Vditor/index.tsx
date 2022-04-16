import "vditor/dist/index.css";
import React, {useEffect, useState} from "react";
import Vditor from "vditor";
import {ClearOutlined, SaveOutlined, SwapLeftOutlined} from "@ant-design/icons";
import {ZIMA_BLUE} from "@/utils/common";
import {history} from "@@/core/history";
import {Button, Input, message, Space} from "antd";
import {addBlog, updateBlog} from "@/services/ant-design-pro/antq-api";
import EditableTagGroup from "@/components/EditableTagGroup";

const {Search} = Input;

const VditorEditor: React.FC<any> = () => {
  const [vd, setVd] = useState<Vditor>();

  const [blog, setBlog] = useState<API.Blog>(history?.location?.state || {});
  const [tags, setTags] = useState<string[]>(blog?.tags?.split(',') || []);

  const {id, title, summary, raw, icon} = blog;

  const saveBlog = () => {
    if (!blog.title) {
      message.error('请输入标题');
      return;
    }
    if (!blog.summary) {
      message.error('请输入简介');
      return;
    }
    const newBlog = {
      ...blog,
      raw: vd?.getValue(),
      html: '',
      tags: tags?.join(',') || undefined,
    }
    setBlog(newBlog);
    if (id) updateBlog(newBlog).then(() => message.success("修改成功"));
    else addBlog(newBlog).then(() => message.success("保存成功"));
  }

  useEffect(() => {
    const vditor = new Vditor("vditor", {
      mode: 'ir',
      width: '100%',
      counter: {enable: true, type: 'markdown'},
      placeholder: '✍(支持markdown语法)',
      // 打字机模式
      typewriterMode: true,
      preview: {
        theme: {current: 'light'},
        hljs: {lineNumber: true, style: 'dracula'},
        maxWidth: 800
      },
      // 大纲
      outline: {enable: true, position: 'right'},
      after: () => {
        vditor.setValue(raw || '');
        setVd(vditor);
      }
    });
  }, []);
  return (
    <Space direction='vertical' size='small'>
      <Space size='small'>
        <SwapLeftOutlined style={{fontSize: 18, color: ZIMA_BLUE}} onClick={history.goBack}/>
        <Search
          bordered={false}
          style={{width: 1200}}
          placeholder="请输入标题"
          enterButton={<SaveOutlined/>}
          size="large"
          value={title}
          onSearch={saveBlog}
          onChange={e => setBlog({...blog, title: e.target.value})}
        />
        <Button onClick={() => vd?.setValue('')} danger type='primary' size='large'><ClearOutlined/></Button>
      </Space>
      <Input
        style={{marginLeft: 25}}
        bordered={false}
        placeholder="请输入简介"
        size="large"
        value={summary}
        onChange={e => setBlog({...blog, summary: e.target.value})}
      />
      <Input
        style={{marginLeft: 25}}
        bordered={false}
        placeholder="请输入图片简介地址"
        size="large"
        defaultValue={icon}
        onChange={e => setBlog({...blog, icon: e.target.value})}
      />
      <EditableTagGroup tags={tags} setTags={setTags}/>
      <div id="vditor" className="vditor" style={{border: '1px dashed rgb(22,184,243,0.3)'}}/>
    </Space>
  )
};

export default VditorEditor;