import React, {useEffect, useRef, useState} from "react";
import {Button, Divider, message, PageHeader, Row, Space, Statistic, Tabs, Tag} from "antd";
import {downColor, upColor} from "@/components/KLine";
import {color, simple, ZIMA_BLUE} from "@/utils/common";
import {stockDetail, suggestStock} from "@/services/snowball/snowball-api";
import SearchSelect from "@/components/SearchSelect";
import MinData from "@/components/snowball/MinData";
import FiveDayData from "@/components/snowball/FiveDayData";
import KData from "@/components/snowball/KData";
import ProCard from "@ant-design/pro-card";
import {addOptional, deleteOptional, userInfo} from "@/services/ant-design-pro/antq-api";
import {StarFilled, StarOutlined, SyncOutlined} from "@ant-design/icons";
import {useModel} from "@@/plugin-model/useModel";

const {TabPane} = Tabs;

const StockStatistic: React.FC<{ tag: string, value?: string | number, ratio?: string, color?: string }> = (props) => {
  const {tag, value, ratio, color: c} = props;
  return (
    <>
      <Statistic
        key={tag}
        style={{width: '100px'}}
        title={tag}
        value={simple(value)}
        suffix={ratio}
        precision={2}
        valueStyle={{color: c, fontSize: '16px', fontWeight: 'bold'}}
      />
    </>
  );
}

const tabs = ['分时', '五日', '日K', '周K', '月K', '季K', '年K']

