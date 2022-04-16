import {PageContainer} from "@ant-design/pro-layout";
import React, {useState} from "react";
import {Col, Input, Row} from "antd";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';

const ReactMarkdownPage: React.FC<any> = (props) => {
  const {} = props;
  const [value, setValue] = useState<string>('# Hello World!');

  return (
    <PageContainer>
      <Row gutter={24} style={{height: 800}}>
        <Col span={12}>
          <Input.TextArea
            bordered
            style={{resize: 'none'}}
            rows={32} value={value} onChange={v => setValue(v.target.value)}/>
        </Col>
        <Col span={12}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
        </Col>
      </Row>
    </PageContainer>
  )
}

export default ReactMarkdownPage;