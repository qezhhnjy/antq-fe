import React, {useState} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {PageContainer} from "@ant-design/pro-layout";
import ReactMarkdown from 'react-markdown';

const QuillEditor: React.FC<any> = (props) => {
  const {} = props;
  const [value, setValue] = useState('');

  return (
    <PageContainer>
      <ReactMarkdown># Hello World</ReactMarkdown>
      <ReactQuill placeholder='请输入内容' theme="snow" value={value} onChange={setValue}/>
    </PageContainer>
  )
}

export default QuillEditor;
