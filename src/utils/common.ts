import {downColor, upColor} from "@/components/KLine";
import {Finance} from "@/services/ant-design-pro/finance";

export const ZIMA_BLUE = '#16b8f3';
export const ZIMA_BLUE_REVERSE = '#FF4D4F';
export const GREEN = '#6DD04F';

// 根据数据长度判断缩放的范围
// 小于100个点时，全显示
// 大于100个点，显示最近的100个点
export const start = (data: any[], size: number) => {
  const len = data.length;
  if (len <= size) return 0;
  const percent = size / len;
  return 100 - percent * 100;
}

// ΔQ=Q3−Q1
// Lower = Q1 – 1.5ΔQ
// Upper = Q3 + 1.5ΔQ
// 统计箱型图数据
export const boxPlot = (data: any[]): Finance.BoxPlotInfo => {
  if (!data) return {min: 0, max: 0, mid: 0, q1: 0, q3: 0, lower: 0, upper: 0};
  const len = data.length;
  data.sort((a, b) => a - b);

  const min = parseFloat(data[0]);
  const max = parseFloat(data[len - 1]);
  const mid = parseFloat(data[Math.round(len / 2)]);
  const q1 = parseFloat(data[Math.round(len / 4)]);
  const q3 = parseFloat(data[Math.round((3 * len) / 4)]);
  const range = q3 - q1;
  const lower = q1 - 1.5 * range;
  const upper = q3 + 1.5 * range;
  return {min, max, mid, q1, q3, lower, upper};
}

// 模拟凯莉公式计算推荐仓位 position = (bp-q)/b
// b:赔率 p:胜率 q:败率
export const position = (data: any[]): string => {
  if (!data) return '0';
  const len = data.length;
  const now = data[len - 1];
  data.sort((a, b) => a - b);
  const min = parseFloat(data[0]);
  const max = parseFloat(data[len - 1]);
  // 赔率
  const b = (max - now) / (now - min);
  const i = data.findIndex(d => d >= now);
  console.log(i);
  // 败率
  const q = i / len;
  // 胜率
  const p = 1 - q;
  console.log(b);
  console.log(p);
  console.log(q);
  return (100 * (b * p - q) / b).toFixed(2);
}

const Y = 100_000_000;
const W = 10_000;
export const simple = (v: string | number | undefined) => {
  if (!v) return '-';
  let value: number;
  if (typeof v === 'string') {
    value = parseFloat(v);
  } else value = v;

  if (value >= Y) return (value / Y).toFixed(2) + 'Y';
  if (value >= W) return (value / W).toFixed(2) + 'W';
  return value.toFixed(2);
}

export const color = (value = 0, compare = 0) => {
  if (value > compare) return upColor;
  else if (value < compare) return downColor;
  return 'gray';
}
