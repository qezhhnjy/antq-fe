// @ts-ignore
/* eslint-disable */

declare namespace Outdoor {
  type HikingTrail = {
    id?: string;
    avatar?: string;
    title?: string;
    summary?: string;
    difficulty?: number;
    recommend?: number;
    icon?: string;
    tags?: string;
    iframe?: string;
    detail?: string;
    distance?: number;
    elevationRise?: number;
    elevationFall?: number;
    elevation?: number;
  }
}

declare namespace API {
  type CurrentUser = {
    name?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;

    code?: number;
    msg?: string;
    data?: any;
  };

  type BaseResult<T> = {
    code?: number;
    msg?: string;
    data?: T;
  };

  type MonitorInfo = {
    time: string;
    totalMemory: string;
    maxMemory: string;
    freeMemory: string;
    useMemory: string;
    jvmInfo: string;
    javaInfo: string;
    javaSpecInfo: string;
    userInfo: string;
    osInfo: string;
    cpuInfo: string;
    globalMemory: string;
    storeList: string[];
    networkIFList: string[];
    os: string;
    computerSystem: string;
    centralProcessor: string;
    sensors: string;
    diskInfoList: DiskInfo[];
  }

  type SystemInfo = {
    now: string;
    system: string;
    username: string;
    java: JavaInfo;
    jvmList: MemoryInfo[];
    cpu: CpuInfo;
    memory: MemoryInfo;
    virtual: MemoryInfo;
    disk: DiskInfo;
    partitionList: DiskInfo[];
    networkIFList: NetworkIF[];
    recv: number;
    sent: number;
  }

  type JavaInfo = {
    name: string;
    version: string;
    vendor: string;
    info: string;
  }

  type CpuInfo = {
    name: string;
    coreNum: number;
    sys: double;
    used: double;
    wait: double;
    free: double;
    temperature: double;
    voltage: double;
  }

  type MemoryInfo = {
    name: string;
    total: number;
    max: number;
    free: number;
    used: number;
  }

  type DiskInfo = {
    name: string;
    total: number;
    free: number;
    used: number;
    read: number;
    write: number;
    transferTime: string;
  }

  type NetworkIF = {
    name: string;
    displayName: string;
    recv: number;
    sent: number;
    speed: string;
    packetRecv: string;
    packetSent: string;
    alias: string;
    mac: string;
    ipv4: string[];
  }

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type NoticeVO = {
    notice: Notice;
  }

  type Notice = {
    id?: string;
    userId?: string;
    avatar?: string;
    title?: string;
    message?: string;
    extra?: string;
    status?: number;
    type?: number;
    productTime?: string;
  }

  /*
    access_token: "***"
    expires_in: 3599
    id: 1
    jti: "8c952725-6ef9-4f5f-8e01-2ecb667ac286"
    refresh_token: "***"
    scope: "all"
    token_type: "bearer"
  */
  type Token = {
    access_token?: string;
    expires_in?: number;
    id?: number;
    jti?: string;
    refresh_token?: string;
    scope?: string;
    token_type?: string;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type User = {
    id?: string;
    avatar?: string;
    username?: string;
    password?: string;
    nickname?: string;
    phone?: string;
    email?: string;
    gender?: number;
  };

  type UserVO = {
    user: User;
    roleList: Role[];
    menuMap?: {};
    noticeList?: Notice[];
    optionalList?: FinanceOptional[];
  };

  type FinanceOptional = {
    id?: number;
    username?: string;
    symbol: string;
    type?: string;
  }

  type Role = {
    id?: string;
    roleName?: string;
  };

  type RoleVO = {
    role?: Role;
    menuList?: Menu[];
  };

  type TimelineRecord = {
    id?: string;
    title?: string;
    content?: string;
    username?: string;
    avatar?: string;
    recordTime?: string;
  }

  type Statistic = {
    value: any;
    count: int;
  }

  type Blog = {
    id?: string;
    username?: string;
    avatar?: string;
    title?: string;
    summary?: string;
    icon?: string;
    tags?: string;
    raw?: string;
    html?: string;
    editTime?: string;
  }

  type MenuVO = {
    menu: Menu;
    parentId?: string;
    roleList: Role[];
  };

  type LoginInfo = {
    id: string;
    username: string;
    browser: string;
    browserVersion: string;
    engine: string;
    engineVersion: string;
    os: string;
    platform: string;
    ip: string;
    client: string;
    loginTime: string;
    region: string;
  }

  type Tree = {
    title: string;
    value: string;
    key: string;
    children?: Tree[];
  };

  type DetailInfo = {
    title: any;
    avatar?: string;
    name: string;
    introduction?: string;
    tag?: string | ReactElement;
    info?: { label?: string; value?: string }[];
  };

  type Menu = {
    id?: string;
    menuName?: string;
    permission?: string;
    path?: string;
    parentId?: number;
    icon?: string;
    sort?: number;
    type?: number;
  };

  type Query = {
    search?: string;
    pageNum?: number;
    pageSize?: number;
    orderBy?: string;
    order?: string;
  };

  type AlbumQuery = {
    search?: string;
    pageNum?: number;
    pageSize?: number;
    orderBy?: string;
    order?: string;
    albumId?: string;
  };

  type PageInfo<T> = {
    pageNum?: number;
    pageSize?: number;
    size?: number;
    startRow?: string;
    endRow?: string;
    pages?: number;
    prePage?: number;
    nextPage?: number;
    total: number;
    list: T[];
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };

  type Prop = {
    prop: string;
    value?: any;
  }

  type RedisInfo = {
    prop: string;
    value: string;
    desc: string;
  }
}
