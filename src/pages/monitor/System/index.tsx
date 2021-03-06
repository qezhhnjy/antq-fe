import React, {ReactNode, useEffect, useRef, useState} from "react";
import {monitor} from "@/services/ant-design-pro/antq-api";
import BaseLine from "@/components/BaseLine";
import {Col, Descriptions, Progress, Row} from "antd";
import ProCard, {StatisticCard} from "@ant-design/pro-card";
import {ZIMA_BLUE} from "@/utils/common";
import {downColor, upColor} from "@/components/KLine";

const percent = (used = 0, total = 100) => used * 100 / total;
const interval = 10;
const Desc: React.FC<{ record: Record<string, any> }> = (props) => {
  const {record} = props;
  const items: ReactNode[] = [];

  for (const key in record) {
    items.push(<Descriptions.Item labelStyle={{color: ZIMA_BLUE}} contentStyle={{color: ZIMA_BLUE}}
                                  label={<b>{key}</b>}>{record[key]}</Descriptions.Item>);
  }
  return (
    <Descriptions column={1} size='small' style={{height: 200}}>
      {items}
    </Descriptions>
  )
};

const UseProgress: React.FC<{ used?: number, total?: number, suffix?: string }> = (props) => {
  const {used = 0, total = 100, suffix} = props;
  const p = percent(used, total);
  return (
    <Progress style={{margin: 'auto 0'}} percent={p} steps={10}
              format={() => <span style={{color: ZIMA_BLUE}}>{`${used.toFixed(1)}/${total}(${suffix})`}</span>}
              strokeWidth={14}
              strokeColor={p <= 30 ? downColor : p >= 70 ? upColor : ZIMA_BLUE}
    />
  )
}

const DataProgress: React.FC<{ used?: number, suffix?: string }> = (props) => {
  const {used = 0, suffix} = props;
  const p = used < 100 ? used : Number((used + '').substring(0, 2));
  return (
    <Progress style={{margin: 'auto 0'}} percent={p} steps={10}
              format={() => <span style={{color: ZIMA_BLUE}}>{`${used.toFixed(1)}(${suffix})`}</span>}
              strokeWidth={14}
              strokeColor={ZIMA_BLUE}
    />
  )
}

export const LineCard: React.FC<{ loading: boolean, times: string[], data: number[], title: string, subTitle?: string, max?: number }> =
  (props) => {
    const {loading, times, data, title, subTitle, max} = props;
    return (
      <Col xs={12} xl={6} style={{marginBottom: 10}}>
        <StatisticCard
          loading={loading}
          hoverable
          bordered
          title={<b style={{color: ZIMA_BLUE}}>{title}</b>}
          subTitle={<span style={{color: ZIMA_BLUE}}>{subTitle}</span>}
          gutter={[0, 20]} style={{height: 300}}
          chart={<BaseLine style={{height: 200}} xData={times} yData={data} name={title} max={max}/>}
        />
      </Col>
    )
  }

const DescCard: React.FC<{ loading: boolean, record: Record<string, any>, title: string, subTitle?: string }> =
  (props) => {
    const {loading, record, title, subTitle} = props;
    return (
      <Col xs={24} xl={6} style={{marginBottom: 10}}>
        <ProCard
          loading={loading}
          hoverable
          bordered
          title={<b style={{color: ZIMA_BLUE}}>{title}</b>}
          subTitle={<span style={{color: ZIMA_BLUE}}>{subTitle}</span>}
          gutter={[0, 20]} style={{height: 340}}
        >
          <Desc record={record}/>
        </ProCard>
      </Col>
    )
  }

