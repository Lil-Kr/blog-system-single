import dayjs from 'dayjs'

const formatDate = (date: string, format?: string | null) => {
  if (format) {
    return dayjs(date).format(format)
  } else {
    return dayjs(date).format('YYYY-MM-DD')
  }
}

const transformToDay = (timestamp: string): string => {
  return dayjs(timestamp).format('YYYY-MM-DD')
}

const transformToYear = (timestamp: string): string => {
  return dayjs(timestamp).format('YYYY')
}

export { transformToDay, formatDate, transformToYear }
