import React, {useEffect, useState} from "react";
// 引入编辑器样式
import 'braft-editor/dist/index.css';
import 'braft-extensions/dist/table.css';
import 'braft-extensions/dist/code-highlighter.css';
// 引入编辑器组件
import BraftEditor, {ControlType} from "braft-editor";
// @ts-ignore
import Table from 'braft-extensions/dist/table';
// @ts-ignore
import Markdown from 'braft-extensions/dist/markdown';
// @ts-ignore
import CodeHighlighter from 'braft-extensions/dist/code-highlighter';
// 首先需要从prismjs中引入需要扩展的语言库
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-yaml';
import {Button, Input, message, Space} from "antd";
import {ClearOutlined, SaveOutlined, SwapLeftOutlined} from "@ant-design/icons";
import {addBlog, updateBlog} from "@/services/ant-design-pro/antq-api";
import {ZIMA_BLUE} from "@/utils/common";
import EditableTagGroup from "@/components/EditableTagGroup";
import {history} from "@@/core/history";

const {Search} = Input;

// 通过opitons.
const prismjsOptions = {
  syntaxs: [
    {
      name: 'JavaScript',
      syntax: 'javascript'
    },
    {
      name: 'HTML',
      syntax: 'html'
    },
    {
      name: 'CSS',
      syntax: 'css'
    },
    {
      name: 'Java',
      syntax: 'java',
    },
    {
      name: 'bash',
      syntax: 'bash',
    },
    {
      name: 'typescript',
      syntax: 'typescript',
    },
    {
      name: 'yaml',
      syntax: 'yaml',
    }
  ]
}

const options = {
  defaultColumns: 6, // 默认列数
  defaultRows: 3, // 默认行数
  withDropdown: true, // 插入表格前是否弹出下拉菜单
  columnResizable: true, // 是否允许拖动调整列宽，默认false
  exportAttrString: '', // 指定输出HTML时附加到table标签上的属性字符串
}

BraftEditor.use(Table(options));
BraftEditor.use(Markdown());
BraftEditor.use(CodeHighlighter(prismjsOptions));

const controls: ControlType[] = ['undo', 'redo', 'headings', 'font-family', 'font-size', 'letter-spacing', 'line-height', 'text-color',
  'bold', 'italic', 'underline', 'strike-through',
  'superscript', 'subscript', 'text-indent', 'table', 'blockquote', 'code', 'clear', 'emoji', 'text-align',
  'link', 'list-ol', 'list-ul', 'media', 'remove-styles', 'separator', 'fullscreen']

const RichTextEditor: React.FC = () => {

  const [editorState, setEditorState] = useState(BraftEditor.createEditorState({}));
  // @ts-ignore
  const [blog, setBlog] = useState<API.Blog>(history?.location?.state || {});
  const [tags, setTags] = useState<string[]>(blog?.tags?.split(',') || []);

  const {id, title, summary, raw, icon} = blog;

  useEffect(() => {
    setEditorState(BraftEditor.createEditorState(raw))
  }, [raw])

  const handleEditorChange = (editor: any) => {
    setEditorState(editor);
  }

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
      raw: JSON.stringify(editorState.toRAW(true)),
      html: editorState.toHTML(),
      tags: tags?.join(',') || undefined,
    }
    setBlog(newBlog);
    if (id) updateBlog(newBlog).then(() => message.success("修改成功"));
    else addBlog(newBlog).then(() => message.success("保存成功"));
  }

  const onClear = () => {
    setBlog({});
    setTags([]);
  }

  return (
    <Space direction='vertical' size='small'>
      <Space size='small'>
        <SwapLeftOutlined style={{fontSize: 18, color: ZIMA_BLUE}} onClick={history.goBack}/>
        <Search
          bordered={false}
          style={{width: 1200}}
          placeholder="请输入标题"
          enterButton={<SaveOutlined />}
          size="large"
          value={title}
          onSearch={saveBlog}
          onChange={e => setBlog({...blog, title: e.target.value})}
        />
        <Button onClick={onClear} danger type='primary' size='large'><ClearOutlined /></Button>
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
      <div style={{border: '1px dashed rgb(22,184,243,0.3)'}}>
        <BraftEditor
          language='zh'
          contentStyle={{height: 650, boxShadow: 'inset 0 1px 3px rgba(0,0,0,.1)'}}
          controlBarStyle={{color: ZIMA_BLUE}}
          value={editorState}
          onChange={handleEditorChange}
          onSave={saveBlog}
          controls={controls}
          textBackgroundColor={false}
          placeholder='请开始你的表演(支持Markdown语法!!)'
          colors={[ZIMA_BLUE, '#000000', '#333333', '#666666', '#999999', '#cccccc', '#ffffff', '#61a951', '#16a085',
            '#07a9fe', '#003ba5', '#8e44ad', '#f32784', '#c0392b', '#d35400', '#f39c12', '#fdda00']}
        />
      </div>
    </Space>
  )
}

export default RichTextEditor;
