declare namespace IM {

  type MessageQuery = {
    from?: string;
    to?: string;
    groupId?: string;
    time?: string;
    search?: string;
    pageNum?: number;
    pageSize?: number;
  }

  type MessageVO = {
    id: string;
    send: string;
    receive: string;
    cmd?: int;
    type?: int;
    chatType?: int;
    groupId: string;
    content: string;
    sendTime: string;
  }

}