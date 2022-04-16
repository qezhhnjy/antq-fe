import FinanceCardGroup from "@/components/snowball/FinanceCardGroup";
import React from "react";

const optionalList: API.FinanceOptional[] =
  ["SH000001", "SZ399001", "SZ399006", "SH000688", "HKHSI", "HKHSCCI", "HKHSCEI", "HKVHSI", ".DJI", ".IXIC", ".INX", "ICS30"]
    .map(symbol => ({symbol}));

const Welcome: React.FC = () => {

  return (
    <FinanceCardGroup colspan={6} active={true} optionals={optionalList} cancelOptional={false}/>
  );
};

export default Welcome;
