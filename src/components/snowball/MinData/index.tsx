import React, {useEffect, useState} from "react";
import ProCard from "@ant-design/pro-card";
import MinCurve from "@/components/MinCurve";
import {Finance} from "@/services/ant-design-pro/finance";
import {downColor, upColor} from "@/components/KLine";
import {minData, pankou, trade} from "@/services/snowball/snowball-api";
import moment from "moment/moment";

const TradeInfo: React.FC<{
  title?: string;
  value?: number | string;
  volume?: number;
  standard?: number;
}> = (props) => {
  const {title, value, volume, standard = 0} = props;
  if (!value || !volume) return null;
  const color = value > standard ? upColor : value == standard ? 'gray' : downColor;
  return (
    <div style={{margin: 11, display: 'block'}}>
      <div style={{display: 'inline-block', float: 'left', width: '35%', color: 'gray'}}><b>{title}</b></div>
      <div style={{display: 'inline-block', float: 'left', width: '35%', color: color}}>
        <b>{value === null ? '-' : value}</b></div>
      <div style={{display: 'inline-block', width: '20%', float: 'right'}}>{volume}</div>
    </div>
  )
}

export type MinDataProps = {
  accumulate?: boolean;
  symbol: string;
  detail?: Snowball.StockDetail;
}

const convert = (data: any, detail?: Snowball.StockDetail): any => {
  if (!data || !detail) return {};
  const {name, symbol, low, last_close, high} = detail.quote || {};
  const d = data?.items?.map((item: any) => [moment(item.timestamp).format('HHmm'), item.current, item.volume, item.amount]);
  return {name, code: symbol, low: low + '', high: high + '', close: last_close + '', minData: d};
}

const MinData: React.FC<MinDataProps> = (props) => {
  const {accumulate, symbol, detail} = props;
  const [pankouData, setPankouData] = useState<Snowball.PankouData>();
  const [tradeData, setTradeData] = useState<{ items: Snowball.TradeItem[] }>();
  const [minCurveData, setMinCurveData] = useState<Finance.MinData>({
    buy: [],
    close: "0",
    code: "0",
    price: "0",
    sell: []
  });

  const {items} = tradeData || {};

  useEffect(() => {
    minData(symbol).then(result => setMinCurveData(convert(result.data, detail)));
    pankou(symbol)
      .then(result => setPankouData(result.data))
      .then(() => trade(symbol))
      .then(result => setTradeData(result.data));
  }, [detail, symbol]);

  const lastClose = parseFloat(minCurveData.close as string);
  return (
    <ProCard split="vertical" ghost>
      <ProCard colSpan='85%' ghost>
        <MinCurve data={minCurveData} accumulate={accumulate}/>
      </ProCard>
      <ProCard ghost colSpan='15%' split='horizontal' style={{height: 600}}>
        {
          pankouData ?
            <ProCard title={<b>五档盘口</b>}>
              <TradeInfo title='卖五' value={pankouData?.sp5} volume={pankouData?.sc5} standard={lastClose}/>
              <TradeInfo title='卖四' value={pankouData?.sp4} volume={pankouData?.sc4} standard={lastClose}/>
              <TradeInfo title='卖三' value={pankouData?.sp3} volume={pankouData?.sc3} standard={lastClose}/>
              <TradeInfo title='卖二' value={pankouData?.sp2} volume={pankouData?.sc2} standard={lastClose}/>
              <TradeInfo title='卖一' value={pankouData?.sp1} volume={pankouData?.sc1} standard={lastClose}/>
              <TradeInfo title='买一' value={pankouData?.bp1} volume={pankouData?.bc1} standard={lastClose}/>
              <TradeInfo title='买二' value={pankouData?.bp2} volume={pankouData?.bc2} standard={lastClose}/>
              <TradeInfo title='买三' value={pankouData?.bp3} volume={pankouData?.bc3} standard={lastClose}/>
              <TradeInfo title='买四' value={pankouData?.bp4} volume={pankouData?.bc4} standard={lastClose}/>
              <TradeInfo title='买五' value={pankouData?.bp5} volume={pankouData?.bc5} standard={lastClose}/>
            </ProCard> : null
        }
        {items && items.length > 0 ?
          <ProCard title={<b>成交明细</b>}>
            {
              items.map(item =>
                <TradeInfo title={moment(item.timestamp).format('HH:mm')} value={item.current}
                           volume={item.trade_volume} standard={lastClose}/>
              )
            }
          </ProCard>
          : null
        }
      </ProCard>
    </ProCard>
  )
}

export default MinData;
