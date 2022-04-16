import {history} from "@@/core/history";

export const STOCK_INFO_PATH = '/snowball/stock-info';
export const BLOG_DETAIL_PATH = '/blog/detail';
export const UTIL_VDITOR_PATH = '/util/vditor';

export const pushToInfo = (path: string, state: any) => history.push(path, state);
