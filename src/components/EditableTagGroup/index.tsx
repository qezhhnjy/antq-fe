import React, {useState} from "react";
import {Input, Space} from "antd";
import ZimaTag from "@/components/zima/ZimaTag";
import {PlusOutlined} from "@ant-design/icons";

type EditableTagGroupProps = {
  tags: string[],
  setTags: (tags: string[]) => void;
}

const EditableTagGroup: React.FC<EditableTagGroupProps> = (props) => {
  const {tags, setTags} = props;
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onConfirm = () => {
    setInputVisible(false);
    setInputValue('');
    if (inputValue && !tags.find(t => t === inputValue)) setTags([...tags, inputValue]);
    setInputVisible(false);
    setInputValue('');
  };

  const onClose = (tag: string) => {
    setTags(tags.filter(t => t !== tag))
  }

  return (
    <Space>
      {tags?.map(tag => (<ZimaTag key={tag} onClose={() => onClose(tag)} closeable opacity={0.8}>{tag}</ZimaTag>))}
      {inputVisible ?
        <Input
          autoFocus
          type="text"
          size="small"
          style={{width: 80}}
          value={inputValue}
          onChange={onChange}
          onBlur={onConfirm}
          onPressEnter={onConfirm}
        /> :
        <ZimaTag onClick={() => setInputVisible(true)} style={{borderStyle: 'dashed'}}><PlusOutlined/></ZimaTag>}
    </Space>
  )
}
export default EditableTagGroup;
