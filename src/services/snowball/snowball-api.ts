import {request} from "@@/plugin-request/request";

// https://xueqiu.com/service/v5/stock/screener/quote/list?page=1&size=30&order=desc&orderby=percent&order_by=percent&market=CN&type=sh_sz&_=1640357294466
export async function stockScreenerQuoteList(query: Snowball.QuoteListQuery, options?: { [key: string]: any }) {
  return request<Snowball.Response<{ count: number, list: Snowball.StockInfo[] }>>('/snowball-api/service/v5/stock/screener/quote/list', {
    method: 'GET',
    params: {...query},
    ...(options || {})
  })
}

// https://xueqiu.com/query/v1/suggest_stock.json?q=茅台
// 查询股票信息
export async function suggestStock(q: string, options?: { [key: string]: any }) {
  return request<Snowball.Response<Snowball.SuggestStock[]>>('/snowball-api/query/v1/suggest_stock.json', {
    method: 'GET',
    params: {q},
    ...(options || {})
  })
}

// 可转债信息
export async function convertibleBondList(query: Snowball.QuoteListQuery, options?: { [key: string]: any }) {
  return request<Snowball.Response<{ count: number, list: Snowball.ConvertibleBond[] }>>('/snowball-api/service/v5/stock/screener/quote/list', {
    method: 'GET',
    params: {...query},
    ...(options || {})
  })
}

// https://stock.xueqiu.com/v5/stock/quote.json?symbol=SH600519&extend=detail
export async function stockDetail(symbol: string, options?: { [key: string]: any }) {
  return request<Snowball.Response<Snowball.StockDetail>>('/snowball-stock/stock/quote.json', {
    method: 'GET',
    params: {symbol, extend: 'detail'},
    ...(options || {})
  })
}

// https://stock.xueqiu.com/v5/stock/chart/minute.json?symbol=SH600519&period=1d
// 分时数据
export async function minData(symbol: string, options?: { [key: string]: any }) {
  return request<Snowball.Response<{ items: Snowball.MinItem[] }>>('/snowball-stock/stock/chart/minute.json', {
    method: 'GET',
    params: {symbol, period: '1d'},
    ...(options || {})
  })
}

// https://stock.xueqiu.com/v5/stock/realtime/pankou.json?symbol=SH600519
// 盘口信息
export async function pankou(symbol: string, options?: { [key: string]: any }) {
  return request<Snowball.Response<Snowball.PankouData>>('/snowball-stock/stock/realtime/pankou.json', {
    method: 'GET',
    params: {symbol},
    ...(options || {})
  });
}

// https://stock.xueqiu.com/v5/stock/history/trade.json?symbol=SH600519&count=10
// 成交明细
export async function trade(symbol: string, options?: { [key: string]: any }) {
  return request<Snowball.Response<{ items: Snowball.TradeItem[] }>>('/snowball-stock/stock/history/trade.json', {
    method: 'GET',
    params: {symbol, count: 20},
    ...(options || {})
  });
}

// https://stock.xueqiu.com/v5/stock/chart/minute.json?symbol=SH600519&period=5d
// 五日数据
export async function fiveDay(symbol: string, period = '5d', options?: { [key: string]: any }) {
  return request<Snowball.Response<{ items: Snowball.FiveDayData[]; }>>('/snowball-stock/stock/chart/minute.json', {
    method: 'GET',
    params: {symbol, period},
    ...(options || {})
  });
}

// https://stock.xueqiu.com/v5/stock/chart/kline.json?symbol=SH600519&begin=1641204484000&period=day&type=before&count=-100000&indicator=kline,pe,pb,ps,pcf,market_capital,agt,ggt,balance
// 从当前时间往前获取K线数据
export async function kData(symbol: string, begin: number, period: string, options?: { [key: string]: any }) {
  return request<Snowball.Response<Snowball.KDayData>>('/snowball-stock/stock/chart/kline.json', {
    method: 'GET',
    params: {
      symbol,
      begin,
      period,
      type: 'before',
      count: -5000,
      indicator: 'kline,pe,pb,ps,pcf,market_capital,agt,ggt,balance'
    },
    ...(options || {})
  });
}

export async function ipInfo(){
  return request('https://forge.speedtest.cn/api/location/info',{})
}
