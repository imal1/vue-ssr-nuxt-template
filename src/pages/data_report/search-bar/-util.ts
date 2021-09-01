import Dayjs from 'dayjs'

export enum DateType {
  year = '年',
  quarter = '季',
  month = '月',
  day = '日'
}

export function TransDateToYearMonth({
  date,
  type,
}: {
  date: any
  type: 'year' | 'month'
}) {
  return {
    year: Dayjs(date).format('YYYY'),
    month: type === 'month' ? Dayjs(date).format('M') : 0,
  }
}
