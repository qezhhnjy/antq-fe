import {PageContainer} from "@ant-design/pro-layout";
import ProTable, {ActionType, ProColumns} from "@ant-design/pro-table";
import React, {useRef, useState} from "react";
import {
  DeleteOutlined,
  FallOutlined,
  FormOutlined,
  FrownOutlined,
  MehOutlined,
  PlusCircleOutlined,
  RiseOutlined,
  SearchOutlined,
  SmileOutlined
} from "@ant-design/icons";
import {Avatar, Button, Rate, Tag} from "antd";
import {ZIMA_BLUE} from "@/utils/common";
import {
  hikingTrailDelete,
  hikingTrailList,
  hikingTrailSave,
  hikingTrailUpdate
} from "@/services/ant-design-pro/antq-api";
import Search from "antd/lib/input/Search";
import TrailForm from "@/pages/outdoor/HikingTrail/TrailForm";
import DeleteButton from "@/components/DeleteButton";
import {ModalForm} from "@ant-design/pro-form";
import {Statistic} from "@ant-design/pro-card";

export const difficultyRate: Record<number, React.ReactNode> = {
  1: <SmileOutlined/>,
  2: <SmileOutlined/>,
  3: <MehOutlined/>,
  4: <FrownOutlined/>,
  5: <FrownOutlined/>,
};

/*const recommendRate: Record<number, React.ReactNode> = {
  1: <FrownOutlined style={{color: '#E74C3C'}}/>,
  2: <FrownOutlined style={{color: '#E67E22'}}/>,
  3: <MehOutlined style={{color: '#F1C40F'}}/>,
  4: <SmileOutlined style={{color: '#2ECC71'}}/>,
  5: <SmileOutlined style={{color: '#27AE60'}}/>,
};*/
export const recommendRate: Record<number, React.ReactNode> = {
  1: <FrownOutlined/>,
  2: <FrownOutlined/>,
  3: <MehOutlined/>,
  4: <SmileOutlined/>,
  5: <SmileOutlined/>,
};

const HikingTrail: React.FC<any> = (props) => {
  const {} = props;
  const actionRef = useRef<ActionType>();

  const trails: ProColumns<Outdoor.HikingTrail>[] = [
    {dataIndex: 'index', valueType: 'indexBorder', width: 40},
    {
      title: '图标',
      dataIndex: 'avatar',
      width: 50,
      render: (avatar) => <Avatar src={avatar}/>,
    },
    {
      title: '名称',
      dataIndex: 'title',
      width: 100,
      render: (title) => (
        <Tag style={{fontSize: '14px'}} color={ZIMA_BLUE}>
          {title}
        </Tag>
      ),
    },
    {
      title: '距离(米)', dataIndex: 'distance', sorter: true,
      width: 100,
      render: (distance) =>
        <Statistic valueStyle={{fontSize: 15, color: 'red'}} value={Number(distance) || '-'}/>
    },
    {
      title: <RiseOutlined/>, dataIndex: 'elevationRise', width: 60,
      render: rise => <Statistic valueStyle={{color: 'red'}} value={Number(rise) || '-'}/>
    },
    {
      title: <FallOutlined/>, dataIndex: 'elevationFall', width: 60,
      render: fall => <Statistic valueStyle={{color: 'green'}} value={Number(fall) || '-'}/>
    },
    {
      title: '描述',
      dataIndex: 'summary',
    },
    {
      title: '难度系数',
      dataIndex: 'difficulty',
      width: 200,
      sorter: true,
      render: (difficulty) => <Rate character={({index}: { index: number }) => difficultyRate[index + 1]}
                                    allowHalf disabled value={Number(difficulty) / 2}/>
    },
    {
      title: '推荐指数',
      dataIndex: 'recommend',
      width: 200,
      sorter: true,
      render: (recommend) => <Rate character={({index}: { index: number }) => recommendRate[index + 1]}
                                   allowHalf disabled value={Number(recommend) / 2}/>
    },
    {
      title: '操作',
      key: 'option',
      width: 200,
      valueType: 'option',
      render: (text, trail) => {
        return [
          <ModalForm
            key='detail'
            width='90%'
            style={{top: 0}}
            trigger={<Button type="primary">FatMap</Button>}
            submitter={false}
            modalProps={{closable: false, bodyStyle: {height: 800, padding: 0}}}
          >
            <div dangerouslySetInnerHTML={{__html: trail.iframe || ''}}/>
          </ModalForm>,
          <TrailForm
            key="update"
            table={actionRef}
            title={<FormOutlined style={{fontSize: 16}}/>}
            info={trail}
            onFinish={hikingTrailUpdate}
          />,
          <DeleteButton
            title="确定删除该路线?"
            table={actionRef}
            request={() => hikingTrailDelete(trail.id || '')}
            key="del"
          >
            <DeleteOutlined style={{fontSize: 16}}/>
          </DeleteButton>,
        ];
      },
    },
  ];

  const info: Outdoor.HikingTrail = {};

  const [search, setSearch] = useState('');

  return (
    <PageContainer>
      <ProTable<Outdoor.HikingTrail>
        columns={trails}
        pagination={{
          size: 'default',
          pageSize: 10,
        }}
        actionRef={actionRef}
        request={async (params, sorter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          const {pageSize, current: pageNum} = params;
          const query: API.Query = {pageSize, pageNum, search};
          if (sorter) {
            for (const key in sorter) {
              query.orderBy = key;
              const sort = sorter[key];
              query.order = sort === 'descend' ? 'desc' : sort === 'ascend' ? 'asc' : undefined;
            }
          }
          return hikingTrailList(query).then((result) => ({
            data: result.data?.list,
            success: true,
            total: result.data?.total,
          }));
        }}
        headerTitle={
          <Search
            allowClear
            enterButton={<SearchOutlined/>}
            onSearch={(value) => {
              setSearch(value);
              actionRef.current?.reload();
            }}
          />
        }
        rowKey={(data) => data.id || ''}
        toolBarRender={() => [
          <TrailForm table={actionRef} title={<PlusCircleOutlined style={{fontSize: 16}}/>} info={info}
                     onFinish={hikingTrailSave}/>,
        ]}
        search={false}
      />
    </PageContainer>
  )
}

export default HikingTrail;