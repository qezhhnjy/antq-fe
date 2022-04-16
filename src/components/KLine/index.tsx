import * as echarts from 'echarts/core';
import {
  BrushComponent,
  BrushComponentOption,
  DataZoomComponent,
  DataZoomComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption,
  ToolboxComponent,
  ToolboxComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  VisualMapComponent,
  VisualMapComponentOption
} from 'echarts/components';
import {
  BarChart,
  BarSeriesOption,
  CandlestickChart,
  CandlestickSeriesOption,
  LineChart,
  LineSeriesOption
} from 'echarts/charts';
import {UniversalTransition} from 'echarts/features';
import {CanvasRenderer} from 'echarts/renderers';
import React from "react";
import {Finance} from "@/services/ant-design-pro/finance";
import EChartsReact from "echarts-for-react";
import {start} from "@/utils/common";

echarts.use([
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  LegendComponent,
  BrushComponent,
  DataZoomComponent,
  CandlestickChart,
  LineChart,
  BarChart,
  CanvasRenderer,
  UniversalTransition
]);

type EChartsOption = echarts.ComposeOption<| ToolboxComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | VisualMapComponentOption
  | LegendComponentOption
  | BrushComponentOption
  | DataZoomComponentOption
  | CandlestickSeriesOption
  | LineSeriesOption
  | BarSeriesOption>;


export const upColor = '#ec0000';
export const upBorderColor = '#ba0000';
export const downColor = '#00da3c';
export const downBorderColor = '#00bF28';
export const normalColor = '#999';

export type KLineProp = {
  data: Finance.KLineData[];
  // 标题
  title: string;
  // 是否显示 symbol, 如果 false 则只有在 tooltip hover 的时候显示,默认true
  showSymbol?: boolean;
  // auto：默认，如果有足够空间则显示标志图形，否则随主轴标签间隔隐藏策略。
  // true：显示所有图形。
  // false：随主轴标签间隔隐藏策略。
  // 默认false
  showAllSymbol?: true | false | 'auto';
  // 均线透明度，默认值0.4
  opacity?: number;
}

