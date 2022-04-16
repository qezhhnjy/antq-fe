import React from "react";
import FinanceCard from "@/components/snowball/FinanceCard";
import {Row} from "antd";

export type FinanceCardGroupProps = {
  optionals: API.FinanceOptional[],
  colspan?: number,
  active: boolean,
  cancelOptional?: boolean,
}

const FinanceCardGroup: React.FC<FinanceCardGroupProps> = (props) => {
  const {optionals, colspan, active, cancelOptional = true} = props;

  return (
    <Row gutter={10} style={{padding: 5}}>
      {optionals?.map(optional =>
        <FinanceCard cancelOptional={cancelOptional} symbol={optional.symbol} key={optional.symbol} colspan={colspan}
                     active={active}/>
      )}
    </Row>
  )
}

export default FinanceCardGroup;
