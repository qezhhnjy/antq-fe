import React, { useEffect, useRef, useState } from 'react';
import { StatisticCard } from '@ant-design/pro-card';
import { StarOutlined, SyncOutlined } from '@ant-design/icons';
import { Col, message, Space } from 'antd';
import { minData, stockDetail } from '@/services/snowball/snowball-api';
import EChartsReact from 'echarts-for-react';
import * as echarts from 'echarts/core';
import {
  GridComponent,
  GridComponentOption,
  TitleComponent,
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  VisualMapComponent,
  VisualMapComponentOption,
} from 'echarts/components';
import { BarSeriesOption, LineChart, LineSeriesOption } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { UniversalTransition } from 'echarts/features';
import { timeByTs } from '@/utils/timeUtil';
import { downColor, normalColor, upColor } from '@/components/KLine';
import { ZIMA_BLUE } from '@/utils/common';
import { deleteOptional } from '@/services/ant-design-pro/antq-api';
import { pushToInfo, STOCK_INFO_PATH } from '@/utils/pushUtil';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
]);

type EChartsOption = echarts.ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | VisualMapComponentOption
  | LineSeriesOption
  | BarSeriesOption
>;

const { Statistic } = StatisticCard;

export type FinanceCardProps = {
  symbol: string;
  colspan?: number;
  active: boolean;
  cancelOptional?: boolean;
};
const FinanceCard: React.FC<FinanceCardProps> = (props) => {
  const { symbol, colspan = 6, active = true, cancelOptional = true } = props;

  const [detail, setDetail] = useState<Snowball.StockDetail>();
  const [data, setData] = useState<{ items: Snowball.MinItem[] }>();
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const ref: any = useRef();

  const update = () => {
    if (active) {
      stockDetail(symbol)
        .then((result) => {
          setDetail(result?.data);
          setRefresh(result?.data?.market?.status_id === 5);
        })
        .then(() => setLoading(false));
      minData(symbol).then((result) => setData(result?.data));
    }
  };

  useEffect(() => {
    update();
  }, [active]);

  useEffect(() => {
    if (!ref.current && refresh) {
      ref.current = setInterval(() => update(), 5000);
    }
    if (ref.current && !refresh) {
      clearInterval(ref.current);
    }
    return () => {
      if (ref.current) clearInterval(ref.current);
    };
  }, [refresh]);

  const {
    name,
    current,
    chg = 0,
    percent,
    last_close = 0,
    currency,
    market_capital = 0,
    amount = 0,
  } = detail?.quote || {};

  const dateList = data?.items.map((item) => timeByTs(item.timestamp));
  const priceList = data?.items.map((item) => item.current);
  const color = chg > 0 ? upColor : chg < 0 ? downColor : normalColor;
  const trend = chg > 0 ? 'up' : chg < 0 ? 'down' : undefined;
  const prefix = currency === 'CNY' ? '¥' : currency === 'USD' ? '$' : 'HK';

  const option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
    },
    dataZoom: {
      type: 'inside',
      start: 0,
      end: 100,
    },
    grid: [
      {
        left: '10%',
        right: '10%',
        top: '10%',
        height: '70%',
      },
    ],
    xAxis: [
      {
        type: 'category',
        data: dateList,
        axisTick: { show: false },
        axisLabel: { show: true, color: ZIMA_BLUE },
        axisLine: { show: true, lineStyle: { color: ZIMA_BLUE } },
        max: (value) => Math.max(value.max, 240),
      },
    ],
    yAxis: [
      {
        type: 'value',
        scale: true,
        splitArea: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
      },
    ],
    series: [
      {
        type: 'line',
        smooth: true,
        showSymbol: false,
        data: priceList,
        // 降采样算法
        sampling: 'lttb',
        lineStyle: {
          color: color,
          width: 1,
        },
        markLine: {
          silent: true,
          symbol: 'none',
          label: { show: false },
          data: [
            {
              symbolSize: 0,
              name: 'average',
              yAxis: last_close,
              symbol: 'none',
              lineStyle: {
                color: normalColor,
                opacity: 0.5,
              },
            },
          ],
        },
      },
    ],
  };

  return (
    <Col xs={12} xl={colspan} style={{ marginBottom: 10 }}>
      <StatisticCard
        loading={loading}
        hoverable
        // bordered={true}
        title={
          <b
            style={{
              color: ZIMA_BLUE,
              overflow: 'hidden',
              wordBreak: 'keep-all',
              whiteSpace: 'nowrap',
              width: '150px',
            }}
            onClick={() => pushToInfo(STOCK_INFO_PATH, { symbol, name })}
          >
            {name}
          </b>
        }
        subTitle={
          <span
            style={{ color: ZIMA_BLUE }}
            onClick={() => pushToInfo(STOCK_INFO_PATH, { symbol, name })}
          >
            {symbol}
          </span>
        }
        gutter={[0, 20]}
        extra={
          <Space>
            {refresh ? <SyncOutlined style={{ margin: 10, color: ZIMA_BLUE }} spin /> : null}
            {cancelOptional ? (
              <StarOutlined
                onClick={() => {
                  deleteOptional(symbol).then(() => message.success('取消关注'));
                  // .then(() => )
                }}
                style={{ color: ZIMA_BLUE, fontSize: 14 }}
              />
            ) : null}
          </Space>
        }
        statistic={{
          status: chg > 0 ? 'error' : chg < 0 ? 'success' : 'default',
          value: current,
          valueStyle: { color: color },
          prefix: prefix,
          description: (
            <Space onClick={() => pushToInfo(STOCK_INFO_PATH, { symbol, name })}>
              <Statistic value={chg} trend={trend} />
              <Statistic value={percent?.toFixed(2) + '%'} trend={trend} />
              <Statistic value={(amount / 1000_000_000).toFixed(2) + 'B'} />
              <Statistic value={(market_capital / 1000_000_000).toFixed(2) + 'B'} />
            </Space>
          ),
        }}
        chart={<EChartsReact style={{ height: 100, width: '100%' }} option={option} />}
      />
    </Col>
  );
};
export default FinanceCard;