const KLine: React.FC<KLineProp> = (props) => {

  const {data: data1, showAllSymbol, showSymbol, title, opacity} = props;

  const showSymbolResult = showSymbol === undefined ? true : showSymbol;
  const showAllSymbolResult = showAllSymbol === undefined ? false : showAllSymbol;
  const data = splitData(data1)

  function splitData(rawData: Finance.KLineData[]) {
    const categoryData: string[] = [];
    const values: number[][] = [];
    const volumes: number[][] = [];

    for (let i = 0; i < rawData.length; i++) {
      const k = rawData[i];
      const {close, highest, lowest, open, time, volume} = k;
      categoryData.push(time);
      values.push([open, close, lowest, highest]);
      volumes.push([i, volume, open > close ? 1 : -1]);
    }

    return {
      categoryData: categoryData,
      values: values,
      volumes: volumes,
    };
  }

  function calculateMA(dayCount: number) {
    const result = [];
    for (let i = 0, len = data.values.length; i < len; i++) {
      if (i < dayCount) {
        result.push('-');
        continue;
      }
      let sum = 0;
      for (let j = 0; j < dayCount; j++) {
        sum += +data.values[i - j][1];
      }
      result.push((sum / dayCount).toFixed(2));
    }
    return result;
  }

  const option: EChartsOption = {
    title: {
      text: title,
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
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
    legend: {
      top: '5%',
      data: ['K线', 'MA5', 'MA10', 'MA20', 'MA30', 'MA60'],
      selected: {
        'K线': true,
        'MA5': false,
        'MA10': false,
        'MA20': false,
        'MA30': false,
        'MA60': true
      }
    },
    visualMap: {
      show: false,
      seriesIndex: 5,
      dimension: 2,
      pieces: [
        {
          value: 1,
          color: downColor
        },
        {
          value: -1,
          color: upColor
        }
      ]
    },
    grid: [
      {
        left: '5%',
        right: '5%',
        top: '10%',
        height: '70%'
      },
      {
        left: '5%',
        right: '5%',
        bottom: '5%',
        height: '12%'
      }
    ],
    xAxis: [
      {
        type: 'category',
        data: data.categoryData,
        scale: true,
        boundaryGap: false,
        axisLine: {onZero: false},
        splitLine: {show: false},
        splitArea: {show: false},
        min: 'dataMin',
        max: 'dataMax'
      },
      {
        type: 'category',
        gridIndex: 1,
        data: data.categoryData,
        scale: true,
        boundaryGap: false,
        axisLine: {onZero: false},
        axisTick: {show: false},
        splitLine: {show: false},
        axisLabel: {show: false},
        min: 'dataMin',
        max: 'dataMax'
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
        splitNumber: 2,
        axisLabel: {show: false},
        axisLine: {show: false},
        axisTick: {show: false},
        splitLine: {show: false}
      }
    ],
    dataZoom: [
      {
        type: 'inside',
        start: start(data1, 150),
        xAxisIndex: [0, 1],
        end: 100
      },
      {
        show: false,
        type: 'slider',
        top: '90%',
        start: 70,
        end: 100
      }
    ],
    series: [
      {
        name: 'K线',
        type: 'candlestick',
        data: data.values,
        itemStyle: {
          color: upColor,
          color0: downColor,
          borderColor: upBorderColor,
          borderColor0: downBorderColor,
        },
        markPoint: {
          label: {
            formatter: function (param: any) {
              return param != null ? param.value + '' : '';
            }
          },
          data: [
            {
              name: 'highest value',
              type: 'max',
              valueDim: 'highest',
              itemStyle: {color: upColor}
            },
            {
              name: 'lowest value',
              type: 'min',
              valueDim: 'lowest',
              itemStyle: {color: downColor}
            },
            {
              name: 'average value on close',
              type: 'average',
              valueDim: 'close',
              itemStyle: {color: '#aaa'}
            }
          ],
        },
        markLine: {
          symbol: ['none', 'none'],
          data: [
            [
              {
                name: 'from lowest to highest',
                type: 'min',
                valueDim: 'lowest',
                symbol: 'circle',
                symbolSize: 10,
              },
              {
                type: 'max',
                valueDim: 'highest',
                symbol: 'circle',
                symbolSize: 10,
                label: {
                  show: false
                },
              }
            ],
          ]
        }
      },
      {
        symbol: 'diamond',
        symbolSize: 3,
        showSymbol: showSymbolResult,
        showAllSymbol: showAllSymbolResult,
        name: 'MA5',
        type: 'line',
        data: calculateMA(5),
        smooth: true,
        lineStyle: {
          opacity: opacity || 0.4
        }
      },
      {
        symbol: 'diamond',
        symbolSize: 3,
        showSymbol: showSymbolResult,
        showAllSymbol: showAllSymbolResult,
        name: 'MA10',
        type: 'line',
        data: calculateMA(10),
        smooth: true,
        lineStyle: {
          opacity: opacity || 0.4
        }
      },
      {
        symbol: 'diamond',
        symbolSize: 3,
        showSymbol: showSymbolResult,
        showAllSymbol: showAllSymbolResult,
        name: 'MA20',
        type: 'line',
        data: calculateMA(20),
        smooth: true,
        lineStyle: {
          opacity: opacity || 0.4
        }
      },
      {
        symbol: 'diamond',
        symbolSize: 3,
        showSymbol: showSymbolResult,
        showAllSymbol: showAllSymbolResult,
        name: 'MA60',
        type: 'line',
        data: calculateMA(60),
        smooth: true,
        lineStyle: {
          opacity: opacity || 0.4
        }
      },
      {
        name: '成交量(手)',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: data.volumes
      }

    ]
  };

  return (
    <EChartsReact style={{width: '100%', height: '700px'}} theme='dark' option={option}/>
  );
}

export default KLine;


