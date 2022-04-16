import React, {useEffect, useState} from "react";
import {Select} from "antd";

const {Option} = Select;

type SearchSelectProps = {
  request: Function;
  placeholder?: string;
  style?: React.CSSProperties;
  change: Function;
  searchOnEmpty?: boolean;
  // 搜索频率控制ms
  rate?: number;
  searchOnEnter?: boolean;
}
const SearchSelect: React.FC<SearchSelectProps> = (props) => {
  const {request, placeholder, style, change, searchOnEmpty, searchOnEnter} = props;
  const [value, setValue] = useState<string>();
  const [data, setData] = useState<{ label: string, value: string }[]>();

  const handleRequest = async (v: string) => {
    if (!searchOnEmpty && !v) return;
    const d = await request(v);
    setData(d);
  }

  const handleSearch = (params: string) => {
    if (!searchOnEnter) {
      handleRequest(params);
    }
  }

  const handleChange = (v: any, option: any) => {
    setValue(v);
    change(v, option);
  }

  const handleEnter = (event: any) => {
    if (searchOnEnter && event.key == 'Enter') {
      setValue(undefined);
      handleRequest(event.target.value);
    }
  };

  useEffect(() => {
    handleSearch('')
  }, [])

  return (
    <Select
      onInputKeyDown={handleEnter}
      allowClear
      showSearch
      value={value}
      placeholder={placeholder}
      style={style}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={null}
    >
      {data?.map(d => <Option key={d.value} value={d.label}>{d.label}</Option>)}
    </Select>)
}

export default SearchSelect;
