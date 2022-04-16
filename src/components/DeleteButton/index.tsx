import {Button, message, Popconfirm} from 'antd';
import React, {MutableRefObject} from "react";
import {ActionType} from "@ant-design/pro-table";

const DeleteButton: React.FC<{ request: any, title: string, table: MutableRefObject<ActionType | undefined> }> =
  (props) => {
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);

    const showConfirm = () => {
      setVisible(true);
    };

    const handleOk = async () => {
      setConfirmLoading(true);
      try {
        const result = await props.request();
        if (result.code === 1000) message.success("删除成功");
        else message.error(result.msg);
      } finally {
        setVisible(false);
        setConfirmLoading(false);
        props.table.current?.reload()
      }
    };

    const handleCancel = () => {
      setVisible(false);
    };

    return (
      <Popconfirm
        title={props.title}
        visible={visible}
        onConfirm={handleOk}
        okButtonProps={{loading: confirmLoading}}
        onCancel={handleCancel}
      >
        <Button type="primary" danger onClick={showConfirm}>
          {props.children}
        </Button>
      </Popconfirm>
    );
  };

export default DeleteButton;
