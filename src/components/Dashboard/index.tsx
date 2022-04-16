import React from "react";
import * as echarts from 'echarts/core';
import {GaugeChart, GaugeSeriesOption} from 'echarts/charts';
import {CanvasRenderer} from 'echarts/renderers';
import EChartsReact from "echarts-for-react";
import {downColor, upColor} from "@/components/KLine";
import {ZIMA_BLUE} from "@/utils/common";

echarts.use([GaugeChart, CanvasRenderer]);
type EChartsOption = echarts.ComposeOption<GaugeSeriesOption>;

const Dashboard: React.FC<{ value: number, max?: number }> = (props) => {

  const {value, max} = props;

  const option: EChartsOption = {
    series: [
      {
        type: 'gauge',
        min: 0,
        max: max || 100,
        axisLine: {
          lineStyle: {
            width: 10,
            color: [
              [0.3, downColor],
              [0.7, ZIMA_BLUE],
              [1, upColor]
            ]
          }
        },
        pointer: {
          itemStyle: {
            color: 'auto'
          }
        },
        axisTick: {
          distance: -10,
          length: 4,
          lineStyle: {
            color: '#fff',
            width: 1
          }
        },
        splitLine: {
          distance: -10,
          length: 10,
          lineStyle: {
            color: '#fff',
            width: 2
          }
        },
        axisLabel: {
          color: 'auto',
          distance: 12,
          fontSize: 12
        },
        detail: {
          fontSize: 18,
          valueAnimation: true,
          formatter: '{value}MB',
          color: 'auto',
        },
        data: [
          {
            value: value
          }
        ]
      }
    ]
  };

  return (
    <EChartsReact option={option} style={{width: '30%'}}/>
  );
}

export default Dashboard;
