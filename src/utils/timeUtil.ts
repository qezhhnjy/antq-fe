import moment from "moment/moment";

const DATE_FORMAT = 'yyyy-MM-DD';
const DATETIME_FORMAT = 'yyyy-MM-DD HH:mm:ss'
const TIME_FORMAT = 'HH:mm:ss';
const MIN_FORMAT = 'HH:mm';

export const today = () => moment().format(DATE_FORMAT);

export const now = () => moment().format(DATETIME_FORMAT);

export const time = () => moment().format(TIME_FORMAT);

export const dateByTs = (ts: number) => moment(ts).format(DATE_FORMAT);

export const datetimeByTs = (ts: number) => moment(ts).format(DATETIME_FORMAT);

export const timeByTs = (ts: number) => moment(ts).format(MIN_FORMAT);

export const THIS_CENTURY = '2000-01-01';
