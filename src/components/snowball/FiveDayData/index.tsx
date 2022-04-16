import React, {useEffect, useState} from "react";
import EChartsReact from "echarts-for-react";
import {downColor, upColor} from "@/components/KLine";
import * as echarts from 'echarts/core';
import {
  GridComponent,
  GridComponentOption,
  TitleComponent,
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  VisualMapComponent,
  VisualMapComponentOption
} from 'echarts/components';
import {BarSeriesOption, LineChart, LineSeriesOption} from "echarts/charts";
import {CanvasRenderer} from "echarts/renderers";
import {UniversalTransition} from "echarts/features";
import {fiveDay} from "@/services/snowball/snowball-api";
import {datetimeByTs} from "@/utils/timeUtil";

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition
]);

type EChartsOption = echarts.ComposeOption<| TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | VisualMapComponentOption
  | LineSeriesOption
  | BarSeriesOption>;

export type FiveDayDataProps = {
  symbol: string,
  detail?: Snowball.StockDetail,
}

const FiveDayData: React.FC<FiveDayDataProps> = (props) => {
  const {symbol, detail} = props;
  const {name} = detail?.quote || {};

  const [data, setData] = useState<Snowball.FiveDayData[]>([]);

  useEffect(() => {
    fiveDay(symbol).then(result => setData(result?.data?.items));
  }, [symbol])

  const dateList = data?.map(d => datetimeByTs(d.timestamp));
  const priceList = data?.map(d => d.current);
  const volumeList = data?.map(d => d.volume / 100);
  const turnoverList = data?.map(d => d.amount / 10000);

  const diff = (list: number[], price: number[]) => {
    const result: number[][] = [];
    for (let i = 0; i < list?.length; i++) {
      result.push([i, list[i], i == 0 ? 1 : price[i] > price[i - 1] ? 1 : -1]);
    }
    return result;
  };

  const volumeListDiff = diff(volumeList, priceList);
  const turnoverListDiff = diff(turnoverList, priceList);

  const option: EChartsOption = {
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        xAxisIndex: [0, 1, 2],
        end: 100
      },
    ],
    title: [
      {
        left: 'center',
        text: `${name}(${symbol})`
      },
    ],
    visualMap: [
      {
        show: false,
        seriesIndex: 1,
        dimension: 2,
        pieces: [
          {
            value: 1,
            color: upColor
          },
          {
            value: -1,
            color: downColor
          }
        ]
      },
      {
        show: false,
        seriesIndex: 2,
        dimension: 2,
        pieces: [
          {
            value: 1,
            color: upColor
          },
          {
            value: -1,
            color: downColor
          }
        ]
      }
    ],
    tooltip: {
      trigger: 'axis'
    },
    axisPointer: {
      link: [
        {
          xAxisIndex: 'all'
        }
      ],
      label: {
        backgroundColor: '#977'
      }
    },
    xAxis: [
      {
        data: dateList,
        splitLine: {
          show: true,
          interval: 25,
          lineStyle: {
            type: 'dashed',
          }
        }
      },
      {
        data: dateList,
        gridIndex: 1,
        axisLabel: {show: false},
        axisTick: {show: false},
      },
      {
        data: dateList,
        gridIndex: 2,
        axisLabel: {show: false},
        axisTick: {show: false},
      }
    ],
    yAxis: [
      {
        scale: true,
        splitArea: {show: false},
        splitLine: {show: false}
      },
      {
        scale: true,
        gridIndex: 1,
        splitNumber: 1,
        splitArea: {show: false},
        splitLine: {show: false},
        axisLabel: {show: false},
      },
      {
        scale: true,
        gridIndex: 2,
        splitNumber: 1,
        splitArea: {show: false},
        splitLine: {show: false},
        axisLabel: {show: false},
      },
    ],
    grid: [
      {
        left: '5%',
        right: '5%',
        top: '10%',
        height: '60%'
      },
      {
        left: '5%',
        right: '5%',
        bottom: '15%',
        height: '12%'
      },
      {
        left: '5%',
        right: '5%',
        bottom: '2%',
        height: '12%'
      }
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
            {type: 'max', name: 'Max', itemStyle: {color: upColor}},
            {type: 'min', name: 'Min', itemStyle: {color: downColor}}
          ]
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
                opacity: 0.7
              }
            },
          ]
        }
      },
      {
        name: '成交量(手)',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: volumeListDiff
      },
      {
        name: '成交额(W)',
        type: 'bar',
        xAxisIndex: 2,
        yAxisIndex: 2,
        data: turnoverListDiff
      }
    ]
  };

  return (
    <>
      <EChartsReact style={{width: '100%', height: 600}} theme='dark' option={option}/>
    </>
  )
}

export default FiveDayData;
