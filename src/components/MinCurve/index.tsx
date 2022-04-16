import React from 'react';
import { Finance } from '@/services/ant-design-pro/finance';
import EChartsReact from 'echarts-for-react';
import { downColor, normalColor, upColor } from '@/components/KLine';
import { start } from '@/utils/common';
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

export type MinCurveProps = {
  data: Finance.MinData;
  accumulate?: boolean;
};

const MinCurve: React.FC<MinCurveProps> = (props) => {
  const { data, accumulate = true } = props;
  const { name, code, minData, low = '0', close = '0', high = '0' } = data;

  if (minData === undefined || minData.length === 0) return <></>;

  const dateList = minData?.map((min) => {
    //由于返回的时间不带:,所以统一添加:
    const time = min[0];
    return time.slice(0, 2) + ':' + time.slice(2);
  });
  const priceList = minData?.map((min) => parseFloat(min[1]));

  // 由于接口的成交量和成交额是递增的，这里通过差值计算返回每个时间的量
  const volumeList = minData?.map((min) => parseFloat(min[2]) / 100);
  const turnoverList = minData?.map((min) => Math.round(parseFloat(min[3]) / 10000));

  const diff = (list: number[], price: number[]) => {
    const result: number[][] = [];
    for (let i = 0; i < list?.length; i++) {
      if (accumulate) {
        result.push([
          i,
          i == 0 ? list[0] : list[i] - list[i - 1],
          i == 0 ? 1 : price[i] > price[i - 1] ? 1 : -1,
        ]);
      } else {
        result.push([i, list[i], i == 0 ? 1 : price[i] > price[i - 1] ? 1 : -1]);
      }
    }
    return result;
  };

  const volumeListDiff = diff(volumeList, priceList);
  const turnoverListDiff = diff(turnoverList, priceList);

  const option: EChartsOption = {
    dataZoom: [
      {
        type: 'inside',
        start: start(dateList, 500),
        xAxisIndex: [0, 1, 2],
        end: 100,
      },
    ],
    title: [
      {
        left: 'center',
        text: `${name}(${code})`,
      },
    ],
    visualMap: [
      {
        show: false,
        type: 'piecewise',
        seriesIndex: 0,
        pieces: [
          {
            gt: parseFloat(low),
            lte: parseFloat(close),
            color: downColor,
          },
          {
            gt: parseFloat(close),
            lte: parseFloat(high),
            color: upColor,
          },
        ],
      },
      {
        show: false,
        seriesIndex: 1,
        dimension: 2,
        pieces: [
          {
            value: 1,
            color: upColor,
          },
          {
            value: -1,
            color: downColor,
          },
        ],
      },
      {
        show: false,
        seriesIndex: 2,
        dimension: 2,
        pieces: [
          {
            value: 1,
            color: upColor,
          },
          {
            value: -1,
            color: downColor,
          },
        ],
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
    axisPointer: {
      link: [
        {
          xAxisIndex: 'all',
        },
      ],
      label: {
        backgroundColor: '#977',
      },
    },
    xAxis: [
      {
        data: dateList,
        max: (value) => Math.max(value.max, 240),
      },
      {
        data: dateList,
        gridIndex: 1,
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        max: (value) => Math.max(value.max, 240),
      },
      {
        data: dateList,
        gridIndex: 2,
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        max: (value) => Math.max(value.max, 240),
      },
    ],
    yAxis: [
      {
        scale: true,
        splitArea: { show: false },
        splitLine: { show: false },
      },
      {
        scale: true,
        gridIndex: 1,
        splitNumber: 1,
        splitArea: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
      },
      {
        scale: true,
        gridIndex: 2,
        splitNumber: 1,
        splitArea: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
      },
    ],
    grid: [
      {
        left: '5%',
        right: '5%',
        top: '10%',
        height: '60%',
      },
      {
        left: '5%',
        right: '5%',
        bottom: '15%',
        height: '12%',
      },
      {
        left: '5%',
        right: '5%',
        bottom: '2%',
        height: '12%',
      },
    ],
    series: [
      {
        name: '股价',
        sampling: 'lttb',
        type: 'line',
        showSymbol: false,
        smooth: true,
        data: priceList,
        markPoint: {
          data: [
            { type: 'max', name: 'Max', itemStyle: { color: upColor } },
            { type: 'min', name: 'Min', itemStyle: { color: downColor } },
          ],
        },
        markLine: {
          symbol: 'none',
          data: [
            {
              name: 'average',
              type: 'average',
              symbol: 'none',
              lineStyle: {
                type: 'dotted',
                opacity: 0.7,
              },
            },
            {
              name: 'average',
              yAxis: parseFloat(close),
              symbol: 'none',
              lineStyle: {
                color: normalColor,
                opacity: 0.5,
              },
            },
          ],
        },
      },
      {
        name: '成交量(手)',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: volumeListDiff,
      },
      {
        name: '成交额(W)',
        type: 'bar',
        xAxisIndex: 2,
        yAxisIndex: 2,
        data: turnoverListDiff,
      },
    ],
  };

  return <EChartsReact style={{ width: '100%', height: 600 }} theme="dark" option={option} />;
};

export default MinCurve;
