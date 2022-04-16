import {PageContainer} from "@ant-design/pro-layout";
import ProTable, {ActionType, ProColumns} from "@ant-design/pro-table";
import React, {useRef, useState} from "react";
import {queryLoginInfo} from "@/services/ant-design-pro/antq-api";
import {Input} from "antd";

const {Search} = Input;

const loginInfos: ProColumns<API.LoginInfo>[] = [
  {dataIndex: 'index', valueType: 'indexBorder', width: 40},
  {title: '用户', dataIndex: 'username'},
  {title: '浏览器', dataIndex: 'browser'},
  {title: '客户端引擎', dataIndex: 'engine'},
  {title: '操作系统', dataIndex: 'os'},
  {title: '平台', dataIndex: 'platform'},
  {title: 'IP地址', dataIndex: 'ip'},
  {title: '客户端', dataIndex: 'client'},
  {title:'登录时间',dataIndex:'loginTime'},
  {title:'所属区域',dataIndex:'region'}
]

const LoginInfoManager: React.FC<any> = (props) => {
  const {} = props;

  const actionRef = useRef<ActionType>();

  const [search, setSearch] = useState('');

  return (
    <PageContainer>
      <ProTable<API.LoginInfo>
        columns={loginInfos}
        actionRef={actionRef}
        pagination={{size: "default", pageSize: 10}}
        request={async (params) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          const {pageSize, current: pageNum} = params;
          return queryLoginInfo({pageSize, pageNum, search}).then((result) => ({
            data: result.data?.list,
            success: true,
            total: result.data?.total,
          }));
        }}
        headerTitle={
          <Search
            allowClear
            enterButton="查询"
            onSearch={(v) => {
              setSearch(v);
              actionRef.current?.reload();
            }}
          />
        }
        rowKey={(data) => data.id}
        search={false}
      />
      <iframe src="https://ip.skk.moe/simple" style={{width: '100%', border: 0}}/>
    </PageContainer>
  )
}

export default LoginInfoManager;
