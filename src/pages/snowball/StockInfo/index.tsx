import {PageContainer} from '@ant-design/pro-layout';
import React, {useState} from 'react';
import {history} from 'umi';
import StockHeader from "@/components/snowball/StockHeader";

const StockInfoPage: React.FC = () => {
  // @ts-ignore
  const [stockInfo] = useState<Partial<Snowball.StockInfo>>(history?.location?.state);

  return (
    <PageContainer
  title={false}
  content={<StockHeader stockInfo={stockInfo}/>}
  />
  );
};
export default StockInfoPage;
