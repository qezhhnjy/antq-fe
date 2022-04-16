import {Finance} from '@/services/ant-design-pro/finance';
import { THIS_CENTURY } from '@/utils/timeUtil';
import {request} from "@@/plugin-request/request";

//=======================小熊同学==========================
export async function stockInfo(query: Finance.StockQuery, options?: { [key: string]: any }) {
  const {data, code, startDate, endDate, reinstatement} = query;
  return request(`/doctor/stock/${data}`, {
    method: 'GET',
    params: {code, startDate, endDate, type: reinstatement},
    ...(options || {}),
  });
}

export async function doctorAllStock() {
  return request<API.BaseResult<string[][]>>('/doctor/stock/all', {
    method: 'GET'
  })
}

export async function doctorAllIndex() {
  return request<API.BaseResult<string[][]>>('/doctor/stock/index/all', {
    method: 'GET'
  })
}

export async function doctorAllFund() {
  return request<API.BaseResult<string[][]>>('/doctor/fund/all', {
    method: 'GET'
  })
}

export async function doctorFundInfo(code: string) {
  return request<API.BaseResult<Finance.FundInfo>>('/doctor/fund/detail',{
    method:'GET',
    params:{code, startDate: THIS_CENTURY}
  })
}

//=======================antq-be==========================
export async function addStock(stockList: Finance.Stock[]) {
  return request('/antq/web/finance-stock/add', {
    method: 'POST',
    data: stockList
  })
}

export async function addFund(fundList: Finance.Fund[]) {
  return request('/antq/web/finance-fund/add', {
    method: 'POST',
    data: fundList
  })
}

export async function listStock(search: string) {
  return request<API.BaseResult<Finance.Stock[]>>(`/antq/web/finance-stock/all?search=${search}`, {
    method: 'GET',
  })
}

export async function listFund(search: string) {
  return request<API.BaseResult<Finance.Stock[]>>(`/antq/web/finance-fund/all?search=${search}`, {
    method: 'GET',
  })
}

