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
import React, {useEffect, useState} from "react";
import EChartsReact from "echarts-for-react";
import {start} from "@/utils/common";
import {downBorderColor, downColor, upBorderColor, upColor} from "@/components/KLine";
import {kData} from '@/services/snowball/snowball-api';
import {dateByTs} from "@/utils/timeUtil";

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


export type KDayDataProps = {
  symbol: string,
  detail?: Snowball.StockDetail,
  period: Snowball.KPeriod,
}

const showSymbol = true;
const showAllSymbol = false;
const opacity = 0.35;
const avgOpacity = 0.5;

const KData: React.FC<KDayDataProps> = (props) => {

  const {symbol, detail, period} = props;
  const {name} = detail?.quote || {};

  const [rawData, setRawData] = useState<Snowball.KDayData>();

  useEffect(() => {
    kData(symbol, Date.now(), period).then(result => {
      setRawData(result.data);
    })
  }, [symbol]);

  const splitData = () => {
    const categoryData: string[] = [];
    const values: number[][] = [];
    const volumes: number[][] = [];
    const pes: number[] = [];
    const pbs: number[] = [];
    const pss: number[] = [];
    const pcfs: number[] = [];
    const marketCapitals: number[] = [];
    rawData?.item.map((i, index) => {
      const [
        timestamp, volume, open, high, low, close, chg, percent, turnoverrate,
        amount, volume_post, amount_post, pe, pb, ps, pcf, market_capital, balance,
        hold_volume_cn, hold_ratio_cn, net_volume_cn, hold_volume_hk,
        hold_ratio_hk, net_volume_hk
      ] = i;

      categoryData.push(dateByTs(timestamp));
      values.push([open, close, low, high]);
      volumes.push([index, volume / 100, open > close ? 1 : -1]);
      pes.push(pe);
      pbs.push(pb);
      pss.push(ps);
      pcfs.push(pcf);
      marketCapitals.push(Number((market_capital / 100_000_000).toFixed(2)));
    });

    return {categoryData, values, volumes, pes, pbs, pss, pcfs, marketCapitals};
  }

  const data = splitData()

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
      text: `${name}(${symbol})`,
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
        // backgroundColor: '#977'
      }
    },
    legend: {
      top: '5%',
      data: ['K线', 'MA5', 'MA10', 'MA20', 'MA30', 'MA60', 'PE', 'PB', 'PS', 'PCF', '市值(Y)'],
      selected: {
        'K线': true,
        'MA5': false,
        'MA10': false,
        'MA20': false,
        'MA30': false,
        'MA60': true,
        'PE': false,
        'PB': false,
        'PS': false,
        'PCF': false,
        '市值(Y)': false,
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
        bottom: '2%',
        height: '15%'
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
        max: value => Math.max(value.max, 50)
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
        max: value => Math.max(value.max, 50)
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
        start: start(data.values, 200),
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
                opacity: avgOpacity,
              }
            },
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
        },
      },
      {
        symbol: 'diamond',
        symbolSize: 3,
        showSymbol: showSymbol,
        showAllSymbol: showAllSymbol,
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
        showSymbol: showSymbol,
        showAllSymbol: showAllSymbol,
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
        showSymbol: showSymbol,
        showAllSymbol: showAllSymbol,
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
        showSymbol: showSymbol,
        showAllSymbol: showAllSymbol,
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
        yAxisIndex: 2,
        data: data.volumes
      },
      {
        symbol: 'diamond',
        symbolSize: 3,
        showSymbol: showSymbol,
        showAllSymbol: showAllSymbol,
        name: 'PE',
        type: 'line',
        data: data.pes,
        xAxisIndex: 0,
        yAxisIndex: 1,
        smooth: true,
        lineStyle: {
          opacity: opacity || 0.4
        },
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
                opacity: avgOpacity,
              }
            },
          ]
        },
      },
      {
        symbol: 'diamond',
        symbolSize: 3,
        showSymbol: showSymbol,
        showAllSymbol: showAllSymbol,
        name: 'PB',
        type: 'line',
        data: data.pbs,
        xAxisIndex: 0,
        yAxisIndex: 1,
        smooth: true,
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
                opacity: avgOpacity
              }
            },
          ]
        },
        lineStyle: {
          opacity: opacity || 0.4
        }
      },
      {
        symbol: 'diamond',
        symbolSize: 3,
        showSymbol: showSymbol,
        showAllSymbol: showAllSymbol,
        name: 'PS',
        type: 'line',
        data: data.pss,
        xAxisIndex: 0,
        yAxisIndex: 1,
        smooth: true,
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
                opacity: avgOpacity
              }
            },
          ]
        },
        lineStyle: {
          opacity: opacity || 0.4
        }
      },
      {
        symbol: 'diamond',
        symbolSize: 3,
        showSymbol: showSymbol,
        showAllSymbol: showAllSymbol,
        name: 'PCF',
        type: 'line',
        data: data.pcfs,
        xAxisIndex: 0,
        yAxisIndex: 1,
        smooth: true,
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
                opacity: avgOpacity
              }
            },
          ]
        },
        lineStyle: {
          opacity: opacity || 0.4
        }
      },
      {
        symbol: 'diamond',
        symbolSize: 3,
        showSymbol: showSymbol,
        showAllSymbol: showAllSymbol,
        name: '市值(Y)',
        type: 'line',
        data: data.marketCapitals,
        xAxisIndex: 0,
        yAxisIndex: 1,
        smooth: true,
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
                opacity: avgOpacity
              }
            },
          ]
        },
        lineStyle: {
          opacity: opacity || 0.4
        }
      },
    ]
  };

  return (
    <EChartsReact style={{width: '100%', height: 600}} theme='dark' option={option}/>
  );
}

export default KData;


