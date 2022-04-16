import React, {useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import {Button, message} from 'antd';
import {addStock, doctorAllIndex, doctorAllStock, listStock, stockInfo} from '@/services/ant-design-pro/finance-api';
import {Reinstatement} from '@/services/ant-design-pro/enums';
import KLine from '@/components/KLine';
import {ProFormGroup} from "@ant-design/pro-form";
import {THIS_CENTURY, today} from "@/utils/timeUtil";
import MinLine from "@/components/MinLine";
import SearchSelect from "@/components/SearchSelect";
import {Finance} from "@/services/ant-design-pro/finance";

const StockData: React.FC = () => {
  const [data, setData] = useState<Finance.KLineData[]>([]);
  const [minData, setMinData] = useState<Finance.MinData>();
  const [stock, setStock] = useState<Finance.Stock>();

  const handler = (response: string[][]) => {
    const temp: Finance.KLineData[] = [];
    response.forEach(k =>
      temp.push({
        time: k[0],
        open: parseFloat(k[1]),
        close: parseFloat(k[2]),
        highest: parseFloat(k[3]),
        lowest: parseFloat(k[4]),
        volume: parseFloat(k[5]),
        dividends: k[6]
      })
    );
    setData(temp);
  }

  const checkStock = () => {
    if (!stock) message.error('请选择股票!');
    return !stock;
  }

  const KButton: React.FC<{ api: Finance.StockType, name: string }> = (props) => {
    const {api, name} = props;
    return <Button
      type='primary'
      onClick={async () => {
        if (checkStock()) return;
        const result = await stockInfo({
          data: api,
          code: stock?.code || '',
          startDate: THIS_CENTURY,
          endDate: today(),
          reinstatement: Reinstatement.FORMER_REINSTATEMENT,
        });
        handler(result.data);
      }}
    >
      {name}
    </Button>
  }

  const MinButton: React.FC<{ api: Finance.StockType, name: string }> = (props) => {
    const {api, name} = props;
    return <Button
      type='primary'
      onClick={async () => {
        if (checkStock()) return;
        const result = await stockInfo({
          data: api,
          code: stock?.code || '',
          startDate: THIS_CENTURY,
          endDate: today(),
          reinstatement: Reinstatement.FORMER_REINSTATEMENT,
        });
        setMinData(result.data);
      }}
    >
      {name}
    </Button>
  }

  const AddButton: React.FC<{ doctor: Function, type: Finance.FinanceType, add: Function }> = (props) => {
    const {doctor, type, add} = props;
    return <Button onClick={
      async () => {
        const result = await doctor();
        const stockList: Finance.Stock[] = result?.data?.map((list: any[]) => ({
          code: list[0],
          name: list[1],
          type: type,
        })) || [];
        if (!stockList) message.error('基金数据为空');
        else {
          await add(stockList);
          message.success('导入基金成功');
        }
      }
    } disabled  type='primary'>导入{type}</Button>
  }

  return (
    <PageContainer>
      <ProFormGroup style={{marginBottom: 5}}>
        <SearchSelect
          searchOnEmpty
          style={{width: 200}}
          placeholder='股票搜索'
          request={async (params: any) => {
            const result = await listStock(params);
            return result?.data?.map((s: { name: any; code: any; }) => ({label: s.name, value: s.code})) || [];
          }}
          change={(value: any, option: any) => {
            if (option) setStock({code: option.key, name: option.label, type: 'stock'});
          }}
        />
        <MinButton api='min' name='分时数据'/>
        <KButton api='kline/day' name='日线'/>
        <KButton api='kline/week' name='周线'/>
        <KButton api='kline/month' name='月线'/>
        <AddButton doctor={doctorAllStock} type='stock' add={addStock}/>
        <AddButton doctor={doctorAllIndex} type='index' add={addStock}/>
      </ProFormGroup>
      {minData ? <MinLine data={minData}/> : null}
      {data.length > 0 ? <KLine data={data} title={stock?.name || ''}/> : null}
    </PageContainer>
  );
};

export default StockData;