const SystemMonitor: React.FC<any> = () => {
  const [systemInfo, setSystemInfo] = useState<API.SystemInfo>();
  const [infos] = useState<API.SystemInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [times] = useState<string[]>([]);

  const ref: any = useRef();

  const getData = () => monitor().then(result => {
    if (result?.data) {
      const {data} = result;
      infos.push(data);
      times.push(data.now);
      setSystemInfo(data);
      if (loading) setLoading(false);
    }
  });

  useEffect(() => {
    getData().then(() => ref.current = setInterval(() => getData(), interval * 1000));
    return () => {
      if (ref.current) clearInterval(ref.current);
    }
  }, []);

  const {
    system, username, java, jvmList, cpu, memory, virtual, disk, partitionList, networkIFList,
  } = systemInfo || {};

  const partitionRecord = (): Record<string, any> => {
    let result = {};
    partitionList?.forEach(part => {
      result = {...result, [part.name]: <UseProgress used={part?.used} total={part?.total} suffix='G'/>};
    })
    return {
      ...result,
      ????????????: <DataProgress used={(disk?.write || 0) / (1024)} suffix='G'/>,
      ????????????: <DataProgress used={(disk?.read || 0) / (1024)} suffix='G'/>,
    }
  }

  const networkRecord = (): Record<string, any> => {
    let result = {};
    networkIFList?.filter(network => network.ipv4?.length && network.recv > 0 && network.sent > 0)
      .forEach(network => {
          const {name, recv, sent, ipv4, mac} = network;
          result = {
            ...result,
            [name]: <b style={{color: ZIMA_BLUE}}>{ipv4}</b>,
            mac??????: <b style={{color: ZIMA_BLUE}}>{mac}</b>,
            [name + '??????']: <DataProgress used={recv / (1024 * 1024)} suffix='G'/>,
            [name + '??????']: <DataProgress used={sent / (1024 * 1024)} suffix='G'/>,
          }
        }
      )
    return result;
  }
  const jvmRecord = (): Record<string, any> => {
    let result = {??????: java?.name, ??????: java?.version, ??????: java?.vendor, ??????: java?.info};
    jvmList?.forEach(jvm => {
      const {name, total, used} = jvm;
      result = {
        ...result,
        [name]: <UseProgress used={used} total={total} suffix='M'/>
      }
    })
    return result;
  }

  return (
    <Row gutter={10} style={{padding: 5}}>
      <DescCard
        loading={loading}
        title='????????????'
        record={{
          ??????: system,
          ?????????: username,
          // ??????: userInfo?.country,
          // ??????: userInfo?.language,
          CPU: cpu?.name,
          ?????????: cpu?.coreNum,
          ????????????: <UseProgress used={cpu?.used + cpu?.sys} suffix='%'/>,
          ????????????: <UseProgress used={memory?.used} total={memory?.total} suffix='M'/>,
          ????????????: <UseProgress used={virtual?.used} total={virtual?.total} suffix='M'/>,
          ????????????: <UseProgress used={disk?.used} total={disk?.total} suffix='G'/>,
        }}/>
      <DescCard
        title='JDK??????'
        loading={loading}
        record={jvmRecord()}
      />
      <DescCard
        title='????????????'
        loading={loading}
        record={partitionRecord()}
      />
      <DescCard
        title='??????'
        loading={loading}
        record={networkRecord()}
      />
      <LineCard
        loading={loading}
        title='CPU?????????(%)'
        subTitle='??????'
        times={times}
        data={infos.map(info => info.cpu.used)}
      />
      <LineCard
        loading={loading}
        title='CPU?????????(%)'
        subTitle='??????'
        times={times}
        data={infos.map(info => info.cpu.sys)}
      />
      <LineCard
        loading={loading}
        title='CPU?????????(%)'
        times={times}
        data={infos.map(info => info.cpu.free)}
      />
      <LineCard
        loading={loading}
        title='CPU????????????(ms)'
        times={times}
        data={infos.map(info => info.cpu.wait)}
      />
      <LineCard
        loading={loading}
        title='????????????'
        subTitle={systemInfo?.memory.total + 'M'}
        times={times}
        data={infos.map(info => info.memory.used)}
        max={systemInfo?.memory.max}
      />
      <LineCard
        loading={loading}
        title='????????????'
        subTitle={systemInfo?.virtual.total + 'M'}
        times={times}
        data={infos.map(info => info.virtual.used)}
        max={systemInfo?.virtual.max}
      />
      <LineCard
        loading={loading}
        title='????????????'
        subTitle='KB/S'
        times={times}
        data={infos.map((info, index) => {
          if (index === 0) return 0;
          return (info.disk.read - infos[index - 1].disk.read) / interval;
        })}
        max={20000}
      />
      <LineCard
        loading={loading}
        title='????????????'
        subTitle='KB/S'
        times={times}
        data={infos.map((info, index) => {
          if (index === 0) return 0;
          return (info.disk.write - infos[index - 1].disk.write) / interval;
        })}
        max={10000}
      />
      {
        jvmList?.map(jvm =>
          <LineCard
            key={jvm.name}
            loading={loading}
            title={jvm.name}
            subTitle={jvm.total + 'M'}
            times={times}
            data={infos.map(info => info?.jvmList?.find(t => t.name === jvm.name)?.used || 0)}
            max={jvm.total}
          />
        )
      }
      <LineCard
        loading={loading}
        title='????????????'
        subTitle='KB/S'
        times={times}
        data={infos.map((info, index) => {
          if (index === 0) return 0;
          return (info.sent - infos[index - 1].sent) / interval;
        })}
        max={1024}
      />
      <LineCard
        loading={loading}
        title='????????????'
        subTitle='KB/S'
        times={times}
        data={infos.map((info, index) => {
          if (index === 0) return 0;
          return (info.recv - infos[index - 1].recv) / interval;
        })}
        max={1024}
      />
    </Row>
  )
}
export default SystemMonitor;
