import {PageContainer} from "@ant-design/pro-layout";
import React, {useState} from 'react';
import Brilliant from 'brilliant-editor';
import 'brilliant-editor/dist/index.css';
import {EditorState} from "brilliant-editor";

const BrilliantPage: React.FC<any> = () => {
  const [editorState, setEditorState] = useState<EditorState>();

  return (
    <PageContainer>
      <b>{JSON.stringify(editorState?.toHTML)}</b>
      <Brilliant language="zh" onEditorChange={editor => {
        console.log(JSON.stringify(editor?.toHTML));
        setEditorState(editor);
      }}/>
    </PageContainer>
  )
}

export default BrilliantPage;