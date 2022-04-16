import {PageContainer} from "@ant-design/pro-layout";
import React, {useState} from "react";
import {ProFormGroup} from "@ant-design/pro-form";
import {addFund, doctorAllFund, doctorFundInfo, listFund} from "@/services/ant-design-pro/finance-api";
import {Button, message} from "antd";
import FundInfo from "@/components/FundInfo";
import SearchSelect from "@/components/SearchSelect";
import {Finance} from "@/services/ant-design-pro/finance";

const FundData: React.FC<any> = (props) => {
  const {} = props;

  const [fund, setFund] = useState<Finance.FundInfo>();

  return (
    <PageContainer>
      <ProFormGroup style={{marginBottom: 5}}>
        <SearchSelect
          searchOnEmpty
          style={{width: 200}}
          placeholder='基金搜索'
          request={async (params: any) => {
            const result = await listFund(params);
            return result?.data?.map(s => ({label: s.name, value: s.code})) || [];
          }}
          change={(value: any, option: any) => {
            if (option) setFund({code: option.key, name: option.label});
          }}
        />
        <Button onClick={
          async () => {
            if (fund?.code) {
              const result = await doctorFundInfo(fund.code);
              setFund(result.data);
            } else {
              message.error('请选择基金!');
            }
          }
        } type='primary'>基金详情</Button>
        <Button onClick={
          async () => {
            const result = await doctorAllFund();
            const fundList: Finance.Fund[] = result?.data?.map(list => ({
              code: list[0],
              name: list[2],
              type: list[3]
            })) || [];
            if (!fundList) message.error('基金数据为空');
            else {
              await addFund(fundList);
              message.success('导入基金成功');
            }
          }
        } disabled  type='primary'>导入基金</Button>
      </ProFormGroup>
      {
        fund ? <FundInfo info={fund}/> : null
      }
    </PageContainer>
  )
}

export default FundData;
