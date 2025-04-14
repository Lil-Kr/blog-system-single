import dayjs from 'dayjs'

const transformToDay = (timestamp: string): string => {
  return dayjs(timestamp).format('YYYY-MM-DD')
}

export { transformToDay }
