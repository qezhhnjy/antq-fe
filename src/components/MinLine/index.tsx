import React from "react";
import {Finance} from "@/services/ant-design-pro/finance";
import ProCard, {StatisticCard} from "@ant-design/pro-card";
import {FundStatistic} from "@/components/FundInfo";
import MinCurve from "@/components/MinCurve";
import {Progress} from "antd";
import {downColor, upColor} from "@/components/KLine";

export type MinLineProp = {
  data: Finance.MinData;
}

const ChangeBar: React.FC<{ price: string, percent: number, volume: string, up: boolean }> = (props) => {

  const {percent, price, volume, up} = props;
  const color = up ? upColor : downColor;

  return (
    <div style={{marginTop: 10, marginBottom: 10}}>
      <div style={{display: 'inline-block', float: 'left', width: '30%', color: color}}><b>{price}</b></div>
      <div style={{width: '40%', margin: 'auto', display: 'inline-block'}}>
        <Progress strokeLinecap='square' percent={percent} size="small" showInfo={false}
                  status={up ? 'exception' : 'success'}/>
      </div>
      <div style={{display: 'inline-block', width: '20%', float: 'right'}}>{volume}</div>
    </div>
  );
}

const MinLine: React.FC<MinLineProp> = (props) => {
  const {data} = props;
  const {
    name, code, circulationWorth, totalWorth, price, open, close, high, low, date,
    changePercent, priceChange, volume, volumeRate, turnover, turnoverRate,
    buy, sell, pe, spe, pb
  } = data;

  const anchor = parseFloat(close);

  const sellPrice: string[] = [sell[8], sell[6], sell[4], sell[2], sell[0]];
  const sellVolume: string[] = [sell[9], sell[7], sell[5], sell[3], sell[1]];
  const buyPrice: string[] = [buy[0], buy[2], buy[4], buy[6], buy[8]];
  const buyVolume: string[] = [buy[1], buy[3], buy[5], buy[7], buy[9]];
  const maxVolume: any = [...sellVolume, ...buyVolume].sort((a, b) => parseFloat(b) - parseFloat(a))[0];

  return (
    <ProCard split="vertical">
      <StatisticCard
        colSpan='15%'
        title={<div><b>{name}</b>({code})</div>}
        statistic={{
          value: price,
          suffix: '元',
          trend: parseFloat(price) > anchor ? 'up' : 'down',
          description: (
            <>
              <FundStatistic title='涨跌' value={changePercent} suffix='%' trend/>
              <FundStatistic title='波动' value={priceChange} suffix='元' trend/>
              <FundStatistic title='今开' value={open} suffix='元' trend anchor={anchor}/>
              <FundStatistic title='昨收' value={close} suffix='元'/>
              <FundStatistic title='最高' value={high} suffix='元' trend anchor={anchor}/>
              <FundStatistic title='最低' value={low} suffix='元' trend anchor={anchor}/>
              <FundStatistic title='成交量' value={volume} suffix='手'/>
              <FundStatistic title='成交量比率' value={volumeRate} suffix='%'/>
              <FundStatistic title='成交额' value={turnover} suffix='万元'/>
              <FundStatistic title='换手率' value={turnoverRate} suffix='%'/>
              <FundStatistic title='更新日期' value={date}/>
            </>
          ),
        }}
        footer={
          <>
            <FundStatistic title='PE' tip='市盈率' value={pe}/>
            <FundStatistic title='SPE' tip='静态市盈率' value={spe}/>
            <FundStatistic title='PB' tip='市净率' value={pb}/>
            <FundStatistic title='流通市值' value={circulationWorth} suffix='亿元'/>
            <FundStatistic title='总市值' value={totalWorth} suffix='亿元'/>
          </>
        }
      />
      <ProCard colSpan='70%'>
        {
          data.minData ? <MinCurve data={data}/> : null
        }
      </ProCard>
      <ProCard colSpan='15%' split='horizontal' style={{height: 600}}>
        <ProCard title='卖盘' style={{height: 270}}>
          <FundStatistic title='价格' value='单量(手)'/>
          {
            sellPrice.map((p, i) => {
              return <ChangeBar price={p} up={parseFloat(p) > parseFloat(close)}
                                percent={parseFloat(sellVolume[i]) / maxVolume * 100}
                                volume={sellVolume[i]}/>
            })
          }
        </ProCard>
        <ProCard title='买盘' style={{height: 300}}>
          <FundStatistic title='价格' value='单量(手)'/>
          {
            buyPrice.map((p, i) => {
              return <ChangeBar price={p} up={parseFloat(p) > parseFloat(close)}
                                percent={parseFloat(buyVolume[i]) / maxVolume * 100}
                                volume={buyVolume[i]}/>
            })
          }
        </ProCard>
      </ProCard>
    </ProCard>
  );
}

export default MinLine;
