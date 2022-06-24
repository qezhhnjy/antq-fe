import type {Settings as LayoutSettings} from '@ant-design/pro-layout';
import {PageLoading} from '@ant-design/pro-layout';
import type {RunTimeLayoutConfig} from 'umi';
import {history} from 'umi';
import RightContent from '@/components/RightContent';
import {userInfo} from './services/ant-design-pro/antq-api';
import {RequestConfig} from '@@/plugin-request/request';
import Footer from './components/Footer';

// const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading/>,
};

const AuthHeaderInterceptor = (url: string, options: any) => {
  const token = JSON.parse(localStorage.getItem('token') || '{}');
  return {
    url: `${url}`,
    options: {
      ...options,
      interceptors: true,
      headers: {
        Authorization: token?.token_type + ' ' + token?.access_token,
      },
    },
  };
};

/*
错误信息配置
export interface response {
  success: boolean; // if request is success
  data?: any; // response data
  errorCode?: string; // code for errorType
  errorMessage?: string; // message display to user
  showType?: number; // error display type： 0 silent; 1 message.warn; 2 message.error; 4 notification; 9 page
  traceId?: string; // Convenient for back-end Troubleshooting: unique request ID
  host?: string; // onvenient for backend Troubleshooting: host of current access server
}
*/
export const request: RequestConfig = {
  timeout: 30000,
  // 新增自动添加AccessToken的请求前拦截器
  requestInterceptors: [AuthHeaderInterceptor],
  errorConfig: {
    adaptor: (baseResult: any) => {
      return {
        data: baseResult.data,
        success: baseResult.code === 1000 || baseResult.code === 200 || baseResult.error_code === 0,
        errorCode: baseResult.code || baseResult.error_code,
        errorMessage: baseResult.msg || baseResult.message || baseResult.error_description,
        showType: 2,
      };
    },
  },
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  token?: API.Token;
  settings?: Partial<LayoutSettings>;
  currentUser?: API.UserVO;
  fetchUserInfo?: () => Promise<API.UserVO | undefined>;
}> {
  // localStorage.removeItem('token');
  const fetchUserInfo = async () => {
    try {
      const msg = await userInfo();
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }
  return {
    fetchUserInfo,
    settings: {},
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({initialState}) => {
  return {
    rightContentRender: () => <RightContent/>,
    disableContentMargin: false,
    // 水印
    /*
        waterMarkProps: {
          content: initialState?.currentUser?.user.username,
        },
    */
    footerRender: () => <Footer/>,
    onPageChange: () => {
      const {location} = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    // menuHeaderRender: () => <h2>qezhhnjy</h2>,
    // 自定义 403 页面
    unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    // childrenRender: (children) => {
    //   if (initialState.loading) return <PageLoading />;
    //   return children;
    // },
    ...initialState?.settings,
  };
};
