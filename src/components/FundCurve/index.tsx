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
import {LineChart, LineSeriesOption} from 'echarts/charts';
import {UniversalTransition} from 'echarts/features';
import {CanvasRenderer} from 'echarts/renderers';
import EChartsReact from "echarts-for-react";
import React from "react";
import {Finance} from "@/services/ant-design-pro/finance";
import {downBorderColor, downColor, normalColor, upBorderColor, upColor} from "@/components/KLine";
import {boxPlot, start} from "@/utils/common";

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
  | LineSeriesOption>;

const FundCurve: React.FC<{ info: Finance.FundInfo }> = (props) => {

  const {info} = props;
  const {name, netWorthData, totalNetWorthData} = info || {};
  const dateList = totalNetWorthData?.map(d => d[0]) || [];
  const totalData = totalNetWorthData?.map(d => d[1]) || [];
  const netData = netWorthData?.map(d => d[1]) || [];

  // const testData = [["2000-06-05", 116], ["2000-06-06", 129], ["2000-06-07", 135], ["2000-06-08", 86], ["2000-06-09", 73], ["2000-06-10", 85], ["2000-06-11", 73], ["2000-06-12", 68], ["2000-06-13", 92], ["2000-06-14", 130], ["2000-06-15", 245], ["2000-06-16", 139], ["2000-06-17", 115], ["2000-06-18", 111], ["2000-06-19", 309], ["2000-06-20", 206], ["2000-06-21", 137], ["2000-06-22", 128], ["2000-06-23", 85], ["2000-06-24", 94], ["2000-06-25", 71], ["2000-06-26", 106], ["2000-06-27", 84], ["2000-06-28", 93], ["2000-06-29", 85], ["2000-06-30", 73], ["2000-07-01", 83], ["2000-07-02", 125], ["2000-07-03", 107], ["2000-07-04", 82], ["2000-07-05", 44], ["2000-07-06", 72], ["2000-07-07", 106], ["2000-07-08", 107], ["2000-07-09", 66], ["2000-07-10", 91], ["2000-07-11", 92], ["2000-07-12", 113], ["2000-07-13", 107], ["2000-07-14", 131], ["2000-07-15", 111], ["2000-07-16", 64], ["2000-07-17", 69], ["2000-07-18", 88], ["2000-07-19", 77], ["2000-07-20", 83], ["2000-07-21", 111], ["2000-07-22", 57], ["2000-07-23", 55], ["2000-07-24", 60]];
  // const dateList = testData?.map(d => d[0]);
  // const totalData = testData?.map(d => d[1]);
  // const netData = testData?.map(d => d[1]);

  const totalBoxPlot = boxPlot([...totalData]);
  const netBoxPlot = boxPlot([...netData]);

  const option: EChartsOption = {
    // Make gradient line here
    visualMap: [
      {
        show: false,
        type: 'continuous',
        seriesIndex: 0,
        inRange: {
          color: [downBorderColor, downColor, normalColor, normalColor, upColor, upBorderColor],
        },
        min: totalBoxPlot.q1,
        max: totalBoxPlot.q3,
      },
      {
        show: false,
        type: 'continuous',
        seriesIndex: 1,
        inRange: {
          color: [downBorderColor, downColor, normalColor, normalColor, upColor, upBorderColor],
        },
        min: netBoxPlot.q1,
        max: netBoxPlot.q3,
      },
    ],
    legend: {
      top: '5%',
      data: ['累计净值', '单位净值'],
      selected: {
        '累计净值': false,
        '单位净值': true,
      }
    },
    dataZoom: [
      {
        type: 'inside',
        start: start(dateList, 300),
        end: 100
      },
    ],
    title: [
      {
        left: 'center',
        text: name
      },
    ],
    tooltip: {
      trigger: 'axis'
    },
    xAxis: [
      {
        data: dateList
      },
    ],
    yAxis: [
      {
        scale: true,
        splitArea: {show: false},
        splitLine: {show: false}
      },
    ],
    grid: [
      {
        bottom: '10%'
      },
    ],
    series: [
      {
        name: '累计净值',
        type: 'line',
        showSymbol: false,
        smooth: true,
        data: totalData,
        // 降采样算法
        sampling: 'lttb',
        markPoint: {
          data: [
            {type: 'max', name: 'Max', itemStyle: {color: upColor}},
            {type: 'min', name: 'Min', itemStyle: {color: downColor}}
          ]
        },
        markLine: {
          data: [
            {
              name: 'average',
              type: 'average',
            },
          ]
        }
      },
      {
        name: '单位净值',
        sampling: 'lttb',
        type: 'line',
        showSymbol: false,
        smooth: true,
        data: netData,
        markPoint: {
          data: [
            {type: 'max', name: 'Max', itemStyle: {color: upColor}},
            {type: 'min', name: 'Min', itemStyle: {color: downColor}}
          ]
        },
        markLine: {
          data: [
            {
              name: 'average',
              type: 'average',
            },
          ]
        }
      },
    ]
  };

  return (
    <EChartsReact style={{width: '100%', height: '600px'}} option={option}/>
  );
}

export default FundCurve;
