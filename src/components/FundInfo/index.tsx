import React from "react";
import ProCard, {StatisticCard} from "@ant-design/pro-card";
import {Finance} from "@/services/ant-design-pro/finance";
import FundCurve from "@/components/FundCurve";
import {position} from "@/utils/common";

const {Statistic} = StatisticCard;

export const FundStatistic: React.FC<{
  title: string,
  value: number | string | undefined,
  prefix?: string,
  suffix?: string
  trend?: boolean,
  // 趋势判定的锚点
  anchor?: number;
  tip?: string;
}> = (p) => {
  const {title, value, prefix, suffix, trend, tip} = p;

  const trendJudge = () => {
    if (!trend) return undefined;
    const anchor = p.anchor || 0;
    if (value) {
      if (typeof value === 'string') return parseFloat(value) > anchor ? 'up' : 'down';
      return value > anchor ? 'up' : 'down';
    }
    return undefined;
  }
  return (
    <Statistic tip={tip} layout='horizontal' suffix={suffix} prefix={prefix} title={title} value={value} trend={trendJudge()}/>
  )
}

const FundInfo: React.FC<{ info: Finance.FundInfo }> = (props) => {
  const {info} = props;
  const {
    code, name, type, totalWorth,
    netWorth, expectWorth, fundScale, manager, netWorthDate,
    dayGrowth, lastWeekGrowth, lastMonthGrowth, lastThreeMonthsGrowth, lastSixMonthsGrowth, lastYearGrowth,
    buyMin, bugSourceRate, buyRate, netWorthData
  } = info || {};

  return (
    <ProCard split="vertical">
      <StatisticCard
        colSpan='20%'
        title={<div><b>{name}</b>({code})</div>}
        statistic={{
          value: fundScale,
          description: (
            <>
              <FundStatistic title='基金经理' value={manager}/>
              <FundStatistic title='基金类型' value={type}/>
              <FundStatistic title='净值更新日期' value={netWorthDate}/>
              <FundStatistic title="当前基金单位净值" value={netWorth}/>
              <FundStatistic title="当前基金单位净值估算" value={expectWorth}/>
              <FundStatistic title="当前基金累计净值" value={totalWorth}/>
              <FundStatistic title="单位净值日涨幅" value={dayGrowth} trend suffix="%"/>
              <FundStatistic title="单位净值周涨幅" value={lastWeekGrowth} trend suffix="%"/>
              <FundStatistic title="单位净值月涨幅" value={lastMonthGrowth} trend suffix="%"/>
              <FundStatistic title="单位净值三月涨幅" value={lastThreeMonthsGrowth} trend suffix="%"/>
              <FundStatistic title="单位净值六月涨幅" value={lastSixMonthsGrowth} trend suffix="%"/>
              <FundStatistic title="单位净值年涨幅" value={lastYearGrowth} trend suffix="%"/>
            </>
          ),
        }}
        footer={
          <>
            <FundStatistic title='起购额度' value={buyMin} suffix='元'/>
            <FundStatistic title='原始买入费率' value={bugSourceRate} suffix="%"/>
            <FundStatistic title='当前买入费率' value={buyRate} suffix="%"/>
            <FundStatistic title='凯利公式推荐仓位' value={netWorthData ? position(netWorthData?.map(d => d[1]) || []) : 0}
                           suffix="%"/>
          </>
        }
      />
      <ProCard>
        {
          info.netWorthData ? <FundCurve info={info}/> : null
        }
      </ProCard>
    </ProCard>
  );
}

export default FundInfo;