const StockHeader: React.FC<{ stockInfo: Partial<Snowball.StockInfo> }> = (props) => {
  const {initialState} = useModel('@@initialState');
  const {stockInfo} = props;

  const [detail, setDetail] = useState<Snowball.StockDetail>();
  const [info, setInfo] = useState<Partial<Snowball.StockInfo>>(stockInfo);
  const [optionals, setOptionals] = useState<API.FinanceOptional[]>(initialState?.currentUser?.optionalList || []);
  const [refresh, setRefresh] = useState<boolean>(true);
  const [tab, setTab] = useState<string>(tabs[0]);

  const name = info?.name || '正邦科技';
  const symbol = info?.symbol || 'SZ002157';

  const ref: any = useRef();

  const getDetail = () => {
    stockDetail(symbol).then(response => {
      if (response?.data) {
        setDetail(response.data);
        setRefresh(response.data?.market?.status_id === 5 && tab === tabs[0])
      }
    });
  }

  useEffect(() => {
    if (ref.current) clearInterval(ref.current);
    getDetail();
    if (refresh) {
      ref.current = setInterval(() => getDetail(), 5000);
    }
    // return 代表卸载触发
    return () => {
      if (ref.current) clearInterval(ref.current);
    }
  }, [info, symbol, optionals, refresh, tab])

  const {market, others, quote, tags} = detail || {};
  const {last_close, chg} = quote || {};
  const c = chg === undefined ? 'gray' : chg > 0 ? upColor : chg == 0 ? 'gray' : downColor;

  const flag = symbol.startsWith('SZ') || symbol.startsWith('SH') ? '¥' : isNaN(Number(symbol)) ? '$' : 'HK';

  return (
    <>
      <PageHeader
        onBack={() => history.back()}
        title={name}
        tags={tags?.map(tag => <Tag key={tag.description} color={ZIMA_BLUE}>{tag.description}</Tag>)}
        subTitle={<b>{symbol}</b>}
        extra={<div style={{marginRight: 350}}>
          {refresh ? <SyncOutlined style={{margin: 10, color: ZIMA_BLUE}} spin/> :
            <SyncOutlined style={{margin: 10, color: 'orangered'}}/>}
          {
            market?.status_id === 5 ?
              <Tag color={ZIMA_BLUE}>{market.status}</Tag>
              : market?.status ? <Tag color='red'>{market.status}</Tag> : null
          }
          <SearchSelect
            searchOnEnter
            style={{width: 200, margin: 10}}
            placeholder='股票搜索'
            request={async (params: any) => {
              const result = await suggestStock(params);
              return result?.data?.map(s => ({label: `${s.query}(${s.code})`, value: s.code})) || [];
            }}
            change={(value: any, option: any) => {
              if (option) setInfo({...stockInfo, name: option.value, symbol: option.key});
            }}
          />
          {
            !optionals.find(optional => optional.symbol === symbol)
              ? <Button key="1" type="primary"
                        onClick={() => {
                          addOptional({symbol})
                            .then(() => userInfo())
                            .then(result => setOptionals(result?.data?.optionalList || []))
                            .then(() => message.success('添加关注'));
                        }}
              ><StarFilled/></Button> :
              <Button key='2' danger type='primary' onClick={() => {
                deleteOptional(symbol)
                  .then(() => userInfo())
                  .then(result => setOptionals(result?.data?.optionalList || []))
                  .then(() => message.success('取消关注'));
              }}
              ><StarOutlined/></Button>
          }
        </div>}
        ghost={false}
        footer={
          <Tabs defaultActiveKey={tabs[0]} onChange={v => setTab(v)}>
            <TabPane tab={tabs[0]} key={tabs[0]}>
              <MinData accumulate={false} symbol={symbol} detail={detail}/>
            </TabPane>
            <TabPane tab={tabs[1]} key={tabs[1]}>
              <ProCard ghost>
                <FiveDayData symbol={symbol} detail={detail}/>
              </ProCard>
            </TabPane>
            <TabPane tab={tabs[2]} key={tabs[2]}>
              <ProCard ghost><KData symbol={symbol} detail={detail} period='day'/></ProCard>
            </TabPane>
            <TabPane tab={tabs[3]} key={tabs[3]}>
              <ProCard ghost><KData symbol={symbol} detail={detail} period='week'/></ProCard>
            </TabPane>
            <TabPane tab={tabs[4]} key={tabs[4]}>
              <ProCard ghost><KData symbol={symbol} detail={detail} period='month'/></ProCard>
            </TabPane>
            <TabPane tab={tabs[5]} key={tabs[5]}>
              <ProCard ghost><KData symbol={symbol} detail={detail} period='quarter'/></ProCard>
            </TabPane>
            <TabPane tab={tabs[6]} key={tabs[6]}>
              <ProCard ghost><KData symbol={symbol} detail={detail} period='year'/></ProCard>
            </TabPane>
          </Tabs>
        }
      >
        <Space direction='vertical'>
          <div>
            <span key='1' style={{color: c, fontSize: '32px', fontWeight: 'bolder'}}>{flag}{quote?.current}</span>
            <Divider type='vertical' dashed={true}/>
            <span key='2' style={{color: c, fontSize: '20px', fontWeight: 'bolder'}}>{quote?.chg}</span>
            <Divider type='vertical' dashed={true}/>
            <span key='3' style={{color: c, fontSize: '20px', fontWeight: 'bolder'}}>{quote?.percent}%</span>
          </div>
          <div>
            {/*
            <Tag style={{fontWeight: 'bold'}}>
              <Space>
                <span key={1} style={{color: 'gray'}}>股票转债:</span>
                <span key={2} style={{color: upColor}}>120.5</span>
                <span key={3} style={{color: upColor}}>2.5</span>
                <span key={4} style={{color: upColor}}>6.5%</span>
              </Space>
            </Tag>
*/}
          </div>
          <Row>
            <StockStatistic tag={'最高'} value={quote?.high} color={color(quote?.high, last_close)}/>
            <StockStatistic tag={'今开'} value={quote?.open} color={color(quote?.open, last_close)}/>
            <StockStatistic tag={'涨停'} value={quote?.limit_up} color={color(quote?.limit_up, last_close)}/>
            <StockStatistic tag={'成交量(手)'} value={quote?.volume ? quote?.volume / 100 : 0}/>
            <StockStatistic tag={'最低'} value={quote?.low} color={color(quote?.low, last_close)}/>
            <StockStatistic tag={'昨收'} value={quote?.last_close} color={color(last_close, last_close)}/>
            <StockStatistic tag={'跌停'} value={quote?.limit_down} color={color(quote?.limit_down, last_close)}/>
            <StockStatistic tag={'成交额'} value={quote?.amount}/>
            <StockStatistic tag={'换手'} value={quote?.turnover_rate} ratio='%'/>
            <StockStatistic tag={'市盈率(动)'} value={quote?.pe_forecast} color={color(quote?.pe_forecast)}/>
            <StockStatistic tag={'市盈率(TTM)'} value={quote?.pe_ttm} color={color(quote?.pe_ttm)}/>
            <StockStatistic tag={'市盈率(静)'} value={quote?.pe_lyr} color={color(quote?.pe_lyr)}/>
            <StockStatistic tag={'市净率'} value={quote?.pb} color={color(quote?.pb)}/>
          </Row>
          <Row>
            <StockStatistic tag={'振幅'} value={quote?.amplitude} ratio='%'/>
            <StockStatistic tag={'每股收益'} value={quote?.eps}/>
            <StockStatistic tag={'股息(TTM)'} value={quote?.dividend}/>
            <StockStatistic tag={'委比'} value={others?.pankou_ratio} ratio='%'/>
            <StockStatistic tag={'量比'} value={quote?.volume_ratio}/>
            <StockStatistic tag={'总股本'} value={quote?.total_shares}/>
            <StockStatistic tag={'总市值'} value={quote?.market_capital}/>
            <StockStatistic tag={'每股净资产'} value={quote?.navps}/>
            <StockStatistic tag={'股息率(TTM)'} value={quote?.dividend_yield} ratio='%'/>
            <StockStatistic tag={'流通股'} value={quote?.float_shares}/>
            <StockStatistic tag={'流通值'} value={quote?.float_market_capital}/>
            <StockStatistic tag={'52周最高'} value={quote?.high52w} color={color(quote?.high52w, last_close)}/>
            <StockStatistic tag={'52周最低'} value={quote?.low52w} color={color(quote?.low52w, last_close)}/>
          </Row>
        </Space>
      </PageHeader>
    </>
  )
}
export default StockHeader;
