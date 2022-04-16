import {PageContainer} from "@ant-design/pro-layout";
import React, {MutableRefObject, useRef} from "react";
import ProTable, {ActionType, ProColumns} from "@ant-design/pro-table";
import {addJob, cronJob, deleteJob, pauseJob, queryJob, resumeJob} from "@/services/ant-design-pro/antq-api";
import {CaretRightOutlined, DeleteOutlined, FormOutlined, PauseOutlined, PlusOutlined} from "@ant-design/icons";
import {Button, message, Tag} from "antd";
import {GREEN, ZIMA_BLUE, ZIMA_BLUE_REVERSE} from "@/utils/common";
import DeleteButton from "@/components/DeleteButton";
import {ModalForm, ProFormText} from "@ant-design/pro-form";

const CronForm: React.FC<{ jobAndTrigger: Quartz.JobAndTrigger, actionRef: MutableRefObject<ActionType | undefined> }> = (props) => {

  const {actionRef, jobAndTrigger} = props;

  return (
    <ModalForm
      width={500}
      title='修改cron表达式'
      trigger={<Button type="primary"><FormOutlined style={{fontSize: 16}}/></Button>}
      modalProps={{destroyOnClose: true}}
      onFinish={async (params: { cronExpression: string }) => {
        cronJob({...jobAndTrigger, cronExpression: params.cronExpression})
          .then(() => actionRef.current?.reload());
        return true;
      }}
    >
      <ProFormText
        width="md"
        name="cronExpression"
        label="cron表达式"
        initialValue={jobAndTrigger.cronExpression}
        rules={[
          {
            required: true,
            message: 'cron表达式不能为空!',
          },
        ]}
        placeholder="请输入cron表达式"
      />
    </ModalForm>)
}

const AddForm: React.FC<{ actionRef: MutableRefObject<ActionType | undefined> }> = (props) => {

  const {actionRef} = props;

  return (
    <ModalForm
      width={500}
      title={'新增定时任务'}
      trigger={<Button type="primary"><PlusOutlined/></Button>}
      modalProps={{destroyOnClose: true}}
      onFinish={async (params: Quartz.JobInfo) => {
        addJob(params).then(() => {
          message.success("添加成功");
          actionRef.current?.reload();
        })
        return true;
      }}
    >
      <ProFormText
        width="md"
        name="jobGroupName"
        label="Job组名"
        rules={[
          {
            required: true,
            message: 'Job组名不能为空!',
          },
        ]}
        placeholder="请输入Job组名"
      />
      <ProFormText
        width="md"
        name="jobClassName"
        label="Job类名"
        initialValue='com.qezhhnjy.antq.quartz.job.DynamicJob'
        rules={[
          {
            required: true,
            message: 'Job类名不能为空!',
          },
        ]}
        placeholder="请输入Job类名"
      />
      <ProFormText
        width="md"
        name="className"
        label="执行类名"
        rules={[
          {
            required: true,
            message: '执行类名不能为空!',
          },
        ]}
        placeholder="请输入执行类名"
      />
      <ProFormText
        width="md"
        name="methodName"
        label="方法名"
        rules={[
          {
            required: true,
            message: '方法名不能为空!',
          },
        ]}
        placeholder="请输入方法名"
      />
      <ProFormText
        width="md"
        name="arg"
        label="参数"
        rules={[
          {
            required: true,
            message: '参数不能为空!',
          },
        ]}
        placeholder="请输入参数"
      />
      <ProFormText
        width="md"
        name="cronExpression"
        label="cron表达式"
        rules={[
          {
            required: true,
            message: 'cron表达式不能为空!',
          },
        ]}
        placeholder="请输入cron表达式"
      />
    </ModalForm>
  );

}

const Quartz: React.FC<any> = (props) => {
  const {} = props;
  const actionRef = useRef<ActionType>();

  const jobAndTriggers: ProColumns<Quartz.JobAndTrigger>[] = [
    {dataIndex: 'index', valueType: 'indexBorder', width: 40},
    {
      title: '任务组',
      dataIndex: 'jobGroup',
    },
    {
      title: '任务名称',
      dataIndex: 'jobName',
      width: 50,
    },
    {
      title: '任务全类名',
      dataIndex: 'jobClassName',
    },
    {
      title: 'cron表达式',
      dataIndex: 'cronExpression',
      render: cron => <Tag style={{fontSize: '12px'}} color={ZIMA_BLUE}>{cron}</Tag>
    },
    {
      title: '时区',
      dataIndex: 'timeZoneId',
    },
    {
      title: '任务状态',
      dataIndex: 'triggerState',
      render: (triggerState) => (
        <Tag style={{fontSize: '12px'}} color={triggerState === 'PAUSED' ? ZIMA_BLUE_REVERSE : GREEN}>
          {triggerState}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'option',
      width: 200,
      valueType: 'option',
      render: (text, jobAndTrigger) => {
        return [
          <Button key='pause' type='primary' danger
                  onClick={() => pauseJob(jobAndTrigger).then(() => actionRef.current?.reload())}
                  disabled={jobAndTrigger.triggerState === 'PAUSED'}>
            <PauseOutlined style={{fontSize: 16}}/>
          </Button>,
          <Button key='resume' type='primary'
                  onClick={() => resumeJob(jobAndTrigger).then(() => actionRef.current?.reload())}
                  disabled={jobAndTrigger.triggerState !== 'PAUSED'}>
            <CaretRightOutlined style={{fontSize: 16}}/>
          </Button>,
          <CronForm key='cronForm' jobAndTrigger={jobAndTrigger} actionRef={actionRef}/>,
          <DeleteButton
            title="确定删除任务?"
            table={actionRef}
            request={() => deleteJob(jobAndTrigger)}
            key="del"
          >
            <DeleteOutlined style={{fontSize: 16}}/>
          </DeleteButton>,
        ];
      },
    },
  ]

  return (
    <PageContainer>
      <ProTable<Quartz.JobAndTrigger>
        pagination={{
          size: 'default',
          pageSize: 10,
        }}
        columns={jobAndTriggers}
        actionRef={actionRef}
        request={async (params) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          const {pageSize, current: pageNum} = params;
          return queryJob({pageSize, pageNum}).then((result) => ({
            data: result.data?.list,
            success: true,
            total: result.data?.total,
          }));
        }}
        rowKey={(data) => data.jobName}
        search={false}
        toolBarRender={() => [<AddForm actionRef={actionRef} key='addForm'/>]}
      />
    </PageContainer>
  )
}

export default Quartz;