import ProTable, {ActionType, ProColumns} from "@ant-design/pro-table";
import React, {useRef} from "react";
import {stockScreenerQuoteList} from "@/services/snowball/snowball-api";
import {downColor, upColor} from "@/components/KLine";
import {Tag} from "antd";
import {pushToInfo, STOCK_INFO_PATH} from "@/utils/pushUtil";

const upOrDownSpan = (value: number, suffix?: string) => {
  let color;
  if (value >= 0) color = upColor;
  else if (value < 0) color = downColor;
  else return value;
  return <span style={{color}}>{value.toFixed(2)}{suffix}</span>
}

const infos: ProColumns<Snowball.StockInfo>[] = [
  {title: 'No.', dataIndex: 'index', valueType: 'indexBorder', width: 40},
  {
    title: '股票代码', dataIndex: 'symbol', sorter: true,
    render: (symbol: any, stockInfo) => <a
      onClick={() => pushToInfo(STOCK_INFO_PATH, {symbol, name: stockInfo.name})}>{symbol}</a>
  },
  {
    title: '股票名称', dataIndex: 'name',
    render: (name, stockInfo) => <a
      onClick={() => pushToInfo(STOCK_INFO_PATH, {symbol: stockInfo.symbol, name})}>{name}</a>
  },
  {title: '当前价', dataIndex: 'current', sorter: true},
  {
    title: '涨跌额', dataIndex: 'chg', sorter: true,
    render: (chg: any) => upOrDownSpan(chg)
  },
  {
    title: '涨跌幅',
    dataIndex: 'percent',
    sorter: true,
    render: (percent: any) => upOrDownSpan(percent, '%'),
  },
  {
    title: '年初至今', dataIndex: 'current_year_percent', sorter: true,
    render: (percent: any) => upOrDownSpan(percent, '%'),
  },
  {
    title: '成交量(万手)',
    dataIndex: 'volume',
    sorter: true,
    render: (volume: any) => isNaN(volume) ? volume : (volume / 10_000).toFixed(2)
  },
  {
    title: '成交额(亿)',
    dataIndex: 'amount', sorter: true,
    render: (amount: any) => isNaN(amount) ? amount : (amount / 100_000_000).toFixed(2)
  },
  {
    title: '换手率',
    dataIndex: 'turnover_rate',
    sorter: true,
    render: (turnover: any) => isNaN(turnover) ? turnover : turnover + '%'
  },
  {
    title: 'PE(TTM)',
    dataIndex: 'pe_ttm',
    sorter: true,
    render: (pe: any) => {
      if (isNaN(pe)) return pe;
      let color = upColor;
      if (pe >= 0 && pe <= 50) color = downColor;
      return <span style={{color}}>{pe.toFixed(2)}</span>
    }
  },
  {title: 'PS', dataIndex: 'ps', sorter: true, render: (ps: any) => isNaN(ps) ? ps : ps.toFixed(2)},
  {title: 'PB', dataIndex: 'pb', sorter: true, render: (pb: any) => isNaN(pb) ? pb : pb.toFixed(2)},
  {title: 'PB(TTM)', dataIndex: 'pb_ttm', sorter: true, render: (pb: any) => isNaN(pb) ? pb : pb.toFixed(2)},
  {
    title: 'ROE(TTM)', dataIndex: 'roe_ttm', sorter: true, render: (roe: any) => isNaN(roe) ? roe : roe.toFixed(2) + '%'
  },
  {
    title: '股息率',
    dataIndex: 'dividend_yield',
    sorter: true,
    render: (value: any) => value >= 0 ? value.toFixed(2) + '%' : value
  },
  {title: 'EPS', dataIndex: 'eps', sorter: true, render: (eps: any) => upOrDownSpan(eps)},
  {
    title: '流通市值(亿)',
    dataIndex: 'float_market_capital',
    sorter: true,
    render: (value: any) => isNaN(value) ? value : (value / 100_000_000).toFixed(2)
  },
  {
    title: '总市值(亿)',
    dataIndex: 'market_capital', sorter: true,
    render: (value: any) => isNaN(value) ? value : (value / 100_000_000).toFixed(2)
  },

];

const StockTable: React.FC<{ query: Snowball.QuoteListQuery, title: string }> = (props) => {
  const {query, title} = props;
  const actionRef = useRef<ActionType>();
  actionRef.current?.reload();

  return (
    <>
      <ProTable<Snowball.StockInfo>
        columns={infos}
        actionRef={actionRef}
        pagination={{size: 'default', pageSize: 10}}
        request={async (params, sorter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          const {pageSize: size, current: page} = params;
          if (sorter) {
            for (const key in sorter) {
              query.order_by = key;
              const sort = sorter[key];
              query.order = sort === 'descend' ? 'desc' : sort === 'ascend' ? 'asc' : undefined;
            }
          }
          return stockScreenerQuoteList({
            ...query,
            page,
            size,
          }).then(response => ({
            data: response.data?.list,
            success: true,
            total: response.data?.count,
          }))
        }}
        headerTitle={<Tag color="#2db7f5">{title}</Tag>}
        search={false}
        rowKey={(data: { symbol: any; }) => data.symbol || ''}
      />
    </>
  )
};
export default StockTable;
