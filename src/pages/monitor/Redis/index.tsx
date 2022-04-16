import React, {useEffect, useRef, useState} from "react";
import {redis} from "@/services/ant-design-pro/antq-api";
import ProTable, {ActionType, ProColumns} from "@ant-design/pro-table";
import {Row, Tag} from "antd";
import {ZIMA_BLUE} from "@/utils/common";
import {LineCard} from "@/pages/monitor/System";
import {time} from "@/utils/timeUtil";

const Redis: React.FC<any> = () => {

  const actionRef = useRef<ActionType>();
  const [times, setTimes] = useState<string[]>([]);
  const [mem, setMem] = useState<number[]>([]);
  const [inKps, setInKps] = useState<number[]>([]);
  const [outKps, setOutKps] = useState<number[]>([]);
  const [qps, setQps] = useState<number[]>([]);

  const ref: any = useRef();

  useEffect(() => {
    ref.current = setInterval(() => actionRef.current?.reload(), 5000);
    return () => {
      if (ref.current) clearInterval(ref.current);
    }
  }, []);


  const redisInfo: ProColumns<API.RedisInfo>[] = [
    {dataIndex: 'index', valueType: 'indexBorder', width: 40},
    {
      title: '属性',
      dataIndex: 'prop',
      render: prop => <Tag style={{fontSize: '12px'}} color={ZIMA_BLUE}>{prop?.toString().toUpperCase()}</Tag>
    },
    {
      title: '属性值',
      dataIndex: 'value',
    },
    {
      title: '说明',
      dataIndex: 'desc',
    },
  ]

  return (
    <>
      <Row gutter={10} style={{padding: 5}}>
        <LineCard loading={false} times={times} data={mem} title='内存占用' subTitle='(MB)' max={1024}/>
        <LineCard loading={false} times={times} data={qps} title='QPS' max={1024}/>
        <LineCard loading={false} times={times} data={inKps} title='网络入口KPS' max={1024}/>
        <LineCard loading={false} times={times} data={outKps} title='网络出口KPS' max={1024}/>
      </Row>
      <ProTable<API.RedisInfo>
        loading={false}
        actionRef={actionRef}
        columns={redisInfo}
        request={async () => redis().then((result) => {
          setTimes([...times, time()]);
          result.data?.filter(d => d.prop === 'USED_MEMORY')
            .forEach(info => setMem([...mem, Number((Number(info.value) / (1024 * 1024))?.toFixed(2))]));
          result.data?.filter(d => d.prop === 'INSTANTANEOUS_INPUT_KBPS')
            .forEach(info => setInKps([...inKps, Number(info.value)]))
          result.data?.filter(d => d.prop === 'INSTANTANEOUS_OUTPUT_KBPS')
            .forEach(info => setOutKps([...outKps, Number(info.value)]))
          result.data?.filter(d => d.prop === 'INSTANTANEOUS_OPS_PER_SEC')
            .forEach(info => setQps([...qps, Number(info.value)]))
          return {data: result.data, success: true};
        })}
        rowKey={(data) => data.prop}
        toolBarRender={false}
        pagination={false}
        search={false}
      />
    </>
  )
}

export default Redis;