declare namespace Snowball {

  type QuoteListQuery = {
    page?: number;
    size?: number;
    order?: string;
    order_by?: string;
    market?: string;
    type?: string;
    exchange?: string;
    industry?: string;
  }

  type Response<T> = {
    data: T;
    error_code: number;
    error_description: string;
  }

  type SuggestStock = {
    code: string;
    label: string;
    query: string;
    state: number;
    stock_type: number;
    type: number;
  }

  // 股票信息
  type StockInfo = {
    // 成交额
    amount: number;
    // 振幅
    amplitude: number;
    // 涨跌额
    chg: number;
    // 当前价
    current: number;
    // 年初至今
    current_year_percent: number;
    // 股息率
    dividend_yield: number;
    // 每股盈余EPS (Earnings Per Share)
    eps: number;
    first_percent: number;
    // 流通市值
    float_market_capital: number;
    // 流通股数
    float_shares: number;
    followers: number;
    has_follow: boolean;
    income_cagr: number;
    issue_date_ts: number;
    limitup_days: number;
    lot_size: number;
    main_net_inflows: number;
    // 总市值
    market_capital: number;
    name: string;
    net_profit_cagr: number;
    north_net_inflow: null
    north_net_inflow_time: null
    pb: number;
    pb_ttm: number;
    pcf: number;
    pe_ttm: number;
    // 涨跌幅
    percent: number;
    percent5m: number;
    // 市销率 ( Price-to-sales,PS)
    ps: number;
    // 净资产收益率
    roe_ttm: number;
    // 股票代码
    symbol: string;
    tick_size: number;
    total_percent: number;
    total_shares: number;
    // 换手率
    turnover_rate: number;
    type: number;
    // 成交量
    volume: number;
    // 成交量占比
    volume_ratio: number;
  }

  // 可转债信息
  type ConvertibleBond = {
    // 税后收益
    benefit_after_tax: number;
    // 税前收益
    benefit_before_tax: number;
    // 涨跌额
    chg: number;
    // 转股价
    conversion_price: number;
    // 转股价值
    conversion_value: number;
    // 转债占比
    convert_bond_ratio: number;
    // 当前价
    current: number;
    has_follow: boolean;
    // 具体利率
    interest_memo: string;
    lot_size: number;
    // 到期时间
    maturity_time: number;
    name: number;
    // 涨跌幅
    percent: number;
    // 溢价率
    premium_rate: number;
    // 赎回价
    putback_price: number;
    // 剩余年限
    remain_year: number;
    // 代码
    symbol: string;
    tick_size: number;
    // 转债规模
    total_issue_scale: number;
    type: number;
    // 正股价
    underlying_current: number;
    // 正股名称
    underlying_name: string;
    // 正股净资产
    underlying_navps: number;
    // 正股市净率
    underlying_pb: number;
    // 正股涨跌幅
    underlying_percent: number;
    // 正股代码
    underlying_symbol: string;
  }

  type StockDetail = {
    market?: StockMarket;
    quote?: StockQuote;
    others?: StockOther;
    tags?: Tag[];
  }

  type TradeInfo = {
    label: string;
    price: number;
    volume: number;
  }

  type PankouData = {
    ask1_order_list: any
    // 单量
    bc1: number;
    bc2: number;
    bc3: number;
    bc4: number;
    bc5: number;
    bc6: number;
    bc7: number;
    bc8: number;
    bc9: number;
    bc10: number;
    bid1_order_list: any;
    bn1: number;
    bn2: number;
    bn3: number;
    bn4: number;
    bn5: number;
    bn6: number;
    bn7: number;
    bn8: number;
    bn9: number;
    bn10: number;
    // 单价
    bp1: number;
    bp2: number;
    bp3: number;
    bp4: number;
    bp5: number;
    bp6: number;
    bp7: number;
    bp8: number;
    bp9: number;
    bp10: number;
    buypct: number;
    current: number;
    diff: number;
    level: number;
    ratio: number;
    sc1: number;
    sc2: number;
    sc3: number;
    sc4: number;
    sc5: number;
    sc6: number;
    sc7: number;
    sc8: number;
    sc9: number;
    sc10: number;
    sellpct: number;
    sn1: number;
    sn2: number;
    sn3: number;
    sn4: number;
    sn5: number;
    sn6: number;
    sn7: number;
    sn8: number;
    sn9: number;
    sn10: number;
    sp1: number;
    sp2: number;
    sp3: number;
    sp4: number;
    sp5: number;
    sp6: number;
    sp7: number;
    sp8: number;
    sp9: number;
    sp10: number;
    symbol: string;
    timestamp: number;
  }

  // 分时数据详情
  type MinItem = {
    amount: number;
    avg_price: number;
    capital: any;
    chg: number;
    current: number;
    high: number;
    kdj: any
    low: number;
    macd: any;
    percent: number;
    ratio: number
    timestamp: number;
    volume: number;
  }

  type StockMarket = {
    status_id: number;
    region: string;
    // 对应status_id: 1-未开盘，5-交易中
    status: string;
    time_zone: string;
    time_zone_desc?: string;
    delay_tag: number;
  }

  type StockQuote = {
    current_ext: any;
    symbol: string;
    volume_ext: any;
    high52w: number;
    delayed: number;
    type: number;
    tick_size: number;
    float_shares: number;
    limit_down: number;
    no_profit: any;
    high: number;
    float_market_capital: number;
    timestamp_ext: any;
    lot_size: number;
    lock_set: number;
    weighted_voting_rights: any;
    // 涨跌额
    chg: number;
    eps: number;
    last_close: number;
    profit_four: number;
    volume: number;
    volume_ratio: number;
    profit_forecast: number;
    turnover_rate: number;
    low52w: number;
    name: string;
    exchange: string;
    pe_forecast: number;
    total_shares: number;
    status: number;
    is_vie_desc: any;
    security_status: any;
    code: string;
    goodwill_in_net_assets: any;
    avg_price: number;
    percent: number;
    weighted_voting_rights_desc: any;
    amplitude: number;
    current: number;
    is_vie: any;
    current_year_percent: number;
    issue_date: number;
    sub_type: string;
    low: number;
    is_registration_desc: any;
    no_profit_desc: any;
    market_capital: number;
    dividend: number;
    dividend_yield: number;
    currency: string;
    navps: number;
    profit: number;
    timestamp: number;
    pe_lyr: number;
    amount: number;
    pledge_ratio: number;
    traded_amount_ext: any;
    is_registration: any;
    pb: number;
    limit_up: number;
    pe_ttm: number;
    time: number;
    open: number;
  }

  type StockOther = {
    pankou_ratio: number;
    cyb_switch: true;
  }

  type Tag = {
    description: string;
    value: number;
  }

  type TradeItem = {
    bid_appl_seq_num: number;
    chg: number;
    current: number;
    level: number;
    offer_appl_seq_num: number;
    percent: number;
    side: number;
    symbol: string;
    timestamp: number;
    trade_session: any;
    trade_type: any;
    trade_type_v2: any;
    trade_unique_id: string;
    trade_volume: number;
  }

  type FiveDayData = {
    // 成交额
    amount: number;
    // 成交均价
    avg_price: number;
    capital: number;
    // 涨跌额
    chg: number;
    // 当前价
    current: number;
    high: number;
    kdj: number;
    low: number;
    macd: number;
    // 涨跌幅
    percent: number;
    ratio: number;
    timestamp: number;
    // 成交量
    volume: number;
  }


  type KDayData = {
    symbol: string;
    column: string[];
    item: number[][];
  }

  type KPeriod = 'day' | 'week' | 'month' | 'quarter' | 'year';
}
