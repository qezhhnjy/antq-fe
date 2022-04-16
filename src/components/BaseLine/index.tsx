import React, {CSSProperties} from "react";
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
import EChartsReact from "echarts-for-react";
import {ZIMA_BLUE} from "@/utils/common";
import {downColor, upColor} from "@/components/KLine";

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

type BaseLineProps = {
  style?: CSSProperties;
  xData?: string[] | number[];
  yData?: string[] | number[];
  title?: string;
  min?: number;
  max?: number;
  name?: string;
}
const BaseLine: React.FC<BaseLineProps> = (props) => {
  const {style, xData, yData, title, min = 0, max = 100, name} = props;

  const option: EChartsOption = {
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100
      },
    ],
    title: [
      {
        left: 'center',
        text: title,
        textStyle: {
          fontSize: 12,
          color: ZIMA_BLUE,
        }
      },
    ],
    visualMap: [
      {

        show: false,
        type: 'continuous',
        seriesIndex: 0,
        inRange: {
          color: [downColor, ZIMA_BLUE, ZIMA_BLUE, upColor],
        },
        min: min + (max - min) * 0.4,
        max: max * 0.8,
      },
    ],
    tooltip: {
      trigger: 'axis'
    },
    xAxis: [
      {
        data: xData,
        axisTick: {show: false},
        axisLabel: {show: true, color: ZIMA_BLUE},
        axisLine: {show: true, lineStyle: {color: ZIMA_BLUE}},
      },
    ],
    yAxis: [
      {
        splitNumber: 3,
        scale: true,
        splitArea: {show: false},
        splitLine: {show: false},
        axisLabel: {show: true, color: ZIMA_BLUE},
      },
    ],
    grid: [
      {
        left: '13%',
        right: '0%',
        top: '10%',
        height: '80%'
      },
    ],
    series: [
      {
        name: name,
        type: 'line',
        showSymbol: false,
        smooth: true,
        data: yData,
      },
    ]
  };

  return (
    <EChartsReact style={style} option={option}/>
  )
}
export default BaseLine;