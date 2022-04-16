import {Reinstatement} from '@/services/ant-design-pro/enums';

declare namespace Finance {
  type StockType = 'min' | 'kline/day' | 'kline/week' | 'kline/month';

  type FinanceType = 'stock' | 'fund' | 'index';

  type StockQuery = {
    data: StockType;
    code: string;
    startDate: string;
    endDate: string;
    reinstatement: Reinstatement;
  };

  type Stock = {
    id?: number;
    code: string;
    name: string;
    type: FinanceType;
  }

  type Fund = {
    id?: number;
    code: string;
    name: string;
    type: string;
  }

  // 一组数据的 箱型图数据
  // ΔQ=Q3−Q1
  // Lower = Q1 – 1.5ΔQ
  // Upper = Q3 + 1.5ΔQ
  type BoxPlotInfo = {
    min: number;
    // 下界
    lower: number;
    // 下四分位
    q1: number;
    // 中位数
    mid: number;
    // 上四分位
    q3: number;
    // 上界
    upper: number;
    max: number;
  }

  type FundInfo = {
    // 基金代码
    code: string;
    // 基金名称
    name: string;
    // 基金类型
    type?: string;
    // 当前基金单位净值
    netWorth?: number;
    // 当前基金单位净值估算
    expectWorth?: number;
    // 当前基金累计净值
    totalWorth?: number;
    // 当前基金单位净值估算日涨幅,单位为百分比
    expectGrowth?: string;
    // 单位净值日涨幅,单位为百分比
    dayGrowth?: string;
    // 单位净值周涨幅,单位为百分比
    lastWeekGrowth?: string;
    // 单位净值月涨幅,单位为百分比
    lastMonthGrowth?: string;
    // 单位净值三月涨幅,单位为百分比
    lastThreeMonthsGrowth?: string;
    // 单位净值六月涨幅,单位为百分比
    lastSixMonthsGrowth?: string;
    // 单位净值年涨幅,单位为百分比
    lastYearGrowth?: string;
    // 起购额度
    buyMin?: string;
    // 原始买入费率,单位为百分比
    bugSourceRate?: string;
    // 当前买入费率,单位为百分比
    buyRate?: string;
    // 基金经理
    manager?: string;
    // 基金规模及日期,日期为最后一次规模变动的日期
    fundScale?: string;
    // 净值更新日期,日期格式为yy-MM-dd
    netWorthDate?: string;
    // 净值估算更新日期,日期格式为yy-MM-dd HH:mm.2019-06-27 15:00
    expectWorthDate?: string;
    // 历史净值信息["2001-12-18" , 1 , 0 , ""]依次表示:日期; 单位净值; 净值涨幅; 每份分红.
    netWorthData?: string[][];
    // 历史累计净值
    totalNetWorthData?: string[][];
  }

  type KLineData = {
    time: string;
    open: number;
    close: number;
    lowest: number;
    highest: number;
    // 成交量(手)
    volume: number;
    dividends?: string
  }

  type MinData = {
    code: string;
    name?: string;
    type?: string;
    // 开盘后价格变化
    priceChange?: string;
    // 价格变化百分比
    changePercent?: string;
    // 今日开盘价
    open?: string;
    // 昨日收盘价
    close: string;
    // 实时价格
    price: string;
    // 开盘截至目前最高价
    high?: string;
    // 开盘截至目前最低价
    low?: string;
    // 成交量(手)
    volume?: string;
    // 成交量比率
    volumeRate?: string;
    // 成交额 单位万
    turnover?: string;
    // 换手率 单位百分比
    turnoverRate?: string;
    // 总市值 单位亿
    totalWorth?: string;
    // 流通市值 单位亿
    circulationWorth?: string;
    date?: string;
    // 买一至买五["14.14","746","14.13","3506","14.12","631","14.11","927","14.10","1112"] 依次表示:买一价格; 买一交易量(手); 买二价格; 买二交易量...
    buy: string[];
    sell: string[];
    // 开盘当日分时图[0930,10.21,86,1002]依次表示:日期;股价;成交量;成交额
    minData?: string[][];
    // 市盈率
    pe?: string;
    // 静态市盈率
    spe?: string;
    // 市净率
    pb?: string;
  }
}
