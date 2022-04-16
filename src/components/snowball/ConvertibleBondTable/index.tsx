import ProTable, {ActionType, ProColumns} from "@ant-design/pro-table";
import React, {useRef} from "react";
import {convertibleBondList} from "@/services/snowball/snowball-api";
import {downColor, upColor} from "@/components/KLine";
import {Tag, Tooltip} from "antd";
import {dateByTs} from "@/utils/timeUtil";
import {pushToInfo, STOCK_INFO_PATH} from "@/utils/pushUtil";
import { ZIMA_BLUE } from "@/utils/common";

const upOrDownSpan = (value: number, suffix?: string) => {
  let color;
  if (value >= 0) color = upColor;
  else if (value < 0) color = downColor;
  else return value;
  return <span style={{color}}>{value.toFixed(2)}{suffix}</span>
}

const infos: ProColumns<Snowball.ConvertibleBond>[] = [
  {title: 'No.', dataIndex: 'index', valueType: 'indexBorder', width: 40},
  {
    title: '代码',
    sorter: true,
    dataIndex: 'symbol',
    render: (symbol: any, bond) => <a
      onClick={() => pushToInfo(STOCK_INFO_PATH, {symbol, name: bond.name})}>{symbol}</a>
  },
  {
    title: '名称', sorter: true, dataIndex: 'name',
    render: (name: any, bond) =>
      <a onClick={() => pushToInfo(STOCK_INFO_PATH, {symbol: bond.symbol, name})}>{name}</a>
  },
  {title: '当前价', sorter: true, dataIndex: 'current'},
  {title: '涨跌幅', sorter: true, dataIndex: 'percent', render: (percent: any) => upOrDownSpan(percent, '%')},
  {title: '正股', dataIndex: 'underlying_name', render: (name: any) => <a>{name}</a>},
  {title: '正股价', sorter: true, dataIndex: 'underlying_current'},
  {title: '正股涨跌幅', sorter: true, dataIndex: 'underlying_percent', render: (percent: any) => upOrDownSpan(percent, '%')},
  {title: '转股价', sorter: true, dataIndex: 'conversion_price'},
  {title: '转股价值', sorter: true, dataIndex: 'conversion_value'},
  {title: '溢价率', sorter: true, dataIndex: 'premium_rate', render: (percent: any) => upOrDownSpan(percent, '%')},
  {title: '净资产', sorter: true, dataIndex: 'underlying_navps'},
  {title: 'PB', sorter: true, dataIndex: 'underlying_pb'},
  {
    title: '转债占比',
    sorter: true,
    dataIndex: 'convert_bond_ratio',
    render: (ratio: any) => isNaN(ratio) ? ratio : ratio.toFixed(2) + '%'
  },
  {
    title: '规模(亿)',
    sorter: true,
    dataIndex: 'total_issue_scale',
    render: (scale: any) => isNaN(scale) ? scale : (scale / 100_000_000).toFixed(2)
  },
  {title: '到期时间', sorter: true, dataIndex: 'maturity_time', render: (time: any) => dateByTs(time)},
  {title: '剩余年限', sorter: true, dataIndex: 'remain_year'},
  {
    title: '利率', dataIndex: 'interest_memo', render: (detail: any) => detail === '-' ? '-' :
      <Tooltip title={detail} color={ZIMA_BLUE}>
        <a>详情</a>
      </Tooltip>
  },
  {title: '税前收益', sorter: true, dataIndex: 'benefit_before_tax', render: (tax: any) => upOrDownSpan(tax, '%')},
  {title: '税后收益', sorter: true, dataIndex: 'benefit_after_tax', render: (tax: any) => upOrDownSpan(tax, '%')},

];

const ConvertibleBondTable: React.FC<{ query: Snowball.QuoteListQuery, title: string }> = (props) => {
  const {query, title} = props;
  console.log('query', query);
  console.log('title', title);
  const actionRef = useRef<ActionType>();
  actionRef.current?.reload();

  return (
    <>
      <ProTable<Snowball.ConvertibleBond>
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
          return convertibleBondList({
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
export default ConvertibleBondTable;
